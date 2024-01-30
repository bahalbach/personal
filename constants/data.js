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
      "I'm a software engineer who has been programming since 2010. I'm recently proud of the work I did making a customizable multi-tenant application with components for the site and customization tool UI automatically generated from the customization schema.",
    qualities: [
      {
        tag: "programming languages",
        description:
          "I have been using Python and TypeScript the most recently, but I am excited about learning and using new programming languages and frameworks. ",
      },
      // {
      //   tag: "touched tech",
      //   description: "SQS, neo4j, elasticsearch, mongoDB, graphQL, postgreSQL/mySQL/SQL, react, redux, redux saga, nextjs, express, django, flask, jinja, fastAPI, gin, Python, Go, Javascript, Typescript, Looker Studio"
      // },
      // {
      //   tag: "Machine Learning",
      //   description:
      //     "I have had an interest in Machine Learning and enjoy studying the math behind it as a hobby. I am currently working on analyzing NBA data with TensorFlow and Scikit-learn.",
      // },
      {
        tag: "University",
        description:
          "I received a full scholarship to attend university and I was eligible to graduate with a degree in Computer Science after just two years, but I decided to spend a year abroad studying mathematics.",
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
      description: [
        "Calculate and graph the results of different attack routines in the Pathfinder role-playing game. It computes a full probability distibution of damage while progressing through user determined descision trees depepending on the outcomes of previous attacks.",
        "This tool currently has over 100 users a month as it provides an easy way to input and display the effectivness of various options.",
      ],
      href: "https://bahalbach.github.io/PF2Calculator",
      github: "https://github.com/bahalbach/PF2Calculator",
      techUsed: ["Typescript", "React", "Redux", "Material UI"],
      photo: "/../public/images/pf2calculator.png",
    },
  ],
  minorProjects: [
    {
      name: "Personal Webpage",
      description: [
        "A website to act as a portfolio.",
        "I wanted to try out structuring a website with Next instead of React Router, but now that this is a single page portfolio that seems a bit excessive.",
      ],
      href: "/",
      github: "https://github.com/bahalbach/personal",
      techUsed: ["React", "Next.js", "Tailwind CSS"],
    },
    {
      name: "Lists",
      description: [
        "Nested lists with drag and drop reorganization.",
        "I wanted a way to hierarchically organize notes, and the drag and drop feature is key to reorganizing them. But I stopped development on this because the gains from the hierarchical representation are not work extra hassle added to creating and editing notes.",
      ],
      href: "https://bahalbach.github.io/lists/",
      github: "https://github.com/bahalbach/lists",
      techUsed: ["React", "Redux"],
    },

    {
      name: "Vipkid Service Fee Calculator",
      description: [
        "A tool to calculate service fee income for Vipkid teachers.",
        "VIPKid changed to a progressive bonus structure which was complicated to calculate by hand, so I built this tool to allow teachers to easily see how much money they would make.",
      ],
      href: "https://bahalbach.github.io/vipkid",
      github:
        "https://github.com/bahalbach/bahalbach.github.io/blob/master/vipkid.html",
      techUsed: ["Javascript", "HTML"],
    },
  ],
};

export default userData;
