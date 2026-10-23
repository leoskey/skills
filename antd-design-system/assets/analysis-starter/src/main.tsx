import "./runtime/responsive-observer";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/zh-cn";
dayjs.extend(relativeTime);
dayjs.locale("zh-cn");
import {
  BookOutlined,
  CheckCircleOutlined,
  CrownOutlined,
  DashboardOutlined,
  FormOutlined,
  ForkOutlined,
  GlobalOutlined,
  HomeOutlined,
  ProfileOutlined,
  RobotOutlined,
  SettingOutlined,
  TableOutlined,
  UserOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { ProLayout } from "@ant-design/pro-components";
import {
  App,
  Button,
  ConfigProvider,
  Drawer,
  Dropdown,
  Segmented,
  Tooltip,
  Typography,
} from "antd";
import zhCN from "antd/locale/zh_CN";
import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { renderPage, redirects } from "./page-registry";
import { proTheme } from "./theme";
import { PageBoundary } from "./runtime/PageBoundary";
import { FeedbackProvider } from "./runtime/feedback";
import { useModel, history, request } from "./runtime/umi";
import { ModelProvider } from "./runtime/umi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "antd/dist/reset.css";
import "./fonts.css";
import "./style.css";

const routes = [
  { path: "/welcome", name: "欢迎", icon: <HomeOutlined /> },
  {
    path: "/admin",
    name: "管理页",
    icon: <CrownOutlined />,
    routes: [{ path: "/admin/sub-page", name: "二级管理页" }],
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <DashboardOutlined />,
    routes: [
      { path: "/dashboard/analysis", name: "分析页" },
      { path: "/dashboard/monitor", name: "监控页" },
      { path: "/dashboard/workplace", name: "工作台" },
    ],
  },
  {
    path: "/form",
    name: "表单页",
    icon: <FormOutlined />,
    routes: [
      { path: "/form/basic-form", name: "基础表单" },
      { path: "/form/step-form", name: "分步表单" },
      { path: "/form/advanced-form", name: "高级表单" },
    ],
  },
  {
    path: "/list",
    name: "列表页",
    icon: <TableOutlined />,
    routes: [
      {
        path: "/list/search",
        name: "搜索列表",
        routes: [
          { path: "/list/search/articles", name: "搜索列表（文章）" },
          { path: "/list/search/projects", name: "搜索列表（项目）" },
          { path: "/list/search/applications", name: "搜索列表（应用）" },
        ],
      },
      { path: "/list/table-list", name: "查询表格" },
      { path: "/list/basic-list", name: "标准列表" },
      { path: "/list/card-list", name: "卡片列表" },
    ],
  },
  {
    path: "/profile",
    name: "详情页",
    icon: <ProfileOutlined />,
    routes: [
      { path: "/profile/basic", name: "基础详情页" },
      { path: "/profile/advanced", name: "高级详情页" },
    ],
  },
  {
    path: "/result",
    name: "结果页",
    icon: <CheckCircleOutlined />,
    routes: [
      { path: "/result/success", name: "成功页" },
      { path: "/result/fail", name: "失败页" },
    ],
  },
  {
    path: "/exception",
    name: "异常页",
    icon: <WarningOutlined />,
    routes: [
      { path: "/exception/403", name: "403" },
      { path: "/exception/404", name: "404" },
      { path: "/exception/500", name: "500" },
    ],
  },
  {
    path: "/account",
    name: "个人页",
    icon: <UserOutlined />,
    routes: [
      { path: "/account/center", name: "个人中心" },
      { path: "/account/settings", name: "个人设置" },
    ],
  },
  { path: "/chatbot", name: "AI 助手", icon: <RobotOutlined /> },
];
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      retry: 1,
      refetchOnWindowFocus: false,
      throwOnError: true,
    },
  },
});
function currentPath() {
  const path =
    (location.hash.slice(1).split("?")[0] || "/dashboard/analysis").replace(
      /\/+$/,
      "",
    ) || "/";
  return redirects[path] ?? path;
}
function Shell() {
  const { initialState, setInitialState } = useModel("@@initialState");
  const role = initialState.currentUser?.access ?? "guest";
  const [path, setPath] = useState(currentPath);
  const [collapsed, setCollapsed] = useState(false);
  const [settings, setSettings] = useState(false);
  const [mode, setMode] = useState<"light" | "dark">("light");
  const { modal } = App.useApp();
  useEffect(() => {
    const cb = () => {
      const raw = location.hash.slice(1).split("?")[0];
      if (redirects[raw]) {
        location.hash = redirects[raw];
      }
      setPath(currentPath());
      window.scrollTo(0, 0);
    };
    cb();
    window.addEventListener("hashchange", cb);
    return () => window.removeEventListener("hashchange", cb);
  }, []);
  function navigate(next: string) {
    location.hash = next;
    setPath(next);
  }
  useEffect(() => {
    const auth: Record<string, string> = {
      "/user/login": "登录",
      "/user/register": "注册",
      "/user/register-result": "注册结果",
    };
    if (path.startsWith("/user/"))
      document.title = (auth[path] ?? "404") + " - Ant Design Pro";
  }, [path]);
  const content = (
    <PageBoundary key={path} onRetry={() => queryClient.resetQueries()}>
      {renderPage(
        path.startsWith("/admin") && role !== "admin" ? "/exception/403" : path,
      )}
    </PageBoundary>
  );
  if (path.startsWith("/user/"))
    return <ConfigProvider theme={{ token: { colorPrimary: "#1677ff" } }}><div className="auth-page">{content}</div></ConfigProvider>;
  return (
    <>
      <ProLayout
        title="Ant Design Pro"
        logo="./logo.svg"
        layout="mix"
        navTheme={mode === "dark" ? "realDark" : "light"}
        contentWidth="Fluid"
        token={{ header: { heightLayoutHeader: 56 } }}
        siderWidth={256}
        fixedHeader={false}
        fixSiderbar
        collapsed={collapsed}
        onCollapse={setCollapsed}
        location={{ pathname: path }}
        route={{
          path: "/",
          routes: routes.filter(
            (item) => item.path !== "/admin" || role === "admin",
          ),
        }}
        menu={{ locale: false }}
        menuItemRender={(item, dom) => (
          <a href={`#${item.path}`} onClick={() => navigate(item.path!)}>
            {dom}
          </a>
        )}
        actionsRender={() => [
          <Tooltip title="使用文档" key="docs">
            <a
              aria-label="使用文档"
              href="https://pro.ant.design/"
              target="_blank"
              rel="noreferrer"
            >
              <BookOutlined />
            </a>
          </Tooltip>,
          <Tooltip title="源码版本" key="version">
            <a
              aria-label="源码版本"
              href="https://github.com/ant-design/ant-design-pro/tree/52506486ea134486937043c5fb677d89bbcd07f2"
              target="_blank"
              rel="noreferrer"
            >
              <ForkOutlined />
            </a>
          </Tooltip>,
          <Tooltip title="当前语言：简体中文" key="language">
            <Button
              type="text"
              aria-label="当前语言：简体中文"
              icon={<GlobalOutlined />}
              onClick={() =>
                modal.info({
                  title: "界面语言",
                  content: "当前演示使用简体中文。",
                  okText: "知道了",
                })
              }
            />
          </Tooltip>,
        ]}
        avatarProps={{
          src:
            initialState.currentUser?.avatar ??
            "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png",
          title: initialState.currentUser?.name ?? "ProUser",
          render: (_props, dom) => (
            <Dropdown
              trigger={["click"]}
              menu={{
                items: [
                  { key: "center", label: "个人中心" },
                  { key: "settings", label: "个人设置" },
                  { type: "divider" },
                  { key: "logout", label: "退出登录" },
                ],
                onClick: async ({ key }) => {
                  if (key === "logout") {
                    await request("/api/login/outLogin");
                    setInitialState((old) => ({
                      ...old,
                      currentUser: undefined,
                    }));
                    history.replace("/user/login");
                  } else
                    history.push(
                      key === "center"
                        ? "/account/center"
                        : "/account/settings",
                    );
                },
              }}
            >
              {dom}
            </Dropdown>
          ),
        }}
        footerRender={() => (
          <div className="demo-footer">
            Ant Design Pro © 2026 · 本地演示数据
          </div>
        )}
        bgLayoutImgList={[
          {
            src: "https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/D2LWSqNny4sAAAAAAAAAAAAAFl94AQBr",
            left: 85,
            bottom: 100,
            height: "303px",
          },
          {
            src: "https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/C2TWRpJpiC0AAAAAAAAAAAAAFl94AQBr",
            bottom: -68,
            right: -45,
            height: "303px",
          },
          {
            src: "https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/F6vSTbj8KpYAAAAAAAAAAAAAFl94AQBr",
            bottom: 0,
            left: 0,
            width: "331px",
          },
        ]}
      >
        {content}
      </ProLayout>
      <Button
        className="settings-trigger"
        type="primary"
        aria-label="页面设置"
        icon={<SettingOutlined />}
        onClick={() => setSettings(true)}
      />
      <Drawer
        title="页面设置"
        open={settings}
        onClose={() => setSettings(false)}
      >
        <Typography.Title level={5}>导航主题</Typography.Title>
        <Segmented
          value={mode}
          onChange={(v) => setMode(v as "light" | "dark")}
          options={[
            { value: "light", label: "浅色" },
            { value: "dark", label: "深色" },
          ]}
        />
        <Typography.Paragraph style={{ marginTop: 24 }} type="secondary">
          销售、访问及搜索数据均为本地演示数据。
        </Typography.Paragraph>
      </Drawer>
    </>
  );
}
createRoot(document.getElementById("root")!).render(
  <ConfigProvider locale={zhCN} variant="filled" theme={proTheme}>
    <App>
      <FeedbackProvider>
        <QueryClientProvider client={queryClient}>
          <ModelProvider>
            <Shell />
          </ModelProvider>
        </QueryClientProvider>
      </FeedbackProvider>
    </App>
  </ConfigProvider>,
);
