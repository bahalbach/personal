import React from "react";
import Image from "next/image";
import userData from "../constants/data";
import LinkButton from "./LinkButton";
import { AiFillGithub } from "react-icons/ai";
import { GiLookAt } from "react-icons/gi";

function ProjectBody({
  href,
  github,
  description,
  techUsed,
}: {
  href: string;
  github: string;
  description: string[];
  techUsed: string[];
}) {
  return (
    <React.Fragment>
      <div className="flex flex-row items-center flex-auto justify-evenly">
        <LinkButton
          href={href}
          text="See in action"
          text_size="text-sm"
          icon={<GiLookAt />}
        />
        <LinkButton
          href={github}
          text="Project GitHub"
          text_size="text-sm"
          icon={<AiFillGithub />}
        />
      </div>
      {description.map((paragraph) => {
        return (
          <p
            className="text-base text-gray-700 dark:text-gray-300"
            key={paragraph}
          >
            {paragraph}
          </p>
        );
      })}

      <div className="flex justify-evenly gap-5 flex-wrap">
        {techUsed.map((tech) => {
          return (
            <p key={tech} className="text-sm text-gray-800 dark:text-gray-200">
              {tech}
            </p>
          );
        })}
      </div>
    </React.Fragment>
  );
}

export default function Projects() {
  return (
    <div className="w-full max-w-6xl mx-auto">
      <h1 className="text-6xl lg:text-9xl max-w-lg font-bold text-gray-500 py-5 dark:text-gray-500 text-center lg:mb-5">
        Projects
      </h1>

      {userData.majorProjects.map(
        ({ name, photo, description, href, github, techUsed }) => {
          return (
            <div
              className="flex flex-col md:flex-row md:items-center py-10 sm:mx-5 shadow-xl rounded-md bg-gray-100 dark:bg-gray-700 my-10"
              key={name}
            >
              <div className="w-full md:w-1/2  relative px-5">
                <a href={href}>
                  {/* <Image
                    src="/vercel.svg"
                    alt="Vercel Logo"
                    className="dark:invert"
                    width={100}
                    height={24}
                    priority
                  /> */}
                  <Image src={photo} alt={name} width={516} height={250} className="w-full" />
                </a>
              </div>
              <div className="w-full md:w-1/2 px-5 my-2 md:my-0 space-y-4">
                <a href={href}>
                  <h2 className="text-lg md:text-2xl font-semibold text-gray-800 dark:text-gray-200">
                    {name}
                  </h2>
                </a>
                <ProjectBody
                  href={href}
                  github={github}
                  description={description}
                  techUsed={techUsed}
                />
              </div>
            </div>
          );
        }
      )}
      <h1 className="text-3xl lg:text-6xl max-w-lg font-bold text-gray-500 py-5 dark:text-gray-500 text-center lg:mb-5">
        Other Projects
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 my-10 gap-10 sm:mx-5">
        {userData.minorProjects.map(
          ({ name, description, href, github, techUsed }) => {
            return (
              <div className="w-full" key={name}>
                <div className="w-full p-5 shadow-sm bg-gray-100 dark:bg-gray-700 space-y-5">
                  <a href={href}>
                    <h2 className="text-lg md:text-2xl font-semibold text-gray-800 dark:text-gray-200">
                      {name}
                    </h2>
                  </a>
                  <ProjectBody
                    href={href}
                    github={github}
                    description={description}
                    techUsed={techUsed}
                  />
                </div>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}
