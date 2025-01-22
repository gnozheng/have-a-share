const e=`---\r
name: FileAttachment\r
title: 文件附件\r
description: 文件附件组件，支持展示文件名、文件大小、文件类型、文件状态、文件下载、文件删除等。\r
technologies: Vue2,JavaScript\r
category: pc,mobile\r
---\r
\r
> 根据文件名判断文件类型，支持Excel、PDF、Word、PPT、图片等文件类型，通过 \`size\` 展示文件大小。\r
\r
\`\`\`vue preview\r
<template>\r
  <FileAttachment name="excel-file.xlsx" :size="18900" />\r
  <FileAttachment name="pdf-file.pdf" :size="128800" />\r
  <FileAttachment name="word-file.docx" :size="3900" />\r
  <FileAttachment name="ppt-file.pptx" :size="900" />\r
  <FileAttachment name="image-file.jpg" :size="12003" />\r
</template>\r
\`\`\`\r
\r
> 支持显示文件状态，\`status\` 为 1 时，显示成功状态，为 0 或空时，显示失败状态。\r
\r
\`\`\`vue preview\r
<template>\r
  <FileAttachment\r
    name="excel-file.xlsx"\r
    :size="18900"\r
    show-status\r
    :status="1" />\r
  <FileAttachment\r
    name="excel-file.xlsx"\r
    :size="123900"\r
    show-status />\r
</template>\r
\`\`\`\r
\r
> \`show-download\`显示文件下载（\`url\` 为文件下载地址），\`show-remove\` 显示文件删除。\r
\r
\`\`\`vue preview\r
<template>\r
  <FileAttachment\r
    name="excel-file.xlsx"\r
    :size="18900"\r
    url="https://example.com/excel-file.xlsx"\r
    show-download\r
    show-remove />\r
</template>\r
\`\`\`\r
`;export{e as default};
