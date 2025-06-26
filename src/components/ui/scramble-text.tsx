import React, {useState, useEffect, useRef} from "react";
import {cn} from "src/utils/cn";

interface TextScrambleProps {
  text: string;
  onComplete?: () => void;
  scrambleDuration?: number;
  restoreSpeed?: number;
  className?: string;
}

export const TextScramble: React.FC<TextScrambleProps> = ({
  text,
  onComplete,
  scrambleDuration = 1000,
  restoreSpeed = 100,
  className = "",
}) => {
  const [displayText, setDisplayText] = useState<string>(text);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const intervalRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);

  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

  const getRandomChar = (): string => {
    return chars[Math.floor(Math.random() * chars.length)];
  };

  const generateRandomString = (length: number): string => {
    return Array.from({length}, () => getRandomChar()).join("");
  };

  const startScramble = (): void => {
    if (isAnimating) return;
    setIsAnimating(true);

    const scrambleStart = Date.now();

    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - scrambleStart;

      if (elapsed < scrambleDuration) {
        setDisplayText(generateRandomString(text.length));
      } else {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        restoreText();
      }
    }, 80);
  };

  const restoreText = (): void => {
    let charIndex = 0;

    intervalRef.current = setInterval(() => {
      let result = "";

      for (let i = 0; i < text.length; i++) {
        if (i <= charIndex) {
          result += text[i];
        } else {
          result += getRandomChar();
        }
      }

      setDisplayText(result);
      charIndex++;

      if (charIndex >= text.length) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        setIsAnimating(false);
        onComplete?.();
      }
    }, restoreSpeed);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (text) {
      setDisplayText(text);

      timeoutRef.current = setTimeout(() => {
        startScramble();
      }, 20);
    }
  }, [text]);

  return (
    <span className={cn("text-scramble", className)}>
      <span className={cn("inline-block", isAnimating ? "animate-pulse" : "")}>
        {displayText}
      </span>
    </span>
  );
};
