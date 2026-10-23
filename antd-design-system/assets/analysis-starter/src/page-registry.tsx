import React, { lazy, Suspense } from "react";
import { Spin } from "antd";
import AnalysisPage from "./AnalysisPage";
import FormPage from "./pages/form";
import ProfilePage from "./pages/profile";
import TablePage from "./pages/list";
import { OutletContext } from "./runtime/umi";
const pages = {
  "/welcome": lazy(() => import("./pages/Welcome")),
  "/admin/sub-page": lazy(() => import("./pages/Admin")),
  "/dashboard/monitor": lazy(() => import("./pages/dashboard/monitor")),
  "/dashboard/workplace": lazy(() => import("./pages/dashboard/workplace")),
  "/form/step-form": lazy(() => import("./pages/form/step-form")),
  "/form/advanced-form": lazy(() => import("./pages/form/advanced-form")),
  "/list/basic-list": lazy(() => import("./pages/list/basic-list")),
  "/list/card-list": lazy(() => import("./pages/list/card-list")),
  "/list/search/articles": lazy(() => import("./pages/list/search/articles")),
  "/list/search/projects": lazy(() => import("./pages/list/search/projects")),
  "/list/search/applications": lazy(
    () => import("./pages/list/search/applications"),
  ),
  "/profile/advanced": lazy(() => import("./pages/profile/advanced")),
  "/result/success": lazy(() => import("./pages/result/success")),
  "/result/fail": lazy(() => import("./pages/result/fail")),
  "/exception/403": lazy(() => import("./pages/exception/403")),
  "/exception/404": lazy(() => import("./pages/exception/404")),
  "/exception/500": lazy(() => import("./pages/exception/500")),
  "/account/center": lazy(() => import("./pages/account/center")),
  "/account/settings": lazy(() => import("./pages/account/settings")),
  "/user/login": lazy(() => import("./pages/user/login")),
  "/user/register": lazy(() => import("./pages/user/register")),
  "/user/register-result": lazy(() => import("./pages/user/register-result")),
  "/chatbot": lazy(() => import("./pages/chatbot")),
};
const SearchLayout = lazy(() => import("./pages/list/search"));
const core: Record<string, React.ComponentType> = {
  "/dashboard/analysis": AnalysisPage,
  "/form/basic-form": FormPage,
  "/list/table-list": TablePage,
  "/profile/basic": ProfilePage,
};
export function renderPage(path: string) {
  const Page =
    core[path] ?? pages[path as keyof typeof pages] ?? pages["/exception/404"];
  const content = <Page key={path} />;
  return (
    <Suspense
      fallback={
        <div style={{ padding: 80, textAlign: "center" }}>
          <Spin size="large" />
        </div>
      }
    >
      {path.startsWith("/list/search/") ? (
        <OutletContext.Provider value={content}>
          <SearchLayout />
        </OutletContext.Provider>
      ) : (
        content
      )}
    </Suspense>
  );
}
export const redirects: Record<string, string> = {
  "/": "/dashboard/analysis",
  "/admin/permissions": "/admin/sub-page",
  "/admin": "/admin/sub-page",
  "/dashboard": "/dashboard/analysis",
  "/form": "/form/basic-form",
  "/list": "/list/table-list",
  "/list/search": "/list/search/articles",
  "/profile": "/profile/basic",
  "/result": "/result/success",
  "/exception": "/exception/403",
  "/account": "/account/center",
  "/user": "/user/login",
};
