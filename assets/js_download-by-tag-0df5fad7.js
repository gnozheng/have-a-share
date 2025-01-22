const r=`---\r
title: js实现下载\r
date: 2025-01-16\r
summary: js实现下载\r
---\r
\r
## 通过a标签即可实现下载\r
\r
\`\`\`js\r
const contentToDownload = '下载的内容'\r
let link = document.createElement('a')\r
link.href = contentToDownload\r
link.download = 'name' + '.后缀'\r
// appendChild为了兼容火狐\r
document.body.appendChild(link)\r
link.click()\r
document.body.removeChild(link)\r
\`\`\`\r
\r
很简单，通过a标签的download属性即可实现下载功能。\r
那么，\`contentToDownload\` 即下载的内容应该是个什么东西呢？\r
\r
## 可以是\`Blob\` 对象\r
\r
Blob 对象表示一个不可变、原始数据的类文件对象。\r
其构造函数：\`Blob(blobParts[, options])\`返回新创建\`Blob\`对象，内容由参数中给定的数组串联组成，如：\r
\r
\`\`\`js\r
let text = {\r
  a: 'a',\r
  b: 'b'\r
}\r
// new Blob([内容], MIME类型)\r
let blob = new Blob([JSON.stringify(text, null, 2)], {type: 'application/json})\r
\`\`\`\r
\r
以上代码返回的\`Blob\`对象是这样的：\r
\r
\`\`\`js\r
Blob {\r
  size: 26,\r
  type: 'application/json'\r
}\r
\`\`\`\r
\r
那么，通过指定 \`link.herf = blob\` 即可下载到文件了。\r
\r
## 也可以是 \`URL.createObjectURL\` 创建的URL对象\r
\r
\`URL.createObjectURL\` 方法提供了将\`File\` 对象、\`Blob\` 对象或者 \`MediaSource\` 对象转为url​。\r
\r
\`\`\`js\r
// 接 Blob对象代码块\r
let dataUrl = URL.createObjectURL(blob)\r
// dataUrl => 一个类似blob:d3958f5c-0777-0845-9dcf-2cb28783acaf 这样的URL字符串\r
// 可以像使用一个普通URL那样使用它，比如用在img.src上\r
\r
// 所以下载文件指定 link.href = dataUrl\r
\`\`\`\r
\r
*在每次调用 \`createObjectURL()\` 方法时，都会创建一个新的 URL 对象，即使你已经用相同的对象作为参数创建过。\r
当不再需要这些 URL 对象时，每个对象必须通过调用 \`URL.revokeObjectURL()\` 方法来释放。\r
浏览器会在文档退出的时候自动释放它们，但是为了获得最佳性能和内存使用状况，应该在安全的时机主动释放掉它们。*\r
\r
## 还可以是 \`FileReader.readAsDataURL\` 返回的结果 \r
\r
FileReader 对象允许Web应用程序异步读取存储在用户计算机上的文件（或原始数据缓冲区）的内容，使用 File 或 Blob 对象指定要读取的文件或数据。\r
\r
首先创建\`FileReader\`对象并进行监听：\r
\r
\`\`\`js\r
// 接 Blob对象代码块\r
let reader = new FileReader()\r
reader.addEventListener('loadend', () => {\r
  console.log(reader.result)\r
  link.href = reader.result\r
})\r
\`\`\`\r
\r
当reader读取到文件后就可以看到打印信息了：\r
\r
\`\`\`js\r
reader.readAsDataURL(blob)\r
// 输出类似这样的\r
// data:application/json;base64,ewogICJhIjogImEiLAogICJiIjogImIiCn0=\r
\r
reader.readAsArrayBuffer(blob)\r
// 输出 ArrayBuffer 数据对象\r
\r
reader.readAsText(blob)\r
// 输出"{\r
//   "a": "a",\r
//   "b": "b"\r
// }"\r
\r
FileReader.abort()\r
// 中止读取操作。在返回时，readyState属性为DONE\r
\`\`\``;export{r as default};
