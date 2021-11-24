import React from "react";
import userData from "../constants/data";

import { MdEmail } from "react-icons/md";
import { AiOutlineDownload } from "react-icons/ai";
import LinkButton from "./LinkButton";

export default function Hero() {
  return (
    <div className="">
      {/* Text container */}

      <div className="flex flex-col text-center gap-2 md:gap-4 md:p-10">
        <h1 className="text-4xl md:text-8xl font-bold text-gray-700 dark:text-gray-200 my-2">
          {userData.name}
        </h1>
        <h2 className="text-4xl text-gray-700 dark:text-gray-200 my-2">
          {userData.designation}
        </h2>
        <div className="flex flex-col sm:flex-row items-center flex-auto sm:justify-evenly">
          <LinkButton
            href={`mailto:${userData.contact.email}`}
            text="Contact Me"
            icon={<MdEmail />}
          />
          <LinkButton
            href="/files/Halbach_resume.pdf"
            text="Resume"
            icon={<AiOutlineDownload />}
          />
        </div>
      </div>
      {/* Image container */}
      {/* <div className="hidden lg:block relative w-full md:w-1/2 -mr-40 mt-20">
        <div className="w-3/4 ">
          <img src={userData.avatarUrl} alt="avatar" className=" shadow" />
          <div className="flex flex-row justify-between mt-4">
            <div className="flex flex-row space-x-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-arrow-90deg-up"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M4.854 1.146a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L4 2.707V12.5A2.5 2.5 0 0 0 6.5 15h8a.5.5 0 0 0 0-1h-8A1.5 1.5 0 0 1 5 12.5V2.707l3.146 3.147a.5.5 0 1 0 .708-.708l-4-4z"
                />
              </svg>
              <p className="font-mono">That's me</p>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}
