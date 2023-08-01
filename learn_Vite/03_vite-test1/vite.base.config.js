import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  envPrefix: "Basara", // 环境变量前缀命名，默认 VITE_
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // 设置别名, 以后我们在其他组件中可以使用@来代替src这个目录
    },
  },
});
