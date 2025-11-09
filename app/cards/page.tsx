"use client";

import React, { useState, useEffect, Suspense } from "react";
import { motion, useMotionValue, useTransform, useAnimation } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { CardData } from "@/app/exportType/types";

interface ColorWay {
  card: string;
  text: string;
  titleColor: string;
}

const COLOR_WAYS: ColorWay[] = [
  { card: "#FEEEDF", text: "#173C46", titleColor: "#173C46" },
  { card: "#FEEEDF", text: "#EA627F", titleColor: "#173C46" },
  { card: "#DEE5D4", text: "#173C46", titleColor: "#EA627F" },
  { card: "#DEE5D4", text: "#EA627F", titleColor: "#173C46" },
  { card: "#B8C0AD", text: "#173C46", titleColor: "#173C46" },
  { card: "#B8C0AD", text: "#173C46", titleColor: "#EA627F" },
];

const parseAiResponse = (markdownString: string): CardData[] => {
  const ideas: CardData[] = [];
  const ideaBlocks = markdownString.split("### ").filter(block => block.trim() !== "");

  ideaBlocks.forEach((block, index) => {
    const titleMatch = block.match(/^(.*?)\n/);
    const conceptMatch = block.match(/\*\*Concept:\*\*\s*([\s\S]*?)(?=\n\*\*|$)/s); // Improved summary regex
    
    // --- THIS IS THE FIX ---
    // It now looks for "**Core Technology:**" and splits the technologies by comma
    const techMatch = block.match(/\*\*Core Technology:\*\*\s*(.*)/);
    const tracks = techMatch ? techMatch[1].split(',').map(t => t.trim()) : ["General"];
    // -----------------------

    ideas.push({
      id: index + 1,
      title: titleMatch ? titleMatch[1].trim() : `Idea ${index + 1}`,
      summary: conceptMatch ? conceptMatch[1].trim() : "No concept provided.",
      tracks: tracks.length > 0 ? tracks : ["General"],
    });
  });
  return ideas;
};
export default function CardsPageWrapper(){
  return (
    <Suspense fallback={<div className="grid h-screen w-full place-items-center bg-orange-100"><p>Loading cards...</p></div>}>
      <CardsPage />
    </Suspense>
  );
}
function CardsPage() {
  const [cards, setCards] = useState<CardData[]>([]);
  const [initialCards, setInitialCards] = useState<CardData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();

  const projectId = searchParams.get('projectId');
  const projectTitle = searchParams.get('projectTitle');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const aiResponse = localStorage.getItem('temp_aiResponse');
    if (aiResponse) {
      localStorage.removeItem('temp_aiResponse');
      const parsedCards = parseAiResponse(aiResponse);
      setCards(parsedCards.reverse());
      setInitialCards(parsedCards.reverse());
    } else {
      // If no AI response is found, we do nothing.
      // The 'cards' state will remain empty, showing the "No more cards!" UI.
      console.warn("No 'temp_aiResponse' found in localStorage. Displaying empty deck.");
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div className="grid h-screen w-full place-items-center bg-orange-100"><p>Loading cards...</p></div>
  }

  if (!projectId || !projectTitle) {
    return (
      <div className="grid h-screen w-full place-items-center bg-orange-100">
        <p>Missing project information. Please <a href="/formfile">start a new project</a>.</p>
      </div>
    )
  }

  return (
    <SwipeCards
      initialCards={initialCards}
      currentCards={cards}
      setCards={setCards}
      projectId={projectId}
      projectTitle={projectTitle}
    />
  )
}

interface SwipeCardsProps {
  initialCards: CardData[];
  currentCards: CardData[];
  setCards: React.Dispatch<React.SetStateAction<CardData[]>>;
  projectId: string;
  projectTitle: string;
}

