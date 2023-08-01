import { defineConfig } from "vite";

export default defineConfig({
  optimizeDeps: {
    exclude: ["lodash-es"], // 在预构建中强制排除lodash-es依赖性，将不会被编译到vite的
  },
});
