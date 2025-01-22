const n=`---\r
title: webpack 升级 4.x 后在 ie 上出现的问题\r
date: 2019-03-04\r
summary: 工作中踩过的坑\r
---\r
\r
### 基于 \`vue-cli@2.9.3\` 将 \`webpack\` 升级为 **4.x** 出现的问题\r
\r
> \`npm run dev\` 后在谷歌上正常运行，但在 ie 上出现了 \`./node_modules/strip-ansi/index.js\` 报错不能正常显示页面\r
\r
- 解决： 将 \`strip-ansi\` 降为**3.x 版本**\r
`;export{n as default};
