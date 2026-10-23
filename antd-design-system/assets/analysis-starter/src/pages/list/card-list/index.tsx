import { PlusOutlined } from "@ant-design/icons";
import { PageContainer } from "@ant-design/pro-components";
import { useQuery } from "@tanstack/react-query";
import { App, Button, Card, List, Typography } from "antd";
import {
  ModalForm,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components";
import { useState } from "react";
import type { CardListItemDataType } from "./data.d";
import { queryFakeList } from "./service";
import useStyles from "./style.style";

const { Paragraph } = Typography;
const nullData: Partial<CardListItemDataType> = {};

const CardList = () => {
  const { styles } = useStyles();
  const { modal, message } = App.useApp();
  const [createOpen, setCreateOpen] = useState(false);
  const [created, setCreated] = useState<Partial<CardListItemDataType>[]>([]);
  const { data, isLoading: loading } = useQuery({
    queryKey: ["card-list"],
    queryFn: () => queryFakeList({ count: 8 }).then((res) => res.data),
  });
  const list = [...created, ...(data?.list || [])];
  const content = (
    <div className={styles.pageHeaderContent}>
      <p>
        段落示意：蚂蚁集团设计平台
        ant.design，用最小的工作量，无缝接入蚂蚁集团生态，
        提供跨越设计与开发的体验解决方案。
      </p>
      <div className={styles.contentLink}>
        <a href="https://pro.ant.design/zh-CN/docs/getting-started">
          <img
            alt=""
            src="https://gw.alipayobjects.com/zos/rmsportal/MjEImQtenlyueSmVEfUD.svg"
          />{" "}
          快速开始
        </a>
        <a href="https://pro.ant.design/zh-CN/docs/introduction">
          <img
            alt=""
            src="https://gw.alipayobjects.com/zos/rmsportal/NbuDUAuBlIApFuDvWiND.svg"
          />{" "}
          产品简介
        </a>
        <a href="https://pro.ant.design/zh-CN/docs/overview">
          <img
            alt=""
            src="https://gw.alipayobjects.com/zos/rmsportal/ohOEPSYdDTNnyMbGuyLb.svg"
          />{" "}
          产品文档
        </a>
      </div>
    </div>
  );
  const extraContent = (
    <div className={styles.extraImg}>
      <img
        alt="这是一个标题"
        src="https://gw.alipayobjects.com/zos/rmsportal/RzwpdLnhmvDJToTdfDPe.png"
      />
    </div>
  );
  return (
    <PageContainer content={content} extraContent={extraContent}>
      <div className={styles.cardList}>
        <List<Partial<CardListItemDataType>>
          rowKey="id"
          loading={loading}
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 3,
            lg: 3,
            xl: 4,
            xxl: 4,
          }}
          dataSource={[nullData, ...list]}
          renderItem={(item) => {
            if (item?.id) {
              return (
                <List.Item key={item.id}>
                  <Card
                    hoverable
                    className={styles.card}
                    actions={[
                      <Button
                        key="option1"
                        type="link"
                        onClick={() =>
                          modal.info({
                            title: item.title,
                            content: item.description,
                            okText: "关闭",
                          })
                        }
                      >
                        操作一
                      </Button>,
                      <Button
                        key="option2"
                        type="link"
                        onClick={() =>
                          message.success(`${item.title}：操作已完成`)
                        }
                      >
                        操作二
                      </Button>,
                    ]}
                  >
                    <Card.Meta
                      avatar={
                        <img
                          alt=""
                          className={styles.cardAvatar}
                          src={item.avatar}
                        />
                      }
                      title={<a href={item.href}>{item.title}</a>}
                      description={
                        <Paragraph
                          className={styles.item}
                          ellipsis={{
                            rows: 3,
                          }}
                        >
                          {item.description}
                        </Paragraph>
                      }
                    />
                  </Card>
                </List.Item>
              );
            }
            return (
              <List.Item>
                <Button
                  type="dashed"
                  className={styles.newButton}
                  onClick={() => setCreateOpen(true)}
                >
                  <PlusOutlined /> 新增产品
                </Button>
              </List.Item>
            );
          }}
        />
      </div>
      <ModalForm<{ title: string; description: string }>
        title="新增产品"
        open={createOpen}
        onOpenChange={setCreateOpen}
        modalProps={{ destroyOnHidden: true }}
        onFinish={async (values) => {
          setCreated((old) => [
            {
              ...values,
              id: "local-" + Date.now(),
              avatar:
                "https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png",
            },
            ...old,
          ]);
          message.success("产品已新增");
          return true;
        }}
      >
        <ProFormText
          name="title"
          label="产品名称"
          rules={[{ required: true, message: "请输入产品名称" }]}
        />
        <ProFormTextArea name="description" label="产品描述" />
      </ModalForm>
    </PageContainer>
  );
};
export default CardList;
