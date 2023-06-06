"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import TriviaCard from "@/lib/trivia/TriviaCard";
import { triviaData } from "../../../lib/trivia/triviaData";

export default function Quiz() {
  let seoID = 0;
  let seoID2 = 1;
  return (
    <>
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="body-font px-3">
        <div className="font-Nunito mx-auto h-auto max-w-[56rem] pt-16 md:pt-24">
          <div className="flex flex-wrap">
            <Link
              href={"/quiz/" + triviaData[seoID].slug}
              className="relative my-3 min-h-[30rem] w-full overflow-hidden rounded-xl md:w-1/2">
              <Image
                layout="fill"
                objectFit="cover"
                loading="lazy"
                className="min-h-full max-w-full hover:cursor-pointer"
                src={triviaData[seoID].image}
                alt="blog image"
              />
              <div className="absolute bottom-5 w-full">
                <div className="text-_bg_dark mx-auto w-[90%] rounded-lg bg-white/[0.68] p-6 shadow">
                  <h2 className="hover:text-_blue text-2xl font-black hover:cursor-pointer md:text-3xl">
                    {triviaData[seoID].title}
                  </h2>
                  <p className="mt-5 text-base">
                    {triviaData[seoID].expert}
                  </p>
                </div>
              </div>
            </Link>
            <Link
              href={"/quiz/" + triviaData[seoID2].slug}
              className="my-3 h-auto w-full md:min-h-[30rem] md:w-1/2 md:pl-10 ">
              <div className="dark:bg-_darkblue h-full w-full overflow-hidden rounded-xl">
                <div className="relative flex h-56 w-full  items-center justify-center overflow-hidden hover:cursor-pointer md:h-1/2 ">
                  <Image
                    fill
                    objectFit="cover"
                    loading="lazy"
                    className="h-full hover:cursor-pointer"
                    src={triviaData[seoID2].image}
                    alt="image blog"
                  />
                </div>
                <div className="p-3">
                  <h2 className="hover:text-_blue text-2xl font-black hover:cursor-pointer md:text-3xl">
                    {triviaData[seoID2].title}
                  </h2>
                  <p className="my-6 text-base">
                    {triviaData[seoID2].expert}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
        {triviaData.length > 0 && (
          <div className="font-Nunito mx-auto flex max-w-[56rem] flex-col py-10">
            <h2 className="my-4 border-b-2 py-2 text-xl font-semibold">
              THIS JUST IN
            </h2>
            <div className="grid w-full grid-cols-1 gap-2 xs:grid-cols-2 md:grid-cols-4">
              {triviaData.map((trivia, i) => {
                return (
                  <Link
                    key={i}
                    href={"/quiz/" + trivia.slug}
                    className="my-2 flex w-full px-1 hover:cursor-pointer">
                    <div className="dark:bg-_darkblue h-full w-full overflow-hidden rounded-xl">
                      <div className="relative h-36">
                        <Image
                          fill
                          objectFit="cover"
                          src={trivia.image}
                          alt="image blog"
                        />
                      </div>
                      <div className="px-5">
                        <h2 className="hover:text-_blue my-1 text-xl font-black tracking-tight">
                          {trivia.title}
                        </h2>
                        <p className="my-1 text-base tracking-tight">
                          {trivia.expert}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </motion.section>
    </>
  );
}
