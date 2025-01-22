const r=`---\r
title: 画个三角形\r
date: 2017-03-20\r
summary: CSS实现三角形\r
---\r
\r
# 画个三角形\r
\r
向上的三角形：\r
\r
\`\`\`css\r
.triangle-up{\r
  display: inline-block;\r
  width: 0;\r
  height: 0;\r
  border-width: 0 10px 10px;\r
  border-style: solid;\r
  border-color: transparent transparent #000;\r
}\r
\`\`\`\r
\r
向左的三角形：\r
\r
\`\`\`css\r
.triangle-left{\r
  display: inline-block;\r
  width: 0;\r
  height: 0;\r
  border-width: 10px 10px 10px 0;\r
  border-style: solid;\r
  border-color: transparent transparent transparent #000;\r
}\r
\`\`\`\r
\r
可以发现，三角形向哪个方向，它的那个方向的 \`border-width\`为0、\`border-color\`则为所需颜色。`;export{r as default};
