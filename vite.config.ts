import { resolve } from "node:path";
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import tailwindcss from "@tailwindcss/vite";
import svgLoader from "vite-svg-loader";
import Icons from "unplugin-icons/vite";

/**
 * Prism Example Site - Vite 配置
 *
 * 使用仓内 vendor 源码，保留框架内部的相对引用。
 */

// 框架源码路径
const frameworkRoot = resolve(__dirname, "src/vendor/prism-fusion-web");
const frameworkSrc = resolve(frameworkRoot, "src");
const frameworkBuild = resolve(frameworkRoot, "build");

export default defineConfig(({ mode }) => {
  // 加载业务项目的 env 文件
  const env = loadEnv(mode, __dirname);

  return {
    resolve: {
      alias: {
        "prism-fusion-web/plugin": resolve(frameworkSrc, "plugin/index.ts"),
        "prism-fusion-web": resolve(frameworkSrc, "core/index.ts"),
        // ★ 关键：@ 指向框架 src，使框架内部的 @/ 引用全部正确解析
        "@": frameworkSrc,
        // @build 指向框架 build 目录
        "@build": frameworkBuild,
        // 业务代码用 @biz
        "@biz": resolve(__dirname, "src")
      }
    },
    server: {
      port: Number(env.VITE_PORT) || 3288,
      host: "0.0.0.0",
      proxy: {
        "/api": {
          target: env.VITE_API_UPSTREAM || "http://localhost:3280",
          changeOrigin: true,
          ws: true
        }
      },
      warmup: {
        clientFiles: [
          resolve(frameworkSrc, "views/**/*"),
          resolve(frameworkSrc, "components/**/*")
        ]
      }
    },
    plugins: [
      tailwindcss(),
      vue(),
      vueJsx(),
      svgLoader(),
      Icons({
        compiler: "vue3",
        scale: 1
      })
    ],
    build: {
      target: "es2015",
      sourcemap: false,
      chunkSizeWarningLimit: 4000,
      rollupOptions: {
        input: {
          index: resolve(__dirname, "index.html")
        },
        output: {
          chunkFileNames: "static/js/[name]-[hash].js",
          entryFileNames: "static/js/[name]-[hash].js",
          assetFileNames: "static/[ext]/[name]-[hash].[ext]"
        }
      }
    },
    define: {
      __INTLIFY_PROD_DEVTOOLS__: false,
      __APP_INFO__: JSON.stringify({
        pkg: { name: "prism-fusion-site-web", version: "1.0.0" },
        lastBuildTime: new Date().toISOString()
      })
    }
  };
});
