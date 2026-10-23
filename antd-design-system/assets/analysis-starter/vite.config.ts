import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";
const local = (p: string) => fileURLToPath(new URL(p, import.meta.url));
export default defineConfig({
  base: "./",
  build: {
    cssCodeSplit: false,
    rolldownOptions: {
      onwarn(warning, defaultHandler) {
        /* All modules run in this client-only SPA. */ if (
          warning.code === "MODULE_LEVEL_DIRECTIVE"
        )
          return;
        defaultHandler(warning);
      },
      output: { codeSplitting: false },
    },
  },
  plugins: [
    {
      name: "preview-bootstrap",
      transformIndexHtml: {
        order: "post",
        handler: (html, context) =>
          context.bundle
            ? html.replace(
                /<script type="module" crossorigin src="([^"]+)"><\/script>/,
                (_tag, src) =>
                  `<script type="module">import(${JSON.stringify(src)}).catch(()=>{const root=document.getElementById('root');if(root){const message=document.createElement('p');message.textContent='页面加载失败，请刷新重试。';root.replaceChildren(message);}})</script>`,
              )
            : html,
      },
    },
  ],
  resolve: {
    alias: {
      "@umijs/max": local("./src/runtime/umi.tsx"),
      "@root": local("."),
      "@": local("./src"),
    },
  },
  define: {
    __APP_VERSION__: JSON.stringify("6.0.3"),
    __UMI_VERSION__: JSON.stringify("standalone"),
    __UTOO_VERSION__: JSON.stringify("local"),
    "process.env.COMMIT_HASH": JSON.stringify(
      "52506486ea134486937043c5fb677d89bbcd07f2",
    ),
  },
});
