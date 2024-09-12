"use client";
import { useConfettiStore } from "@/hooks/use-confetti-store";
import ReactConfetti from "react-confetti";

export function ConfettiProvider() {
  const confetti = useConfettiStore();

  if (!confetti.isOpen) return null;

  return (
    <ReactConfetti
      className="pointer-events-none z-[100]"
      numberOfPieces={600}
      initialVelocityY={-12}
      recycle={false}
      onConfettiComplete={confetti.onClose}
    />
  );
}
