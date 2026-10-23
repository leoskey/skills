import { ModalForm, ProFormText } from "@ant-design/pro-components";
import { useSearchQuery } from "@/runtime/search";
import {
  DownloadOutlined,
  EditOutlined,
  EllipsisOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import {
  App,
  Typography,
  Avatar,
  Card,
  Col,
  Dropdown,
  Form,
  List,
  Row,
  Select,
  Tooltip,
} from "antd";
import type { FC } from "react";
import React, { useState } from "react";
import { StandardFormRow, TagSelect } from "@/components";
import { formatNumber } from "@/utils/format";
import { categoryOptions } from "../../mock";
import type { ListItemDataType } from "./data.d";
import { queryFakeList } from "./service";
import useStyles from "./style.style";

function formatWan(val: number) {
  const v = val * 1;
  if (!v || Number.isNaN(v)) return "";
  let result: React.ReactNode = val;
  if (val > 10000) {
    result = (
      <span>
        {Math.floor(val / 10000)}
        <span
          style={{
            position: "relative",
            top: -2,
            fontSize: 14,
            fontStyle: "normal",
            marginLeft: 2,
          }}
        >
          万
        </span>
      </span>
    );
  }
  return result;
}
const formItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const CardInfo: React.FC<{
  activeUser: React.ReactNode;
  newUser: React.ReactNode;
}> = ({ activeUser, newUser }) => {
  const { styles } = useStyles();
  return (
    <div className={styles.cardInfo}>
      <div>
        <p>活跃用户</p>
        <p className="app-metric-value">{activeUser}</p>
      </div>
      <div>
        <p>新增用户</p>
        <p className="app-metric-value">{newUser}</p>
      </div>
    </div>
  );
};
const Applications: FC<Record<string, any>> = () => {
  const { modal, message } = App.useApp();
  const [editing, setEditing] = useState<ListItemDataType>();
  const [titles, setTitles] = useState<Record<string, string>>({});
  const query = useSearchQuery();
  const [filters, setFilters] = useState<Record<string, any>>({});
  const { styles } = useStyles();
  const {
    data,
    isLoading: loading,
    refetch,
  } = useQuery({
    queryKey: ["search-applications", filters, query],
    queryFn: () =>
      queryFakeList({ count: 8, ...filters, q: query }).then((res) => res.data),
  });

  const list = (data?.list || []).map((item) => ({
    ...item,
    title: titles[item.id] ?? item.title,
  }));
  const download = (item: ListItemDataType) => {
    const a = document.createElement("a");
    const url = URL.createObjectURL(
      new Blob([JSON.stringify(item, null, 2)], { type: "application/json" }),
    );
    a.href = url;
    a.download = item.title + ".json";
    a.click();
    URL.revokeObjectURL(url);
    message.success("应用信息已导出");
  };

  return (
    <div className={styles.filterCardList}>
      <Card variant="borderless">
        <Form onValuesChange={(_changes, values) => setFilters(values)}>
          <StandardFormRow
            title="所属类目"
            block
            style={{
              paddingBottom: 11,
            }}
          >
            <Form.Item name="category">
              <TagSelect expandable>
                {categoryOptions.flatMap((category) =>
                  category.value !== undefined && category.value !== null
                    ? [
                        <TagSelect.Option
                          value={category.value}
                          key={category.value}
                        >
                          {category.label}
                        </TagSelect.Option>,
                      ]
                    : [],
                )}
              </TagSelect>
            </Form.Item>
          </StandardFormRow>
          <StandardFormRow title="其它选项" grid last>
            <Row gutter={16}>
              <Col lg={8} md={10} sm={10} xs={24}>
                <Form.Item {...formItemLayout} name="author" label="作者">
                  <Select
                    placeholder="不限"
                    style={{
                      maxWidth: 200,
                      width: "100%",
                    }}
                    options={[
                      {
                        label: "王昭君",
                        value: "lisa",
                      },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col lg={8} md={10} sm={10} xs={24}>
                <Form.Item {...formItemLayout} name="rate" label="好评度">
                  <Select
                    placeholder="不限"
                    style={{
                      maxWidth: 200,
                      width: "100%",
                    }}
                    options={[
                      {
                        label: "优秀",
                        value: "good",
                      },
                      {
                        label: "普通",
                        value: "normal",
                      },
                    ]}
                  />
                </Form.Item>
              </Col>
            </Row>
          </StandardFormRow>
        </Form>
      </Card>
      <br />
      <List<ListItemDataType>
        rowKey="id"
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 3,
          lg: 3,
          xl: 4,
          xxl: 4,
        }}
        loading={loading}
        dataSource={list}
        renderItem={(item) => (
          <List.Item key={item.id}>
            <Card
              className="application-card"
              hoverable
              styles={{
                body: {
                  paddingBottom: 20,
                },
              }}
              actions={[
                <Tooltip key="download" title="下载">
                  <button
                    className="icon-action"
                    aria-label="下载"
                    onClick={() => download(item)}
                  >
                    <DownloadOutlined />
                  </button>
                </Tooltip>,
                <Tooltip key="edit" title="编辑">
                  <button
                    className="icon-action"
                    aria-label="编辑"
                    onClick={() => setEditing(item)}
                  >
                    <EditOutlined />
                  </button>
                </Tooltip>,
                <Tooltip title="分享" key="share">
                  <button
                    className="icon-action"
                    aria-label="分享"
                    onClick={() =>
                      modal.info({
                        title: `分享 ${item.title}`,
                        content: (
                          <Typography.Paragraph copyable>
                            {location.href + "?application=" + item.id}
                          </Typography.Paragraph>
                        ),
                        okText: "关闭",
                      })
                    }
                  >
                    <ShareAltOutlined />
                  </button>
                </Tooltip>,
                <Dropdown
                  trigger={["click"]}
                  key="ellipsis"
                  menu={{
                    onClick: ({ key }) =>
                      key === "1"
                        ? modal.info({
                            title: item.title,
                            content: item.description,
                            okText: "关闭",
                          })
                        : setEditing(item),
                    items: [
                      {
                        key: "1",
                        label: "查看详情",
                      },
                      {
                        key: "2",
                        label: "管理应用",
                      },
                    ],
                  }}
                >
                  <button className="icon-action" aria-label="更多">
                    <EllipsisOutlined />
                  </button>
                </Dropdown>,
              ]}
            >
              <Card.Meta
                avatar={<Avatar size="small" src={item.avatar} />}
                title={item.title}
              />
              <div>
                <CardInfo
                  activeUser={formatWan(item.activeUser)}
                  newUser={formatNumber(item.newUser)}
                />
              </div>
            </Card>
          </List.Item>
        )}
      />
      <ModalForm<{ title: string }>
        title="编辑应用"
        open={!!editing}
        onOpenChange={(open) => {
          if (!open) setEditing(undefined);
        }}
        initialValues={{ title: editing?.title }}
        modalProps={{ destroyOnHidden: true }}
        onFinish={async (values) => {
          if (editing)
            setTitles((old) => ({ ...old, [editing.id]: values.title }));
          setEditing(undefined);
          message.success("应用已更新");
          return true;
        }}
      >
        <ProFormText
          name="title"
          label="应用名称"
          rules={[{ required: true, message: "请输入应用名称" }]}
        />
      </ModalForm>
    </div>
  );
};
export default Applications;
