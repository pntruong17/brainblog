/* eslint-disable @next/next/no-img-element */
import React from "react";

const BlogHeader = (props) => {
  const { createdAt, author } = props;
  const createdDate = new Date(createdAt);
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return (
    <div className="flex">
      <div className="flex flex-col">
        <p className="font-semibold text-[1rem]"> {"author.name"} </p>
        <div className="flex flex-wrap">
          <li className="list-none font-normal text-[0.85rem] md:mr-4 sm:mr-0">
            {`author.url`}
          </li>
          <li className="list-none font-normal text-[0.85rem]">
            {`createdDate.toLocaleDateString("en-US", options)`}
          </li>
        </div>
      </div>
    </div>
  );
};

export default BlogHeader;
