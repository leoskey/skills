import { Component } from "react";
import type { ReactNode } from "react";
import { Button, Card, Result } from "antd";
export class PageBoundary extends Component<
  { children: ReactNode; onRetry: () => Promise<unknown> },
  { error: Error | null; retrying: boolean }
> {
  state: { error: Error | null; retrying: boolean } = { error: null, retrying: false };
  static getDerivedStateFromError(error: Error) {
    return { error, retrying: false };
  }
  render() {
    const error = this.state.error;
    const resourceError = !!error && /加载失败|fetch|network|chunk|dynamically imported/i.test(error.message);
    return error ? (
      <Card className="page-boundary-fallback" variant="borderless" style={{ margin: 24 }}>
        <Result
          status="error"
          title={resourceError ? "页面加载失败" : "页面出现错误"}
          subTitle={resourceError
            ? navigator.onLine ? "页面资源加载失败，请重新加载重试。" : "网络连接已断开，请检查网络后重新加载。"
            : "抱歉，页面遇到了一些问题，请刷新页面或返回首页。"}
          extra={[
            resourceError && <Button key="retry"
              type="primary"
              loading={this.state.retrying}
              onClick={async () => {
                this.setState({ retrying: true });
                try {
                  await this.props.onRetry();
                } finally {
                  this.setState({ error: null, retrying: false });
                }
              }}
            >
              重试
            </Button>,
            <Button key="reload" type={resourceError ? "default" : "primary"} onClick={() => location.reload()}>刷新页面</Button>,
            <Button key="home" href="#/dashboard/analysis">返回首页</Button>,
          ].filter(Boolean)}
        />
      </Card>
    ) : (
      this.props.children
    );
  }
}
