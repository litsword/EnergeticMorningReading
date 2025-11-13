'use client';

import { useState } from 'react';
import TextInput from '@/components/TextInput';
import QRCodeUpload from '@/components/QRCodeUpload';
import ImagePreview from '@/components/ImagePreview';
import ImageCanvas from '@/components/ImageCanvas';

export default function Home() {
  const [text, setText] = useState('');
  const [title, setTitle] = useState('能量晨读');
  const [date, setDate] = useState('');
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [backgroundUrl, setBackgroundUrl] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 获取默认日期（格式：YYYY.MM.DD）
  const getDefaultDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  };

  const handleGenerate = async () => {
    if (!text.trim()) {
      alert('请输入晨读文字内容');
      return;
    }

    setIsGenerating(true);
    setError(null);
    setGeneratedImage(null);
    setBackgroundUrl(null);

    try {
      // 生成背景图
      const generateResponse = await fetch('/api/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      if (!generateResponse.ok) {
        const errorData = await generateResponse.json();
        throw new Error(errorData.error || '生成背景图失败');
      }

      const { imageUrl } = await generateResponse.json();
      setBackgroundUrl(imageUrl);
      // 图片合成将由 ImageCanvas 组件完成
    } catch (err) {
      console.error('Error generating image:', err);
      setError(err instanceof Error ? err.message : '生成图片失败，请重试');
      setIsGenerating(false);
    }
  };

  const handleImageGenerated = (imageData: string) => {
    console.log('handleImageGenerated called with data length:', imageData.length);

    if (!imageData) {
      setError('图片生成失败，请重试');
      setIsGenerating(false);
      return;
    }

    setGeneratedImage(imageData);
    setIsGenerating(false);
    console.log('Image state updated, isGenerating set to false');
  };

  const handleDownload = () => {
    if (!generatedImage) return;

    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = `能量晨读_${new Date().toLocaleDateString()}.png`;
    link.click();
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* 标题 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">能量晨读图片生成器</h1>
          <p className="text-gray-600">为你的每日晨读生成精美的分享图片</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 左侧：输入区域 */}
          <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
            {/* 标题输入 */}
            <div className="w-full">
              <label className="block text-lg font-semibold mb-3 text-gray-700">
                图片标题
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={isGenerating}
                placeholder="能量晨读"
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-800"
              />
              <p className="mt-1 text-sm text-gray-500">默认：能量晨读</p>
            </div>

            {/* 日期输入 */}
            <div className="w-full">
              <label className="block text-lg font-semibold mb-3 text-gray-700">
                日期
              </label>
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                disabled={isGenerating}
                placeholder={getDefaultDate()}
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-800"
              />
              <p className="mt-1 text-sm text-gray-500">默认：{getDefaultDate()}（格式：YYYY.MM.DD）</p>
            </div>

            <TextInput
              value={text}
              onChange={setText}
              disabled={isGenerating}
            />

            <QRCodeUpload
              value={qrCode}
              onChange={setQrCode}
              disabled={isGenerating}
            />

            <button
              onClick={handleGenerate}
              disabled={isGenerating || !text.trim()}
              className="w-full py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg text-lg"
            >
              {isGenerating ? '生成中...' : '生成图片'}
            </button>

            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}
          </div>

          {/* 右侧：预览区域 */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">图片预览</h2>

            <ImagePreview
              imageUrl={generatedImage}
              isGenerating={isGenerating}
            />

            {generatedImage && (
              <button
                onClick={handleDownload}
                className="w-full mt-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-all shadow-md hover:shadow-lg"
              >
                下载图片
              </button>
            )}
          </div>
        </div>

        {/* 使用说明 */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-800">使用说明</h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-600">
            <li>（可选）自定义图片标题，不填写则使用默认"能量晨读"</li>
            <li>（可选）自定义日期，不填写则使用当天日期</li>
            <li>在文字输入框中输入今日的晨读内容（必填）</li>
            <li>（可选）上传你的二维码图片，或使用默认二维码</li>
            <li>点击"生成图片"按钮，系统会自动生成与内容相配的背景图</li>
            <li>生成完成后，预览图片并点击"下载图片"保存到本地</li>
            <li>分享到朋友圈，传递正能量！</li>
          </ol>
        </div>
      </div>

      {/* 隐藏的图片合成画布 */}
      {backgroundUrl && (
        <ImageCanvas
          backgroundUrl={backgroundUrl}
          title={title || '能量晨读'}
          date={date || getDefaultDate()}
          text={text}
          qrCodeImage={qrCode}
          onGenerated={handleImageGenerated}
        />
      )}
    </main>
  );
}
