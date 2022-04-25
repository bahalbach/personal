import type { NextPage } from "next";
import Head from "next/head";
import FavouriteProjects from "../components/FavoriteProjects";
import Hero from "../components/Hero";
import Layout from "../components/layout";
import LinkButton from "../components/LinkButton";
import { AiFillGithub } from "react-icons/ai";
import userData from "../constants/data";
import About from "../components/About";
import Projects from "../components/Projects";
import { MdEmail } from "react-icons/md";
import { AiFillPhone } from "react-icons/ai";

const Home: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Ben Halbach</title>
      </Head>
      <About />
      <Projects />
      {/* <Hero />
      <FavouriteProjects />
  */}
      <div className="flex justify-center">
        <LinkButton
          icon={<AiFillGithub />}
          href={userData.socialLinks.github}
          text="My Github"
        />
      </div> 
      <div className="max-w-6xl mx-auto p-5 sm:p-10">
        {/* contact methods */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-row items-center gap-4 rounded-md border hover:border-blue-500 p-5 text-sm dark:bg-gray-900 bg-gray-100 dark:text-gray-200">
            <MdEmail />
            <span>{userData.contact.email}</span>
          </div>
          <div className="flex flex-row items-center gap-4 rounded-md border hover:border-blue-500 p-5 text-sm dark:bg-gray-900 bg-gray-100 dark:text-gray-200">
            <AiFillPhone />
            <span>{userData.contact.phone}</span>
          </div>
        </div>
        
      </div>
    </Layout>
  );
};

export default Home;
