"use client";

import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useTransform, useAnimation } from "framer-motion";
import { useRouter } from "next/navigation";

// 1. Updated ColorWay interface
interface ColorWay {
  card: string;
  text: string;
  titleColor: string; // Added title color
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

interface CardData {
  id: number;
  title: string;
  summary: string;
  tracks: string[];
}

const SwipeCards: React.FC<{ initialCards: CardData[] }> = ({ initialCards }) => {
  const [cards, setCards] = useState<CardData[]>(initialCards);
  const router = useRouter();

  // Update cards state when initialCards prop changes
  useEffect(() => {
    setCards(initialCards);
  }, [initialCards]);

  const removeCard = () => {
    setCards((prev) => prev.slice(0, prev.length - 1));
  };

  const handleAccept = (cardData: CardData) => {
    removeCard();
    // Redirect to chatbot with card data
    router.push(`/chatbot?title=${encodeURIComponent(cardData.title)}&summary=${encodeURIComponent(cardData.summary)}`);
  };

  const handleReject = () => {
    removeCard();
  };

  const handleReset = () => {
    setCards([]); // Reset to initial cards
  };

  return (
    <div
      className="grid h-screen w-full place-items-center bg-orange-100"
    //   -gradient-to-tr from-orange-200 to-orange-100
      style={{
        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 32 32' width='32' height='32' fill='none'
          stroke-width='2' stroke='%23d4d4d4'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`,
      }}
    >
      {cards.length > 0 ? (
        cards.map((card, index) => {
          const colorWay = COLOR_WAYS[card.id % COLOR_WAYS.length];
          return (
            <Card
              key={card.id}
              cardData={card}
              colorWay={colorWay}
              isFront={index === cards.length - 1}
              onAccept={handleAccept}
              onReject={handleReject}
            />
          );
        })
      ) : (
        // ... (empty state)
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
      // Card accepted
      await controls.start({ x: 1000, opacity: 0, transition: { duration: 0.1 } }); // Animate off-screen quickly
      onAccept(cardData); // Then call onAccept which removes the card and redirects
    } else if (info.offset.x < -100) {
      // Card rejected
      await controls.start({ x: -1000, opacity: 0, transition: { duration: 0.1 } }); // Animate off-screen quickly
      onReject(); // Then call onReject which removes the card
    } else {
      // Card not swiped far enough, snap back to center
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
        color: colorWay.text, // This is the default text color
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

export default SwipeCards;
