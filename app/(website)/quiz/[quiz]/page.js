"use client";
import React, { useEffect, useReducer, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import AnswerButton from "@/lib/trivia/AnswerButton";
import TriviaCard from "@/lib/trivia/TriviaCard";
import TimeBonus from "@/lib/trivia/TimeBonus";
import {
  setCookies,
  getCookies,
  checkCookies
} from "@/components/appcomp/cookie";
import ScoreBoard from "@/components/appcomp/subcomponents/ScoreBoard";
//import { useRouter } from "next/router";
import {
  getQuizNotInSlug,
  getQuizBySlug
} from "@/lib/trivia/triviaData";

export default function Trivia({ params }) {
  const triviBySlug = getQuizBySlug(params.quiz);
  const triviNotThisQuiz = getQuizNotInSlug(params.quiz);
  //scoreboard
  const TIMER = 12;
  const STATES = [
    "start",
    "timego",
    "timeout",
    "answered",
    "showingScore"
  ];
  const CLASS = [
    { title: "Reincarnate", points: 0 },
    { title: "Preschool", points: 2000 },
    { title: "Elementary School", points: 8000 },
    { title: "Middle School", points: 16000 },
    { title: "High School", points: 32000 },
    { title: "Bachelor's Degree", points: 64000 },
    { title: "Master's Degree", points: 120000 },
    { title: "Doctorate Degree", points: 240000 },
    { title: "Professor", points: 500000 },
    { title: "God", points: 1000000 }
  ];

  const [pointCookies, setPointCookies] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isActiveTime, setIsActiveTime] = useState(false);
  const [runAnimation, setRunAnimation] = useState(false); //timer

  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [questionLeft, setQuestionLeft] = useState(
    triviBySlug.questions.length
  );
  const [trivia, setTrivia] = useState(triviBySlug);
  const [thisQuestion, setThisQuestion] = useState(undefined);
  const [state, setState] = useState(STATES[0]);
  const [correct, setCorrect] = useState(0);
  const [rightWrong, setRightWrong] = useState(undefined);
  const [showCorrect, setShowCorrect] = useState(false);
  const [visibleTimeBonus, setVisibleTimeBonus] = useState(false);
  const [levelPlayer, setLevelPlayer] = useState({
    title: "",
    nextTitle: "",
    percent: undefined,
    xpNeeded: undefined
  });
  const [chart, setChart] = useState(15);
  // chart
  const radius = 65;
  const strokeWidth = 18;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - levelPlayer.percent * circumference;
  //userReducer
  const initGameScore = {
    winstreak: 0,
    combo: 0,
    timeBonus: 0,
    timeBonusStack: 0,
    point: 0
  };
  const gameReducer = (state, action) => {
    switch (action.type) {
      case "timeout":
        return {
          ...state,
          winstreak: 0,
          combo: 0,
          timeBonus: 0
        };
      case "rightclick":
        const _timeBonus = (TIMER - seconds) * 10;
        const _stackBonus = (state.combo + 1) * 12;

        return {
          ...state,
          winstreak: state.winstreak + _stackBonus,
          combo: state.combo + 1,
          timeBonus: _timeBonus,
          timeBonusStack: state.timeBonusStack + _timeBonus,
          point: correct * 100
        };
      case "wrongclick":
        return {
          ...state,
          combo: 0,
          timeBonus: 0
        };
      case "reset":
        return {
          ...state,
          winstreak: 0,
          combo: 0,
          timeBonus: 0,
          timeBonusStack: 0,
          point: 0
        };
      default:
        return state;
    }
  };
  const [gameScore, dispatchGameScore] = useReducer(
    gameReducer,
    initGameScore
  );
  // end of reducer function

  //const navigate = useRouter();

  const calculateLevelPlayer = () => {
    const _findIndex = CLASS.findIndex(
      item => item.points > pointCookies
    );

    if (_findIndex >= 0) {
      const rangePoints =
        CLASS[_findIndex].points - CLASS[_findIndex - 1].points;
      const nextPoint = pointCookies - CLASS[_findIndex - 1].points;
      const percentage = nextPoint / rangePoints;

      setLevelPlayer({
        ...levelPlayer,
        title: CLASS[_findIndex - 1].title,
        nextTitle: CLASS[_findIndex].title,
        percent: percentage,
        xpNeeded: CLASS[_findIndex].points - pointCookies
      });
    } else {
      setLevelPlayer({
        ...levelPlayer,
        title: "God",
        nextTitle: "God",
        percent: 1,
        xpNeeded: 0
      });
    }
  };

  const handleOnLoadingComplete = () => {
    if (state === STATES[1]) {
      handleStart();
      setRunAnimation(true);
    }
  };

  //cookies data
  useEffect(() => {
    const hasCookie = checkCookies("_USER_COOKIES_TRIVIA_LVL");
    if (hasCookie) {
      setPointCookies(getCookies("_USER_COOKIES_TRIVIA_LVL"));
    } else {
      setPointCookies(0);
      setCookies("_USER_COOKIES_TRIVIA_LVL", 0);
    }
  }, []);
  useEffect(() => {
    const newPoints =
      Number(pointCookies) +
      Number(gameScore.winstreak) +
      Number(gameScore.timeBonusStack) +
      Number(gameScore.point);

    if (state === STATES[4]) {
      setCookies("_USER_COOKIES_TRIVIA_LVL", newPoints);
      setPointCookies(newPoints);
    }
  }, [state]);

  useEffect(() => {
    calculateLevelPlayer();
  }, [pointCookies]);

  // end cookies data

  const resetFrame = () => {
    dispatchGameScore({ type: "reset" });
    setVisibleTimeBonus(false);
    setSeconds(0);
    setCurrentQuiz(0);
    setQuestionLeft(triviBySlug.questions.length);
    setState(STATES[0]);
    setCorrect(0);
    setShowCorrect(false);
  };

  const checkAnswer = userAnswer => {
    setState(STATES[3]);

    if (userAnswer) {
      setRightWrong(true);
      dispatchGameScore({ type: "rightclick" });
      setCorrect(prev => prev + 1);
    } else {
      setRightWrong(false);
      dispatchGameScore({ type: "wrongclick" });
    }
    setShowCorrect(true);
  };

  const handleNext = () => {
    setSeconds(0);
    setState(STATES[1]);
    setShowCorrect(false);
    setQuestionLeft(prev => prev - 1);
    setCurrentQuiz(prev => prev + 1);
  };

  const handleStart = () => {
    setIsActiveTime(true);
  };

  const handlePause = () => {
    setIsActiveTime(false);
  };

  const handleReset = () => {
    setSeconds(0);
    setIsActiveTime(false);
  };

  useEffect(() => {
    if (state === STATES[4]) {
      //handleKillTimer();
    }
    if (state === STATES[3]) {
      handlePause();
      setRunAnimation(false);
    }
    if (state === STATES[2]) {
      dispatchGameScore({ type: "timeout" });
      setShowCorrect(true);
      setRunAnimation(false);
      setSeconds(0);
      handlePause();
    }
  }, [state]);

  useEffect(() => {
    //console.log("combo", gameScore.combo);
    //console.log("winstreak", gameScore.winstreak);
    //console.log("timeBonus", gameScore.timeBonus);
    //console.log("timeBonusStack", gameScore.timeBonusStack);
    //console.log("correct", correct);
    //console.log(thisQuestion.img1);
    //console.log("pointCookies", pointCookies);
    //console.log("levelPlayer", levelPlayer);
    //onsole.log(user.uid);
  }, [correct, gameScore, pointCookies, levelPlayer, thisQuestion]);

  useEffect(() => {
    let interval = null;
    if (seconds >= TIMER) {
      setState(STATES[2]);
    }
    if (isActiveTime) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
    } else if (!isActiveTime && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActiveTime, seconds, state]);

  useEffect(() => {
    const quiz = trivia.questions[currentQuiz];
    setThisQuestion(quiz);
    if (currentQuiz > triviBySlug.questions.length) {
      setState(STATES[4]);
    }
    //console.log(thisQuestion);
  }, [thisQuestion, currentQuiz]);

  //reset state for other quiz
  useEffect(() => {
    setTrivia(triviBySlug);
    resetFrame();
    //console.log(triviBySlug);
  }, [triviBySlug]);
  return (
    <>
      <div className="font-Nunito w-full py-8 md:py-12">
        <h2 className="text-_contrast_bg font-Nunito hidden text-center text-4xl font-black underline sm:mb-8 sm:block">
          {triviBySlug.title}
        </h2>
        <div className="mx-auto min-h-screen max-w-[680px] px-3 shadow-sm">
          {thisQuestion && state !== STATES[4] && (
            <div className="relative flex h-[600px] w-full flex-col justify-between overflow-hidden rounded-xl">
              <div className="flex w-full items-center justify-between bg-teal-700 p-3">
                <div className="hidden h-16 w-20 overflow-hidden rounded-lg sm:block">
                  <img
                    className="object-cover object-center "
                    src={`${triviBySlug.image}`}
                  />
                </div>
                <div className="flex">
                  <div className="mx-1 flex flex-col items-center">
                    <div className="flex h-10 w-10  items-center justify-center rounded-lg bg-teal-800">
                      <h2 className="text-center text-2xl font-black text-white">
                        {correct}
                      </h2>
                    </div>
                    <h3 className="text-xs font-bold text-white">
                      Correct
                    </h3>
                  </div>
                  <div className="mx-1 flex flex-col items-center">
                    <div className="flex h-10 w-10  items-center justify-center rounded-lg bg-teal-800">
                      <h2 className="text-center text-2xl font-black text-white">
                        {gameScore.combo}
                      </h2>
                    </div>
                    <h3 className="text-center text-xs font-bold text-white">
                      Combo
                    </h3>
                  </div>
                </div>
                <div>
                  <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md">
                    <div className="absolute top-[20px] h-2 w-2 transform rounded-full bg-teal-800"></div>
                    <div
                      className={`absolute top-[4px] h-5 w-1 origin-bottom transform rounded-full bg-teal-800 ${
                        runAnimation ? "animate-rotation" : ""
                      }  `}></div>
                    <h3 className="text-_w_almost pt-[65px] text-center text-xs font-black">
                      TIMER
                    </h3>
                    <TimeBonus
                      visible={visibleTimeBonus}
                      setVisible={setVisibleTimeBonus}
                      timeBonus={gameScore.timeBonus}
                      correct={correct}
                    />
                  </div>
                </div>
              </div>
              <div className="relative flex h-[300px] w-full justify-center overflow-hidden bg-white p-5">
                {state === STATES[1] &&
                  thisQuestion.img1 ===
                    triviBySlug.questions[currentQuiz].img1 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, type: "tween" }}>
                      <Image
                        src={`${thisQuestion.img1}`}
                        layout="fill"
                        objectFit="contain"
                        alt=""
                        priority
                        onLoadingComplete={handleOnLoadingComplete}
                      />
                    </motion.div>
                  )}
                {thisQuestion.img2 !== null &&
                  (state === STATES[2] || state === STATES[3]) &&
                  thisQuestion && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, type: "tween" }}>
                      <Image
                        src={`${thisQuestion.img2}`}
                        priority
                        layout="fill"
                        objectFit="contain"
                        className="absolute top-0 h-full object-contain object-center"
                        alt=""
                      />
                    </motion.div>
                  )}
              </div>
              <div className="flex h-[300px] w-full flex-col justify-between bg-white px-3 pb-3">
                <div className="flex flex-wrap">
                  {thisQuestion.answers.map((answer, i) => (
                    <AnswerButton
                      key={i}
                      state={state}
                      runAnimation={runAnimation}
                      currentQuiz={currentQuiz}
                      showCorrect={showCorrect}
                      answers={answer}
                      checkAnswer={checkAnswer}
                    />
                  ))}
                </div>
                <div className="flex flex-row-reverse justify-between">
                  <div
                    className={`text-_w_match group flex cursor-pointer items-center p-1 text-xl font-black tracking-tight hover:underline sm:text-2xl ${
                      state === "timeout" || state === "answered"
                        ? "visible"
                        : "invisible"
                    }`}>
                    {currentQuiz ===
                    triviBySlug.questions.length - 1 ? (
                      <h3 onClick={() => setState(STATES[4])}>
                        Show Results
                      </h3>
                    ) : (
                      <h3 onClick={handleNext}>Next Question</h3>
                    )}
                  </div>
                  {(state === STATES[2] || state === STATES[3]) &&
                    questionLeft !== 1 && (
                      <h3 className="p-1 text-lg font-bold tracking-tight text-gray-600">
                        Question left: {questionLeft - 1}
                      </h3>
                    )}
                </div>
                <div className="p-2">
                  {(state === STATES[2] || state === STATES[3]) && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="rounded-lg border">
                      <p className="text-_bg_dark p-3 text-sm font-semibold tracking-tighter">
                        <span className="text-_orange font-bold">
                          Fact:{" "}
                        </span>
                        {thisQuestion.fact}
                      </p>
                    </motion.div>
                  )}
                </div>
              </div>
              {state === STATES[0] && (
                <div className="bg-_contrast_bg absolute bottom-0 left-0 flex h-[510px] w-full flex-col items-center justify-center border p-3">
                  <h2 className="text-_contrast_text mb-10 p-3 text-center text-3xl font-black tracking-tight sm:text-5xl">
                    {triviBySlug.title}
                  </h2>
                  <h2
                    onClick={() => setState(STATES[1])}
                    className="border-_accent bg-_accent/[0.8] hover:bg-_accent/[0.9] text-_contrast_text cursor-pointer rounded-lg border-b-4 p-5 text-lg font-black tracking-tight duration-200 sm:text-4xl">
                    Start The Quiz
                  </h2>
                </div>
              )}
            </div>
          )}
          {state === STATES[4] && (
            <div className="bg-_contrast_bg h-full w-full rounded-lg border p-2 pt-16">
              <ScoreBoard
                idTrivia={triviBySlug.id}
                winstreak={gameScore.winstreak}
                timeBonusStack={gameScore.timeBonusStack}
                correct={gameScore.point}
                pointCookies={pointCookies}
              />
              <div className="mt-5 w-full rounded-md ">
                <div className="text-_contrast_text my-10 text-center text-2xl font-black underline">
                  READY FOR YOUR NEXT QUIZ?
                </div>
                <div className="mx-auto w-full sm:w-4/5">
                  {triviNotThisQuiz.map((quiz, i) => {
                    return (
                      <TriviaCard
                        key={i}
                        trivia={quiz}
                        image={`${quiz.image}`}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
