import { GoogleGenerativeAI } from "@google/generative-ai";
import { ChatHistory, GenerateConfig, ChatSetting } from "../exportType/types";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    throw new Error("api key not found");
}

const genAI = new GoogleGenerativeAI(apiKey);

export async function chatToGemini(
    userMessage: string,
    history: ChatHistory,
    settings: ChatSetting
): Promise<string> {
    const model = genAI.getGenerativeModel({
        model: settings.model || "gemini-2.5-flash",
        systemInstruction: settings.sysTemInstructions || "you are going to create a project idea, explain it in summery first before going to detail",
    });

    const generationConfig: GenerateConfig = {
        temperature: settings.temperature || 1,
        topP: 0.9,
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
    catch (error) {
        console.error(error)
        throw error
    }
}