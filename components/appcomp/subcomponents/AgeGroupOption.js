import React from "react";

const AgeGroupOption = ({ setAgeGroup }) => {
  return (
    <>
      <select
        id="age"
        className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        onChange={(e) => {
          const temp = e.target.value;
          setAgeGroup(temp);
        }}
        defaultValue={""}
      >
        <option value="" disabled="disabled">
          Select Age Group
        </option>
        <option value="< 18">&#60; 18</option>
        <option value="19 - 39">19 - 39</option>
        <option value="40 - 59">40 - 59</option>
        <option value="60 - 79">60 - 79</option>
        <option value="> 80">&#62; 80</option>
      </select>
    </>
  );
};

export default AgeGroupOption;
