import type { ThemeConfig } from "antd";
// Backend seed and card shadow follow the live 6.0.1 visual baseline.
export const proTheme: ThemeConfig = {
  cssVar: { key: "ant-pro-demo" },
  token: { colorPrimary: "#1890ff", fontFamily: "AlibabaSans, sans-serif" },
  components: {
    Card: {
      boxShadowTertiary:
        "0 1px 2px 0 rgba(0,0,0,0.03), 0 1px 6px -1px rgba(0,0,0,0.02), 0 2px 4px 0 rgba(0,0,0,0.02)",
    },
  },
};
