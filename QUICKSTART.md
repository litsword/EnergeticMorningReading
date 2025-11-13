# 快速启动指南

## 本地开发

### 1. 安装依赖

```bash
npm install
```

**注意**：`canvas` 包需要编译本地代码，可能需要 2-5 分钟。如果安装失败，请确保系统已安装必要的构建工具。

#### macOS 系统要求
```bash
# 安装 Xcode Command Line Tools（如果还没有）
xcode-select --install
```

#### Linux 系统要求
```bash
# Ubuntu/Debian
sudo apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev

# CentOS/RHEL
sudo yum install gcc-c++ cairo-devel pango-devel libjpeg-turbo-devel giflib-devel
```

#### Windows 系统要求
- 安装 [Visual Studio Build Tools](https://visualstudio.microsoft.com/downloads/)
- 或安装完整的 Visual Studio（包含 C++ 工作负载）

### 2. 配置环境变量

创建 `.env.local` 文件：

```bash
cp .env.example .env.local
```

编辑 `.env.local`，填入你的火山引擎 API Key：

```
ARK_API_KEY=your_actual_api_key_here
```

### 3. 启动开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000)

### 4. 测试功能

1. 在文字输入框中输入：
   ```
   今天是美好的一天，阳光明媚，心情愉悦。
   让我们珍惜每一刻，用积极的心态迎接新的挑战。
   ```

2. 点击"生成图片"按钮

3. 等待 10-20 秒（AI 生成图片需要时间）

4. 查看预览并下载

## 构建生产版本

```bash
npm run build
npm start
```

## 开发提示

### 调试 API

可以使用以下 curl 命令测试 API：

```bash
# 测试图片生成 API
curl -X POST http://localhost:3000/api/generate-image \
  -H "Content-Type: application/json" \
  -d '{"text":"今天是美好的一天"}'

# 测试图片合成 API
curl -X POST http://localhost:3000/api/compose-image \
  -H "Content-Type: application/json" \
  -d '{
    "backgroundUrl":"https://example.com/image.jpg",
    "text":"今天是美好的一天"
  }'
```

### 修改图片尺寸

在 `app/api/compose-image/route.ts` 中修改：

```typescript
const IMAGE_WIDTH = 1080;   // 修改宽度
const IMAGE_HEIGHT = 1920;  // 修改高度
```

常用尺寸：
- 朋友圈：1080 x 1920 (9:16)
- 微博：1080 x 1350 (4:5)
- Instagram：1080 x 1080 (1:1)

### 自定义提示词生成

编辑 `lib/promptGenerator.ts`，在 `getSceneFromKeywords` 函数中添加你的自定义场景。

### 更换默认二维码

替换 `public/default-qrcode.svg` 文件，支持格式：
- SVG
- PNG
- JPG

## 性能优化建议

1. **缓存生成的背景图**
   - 为相同的文字内容缓存背景图 URL
   - 减少重复的 API 调用

2. **优化图片加载**
   - 使用 CDN
   - 压缩图片质量

3. **添加加载进度**
   - 显示生成步骤
   - 给用户更好的反馈

## 故障排除

### Canvas 安装失败

如果遇到 canvas 包安装问题，可以考虑使用客户端方案：

1. 移除 canvas 依赖
2. 使用浏览器的 `html2canvas` 库
3. 修改图片合成逻辑到客户端

### API 调用失败

1. 检查 `.env.local` 文件是否存在
2. 检查 API Key 是否正确
3. 查看服务器日志：
   ```bash
   npm run dev
   # 查看控制台输出
   ```

### 图片无法下载

检查浏览器控制台是否有错误，确保：
1. 图片已成功生成
2. Base64 数据完整
3. 浏览器支持下载功能

## 下一步

- 阅读 [README.md](./README.md) 了解项目详情
- 阅读 [DEPLOYMENT.md](./DEPLOYMENT.md) 了解部署流程
- 查看源代码了解实现细节
