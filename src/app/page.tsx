import type { NextPage } from "next";
import LinkButton from "../components/LinkButton";
import { AiFillGithub } from "react-icons/ai";
import userData from "../constants/data";
import About from "../components/About";
import Projects from "../components/Projects";
import { MdEmail } from "react-icons/md";
import { AiFillPhone } from "react-icons/ai";

const Home: NextPage = () => {
  return (
    <>
      <About />
      <Projects />
      <div className="flex justify-center">
        <LinkButton
          icon={<AiFillGithub />}
          href={userData.socialLinks.github}
          text="My GitHub"
        />
      </div>
      <div className="max-w-6xl mx-auto p-5 sm:p-10">
        {/* contact methods */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-row items-center gap-4 rounded-md border hover:border-theme p-5 text-sm bg-card text-midText">
            <MdEmail />
            <span>{userData.contact.email}</span>
          </div>
          <div className="flex flex-row items-center gap-4 rounded-md border hover:border-theme p-5 text-sm bg-card text-midText">
            <AiFillPhone />
            <span>{userData.contact.phone}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
