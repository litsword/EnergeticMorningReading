'use client';

import { useRef, useEffect, useState } from 'react';

interface ImageCanvasProps {
  backgroundUrl: string;
  text: string;
  qrCodeImage: string | null;
  onGenerated: (imageData: string) => void;
}

export default function ImageCanvas({ backgroundUrl, text, qrCodeImage, onGenerated }: ImageCanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const totalImages = 2; // 背景图 + 二维码

  // 使用代理URL来避免CORS问题
  const proxiedBackgroundUrl = `/api/proxy-image?url=${encodeURIComponent(backgroundUrl)}`;

  useEffect(() => {
    console.log(`Images loaded: ${imagesLoaded}/${totalImages}`);

    if (backgroundUrl && text && canvasRef.current && imagesLoaded >= totalImages) {
      console.log('All images loaded, starting generation...');
      // 等待所有图片加载完成后再生成
      setTimeout(() => {
        generateImage();
      }, 1000); // 增加到1秒确保渲染完成
    }
  }, [backgroundUrl, text, qrCodeImage, imagesLoaded]);

  const handleImageLoad = (type: string) => {
    console.log(`${type} image loaded`);
    setImagesLoaded(prev => prev + 1);
  };

  const generateImage = async () => {
    if (!canvasRef.current) {
      console.error('Canvas ref is null');
      return;
    }

    console.log('Starting image generation with html2canvas...');

    try {
      // 动态导入 html2canvas
      const html2canvas = (await import('html2canvas')).default;

      const canvas = await html2canvas(canvasRef.current, {
        backgroundColor: null,
        scale: 2, // 提高清晰度
        useCORS: false, // 不使用CORS，因为我们用了代理
        allowTaint: true,
        logging: true, // 启用日志方便调试
      });

      console.log('Canvas generated, converting to image...');
      const imageData = canvas.toDataURL('image/png');
      console.log('Image generated successfully, data length:', imageData.length);
      onGenerated(imageData);
    } catch (error) {
      console.error('Error generating image:', error);
      // 即使失败也要通知父组件停止加载状态
      onGenerated('');
    }
  };

  // 分割文字为多行
  const lines = text.split('\n').filter(line => line.trim());

  // 获取当天日期
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const dateString = `${year}.${month}.${day}`;

  return (
    <div style={{ position: 'fixed', left: '-9999px', top: 0 }}>
      <div
        ref={canvasRef}
        style={{
          width: '1080px',
          height: '1920px',
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: '#000',
        }}
      >
        {/* 背景图 */}
        <div style={{ position: 'absolute', width: '100%', height: '100%' }}>
          <img
            src={proxiedBackgroundUrl}
            alt="background"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onLoad={() => handleImageLoad('Background')}
            onError={(e) => {
              console.error('Background image load error:', e);
              handleImageLoad('Background (error)');
            }}
          />
        </div>

        {/* 渐变遮罩 */}
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.2), rgba(0,0,0,0.4))',
          }}
        />

        {/* 标题 */}
        <div
          style={{
            position: 'absolute',
            top: '120px',
            width: '100%',
            textAlign: 'center',
            color: '#FFFFFF',
            fontSize: '80px',
            fontWeight: 'bold',
            textShadow: '2px 2px 10px rgba(0,0,0,0.5)',
            fontFamily: 'Arial, "PingFang SC", "Microsoft YaHei", sans-serif',
          }}
        >
          能量晨读
        </div>

        {/* 日期 */}
        <div
          style={{
            position: 'absolute',
            top: '230px',
            width: '100%',
            textAlign: 'center',
            color: '#FFFFFF',
            fontSize: '36px',
            fontWeight: 'normal',
            textShadow: '2px 2px 8px rgba(0,0,0,0.5)',
            fontFamily: 'Arial, "PingFang SC", "Microsoft YaHei", sans-serif',
            opacity: 0.9,
          }}
        >
          {dateString}
        </div>

        {/* 文字内容 */}
        <div
          style={{
            position: 'absolute',
            top: '320px',
            left: '80px',
            right: '80px',
            color: '#FFFFFF',
            fontSize: '48px',
            lineHeight: '1.5',
            textAlign: 'center',
            textShadow: '2px 2px 8px rgba(0,0,0,0.5)',
            fontFamily: 'Arial, "PingFang SC", "Microsoft YaHei", sans-serif',
          }}
        >
          {lines.map((line, index) => (
            <div key={index} style={{ marginBottom: '16px' }}>
              {line}
            </div>
          ))}
        </div>

        {/* 二维码 */}
        <div
          style={{
            position: 'absolute',
            bottom: '60px',
            right: '60px',
            width: '240px',
            height: '240px',
            backgroundColor: 'rgba(255,255,255,0.95)',
            borderRadius: '15px',
            padding: '20px',
            boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img
            src={qrCodeImage || '/default-qrcode.svg'}
            alt="QR Code"
            style={{ width: '180px', height: '180px', objectFit: 'contain' }}
            onLoad={() => handleImageLoad('QR Code')}
            onError={(e) => {
              console.error('QR code image load error:', e);
              handleImageLoad('QR Code (error)');
            }}
          />
        </div>
      </div>
    </div>
  );
}
