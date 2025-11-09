export type MessageRole = "user" | "model";

export type MessagePart = {
    text: string;
}

export interface Message {
    role: MessageRole;
    parts: MessagePart[];
}
export type ChatHistory = Message[];

export interface GenerateConfig {
    temperature: number;
    topP: number;
    responseMimeType: string;
<<<<<<< HEAD
    maxOutputTokens?: number;
=======
>>>>>>> 44b5a4dc49ea757e9790ba8309edc6b37d764105
}

export interface ChatSetting {
    temperature: number;
    model: string;
    sysTemInstructions: string;
}

export interface CardData {
    id: number;
    title: string;
    tracks: string[];
    summary: string;
}