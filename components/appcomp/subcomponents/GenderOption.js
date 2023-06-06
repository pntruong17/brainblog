import React from "react";

const GenderOption = ({ setGender }) => {
  return (
    <>
      <select
        id="gender"
        className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        onChange={(e) => {
          const temp = e.target.value;
          setGender(temp);
        }}
        defaultValue={""}
      >
        <option value="" disabled="disabled">
          Select Gender
        </option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
    </>
  );
};

export default GenderOption;
