const userData = {
  name: "Ben Halbach",
  designation: "Software Engineer",
  contact: {
    email: "bahalbach@gmail.com",
    phone: "+886 9090 45249",
  },
  socialLinks: {
    linkedin: "https://www.linkedin.com/in/bahalbach/",
    github: "https://github.com/bahalbach",
  },
  about: {
    intro: "Hi, I'm Ben Halbach.",
    title:
      "I'm a software engineer who has been programming since 2010, worked professionally with C++, and developed personal projects in javascript and python.",
    qualities: [
      {
        tag: "programming languages",
        description:
          "I have been using Python and Javascript the most recently, but I am excited about learning and using new programming languages and frameworks. ",
      },
      {
        tag: "Machine Learning",
        description:
          "I have had an interest in Machine Learning and enjoy studying the math behind it as a hobby. A new project demonstrating that will be coming soon.",
      },
      {
        tag: "languages",
        description:
          "I am a native English speaker and I have been learning Chinese while living in Taiwan for the past few years. I passed the TOCFL Band C Level 5 test for Chinese listening.",
      },
    ],
  },
  majorProjects: [
    {
      name: "Pathfinder Damage Calculator",
      description:
        "Calculate and graph the results of different attack routines in the Pathfinder role-playing game. It computes a full probability distibution of damage while progressing through user determined descision trees depepending on the outcomes of previous attacks.",
      href: "https://bahalbach.github.io/PF2Calculator",
      github: "https://github.com/bahalbach/PF2Calculator",
      techUsed: ["Typescript", "React", "Redux", "Material UI"],
      photo: "/../public/images/pf2calculator.png",
    },
  ],
  minorProjects: [
    {
      name: "Personal Webpage",
      description: "A website to act as a portfolio.",
      href: "/",
      github: "",
      techUsed: ["React", "Next.js", "Tailwind CSS"],
    },
    {
      name: "Lists",
      description: "Nested lists with drag and drop reorganization.",
      href: "https://bahalbach.github.io/lists/",
      github: "https://github.com/bahalbach/lists",
      techUsed: ["React", "Redux"],
    },

    {
      name: "Vipkid Service Fee Calculator",
      description:
        "A tool to calculate service fee income for Vipkid teachers.",
      href: "https://bahalbach.github.io/vipkid",
      github:
        "https://github.com/bahalbach/bahalbach.github.io/blob/master/vipkid.html",
      techUsed: ["Javascript", "HTML"],
    },
  ],
};

export default userData;
