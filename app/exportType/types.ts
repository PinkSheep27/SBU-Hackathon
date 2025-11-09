export type MessageRole = "user" | "model";

export type MessagePart = {
    text: string;
}

export interface Message{
    role: MessageRole;
    parts:MessagePart[];
}
export type ChatHistory = Message[];

export interface GenerateConfig{
    temperature : number;
    topP : number;
    responseMimeType : string;
}

export interface ChatSetting{
    temperature :number;
    model: string;
    sysTemInstructions: string;
}

export interface CardData {
  id: number;
  title: string;
  tracks: string[];
  summary: string;
}