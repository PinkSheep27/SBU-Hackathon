"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ChatInput from "../utils/component/ui/ChatInput";
import MessageWindow from "../utils/component/ui/MessageWindow";
import { ChatHistory, ChatSetting, Message , MessageRole } from "@/app/exportType/types";

export default function Home(){
  const [history, setHistory] = useState<ChatHistory>([])
  const [loading, setLoading] = useState(false);
  const historyRef = useRef<ChatHistory>([]); // Create a ref for history
  const [settings] = useState<ChatSetting>({
    temperature:1,
    model:"gemini-2.5-pro",
    systemInstruction:"you are a ai helper. Your goal is to expand the project idea and interact with the user on any problem or question they have with the project. You are not allow to code the project for them and stray away from your job"
    
  });
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialMessageSent = useRef(false);

  useEffect(() => {
    historyRef.current = history; // Keep the ref updated with the latest history
  }, [history]);

  const handleSend = useCallback(async(message:string)=>{
    const newUserMessage:Message = {
      role:"user",
      parts:[{text:message}],
    };

    setHistory(prevHistory => {
      const currentHistory = [...prevHistory, newUserMessage];
      
      const sendApiRequest = async () => {
        setLoading(true);
        try{
          const response = await fetch("/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify({
              userMessage: message,
              history: historyRef.current, // Use the ref for history
              settings: settings,
            }),
          });

          const data = await response.json();

          if (data.error) {
            console.error("AI Error:", data.error);
            setLoading(false);
            return;
          }

          const aiMessage: Message = {
            role: "model" as MessageRole,
            parts: [{ text: data.response }],
          };

          setHistory(prevHistory => [...prevHistory, aiMessage]);
          
        } 
        catch (error) {
          console.error("Request Failed:", error);
        }
        setLoading(false);
      };
      sendApiRequest();

      return currentHistory;
    });
  }, [settings]); // Now handleSend only depends on settings

  useEffect(() => {
    if (!initialMessageSent.current) {
      const title = searchParams.get('title');
      const summary = searchParams.get('summary');

      if (title && summary) {
        const message = `Explain the project titled '${title}' with the summary '${summary}' in detail, and suggest suitable roles for a team working on it.`;
        
        const newUserMessage: Message = {
          role: "user",
          parts: [{ text: message }],
        };

        setTimeout(() => {
          setHistory((prevHistory) => [...prevHistory, newUserMessage]); // Add user message to history
        }, 0);

        const sendInitialApiRequest = async () => {
          setLoading(true);
          try {
            const response = await fetch("/api/chat", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                userMessage: message,
                history: [...historyRef.current, newUserMessage], // Use ref for history
                settings: settings,
              }),
            });

            const data = await response.json();

            if (data.error) {
              console.error("AI Error:", data.error);
              setLoading(false);
              return;
            }

            const aiMessage: Message = {
              role: "model" as MessageRole,
              parts: [{ text: data.response }],
            };

            setHistory((prevHistory) => [...prevHistory, aiMessage]);
          } catch (error) {
            console.error("Request Failed:", error);
          }
          setLoading(false);
        };

        sendInitialApiRequest();
        initialMessageSent.current = true;
      }
    }
  }, [searchParams, settings]); // Dependencies for this useEffect


  return (
    <div className="flex flex-col py-32">
      <button
        onClick={() => router.push('/Dashboard')}
        className="absolute top-4 right-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Exit
      </button>
      <MessageWindow history={history} isLoading={loading} />
      <ChatInput onSend={handleSend} onOpenSettings={() => {}} />
    </div>
  );
}