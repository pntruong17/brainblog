import React, { useRef } from "react";

const Hamburger = ({ openMenu, setOpenMenu }) => {
  const menuRef = useRef();

  const clickMenu = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <>
      <div
        ref={menuRef}
        onClick={clickMenu}
        className="cursor-pointer relative w-6 h-6"
      >
        <div
          className={`absolute  w-6 h-0.5 bg-gray-800 dark:bg-white rounded-sm ${
            !openMenu ? "top-1" : "top-2 rotate-45  "
          } transition-transform`}
        ></div>

        <div
          className={`absolute  w-6 h-0.5 bg-gray-800 dark:bg-white rounded-sm ${
            !openMenu ? "top-3" : "top-2 -rotate-45  "
          } transition-transform`}
        ></div>
      </div>
    </>
  );
};

export default Hamburger;
