
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { PageContent } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // This is a fallback for development if the API key isn't set.
  // In a real production environment, this should not happen.
  console.error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

const storySchema = {
  type: Type.OBJECT,
  properties: {
    title: {
      type: Type.STRING,
      description: "A captivating, short title for the story, under 10 words."
    },
    summary: {
      type: Type.STRING,
      description: "A one-paragraph summary of the story's premise."
    },
    pages: {
      type: Type.ARRAY,
      description: "The first 5 pages of the story. Each page should be a string containing about 150-200 words of content.",
      items: {
        type: Type.STRING
      }
    }
  },
  required: ["title", "summary", "pages"]
};

const pagesSchema = {
    type: Type.OBJECT,
    properties: {
        pages: {
            type: Type.ARRAY,
            description: "The next 5 pages of the story. Each page should be a string containing about 150-200 words of content, continuing the narrative.",
            items: {
                type: Type.STRING
            }
        }
    },
    required: ["pages"]
};

export const generateStory = async (prompt: string): Promise<{ title: string; summary: string; pages: string[] }> => {
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Generate a short story based on this prompt: "${prompt}". The story should be engaging for adults.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: storySchema,
      }
    });
    
    const text = response.text.trim();
    return JSON.parse(text);
  } catch (error) {
    console.error("Error generating story:", error);
    throw new Error("Failed to generate story. Please try again.");
  }
};

export const generateNextPages = async (storyTitle: string, lastPageContent: string): Promise<{ pages: string[] }> => {
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Continue the story titled "${storyTitle}". The last thing that happened was: "${lastPageContent}". Write the next 5 pages, ensuring a natural continuation of the plot and characters.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: pagesSchema,
      }
    });

    const text = response.text.trim();
    return JSON.parse(text);
  } catch (error) {
    console.error("Error generating next pages:", error);
    throw new Error("Failed to continue the story. Please try again.");
  }
};
