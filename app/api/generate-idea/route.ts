import { NextResponse } from "next/server";
import { chatToGemini } from "@/app/utils/geminiHelper";
import { ChatSetting } from "@/app/exportType/types";


export async function POST(request: Request) {
  try {
    const { prompt, settings } = await request.json() as {
      prompt: string;
      settings: ChatSetting;
    };

    const aiResponse = await chatToGemini(prompt, [], settings);
    return NextResponse.json({ response: aiResponse });
  }
  catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error with the model response " },
      { status: 500 }
    );
  }
}
