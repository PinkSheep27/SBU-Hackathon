"use client";

import { useState, useEffect, useRef, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ChatInput from "../utils/component/ui/ChatInput";
import MessageWindow from "../utils/component/ui/MessageWindow";
import { ChatHistory, ChatSetting, Message, MessageRole } from "@/app/exportType/types";
import { getChatSessionByProjectId, saveChatSession } from "../utils/storage";

function getInitialChatState(
  projectId: string | null,
): ChatHistory {
  if (typeof window === 'undefined' || !projectId) {
    return [];
  }
  const existingSession = getChatSessionByProjectId(projectId);
  if (existingSession) {
    return existingSession.history;
  }
  return [];
}

export default function Home() {
  return (
    <Suspense fallback={<div>Loading chat...</div>}>
      <ChatbotContent />
    </Suspense>
  );
}

function ChatbotContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const projectId = searchParams.get('projectId');
  const projectTitle = searchParams.get('projectTitle');
  const cardTitle = searchParams.get('cardTitle');
  const cardSummary = searchParams.get('cardSummary');

  const [history, setHistory] = useState<ChatHistory>(() => getInitialChatState(projectId));
  const [loading, setLoading] = useState(false);
  const historyRef = useRef<ChatHistory>(history);
  const [settings] = useState<ChatSetting>({
    temperature: 1,
    model: "gemini-2.5-flash-lite",
    systemInstructions: "you are a ai helper. Your goal is to expand the project idea and interact with the user on any problem or question they have with the project. You are not allow to code the project for them and stray away from your job"
  });

  const initialMessageSent = useRef(false);

  useEffect(() => {
    historyRef.current = history;
    if (history.length > 0 && projectId && projectTitle) {
      saveChatSession(projectId, projectTitle, history);
    }
  }, [history, projectId, projectTitle]);

  const handleSend = useCallback(async (message: string) => {
    const newUserMessage: Message = {
      role: "user",
      parts: [{ text: message }],
    };

    const currentHistory = [...historyRef.current, newUserMessage];
    setHistory(currentHistory);
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userMessage: message,
          history: historyRef.current,
          settings: settings,
        }),
      });

      const data = await response.json();
      setLoading(false);

      if (data.error) {
        console.error("AI Error:", data.error);
        const aiErrorMessage: Message = {
          role: "model",
          parts: [{ text: `Error: ${data.error}` }],
        };
        setHistory(prevHistory => [...prevHistory, aiErrorMessage]);
        return;
      }

      const aiMessage: Message = {
        role: "model" as MessageRole,
        parts: [{ text: data.response }],
      };

      setHistory(prevHistory => [...prevHistory, aiMessage]);

    } catch (error) {
      console.error("Request Failed:", error);
      setLoading(false);
      const aiErrorMessage: Message = {
        role: "model",
        parts: [{ text: `Error: Could not connect to AI service.` }],
      };
      setHistory(prevHistory => [...prevHistory, aiErrorMessage]);
    }
  }, [settings, projectId, projectTitle]);

  useEffect(() => {
    if (cardTitle && cardSummary && history.length === 0 && !initialMessageSent.current) {
      initialMessageSent.current = true;
      setLoading(true);

      const message = `Explain the project titled '${cardTitle}' with the summary '${cardSummary}' in detail, and suggest suitable roles for a team working on it.`;

      const newUserMessage: Message = {
        role: "user",
        parts: [{ text: message }],
      };

      setHistory([newUserMessage]);

      const sendInitialApiRequest = async () => {
        try {
          const response = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userMessage: message,
              history: [],
              settings: settings,
            }),
          });

          const data = await response.json();
          setLoading(false);

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
          setLoading(false);
        }
      };

      sendInitialApiRequest();
    }
  }, [cardTitle, cardSummary, history.length, settings, projectId, projectTitle]);

  return (
    <div className="flex flex-col py-32">
      <button
        onClick={() => router.push('/Dashboard')}
        className="absolute top-4 right-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Exit
      </button>
      <MessageWindow history={history} isLoading={loading} />
      <ChatInput onSend={handleSend} onOpenSettings={() => { }} />
    </div>
  );
}