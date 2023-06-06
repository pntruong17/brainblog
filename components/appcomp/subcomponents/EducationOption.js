import React from "react";

const EducationOption = ({ setEducation }) => {
  return (
    <>
      <select
        className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        id="education"
        name="education"
        onChange={(e) => {
          const temp = e.target.value;
          setEducation(temp);
        }}
        defaultValue={""}
      >
        <option value="" disabled="disabled">
          Select Education
        </option>
        <option value="No formal education">No formal education</option>
        <option value="Primary education">Primary education</option>
        <option value="Secondary education">
          Secondary education or high school
        </option>
        <option value="GED">GED</option>
        <option value="Vocational qualification">
          Vocational qualification
        </option>
        <option value="Bachelor's degree">Bachelor&apos;s degree</option>
        <option value="Master's degree">Master&apos;s degree</option>
        <option value="Doctorate or higher">Doctorate or higher</option>
      </select>
    </>
  );
};

export default EducationOption;
