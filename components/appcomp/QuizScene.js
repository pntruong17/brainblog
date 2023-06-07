"use client";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import questions from "./questions";
import QuizOption from "./subcomponents/QuizOption";
import Pagination from "./subcomponents/Pagination";
import Step from "./subcomponents/Step";

let hiddenClass = "hidden";
let nowQuizRef;
let res = {
  wrongQuizs: [],
  percentCorrect: 0,
  time: 0
};
//--------------------------------------
const QuizScene = ({ changeScene, result, setResult }) => {
  const steps = [
    "These are the instructions for your IQ test",
    "There will be 30 questions, and you have 900 seconds to answer all of them.",
    "Make sure you feel comfortable and find a quiet place to take the test.",
    "If you're not feeling well, come back later. When you're not feeling well, your answers might not be accurate.",
    "If you're ready, click the LET'S GO button to start the timer!"
  ];

  const STATES = ["prepared", "quiz", "closed"];
  const [state, setState] = useState(STATES[0]); // prepare->quiz->close
  const [currentquiz, setCurrentquiz] = useState(0);
  const [thisQuestion, setThisQuestion] = useState(questions[0]);
  const [userOptions, setUserOptions] = useState(() =>
    questions.map(q => "")
  );
  const [section, setSection] = useState([
    { range: 8, title: "General Logical Reasoning Section" },
    { range: 14, title: "Numerical Reasoning Section" },
    { range: 22, title: "Logical Reasoning Section" },
    { range: 30, title: "Spatial Reasoning Section" }
  ]);
  const [showTitle, setShowTitle] = useState("");
  const [hbar, setHbar] = useState("25%");
  const [timer, setTimer] = useState(900); // 900s
  const [secondRef, setSecondRef] = useState(900);
  const [lockButton, setLockButton] = useState(false);

  const [isActiveTime, setIsActiveTime] = useState(false);
  const [imageLoadingComplete, setImageLoadingComplete] =
    useState(undefined);

  // --> check button locked & paused
  useEffect(() => {
    if (state === STATES[0]) return;
    if (imageLoadingComplete) {
      handleRestart();
      setLockButton(false);
    } else {
      handlePause();
      setLockButton(true);
    }
  }, [imageLoadingComplete]);
  useEffect(() => {
    if (state === STATES[0]) return;
    setImageLoadingComplete(false);
  }, [currentquiz]);
  // --> end check button & timer

  const imageLoadingCompleted = () => {
    setImageLoadingComplete(true);
  };

  // --> timer section
  const handleStart = () => {
    setIsActiveTime(true);
    console.log("starting");
  };

  const handlePause = () => {
    setSecondRef(timer);
    setIsActiveTime(false);
    console.log("pause");
  };

  const handleRestart = () => {
    setTimer(secondRef);
    setIsActiveTime(true);
  };

  useEffect(() => {
    let interval = null;

    if (isActiveTime) {
      interval = setInterval(() => {
        setTimer(time => time - 1);
      }, 1000);
    } else if (!isActiveTime && timer !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActiveTime, timer]);
  const renderTimer = () => {
    let munite = Math.floor(timer / 60);
    let second = timer % 60;
    return "" + changeTimeCode(munite) + ":" + changeTimeCode(second);
  };
  const changeTimeCode = sec => {
    if (sec < 10 && sec >= 0) {
      sec = "0" + Math.round(sec);
    }
    if (sec > 59) {
      sec = "00";
    }
    return sec;
  };
  // --> end of timer section

  const startQuiz = () => {
    handleStart();
    setState(STATES[1]);
  };

  useEffect(() => {
    nowQuizRef = currentquiz;
    if (currentquiz < section[0].range) {
      setShowTitle(section[0].title);
    } else if (currentquiz < section[1].range) {
      setShowTitle(section[1].title);
    } else if (currentquiz < section[2].range) {
      setShowTitle(section[2].title);
    } else {
      setShowTitle(section[3].title);
    }
  }, [currentquiz]);

  useEffect(() => {
    // show & scroll to submit button
    const isFinishAnswer =
      userOptions.filter(arr => arr === "").length <= 0;
    hiddenClass = isFinishAnswer ? "" : "hidden";
    document
      .getElementById("submit-quiz")
      .scrollIntoView({ behavior: "smooth" });

    // Go To Next UnCompleted Quiz
    const isEmptyAfterNowQuiz = userOptions.findIndex(
      (el, i) => el === "" && i >= nowQuizRef
    );
    const isEmptyBeforeNowQuiz = userOptions.findIndex(
      (el, i) => el === ""
    );
    if (isEmptyBeforeNowQuiz < 0) return;
    if (isEmptyAfterNowQuiz >= 0) {
      setCurrentquiz(isEmptyAfterNowQuiz);
    } else {
      setCurrentquiz(isEmptyBeforeNowQuiz);
    }
  }, [userOptions]);

  const handleBackArrow = () => {
    if (currentquiz === 0) return;
    setCurrentquiz(prevState => prevState - 1);
  };
  const handleNextArrow = () => {
    if (currentquiz === userOptions.length - 1) return;
    setCurrentquiz(prevState => prevState + 1);
  };
  const checkTheResult = () => {
    const time = timer;
    let wrongChoice = [];
    let thequizanswer = questions.map(ques =>
      ques.answerOptions.filter(op => op.isCorrect === true)
    );
    for (let i = 0; i < userOptions.length; i++) {
      if (
        thequizanswer[i][0].answerText !== userOptions[i] ||
        userOptions[i] === ""
      ) {
        wrongChoice.push(i);
      }
    }

    let per =
      ((questions.length - wrongChoice.length) / questions.length) *
      100;
    res = {
      wrongQuizs: wrongChoice,
      percentCorrect: per + time / 900,
      time: time
    };
    setResult(res);
    changeScene("Finish");
  };
  const submitResult = () => {
    checkTheResult();
  };
  useEffect(() => {
    if (timer <= 0) {
      checkTheResult();
    }
  }, [timer]);

  useEffect(() => {
    const newQuiz = questions[currentquiz];
    setThisQuestion(newQuiz);
  }, [currentquiz]);

  useEffect(() => {
    console.log("userOptions", userOptions);
    console.log("isActiveTime", isActiveTime);
    console.log("state", state);
  }, [userOptions, isActiveTime, state]);

  return (
    <>
      <Step steps={steps} setStart={startQuiz} delay={500} />
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="body-font bg-_darkblue text-gray-600">
        <div className="mx-auto min-h-screen max-w-5xl px-5 py-5">
          <div className="flex flex-col">
            <div className="my-2 flex justify-center md:my-6">
              <h4 className="font-Inter rounded-full bg-blue-200 px-10 py-1 text-center text-sm font-semibold text-blue-500">
                {showTitle}
              </h4>
            </div>
            <div className="my-2 flex flex-row justify-between">
              <svg
                onClick={() => handleBackArrow()}
                className="btn-rounded w-8 cursor-pointer"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
              <div className="flex flex-row">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="green"
                  className="h-6 w-6">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="pl-1 font-sans font-semibold text-gray-900 dark:text-white">
                  {renderTimer()}
                </h3>
              </div>

              <svg
                onClick={() => handleNextArrow()}
                className="btn-rounded w-8 cursor-pointer"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </div>

            <div className="flex flex-wrap overflow-hidden rounded-lg bg-white ring-1">
              <div className="h-1 w-full ">
                <div
                  className={`w-[${hbar}] bg-_blue/[0.68] h-full`}></div>
              </div>
              <div className="p-5 md:w-1/2">
                <div className="flex h-full w-full items-center justify-center overflow-hidden">
                  {thisQuestion.questionText ===
                    questions[currentquiz].questionText && (
                    <Image
                      width={800}
                      height={600}
                      loading="lazy"
                      className=""
                      onLoadingComplete={imageLoadingCompleted}
                      src={
                        "/static/iqimg/" +
                        thisQuestion.questionText +
                        ".jpg"
                      }
                      alt="blog"
                    />
                  )}
                </div>
              </div>
              <div className="w-full p-5 md:w-1/2">
                <div className="w-full">
                  <div className="grid grid-cols-2 gap-2">
                    {thisQuestion.answerOptions.map((item, i) => (
                      <QuizOption
                        key={i}
                        index={i}
                        lockButton={lockButton}
                        option={item}
                        questions={questions}
                        currentquiz={currentquiz}
                        setCurrentquiz={setCurrentquiz}
                        userOptions={userOptions}
                        setUserOptions={setUserOptions}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div>
              <button
                onClick={() => submitResult()}
                id="submit-quiz"
                className={`${hiddenClass} btn mt-5 w-full`}>
                Submit!
              </button>
            </div>
            <div className="mx-10 my-5 flex flex-wrap justify-center">
              {userOptions.map((item, i) => {
                return (
                  <Pagination
                    key={i}
                    index={i}
                    item={item}
                    currentquiz={currentquiz}
                    setCurrentquiz={setCurrentquiz}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </motion.section>
    </>
  );
};

export default QuizScene;
