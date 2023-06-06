"use client";

import React, { useCallback, useEffect, useContext } from "react";
import Key from "./Key";
import { WordleContext } from "../../Wordle";

function Keyboard() {
  const keys1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const keys2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const keys3 = ["Z", "X", "C", "V", "B", "N", "M"];

  const {
    board,
    disabledLetters,
    currAttempt,
    gameOver,
    onSelectLetter,
    onEnter,
    onDelete
  } = useContext(WordleContext);

  const handleKeyboard = useCallback(
    event => {
      if (gameOver.gameOver) return;
      if (event.key === "Enter") {
        onEnter();
      } else if (event.key === "Backspace") {
        onDelete();
      } else {
        keys1.forEach(key => {
          if (event.key.toLowerCase() === key.toLowerCase()) {
            onSelectLetter(key);
          }
        });
        keys2.forEach(key => {
          if (event.key.toLowerCase() === key.toLowerCase()) {
            onSelectLetter(key);
          }
        });
        keys3.forEach(key => {
          if (event.key.toLowerCase() === key.toLowerCase()) {
            onSelectLetter(key);
          }
        });
      }
    },
    [currAttempt]
  );
  useEffect(() => {
    document.addEventListener("keydown", handleKeyboard);

    return () => {
      document.removeEventListener("keydown", handleKeyboard);
    };
  }, [handleKeyboard]);

  return (
    <div
      className="mb-6 flex flex-col items-center"
      onKeyDown={handleKeyboard}>
      <div className="flex">
        {keys1.map((key, i) => {
          return (
            <Key
              key={i}
              keyVal={key}
              disabled={disabledLetters.includes(key)}
            />
          );
        })}
      </div>
      <div className="flex">
        {keys2.map((key, i) => {
          return (
            <Key
              key={i}
              keyVal={key}
              disabled={disabledLetters.includes(key)}
            />
          );
        })}
      </div>
      <div className="flex">
        <Key keyVal={"ENTER"} bigKey />
        {keys3.map((key, i) => {
          return (
            <Key
              key={i}
              keyVal={key}
              disabled={disabledLetters.includes(key)}
            />
          );
        })}
        <Key keyVal={"DELETE"} bigKey />
      </div>
    </div>
  );
}

export default Keyboard;
