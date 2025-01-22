const n=`---\r
title: 你不知道的JAVASCRIPT要点梳理\r
date: 2025-01-16\r
summary: 你不知道的JAVASCRIPT要点梳理\r
---\r
\r
### 一、字符串\r
\r
字符串和数组很相似，它们都是类数组，都有 \`length\` 属性以及 \`indexOf\` 和 \`concat\` 方法：\r
\r
\`\`\`js\r
var a = 'foo'\r
var b = ['f', 'o', 'o']\r
\r
a.length // 3\r
b.length // 3\r
\r
a.indexOf('o') // 1\r
b.indexOf('o') // 1\r
\r
var c = a.concat('bar') // foobar\r
var d = b.concat(['b', 'a', 'r']) // ['f', 'o', 'o', 'b', 'a', 'r']\r
\`\`\`\r
\r
字符串不可变，即字符串的成员函数不会改变其原始值，而数组函数会在其原始值上进行操作。\r
\r
\`\`\`js\r
var a = 'foo'\r
var b = ['f', 'o', 'o']\r
\r
var c = a.toUpperCase()\r
a === c // false\r
a // 'foo'\r
c // 'FOO'\r
\r
var d = b.push('!')\r
b // ['f', 'o', 'o', '!']\r
d // 4\r
\`\`\`\r
\r
可通过 '借用' 数组的**非变更方法**来处理字符串：\r
\r
\`\`\`js\r
var a = 'foo'\r
\r
a.join // undefine\r
a.map // undefine\r
a.reverse // undefine\r
\r
var c = Array.prototype.join.call(a, '-')\r
var d = Array.prototype.map.call(a, function(v){\r
  return v.toUpperCase() + '.'\r
}).join('')\r
var e = Array.prototype.reverse.call(a) // 报异常：Cannot assign to read only property '0' of object '[object String]'\r
\r
c // 'f-o-o'\r
d // 'F.O.O.'\r
e // undefine\r
\`\`\`\r
\r
### 二、数值\r
\r
特别大和特别小的数字默认用指数格式显示，与 toExponential() 函数的输出结果相同。\r
\r
\`\`\`js\r
var a = 5E10\r
a // 50000000000\r
a.toExponential() // '5e+10'\r
\r
var b = a * a\r
b // 2.5e+21\r
\r
var c = 1 / a\r
c // 2e-11\r
\`\`\`\r
\r
数字值可用 \`Number\` 对象进行封装，故可调用 \`Number.prototype\` 中的方法：\r
\r
\`\`\`js\r
var a = 42.59\r
\r
// 指定小数点后保留位数\r
a.toFixed(0) // '43'\r
a.toFixed(1) // '42.6'\r
a.toFixed(2) // '42.59'\r
a.toFixed(4) // '42.5900'\r
\r
// 指定有效数位的显示位数\r
a.toPrecision(1) // '4e+1'\r
a.toPrecision(2) // '43'\r
a.toPrecision(3) // '42.6'\r
a.toPrecision(4) // '42.59'\r
a.toPrecision(6) // '42.5900'\r
\`\`\`\r
\r
对于 \`.\` 运算符需要特别注意，因为它是一个有效的数字字符，会被优先识别为数字常量的一部分，然后才是对象属性访问运算符：\r
\r
\`\`\`js\r
// 无效语法：\r
42.toFixed(3) // SyntaxError\r
\r
// 有效语法\r
(42).toFixed(3) // '42.000'\r
0.42.toFixed(3) // '0.420'\r
42..toFixed(3) // '42.000'\r
42 .toFixed(3) // '42.000'\r
\`\`\`\r
\r
数值有个如下情况：\r
\r
\`\`\`js\r
0.1 + 0.2 === 0.3 // false\r
\`\`\`\r
\r
从数学角度来说，上面的条件判断应该为 true，可结果为什么是 false 呢？\r
\r
简单来说，0.1 和 0.2 并不是十分精确，它们相加的结果并非刚好等于 0.3，而是一个非常接近的数 —— 0.30000000000000004。对于如何判断 \`0.1 + 0.2 === 0.3\`，通常会设置一个误差范围值（'机器精度'），这个值为 \`2^-52 (2.220446049250313e-16)\`。\r
\r
从 ES6 开始，该值定义在 Number.EPSILON 中，我们可以直接拿来用，也可以为 ES6 之前\r
的版本写 polyfill：\r
\r
\`\`\`js\r
if (!Number.EPSILON) {\r
 Number.EPSILON = Math.pow(2,-52);\r
}\r
\`\`\`\r
\r
可以使用 Number.EPSILON 来比较两个数字是否相等（在指定的误差范围内）：\r
\r
\`\`\`js\r
function numbersCloseEnoughToEqual(n1,n2) {\r
 return Math.abs( n1 - n2 ) < Number.EPSILON;\r
}\r
var a = 0.1 + 0.2;\r
var b = 0.3;\r
numbersCloseEnoughToEqual( a, b ); // true\r
numbersCloseEnoughToEqual( 0.0000001, 0.0000002 ); // false\r
\`\`\`\r
\r
### 三、JSON字符串化\r
\r
工具函数 \`JSON.stringify(..)\` 在将 JSON 对象序列化为字符串时也用到了\`ToString\`。\r
\r
所有安全的\`JSON\`值都可使用 \`JSON.stringify(..)\` 字符串化。不安全的\`JSON\`值有 \`undefined\`、\`function\`、\`Symbol\`和包含循环引用（对象间互相引用，形成无限循环），这些都无法被\`JSON\`语法所处理。\r
\r
\`\`\`js\r
JSON.stringify(undefined) // undefined\r
JSON.stringify(function(){}) // undefined\r
JSON.stringify([1, undefined, function(){}, 4]) // "[1, null, null, 4]"\r
JSON.stringify({\r
  a: 2,\r
  b: function(){},\r
  c: undefined\r
})  // "{"a": 2}"\r
\`\`\`\r
\r
\`JSON.stringify(..)\` 在遇到上述例子的值时，会自动将其忽略。在数组中则会返回\`null\`（以保证单元位置不变）。而对包含循环引用的对象执行 \`JSON.stringify(..)\` 会报错。还有一点需要注意的是，如果对象中定义了 \`toJSON()\` 方法，JSON字符串化时会先调用该方法，然后用它的返回值来进行序列化。\r
\r
\`\`\`js\r
var o = {}\r
var a = {\r
  b: 28,\r
  c: o,\r
  d: function(){}\r
}\r
\r
// 创建循环引用\r
o.e = a\r
\r
// 循环引用报错\r
JSON.stringify(a) // Uncaught TypeError: Converting circular structure to JSON\r
\r
// 自定义JSON序列化\r
a.toJSON = function() {\r
 // 序列化仅包含b\r
 return { b: this.b };\r
}\r
\r
JSON.stringify(a) // "{"b": 28}"\r
\`\`\`\r
\r
\`JSON.stringify(..)\` 可接收一个可选参数（数组或函数），用来指定对象序列化过程哪些属性应该被处理，和 \`toJSON()\` 很像。\r
\r
\`\`\`js\r
var a = {\r
  b: 28,\r
  c: '28',\r
  d: [1, 2, 3]\r
}\r
\r
JSON.stringify(a, ['b', 'c']) // "{"b": 28, "c": "28"}"\r
\r
JSON.stringify(a, function(k, v){\r
  if(k !== 'c') return v\r
}) // "{"b": 28, "d": [1, 2, 3]}"\r
\`\`\`\r
\`JSON.stringify(..)\` 还有一个可选参数 \`space\`，用来指定输出的缩进格式。\r
\r
\`\`\`js\r
var a = {\r
  b: 28,\r
  c: '28',\r
  d: [1, 2, 3]\r
}\r
\r
JSON.stringify(a, null, 3)\r
\r
// "{Z\r
//   "b": 28,\r
//   "c": "42",\r
//   "d": [\r
//      1,\r
//      2,\r
//      3\r
//   ]\r
// }"\r
\`\`\``;export{n as default};
