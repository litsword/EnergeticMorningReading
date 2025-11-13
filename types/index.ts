export interface MorningReadingInput {
  text: string;
  qrCodeImage?: string; // base64 or URL
}

export interface VolcengineImageResponse {
  data: Array<{
    url: string;
    b64_image?: string;
  }>;
}

export interface GeneratedImage {
  backgroundUrl: string;
  finalImageUrl?: string;
}
