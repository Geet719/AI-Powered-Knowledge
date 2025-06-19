import { GoogleGenAI } from "@google/genai";
import dotenv from 'dotenv';
dotenv.config();

const genAI = new GoogleGenAI(process.env.GEMINI_API_KEY);

export const summarizeWithGemini = async (text) => {
    
    // const model = genAI.getGenerativeModel({ model: "" });
    // const result = await model.generateContent();
    const response = await genAI.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Summarize the following article:\n\n${text}`,
    });
    console.log(response.text);
  return response.text;
};
