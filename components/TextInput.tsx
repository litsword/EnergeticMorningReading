'use client';

import { ChangeEvent } from 'react';

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export default function TextInput({ value, onChange, disabled }: TextInputProps) {
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  const charCount = value.length;

  return (
    <div className="w-full">
      <label className="block text-lg font-semibold mb-3 text-gray-700">
        晨读文字内容
      </label>
      <textarea
        value={value}
        onChange={handleChange}
        disabled={disabled}
        placeholder="请输入今日晨读的文字内容..."
        className="w-full h-48 p-4 border-2 border-gray-300 rounded-lg resize-none focus:outline-none focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-800 text-base leading-relaxed"
      />
      <div className="mt-2 text-sm text-gray-500 text-right">
        {charCount} 字
      </div>
    </div>
  );
}