const SwipeCards: React.FC<SwipeCardsProps> = ({
  initialCards,
  currentCards,
  setCards,
  projectId,
  projectTitle
}) => {
  const router = useRouter();

  const removeCard = () => {
    setCards((prev) => prev.slice(0, prev.length - 1));
  };

  const handleAccept = (cardData: CardData) => {
    removeCard();
    router.push(`/chatbot?projectId=${encodeURIComponent(projectId)}&projectTitle=${encodeURIComponent(projectTitle)}&cardTitle=${encodeURIComponent(cardData.title)}&cardSummary=${encodeURIComponent(cardData.summary)}`);
  };

  const handleReject = () => {
    removeCard();
  };

  const handleReset = () => {
    setCards(initialCards);
  };

  return (
    <div
      className="grid h-screen w-full place-items-center bg-orange-100"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' 
          viewBox='0 0 32 32' width='32' height='32' fill='none' 
          stroke-width='2' stroke='%23d4d4d4'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`,
      }}
    >
      {currentCards.length > 0 ? (
        currentCards.map((card, index) => {
          const colorWay = COLOR_WAYS[card.id % COLOR_WAYS.length];
          return (
            <Card
              key={card.id}
              cardData={card}
              colorWay={colorWay}
              isFront={index === currentCards.length - 1}
              onAccept={handleAccept}
              onReject={handleReject}
            />
          );
        })
      ) : (
        <div className="text-center">
          <h2 className="text-2xl font-bold text-neutral-700">
            No more cards!
          </h2>
          <p className="mb-4 text-neutral-500">
            You&apos;ve swiped through them all.
          </p>
          <button
            onClick={handleReset}
            className="rounded-md bg-indigo-500 px-4 py-2 font-semibold text-white transition-colors hover:bg-indigo-600"
          >
            Reset Deck
          </button>
        </div>
      )}
    </div>
  );
};

interface CardProps {
  cardData: CardData;
  colorWay: ColorWay;
  isFront: boolean;
  onAccept: (cardData: CardData) => void;
  onReject: () => void;
}

const Card: React.FC<CardProps> = ({ cardData, colorWay, isFront, onAccept, onReject }) => {
  const { title, summary, tracks } = cardData;
  const controls = useAnimation();
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-250, 250], [-25, 25]);
  const opacity = useTransform(
    x,
    [-250, -100, 0, 100, 250],
    [0, 1, 1, 1, 0],
  );

  const acceptOpacity = useTransform(x, [50, 150], [0, 1]);
  const rejectOpacity = useTransform(x, [-150, -50], [1, 0]);
  const badgeRotate = useTransform(x, [-150, 150], [-15, 15]);

  const handleDragEnd = async (event: MouseEvent | TouchEvent | PointerEvent, info: { offset: { x: number } }) => {
    if (info.offset.x > 100) {
      await controls.start({ x: 1000, opacity: 0, transition: { duration: 0.1 } });
      onAccept(cardData);
    } else if (info.offset.x < -100) {
      await controls.start({ x: -1000, opacity: 0, transition: { duration: 0.1 } });
      onReject();
    } else {
      controls.start({ x: 0, rotate: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 30 } });
    }
  };

  return (
    <motion.div
      className="absolute flex h-[48rem] w-[36rem] flex-col justify-between overflow-hidden rounded-2xl p-6 shadow-2xl hover:cursor-grab active:cursor-grabbing"
      style={{
        x,
        rotate,
        opacity,
        backgroundColor: colorWay.card,
        color: colorWay.text,
        zIndex: isFront ? 2 : 1,
        pointerEvents: isFront ? "auto" : "none",
      }}
      animate={{
        scale: isFront ? 1 : 0.95,
        y: isFront ? 0 : -40,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      drag={isFront ? "x" : false}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      onDragEnd={handleDragEnd}
    >
      <motion.div
        className="absolute left-10 top-10 z-10 rounded-2xl border-8 border-green-500 px-10 py-4"
        style={{ opacity: acceptOpacity, rotate: badgeRotate }}
      >
        <h3 className="text-5xl font-bold uppercase text-green-500">Accept</h3>
      </motion.div>
      <motion.div
        className="absolute right-10 top-10 z-10 rounded-2xl border-8 border-red-500 px-10 py-4"
        style={{ opacity: rejectOpacity, rotate: badgeRotate }}
      >
        <h3 className="text-s5xl font-bold uppercase text-red-500">Reject</h3>
      </motion.div>

      <div className="relative z-0">
        <h2
          className="mb-4 text-center text-7xl font-bold"
          style={{ color: colorWay.titleColor }}
        >
          {title}
        </h2>
        <p className="text-center text-3xl font-light">{summary}</p>
      </div>

      <div className="relative z-0 flex flex-wrap items-center justify-center gap-2">
        <h3 className="mb-4 w-full text-center text-4xl font-semibold">
          Tracks
        </h3>
        {tracks.map((track) => (
          <span
            key={track}
            className="flex items-center justify-center rounded-full px-8 py-3 text-2xl font-medium"
            style={{
              backgroundColor:
                colorWay.text === "#ffffff"
                  ? "rgba(255, 255, 255, 0.2)"
                  : "rgba(0, 0, 0, 0.15)",
            }}
          >
            {track}
          </span>
        ))}
      </div>
    </motion.div>
  );
};
