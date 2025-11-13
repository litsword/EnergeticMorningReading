# 如何获取火山引擎 API Key

本项目使用火山引擎（Volcengine）的图片生成 API。按照以下步骤获取 API Key：

## 步骤 1：注册火山引擎账号

1. 访问 [火山引擎官网](https://www.volcengine.com/)
2. 点击右上角"注册/登录"
3. 完成账号注册（支持手机号注册）

## 步骤 2：实名认证

1. 登录后进入控制台
2. 完成实名认证（个人或企业）
3. 实名认证通常需要 1-2 个工作日审核

## 步骤 3：开通图片生成服务

1. 在控制台搜索"ARK" 或 "图片生成"
2. 找到 "模型推理服务（ARK）"
3. 开通服务并充值（按量付费）

## 步骤 4：创建 API Key

1. 进入 ARK 控制台
2. 在左侧菜单找到"API 管理" 或 "密钥管理"
3. 点击"创建 API Key"
4. 复制生成的 API Key（注意保密！）

## 步骤 5：配置到项目

将获取的 API Key 配置到项目的 `.env.local` 文件：

```bash
ARK_API_KEY=your_api_key_here
```

## API 价格

- 图片生成按次计费
- 具体价格请参考火山引擎官方定价页面
- 建议充值适量金额用于测试

## 注意事项

1. **保护 API Key** - 不要将 API Key 上传到公开仓库
2. **使用限制** - 注意 API 的调用频率限制
3. **成本控制** - 监控 API 使用量，避免意外费用
4. **备份 Key** - 保存好 API Key，丢失后需要重新创建

## 替代方案

如果无法使用火山引擎，可以考虑其他图片生成 API：

- **OpenAI DALL-E** - https://platform.openai.com/
- **Stability AI** - https://stability.ai/
- **Midjourney API** - https://www.midjourney.com/
- **通义万相** - https://tongyi.aliyun.com/wanxiang

修改 `lib/volcengine.ts` 文件中的 API 调用逻辑即可切换服务。

## 常见问题

### Q: API Key 无效

A: 检查：
- API Key 是否正确复制
- 是否已开通相关服务
- 账号是否有余额

### Q: 调用失败

A: 检查：
- 网络连接是否正常
- API 端点是否正确
- 模型 ID 是否有效

### Q: 如何测试 API

A: 可以使用 curl 命令测试：

```bash
curl -X POST https://ark.cn-beijing.volces.com/api/v3/images/generations \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{
    "model": "ep-20251111224803-wrd9r",
    "prompt": "美丽的日出",
    "size": "2K"
  }'
```

## 技术支持

如遇到问题，可以：
1. 查看火山引擎官方文档
2. 联系火山引擎客服
3. 在项目 Issues 中提问

---

**最后更新**: 2025-11-13
