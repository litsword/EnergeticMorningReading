import { VolcengineImageResponse } from '@/types';

const VOLCENGINE_API_URL = 'https://ark.cn-beijing.volces.com/api/v3/images/generations';
const MODEL_ID = 'ep-20251111224803-wrd9r';

/**
 * 调用火山引擎图片生成API
 */
export async function generateImageWithVolcengine(prompt: string): Promise<string> {
  const apiKey = process.env.ARK_API_KEY;

  if (!apiKey) {
    throw new Error('ARK_API_KEY is not configured');
  }

  try {
    const response = await fetch(VOLCENGINE_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MODEL_ID,
        prompt: prompt,
        sequential_image_generation: 'disabled',
        response_format: 'url',
        size: '2K',
        stream: false,
        watermark: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Volcengine API error: ${response.status} - ${errorText}`);
    }

    const data: VolcengineImageResponse = await response.json();

    if (!data.data || data.data.length === 0) {
      throw new Error('No image generated from Volcengine API');
    }

    return data.data[0].url;
  } catch (error) {
    console.error('Error calling Volcengine API:', error);
    throw error;
  }
}
