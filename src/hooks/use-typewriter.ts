import { useEffect, useState } from "react";

interface TypewriterOptions {
  /** When false, the first word is returned as static text and no timers run. */
  enabled?: boolean;
  typeMs?: number;
  deleteMs?: number;
  /** How long a fully typed word stays before it is deleted. */
  holdMs?: number;
  /** Pause on the empty string before the next word starts. */
  pauseMs?: number;
}

/**
 * Types each word, holds it, deletes it, then moves to the next, looping.
 * Pass a stable (module-level) `words` array.
 */
export function useTypewriter(
  words: readonly string[],
  { enabled = true, typeMs = 75, deleteMs = 40, holdMs = 1800, pauseMs = 350 }: TypewriterOptions = {},
) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    const word = words[index];
    let timer: number;

    if (!deleting && text === word) {
      timer = window.setTimeout(() => setDeleting(true), holdMs);
    } else if (deleting && text === "") {
      timer = window.setTimeout(() => {
        setDeleting(false);
        setIndex((i) => (i + 1) % words.length);
      }, pauseMs);
    } else {
      timer = window.setTimeout(
        () => setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1)),
        deleting ? deleteMs : typeMs,
      );
    }

    return () => window.clearTimeout(timer);
  }, [enabled, words, index, text, deleting, typeMs, deleteMs, holdMs, pauseMs]);

  if (!enabled) return { text: words[0], index: 0 };
  return { text, index };
}
