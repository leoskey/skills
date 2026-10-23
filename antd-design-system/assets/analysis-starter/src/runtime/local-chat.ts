import { useEffect, useRef, useState } from "react";
import type { BubbleItemType } from "@ant-design/x";
type Raw = { role: string; content: string };
type Message<P> = { id: string; message: P; status: BubbleItemType["status"] };
export function useLocalChat<P>({
  conversationKey,
  parser,
}: {
  conversationKey: string;
  parser: (m: Raw) => P;
}) {
  const [threads, setThreads] = useState<Record<string, Message<P>[]>>({});
  const [streaming, setStreaming] = useState<string>();
  const timer = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const abort = () => {
    clearInterval(timer.current);
    setThreads((all) =>
      Object.fromEntries(
        Object.entries(all).map(([k, v]) => [
          k,
          v.map((m) =>
            m.status === "updating" || m.status === "loading"
              ? { ...m, status: "abort" as const }
              : m,
          ),
        ]),
      ),
    );
    setStreaming(undefined);
  };
  useEffect(() => {
    abort();
    return () => clearInterval(timer.current);
  }, [conversationKey]);
  const onRequest = ({ messages }: { messages: Raw[] }) => {
    abort();
    const key = conversationKey;
    const user = messages[messages.length - 1];
    const id = String(Date.now());
    const answer = `<think>根据当前问题整理演示说明。</think>这是本地演示回复。\n\n你问的是：**${user.content}**。\n\n可以先确定数据与组件状态，再用 Ant Design 的 Form、ProTable 或 ProLayout 实现对应流程。\n\n\`\`\`tsx\n<Button type="primary">提交</Button>\n\`\`\`\n\n本页使用固定回复展示流式交互。`;
    setThreads((all) => ({
      ...all,
      [key]: [
        ...(all[key] ?? []),
        { id: id + "u", message: parser(user), status: "success" },
        {
          id,
          message: parser({ role: "assistant", content: "" }),
          status: "loading",
        },
      ],
    }));
    setStreaming(key);
    let end = 0;
    timer.current = setInterval(() => {
      end = Math.min(answer.length, end + 8);
      setThreads((all) => ({
        ...all,
        [key]: all[key].map((m) =>
          m.id === id
            ? {
                ...m,
                message: parser({
                  role: "assistant",
                  content: answer.slice(0, end),
                }),
                status: end >= answer.length ? "success" : "updating",
              }
            : m,
        ),
      }));
      if (end >= answer.length) {
        clearInterval(timer.current);
        setStreaming(undefined);
      }
    }, 35);
  };
  return {
    onRequest,
    abort,
    isRequesting: streaming === conversationKey,
    parsedMessages: threads[conversationKey] ?? [],
  };
}
