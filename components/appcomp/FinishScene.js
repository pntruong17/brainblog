"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { createQuiz } from "@/firebase/quizFirebase";
import GenderOption from "./subcomponents/GenderOption";
import CountryOption from "./subcomponents/CountryOption";
import EducationOption from "./subcomponents/EducationOption";
import AgeGroupOption from "./subcomponents/AgeGroupOption";
import { v4 as uuidv4 } from 'uuid';

const FinishScene = ({
  changeScene,
  wrongQuizs,
  percentCorrect,
  time,
  setYourdata
}) => {
  //const { user } = useUserAuth();
  const [gender, setGender] = useState("");
  const [country, setCountry] = useState("");
  const [education, setEducation] = useState("");
  const [age, setAge] = useState("");

  const [empties, setEmpties] = useState([]);

  const [isDisabled, setIsDisabled] = useState(false);

  const [smit, setSmit] = useState(false);

  const checkEmptyFields = () => {
    let arr = [];

    if (gender === "") {
      arr.push("gender");
    } else {
      arr = arr.filter(item => item !== "gender");
    }

    if (country === "") {
      arr.push("country");
    } else {
      arr = arr.filter(item => item !== "country");
    }

    if (education === "") {
      arr.push("education");
    } else {
      arr = arr.filter(item => item !== "education");
    }

    if (age === "") {
      arr.push("age");
    } else {
      arr = arr.filter(item => item !== "age");
    }
    setEmpties(arr);
  };

  const onSubmit = () => {
    checkEmptyFields();
    setSmit(true);
  };

  useEffect(() => {
    checkEmptyFields();
  }, []);

  useEffect(() => {
    if (!smit) return;

    if (empties.length <= 0) {
      let codesampple = {
        uid: uuidv4(),
        gender: gender,
        age: age,
        country: country,
        education: education,
        percentCorrect: percentCorrect,
        time: time,
        wrongs: [...wrongQuizs]
      };
      const sample_yourdata = {
        iq: undefined,
        edu: education,
        age: age
      };
      setYourdata(sample_yourdata);
      if (time < 800) {
        createQuiz(codesampple).then(() => {
          changeScene("Calculator");
        });

        setIsDisabled(true);
      } else {
        setIsDisabled(true);
        changeScene("Calculator");
      }
    }
  }, [empties]);
  return (
    <>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="body-font bg-_darkblue h-screen w-full text-gray-600">
        <div className="container mx-auto flex flex-wrap items-center px-3 py-5 md:py-24">
          <div className="mx-auto mt-10 flex w-full max-w-lg flex-col rounded-lg bg-white p-2 shadow-lg md:mt-0 md:p-8">
            <h2 className="title-font mb-5 text-lg font-medium text-gray-900">
              Please select the options below to complete the test
            </h2>
            <div className="relative mb-4">
              <span className="text-sm leading-7 text-gray-600">
                Gender:
              </span>
              <GenderOption setGender={setGender} />
              {smit && gender === "" && (
                <span className="text-_red text-xs">
                  * Please select an option
                </span>
              )}
            </div>
            <div className="relative mb-4">
              <span className="text-sm leading-7 text-gray-600">
                Country:
              </span>
              <CountryOption setCountry={setCountry} />
              {smit && country === "" && (
                <span className="text-_red text-xs">
                  * Please select an option
                </span>
              )}
            </div>
            <div className="relative mb-4">
              <span className="text-sm leading-7 text-gray-600">
                Education:
              </span>
              <EducationOption setEducation={setEducation} />
              {smit && education === "" && (
                <span className="text-_red text-xs">
                  * Please select an option
                </span>
              )}
            </div>
            <div className="relative mb-4">
              <span className="text-sm leading-7 text-gray-600">
                Age:
              </span>
              <AgeGroupOption setAgeGroup={setAge} />
              {smit && age === "" && (
                <span className="text-_red text-xs">
                  * Please select an option
                </span>
              )}
            </div>
            <button
              disabled={isDisabled}
              onClick={onSubmit}
              className="bg-_pink my-5 rounded border-0 px-8 py-2 text-lg  text-white focus:outline-none disabled:bg-gray-400">
              Submit
            </button>
          </div>
        </div>
      </motion.section>
    </>
  );
};

export default FinishScene;
