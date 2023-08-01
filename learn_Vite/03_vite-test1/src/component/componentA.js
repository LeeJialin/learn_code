// import cpnAcss from "../style/componetA.module.css";  // 未使用别名，则需要使用相对路径去找，如果层级很深，很容易出错
import cpnAcss from "@/style/componetA.module.css"; // 使用路径别名，进行配置
import commonCss from "../style/common.module.less";

const cpnA = document.createElement("div");
document.body.appendChild(cpnA);
cpnA.className = cpnAcss.footer;
