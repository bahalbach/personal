import type { NextPage } from "next";
import Head from "next/head";
import FavouriteProjects from "../components/FavoriteProjects";
import Hero from "../components/Hero";
import Layout from "../components/layout";
import LinkButton from "../components/LinkButton";
import { AiFillGithub } from "react-icons/ai";
import userData from "../constants/data";

const Home: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Ben Halbach</title>
      </Head>
      <Hero />
      <FavouriteProjects />
      <div className="flex justify-center">
        <LinkButton
          icon={<AiFillGithub />}
          href={userData.socialLinks.github}
          text="My Github"
        />
      </div>
    </Layout>
  );
};

export default Home;
