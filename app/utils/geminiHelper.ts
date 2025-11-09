import { GoogleGenerativeAI } from "@google/generative-ai";
import { ChatHistory, GenerateConfig, ChatSetting } from "../exportType/types";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    throw new Error("api key not found");
}

const genAI = new GoogleGenerativeAI(apiKey);

const DEFAULT_CHAT_SETTINGS: ChatSetting = {
    model: "gemini-2.5-flash-lite",
    systemInstructions: "you are going to create a project idea, explain it in summary first before going to detail",
    temperature: 1
};

export async function chatToGemini(
    userMessage:string ,
    history:ChatHistory, 
    settings:ChatSetting
):Promise<string>{
        const effectiveSettings = { ...DEFAULT_CHAT_SETTINGS, ...settings };

        const model = genAI.getGenerativeModel({
            model: effectiveSettings.model,
            systemInstruction: effectiveSettings.systemInstructions,
            });
        
        const generationConfig:GenerateConfig = {
            temperature : effectiveSettings.temperature,
            topP : 0.9,
            responseMimeType: "text/plain",
            maxOutputTokens: 1900, // Increased to allow for longer responses
        }

    const chatSession = model.startChat({
        generationConfig,
        history
    })

    try {
        const result = await chatSession.sendMessage(userMessage);
        return result.response.text();
    }
    catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Error in chatToGemini:", error.name, error.message, error);
        } else {
            console.error("Unknown error in chatToGemini:", error);
        }
        throw error;
    }
}