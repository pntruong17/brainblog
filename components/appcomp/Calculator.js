"use client";
import React, { useEffect, useState } from "react";
import { getQuiz } from "@/firebase/quizFirebase";
import { updateUser } from "@/firebase/usersFirebase";
import ResultTesting from "./subcomponents/ResultTesting";
import { v4 as uuidv4 } from "uuid";

const Calculator = ({
  percentCorrect,
  myUser,
  numtest,
  wrongQuizs,
  time,
  yourdata,
  setYourdata
}) => {
  const [edu, setEdu] = useState("GED");
  const [age, setAge] = useState("35");
  const [quiz, setQuiz] = useState(null);
  const [iq, setIQ] = useState(null);
  //const { user } = useUserAuth();
  // this test

  const equal30 = [
    [0, 400, 650, 750, 800, 900],
    [125, 145, 160, 175, 190, 200]
  ];
  const less30 = [
    [
      0, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
      30
    ],
    [
      85, 100, 102, 105, 108, 109.5, 110, 111.5, 112.5, 114.5, 116.5,
      118.5, 120, 121.5, 123, 125, 126
    ]
  ];

  const calculateTestScore = (_score, _timer) => {
    if (_score < 15) {
      const idx = less30[0].findIndex(p => p === _score);
      const x1 = 85;
      const x2 = 100;
      const x0 = x2 - x1;
      const time0 = _score / 15;
      const score0 = x0 * time0 + x1;
      setIQ(score0);
    } else if (_score < 30) {
      const idx = less30[0].findIndex(p => p === _score);
      const x1 = less30[1][idx];
      const x2 = less30[1][idx + 1];
      const x0 = x2 - x1;
      const time0 = _timer / 800;
      const score0 = x0 * time0 + x1;

      setIQ(score0);
    } else {
      const idx = equal30[0].findIndex(p => p > _timer) - 1;

      const time1 = equal30[0][idx];
      const time2 = equal30[0][idx + 1];

      const score1 = equal30[1][idx];
      const score2 = equal30[1][idx + 1];

      const time0 = (_timer - time1) / (time2 - time1);
      const score0 = (score2 - score1) * time0 + score1;

      setIQ(score0);
    }
  };

  // end of test

  const mean = arr =>
    arr.reduce((acc, curr) => acc + curr, 0) / arr.length;
  const standardDeviation = arr => {
    const m = mean(arr);
    const deviations = arr.map(x => (x - m) ** 2);
    const variance = mean(deviations);
    return Math.sqrt(variance);
  };

  const returnIQFunction = (_point, _data) => {
    const _mean = mean(_data);
    const _sd = standardDeviation(_data);
    const _iqSD = 15;
    const _iq = (_iqSD * (_point - _mean)) / _sd + 100;

    return _iq;
  };

  const getData = async () => {
    const quizs = await getQuiz();
    setQuiz(quizs);
  };

  const updateCurrentUser = async () => {
    const sample_userdata = {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      numberTestRemain: 0,
      country: myUser.country,
      education: yourdata.edu,
      yourdata: {
        iq: yourdata.iq,
        age: yourdata.age,
        edu: yourdata.edu
      }
    };
    await updateUser(myUser.uid, sample_userdata);
  };

  const updateIQCurrentUser = async _iqlv => {
    // const sample_userdata = {
    //   uid: user.uid,
    //   displayName: user.displayName,
    //   email: user.email,
    //   photoURL: user.photoURL,
    //   numberTestRemain: 0,
    //   education: "",
    //   yourdata: {
    //     iqlvl: "",
    //     age: "",
    //     country: "",
    //   },
    // };
    const sample_userdata = {
      uid: uuidv4(),
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      numberTestRemain: 0,
      country: "",
      education: yourdata.edu,
      yourdata: {
        iq: _iqlv,
        age: yourdata.age,
        edu: yourdata.edu
      }
    };

    await updateUser(user.uid, sample_userdata);
  };

  useEffect(() => {
    let _yourdata = yourdata;
    const sample_yourdata = {
      iq: iq,
      edu: _yourdata.edu,
      age: _yourdata.age
    };
    setYourdata(sample_yourdata);
  }, [iq]);

  useEffect(() => {
    getData();
    //updateCurrentUser();
  }, []);
  useEffect(() => {
    if (iq === null) return;
    updateIQCurrentUser(iq);
  }, [iq]);

  useEffect(() => {
    if (quiz === null) return;

    let newData = quiz
      .filter(item => item.education === edu && item.age === age)
      .map(item => item.percentCorrect);

    if (newData.length < 100) {
      newData = quiz
        .filter(item => item.age === age)
        .map(item => item.percentCorrect);

      if (newData.length < 100) {
        newData = quiz.map(item => item.percentCorrect);
      }
    }
    //const _myiq = returnIQFunction(percentCorrect, newData);
    //updateIQCurrentUser(_myiq);
    //setIQ(_myiq);
    calculateTestScore(30 - wrongQuizs.length, time);
  }, [quiz]);
  return (
    <>
      <ResultTesting yourdata={yourdata} />
    </>
  );
};

export default Calculator;
