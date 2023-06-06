"use client";
import { AnimatePresence } from "framer-motion";
import React, { useState, useEffect, useRef } from "react";
import RenderStars from "./comps/RenderStars";
import {
  checkCookies,
  setCookies,
  getCookies
} from "../appcomp/cookie";
//import { useRouter } from "next/router";
import ScoreBoard from "../appcomp/subcomponents/ScoreBoard";

const StarSearch = () => {
  //const router = useRouter();
  const [showScore, setShowScore] = useState(false);
  const [showScoreBoard, setShowScoreBoard] = useState(true);
  const [pointCookies, setPointCookies] = useState();

  const states = ["start", "playing", "close"];
  const [timer, setTimer] = useState(90); //timer
  const delayVisible = useRef();
  const [ins, setIns] = useState(0);
  const [state, setState] = useState("start");
  const [visible, setVisible] = useState(true);

  const [id, setID] = useState(0);
  const [totalrow, setTotalrow] = useState(20);
  const [point, setPoint] = useState(0);
  const [dimond, setDimond] = useState(0);
  const [stars, setStars] = useState([]);
  const [wrongclick, setWrongclick] = useState(3);

  const randomStates = n => {
    const _diamondStyles = [1, 2, 3, 4];
    const rotations = [0, -2, 2, -1, 1];
    const degs = [0, 15, 30, 45, 60];
    const newArray = [];

    for (let i = 0; i < n; i++) {
      let groupA, groupB, groupC;
      let found = false;

      while (!found) {
        const randARotateIndex = Math.floor(
          Math.random() * rotations.length
        );
        const randADegIndex = Math.floor(Math.random() * degs.length);
        const randStyleIndex = Math.floor(
          Math.random() * _diamondStyles.length
        );

        groupA = rotations[randARotateIndex];
        groupB = degs[randADegIndex];
        groupC = _diamondStyles[randStyleIndex];

        let duplicate = false;
        for (let j = 0; j < newArray.length; j++) {
          if (
            newArray[j].rotate === groupA &&
            newArray[j].deg === groupB &&
            newArray[j].icon === groupC
          ) {
            duplicate = true;
            break;
          }
        }

        if (!duplicate) {
          found = true;
        }
      }

      newArray.push({
        id: i,
        rotate: groupA,
        deg: groupB,
        icon: groupC,

        type: "hero"
      });
    }
    return newArray;
  };

  const initGroupStars = n => {
    let _stars = [];
    let _n = n;
    while (_n > 2) {
      const rand = Math.floor(Math.random() * 2) + 2;
      _stars.push(rand);
      _n -= rand;
    }
    if (_n > 1) _stars.push(_n);
    return _stars;
  };

  const createStars = () => {
    let starArray = [];
    let s = 3 + Math.floor(dimond / 2.5); //5
    let st = 3 + Math.floor(dimond / 4.5); //9
    if (s >= 20) s = 20;
    if (st >= 14) st = 14;
    const state = randomStates(st); //st
    const star = initGroupStars(s); //s
    for (let i = 0; i < star.length; i++) {
      for (let j = 0; j < star[i]; j++) {
        starArray.push(state[i + 1]);
      }
    }
    starArray.push(state[0]);
    return starArray;
  };

  const addFullPlace = () => {
    const hero = createStars();
    let tem = hero;
    for (let i = hero.length; i < totalrow; i++) {
      tem.push({
        id: i,
        rotate: null,
        deg: null,
        icon: null,

        type: "blank"
      });
    }
    tem.sort(() => Math.random() - 0.5);
    return tem;
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

  // end cookies data

  const checkDiamond = id => {
    if (id === 0) {
      setDimond(dimond + 1);
    } else {
      setWrongclick(wrongclick - 1);
    }
  };

  /// USeEffect
  useEffect(() => {
    //if (state === states[0] || state === states[2]) return;
    if (wrongclick <= 1) {
      setState(states[2]);
    }
    setStars([]);
    setStars(addFullPlace());
  }, [dimond, wrongclick]);

  useEffect(() => {
    if (state === states[0] || state === states[2]) return;
    delayVisible.current = setTimeout(() => {
      setVisible(true);
    }, 250);
    return () => clearTimeout(delayVisible.current);
  }, [ins, state]);

  //timer
  const changeTimeCode = sec => {
    if (sec < 10 && sec >= 0) {
      sec = "0" + sec;
    }
    if (sec > 59) {
      sec = "00";
    }
    return sec;
  };
  const renderTimer = () => {
    let munite = Math.floor(timer / 60);
    let second = timer % 60;
    return "" + changeTimeCode(munite) + ":" + changeTimeCode(second);
  };

  const tinhDiem = () => {
    const _point = dimond * 100;
    setPoint(_point);
    const numCookies = getCookies("_USER_COOKIES_TRIVIA_LVL");
    const newPoint = Number(numCookies) + Number(_point);
    setCookies("_USER_COOKIES_TRIVIA_LVL", newPoint);
    setPointCookies(newPoint);
  };
  useEffect(() => {
    if (state === states[0] || state === states[2]) return;
    const intervalId = setInterval(() => {
      setTimer(prev => prev - 1);
      if (timer <= 0) {
        setTimer(0);
        setState(states[2]);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [state, timer]);

  // delay show score
  useEffect(() => {
    if (state !== states[2]) return;

    let timeDelayRef;
    timeDelayRef = setTimeout(() => {
      tinhDiem();
      setShowScore(true);
    }, 2000);

    return () => clearTimeout(timeDelayRef);
  }, [state]);
  useEffect(() => {
    if (!showScoreBoard) {
      //router.push("/brain-games");
    }
  }, [showScoreBoard]);

  return (
    <>
      {showScore && (
        <div className="bg-_bg_dark absolute left-0 top-20 z-10 w-full py-16">
          <ScoreBoard
            closeButton={true}
            correct={point}
            pointCookies={pointCookies}
            setShowScoreBoard={setShowScore}
          />
        </div>
      )}
      {state === states[1] && (
        <div className="fixed left-0 top-0 flex w-full">
          <div className="w-lg mx-auto flex justify-between  p-2 text-center">
            <h4>Time: {renderTimer()}</h4>
          </div>
        </div>
      )}
      {state === states[0] && (
        <div className="fixed left-0 top-1/2 flex w-full">
          <div className="w-lg mx-auto flex justify-between  p-2 text-center">
            <button
              onClick={() => setState(states[1])}
              className="btn">
              Play !
            </button>
          </div>
        </div>
      )}
      {state === states[2] && (
        <div className="fixed left-0 top-1/2 flex w-full">
          <div className="w-lg -m-10 mx-auto flex  flex-col border p-2 text-center">
            <h4 className="text-center text-2xl font-bold underline">
              Game Close
            </h4>
            <h4 className="text-center text-xl font-bold">
              You have picked up{" "}
              <span className="text-_accent text-3xl">{dimond}</span>{" "}
              diamonds
            </h4>
          </div>
        </div>
      )}
      {state === states[1] && (
        <div className="fixed bottom-0 left-0 flex w-full">
          <div className="w-lg mx-auto flex justify-between  p-2 text-center">
            <h4>Level: {dimond + 1}</h4>
            <h4 className="ml-10">!ncorrect: {wrongclick}</h4>
          </div>
        </div>
      )}
      <div className="flex h-screen w-full items-center p-5">
        <div className="mx-auto max-h-full max-w-xl rounded-md md:max-w-2xl">
          <div className="grid max-h-full  w-full grid-cols-4">
            <AnimatePresence>
              {state === states[1] &&
                stars.map((star, index) => {
                  return (
                    <RenderStars
                      key={index}
                      star={star}
                      setID={setID}
                      checkDiamond={checkDiamond}
                      setIns={setIns}
                      visible={visible}
                      setVisible={setVisible}
                    />
                  );
                })}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </>
  );
};

export default StarSearch;
