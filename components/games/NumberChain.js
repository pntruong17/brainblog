"use client";
import React, { useState, useEffect } from "react";
import SquaresNumChain from "./comps/SquaresNumChain";
import createLayer from "./logical";

const NumberChain = () => {
  const [squares, setSquares] = useState(Array(30).fill(null));
  const [selected, setSelected] = useState([]);

  const [layer1, setLayer1] = useState(() =>
    createLayer("A", 4, 30).sort(() => Math.random() - 0.5)
  );
  const [layer2, setLayer2] = useState(() =>
    createLayer("B", 4, 30).sort(() => Math.random() - 0.5)
  );
  const [layer3, setLayer3] = useState(() =>
    createLayer("C", 4, 30).sort(() => Math.random() - 0.5)
  );
  const [layer4, setLayer4] = useState(() =>
    createLayer("D", 4, 30).sort(() => Math.random() - 0.5)
  );

  const handleSelected = id => {
    setSelected(prev => [...prev, id]);
    if (selected.length >= 2) setSelected(prev => prev.slice(1));
  };

  useEffect(() => {
    if (selected.length >= 2) {
      setLayer1(prevState => {
        let newState = [...prevState];
        if (newState[selected[0]] === newState[selected[1]]) {
          newState[selected[0]] = newState[selected[1]] = " ";
        }
        return newState;
      });
      setLayer2(prevState => {
        let newState = [...prevState];
        if (newState[selected[0]] === newState[selected[1]]) {
          newState[selected[0]] = newState[selected[1]] = " ";
        }
        return newState;
      });
      setLayer3(prevState => {
        let newState = [...prevState];
        if (newState[selected[0]] === newState[selected[1]]) {
          newState[selected[0]] = newState[selected[1]] = " ";
        }
        return newState;
      });
      setLayer4(prevState => {
        let newState = [...prevState];
        if (newState[selected[0]] === newState[selected[1]]) {
          newState[selected[0]] = newState[selected[1]] = " ";
        }
        return newState;
      });
    }
  }, [selected]);

  return (
    <div className="h-screen w-full bg-blue-800">
      <div className="mx-auto flex w-96 flex-wrap">
        {squares.map((square, index) => (
          <SquaresNumChain
            key={index}
            id={index}
            color={
              (index + squares.length) % 2 === 0
                ? "white"
                : "gray-300"
            }
            layer1={layer1}
            layer2={layer2}
            layer3={layer3}
            layer4={layer4}
            selected={selected}
            handleSelected={handleSelected}
          />
        ))}
      </div>
    </div>
  );
};

export default NumberChain;
