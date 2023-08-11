import { defineConfig, loadEnv } from "vite";
import viteBaseConfig from "./vite.base.config";
import viteDevConfig from "./vite.dev.config";
import viteProdConfig from "./vite.prod.config";

// 策略模式
const envResolver = {
  build: () => {
    console.log("=========>", "生产环境");
    return { ...viteBaseConfig, ...viteProdConfig };
  },
  serve: () => {
    console.log("=========>", "开发环境");
    return { ...viteBaseConfig, ...viteDevConfig };
  },
};

export default defineConfig(({ command, mode }) => {
  const endEnv = loadEnv(mode, process.cwd(), "");
  // console.log("endEnv=========>", endEnv);
  console.log("envResolver[command]()=========>", envResolver[command]);
  // console.log("process.cwd()=========>", process.cwd());
  return envResolver[command]();
});
