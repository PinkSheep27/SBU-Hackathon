import { NextResponse } from "next/server";
import { chatToGemini } from "@/app/utils/geminiHelper";
import { ChatHistory, ChatSetting } from "@/app/exportType/types";


export async function POST(request: Request) {
  try {
    const { userMessage, history, settings } = await request.json() as {
      userMessage: string;
      history: ChatHistory;
      settings?: ChatSetting; // settings is optional from the request
    };

    // Call the Gemini helper function
    const geminiResponse = await chatToGemini(userMessage, history, settings || {});

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
