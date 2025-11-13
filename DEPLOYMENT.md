# Vercel 部署指南

## 前置要求

1. GitHub 账号
2. Vercel 账号（可以使用 GitHub 登录）
3. 火山引擎 API Key

## 部署步骤

### 方法一：通过 Vercel 网站部署（推荐）

1. **将代码推送到 GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **在 Vercel 导入项目**
   - 访问 [vercel.com](https://vercel.com)
   - 点击 "New Project"
   - 选择 "Import Git Repository"
   - 选择你的 GitHub 仓库

3. **配置环境变量**
   在 Vercel 项目设置中添加：
   - Name: `ARK_API_KEY`
   - Value: 你的火山引擎 API Key
   - 选择所有环境（Production, Preview, Development）

4. **部署**
   - 点击 "Deploy"
   - 等待部署完成

### 方法二：通过 Vercel CLI 部署

1. **安装 Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **登录 Vercel**
   ```bash
   vercel login
   ```

3. **部署**
   ```bash
   vercel
   ```

4. **添加环境变量**
   ```bash
   vercel env add ARK_API_KEY
   ```
   输入你的火山引擎 API Key

5. **重新部署**
   ```bash
   vercel --prod
   ```

## 环境变量说明

| 变量名 | 说明 | 是否必需 |
|--------|------|----------|
| ARK_API_KEY | 火山引擎图片生成 API 的密钥 | 是 |

## 获取火山引擎 API Key

1. 访问 [火山引擎控制台](https://console.volcengine.com/)
2. 注册/登录账号
3. 进入 API 管理页面
4. 创建新的 API Key 或使用现有的
5. 复制 API Key

## 部署后测试

1. 访问你的 Vercel 部署 URL
2. 输入测试文字："今天是美好的一天，阳光明媚，心情愉悦"
3. 点击"生成图片"
4. 检查是否成功生成图片
5. 测试下载功能

## 常见问题

### Q: 部署成功但生成图片失败

A: 检查环境变量是否正确配置：
```bash
vercel env ls
```

### Q: Canvas 包在 Vercel 上无法使用

A: Vercel 已经默认支持 node-canvas，如果遇到问题，可以考虑：
1. 检查 Next.js 版本
2. 查看 Vercel 构建日志
3. 考虑使用浏览器端的 html2canvas 作为替代方案

### Q: 图片生成很慢

A: 这是正常的，因为需要：
1. 调用 AI API 生成背景图（5-15秒）
2. 服务端合成图片（1-3秒）

可以考虑添加缓存机制优化。

## 自定义域名

1. 在 Vercel 项目设置中选择 "Domains"
2. 添加你的自定义域名
3. 按照提示配置 DNS 记录

## 监控和日志

- 访问 Vercel Dashboard 查看：
  - 部署状态
  - 访问统计
  - 错误日志
  - 性能指标

## 更新部署

推送新代码到 GitHub 的 main 分支，Vercel 会自动部署：

```bash
git add .
git commit -m "Update features"
git push
```

## 回滚版本

1. 访问 Vercel Dashboard
2. 选择项目
3. 在 "Deployments" 页面找到之前的版本
4. 点击 "Promote to Production"
