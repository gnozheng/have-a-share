const n=`---\r
title: 绝对居中\r
date: 2017-03-20\r
summary: CSS绝对居中的几种方法\r
---\r
\r
# 绝对居中的几种方法\r
\r
1、最基本的绝对居中，使用 \`text-aligin\` + \`line-height\`：\r
\r
\`\`\`css\r
.parent {\r
  text-align: center;\r
  line-height: 50px;\r
}\r
.child {\r
  display: inline-block;\r
}\r
\`\`\`\r
\r
2、在知道容器宽高的情况下，可使用 \`margin\` 实现：\r
\r
\`\`\`css\r
.box {\r
  position: absolute;\r
  top: 50%;\r
  left: 50%;\r
  width: 100px;\r
  height: 100px;\r
  margin-top: -50px;\r
  margin-left: -50px;\r
}\r
\`\`\`\r
\r
3、在不知容器宽高的情况下，可通过 \`transform\` 实现：\r
\r
\`\`\`css\r
.box {\r
  position: absolute;\r
  top: 50%;\r
  left: 50%;\r
  transform: translate(-50%, -50%);\r
}\r
\`\`\`\r
\r
4、\`transfrom\`会出现模糊情况，另一种方案如下：\r
\r
\`\`\`css\r
.parent {\r
  text-align: center;\r
}\r
.parent::after {\r
  content: '';\r
  display: inline-block;\r
  height: 100%;\r
  width: 0;\r
  vertical-align: middle;\r
}\r
.child {\r
  display: inline-block;\r
  vertical-align: middle;\r
}\r
\`\`\`\r
\r
5、当然，在不考虑兼容ie10以下的话，可通过flex来实现：\r
\r
\`\`\`css\r
.parent{\r
  display: flex;\r
  align-item: center;\r
  justify-content: center;\r
}\r
\`\`\``;export{n as default};
