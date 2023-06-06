"use client";
import React, { useContext, useEffect } from "react";
import { WordleContext } from "../../Wordle";

function Letter({ letterPos, attemptVal }) {
  const { board, setDisabledLetters, currAttempt, correctWord } =
    useContext(WordleContext);
  const letter = board[attemptVal][letterPos];
  const correct = correctWord.toUpperCase()[letterPos] === letter;
  const almost =
    !correct &&
    letter !== "" &&
    correctWord.toUpperCase().includes(letter);
  const letterState =
    currAttempt.attempt > attemptVal &&
    (correct ? "correct" : almost ? "almost" : "error");

  useEffect(() => {
    if (letter !== "" && !correct && !almost) {
      setDisabledLetters(prev => [...prev, letter]);
    }
  }, [currAttempt.attempt]);
  return (
    <div
      className="m-px flex h-14 w-14 items-center justify-center border border-slate-600 font-sans text-3xl font-bold"
      id={letterState}>
      {letter}
    </div>
  );
}

export default Letter;
