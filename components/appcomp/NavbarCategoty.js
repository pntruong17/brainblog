import React, { useState } from "react";
import Link from "next/link";
import { triviaLinks } from "@/libs/menuItem";

const NavbarCategoty = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="fixed md:hidden top-0 left-0 w-full z-10">
        <div className="">
          <div className="w-1/3 title-font text-xl cursor-pointer flex items-center text-white relative">
            <div
              onClick={() => setOpen(!open)}
              className="text-3xl cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 9h16.5m-16.5 6.75h16.5"
                />
              </svg>
            </div>
            <div
              className={`fixed bg-_dark shadow-md z-10 top-0 left-0 w-full h-screen transition-all duration-200 ease ${
                open ? "" : "hidden"
              }`}
            >
              <svg
                onClick={() => setOpen(false)}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="5"
                stroke="white"
                className="absolute top-2 right-2 w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>

              <ul className="w-full h-full flex flex-col justify-center">
                {triviaLinks.map((link) => (
                  <li key={link.name} className="my-2 text-center">
                    <Link
                      href={link.link}
                      className="font-Nunito text-3xl md:text-5xl font-black text-_contrast_bg hover:underline capitalize"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden md:block w-full bg-[#16202C]">
        <ul className="w-full flex flex-wrap justify-center">
          {triviaLinks.map((link) => (
            <li key={link.name} className="my-2 text-center">
              <Link
                href={link.link}
                className="font-Nunito text-xl md:text-5xl px-2 md:px-5 font-black text-_contrast_bg hover:underline capitalize"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default NavbarCategoty;
