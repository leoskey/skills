import { GlobalOutlined } from "@ant-design/icons";
import { Button, Dropdown } from "antd";
import React, {
  createContext,
  useContext,
  useState,
  useSyncExternalStore,
  useEffect,
} from "react";
import messages from "../locales/zh-CN";
import Settings from "../../config/defaultSettings";
import { request } from "./local-api";
export { request };
type Descriptor = { id?: string; defaultMessage?: string };
const dictionary: Record<string, string> = messages;
function formatMessage(
  d: Descriptor,
  values?: Record<string, string | number>,
): string;
function formatMessage(
  d: Descriptor,
  values: Record<string, React.ReactNode>,
): React.ReactNode;
function formatMessage(
  d: Descriptor,
  values: Record<string, React.ReactNode> = {},
): React.ReactNode {
  const text = dictionary[d.id ?? ""] ?? d.defaultMessage ?? d.id ?? "";
  if (
    Object.values(values).every(
      (v) => typeof v === "string" || typeof v === "number",
    )
  )
    return text.replace(/\{(\w+)\}/g, (_, key) =>
      String(values[key] ?? `{${key}}`),
    );
  return text
    .split(/(\{\w+\})/)
    .map((part, i) =>
      /^\{\w+\}$/.test(part) ? (
        <React.Fragment key={i}>{values[part.slice(1, -1)]}</React.Fragment>
      ) : (
        part
      ),
    );
}
export const useIntl = () => ({ formatMessage });
export const getIntl = useIntl;
export function FormattedMessage({
  id,
  defaultMessage,
  values,
}: {
  id?: string;
  defaultMessage?: string;
  values?: Record<string, React.ReactNode>;
}) {
  return <>{formatMessage({ id, defaultMessage }, values ?? {})}</>;
}
export const getLocale = () => "zh-CN";
export const getAllLocales = () => ["zh-CN"];
export const setLocale = () => {};
export const SelectLang = () => (
  <Dropdown
    menu={{
      items: [{ key: "zh-CN", label: "简体中文" }],
      selectedKeys: ["zh-CN"],
    }}
  >
    <Button type="text" aria-label="简体中文" icon={<GlobalOutlined />} />
  </Dropdown>
);
export function Helmet({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const title = React.Children.toArray(children).find(
      (child) => React.isValidElement(child) && child.type === "title",
    ) as React.ReactElement<{ children: React.ReactNode }> | undefined;
    if (title)
      document.title = React.Children.toArray(title.props.children).join("");
  });
  return null;
}
const subscribe = (cb: () => void) => {
  window.addEventListener("hashchange", cb);
  return () => window.removeEventListener("hashchange", cb);
};
export function useLocation() {
  const raw = useSyncExternalStore(
    subscribe,
    () => location.hash.slice(1) || "/dashboard/analysis",
  );
  const [pathname, search = ""] = raw.split("?");
  return {
    pathname: pathname.replace(/\/+$/, "") || "/",
    search: search ? "?" + search : "",
    hash: "",
  };
}
const destination = (to: string | { pathname?: string; search?: string }) =>
  typeof to === "string"
    ? to
    : (to.pathname ?? "/") +
      (to.search ? (to.search.startsWith("?") ? "" : "?") + to.search : "");
export const history = {
  push: (to: string | { pathname?: string; search?: string }) => {
    location.hash = destination(to);
  },
  replace: (to: string | { pathname?: string; search?: string }) => {
    const hash = destination(to);
    window.history.replaceState(null, "", "#" + hash);
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  },
};
export const Link = ({
  to,
  prefetch: _prefetch,
  children,
  ...props
}: Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  to: string | { pathname?: string; search?: string };
  prefetch?: boolean;
}) => (
  <a {...props} href={"#" + destination(to)}>
    {children}
  </a>
);
export function useSearchParams(): [
  URLSearchParams,
  (value: URLSearchParams) => void,
] {
  const l = useLocation();
  return [
    new URLSearchParams(l.search),
    (v) => history.replace(l.pathname + "?" + v.toString()),
  ];
}
export const useMatch = (pathname: string) => ({ pathname });
export const OutletContext = createContext<React.ReactNode>(null);
export const Outlet = () => <>{useContext(OutletContext)}</>;
type InitialState = {
  currentUser?: API.CurrentUser;
  settings: typeof Settings;
  fetchUserInfo: () => Promise<API.CurrentUser>;
};
const initial: InitialState = {
  currentUser: {
    name:
      sessionStorage.getItem("demo-authority") === "user" ? "User" : "ProUser",
    access: sessionStorage.getItem("demo-authority") ?? "admin",
    avatar:
      "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png",
  },
  settings: Settings,
  fetchUserInfo: async () =>
    (await request<{ data: API.CurrentUser }>("/api/currentUser")).data,
};
const ModelContext = createContext<{
  initialState: InitialState;
  setInitialState: React.Dispatch<React.SetStateAction<InitialState>>;
}>({ initialState: initial, setInitialState: () => {} });
export function ModelProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState(initial);
  return (
    <ModelContext.Provider
      value={{ initialState: state, setInitialState: setState }}
    >
      {children}
    </ModelContext.Provider>
  );
}
export const useModel = (_name: string) => useContext(ModelContext);
