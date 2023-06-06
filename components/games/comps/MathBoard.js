import React from "react";

const MathBoard = ({ mathArray, randum }) => {
  return (
    <>
      <div className="w-full h-full flex justify-center items-center font-bold text-4xl text-_blue bg-white text-center p-2 rounded-md border">
        {mathArray.length === 0 && <h3>{mathArray}</h3>}
        {mathArray.length === 1 && (
          <h3>{mathArray[0][2] + mathArray[0][1] + mathArray[0][0]}</h3>
        )}
        {mathArray.length === 2 && (
          <h3>
            {"(" +
              mathArray[1][2] +
              mathArray[1][1] +
              mathArray[1][0] +
              ")" +
              mathArray[0][1] +
              mathArray[0][0]}
          </h3>
        )}
        {mathArray.length === 3 && (
          <h3>
            {"((" +
              mathArray[2][2] +
              mathArray[2][1] +
              mathArray[2][0] +
              ")" +
              mathArray[1][1] +
              mathArray[1][0] +
              ")" +
              mathArray[0][1] +
              mathArray[0][0]}
          </h3>
        )}
      </div>
    </>
  );
};

export default MathBoard;
