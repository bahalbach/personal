import type { NextPage } from "next";
import Head from "next/head";
import Layout from "../components/layout";
import userData from "../constants/data";
import { MdEmail } from "react-icons/md";
import { AiFillPhone } from "react-icons/ai";

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
      </div>
      <div className="max-w-6xl mx-auto p-5 sm:p-10">
        <div className="grid md:grid-cols-2 gap-5">
          {/* contact methods */}
          <div className="flex flex-col">
            <div className="flex flex-row items-center gap-4 rounded-md border hover:border-blue-500 p-5 text-sm">
              <MdEmail />
              <span>{userData.contact.email}</span>
            </div>
            <div className="flex flex-row items-center gap-4 rounded-md border hover:border-blue-500 p-5 text-sm">
              <AiFillPhone />
              <span>{userData.contact.phone}</span>
            </div>
          </div>
          {/* contact form */}
          {/* <div className="max-w-min">
            <form className="rounded-lg bg-white p-4 flex flex-col">
              <label htmlFor="name" className="text-sm text-gray-600 mx-4">
                {" "}
                Your Name
              </label>
              <input
                type="text"
                className="font-light rounded-md border focus:outline-none py-2 mt-2 px-1 mx-4 focus:ring-2 focus:border-none ring-blue-500"
                name="name"
              />
              <label
                htmlFor="email"
                className="text-sm text-gray-600 mx-4 mt-4"
              >
                Email
              </label>
              <input
                type="text"
                className="font-light rounded-md border focus:outline-none py-2 mt-2 px-1 mx-4 focus:ring-2 focus:border-none ring-blue-500"
                name="email"
              />
              <label
                htmlFor="message"
                className="text-sm text-gray-600 mx-4 mt-4"
              >
                Message
              </label>
              <textarea
                rows={4}
                className="font-light rounded-md border focus:outline-none py-2 mt-2 px-1 mx-4 focus:ring-2 focus:border-none ring-blue-500"
                name="message"
              ></textarea>
              <button
                type="submit"
                className="bg-blue-500 rounded-md w-1/2 mx-4 mt-8 py-2 text-gray-50 text-xs font-bold"
              >
                Send Message
              </button>
            </form>
          </div> */}
        </div>
      </div>
    </Layout>
  );
};

export default About;
