const r=`---\r
title: 文本溢出隐藏\r
date: 2017-03-20\r
summary: CSS文本溢出隐藏显示省略号\r
---\r
\r
# 文本溢出隐藏显示省略号\r
\r
*需要指定盒子宽度。*\r
\r
## 单行文本溢出\r
\r
\`\`\`css\r
.ellipsis{\r
  text-overflow: ellipsis;\r
  white-space: nowrap;\r
  overflow: hidden;\r
}\r
\`\`\`\r
\r
## 多行文本溢出\r
\r
\`-webkit-line-clamp\` 控制溢出行数。\r
\r
\`\`\`css\r
// 两行溢出\r
.ellipsis-2{\r
  display: -webkit-box;\r
  -webkit-box-orient: vertical;\r
  -webkit-line-clamp: 2;\r
  overflow: hidden;\r
}\r
\r
// 三行溢出\r
.ellipsis-3{\r
  display: -webkit-box;\r
  -webkit-box-orient: vertical;\r
  -webkit-line-clamp: 3;\r
  overflow: hidden;\r
}\r
\`\`\``;export{r as default};
