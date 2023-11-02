import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
/**
 * @ type { import('rollup).RollupOptions }
 */
const buildOptions = {
  input: ["src/index.js", "src/utils.js"],
  output: [
    {
      dir: "dist/es",
      format: "esm",
    },
    {
      dir: "dist/cjs",
      format: "cjs",
    },
  ],
  plugin: [resolve(), commonjs()],
};

export default buildOptions;
