import { useState, useEffect } from "react";
import Link from "next/link";
import Hamburger from "./subcomponents/Hamburger";
import Image from "next/image";

const Navbar = ({ themeCookie }) => {
  const links = [
    { id: "articles", slug: "/articles", child: undefined },
    { id: "brain games", slug: "/brain-games", child: undefined },
    { id: "trivia", slug: "/trivia", child: undefined },
    { id: "test IQ", slug: "/test-iq", child: undefined },
  ];
  const [verticalMenu, setVerticalMenu] = useState(false);

  const [open, setOpen] = useState(false);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (window.scrollY >= 100) {
  //       setVerticalMenu(false);
  //     } else {
  //       setVerticalMenu(true);
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  return (
    <>
      <div
        className={`w-full bg-white dark:bg-_bg_dark ${
          verticalMenu ? "" : " dark:border-none dark:shadow-md"
        }`}
      >
        <div
          className={`z-50 max-w-6xl mx-auto ${
            verticalMenu
              ? "flex-row sm:flex-col h-[50px] sm:h-[100px] flex justify-between sm:justify-center items-center"
              : "flex-row h-[50px] flex justify-between items-center"
          } `}
        >
          <Link href={"/"}>
            <div
              className={`relative w-28   ${
                verticalMenu ? "h-6 sm:h-8 mt-2" : "h-6"
              }`}
            >
              <Image
                src={`/images/logo/logo${
                  themeCookie === "light" ? "dark" : "white"
                }.png`}
                fill
                objectFit="contain"
                alt="brain up"
              />
            </div>
          </Link>
          <div>
            <div className="hidden sm:block">
              <ul className="flex my-1 text-sm">
                {links.map((link) => (
                  <li
                    key={link.id}
                    className="mx-3 cursor-pointer capitalize hover:text-sky-600 relative group py-3"
                  >
                    <Link href={link.slug}>{link.id}</Link>
                    {link.child !== undefined && (
                      <ul className="font-medium text-_darkblue pl-5 absolute top-10 -left-3 w-[150px] bg-white border rounded hidden group-hover:block">
                        {link.child.map((child) => (
                          <li
                            key={child.id}
                            className="capitalize my-2 cursor-pointer hover:text-_pink"
                          >
                            <Link href={child.slug}>{child.id}</Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <div className="sm:hidden mr-5 w-6 h-6">
              <Hamburger openMenu={open} setOpenMenu={setOpen} />
            </div>
          </div>
        </div>
      </div>
      <div
        className={`fixed z-10 w-full h-screen top-0 left-0 bg-white dark:bg-_bg_dark px-10 pt-[60px] ${
          open ? "block sm:hidden" : "hidden"
        }`}
      >
        <ul className="text-lg font-semibold">
          {links.map((link) => (
            <>
              <li
                key={link.id}
                className="capitalize my-2 cursor-pointer border-b hover:text-_pink"
              >
                <Link href={link.slug}>{link.id}</Link>
              </li>
              <ul className="text-base font-medium pl-5">
                {link.child !== undefined &&
                  link.child.map((child) => (
                    <li
                      key={child.id}
                      className="capitalize my-2 cursor-pointer hover:text-_pink"
                    >
                      <Link href={child.slug}>{child.id}</Link>
                    </li>
                  ))}
              </ul>
            </>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Navbar;
