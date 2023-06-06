"use client";
import React, { useEffect, useState, createContext } from "react";
//import { useRouter } from "next/router";
import FinishScene from "@/components/appcomp/FinishScene";
import PrepareScene from "@/components/appcomp/PrepareScene";
import QuizScene from "@/components/appcomp/QuizScene";
//import { useUserAuth } from "@/components/helper/UserAuthContextProvider";
import Calculator from "@/components/appcomp/Calculator";
import LayoutEmpty from "@/components/appcomp/LayoutEmpty";
import Container from "@/components/container";
// const sample_yourdata = {
//   iq: 113,
//   edu: "Bachelor's degree",
//   age: "60 - 79",
// };
//export const IQcontext = createContext();

export default function IQTest() {
  //const navigate = useRouter();
  //const { user } = useUserAuth();
  const [gamestate, setGamestate] = useState("Prepare");
  const [result, setResult] = useState([]);
  const [myUser, setMyUser] = useState();
  const [numtest, setNumtest] = useState();
  const [yourdata, setYourdata] = useState();

  useEffect(() => {
    //setFinish(true);
  }, [result, yourdata]);

  const changeScene = name => {
    setGamestate(name);
  };

  return (
    <>
      <Container>
        <div>
          {gamestate === "Prepare" && (
            <PrepareScene
              changeScene={changeScene}
              setMyUser={setMyUser}
              numtest={numtest}
              setNumtest={setNumtest}
            />
          )}
          {gamestate === "Doing Test" && (
            <QuizScene
              changeScene={changeScene}
              setResult={setResult}
            />
          )}
          {gamestate === "Finish" && (
            <FinishScene
              changeScene={changeScene}
              wrongQuizs={result.wrongQuizs}
              percentCorrect={result.percentCorrect}
              time={result.time}
              setYourdata={setYourdata}
            />
          )}
          {gamestate === "Calculator" && (
            <Calculator
              percentCorrect={result.percentCorrect}
              myUser={myUser}
              numtest={numtest}
              wrongQuizs={result.wrongQuizs}
              time={result.time}
              yourdata={yourdata}
              setYourdata={setYourdata}
            />
          )}
        </div>
      </Container>
    </>
  );
}
