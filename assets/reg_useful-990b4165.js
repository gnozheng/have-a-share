const r="---\r\ntitle: 常用的正则\r\ndate: 2025-01-16\r\nsummary: 记录常用的正则\r\n---\r\n\r\n*`[\\u4e00-\\u9fa5]`匹配中文*\r\n\r\n- 手机号：`/^1[3456789]\\d{9}$/` 或 `/^1(3|4|5|6|7|8|9)\\d{9}$/`\r\n- 邮箱：`/^[A-Za-z0-9\\u4e00-\\u9fa5]+@[a-zA-Z0-9_-]+(\\.[a-zA-Z0-9_-]+)+$/`\r\n- 密码（包含大小写字母、数字）：`/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9]{8,16}$/`";export{r as default};
