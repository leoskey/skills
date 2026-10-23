import { PageContainer } from "@ant-design/pro-components";
import { history, Outlet, useLocation, useMatch } from "@umijs/max";
import { Button, Input } from "antd";
import { useState } from "react";
import { SearchQueryContext } from "@/runtime/search";
import type { FC } from "react";

type SearchProps = {
  children?: React.ReactNode;
};

const tabList = [
  {
    key: "articles",
    tab: "文章",
  },
  {
    key: "projects",
    tab: "项目",
  },
  {
    key: "applications",
    tab: "应用",
  },
];

const Search: FC<SearchProps> = () => {
  const [query, setQuery] = useState("");
  const location = useLocation();
  const match = useMatch(location.pathname);
  const handleTabChange = (key: string) => {
    const url =
      match?.pathname === "/"
        ? ""
        : match?.pathname.substring(0, match.pathname.lastIndexOf("/"));
    switch (key) {
      case "articles":
        history.push(`${url}/articles`);
        break;
      case "applications":
        history.push(`${url}/applications`);
        break;
      case "projects":
        history.push(`${url}/projects`);
        break;
      default:
        break;
    }
  };

  const getTabKey = () => {
    const tabKey = location.pathname.substring(
      location.pathname.lastIndexOf("/") + 1,
    );
    if (tabKey && tabKey !== "/") {
      return tabKey;
    }
    return "articles";
  };

  return (
    <PageContainer
      className="search-page"
      content={
        <div style={{ textAlign: "center" }}>
          <Input.Search
            className="shared-search"
            placeholder="请输入"
            enterButton={<Button type="primary">搜索</Button>}
            onSearch={setQuery}
            size="large"
            style={{ maxWidth: 522, width: "100%" }}
          />
        </div>
      }
      tabList={tabList}
      tabActiveKey={getTabKey()}
      onTabChange={handleTabChange}
    >
      <SearchQueryContext.Provider value={query}>
        <Outlet />
      </SearchQueryContext.Provider>
    </PageContainer>
  );
};

export default Search;
