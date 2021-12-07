import React from "react";
import userData from "../constants/data";

import { MdEmail } from "react-icons/md";
import { AiOutlineDownload } from "react-icons/ai";
import LinkButton from "./LinkButton";

export default function KeyButtons() {
  return (
    <div className="flex flex-col sm:flex-row items-center flex-auto sm:justify-evenly">
      <LinkButton
        href={`mailto:${userData.contact.email}`}
        text="Contact Me"
        icon={<MdEmail />}
      />
      <LinkButton
        href="/files/Halbach_resume.pdf"
        text="Resume"
        icon={<AiOutlineDownload />}
      />
    </div>
  );
}
