const n=`---\r
title: git 忽略大小写\r
date: 2025-01-16\r
summary: 一次提交代码后，上jenkins构建打包项目时发现报了找不到对应模块的错！\r
---\r
\r
一次提交代码后，上jenkins构建打包项目时发现报了找不到对应模块的错（奇了怪了，明明本地构建是正常的）。\r
\r
后来几经排查发现，原来是git提交文件的时候忽略了大小写，把文件名从大小自动改为小写了，从而造成jenkins构建时报错。\r
\r
最后解决方案当然就是禁用\`忽略大小写\`：\r
\r
\`\`\`bash\r
$ git config core.ignorecase false \r
\`\`\``;export{n as default};
