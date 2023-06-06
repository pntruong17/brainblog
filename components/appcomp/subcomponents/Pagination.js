import React from "react";
let isPickedClass = "";
let isNowQuizClass = "";

const Pagination = ({ item, index, currentquiz, setCurrentquiz }) => {
  isPickedClass =
    item !== "" ? "bg-blue-400 text-white ring-2 ring-blue-500" : "";
  isNowQuizClass =
    index === currentquiz
      ? "bg-blue-400 text-white ring-2 ring-blue-500/[.55]"
      : "";

  const handlePages = (i) => {
    setCurrentquiz((prevState) => i);
  };
  return (
    <div>
      <button
        className={`btn-pagination mb-2 mx-1 mark-option ${isPickedClass} ${isNowQuizClass}`}
        onClick={() => handlePages(index)}
      >
        {index + 1}
      </button>
    </div>
  );
};

export default Pagination;
