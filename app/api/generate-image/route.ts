import { NextRequest, NextResponse } from 'next/server';
import { generateImageWithVolcengine } from '@/lib/volcengine';
import { generatePromptFromText } from '@/lib/promptGenerator';

// 设置路由超时为 60 秒
export const maxDuration = 60;

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json();

    if (!text || typeof text !== 'string') {
      return NextResponse.json(
        { error: 'Text is required' },
        { status: 400 }
      );
    }

    console.log('Received text:', text.substring(0, 50) + '...');

    // 根据文字内容生成提示词
    const prompt = generatePromptFromText(text);
    console.log('Generated prompt:', prompt);

    // 调用火山引擎API生成图片
    console.log('Calling Volcengine API...');
    const startTime = Date.now();

    const imageUrl = await generateImageWithVolcengine(prompt);

    const duration = Date.now() - startTime;
    console.log(`Image generated in ${duration}ms`);
    console.log('Image URL:', imageUrl);

    return NextResponse.json({
      success: true,
      imageUrl,
      prompt,
    });
  } catch (error) {
    console.error('Error in generate-image API:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate image' },
      { status: 500 }
    );
  }
}
