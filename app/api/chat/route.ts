import { NextResponse } from "next/server";
import { chatToGemini } from "@/app/utils/geminiHelper";
import { ChatHistory, ChatSetting } from "@/app/exportType/types";

const DEFAULT_CHAT_SETTINGS: ChatSetting = {
    temperature: 1,
    model: "gemini-2.5-flash-lite",
    systemInstructions: "you are a ai helper. Your goal is to expand the project idea and interact with the user on any problem or question they have with the project. You are not allow to code the project for them and stray away from your job"
};

export async function POST(request: Request) {
  try {
    const { userMessage, history, settings } = await request.json() as {
      userMessage: string;
      history: ChatHistory;
      settings?: Partial<ChatSetting>; // settings is optional from the request
    };

    const effectiveSettings = { ...DEFAULT_CHAT_SETTINGS, ...settings };

    // Call the Gemini helper function
    const geminiResponse = await chatToGemini(userMessage, history, effectiveSettings);

    return NextResponse.json({ response: geminiResponse });
  }
  catch (error) {
    console.error(error);
    return NextResponse.json(
      {error: "Error with the model response " + String(error)},
      {status : 500}
    );
  }
}
