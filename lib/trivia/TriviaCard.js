import React from "react";
import Link from "next/link";
import Image from "next/image";

const TriviaCard = ({ trivia, image }) => {
  const { title, group, expert, slug } = trivia;
  return (
    <>
      <div className="w-full min-h-[160px] flex flex-col sm:flex-row my-5 font-Nunito bg-white sm:bg-transparent rounded-lg">
        <div className="relative sm:w-44 h-36 overflow-hidden rounded-xl">
          <Image
            fill
            objectFit="cover"
            loading="lazy"
            className="cursor-pointer hover:scale-105 duration-200"
            src={image}
            alt={title}
          />
        </div>
        <div className="p-5 flex flex-col justify-center">
          <Link href={"/trivia-category/" + group}>
            <h4 className="font-bold text-_accent text-lg capitalize hover:underline cursor-pointer">
              {group}
            </h4>
          </Link>
          <Link href={"/trivia/" + slug}>
            <h3 className="font-black text-_dark text-2xl capitalize tracking-tight hover:underline cursor-pointer">
              {title}
            </h3>
          </Link>
          <p className="font-semibold text-_darkblue text-base capitalize">
            {expert}
          </p>
        </div>
      </div>
    </>
  );
};

export default TriviaCard;
