import type { NextPage } from "next";
import Head from "next/head";

import Layout from "../components/layout";
import AboutSection from "../components/About";

const About: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>About Me</title>
      </Head>
      <AboutSection />
    </Layout>
  );
};

export default About;
