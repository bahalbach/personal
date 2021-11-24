import type { NextPage } from "next";
import Head from "next/head";
import Layout from "../components/layout";
import userData from "../constants/data";

const About: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>About Me</title>
      </Head>
      <div className="bg-gray-200  dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-6xl lg:text-9xl max-w-lg font-bold text-gray-500 py-5 dark:text-gray-500 text-center">
            About Me
          </h1>
          <div className="text-container max-w-6xl mx-auto pt-20">
            <p className="leading-loose text-2xl md:text-4xl font-semibold dark:text-gray-300 mx-4">
              {userData.about.title}
            </p>
          </div>
          <div className="pt-20 grid grid-cols-1 md:grid-cols-3 max-w-6xl mx-auto gap-y-20 gap-x-20 px-4">
            <div className="col-span-1 md:col-span-2">
              {userData.about.description?.map((desc, idx) => (
                <p
                  key={idx}
                  className="text-xl text-gray-700 mb-4 dark:text-gray-300 "
                >
                  {desc}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
