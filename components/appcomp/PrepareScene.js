"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { returnIQTestRemain } from "@/firebase/usersFirebase";
//import { useUserAuth } from "./helper/UserAuthContextProvider";

//import ButtonWrapper from "../components/paypal/ButtonWrapper";

const currency = "USD";

const PrepareScene = ({
  changeScene,
  setMyUser,
  numtest,
  setNumtest
}) => {
  //const { user } = useUserAuth();
  //const navigate = useRouter();

  const [state, setState] = useState("start");
  const [_uid, _setUid] = useState("156844324");

  const clickPlay = () => {
    changeScene("Doing Test");
  };

  useEffect(() => {
    setMyUser(_uid);
  }, [_uid]);

  useEffect(() => {
    if (_uid === null) return;
    const testNumber = async () => {
      const testNumber = await returnIQTestRemain(_uid);
      setNumtest(testNumber);
      if (testNumber > 0) {
        setState("test");
      } else {
        //setState("purchase");
        setState("test");
      }
    };
    testNumber();
  }, [_uid]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-_darkblue h-full w-full">
      <div className="mx-auto h-screen max-w-md px-2 py-16">
        <div className="flex flex-col rounded-lg bg-white p-10 shadow-xl">
          <h3 className="mb-4 text-center text-2xl font-bold uppercase tracking-tight text-gray-800">
            Take a Profesional
            <br />
            IQ test?
          </h3>
          <div className="font-Inter mb-3 text-sm">
            <p className="mb-2 flex items-center text-gray-600">
              <span className="bg-purple mr-2 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full text-white">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  className="h-3 w-3"
                  viewBox="0 0 24 24">
                  <path d="M20 6L9 17l-5-5"></path>
                </svg>
              </span>
              There are 30 questions
            </p>

            <p className="mb-2 flex items-center text-gray-600">
              <span className="bg-purple mr-2 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full text-white">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  className="h-3 w-3"
                  viewBox="0 0 24 24">
                  <path d="M20 6L9 17l-5-5"></path>
                </svg>
              </span>
              The result will be: exactly your IQ
            </p>

            <p className="mb-2 flex items-center text-gray-600">
              <span className="bg-purple mr-2 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full text-white">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  className="h-3 w-3"
                  viewBox="0 0 24 24">
                  <path d="M20 6L9 17l-5-5"></path>
                </svg>
              </span>
              Help you know your IQ Score
            </p>
            <p className="mb-2 flex items-center text-gray-600">
              <span className="bg-purple mr-2 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full text-white">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  className="h-3 w-3"
                  viewBox="0 0 24 24">
                  <path d="M20 6L9 17l-5-5"></path>
                </svg>
              </span>
              Analysis of your intelligence level
            </p>
          </div>
          <h5 className="mb-2 text-center font-semibold text-gray-800">
            {state === "start" && "loading"}
            {state === "test" && "ARE YOUR READY?"}
            {state === "purchase" &&
              "Purchase a profectional IQ testing with Paypal"}
          </h5>

          {state === "purchase" && (
            // <ButtonWrapper
            //   currency={currency}
            //   showSpinner={false}
            //   numtest={numtest}
            // />
            <h3>Purchas</h3>
          )}
          {state === "test" && (
            <button
              onClick={clickPlay}
              className="ease group relative z-30 box-border inline-flex w-auto cursor-pointer items-center justify-center overflow-hidden rounded-md bg-indigo-600 px-8 py-3 font-bold text-white ring-1 ring-indigo-300 ring-offset-2 ring-offset-indigo-200 transition-all duration-300 hover:ring-offset-indigo-500 focus:outline-none">
              <span className="absolute bottom-0 right-0 -mb-8 -mr-5 h-20 w-8 translate-x-1 rotate-45 transform bg-white opacity-10 transition-all duration-300 ease-out group-hover:translate-x-0"></span>
              <span className="absolute left-0 top-0 -ml-12 -mt-1 h-8 w-20 -translate-x-1 -rotate-45 transform bg-white opacity-10 transition-all duration-300 ease-out group-hover:translate-x-0"></span>
              <span className="relative z-20 flex items-center text-sm">
                You Can Test IQ Now
              </span>
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default PrepareScene;
