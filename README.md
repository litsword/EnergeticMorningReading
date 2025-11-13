# 能量晨读图片生成器

一个基于 Next.js 的 Web 应用，用于生成精美的"能量晨读"分享图片。通过 AI 自动生成与文字内容相配的背景图，合成包含标题、内容和二维码的图片，适合分享到朋友圈。

## 功能特点

- 📝 **文字输入**：输入每日晨读内容
- 🎨 **AI 背景生成**：根据文字内容自动生成相配的艺术背景图
- 📱 **二维码支持**：可上传自定义二维码，或使用默认二维码
- 🖼️ **实时预览**：即时预览生成的图片效果
- 💾 **一键下载**：下载高清图片（1080x1920，适合朋友圈）
- 🎯 **响应式设计**：支持桌面端和移动端访问

## 技术栈

- **框架**：Next.js 14 (App Router)
- **语言**：TypeScript
- **样式**：Tailwind CSS
- **图片生成**：火山引擎图片生成 API
- **图片合成**：Canvas API (node-canvas)
- **部署**：Vercel

## 快速开始

### 1. 克隆项目

```bash
git clone <repository-url>
cd EnergeticMorningReading
```

### 2. 安装依赖

```bash
npm install
```

### 3. 配置环境变量

创建 `.env.local` 文件：

```bash
ARK_API_KEY=your_volcengine_api_key_here
```

获取火山引擎 API Key：
1. 访问 [火山引擎控制台](https://console.volcengine.com/)
2. 创建应用并获取 API Key
3. 将 API Key 填入 `.env.local` 文件

### 4. 启动开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

## 使用说明

1. **输入晨读文字**：在文字输入框中输入今日的晨读内容
2. **上传二维码**（可选）：上传你的二维码图片，或使用默认二维码
3. **生成图片**：点击"生成图片"按钮
4. **预览和下载**：查看生成的图片，满意后点击"下载图片"
5. **分享**：将下载的图片分享到朋友圈

## 部署到 Vercel

### 方式一：通过 Vercel CLI

```bash
npm install -g vercel
vercel
```

### 方式二：通过 GitHub

1. 将代码推送到 GitHub
2. 访问 [Vercel](https://vercel.com/)
3. 导入你的 GitHub 仓库
4. 在环境变量中设置 `ARK_API_KEY`
5. 点击部署

### 环境变量配置

在 Vercel 项目设置中添加环境变量：

- `ARK_API_KEY`：你的火山引擎 API Key

## 项目结构

```
EnergeticMorningReading/
├── app/
│   ├── api/
│   │   ├── generate-image/      # 背景图生成 API
│   │   └── compose-image/        # 图片合成 API
│   ├── globals.css               # 全局样式
│   ├── layout.tsx                # 根布局
│   └── page.tsx                  # 主页面
├── components/
│   ├── TextInput.tsx             # 文字输入组件
│   ├── QRCodeUpload.tsx          # 二维码上传组件
│   └── ImagePreview.tsx          # 图片预览组件
├── lib/
│   ├── volcengine.ts             # 火山引擎 API 封装
│   ├── promptGenerator.ts        # 提示词生成器
│   └── imageComposer.ts          # 图片合成逻辑
├── types/
│   └── index.ts                  # TypeScript 类型定义
├── public/
│   └── default-qrcode.svg        # 默认二维码
└── package.json
```

## 核心功能说明

### 提示词生成

系统会根据晨读文字内容自动提取关键词和情感，生成适合的艺术化提示词：

- 识别情感关键词（快乐、平静、力量等）
- 识别自然元素（阳光、海洋、山峰等）
- 组合艺术风格描述
- 生成高质量的图片提示词

### 图片合成

使用 Canvas API 在服务端合成最终图片：

1. 绘制 AI 生成的背景图
2. 添加渐变遮罩（提高文字可读性）
3. 绘制"能量晨读"标题
4. 绘制晨读文字（自动换行、居中）
5. 绘制二维码（带白色圆角背景）

## 常见问题

### Q: 为什么图片生成失败？

A: 请检查：
- API Key 是否正确配置
- 网络连接是否正常
- 文字内容是否过长

### Q: 可以修改图片尺寸吗？

A: 可以，在 `app/api/compose-image/route.ts` 中修改 `IMAGE_WIDTH` 和 `IMAGE_HEIGHT` 常量。

### Q: 如何更换默认二维码？

A: 替换 `public/default-qrcode.svg` 文件即可。

## 开发计划

- [ ] 支持更多图片尺寸选项
- [ ] 支持自定义字体和颜色
- [ ] 支持图片模板选择
- [ ] 支持批量生成
- [ ] 添加用户历史记录

## 许可证

MIT

## 贡献

欢迎提交 Issue 和 Pull Request！
