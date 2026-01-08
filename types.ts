
export interface UserImage {
  id: string;
  url: string;
  file: File;
  isBestFace: boolean;
  base64: string;
}

export type AspectRatio = '1:1' | '3:4' | '4:3' | '9:16' | '16:9';

export interface Pose {
  id: string;
  name: string;
  description: string;
  hint: string;
  thumbnail: string;
  rules: (n: number) => string;
}

export interface AppState {
  step: 'landing' | 'upload' | 'pose' | 'style' | 'generate' | 'result';
  images: UserImage[];
  selectedPose: Pose | null;
  scene: string;
  aspectRatio: AspectRatio;
  preserveOutfits: boolean;
  sharedBackground: boolean;
  generatedImageUrl: string | null;
  isGenerating: boolean;
  error: string | null;
}

export enum Step {
  LANDING = 'landing',
  UPLOAD = 'upload',
  POSE = 'pose',
  STYLE = 'style',
  GENERATE = 'generate',
  RESULT = 'result'
}
