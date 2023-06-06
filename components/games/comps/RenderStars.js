import React, { useState } from "react";
import { motion } from "framer-motion";
const RenderStars = ({
  visible,
  setVisible,
  star,
  setIns,
  setID,
  checkDiamond
}) => {
  const [_deg, _setDeg] = useState(0);
  const clickSelf = () => {
    _setDeg(0);
    setID(star.id);
    setIns(prev => prev + 1);
    setVisible(false);
    checkDiamond(star.id);
  };

  return (
    <>
      {visible && (
        <motion.div
          key={visible}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{
            type: "spring",
            stiffness: 200,
            duration: 0.2
          }}
          className="w-3/4 ">
          <div
            id="spin"
            style={{
              transform: `rotate(${star.deg}deg)`
            }}
            className={`
              ${star.type === "blank" ? "invisible" : " "}
              
              `}>
            <div
              className={` 
              ${star.rotate === 1 ? "spin1" : " "}
              ${star.rotate === -1 ? "_spin1" : " "}
              ${star.rotate === 2 ? "spin2" : " "}
              ${star.rotate === -2 ? "_spin2" : " "}
              `}>
              <h2>{}</h2>
              <img
                onClick={clickSelf}
                className={`cursor-pointer object-contain object-center
   
              `}
                src={`/static/games/diamonds/diamond${star.icon}.png`}
              />
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default RenderStars;
