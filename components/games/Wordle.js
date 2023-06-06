"use client";
import React, {
  createContext,
  useState,
  useEffect,
  useRef
} from "react";
import Board from "./comps/wordle/Board";
import Keyboard from "./comps/wordle/Keyboard";
import { boardDefault, generateWordSet2 } from "./comps/wordle/Words";

export const WordleContext = createContext();

const Wordle = () => {
  const setTimeoutRef = useRef();
  const [modalName, setModalName] = useState("none");
  const [board, setBoard] = useState(boardDefault);
  const [currAttempt, setCurrAttempt] = useState({
    attempt: 0,
    letter: 0
  });
  const [wordSet, setWordSet] = useState(new Set());
  const [correctWord, setCorrectWord] = useState("");
  const [disabledLetters, setDisabledLetters] = useState([]);
  const [gameOver, setGameOver] = useState({
    gameOver: false,
    guessedWord: false
  });

  useEffect(() => {
    generateWordSet2().then(words => {
      setWordSet(words.wordSet);
      setCorrectWord(words.todaysWord);
    });
  }, []);

  const onEnter = () => {
    if (currAttempt.letter !== 5) return;

    let currWord = "";
    for (let i = 0; i < 5; i++) {
      currWord += board[currAttempt.attempt][i];
    }
    if (wordSet.has(currWord.toLowerCase())) {
      setCurrAttempt({ attempt: currAttempt.attempt + 1, letter: 0 });
    } else {
      alert("Word not found");
    }

    if (currWord.toLowerCase() === correctWord.toLowerCase()) {
      setGameOver({ gameOver: true, guessedWord: true });
      return;
    }
    if (currAttempt.attempt === 5) {
      setGameOver({ gameOver: true, guessedWord: false });
      return;
    }
  };

  const onDelete = () => {
    if (currAttempt.letter === 0) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letter - 1] = "";
    setBoard(newBoard);
    setCurrAttempt({
      ...currAttempt,
      letter: currAttempt.letter - 1
    });
  };

  const onSelectLetter = key => {
    if (currAttempt.letter > 4) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letter] = key;
    setBoard(newBoard);
    setCurrAttempt({
      attempt: currAttempt.attempt,
      letter: currAttempt.letter + 1
    });
  };

  const handleReset = () => {
    setModalName("none");
    setBoard([
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""]
    ]);
    setCurrAttempt({ attempt: 0, letter: 0 });
    setWordSet(new Set());
    setDisabledLetters([]);
    setGameOver({ gameOver: false, guessedWord: false });
    generateWordSet2().then(words => {
      setWordSet(words.wordSet);
      setCorrectWord(words.todaysWord);
    });
  };

  useEffect(() => {
    if (!gameOver.gameOver) return;

    setTimeoutRef.current = setTimeout(() => {
      setModalName("close");
    }, 1000);
    () => clearTimeout(setTimeoutRef.current);
  }, [gameOver.gameOver]);
  return (
    <>
      <div className="h-screen w-full overflow-hidden">
        <div className="relative mx-auto flex h-full max-w-xl flex-col items-center justify-between">
          <div className="w-full px-10">
            <div className="flex w-full justify-between border-b pb-1 pt-5">
              <svg
                onClick={() => setModalName("tip")}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6 cursor-pointer">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                />
              </svg>

              <h1 className="text-2xl font-black">Wordle</h1>
              <svg
                onClick={() => setModalName("credits")}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6 cursor-pointer">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
                />
              </svg>
            </div>
          </div>
          <WordleContext.Provider
            value={{
              board,
              setBoard,
              currAttempt,
              setCurrAttempt,
              correctWord,
              onSelectLetter,
              onDelete,
              onEnter,
              setDisabledLetters,
              disabledLetters,
              handleReset,
              gameOver
            }}>
            <Board />
            <Keyboard />
          </WordleContext.Provider>
          {modalName === "close" && (
            <div className="bg-_dark/[.8] fixed flex h-full w-full items-center justify-center px-5">
              <div className="h-64 w-96 rounded-md border border-gray-500">
                <div className="flex h-full flex-col items-center justify-center">
                  <h3 className="text-center text-xl font-bold">
                    {gameOver.guessedWord
                      ? "You Correctly Guessed the Wordle"
                      : "You Failed to Guess the Word"}
                  </h3>
                  {gameOver.guessedWord && (
                    <h3 className="text-center text-xl font-semibold">
                      You guessed in {currAttempt.attempt} attempts
                    </h3>
                  )}
                  <h2 className="text-center text-2xl font-semibold">
                    Correct Word:
                    <hr />
                    <span className="text-_blue text-3xl uppercase">
                      {correctWord}
                    </span>
                  </h2>
                  <button
                    className="text-_dark mt-2 border bg-white p-1 text-center"
                    onClick={handleReset}>
                    Reset
                  </button>
                </div>
              </div>
            </div>
          )}
          {modalName === "tip" && (
            <div className="dark:bg-_bg_dark absolute top-0 h-full w-full bg-white px-5">
              <svg
                onClick={() => setModalName("none")}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="3"
                stroke="currentColor"
                className="absolute right-2 top-5 h-6 w-6 cursor-pointer">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              <h3 className="py-5 text-center font-bold">
                HOW TO PLAY
              </h3>
              <p className="py-1 text-xs">
                You have six tries to guess a five letter word.
              </p>
              <p className="py-1 text-xs">
                Each guess must be a valid five letter word should at
                least be a word. Once you select all of the letters,
                hit the submit button to confirm your guess.
              </p>
              <p className="py-1 text-xs">
                After each guess, the tiles will change colors to
                indicate how close you are to solving the word.
              </p>
              <p className="py-1 text-xs">
                Letters you guessed will be listed in the hints
                section. The numbers next to each letter denotes how
                many of them are within the six letter word. Use them
                to help you in your guesses.
              </p>
              <h4 className="font-semibold">Examples</h4>
              <div className="flex items-center">
                <div className="bg-_w_bg m-px flex h-10 w-10 items-center justify-center border border-slate-600 font-sans text-3xl font-bold">
                  F
                </div>
                <div className="bg-_w_bg m-px flex h-10 w-10 items-center justify-center border border-slate-600 font-sans text-3xl font-bold">
                  R
                </div>
                <div className="m-px flex h-10 w-10 items-center justify-center border border-slate-600 bg-green-400 font-sans text-3xl font-bold text-white">
                  U
                </div>
                <div className="bg-_w_bg m-px flex h-10 w-10 items-center justify-center border border-slate-600 font-sans text-3xl font-bold">
                  I
                </div>
                <div className="bg-_w_bg m-px flex h-10 w-10 items-center justify-center border border-slate-600 font-sans text-3xl font-bold">
                  T
                </div>
                <span className="ml-2 text-xs">
                  The letter U is in the word and in the correct spot.
                </span>
              </div>
              <div className="flex  items-center">
                <div className="bg-_w_bg m-px flex h-10 w-10 items-center justify-center border border-slate-600 font-sans text-3xl font-bold">
                  T
                </div>
                <div className="bg-_w_bg m-px flex h-10 w-10 items-center justify-center border border-slate-600 font-sans text-3xl font-bold">
                  O
                </div>
                <div className="bg-_w_bg m-px flex h-10 w-10 items-center justify-center border border-slate-600 font-sans text-3xl font-bold">
                  T
                </div>
                <div className="m-px flex h-10 w-10 items-center justify-center border border-slate-600 bg-orange-400 font-sans text-3xl font-bold text-white">
                  A
                </div>
                <div className="bg-_w_bg m-px flex h-10 w-10 items-center justify-center border border-slate-600 font-sans text-3xl font-bold">
                  L
                </div>
                <span className="ml-2 text-xs">
                  The letter A is in the word but in the wrong spot.
                </span>
              </div>
              <div className="flex items-center">
                <div className="bg-_w_bg m-px flex h-10 w-10 items-center justify-center border border-slate-600 font-sans text-3xl font-bold">
                  T
                </div>
                <div className="bg-_w_bg m-px flex h-10 w-10 items-center justify-center border border-slate-600 font-sans text-3xl font-bold">
                  U
                </div>
                <div className="bg-_w_bg m-px flex h-10 w-10 items-center justify-center border border-slate-600 font-sans text-3xl font-bold">
                  R
                </div>
                <div className="bg-_w_bg m-px flex h-10 w-10 items-center justify-center border border-slate-600 font-sans text-3xl font-bold">
                  B
                </div>
                <div className="m-px flex h-10 w-10 items-center justify-center border border-slate-600 bg-gray-600 font-sans text-3xl font-bold text-white">
                  O
                </div>
                <span className="ml-2 text-xs">
                  The letter O is not in the word in any spot.
                </span>
              </div>
            </div>
          )}
          {modalName === "credits" && (
            <div className="dark:bg-_bg_dark absolute top-0 h-full w-full bg-white px-5">
              <svg
                onClick={() => setModalName("none")}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="3"
                stroke="currentColor"
                className="absolute right-2 top-5 h-6 w-6 cursor-pointer">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              <h3 className="py-5 text-center font-bold">CREDITS</h3>
              <p className="py-1 text-xs">
                Inspired by{" "}
                <span className="text-blue-600 underline">
                  Josh Wardle&apos;s game
                </span>
                , Wordle
              </p>

              <p className="py-1 text-xs">
                Wordle is a popular word guessing game that has gained
                widespread popularity in recent years. In this game,
                players must guess a{" "}
                <span className="underline">five-letter word</span>{" "}
                chosen by the game&apos;s algorithm in as few attempts
                as possible.
              </p>
              <p className="py-1 text-xs">
                Each guess is marked with a color-coded system,
                indicating which letters are correct and in the
                correct position &#40;
                <span className="text-green-500">green</span>&#41;,
                which letters are correct but in the wrong position
                &#40;
                <span className="text-orange-500">orange</span>&#41;,
                and which letters are incorrect &#40;
                <span className="text-gray-500">gray</span>&#41;.
              </p>
              <p className="py-1 text-xs">
                The game requires players to think critically and use
                their vocabulary skills to deduce the hidden word. It
                is a fun and addictive game that can be played alone
                or with friends, and it is a great way to exercise the
                mind while having fun.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Wordle;
