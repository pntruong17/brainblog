import React, { useState } from "react";
import Link from "next/link";
import { Links } from "@/libs/menuItem";
import { useTheme } from "next-themes";

const NavbarFixed = () => {
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <div className="fixed top-2 left-2 z-10">
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
              strokeWidth="2"
              stroke={theme === "dark" ? "currentColor" : "black"}
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
            className={`fixed bg-white dark:bg-_bg_dark shadow-md z-10 top-0 left-0 w-full h-screen transition-all duration-200 ease ${
              open ? "" : "hidden"
            }`}
          >
            <svg
              onClick={() => setOpen(false)}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke={theme === "dark" ? "currentColor" : "black"}
              className="absolute top-2 right-2 w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>

            <ul className="w-full h-full flex flex-col justify-center">
              {Links.map((link) => (
                <li key={link.name} className="my-2 text-center">
                  <Link
                    href={link.link}
                    className="font-Inter text-2xl font-black text-_bg_dark dark:text-_accent_dark hover:underline duration-100"
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
  );
};

export default NavbarFixed;
