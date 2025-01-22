const r=`---\r
title: vue页面切换动画\r
date: 2025-01-16\r
summary: vue页面切换动画\r
---\r
\r
### 一、在\`router-view\`上套一个\`transition\`，定义\`name\`为绑定值\`skipName\`\r
\r
\`\`\`html\r
<!-- skipName在data中定义 -->\r
<transition :name="skipName">\r
  <router-view />\r
</transition>\r
\`\`\`\r
\r
### 二、根据路由\`fullPath\`来设置\`skipName\`值\r
\r
\`\`\`js\r
// 例如：\r
// 让 '/info' 跳转到 '/info/detail'时为'skip-right'，\r
// 则 '/info/detail' 跳转到 '/info'为'skip-left'\r
watch: {\r
  $route(to, from){\r
    if (to.fullPath.split('/').length > from.fullPath.split('/').length) {\r
      this.skipName = 'skip-right'\r
    } else {\r
      this.skipName = 'skip-left'\r
    }\r
  }\r
}\r
\`\`\`\r
\r
### 三、为\`skip-left\`和\`skip-right\`设置样式\r
\r
\`\`\`scss\r
.skip-left,\r
.skip-right {\r
  // 需要过渡的样式属性\r
  &-enter-active,\r
  &-leave-active {\r
    transition: transform 0.2s;\r
  }\r
\r
  // 防止新元素进入受将当前元素位置影响造成布局错误和布局抖动，\r
  // 也可使用 mode="out-in" 使当前元素先进行过渡离开再让新元素过渡进入\r
  &-leave-active {\r
    position: absolute;\r
  }\r
}\r
\r
.skip-left {\r
  &-enter {\r
    transform: translate3d(-100%, 0, 0);\r
  }\r
  &-leave-to {\r
    opacity: 0;\r
  }\r
}\r
\r
.skip-right {\r
  &-enter {\r
    transform: translate3d(100%, 0, 0);\r
  }\r
  &-leave-to {\r
    opacity: 0;\r
  }\r
}\r
\`\`\`\r
`;export{r as default};
