const r=`---\r
title: 基于 \`vue2.x\` 实践 \`prerender-spa-plugin\` 插件\r
date: 2025-01-16\r
summary: 基于 \`vue2.x\` 实践 \`prerender-spa-plugin\` 插件\r
---\r
\r
### 先从 \`官方examples\` 入手\r
\r
由于对这个插件一无所知，所以先从官方示例下手。\r
\r
- 1、github 搜索 \`prerender-spa-plugin\`\r
- 2、git clone ...\r
- 3、yarn install\r
- 4、yarn build\r
\r
本来一气呵成的事，却在第三步卡住了...\r
\r
呵，不就装个依赖嘛！\r
\r
然而，最后得到的结果却是安装失败信息:\r
\r
![](/src/assets/images/webpack_prerender-spa-plugin/failed-to-download-chromium.png)\r
\r
在经过一番折腾后（其实没折腾，网上解决方案太麻烦就算了），还是用 \`cnpm\` 给装上了。\r
\r
好，在以上步骤都搞定后，看看克隆下来的栗子中打包出来的文件：\r
\r
![](/src/assets/images/webpack_prerender-spa-plugin/example-dist.png)\r
\r
运行打包后的文件，看看页面及源代码：\r
\r
![页面](/src/assets/images/webpack_prerender-spa-plugin/example-page.png)\r
\r
![源代码](/src/assets/images/webpack_prerender-spa-plugin/example-source.png)\r
\r
嗯，貌似没问题，审查代码中也有了 dom 结构。接着看它的主要配置（以下配置列出大概，并非栗子中原文件配置写法）：\r
\r
\`\`\`js\r
// webpack配置\r
// 省略其它...\r
const PrerenderSPAPlugin = require('prerender-spa-plugin')\r
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer\r
\r
module.exports = {\r
  // ...\r
  plugins: [\r
    // ...\r
    // 生产模式下添加...\r
    new PrerenderSPAPlugin({\r
      staticDir: path.join(__dirname, 'dist'),\r
      routes: ['/', '/about', '/contact'],\r
\r
      renderer: new Renderer({\r
        inject: {\r
          foo: 'bar'\r
        },\r
        headless: false,\r
        renderAfterDocumentEvent: 'render-event'\r
      })\r
    })\r
  ]\r
}\r
\`\`\`\r
\r
\`\`\`js\r
// 省略其它...\r
const router = new VueRouter({\r
  // ...\r
  mode: 'history'\r
})\r
\r
new Vue({\r
  // ...\r
  mounted() {\r
    // You'll need this for renderAfterDocumentEvent\r
    // render-event 对应 renderAfterDocumentEvent\r
    document.dispatchEvent(new Event('render-event'))\r
  }\r
})\r
\`\`\`\r
\r
要注意的是，单页面预渲染适用于非动态路由，如果要渲染动态路由可考虑 SSR(服务端渲染)，推荐使用 nuxtjs。\r
\r
### 听说 \`实践是检验真理的唯一标准\` ？\r
\r
基于 \`vue@2.5.2\` ，在 \`build\` 文件夹下新建文件 \`prerender.conf.js\`\r
\r
\`\`\`\r
<!-- vue-cli模板项目文件 -->\r
\r
├─build\r
│  │ ...\r
│  │ prerender.conf.js\r
│  │ webpack.prod.conf.js\r
│  │ ...\r
│...\r
\r
\`\`\`\r
\r
\`\`\`js\r
// prerender.conf.js\r
\r
const path = require('path')\r
// 预渲染插件\r
// https://github.com/chrisvfritz/prerender-spa-plugin\r
const PrerenderSPAPlugin = require('prerender-spa-plugin')\r
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer\r
\r
module.exports = new PrerenderSPAPlugin({\r
  // required 预渲染的 webpack-outputted 路径\r
  staticDir: path.join(__dirname, '../dist'),\r
  // optional 页面预渲染输出路径\r
  // outputDir: path.join(__dirname, '../prerendered'),\r
  // optional index.html 路径\r
  // indexPath: path.join(__dirname, '../index.html'),\r
  // required 要预渲染的路由\r
  routes: ['/', '/adminHome'],\r
  // opotional 在渲染内容到文件前可自定义\`html\`文件和输出路径\r
  postProcess(renderedRoute) {\r
    // 忽略所有重定向redirects\r
    renderedRoute.route = renderedRoute.originalRoute\r
\r
    // 删除空白（生产模式下禁用）\r
    // renderedRoute.html = renderedRoute.html.split(/>[\\s]+</gmi).join('><')\r
\r
    // 如果输出路径名以 \`。html\` 文件结尾的话移除 \`/index.html\`\r
    // eg. /dist/dir/special.html/index.html -> /dist/dir/special.html\r
    // if(renderedRoute.route.endsWith('.html')){\r
    //   renderedRoute.outputPath = path.join(__dirname, 'dist', renderedRoute.route)\r
    // }\r
\r
    return renderedRoute\r
  },\r
\r
  // optional uses html-minifier\r
  // minify: {\r
  //   collapseBooleanAttributes: true,\r
  //   collapseWhitespace: true,\r
  //   keepClosingSlash: true,\r
  //   sortAttributes: true\r
  // }\r
\r
  // 服务配置项\r
  server: {\r
    port: 8001\r
  },\r
\r
  renderer: new Renderer({\r
    // optional 添加到 \`window对象\` 的属性名，其内容为 \`inject\`\r
    // injectProperty: '__PRERENDER_INJECTED',\r
\r
    // optional 任何希望通过 \`window.injectProperty\` 访问的值\r
    // inject: {\r
    //   foo: 'bar'\r
    // }\r
\r
    // optional 路由异步渲染\r
    // 限制并行渲染路由数\r
    // maxConcurrentRoutes: 4,\r
\r
    // optional 等待指定事件触发后才渲染\r
    // eg. \`document.dispatchEvent(new Event('custom-render-trigger'))\`\r
    renderAfterDocumentEvent: 'render-event',\r
\r
    // optional 等待指定元素用 \`document.querySelector\` 被检测才渲染\r
    // renderAfterElementExists: 'element',\r
\r
    // optional 等待一段时间后才渲染\r
    // renderAfterTime: 5000\r
\r
    // 渲染时显示浏览器窗口\r
    headless: false\r
  })\r
})\r
\`\`\`\r
\r
\`\`\`js\r
// webpack.prod.conf.js\r
// 省略其它...\r
const PrerenderPlugin = require('./prerender.conf')\r
// ...\r
module.exports = {\r
  // ...,\r
  plugins: [\r
    // ...,\r
    PrerenderPlugin\r
  ]\r
}\r
\`\`\`\r
\r
以上配置需要手动指定需要渲染的路由，为了方便，可通过 \`glob\` 提取路由目录下的文件内容来实现快速指定需要预渲染的路由页面。\r
\r
### 扩展 \`prerender.conf.js\`\r
\r
- 在 \`config/index\` 下：\r
\r
\`\`\`js\r
module.exports = {\r
  build: {\r
    routersToPrerender: {\r
      // type = null => 不开启渲染插件\r
      // type = 'default' => 渲染所有路由\r
      // type = 'router-path' => 渲染指定路由\r
      // type = 'file-path' => 渲染指定路径下的路由\r
      type: null,\r
      // 当 type => router-path 或 file-path 时\r
      // 用于配置 路由路径 或 文件路径\r
      source: [],\r
      // 是否开启 vueMetaInfo 插件\r
      metaInfo: true\r
    }\r
\r
    // ...\r
  }\r
}\r
\`\`\`\r
\r
- 修改 \`prerender.conf.js\`并补充添加 \`glob\` 读取路由文件 ：\r
\r
\`\`\`js\r
const path = require('path')\r
const glob = require('glob')\r
const config = require('../config')\r
// 预渲染插件\r
// https://github.com/chrisvfritz/prerender-spa-plugin\r
const PrerenderSPAPlugin = require('prerender-spa-plugin')\r
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer\r
\r
// 预渲染配置逻辑\r
// config.build.routersToPrerender => 'default' || 'router-path' || 'file-path'\r
// 'default' => 渲染所有路由\r
// 'router-path' => 渲染指定路由\r
// 'file-path' => 渲染指定路径下的路由\r
const { type, source } = config.build.routersToPrerender\r
\r
const defaultFunc = () => {\r
  let temp = []\r
  glob.sync(path.join(__dirname, '../src/router/*/*.js')).forEach(filePath => {\r
    let routers = require(filePath)\r
    temp = temp.concat(routers.map(item => item.path))\r
  })\r
\r
  return temp.filter(item => item.includes('/'))\r
}\r
\r
const routerPathFunc = () => {\r
  return source\r
}\r
\r
const filePathFunc = () => {\r
  let temp = []\r
  source.map(filePath => {\r
    let routers = require(filePath)\r
    temp = temp.concat(routers.map(item => item.path))\r
  })\r
  return temp.filter(item => item.includes('/'))\r
}\r
\r
const routersToPrerenderMap = {\r
  default: defaultFunc,\r
  'router-path': routerPathFunc,\r
  'file-path': filePathFunc\r
}\r
\r
let plugin = null\r
if (routersToPrerenderMap[type]) {\r
  //   console.log(123)\r
  let routersToPrerender = routersToPrerenderMap[type]()\r
  plugin = new PrerenderSPAPlugin({\r
    // required 预渲染的 webpack-outputted 路径\r
    staticDir: path.join(__dirname, '../dist'),\r
    // optional 页面预渲染输出路径\r
    // outputDir: path.join(__dirname, '../prerendered'),\r
    // optional index.html 路径\r
    // indexPath: path.join(__dirname, '../index.html'),\r
    // required 要预渲染的路由\r
    routes: routersToPrerender,\r
    // opotional 在渲染内容到文件前可自定义\`html\`文件和输出路径\r
    postProcess(renderedRoute) {\r
      // console.log(\`--- renderedRoute ---\`, renderedRoute)\r
      // 忽略所有重定向redirects\r
      // renderedRoute.route = renderedRoute.originalRoute\r
\r
      // 删除空白（生产模式下禁用）\r
      // renderedRoute.html = renderedRoute.html.split(/>[\\s]+</gmi).join('><')\r
\r
      // 如果输出路径名以 \`.html\` 文件结尾的话移除 \`/index.html\`\r
      // eg. /dist/dir/special.html/index.html -> /dist/dir/special.html\r
      // if(renderedRoute.route.endsWith('.html')){\r
      //   renderedRoute.outputPath = path.join(__dirname, 'dist', renderedRoute.route)\r
      // }\r
      // 带参\r
      const renderedRoutePath = renderedRoute.route.split('/')\r
      if (renderedRoute.route.includes(':')) {\r
        renderedRoute.outputPath = path.join(\r
          __dirname,\r
          '../dist',\r
          renderedRoutePath[renderedRoutePath.length - 2],\r
          'index.html'\r
        )\r
      }\r
\r
      return renderedRoute\r
    },\r
\r
    // optional uses html-minifier\r
    // minify: {\r
    //   collapseBooleanAttributes: true,\r
    //   collapseWhitespace: true,\r
    //   keepClosingSlash: true,\r
    //   sortAttributes: true\r
    // }\r
\r
    // 服务配置项\r
    server: {\r
      port: 8087\r
    },\r
\r
    renderer: new Renderer({\r
      // optional 添加到 \`window对象\` 的属性名，其内容为 \`inject\`\r
      // injectProperty: '__PRERENDER_INJECTED',\r
\r
      // optional 任何希望通过 \`window.injectProperty\` 访问的值\r
      // inject: {\r
      //   foo: 'bar'\r
      // }\r
\r
      // optional 路由异步渲染\r
      // 限制并行渲染路由数\r
      // maxConcurrentRoutes: 4,\r
\r
      // optional 等待指定事件触发后才渲染\r
      // eg. \`document.dispatchEvent(new Event('custom-render-trigger'))\`\r
      renderAfterDocumentEvent: 'render-event',\r
\r
      // optional 等待指定元素用 \`document.querySelector\` 被检测才渲染\r
      // renderAfterElementExists: 'element',\r
\r
      // optional 等待一段时间后才渲染\r
      // renderAfterTime: 5000\r
\r
      // 渲染时显示浏览器窗口\r
      headless: false\r
    })\r
  })\r
}\r
\r
module.exports = plugin\r
\`\`\`\r
\r
之后，即可通过指定 \`config/index.js\` 下 \`routersToPrerender\` 的键值快速配置需要渲染的路由页面。\r
`;export{r as default};
