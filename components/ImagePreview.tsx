'use client';

import Image from 'next/image';

interface ImagePreviewProps {
  imageUrl: string | null;
  isGenerating: boolean;
}

export default function ImagePreview({ imageUrl, isGenerating }: ImagePreviewProps) {
  if (isGenerating) {
    return (
      <div className="w-full aspect-[9/16] bg-gray-100 rounded-lg flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500"></div>
        <p className="mt-4 text-gray-600">正在生成图片...</p>
      </div>
    );
  }

  if (!imageUrl) {
    return (
      <div className="w-full aspect-[9/16] bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
        <div className="text-center text-gray-400">
          <svg
            className="w-24 h-24 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <p className="text-lg">图片预览区域</p>
          <p className="text-sm mt-2">输入文字后点击生成按钮</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="relative w-full aspect-[9/16] rounded-lg overflow-hidden shadow-lg">
        <Image
          src={imageUrl}
          alt="生成的晨读图片"
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
}
