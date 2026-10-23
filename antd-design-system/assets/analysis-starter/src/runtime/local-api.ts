import { getCityOptions, provinceOptions } from "../utils/chinaDivision";
type Options = {
  method?: string;
  params?: object;
  data?: object;
  [key: string]: unknown;
};
type Fixture = Record<string, any>;
let fixturePromise: Promise<Fixture> | undefined;
let tasks: Fixture[] | undefined;
let currentAuthority = sessionStorage.getItem("demo-authority") ?? "admin";
async function fixtures() {
  return (fixturePromise ??= fetch(
    new URL("./fixtures/api.json", document.baseURI),
    { cache: "no-store" },
  )
    .then((r) => {
      if (!r.ok) throw new Error("演示数据加载失败");
      return r.json();
    })
    .catch((error) => {
      fixturePromise = undefined;
      throw error;
    }));
}
export async function request<T = any>(
  url: string,
  options: Options = {},
): Promise<T> {
  const f = await fixtures(),
    data = (options.data ?? {}) as Record<string, unknown>,
    p = (options.params ?? {}) as Record<string, unknown>;
  if (url === "/api/login/account") {
    const valid =
      ((data.username === "admin" || data.username === "user") &&
        data.password === "ant.design") ||
      (data.type === "mobile" && data.captcha === "1234");
    if (valid) {
      currentAuthority = data.username === "user" ? "user" : "admin";
      sessionStorage.setItem("demo-authority", currentAuthority);
    }
    return {
      status: valid ? "ok" : "error",
      type: data.type,
      currentAuthority,
    } as T;
  }
  if (url === "/api/login/outLogin") {
    currentAuthority = "guest";
    sessionStorage.setItem("demo-authority", currentAuthority);
    return { data: {}, success: true } as T;
  }
  if (url === "/api/login/captcha")
    return { status: "ok", captcha: "1234" } as T;
  if (url === "/api/currentUser")
    return {
      data: {
        ...f[url].data,
        access: currentAuthority,
        name: currentAuthority === "user" ? "User" : "ProUser",
      },
    } as T;
  if (
    url === "/api/currentUserDetail" ||
    url === "/api/accountSettingCurrentUser"
  )
    return structuredClone(f["/api/currentUserDetail"]) as T;
  if (url === "/api/register")
    return { status: "ok", currentAuthority: "user" } as T;
  if (["/api/basicForm", "/api/advancedForm", "/api/stepForm"].includes(url)) {
    sessionStorage.setItem(url, JSON.stringify(data));
    return { status: "ok", data, success: true } as T;
  }
  if (url === "/api/geographic/province") return { data: provinceOptions } as T;
  if (url.startsWith("/api/geographic/city/"))
    return {
      data: getCityOptions(decodeURIComponent(url.split("/").pop()!)),
    } as T;
  if (url === "/api/get_list") {
    tasks ??= structuredClone(f[url].data.list).slice(0, Number(p.count) || 50);
    return { data: { list: structuredClone(tasks) } } as T;
  }
  if (url === "/api/post_fake_list") {
    tasks ??= structuredClone(f["/api/get_list"].data.list).slice(0, 50);
    const ownerNames: Record<string, string> = {
      xiao: "付晓晓",
      mao: "周毛毛",
    };
    const taskData = {
      ...data,
      ...(data.owner
        ? { owner: ownerNames[String(data.owner)] ?? data.owner }
        : {}),
    };
    if (data.method === "delete")
      tasks = tasks!.filter((x) => x.id !== data.id);
    else if (data.method === "update")
      tasks = tasks!.map((x) => (x.id === data.id ? { ...x, ...taskData } : x));
    else
      tasks!.unshift({
        ...taskData,
        id: `local-${Date.now()}`,
        createdAt: data.createdAt || "2026-10-22 09:00",
        status: "active",
        percent: 0,
      });
    return { data: { list: structuredClone(tasks) } } as T;
  }
  if (!(url in f)) throw new Error(`没有对应的本地演示数据：${url}`);

  if (url === "/api/fake_list") {
    const ids = ["wjh", "zxx", "wzj"];
    const list = f[url].data.list.filter(
      (item: Fixture, i: number) =>
        (!p.q ||
          `${item.title} ${item.description} ${item.content}`
            .toLowerCase()
            .includes(String(p.q).toLowerCase())) &&
        (!Array.isArray(p.category) ||
          !p.category.length ||
          p.category.includes(`cat${(i % 12) + 1}`)) &&
        (!Array.isArray(p.owner) ||
          !p.owner.length ||
          p.owner.includes(ids[Math.floor(i / 5) % 3])) &&
        (!p.author || i % 2 === 0) &&
        (!p.user || i % 2 === 0) &&
        (!p.rate || (p.rate === "good" ? i % 3 !== 1 : i % 3 === 1)),
    );
    return {
      data: { list: structuredClone(list.slice(0, Number(p.count) || 8)) },
    } as T;
  }
  const result = structuredClone(f[url]);
  if (result?.data?.list && p.count)
    result.data.list = result.data.list.slice(0, Number(p.count));
  return result as T;
}
