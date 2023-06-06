import React from "react";
import Image from "next/image";
let isMarkedClass = "border";

const QuizOption = ({
  index,
  option,
  currentquiz,
  questions,
  lockButton,
  setCurrentquiz,
  userOptions,
  setUserOptions
}) => {
  isMarkedClass =
    userOptions[currentquiz] !== "" &&
    option.answerText === userOptions[currentquiz]
      ? "ring-2"
      : "border ";

  const handleAnswer = op => {
    if (lockButton) return;
    let temparr = [...userOptions];
    temparr[currentquiz] = op;
    setUserOptions(temparr);
  };
  return (
    <div
      onClick={() => handleAnswer(option.answerText)}
      className={`flex ${isMarkedClass} mark-option min-h-24 cursor-pointer items-center justify-between overflow-hidden rounded-lg p-2 transition duration-100 hover:shadow-xl`}>
      <h4 className="text-primary pr-2 font-bold">
        {option.answerText}
      </h4>
      <div className="relative h-[100px] w-full sm:h-[130px]">
        {option.answerLink ===
          questions[currentquiz].answerOptions[index].answerLink && (
          <Image
            fill
            objectFit="contain"
            src={"/static/iqimg/" + option.answerLink + ".jpg"}
            alt="answer"
          />
        )}
      </div>
    </div>
  );
};

export default QuizOption;
