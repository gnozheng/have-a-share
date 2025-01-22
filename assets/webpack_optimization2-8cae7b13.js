const n=`---\r
title: 项目代码优化\r
date: 2018-06-27\r
summary: 继重构了原有项目 \`webpack\` 底层后(基于\`vue-cli@2.9.3\`，调整依赖、配置多页面、优化包体积等)，项目整体比之前好了不少。然而随着项目不断增大，目前代码量也有四万多五万了：\r
---\r
\r
## 2018 年针对公司项目的升级优化及建议\r
\r
### 一. 依赖管理器使用 [yarn](https://yarn.bootcss.com/docs/)，抛弃 \`npm\` & \`cnpm\`\r
\r
> 基本使用\r
\r
\`\`\`v\r
  // 安装全部依赖\r
  yarn (yarn install) // => npm install\r
\r
  // 添加依赖包\r
  yarn add <package>  // => npm install <package> --save\r
  yarn add <package> -D // => npm install <package> --save-dev\r
\r
  // 移除依赖包\r
  yarn remove <package> // => npm uninstall <package>\r
\r
  // 本地运行（以 vue-cli 为例）\r
  yarn start (or yarn run dev)  // => npm start (or npm run dev)\r
\r
  ...\r
\`\`\`\r
\r
> 关于\`yarn.lock\`\r
\r
- 为了在不同机器上得到一致的安装结果，\`yarn\` 需要比配置在 \`package.json\` 文件中的依赖列表更多的信息。 \`yarn\` 需要知道每个安装的依赖包的准确的版本号。\r
\r
- **须提交到版本管理系统**\r
\r
---\r
\r
### 二. \`webpack\` 配置（基于 \`vue-cli@2.9.3\` 优化及新增功能）\r
\r
> 基本配置\r
\r
- 调整依赖包以及移除不必要依赖包，并优化了打包后代码体积（后续还需要根据项目情况继续优化）\r
\r
  ![优化前后对比](/src/assets/images/webpack_optimization2/webpack_analysis_bundles.png)\r
\r
- 修改 \`host\` 为 \`0.0.0.0\` 以通过本地 IP 地址访问项目\r
\r
- 沿用 \`sass-resources-loader\` 将 \`less\` 变量提升为全局引用\r
\r
> 新增配置\r
\r
- 添加打包指定主题（_支持只改变变量的主题_），在 \`config/index.js\` 中设置 \`theme\` 字段（_默认为 \`null\` 即打包默认主题_），指定的主题须存在于 \`src/assets/style/theme\` 中\r
\r
- 添加指定项目为单页面或多页面功能（具体见第三点）\r
\r
- 添加切换主题功能 (具体见第四点)\r
\r
---\r
\r
### 三. 关于单页面、多页面配置\r
\r
**通过配置 \`config/index.js\` 中的 \`moduleName\` 来选择单页面应用还是多页面应用。单页面、多页面可随时互相切换，两者互不影响，路由须分开设置**\r
\r
> 单页面\r
\r
- 默认为单页面（即 \`moduleName\` 为 \`null\`）\r
\r
- 默认入口文件 \`src/main.js\`\r
\r
> 多页面\r
\r
- 目录结构（以现有项目为例）\r
\r
  ![多页面文件结构](/src/assets/images/webpack_optimization2/multiple_page.png)\r
\r
- 设置多页面，须配置 \`moduleName\` 为项目页面所在文件夹，如设置为 \`views\`\r
\r
- 需要在每个页面添加以 \`entry-\` 为前缀的入口 js 文件（为了避开项目已有 \`js\` 文件），还要添加与页面文件夹同名的 \`html模板\`\r
\r
- 代码示例\r
\r
  \`\`\`js\r
  // 例：entry-admin.js\r
\r
  import Vue from 'vue'\r
  import App from './index/index'\r
  // import ...\r
  new Vue({\r
    el: '#admin',\r
    components: {\r
      App\r
    },\r
    // ...,\r
    template: '<App/>'\r
  })\r
  \`\`\`\r
\r
  \`\`\`html\r
  <!-- 例：admin.html -->\r
\r
  <!DOCTYPE html>\r
  <html>\r
    <head>\r
      <meta charset="utf-8" />\r
      <meta name="viewport" content="width=device-width,initial-scale=1.0" />\r
      <link\r
        rel="shortcut icon"\r
        href="static/faviconsg.ico"\r
        type="image/x-icon"\r
      />\r
      <title>admin</title>\r
    </head>\r
    <body>\r
      <div id="admin"></div>\r
      <!-- built files will be auto injected -->\r
    </body>\r
  </html>\r
  \`\`\`\r
\r
---\r
\r
### 四. 关于切换主题功能\r
\r
**项目提供默认主题，即打包一套主题，后续无论添加多少套主题都不会增加项目打包体积或消耗用户的资源请求**\r
\r
> 使用方法\r
\r
- 通过引入 \`ThemePicker\` 组件（组件后续根据项目需求调整样式及功能）添加切换主题功能（组件会列出当前提供的所有可切换主题）\r
\r
- 通过调用 \`utils/common.js\` 中的 \`registerTheme\` 方法实现切换主题\r
\r
- 主题切换后通过 \`localstorage\` 缓存主题名字\r
\r
> 添加、维护\r
\r
- 主题统一存放于 \`static/theme\` 中，其中 \`default.less\` 为通用设置，剩余其他即为主要主题样式（根据需求添加主题文件）\r
\r
- 通用设置 \`default.less\`\r
\r
  \`\`\`css\r
  /** 例：default.less **/\r
\r
  /**\r
  * 通用设置\r
  * 必须是所有主题通用的，\r
  * 否则设置到对应主题中\r
  **/\r
  ::-webkit-scrollbar-thumb {\r
    background: @primaryColor;\r
  }\r
  \`\`\`\r
\r
- 主题设置\r
\r
  \`\`\`css\r
  /** 例：dark.less & light.less **/\r
\r
  /**\r
  * 主题设置 -- dark.less\r
  **/\r
  // 主要\r
  @primaryColor: #000000;\r
\r
  // 在变量声明后引入\r
  @import './default';\r
\r
  // 布局\r
  .sidebar {\r
    width: 400px;\r
  }\r
\r
  /* ------ 分割线 ------ */\r
\r
  /**\r
  * 主题设置 -- light.less\r
  **/\r
  // 主要\r
  @primaryColor: #ffffff;\r
\r
  // 在变量声明后引入\r
  @import './default';\r
\r
  // 布局\r
  .sidebar {\r
    width: 200px;\r
  }\r
  \`\`\`\r
\r
---\r
\r
### 五. 关于重构\r
\r
> ui 组件\r
\r
- 对整体样式进行统一调整，构建 ui 组件主题（脱离项目）\r
\r
- 为将重构风险降至最低，对于项目中广泛使用到的组件，建议沿用组件，只对组件进行功能的增添完善或进行稍微修改；对于项目中少量使用到的组件，可进行整个组件的重构，同时尽量提供与原组件同样的属性和方法；\r
\r
- 为每个组件提供一个 \`install.js\` ，提供单个 vue 组件注册以实现按需加载\r
\r
> 业务层组件貌似不需要重构 (￣ ▽ ￣)"，只需统一命名入口即可\r
\r
> 业务页面模块\r
\r
- 现业务模块页面基本上一个页面就包含了多个模块导致代码量大、\`vue\`实例对象中\`data\`数据凌乱等，增加了代码维护的难度。\r
\r
- 建议将每个模块细化出来，如 \`通讯录页面模块\`（参考如下结构），其包含了 \`通讯录管理\` 和 \`通讯录设置\` ，那么可以将这两个模块独立出来分别维护，而独立出来的这两个模块底下又可以细分出 \`人员模块\` 和 \`部门模块\` 等，\`人员模块\` 又分为 \`增添人员\` 和 \`编辑人员\`，这样如果要维护代码就可以快速定位修改位置，修改对应模块即可。\r
  \`\`\`v\r
  │ │ └─...\r
  │ │ │ ├─common  // 通用业务组件\r
  │ │ │ ├─contacts    // 通讯录分为通讯录管理和通讯录设置\r
  │ │ │ │ ├─images    // 通讯录模块图片\r
  │ │ │ │ ├─contactsManage    // 通讯录管理\r
  │ │ │ │ │ ├─memberControl   // 人员模块\r
  │ │ │ │ │ │ │ index.vue // 人员模块入口引入增添人员、编辑人员模块\r
  │ │ │ │ │ │ │ index.less // 人员模块样式（包括增添人员、编辑人员）\r
  │ │ │ │ │ │ │ addMenber.vue // 增添人员\r
  │ │ │ │ │ │ │ editMember.vue // 编辑人员\r
  │ │ │ │ │ │ └─...\r
  │ │ │ │ │ ├─sectorControl   // 部门模块\r
  │ │ │ │ │ └─...\r
  │ │ │ │ │ index.vue // 通讯录管理入口引入addMember、addSector等其他业务模块\r
  │ │ │ │ ├─contactsSetting   // 通讯录设置\r
  │ │ │ │ └─...\r
  │ │ │ ├─daily\r
  │ │ │ └─...\r
  │ │ │\r
  │ │ └─...\r
  \`\`\`\r
- 就目前的代码结构，重构的话需要考虑到 \`模块的引入\`、\`组件属性和方法的传递\`、\`父子级组件同级组件的数据交流\`等因素，重构风险较大，需要顾及到的方面较多。\r
\r
---\r
\r
### 六. 项目目录结构\r
\r
**建议每次模块开发时负责人先构思好项目结构，确定构建好后再进行分工**\r
\r
\`\`\`v\r
│ .babelrc\r
│ .editorconfig\r
│ .eslintignore\r
│ .eslintrc.js\r
│ .gitignore\r
│ .postcssrc.js\r
│ index.html\r
│ package.json\r
│ README.md     // 统一规范、组件用法说明文档\r
│ yarn.lock\r
│\r
├─build\r
│\r
├─config\r
│\r
├─src\r
│ │ App.vue\r
│ │ main.js\r
│ │\r
│ ├─api\r
│ │ ├─admin\r
│ │ │ index.js // 引入apiInfo和apiInner等并通过 { apiInfo, apiInner } 导出\r
│ │ │ apiInfo.js // 导出apiInfo对象\r
│ │ │ apiInner.js   // 导出apiInner对象\r
│ │ │ ...\r
│ │\r
│ ├─assets  // 静态资源文件\r
│ │ ├─icon\r
│ │ │\r
│ │ ├─images\r
│ │ │\r
│ │ └─style\r
│ │\r
│ ├─components\r
│ │ ├─Example // 组件统一大写字母开头？\r
│ │ │ index.less  // 组件样式\r
│ │ │ index.vue // 组件主入口\r
│ │ │ install.js  // 提供单个vue组件注册\r
│ │ │\r
│ │ └─...\r
│ │\r
│ ├─directives  // 指令\r
│ │\r
│ ├─router  // 路由\r
│ │\r
│ ├─utils   // 工具\r
│ │\r
│ ├─views // 目录结构示例\r
│ │ └─admin\r
│ │ │ ├─common  // 通用业务组件\r
│ │ │ ├─contacts    // 通讯录分为通讯录管理和通讯录设置\r
│ │ │ │ ├─images    // 通讯录模块图片\r
│ │ │ │ ├─contactsManage    // 通讯录管理\r
│ │ │ │ │ ├─memberControl   // 人员模块\r
│ │ │ │ │ │ │ index.vue // 人员模块入口引入增添人员、编辑人员模块\r
│ │ │ │ │ │ │ index.less // 人员模块样式（包括增添人员、编辑人员）\r
│ │ │ │ │ │ │ addMenber.vue // 增添人员\r
│ │ │ │ │ │ │ editMember.vue // 编辑人员\r
│ │ │ │ │ │ └─...\r
│ │ │ │ │ ├─sectorControl   // 部门模块\r
│ │ │ │ │ └─...\r
│ │ │ │ │ index.vue // 通讯录管理入口引入addMember、addSector等其他业务模块\r
│ │ │ │ ├─contactsSetting   // 通讯录设置\r
│ │ │ │ └─...\r
│ │ │ ├─daily\r
│ │ │ └─...\r
│ │ │ index.less  // 页面样式\r
│ │ │ index.vue // 提供入口\r
│ │ │\r
│ │ └─...\r
│ │\r
│ └─vuex\r
│\r
├─static\r
│ │ └─theme // 主题\r
│ │ │ default.less  // 通用颜色样式设置\r
│ │ │ dark.less // dark主题\r
│ │ │ light.less // light主题\r
│ │ │ ...others theme\r
│ │ │\r
│ │ └─...\r
│\r
└─test\r
\`\`\`\r
`;export{n as default};
