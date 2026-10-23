import { App } from "antd";
import type { MessageInstance } from "antd/es/message/interface";
import type { ReactNode } from "react";
export let message: MessageInstance;
export function FeedbackProvider({ children }: { children: ReactNode }) {
  message = App.useApp().message;
  return <>{children}</>;
}
