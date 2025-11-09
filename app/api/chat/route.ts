import { NextResponse } from "next/server";
import { chatToGemini } from "@/app/utils/geminiHelper";
import { ChatHistory, ChatSetting } from "@/app/exportType/types";


export async function POST(request: Request) {
  try {
    const { userMessage, history, settings } = await request.json() as {
      userMessage: string;
      history: ChatHistory;
      settings: ChatSetting;
    };

    const aiResponse = await chatToGemini(userMessage, history, settings);
    return NextResponse.json({ response: aiResponse });
  }
  catch (error) {
    console.error(error);
    return NextResponse.json(
<<<<<<< HEAD
      {error: "Error with the model response " + String(error)},
      {status : 500}
=======
      { error: "Error with the model response " },
      { status: 500 }
>>>>>>> ce9e6f34ed31b7bff736cc9ba9a1b8dcdec85f3a
    );
  }
}
