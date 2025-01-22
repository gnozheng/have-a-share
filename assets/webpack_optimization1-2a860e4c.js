const n=`---\r
title: 项目代码优化\r
date: 2019-06-27\r
summary: 继重构了原有项目 \`webpack\` 底层后(基于\`vue-cli@2.9.3\`，调整依赖、配置多页面、优化包体积等)，项目整体比之前好了不少。然而随着项目不断增大，目前代码量也有四万多五万了：\r
---\r
\r
## 项目概况\r
\r
继重构了原有项目 \`webpack\` 底层后(基于\`vue-cli@2.9.3\`，调整依赖、配置多页面、优化包体积等)，项目整体比之前好了不少。然而随着项目不断增大，目前代码量也有四万多五万了：\r
\r
\`\`\`bash\r
$ find . -name "*.js" -or -name "*.vue" -or -name "*.less"|xargs grep -v "^$"|wc -l\r
> 46555\r
\r
$ node -v\r
> v10.5.0\r
\r
$ yarn -v\r
> 1.7.0\r
\`\`\`\r
\r
开发环境下，执行 \`yarn start\` 后，构建时间需要将近**40s**\r
\r
![构建时间](/src/assets/images/webpack_optimization/unoptimization-yarn-start.png)\r
\r
而热加载耗时也要 **3~4s**\r
\r
![热加载时间](/src/assets/images/webpack_optimization/unoptimization-hot.png)\r
\r
再来看看生产环境下打包的时间，将近 **50s**\r
\r
![打包时间](/src/assets/images/webpack_optimization/unoptimization-yarn-build.png)\r
\r
这么看来，不管开发环境还是生产环境下，都浪费不少时间。那么，为了效率，只能动手优化了。\r
\r
## 措施手段\r
\r
看了 \`webpack\` 文档，也参考了网上各种资料，那么就先从\`webpack\` 提供的插件着手吧\r
\r
### 先来看看 \`DllPlugin\` 和 \`DllReferencePlugin\` 插件\r
\r
> \`DllPlugin\` 和 \`DllReferencePlugin\` 用某种方法实现了拆分 bundles，同时还大大提升了构建的速度(官方如是描述，参考[地址](https://webpack.docschina.org/plugins/dll-plugin/))\r
\r
- \`DllPlugin\` 需要独立的配置文件，用于创建一个只有 \`dll\` 的 \`bundle\`(dll-only-bundle)，同时会生成一个名为 \`manifest.json\` 的文件，为 \`DllReferencePlugin\` 提供相关映射。\r
\r
- \`DllReferencePlugin\` 则在 \`webpack\` 主要配置文件设置，把只有 dll 的 bundle(们)(dll-only-bundle(s)) 引用到需要的预编译的依赖。\r
\r
好吧，光看它的文档有点难以理解，参考文档提供 \`example\` 动手实践一下吧。\r
\r
> 一、配置 \`DllPlugin\`\r
\r
在 \`webpack\` 配置文件夹下新建 \`webpack.dll.conf.js\`\r
\r
\`\`\`js\r
// webpack.dll.conf.js\r
\r
const path = require('path')\r
const webpack = require('webpack')\r
const config = require('../config')\r
\r
module.exports = {\r
  entry: {\r
    // 根据项目自行配置dll入口\r
    polyfill: ['babel-polyfill'],\r
    // 据说不能写vue得用vue/dist/vue.esm.js？有兴趣的可以验证一下\r
    vendor: ['vue/dist/vue.esm.js', 'vue-router', 'vuex'],\r
    others: ['vue2-dragula', 'vue-awesome-swiper']\r
  },\r
  output: {\r
    // 打包输出到 static 中方便开发环境和生产环境引用\r
    path: path.resolve(__dirname, '../static/js'),\r
    filename: 'dll.[name].js',\r
    // library 须和 DllPlugin 中的 name 保持一致\r
    library: '[name]_library'\r
  },\r
  plugins: [\r
    // DllPlugin 配置\r
    new webpack.DllPlugin({\r
      // manifest.json 生成路径\r
      path: path.join(__dirname, '../dll/[name]-manifest.json'),\r
      name: '[name]_library'\r
    })\r
  ]\r
}\r
\`\`\`\r
\r
\r
然后在 \`package.json\` 中的 \`script\` 添加多一个命令 "dll": "webpack -p --progress --config build/webpack.dll.conf.js"，命令行执行 \`yarn dll\`\r
\r
![yarn dll](/src/assets/images/webpack_optimization/yarn-dll.png)\r
\r
可见生成了三个 bundles，同时生成的 dll 文件夹中也有三个 \`manifest.json\` 文件。至此，\`DllPlugin\` 配置已完成，接下来该配置 \`DllReferencePlugin\`\r
\r
> 二、配置 \`DllReferencePlugin\`\r
\r
现在，只要在 \`webpack.base.conf.js\` 中的 \`plugins\` 上添加 \`DllReferencePlugin\` 即可。对了，还得在 \`index.html\` 模板中手动引入 dll bundles。\r
\r
\r
\`\`\`js\r
/** webpack.base.conf.js **/\r
\r
plugins: [\r
    ...,\r
    new webpack.DllReferencePlugin({\r
      manifest: require('../dll/polyfill-manifest.json')\r
    }),\r
    new webpack.DllReferencePlugin({\r
      manifest: require('../dll/vendor-manifest.json')\r
    }),\r
    new webpack.DllReferencePlugin({\r
      manifest: require('../dll/others-manifest.json')\r
    })\r
]\r
\`\`\`\r
\r
\`\`\`js\r
  /** index.html **/\r
\r
  <script src="./static/js/dll.polyfill.js"><\/script>\r
  <script src="./static/js/dll.vendor.js"><\/script>\r
  <script src="./static/js/dll.others.js"><\/script>\r
\`\`\`\r
\r
再次运行 \`yarn start\` 查看构建时间\r
\r
![构建时间](/src/assets/images/webpack_optimization/optimization1-yarn-start.png)\r
\r
之前是 **40s** 左右，现在是 **35s** 左右，貌似提升不大，\r
\r
再看看热加载速度，发现第一次也要花费 **3.5s** 左右，不过接下来的热加载时间缩短到 **2.5~3s** 的范围，而 \`yarn build\` 的时间也变化不大\r
\r
![打包时间](/src/assets/images/webpack_optimization/optimization1-yarn-build.png)\r
\r
### 再来看看 \`happypack\` 插件\r
\r
> \`happypack\` 通过并行（多线程）编译处理文件提升 \`webpack\` 构建速度\r
\r
- 修改 \`module\` 下 \`loader\`\r
- 添加 \`plugins\` 下 \`happypack\`\r
\r
> 一、首先添加 \`happypack\` 插件依赖\r
\r
    yarn add happypack -D\r
\r
> 二、根据[happypack 配置](https://github.com/amireh/happypack)，在 \`webpack\` 配置文件中 添加/修改 配置\r
\r
\`\`\`js\r
// webpack.base.conf.js\r
\r
module.exports = {\r
    ...,\r
    module: {\r
        rules: [{\r
            test: /\\.js$/,\r
            // loader: 'babel-loader',\r
            use: 'happypack/loader?id=babel',\r
            include: [\r
            resolve('src'),\r
            resolve('test'),\r
            resolve('node_modules/vue-echarts')\r
            ]\r
        }]\r
    },\r
    plugins: [\r
        ...,\r
        new HappyPack({\r
            id: 'babel',\r
            threads: 4,\r
            loaders: [{\r
                loader: 'babel-loader',\r
                options: {\r
                cacheDirectory: true\r
                }\r
            }]\r
        }),\r
        new HappyPack({\r
            id: 'less',\r
            threads: 2,\r
            loaders: ['css-loader', 'postcss-loader', 'less-loader']\r
        })\r
    ]\r
}\r
\`\`\`\r
\r
\`\`\`js\r
// utils.js 使用vue-cli的话配置样式happypack的文件\r
\r
// Generate loaders for standalone style files (outside of .vue)\r
exports.styleLoaders = function(options) {\r
  const output = []\r
  const loaders = exports.cssLoaders(options)\r
\r
  for (const extension in loaders) {\r
    const loader = loaders[extension]\r
    output.push({\r
      test: new RegExp('\\\\.' + extension + '$'),\r
      // use: loader\r
      // 只针对less配置happypack,不对css配置happypack的原因是因为引入的element-ui会出现样式问题\r
      use: loader === 'less' ? \`happypack/loader?id=\${extension}\` : loader\r
    })\r
  }\r
\r
  return output\r
}\r
\`\`\`\r
\r
然后，跑起，emmm...第一次构建还是差不多 **30 多 s**，热加载速度也还是差不多，打包还是花了 **40 多 s**......呜呜哇的一声就哭了，咋就没效果呢。\r
\r
## 后来的我发现\r
\r
后来才发现，原来是电脑开太多东西**cpu爆满**了，cpu 这玩意一定程度上会影响构建速度，坑呐！在确定 cpu 状态良好后，再次跑起项目\r
\r
| count | yarn start | yarn build |\r
| ----- | :--------: | ---------: |\r
| 1     |  28530ms   |    37394ms |\r
| 2     |  23808ms   |    35979ms |\r
\r
发现，跑了两次，一次比一次快，热加载也缩减到1到2秒多，总的来说比之前的快多了。\r
\r
## 升级webpack亦可提升构建速度\r
\r
基于vue-cli@2.9.3生成的项目，\`webpack\`是3.x版本，当我升级到4.x后，速度也有了提升，而且针对包构建后的体积也有了更细的拆分。\r
\r
升级到4.x，\r
原本的 \`CommonsChunkPlugin\` 已不再支持，，\`extract-text-webpack-plugin\` 也替换为 \`mini-css-extract-plugin\` ，还有一些用法的调整等。\r
升级后，项目构建时间以及热加载速度可见也有了提升，\r
![webpack4.x构建速度](/src/assets/images/webpack_optimization/webpack4.14.0_yarn-start.png)\r
第一次构建速度**21s**，热加载速度也一次比一次快。\r
`;export{n as default};
