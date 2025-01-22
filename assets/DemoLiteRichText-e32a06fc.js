const n=`---\r
name: LiteRichText\r
title: 轻量文本域\r
description: 基于Vue2实现的基本文本域组件，（功能不断完善中）目前仅支持插入内容，统计字数等基本文本输入框能力。\r
technologies: Vue2,JavaScript\r
category: pc\r
---\r
\r
\`\`\`vue preview\r
<template>\r
  <LiteRichText\r
    ref="liteRichTextRef"\r
    v-model="value"\r
    placeholder="请输入内容"\r
    height="200px"\r
    :maxlength="100"\r
  />\r
  <div class="actions">\r
    <span @click="insertContent">\r
      插入内容\r
    </span>\r
  </div>\r
</template>\r
\r
<script setup>\r
import { ref } from 'vue'\r
const value = ref('')\r
const liteRichTextRef = ref()\r
const insertContent = () => {\r
  const content = document.createElement('span')\r
  content.innerText = '这是插入内容'\r
  content.style.color = 'red'\r
  content.style.fontSize = '30px'\r
  liteRichTextRef.value.insertContent(content)\r
}\r
<\/script>\r
\r
<style scoped>\r
.actions {\r
  margin-top: 20px;\r
}\r
.actions span {\r
  cursor: pointer;\r
  padding: 10px;\r
  border: 1px solid #ccc;\r
  border-radius: 5px;\r
}\r
</style>\r
\`\`\`\r
`;export{n as default};
