"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const GameCard = ({
  gameName,
  gameDesc,
  gamePhoto,
  gameSlug,
  gameColorBG
}) => {
  return (
    <>
      <div className="m-3 flex min-h-[320px] cursor-pointer flex-col overflow-hidden rounded-2xl border hover:shadow-md dark:border-none dark:bg-gray-950">
        <div
          className={`flex h-28 w-full items-center justify-center ${gameColorBG}`}>
          <Image
            width={80}
            height={80}
            objectFit="contain"
            className="h-24 w-1/4 object-scale-down object-center"
            src={gamePhoto}
            alt={gameName}
          />
        </div>
        <div className="flex h-auto flex-grow flex-col justify-between p-2 text-center">
          <h3 className=" text-2xl font-bold tracking-tighter">
            {gameName}
          </h3>
          <p className=" text-sm tracking-tighter ">{gameDesc}</p>
          <Link
            href={"/games/" + gameSlug}
            className="text-md my-3 rounded-full border border-gray-300 p-3 font-semibold hover:border-gray-400">
            Play
          </Link>
        </div>
      </div>
    </>
  );
};
/** https://cms-assets.tutsplus.com/cdn-cgi/image/width=800/uploads/users/2361/posts/36065/image/what_is_illustration_example_illustrator.jpg **/
export default GameCard;
