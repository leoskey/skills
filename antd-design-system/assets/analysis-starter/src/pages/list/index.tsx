import { PlusOutlined } from "@ant-design/icons";
import {
  FooterToolbar,
  ModalForm,
  PageContainer,
  ProDescriptions,
  ProFormDateTimePicker,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProTable,
  StepsForm,
} from "@ant-design/pro-components";
import type {
  ActionType,
  ProColumns,
  ProDescriptionsItemProps,
} from "@ant-design/pro-components";
import { App, Button, Drawer, Modal, Typography } from "antd";
import { useRef, useState } from "react";

type Rule = {
  key: number;
  name: string;
  desc: string;
  callNo: number;
  status: number;
  updatedAt: string;
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
};
const seed: Rule[] = Array.from({ length: 100 }, (_, i) => ({
  key: 99 - i,
  name: `TradeCode ${99 - i}`,
  desc: "这是一段描述",
  callNo: (340 + i * 137) % 1000,
  status: [2, 3, 2, 0, 1, 2, 0, 1][i % 8],
  updatedAt: "1970-01-01 00:00:00",
}));

function UpdateForm({
  values,
  onSave,
}: {
  values: Rule;
  onSave: (v: Partial<Rule>) => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Typography.Link onClick={() => setOpen(true)}>配置</Typography.Link>
      <StepsForm
        onFinish={async (values) => {
          onSave(values);
          setOpen(false);
          return true;
        }}
        stepsProps={{ size: "small" }}
        stepsFormRender={(dom, submitter) => (
          <Modal
            title="规则配置"
            open={open}
            onCancel={() => setOpen(false)}
            width={640}
            styles={{ body: { padding: "32px 40px 48px" } }}
            destroyOnHidden
            footer={submitter}
          >
            {dom}
          </Modal>
        )}
      >
        <StepsForm.StepForm name="base" title="基本信息" initialValues={values}>
          <ProFormText
            name="name"
            label="规则名称"
            width="md"
            rules={[{ required: true, message: "请输入规则名称！" }]}
          />
          <ProFormTextArea
            name="desc"
            label="规则描述"
            width="md"
            placeholder="请输入至少五个字符"
            rules={[
              {
                required: true,
                min: 5,
                message: "请输入至少五个字符的规则描述！",
              },
            ]}
          />
        </StepsForm.StepForm>
        <StepsForm.StepForm
          name="properties"
          title="配置规则属性"
          initialValues={{ target: "0", template: "0" }}
        >
          <ProFormSelect
            name="target"
            label="监控对象"
            width="md"
            valueEnum={{ 0: "表一", 1: "表二" }}
          />
          <ProFormSelect
            name="template"
            label="规则模板"
            width="md"
            valueEnum={{ 0: "规则模板一", 1: "规则模板二" }}
          />
          <ProFormRadio.Group
            name="type"
            label="规则类型"
            options={[
              { value: "0", label: "强" },
              { value: "1", label: "弱" },
            ]}
          />
        </StepsForm.StepForm>
        <StepsForm.StepForm
          name="schedule"
          title="设定调度周期"
          initialValues={{ frequency: "month" }}
        >
          <ProFormDateTimePicker
            name="time"
            label="开始时间"
            width="md"
            rules={[{ required: true, message: "请选择开始时间！" }]}
          />
          <ProFormSelect
            name="frequency"
            label="监控周期"
            width="md"
            valueEnum={{ month: "月", week: "周" }}
          />
        </StepsForm.StepForm>
      </StepsForm>
    </>
  );
}

