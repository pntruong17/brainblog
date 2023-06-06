import React from "react";
import Link from "next/link";
const AllTopic = () => {
  const linkTopic = [
    {
      title: "Games",
      link: "/brain-games",
    },
    {
      title: "Blogs",
      link: "/articles",
    },
    {
      title: "Trivia",
      link: "/trivia",
    },
    {
      title: "IQ",
      link: "/test-iq",
    },
    {
      title: "Test iq free",
      link: "/test-iq",
    },
    {
      title: "All Topics",
      link: "/",
    },
    {
      title: "Brain fog",
      link: "/",
    },
  ];
  return (
    <>
      <div className="text-gray-600 font-Inter my-14">
        <div className="max-w-6xl flex flex-wrap px-5 py-5 mx-auto">
          <div className="w-full md:w-2/3 mt-10">
            <h3 className="text-2xl font-bold text-_dark underline text-center md:text-left">
              Recently Published
            </h3>
            <div className="flex flex-wrap mt-10">
              <div className="w-full md:w-1/2 p-3">
                <Link href={"/trivia/guess-the-movie-by-emoji-quiz"}>
                  <div className="group rounded-2xl w-full min-h-[280px] p-10 shadow-lg overflow-hidden relative cursor-pointer">
                    <h3 className="font-bold text-gray-900 text-xl group-hover:underline group-hover:text-_green duration-100">
                      Guess the Movie by Emoji — Quiz
                    </h3>
                    <p className="pt-5 text-base">
                      Can you guess the movies by emojis? Let&apos;s find out
                      and have heaps of fun in the guess the movie by emoji
                      quiz!
                    </p>
                    <div className="absolute -bottom-4 -right-4 w-14 h-14 bg-_green rounded-2xl">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2.5"
                        stroke="currentColor"
                        className="absolute bottom-6 right-6 w-6 h-6 text-white group-hover:translate-x-1 duration-100"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                        />
                      </svg>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="w-full md:w-1/2 p-3">
                <Link
                  href={
                    "/articles/the-top-9-brain-foods-for-studying-and-exams"
                  }
                >
                  <div className="group rounded-2xl w-full min-h-[280px] p-10 shadow-lg overflow-hidden relative cursor-pointer">
                    <h3 className="font-bold text-gray-900 text-xl group-hover:underline group-hover:text-_green duration-100">
                      The Top 9 Brain Foods for Studying and Exams — Articles
                    </h3>
                    <p className="pt-5 text-base">
                      Foods that are good for the brain, help you study and work
                      more effectively
                    </p>
                    <div className="absolute -bottom-4 -right-4 w-14 h-14 bg-_green rounded-2xl">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2.5"
                        stroke="currentColor"
                        className="absolute bottom-6 right-6 w-6 h-6 text-white group-hover:translate-x-1 duration-100"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                        />
                      </svg>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="w-full md:w-1/2 p-3">
                <Link href={"/brain-games/wordl"}>
                  <div className="group rounded-2xl w-full min-h-[280px] p-10 shadow-lg overflow-hidden relative cursor-pointer">
                    <h3 className="font-bold text-gray-900 text-xl group-hover:underline group-hover:text-_green duration-100">
                      Wordle — Brain Game
                    </h3>
                    <p className="pt-5 text-base">
                      Wordle is a popular online word-guessing game where
                      players must guess a five-letter word in six attempts.
                      It&apos;s fun, challenging, and educational.
                    </p>
                    <div className="absolute -bottom-4 -right-4 w-14 h-14 bg-_green rounded-2xl">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2.5"
                        stroke="currentColor"
                        className="absolute bottom-6 right-6 w-6 h-6 text-white group-hover:translate-x-1 duration-100"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                        />
                      </svg>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="w-full md:w-1/2 p-3">
                <Link href={"/test-iq"}></Link>
                <div className="group rounded-2xl w-full min-h-[280px] p-10 shadow-lg overflow-hidden relative cursor-pointer">
                  <h3 className="font-bold text-gray-900 text-xl group-hover:underline group-hover:text-_green duration-100">
                    Get a free IQ Test — IQ
                  </h3>
                  <p className="pt-5 text-base">
                    Take the challenge and discover your IQ score...
                  </p>
                  <div className="absolute -bottom-4 -right-4 w-14 h-14 bg-_green rounded-2xl">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2.5"
                      stroke="currentColor"
                      className="absolute bottom-6 right-6 w-6 h-6 text-white group-hover:translate-x-1 duration-100"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/3 pl-3 md:pl-20 mt-10">
            <h3 className="text-2xl font-bold text-_dark underline text-center md:text-left">
              Explore Topics
            </h3>
            <div className="flex flex-wrap py-10">
              {linkTopic.map((topic, index) => (
                <div
                  key={index}
                  className="px-5 py-2 rounded-lg bg-_green/[0.1] text-_green text-sm font-semibold m-1 cursor-pointer hover:bg-_green/[0.9] hover:text-green-50 duration-100"
                >
                  {topic.title}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllTopic;
