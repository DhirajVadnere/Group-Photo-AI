
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { UserImage, Pose, AspectRatio } from "../types";

export class GeminiService {
  private static async getAIInstance(): Promise<GoogleGenAI> {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      throw new Error("API Key not found. Please Sign In with Google to use your quota.");
    }
    return new GoogleGenAI({ apiKey });
  }

  static async generateGroupPhoto(params: {
    images: UserImage[];
    pose: Pose;
    scene: string;
    aspectRatio: AspectRatio;
    preserveOutfits: boolean;
    sharedBackground: boolean;
  }): Promise<string> {
    const { images, pose, scene, aspectRatio, preserveOutfits, sharedBackground } = params;
    const n = images.length;

    // Exclusively using gemini-2.5-flash-image for speed and efficiency
    const modelName = 'gemini-2.5-flash-image';

    const poseRules = pose.rules(n);
    
    const directorPrompt = `
Create a photorealistic group photo containing EXACTLY ${n} people, using the provided reference photos for each person's face and identity.

Pose Style: ${pose.name}. 
Composition Strategy: ${poseRules}. 

Environmental Context:
- Lighting: Soft natural light, realistic shadows across all subjects.
- Background: ${scene}.
${sharedBackground ? '- Integration: Ensure all subjects are perfectly integrated into a single coherent 3D environment with shared lighting and ground shadows.' : '- Integration: Focus on individual character rendering within the specified scene.'}
- Outfits: ${preserveOutfits ? 'Strictly preserve the exact clothing and outfits from the reference photos for each individual.' : 'Maintain identity but you can adapt outfits to suit the scene and lighting for a more realistic result.'}

Strict Requirements:
- No extra limbs or merged faces.
- Realistic proportions and anatomical correctness.
- The output must be one single, seamless, high-fidelity photorealistic image.

Return one final image only.
`.trim();

    const ai = await this.getAIInstance();

    const imageParts = images.map(img => ({
      inlineData: {
        mimeType: img.file.type,
        data: img.base64.split(',')[1]
      }
    }));

    const textPart = { text: directorPrompt };

    try {
      const response: GenerateContentResponse = await ai.models.generateContent({
        model: modelName,
        contents: { parts: [...imageParts, textPart] },
        config: {
          imageConfig: {
            aspectRatio: aspectRatio as any
          }
        }
      });

      const candidate = response.candidates?.[0];
      if (!candidate) throw new Error("No response generated from the model.");

      for (const part of candidate.content.parts) {
        if (part.inlineData) {
          return `data:image/png;base64,${part.inlineData.data}`;
        }
      }

      throw new Error("No image data found in the response.");
    } catch (error: any) {
      console.error("Gemini Generation Error:", error);
      if (error.message?.includes("Requested entity was not found")) {
        throw new Error("AUTH_REQUIRED");
      }
      throw error;
    }
  }

  static async editImage(params: {
    base64Image: string;
    prompt: string;
  }): Promise<string> {
    const { base64Image, prompt } = params;
    const ai = await this.getAIInstance();

    const imagePart = {
      inlineData: {
        mimeType: 'image/png',
        data: base64Image.split(',')[1],
      },
    };

    const textPart = {
      text: `Modify the provided image based on this instruction: "${prompt}". 
      Maintain faces and identities. Photorealistic style only. 
      Return one final edited image only.`
    };

    try {
      const response: GenerateContentResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts: [imagePart, textPart] },
      });

      const candidate = response.candidates?.[0];
      if (!candidate) throw new Error("No response generated.");

      for (const part of candidate.content.parts) {
        if (part.inlineData) {
          return `data:image/png;base64,${part.inlineData.data}`;
        }
      }
      throw new Error("No image data found.");
    } catch (error: any) {
      console.error("Gemini Editing Error:", error);
      throw error;
    }
  }
}
