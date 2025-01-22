const r=`---\r
title: Object.defineProperty\r
date: 2025-01-16\r
summary: 在一个对象上定义一个新属性，或者修改一个已经存在的属性\r
---\r
\r
### 基本语法：\r
\r
\`\`\`js\r
Object.defineProperty(obj, prop, descriptor)\r
// 返回值为被定义的被或修改的对象\r
\`\`\`\r
\r
### 参数说明\r
\r
- obj 被定义（或修改）属性的对象\r
- prop 需定义（或修改）的属性\r
- descriptor 目标属性所拥有的特性\r
\r
### 使用栗子\r
\r
*\`configurable\`、 \`enumerable\`、 \`writable\` 默认值为 \`false\`*\r
\r
\`\`\`js\r
let target = {}\r
Object.defineProperty(target, 'key', {\r
  // configurable: false,\r
  // enumerable: false,\r
  // writable: false,\r
  value: 'key'\r
})\r
// configurable 、enumerable 、writable 均默认为 false\r
\r
console.log(target.key)\r
// => key\r
\`\`\`\r
\r
*接上边代码*\r
\r
其中：\r
\r
- \`configurable\` 表示可否再配置属性，为 \`false\` 的话则无法再修改（configurable、enumerable、writable）\r
\r
\`\`\`js\r
Object.defineProperty(target, 'key', {\r
  configurable: true,\r
  enumerable: true,\r
  writable: true,\r
  value: 'key'\r
})\r
\r
target.key = 'value'\r
console.log(target.key)\r
// 因为 configurable 已被设置为false,\r
// 所以再次设定其属性不起作用\r
// 所以 target.key => key\r
\`\`\`\r
\r
- \`enumerable\` 表示可否枚举\r
\r
\`\`\`js\r
for(let attr in target){\r
  console.log(attr)\r
}\r
// 由于 enumerable 为 false，\r
// 则 target 对象不可枚举\r
// 因此无打印\r
\r
let newTarget = {}\r
Object.defineProperty(newTarget, 'key', {\r
  enumerable: true,\r
  value: 'newKey'\r
})\r
for(let attr in newTarget){\r
  console.log(key)\r
}\r
// key\r
\`\`\`\r
\r
- \`writable\` 表示属性值可否被覆写\r
\r
\`\`\`js\r
target.key = 'hello world'\r
console.log(target.key)\r
// 无法被覆写，所以输出 key\r
\`\`\`\r
\r
`;export{r as default};
