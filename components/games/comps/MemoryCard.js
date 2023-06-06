import React from "react";

const MemoryCard = ({ item, id, handleCardClick }) => (
  <>
    <div
      className={`card w-12 h-12 sm:w-24 sm:h-24 m-1 cursor-pointer ${
        item.stat === "active" ||
        item.stat === "wrong" ||
        item.stat === "correct"
          ? "flipped"
          : ""
      } ${item.stat === "correct" ? "correct" : ""} `}
      onClick={() => handleCardClick(id)}
    >
      <div className="flex back text-3xl sm:text-5xl text-center justify-center items-center">
        {item.icon}
      </div>
      <div className="front text-sm text-center overflow-hidden">
        <img
          className="object-contain hover:scale-105 transition-all duration-200"
          src="https://png.pngtree.com/png-clipart/20210723/ourmid/pngtree-korean-pattern-traditional-border-png-image_3714631.jpg"
        />
      </div>
    </div>
  </>
);

export default MemoryCard;