export default function TablePage() {
  const { message, modal } = App.useApp();
  const actionRef = useRef<ActionType | null>(null);
  const [rules, setRules] = useState<Rule[]>(seed);
  const [selected, setSelected] = useState<Rule[]>([]);
  const [current, setCurrent] = useState<Rule>();
  const [revision, setRevision] = useState(0);
  function mutate(next: Rule[]) {
    setRules(next);
    setRevision((v) => v + 1);
  }
  const columns: ProColumns<Rule>[] = [
    {
      title: "规则名称",
      dataIndex: "name",
      render: (_, r) => (
        <Typography.Link onClick={() => setCurrent(r)}>
          {r.name}
        </Typography.Link>
      ),
    },
    { title: "描述", dataIndex: "desc", valueType: "textarea" },
    {
      title: "服务调用次数",
      dataIndex: "callNo",
      sorter: true,
      hideInForm: true,
      renderText: (v) => `${v}万`,
    },
    {
      title: "状态",
      dataIndex: "status",
      hideInForm: true,
      valueEnum: {
        0: { text: "关闭", status: "Default" },
        1: { text: "运行中", status: "Processing" },
        2: { text: "已上线", status: "Success" },
        3: { text: "异常", status: "Error" },
      },
    },
    {
      title: "上次调度时间",
      dataIndex: "updatedAt",
      valueType: "dateTime",
      sorter: true,
    },
    {
      title: "操作",
      dataIndex: "option",
      valueType: "option",
      render: (_, r) => [
        <UpdateForm
          key="config"
          values={r}
          onSave={(v) => {
            mutate(
              rules.map((row) => (row.key === r.key ? { ...row, ...v } : row)),
            );
            message.success("配置已更新");
          }}
        />,
        <Typography.Link
          key="alert"
          onClick={() => message.success(`已订阅 ${r.name} 的警报`)}
        >
          订阅警报
        </Typography.Link>,
      ],
    },
  ];
  return (
    <PageContainer>
      <ProTable<Rule>
        headerTitle="查询表格"
        actionRef={actionRef}
        rowKey="key"
        search={{ labelWidth: 120 }}
        params={{ revision }}
        request={async (params, sort) => {
          let data = rules.filter(
            (r) =>
              (!params.name || r.name.includes(params.name)) &&
              (!params.desc || r.desc.includes(params.desc)) &&
              (!params.callNo ||
                String(r.callNo).includes(String(params.callNo))) &&
              (params.status === undefined ||
                String(r.status) === String(params.status)) &&
              (!params.updatedAt ||
                r.updatedAt.startsWith(String(params.updatedAt).slice(0, 10))),
          );
          const [field, order] = Object.entries(sort)[0] || [];
          if (field && order) {
            data = [...data].sort((a, b) => {
              const x = a[field as keyof Rule],
                y = b[field as keyof Rule];
              const n =
                typeof x === "number" && typeof y === "number"
                  ? x - y
                  : String(x).localeCompare(String(y));
              return order === "descend" ? -n : n;
            });
          }
          const size = params.pageSize || 20,
            start = ((params.current || 1) - 1) * size;
          return {
            data: data.slice(start, start + size),
            total: data.length,
            success: true,
          };
        }}
        columns={columns}
        rowSelection={{
          selectedRowKeys: selected.map((r) => r.key),
          onChange: (_, rows) => setSelected(rows),
        }}

        toolBarRender={() => [
          <ModalForm<{ name: string; desc: string }>
            key="create"
            title="新建规则"
            width="400px"
            trigger={
              <Button type="primary" icon={<PlusOutlined />}>
                新建
              </Button>
            }
            modalProps={{ destroyOnHidden: true }}
            onFinish={async (v) => {
              mutate([
                {
                  key: Date.now(),
                  ...v,
                  callNo: 0,
                  status: 0,
                  updatedAt: new Date()
                    .toISOString()
                    .slice(0, 19)
                    .replace("T", " "),
                },
                ...rules,
              ]);
              message.success("新建成功");
              return true;
            }}
          >
            <ProFormText
              width="md"
              name="name"
              fieldProps={{ "aria-label": "规则名称" }}
              rules={[{ required: true, message: "规则名称为必填项" }]}
            />
            <ProFormTextArea
              width="md"
              name="desc"
              fieldProps={{ "aria-label": "描述" }}
            />
          </ModalForm>,
        ]}
      />
      {selected.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择 <span style={{ fontWeight: 600 }}>{selected.length}</span>{" "}
              项&nbsp;&nbsp; 服务调用次数总计{" "}
              {selected.reduce((n, r) => n + r.callNo, 0)} 万
            </div>
          }
        >
          <Button
            onClick={() =>
              modal.confirm({
                title: "删除选中的规则？",
                content: `将从当前演示中删除 ${selected.length} 条规则。刷新页面可恢复初始数据。`,
                okText: "删除",
                okButtonProps: { danger: true },
                onOk: () => {
                  mutate(
                    rules.filter((r) => !selected.some((s) => s.key === r.key)),
                  );
                  setSelected([]);
                  message.success("删除成功");
                },
              })
            }
          >
            批量删除
          </Button>
          <Button
            type="primary"
            onClick={() => {
              mutate(
                rules.map((r) =>
                  selected.some((s) => s.key === r.key)
                    ? { ...r, status: 2 }
                    : r,
                ),
              );
              setSelected([]);
              message.success("审批成功");
            }}
          >
            批量审批
          </Button>
        </FooterToolbar>
      )}
      <Drawer
        className="rule-detail"
        size={600}
        open={!!current}
        onClose={() => setCurrent(undefined)}
        closable={false}
      >
        {current && (
          <ProDescriptions<Rule>
            column={2}
            title={current.name}
            request={async () => ({ data: current })}
            params={{ id: current.key }}
            columns={columns as ProDescriptionsItemProps<Rule>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
}
