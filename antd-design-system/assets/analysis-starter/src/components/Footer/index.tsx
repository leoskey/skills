import { createStyles } from "antd-style";
const useStyles = createStyles(({ token }) => ({
  footer: {
    padding: "16px 24px",
    textAlign: "center",
    color: token.colorTextDescription,
    fontSize: token.fontSizeSM,
    lineHeight: token.lineHeight,
  },
  copyright: { marginBottom: 6 },
  meta: { fontSize: 11 },
}));
export default function Footer() {
  const { styles } = useStyles();
  return (
    <div className={styles.footer}>
      <div className={styles.copyright}>
        Ant Design Pro © {new Date().getFullYear()}
      </div>
      <div className={styles.meta}>本地演示数据</div>
    </div>
  );
}
