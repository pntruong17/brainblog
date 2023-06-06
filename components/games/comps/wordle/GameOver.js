import React, { useContext } from "react";
import { WordleContext } from "@/games/Wordle";

function GameOver() {
  const {
    board,
    setBoard,
    currAttempt,
    gameOver,
    onSelectLetter,
    correctWord,
    onDelete,
    handleReset,
  } = useContext(WordleContext);
  return (
    <div className="flex flex-col">
      <h3 className="font-bold text-center text-xl">
        {gameOver.guessedWord
          ? "You Correctly Guessed the Wordle"
          : "You Failed to Guess the Word"}
      </h3>
      {gameOver.guessedWord && (
        <h3 className="font-bold text-center text-xl">
          You guessed in {currAttempt.attempt} attempts
        </h3>
      )}
      <h2 className="font-bold text-center text-3xl">
        Correct Word:{" "}
        <span className="uppercase text-_blue">{correctWord}</span>
      </h2>
      <button
        className="text-center text-_dark border bg-white mb-14"
        onClick={handleReset}
      >
        Reset
      </button>
    </div>
  );
}

export default GameOver;
