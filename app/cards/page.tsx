"use client";

import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useTransform, useAnimation } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { CardData } from "@/app/exportType/types";

// 1. Updated ColorWay interface
interface ColorWay {
  card: string;
  text: string;
  titleColor: string;
}

// 2. Updated COLOR_WAYS array
const COLOR_WAYS: ColorWay[] = [
  { card: "#FEEEDF", text: "#173C46", titleColor: "#173C46" },
  { card: "#FEEEDF", text: "#EA627F", titleColor: "#173C46" }, // Example: Title is dark, text is pink
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
    const conceptMatch = block.match(/\*\*Concept:\*\*\s*(.*)/s);

    // Simple track parsing: find all bolded text that isn't a main header
    const tracksMatch = block.matchAll(/\*\*(?!Concept|Relevance|Core|Team|Bonus)(.*?):\*\*/g);
    const tracks = [...tracksMatch].map(match => match[1].trim());

    ideas.push({
      id: index + 1,
      title: titleMatch ? titleMatch[1].trim() : `Idea ${index + 1}`,
      summary: conceptMatch ? conceptMatch[1].trim() : "No concept provided.",
      tracks: tracks.length > 0 ? tracks : ["General"], // Fallback
    });
  });
  return ideas;
};

export default function CardsPage() {
  const [cards, setCards] = useState<CardData[]>([]);
  const [initialCards, setInitialCards] = useState<CardData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();

  const projectId = searchParams.get('projectId');
  const projectTitle = searchParams.get('projectTitle');
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // **** MODIFIED THIS SECTION ****
    // Get the AI response from the form page
    const aiResponse = localStorage.getItem('temp_aiResponse');
    if (aiResponse) {
      localStorage.removeItem('temp_aiResponse'); // Clean up
      const parsedCards = parseAiResponse(aiResponse);
      setCards(parsedCards.reverse());
      setInitialCards(parsedCards.reverse()); // Save for reset
    } else {
      // Handle case where user lands here directly
      // Maybe redirect or show an error
      console.warn("No AI response found. Using hardcoded cards as fallback.");
      const hardcodedCards: CardData[] = [
        { id: 1, title: "AI Project Idea 1", summary: "A cool project...", tracks: ["AI", "Web"] },
        { id: 2, title: "AI Project Idea 2", summary: "Another cool project...", tracks: ["Mobile", "Game"] },
      ];
      setCards(hardcodedCards.reverse());
      setInitialCards(hardcodedCards.reverse());
    }
    setIsLoading(false);
  }, []); // Runs once on load
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
    // Redirect to chatbot with card data
    router.push(`/chatbot?projectId=${encodeURIComponent(projectId)}&projectTitle=${encodeURIComponent(projectTitle)}&cardTitle=${encodeURIComponent(cardData.title)}&cardSummary=${encodeURIComponent(cardData.summary)}`);
  };

  const handleReject = () => {
    removeCard();
  };

  // **** FIXED THIS FUNCTION ****
  const handleReset = () => {
    // This now resets the deck to the initial set of cards
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

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-250, 250], [-25, 25]);
  const opacity = useTransform(
    x,
    [-250, -100, 0, 100, 250],
    [0, 1, 1, 1, 0],
  );
  const controls = useAnimation();

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
      className="absolute flex h-[56rem] w-[42rem] flex-col justify-between overflow-hidden rounded-2xl p-6 shadow-2xl hover:cursor-grab active:cursor-grabbing"
      style={{
        x,
        rotate,
        opacity,
        backgroundColor: colorWay.card,
        color: colorWay.text,
        zIndex: isFront ? 2 : 1,
        pointerEvents: isFront ? "auto" : "none",
      }}
      animate={controls}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      drag={isFront ? "x" : false}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      onDragEnd={handleDragEnd}
    >
      {/* Accept/Reject Badges */}
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
        <h3 className="text-5xl font-bold uppercase text-red-500">Reject</h3>
      </motion.div>

      {/* Card Content */}
      <div className="relative z-0">
        {/* 3. Applied the specific titleColor here */}
        <h2
          className="mb-4 text-center text-3xl font-bold"
          style={{ color: colorWay.titleColor }}
        >
          {title}
        </h2>
        {/* This summary <p> will inherit colorWay.text from the parent */}
        <p className="text-center text-xl font-light">{summary}</p>
      </div>

      <div className="relative z-0 flex flex-wrap items-center justify-center gap-2">
        {tracks.slice(0, 2).map((track, index) => (
          <span
            key={track}
            className="flex items-center justify-center rounded-full px-8 py-3 text-sm font-medium"
            style={{
              // This logic now correctly contrasts with the main text color
              backgroundColor:
                colorWay.text === "#ffffff"
                  ? "rgba(255, 255, 255, 0.2)"
                  : "rgba(0, 0, 0, 0.15)",
            }}
          >
            {track}
            {index === 0 && tracks.length > 1 && ", "}
          </span>
        ))}
      </div>
    </motion.div>
  );

};