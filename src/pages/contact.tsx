import type { NextPage } from "next";
import Head from "next/head";
import Layout from "../components/layout";
import userData from "../constants/data";
import { MdEmail } from "react-icons/md";
import { AiFillPhone } from "react-icons/ai";
import KeyButtons from "../components/KeyButtons";

const About: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>About Me</title>
      </Head>

      <div className=" w-full max-w-6xl mx-auto">
        <h1 className="text-6xl lg:text-9xl max-w-lg font-bold text-gray-500 py-5 dark:text-gray-500 text-center">
          Contact
        </h1>
        <KeyButtons />
      </div>
    </Layout>
  );
};

export default About;
