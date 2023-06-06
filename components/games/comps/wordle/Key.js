"use client";
import React, { useContext } from "react";
import { WordleContext } from "../../Wordle";

function Key({ keyVal, bigKey, disabled }) {
  const { gameOver, onSelectLetter, onDelete, onEnter } =
    useContext(WordleContext);

  const selectLetter = () => {
    if (gameOver.gameOver) return;
    if (keyVal === "ENTER") {
      onEnter();
    } else if (keyVal === "DELETE") {
      onDelete();
    } else {
      onSelectLetter(keyVal);
    }
  };
  return (
    <div
      className={`m-px cursor-pointer rounded-md bg-gray-500 p-3 text-sm font-semibold md:p-5`}
      id={bigKey ? "big" : disabled && "disabled"}
      onClick={selectLetter}>
      {keyVal}
    </div>
  );
}

export default Key;
