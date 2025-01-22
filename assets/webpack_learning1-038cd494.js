const n=`---\r
title: Webpack 学习\r
date: 2018-06-21\r
summary: Webpack 是一个模块打包器。它将根据模块的依赖关系进行静态分析，然后将这些模块按照指定的规则生成对应的静态资源。\r
---\r
\r
Webpack 是一个模块打包器。它将根据模块的依赖关系进行静态分析，然后将这些模块按照指定的规则生成对应的静态资源。\r
\r
(看了就知道这段和下面的图片都是复制来的，这都没关系，我主要是来学习的)\r
\r
![webpack](http://www.hubwiz.com/course/5670d0a77e7d40946afc5e65/img/what-is-webpack0.png)\r
\r
## 开始\r
\r
新建项目 app，进入项目。\r
输入\r
\r
\`\`\`bash\r
$ pwd\r
\`\`\`\r
\r
会显示当前路径；\r
输入\r
\r
\`\`\`bash\r
$ ls\r
\`\`\`\r
\r
可以显示当前路径下的所有目录。\r
\r
### 安装\r
\r
要玩 webpack 呢，是要先安装 nodeJS 环境的，安装 webpack：\r
\r
\`\`\`bash\r
$ npm install webpack -g\r
\`\`\`\r
\r
安装完了后呢，我们需要将 webpack 安装到项目的依赖中，这样才可以使用项目本地版本的 webpack:\r
\r
\`\`\`bash\r
# 项目目录中\r
# npm init 创建并初始化package.json，一路按enter即可\r
# 安装 webpack 依赖\r
  $ npm install webpack --save-dev\r
\`\`\`\r
\r
### 使用\r
\r
假设项目文件目录结构如下：\r
\r
\`\`\`\r
/app\r
- |--index.html\r
- |--src\r
	- |--main.js\r
	- |--mymodule.js\r
- |--package.json\r
- |--webpack.config.js\r
\`\`\`\r
\r
\`index.html\`代码如下：\r
\r
\`\`\`html\r
<!DOCTYPE html>\r
<html lang="en">\r
  <head>\r
    <meta charset="UTF-8" />\r
    <title>Hello Webpack</title>\r
  </head>\r
  <body>\r
    //引入下面mymoduleJS文件打包生成的bundle.js\r
    <script src="./bundle.js"><\/script>\r
  </body>\r
</html>\r
\`\`\`\r
\r
\`main.js\`和\`mymodule.js\`如下：\r
\r
\`\`\`js\r
// main.js\r
require('./mymodule.js')()\r
\r
// mymodule.js\r
module.exports = function() {\r
  document.write('hello webpack')\r
}\r
\`\`\`\r
\r
\`webpack.config.js\`为默认配置文件，配置如下：\r
\r
\`\`\`js\r
var path = require('path')\r
\r
module.exports = {\r
  entry: path.join(__dirname, 'src/main.js'),\r
  output: {\r
    path: path.join(__dirname, 'out'), //打包输出路径，__dirname前下划线为两条，为当前文件路径\r
    filename: 'bundle.js', //打包后的文件名\r
    publicPath: './out/' //html引用路径\r
  }\r
}\r
\`\`\`\r
\r
### 启动 webpack\r
\r
万事俱备后，执行命令：\r
\r
\`\`\`bash\r
$ webpack	//基本命令\r
\`\`\`\r
\r
（加入\`--display-error-details\`参数可方便出错时能更详细查阅信息）\r
其他几种基本命令：\r
\r
\`\`\`bash\r
$ webpack -w	//提供watch方法，实时进行打包更新\r
\`\`\`\r
\r
\`\`\`bash\r
$ webpack -p	//对打包后的文件进行压缩，提供production\r
\`\`\`\r
\r
\`\`\`bash\r
$ webpack -d	//提供source map，告知模块打包后的去向\r
\`\`\`\r
\r
webpack 运行成功后就可以在根目录看到生成的 out 文件夹和里面打包生成的\`bundle.js\`，然后在\`index.html\`中对该生成的文件进行引用就可以了。\r
可以看到输出**hello webpack**。\r
\r
### 使用 loader\r
\r
webpack 本身只能处理 js 文件，但是通过一系列的 loader，就可以处理其他文件了。\r
首先执行如下命令安装各种依赖模块：\r
\r
\`\`\`bash\r
$ npm install css-loader style-loader url-loader babel-loader sass-loader file-loader --save-dev\r
\`\`\`\r
\r
然后在项目根目录下随便新建\`style.scss\`文件，内容随意，如：\r
\r
\`\`\`css\r
body {\r
  background-color: #f00;\r
}\r
\`\`\`\r
\r
再配置\`webpack.config.js\`:\r
\r
\`\`\`js\r
module.exports = {\r
  entry: path.join(__dirname, 'src/main.js'),\r
  output: {\r
    path: path.join(__dirname, 'out'), //打包输出路径，__dirname前下划线为两条，为当前文件路径\r
    filename: 'bundle.js', //打包后的文件名\r
    publicPath: './out/' //html引用路径\r
  },\r
  //新添加module属性\r
  module: {\r
    loaders: [\r
      //{test: /\\.js$/,loader: "babel"},\r
      //{test: /\\.css$/,loader: "style!css"},\r
      //{test: /\\.(jpg|png)$/,loader: "url?limit=8192"},\r
      { test: /\\.scss$/, loader: 'style!css!sass' }\r
    ]\r
  }\r
}\r
\`\`\`\r
\r
_loader 之间用\`!\`分隔，数据流从右向左，比如\`.scss\`结尾的文件，依次经过\`sass-loader\`、\`css-loader\`和\`style-loader\`的处理。_\r
通过\`main.js\`引入所需模块\`style.scss\`:\r
\r
\`\`\`js\r
require('./mymodule.js')()\r
require('../style.scss')\r
\`\`\`\r
\r
执行\`$ webpack\`后可看到背景颜色变了，审查元素可看到\`index.html\`中加入了\`<style>\`代码块，就是我们刚刚写的样式啦。\r
配置好了后，我们就可以通过 ES6 和 SASS 去写前端代码了。\r
\r
### 打包成多个资源文件\r
\r
上面我们所做的，当打包 js 文件时只能生成一个资源文件，这样就不利于我们按需加载了，所以我们要打包成多个资源文件，以便需要哪个就引入哪个。\r
这里直接对\`webpack.config.js\`进行修改配置：\r
\r
\`\`\`js\r
var path = require("path");\r
\r
module.exports = {\r
	entry: {\r
		bundle1: "path.join(__dirname,'src/main.js')",\r
		bundle2: "path.join(__dirname,'src/main2.js')"\r
	},\r
	output: {\r
		path: path.join(__dirname,'out'),\r
		filename: '[name].js',\r
		publicPath: './out/'\r
	}\r
\`\`\`\r
\r
这里将\`entry\`作为对象来处理，其中*bundle1*和*bundle2*为打包生成后的 js 文件，即执行\`$ webpack\`后将生成\`bundle1.js\`和\`bundle2.js\`，\`filename\`属性中\`[name]\`充当变量对应\`entry\`对象的各个键值。剩下的自己动手去实操一下。\r
考虑到公共模块的利用，我们利用插件就可以智能提取公共部分，以提供浏览器的缓存复用。只需在\`webpack.config.js\`中添加如下代码即可：\r
\r
\`\`\`js\r
var webpack = require('webpack')\r
module.exports = {\r
  //...\r
  plugins: [new webpack.optimize.CommonsChunkPlugin('common.js')]\r
}\r
\`\`\`\r
\r
可以做个小测试，在上面生成的\`bundle1.js\`和\`bundle2.js\`中随便加点相同的代码块，然后打包就可以看到生成的\`common.js\`了，将其加入\`index.html\`中，并且注意该公共模块必须要确保最先加载。\r
\r
### 独立出样式\r
\r
上面我们生成的样式是直接进了\`<style>\`代码块中，那么我希望样式是通过\`<link>\`引入，那该咋办捏？不用想，又得靠插件了：\r
执行\r
\r
\`\`\`bash\r
$ npm install extract-text-webpack-plugin --save-dev\r
\`\`\`\r
\r
安装完插件肯定就要配置\`webpack.config.js\`了，添加代码如下：\r
\r
\`\`\`js\r
var ExtractTextPlugin = require('extract-text-webpack-plugin')\r
module.exports = {\r
  //...\r
  module: {\r
    loaders: [\r
      {\r
        test: /\\.scss$/,\r
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')\r
      }\r
    ]\r
  },\r
  plugins: [new ExtractTextPlugin('[name].css')]\r
}\r
\`\`\`\r
\r
这里又有一个\`[name]\`变量，所以生成的 css 文件名将和\`entry\`对象中的键值一样，也就和上面生成的 js 文件一样。生成 css 后，在\`index.html\`中通过\`<link>\`引入即可。\r
当然，如果想把所有独立样式打包成一个 css 文件，则只需增加多一个参数即可(这样也就不需要\`[name]\`变量了)：\r
\r
\`\`\`js\r
new ExtractTextPlugin('style.css', { allChunks: true })\r
\`\`\`\r
\r
这样就会单独生成\`style.css\`这个样式了。\r
\r
### 外部依赖\r
\r
假如项目中用到 angular，首先在\`index.html\`中通过\`<script>\`引入 angular 库，然后修改\`mymodule.js\`:\r
\r
\`\`\`js\r
var angular = require('angular')\r
angular.module('MyModule', [])\r
\`\`\`\r
\r
如此时执行\`webpack\`命令会报错误：\r
\r
\`\`\`js\r
ERROR in ./mymodule.js\r
Module not found: Error: Cannot resolve module 'angular' in /xxx/xxx/app\r
 @ ./mymodule.js 1:14-32\r
\`\`\`\r
\r
这是因为\`webpack\`无法解析 angular 依赖模块，此时需要在配置文件中即\`webpack.config.js\`对外部依赖进行配置：\r
\r
\`\`\`js\r
//...\r
externals: {\r
	'angular': true\r
}\r
\`\`\`\r
\r
## 没了，总结下\r
\r
很不错的一个前端神器，太太好用了，可惜还没运用到过实际项目中，好想试着用 ES6 和 SASS 来写写前端的东西。目前我是接触了第二次，第一次玩我是懵逼的，但还是跟着网上教程走了遍，这第二次玩呢有点感觉了，慢慢就理解了，感觉还可以。所以初学新东西不懂不要慌，多学几遍就能融会贯通了，就好比\`读书破万卷，下笔如有神\`嘛(嗯，感觉自己还是有点文学气息的)。最后给点个人建议，学习东西呢要有技巧，学了第一遍后呢不要急着学第二遍，可以放着过些天再来学，而且对于 IT 这行业，能动手就尽量动手，你动手实操一遍，理解一遍，远比你看千遍万遍实用的多。\r
`;export{n as default};
