// import { count } from "./about.js";

import lodash from "lodash-es";
// console.log("count=========>", count); // 能正常导入
console.log("lodash=========>", lodash); // 会报错，因为lodash中又引用了其它模块，就相当于要导入整个node_modules，而node_modules中的文件引用方式又会不同，所以为报文件路径文体
