import { Link, useSearchParams } from "@umijs/max";
import { App, Button, Result } from "antd";
import React from "react";
import useStyles from "./style.style";

const RegisterResult: React.FC<Record<string, unknown>> = () => {
  const { modal } = App.useApp();
  const { styles } = useStyles();
  const [params] = useSearchParams();

  const actions = (
    <div className={styles.actions}>
      <Button
        size="large"
        type="primary"
        onClick={() =>
          modal.info({ title: "演示账户", content: email, okText: "关闭" })
        }
      >
        <span>查看账户</span>
      </Button>
      <Link to="/" prefetch>
        <Button size="large">返回首页</Button>
      </Link>
    </div>
  );

  const email = params?.get("account") || "AntDesign@example.com";
  return (
    <Result
      className={styles.registerResult}
      status="success"
      title={
        <div className={styles.title}>
          <span>你的账户：{email} 注册成功</span>
        </div>
      }
      subTitle="本地演示注册已完成，不会创建真实账户或发送邮件。可查看演示信息或返回首页。"
      extra={actions}
    />
  );
};
export default RegisterResult;
