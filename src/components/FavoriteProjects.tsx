import React from "react";
import Image from "next/image";
import pf2calculator from "../public/images/pf2calculator.png";
import userData from "../constants/data";

export default function FavoriteProjects() {
  return (
    <div className="bg-gray-200  dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        {/* <header className="flex flex-col md:flex-row justify-between items-center  mx-10 md:my-20 lg:my-0"> */}
        <h1 className="text-6xl lg:text-9xl max-w-lg font-bold text-gray-500 py-5 dark:text-gray-500 text-center">
          Favorite Project
        </h1>
        {/* <Link href="/projects">
            <a className="mb-20 md:mb-0 px-8 py-4 rounded-md bg-white shadow-lg text-xl font-semibold flex flex-row space-x-4 items-center dark:text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-arrow-up-right-square"
                stroke="4"
                strokeWidth="4"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm5.854 8.803a.5.5 0 1 1-.708-.707L9.243 6H6.475a.5.5 0 1 1 0-1h3.975a.5.5 0 0 1 .5.5v3.975a.5.5 0 1 1-1 0V6.707l-4.096 4.096z"
                />
              </svg>
              <p>View all</p>
            </a>
          </Link> */}
        {/* </header> */}

        {/* Grid starts here */}
        <div className="grid md:grid-cols-3 gap-8 pb-10">
          {/* Single card */}
          <a
            href={userData.majorProjects[0].href}
            className="w-full block col-span-3"
          >
            <div className=" relative overflow-hidden py-5 sm:px-5">
              <Image
                src={pf2calculator}
                alt={userData.majorProjects[0].name}
                className="transform hover:scale-125 transition duration-1000 ease-out"
              />
              <h1 className="absolute top-10 left-5 sm:left-10 text-gray-50 font-bold text-lg sm:text-xl bg-red-500 rounded-md px-2">
                {userData.majorProjects[0].name}
              </h1>
            </div>
          </a>

          {/* Single card */}
          {/* <a
            href="https://placeholdertech.in"
            className="w-full block col-span-3  sm:col-span-2 shadow-2xl"
          >
            <div className="relative overflow-hidden">
              <img
                src="/placeholdertech.png"
                alt="portfolio"
                className="transform hover:scale-125 transition duration-2000 ease-out"
              />
              <h1 className="absolute top-10 left-10 text-gray-50 font-bold text-xl bg-red-500 rounded-md px-2">
                PlaceholderTech
              </h1>
              <h1 className="absolute bottom-10 left-10 text-gray-50 font-bold text-xl">
                02
              </h1>
            </div>
          </a> */}
          {/* Single card */}
          {/* <a
            href="https://manuarora.in"
            className="w-full block col-span-3 sm:col-span-1  object-cover"
          >
            <div className="relative overflow-hidden shadow-2xl">
              <img
                src="/portfolio.png"
                alt="portfolio"
                className="transform hover:scale-125 transition duration-2000 ease-out object-cover shadow-2xl"
              />
              <h1 className="absolute top-10 left-10 text-gray-50 font-bold text-xl bg-red-500 rounded-md px-2">
                Portfolio
              </h1>
              <h1 className="absolute bottom-10 left-10 text-gray-50 font-bold text-xl">
                03
              </h1>
            </div>
          </a> */}
        </div>
      </div>
    </div>
  );
}
