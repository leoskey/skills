import { ModalForm, ProFormText } from "@ant-design/pro-components";
import {
  DownloadOutlined,
  EditOutlined,
  EllipsisOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { App, Typography, Avatar, Card, Dropdown, List, Tooltip } from "antd";
import React, { useState } from "react";
import { formatNumber } from "@/utils/format";
import type { ListItemDataType } from "../../data.d";
import { queryFakeList } from "../../service";
import useStyles from "./index.style";

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

const CardInfo: React.FC<{
  activeUser: React.ReactNode;
  newUser: React.ReactNode;
}> = ({ activeUser, newUser }) => {
  const { styles: stylesApplications } = useStyles();
  return (
    <div className={stylesApplications.cardInfo}>
      <div>
        <p>活跃用户</p>
        <p>{activeUser}</p>
      </div>
      <div>
        <p>新增用户</p>
        <p>{newUser}</p>
      </div>
    </div>
  );
};

const Applications: React.FC = () => {
  const { modal, message } = App.useApp();
  const [editing, setEditing] = useState<ListItemDataType>();
  const [titles, setTitles] = useState<Record<string, string>>({});
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
  const { styles: stylesApplications } = useStyles();
  // 获取tab列表数据
  const { data: listData } = useQuery({
    queryKey: ["applications-list", 30],
    queryFn: () => queryFakeList({ count: 30 }).then((res) => res.data),
  });

  return (
    <>
      <List<ListItemDataType>
        rowKey="id"
        className={stylesApplications.filterCardList}
        grid={{
          gutter: 24,
          xxl: 3,
          xl: 2,
          lg: 2,
          md: 2,
          sm: 2,
          xs: 1,
        }}
        dataSource={(listData?.list || []).map((item) => ({
          ...item,
          title: titles[item.id] ?? item.title,
        }))}
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
    </>
  );
};
export default Applications;
