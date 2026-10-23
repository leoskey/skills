import { Radar } from "@ant-design/plots";
import {
  ModalForm,
  ProFormText,
  PageContainer,
} from "@ant-design/pro-components";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@umijs/max";
import { Avatar, Card, Col, List, Row, Skeleton, Statistic } from "antd";
import dayjs from "dayjs";
import { useState, type FC } from "react";
import EditableLinkGroup from "./components/EditableLinkGroup";
import type { ActivitiesType, CurrentUser } from "./data.d";
import { fakeChartData, queryActivities, queryProjectNotice } from "./service";
import useStyles from "./style.style";

const PageHeaderContent: FC<{
  currentUser: Partial<CurrentUser>;
}> = ({ currentUser }) => {
  const { styles } = useStyles();
  const loading = currentUser && Object.keys(currentUser).length;
  if (!loading) {
    return (
      <Skeleton
        avatar
        paragraph={{
          rows: 1,
        }}
        active
      />
    );
  }
  return (
    <div className={styles.pageHeaderContent}>
      <div className={styles.avatar}>
        <Avatar size="large" src={currentUser.avatar} />
      </div>
      <div className={styles.content}>
        <div className={styles.contentTitle}>
          早安，
          {currentUser.name}
          ，祝你开心每一天！
        </div>
        <div>
          {currentUser.title} | {currentUser.group}
        </div>
      </div>
    </div>
  );
};
const ExtraContent: FC<Record<string, any>> = () => {
  const { styles } = useStyles();
  return (
    <div className={styles.extraContent}>
      <div className={styles.statItem}>
        <Statistic title="项目数" value={56} />
      </div>
      <div className={styles.statItem}>
        <Statistic title="团队内排名" value={8} suffix="/ 24" />
      </div>
      <div className={styles.statItem}>
        <Statistic title="项目访问" value={2223} />
      </div>
    </div>
  );
};
const Workplace: FC = () => {
  const { styles } = useStyles();
  const [shortcuts, setShortcuts] = useState<{ title: string; href: string }[]>(
    [],
  );
  const [addOpen, setAddOpen] = useState(false);
  const { isLoading: projectLoading, data: projectNotice = [] } = useQuery({
    queryKey: ["project-notice"],
    queryFn: () => queryProjectNotice().then((res) => res.data),
  });
  const { isLoading: activitiesLoading, data: activities = [] } = useQuery({
    queryKey: ["activities"],
    queryFn: () => queryActivities().then((res) => res.data),
  });
  const { data } = useQuery({
    queryKey: ["workplace-chart"],
    queryFn: () => fakeChartData().then((res) => res.data),
  });
  const renderActivities = (item: ActivitiesType) => {
    const events = item.template.split(/@\{([^{}]*)\}/gi).map((key) => {
      if (item[key as keyof ActivitiesType]) {
        const value = item[key as "user"];
        return (
          <a
            href={
              value === item.user ? "#/account/center" : "#/profile/advanced"
            }
            key={value?.name}
          >
            {value.name}
          </a>
        );
      }
      return key;
    });
    return (
      <List.Item key={item.id}>
        <List.Item.Meta
          avatar={<Avatar src={item.user.avatar} />}
          title={
            <span>
              <a className={styles.username} href="#/account/center">
                {item.user.name}
              </a>
              &nbsp;
              <span className={styles.event}>{events}</span>
            </span>
          }
          description={
            <span className={styles.datetime} title={item.updatedAt}>
              {dayjs(item.updatedAt).fromNow()}
            </span>
          }
        />
      </List.Item>
    );
  };

  return (
    <PageContainer
      content={
        <PageHeaderContent
          currentUser={{
            avatar:
              "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png",
            name: "吴彦祖",
            userid: "00000001",
            email: "antdesign@alipay.com",
            signature: "海纳百川，有容乃大",
            title: "交互专家",
            group: "蚂蚁集团－某某某事业群－某某平台部－某某技术部－UED",
          }}
        />
      }
      extraContent={<ExtraContent />}
    >
      <Row gutter={24}>
        <Col xl={16} lg={24} md={24} sm={24} xs={24}>
          <Card
            className={styles.projectList}
            styles={{ body: { padding: 0 } }}
            style={{
              marginBottom: 24,
            }}
            title="进行中的项目"
            variant="borderless"
            extra={
              <Link to="/list/search/projects" prefetch>
                全部项目
              </Link>
            }
            loading={projectLoading}
          >
            {projectNotice.map((item) => (
              <Card.Grid
                className={`${styles.projectGrid} workplace-project-grid`}
                key={item.id}
              >
                <Card.Meta
                  title={
                    <div className={styles.cardTitle}>
                      <Avatar size="small" src={item.logo} />
                      <Link to="/profile/advanced" prefetch>
                        {item.title}
                      </Link>
                    </div>
                  }
                  description={item.description}
                  style={{
                    width: "100%",
                  }}
                />
                <div className={styles.projectItemContent}>
                  <Link to="/account/center" prefetch>
                    {item.member || ""}
                  </Link>
                  {item.updatedAt && (
                    <span className={styles.datetime} title={item.updatedAt}>
                      {dayjs(item.updatedAt).fromNow()}
                    </span>
                  )}
                </div>
              </Card.Grid>
            ))}
          </Card>
          <Card
            styles={{
              body: {
                padding: activitiesLoading ? 16 : 0,
              },
            }}
            variant="borderless"
            className={styles.activeCard}
            title="动态"
            loading={activitiesLoading}
          >
            <List<ActivitiesType>
              loading={activitiesLoading}
              renderItem={(item) => renderActivities(item)}
              dataSource={activities}
              className={styles.activitiesList}
              size="large"
            />
          </Card>
        </Col>
        <Col xl={8} lg={24} md={24} sm={24} xs={24}>
          <Card
            style={{
              marginBottom: 24,
            }}
            title="快速开始 / 便捷导航"
            variant="borderless"
          >
            <EditableLinkGroup
              onAdd={() => setAddOpen(true)}
              links={shortcuts}
              linkElement={Link}
            />
          </Card>
          <Card
            style={{
              marginBottom: 24,
            }}
            variant="borderless"
            title="XX 指数"
            loading={data?.radarData?.length === 0}
          >
            <Radar
              height={343}
              data={data?.radarData || []}
              xField="label"
              colorField="name"
              yField="value"
              shapeField="smooth"
              area={{
                style: {
                  fillOpacity: 0.4,
                },
              }}
              axis={{
                y: {
                  gridStrokeOpacity: 0.5,
                },
              }}
              legend={{
                color: {
                  position: "bottom",
                  layout: { justifyContent: "center" },
                },
              }}
            />
          </Card>
          <Card
            styles={{
              body: {
                paddingTop: 12,
                paddingBottom: 12,
              },
            }}
            variant="borderless"
            title="团队"
            loading={projectLoading}
          >
            <div className={styles.members}>
              <Row gutter={48}>
                {projectNotice.map((item) => {
                  return (
                    <Col span={12} key={`members-item-${item.id}`}>
                      <Link to="/account/center" prefetch>
                        <Avatar src={item.logo} size="small" />
                        <span className={styles.member}>
                          {item.member.substring(0, 3)}
                        </span>
                      </Link>
                    </Col>
                  );
                })}
              </Row>
            </div>
          </Card>
        </Col>
      </Row>
      <ModalForm
        title="添加便捷导航"
        open={addOpen}
        onOpenChange={setAddOpen}
        onFinish={async (values) => {
          setShortcuts((old) => [
            ...old,
            { title: values.title, href: values.href },
          ]);
          return true;
        }}
      >
        <ProFormText
          name="title"
          label="名称"
          rules={[{ required: true, message: "请输入名称" }]}
        />
        <ProFormText
          name="href"
          label="页面路径"
          initialValue="/list/table-list"
          rules={[
            {
              required: true,
              pattern: /^\/[a-z0-9/-]+$/,
              message: "请输入有效的本地页面路径",
            },
          ]}
        />
      </ModalForm>
    </PageContainer>
  );
};
export default Workplace;
