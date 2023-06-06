"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
//import BarChartComp from "@/components/subcomponents/BarChart";
import BarChartComp from "./BarChart";
//import BarChartVerticle from "@/components/subcomponents/BarChartVerticle";
import BarChartVerticle from "./BarChartVerticle";
import { data, dataAges, dataEdus } from "@/lib/myapp/sampleDataIQ";

const ResultTesting = ({ yourdata }) => {
  const [showIQ, setShowIQ] = useState();
  const [showIQage, setShowIQage] = useState();
  const [showIQedu, setShowIQedu] = useState();

  const [iqedu, setIQedu] = useState();
  const [iqage, setIQage] = useState();
  const [thisDataAge, setThisDataAge] = useState();
  const [thisDataEdu, setThisDataEdu] = useState();

  const normalDistributionPercentile = (x, mean, stdDev) => {
    // Calculate the cumulative distribution function (CDF) of a normal distribution
    // with the given mean and standard deviation, evaluated at x.
    // Source: https://en.wikipedia.org/wiki/Normal_distribution#Cumulative_distribution_function

    const erf = z => {
      const t = 1 / (1 + 0.5 * Math.abs(z));
      const ans =
        1 -
        t *
          Math.exp(
            -z * z -
              1.26551223 +
              t *
                (1.00002368 +
                  t *
                    (0.37409196 +
                      t *
                        (0.09678418 +
                          t *
                            (-0.18628806 +
                              t *
                                (0.27886807 +
                                  t *
                                    (-1.13520398 +
                                      t *
                                        (1.48851587 +
                                          t *
                                            (-0.82215223 +
                                              t * 0.17087277))))))))
          );
      return z >= 0 ? ans : -ans;
    };

    const z = (x - mean) / stdDev;
    const percentile = (1 + erf(z / Math.sqrt(2))) / 2;
    return (percentile * 100).toFixed(2);
  };

  const handleNext = () => {
    if (step >= steps.length - 1) return;
    setStep(step + 1);
  };
  const handlePrev = () => {
    if (step <= 0) return;
    setStep(step - 1);
  };

  useEffect(() => {
    setShowIQ(normalDistributionPercentile(yourdata.iq, 100, 15));
    setShowIQage(
      normalDistributionPercentile(yourdata.iq, iqage, 15)
    );
    setShowIQedu(
      normalDistributionPercentile(yourdata.iq, iqedu, 15)
    );
  }, [iqage, iqedu]);

  useEffect(() => {
    const _iqedu = dataEdus
      .filter(edu => edu.edu === yourdata.edu)
      .map(edu => edu["IQ by education"]);
    const _iqage = dataAges
      .filter(age => age.age === yourdata.age)
      .map(age => age["IQ by age"]);

    let newDataAge = [
      ...dataAges,
      {
        age: "Your",
        "IQ by age": yourdata.iq
      }
    ];
    let newDataEdus = [
      ...dataEdus,
      {
        edu: "Your",
        "IQ by education": yourdata.iq
      }
    ];
    setIQedu(_iqedu);
    setIQage(_iqage);
    setThisDataAge(newDataAge);
    setThisDataEdu(newDataEdus);
  }, [yourdata]);

  return (
    <>
      <motion.section>
        <div className="text-_dark m-5 mx-auto max-w-4xl rounded-lg border bg-slate-50 p-5 tracking-tight shadow-sm">
          <div>
            <h2 className="font-Roboto mt-5 text-center text-2xl font-bold uppercase tracking-tight">
              Your IQ Test result
            </h2>
            <h2 className="text-_accent my-10 text-center text-5xl font-black">
              {Math.round(yourdata.iq)}
            </h2>
            {}
            <h2 className="text-_accent mb-10 text-center text-3xl font-black">
              🏆
            </h2>
            <p className="p-2">
              The IQ test you have just completed measures various
              aspects of general intelligence: logical reasoning,
              clear deduction skills and comprehension of complex
              concepts, as well as the ability to retain and reproduce
              patterns of information, sometimes referred to as
              reproduction ability.
            </p>
            <p className="p-2">
              Based on the results of the test you have just
              completed,{" "}
              <span className="font-bold">
                your IQ score is {Math.round(yourdata.iq)}
              </span>
            </p>
            <p className="p-2">
              This IQ score is an estimate only. Your score may vary
              depending on the format and conditions under which you
              take the test.
            </p>
          </div>
          <div className="mx-auto my-20 max-w-lg">
            <h4 className="mb-10 text-center text-xl font-semibold">
              1 - The general and international distribution of IQ
            </h4>
            <BarChartComp data={data} />
            <p className="text-center">
              {`You are among the top ${(100 - showIQ).toFixed(
                2
              )}% most intelligent people in the world.
              You are smarter than ${showIQ}% of the population.`}
            </p>
          </div>
          <div className="mx-auto my-20 max-w-lg">
            <h4 className="mb-10 text-center text-xl font-semibold">
              2 - Distribution by age groups
            </h4>
            {thisDataAge !== undefined && (
              <BarChartComp data={thisDataAge} />
            )}
            <p className="text-center">
              {`You are among the top ${(100 - showIQage).toFixed(
                2
              )}% most intelligent people in your age
              group. You are smarter than ${showIQage}% of people in your age group.`}
            </p>
          </div>
          <div className="mx-auto my-20 max-w-lg">
            <h4 className="mb-10 text-center text-xl font-semibold">
              3 - Distribution by education level
            </h4>
            {thisDataEdu !== undefined && (
              <BarChartVerticle data={thisDataEdu} />
            )}
            <p className="text-center">
              {`You are among the top ${(100 - showIQedu).toFixed(
                2
              )}% most intelligent people in your
              education level. You are smarter than ${showIQedu}% of
              people with the same education level (${
                yourdata.edu
              }) as you.`}
            </p>
          </div>
          <div className="my-20 flex w-full justify-center">
            <Link href={"./"} className="btn-getstarted">
              Save and Back
            </Link>
          </div>
        </div>
      </motion.section>
    </>
  );
};

export default ResultTesting;
