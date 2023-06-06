import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const AnswerButton = ({
  state,
  showCorrect,
  runAnimation,
  currentQuiz,
  answers,
  checkAnswer,
}) => {
  const [showWrong, setShowWrong] = useState(false);
  const handleClick = () => {
    if (
      state === "timeout" ||
      state === "answered" ||
      state === "cloded" ||
      !runAnimation
    )
      return;
    checkAnswer(correct);
    setShowWrong(true);
  };

  const { answer, correct } = answers;

  useEffect(() => {
    setShowWrong(false);
  }, [currentQuiz]);

  return (
    <>
      <div className="w-full sm:w-1/3 ">
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          key={correct}
          onClick={handleClick}
          className={`m-1 h-auto sm:h-14 rounded-lg   ${
            showCorrect && correct ? "bg-green-400" : "border"
          } ${
            showWrong && !correct ? "bg-_w_almost" : ""
          } border-_w_almost  p-2 flex justify-center items-center cursor-pointer`}
        >
          <h3 className="text-sm text-_darkblue font-black text-center tracking-tight">
            {answer}
          </h3>
        </motion.div>
      </div>
    </>
  );
};

export default AnswerButton;
