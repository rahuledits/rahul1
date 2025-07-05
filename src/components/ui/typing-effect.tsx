import React, { useState, useEffect } from 'react';

interface TypingEffectProps {
  words: string[];
  speed?: number;
  className?: string;
}

export function TypingEffect({ words, speed = 100, className = '' }: TypingEffectProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const word = words[currentWordIndex];
    const shouldDelete = isDeleting;
    const shouldMoveToNext = !shouldDelete && currentText === word;
    const shouldStartDeleting = shouldMoveToNext;
    const shouldMoveToNextWord = shouldDelete && currentText === '';

    const timeout = setTimeout(() => {
      if (shouldStartDeleting) {
        setIsDeleting(true);
      } else if (shouldMoveToNextWord) {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
      } else {
        setCurrentText(
          shouldDelete
            ? word.substring(0, currentText.length - 1)
            : word.substring(0, currentText.length + 1)
        );
      }
    }, shouldDelete ? speed / 2 : speed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentWordIndex, words, speed]);

  return (
    <span className={`${className} border-r-2 border-orange-500 animate-pulse drop-shadow-[0_0_10px_rgba(251,146,60,0.5)]`}>
      {currentText}
    </span>
  );
} 