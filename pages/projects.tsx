import type { NextPage } from "next";
import Head from "next/head";
import Layout from "../components/layout";
import ProjectSection from "../components/Projects";
import userData from "../constants/data";
import pf2calculator from "../public/images/pf2calculator.png";
import Image from "next/image";

const Projects: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Projects</title>
      </Head>

      <ProjectSection />
    </Layout>
  );
};

export default Projects;
