import { PersonalInfo, Project, TimelineItem, SkillCategory } from '../types';

export const personalInfo: PersonalInfo = {
  name: "Hisham Imran",
  shortName: "Hisham",
  university: "Institute of Space Technology (IST), Islamabad",
  degree: "BS Computer Science",
  roles: [
    "Computer Science Student @ IST",
    "Web Developer",
    "Software Systems Enthusiast"
  ],
  oneSentenceBio: "Computer Science student at the Institute of Space Technology (IST), Islamabad, focused on web development, software systems, and modern technology.",
  fullBio: "I am Hisham Imran, currently pursuing a Bachelor of Science in Computer Science at the Institute of Space Technology (IST), Islamabad. I am passionate about web development, software engineering principles, algorithms, and creating responsive web applications.",
  location: "Islamabad, Pakistan",
  email: "khanhisham792@gmail.com",
  github: "https://github.com/HishamImran",
  linkedin: "https://www.linkedin.com/in/hisham-imran-69aa053a4?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
  resumeUrl: "/resume.pdf",
  stats: [
    {
      label: "Projects Built",
      value: 5,
      suffix: "",
      description: "Total projects built"
    },
    {
      label: "Focus Area",
      value: 2,
      prefix: "",
      suffix: "nd Year CS",
      description: "BS Computer Science @ IST Islamabad"
    }
  ]
};

export const featuredProjects: Project[] = [
  {
    id: "ict-final-project",
    title: "ICT Final Project — Fashion Vault",
    oneLiner: "A multi-page responsive web portal built for Information & Communication Technology coursework at IST.",
    role: "Full-Stack Web Developer",
    featured: true,
    category: "Full Stack",
    tags: ["HTML5", "CSS3", "JavaScript", "Web Development"],
    githubUrl: "https://github.com/HishamImran/ICT-Final-Project",
    metrics: "Multi-Page Responsive Web Portal",
    problem: "Creating an intuitive, multi-category web platform for fashion apparel requiring dedicated catalog navigation across Men, Women, and Kids categories.",
    approach: "Designed modular semantic HTML page structures styled with responsive CSS rules, custom navigation header bars, and customer review sections.",
    result: "Successfully delivered and presented as the Information & Communication Technology (ICT) final coursework project at IST Islamabad.",
    architectureHighlights: [
      "Multi-category product catalog layout (Men, Women, Kids)",
      "Custom CSS styling with navigation hover effects",
      "Interactive customer feedback & review submission page"
    ]
  }
];

export const secondaryProjects: Project[] = [
  {
    id: "easyrent",
    title: "EasyRent",
    oneLiner: "Collaborative vehicle & property rental platform project.",
    role: "Collaborator",
    featured: false,
    category: "Web App",
    tags: ["Collaboration", "GitHub"],
    githubUrl: "https://github.com/abdulhannansajid90/Easyrent",
    metrics: "Code Repository",
    problem: "Developing an accessible rental platform as part of a collaborative effort.",
    approach: "Contributed to the codebase hosted on GitHub.",
    result: "See repository for source code and details.",
    architectureHighlights: []
  },
  {
    id: "pro-pk",
    title: "pro-pk",
    oneLiner: "Collaborative software project on GitHub.",
    role: "Collaborator",
    featured: false,
    category: "Software",
    tags: ["Collaboration", "GitHub"],
    githubUrl: "https://github.com/HishamImran/pro-pk",
    metrics: "Code Repository",
    problem: "Open source software development.",
    approach: "Contributed to the codebase hosted on GitHub.",
    result: "See repository for source code and details.",
    architectureHighlights: []
  },
  {
    id: "lan-ip-identifier",
    title: "LAN-IP-Identifier",
    oneLiner: "Networking utility for LAN IP identification.",
    role: "Collaborator",
    featured: false,
    category: "Networking",
    tags: ["Collaboration", "GitHub"],
    githubUrl: "https://github.com/abdulhannansajid90/LAN-IP-Identifier",
    metrics: "Code Repository",
    problem: "Identifying IP addresses across a Local Area Network.",
    approach: "Collaborated on the development of the identifier utility.",
    result: "See repository for source code and details.",
    architectureHighlights: []
  },
  {
    id: "suparco-management-system",
    title: "Suparco Management System",
    oneLiner: "Programming Fundamentals Final Project.",
    role: "Collaborator",
    featured: false,
    category: "Software",
    tags: ["Collaboration", "C++"],
    githubUrl: "https://github.com/HishamImran/Suparco-Management-system",
    metrics: "Code Repository",
    problem: "Building a management system for a university final project.",
    approach: "Developed using Programming Fundamentals concepts.",
    result: "See repository for source code and details.",
    architectureHighlights: []
  }
];

export const timelineData: TimelineItem[] = [
  {
    id: "ist-education",
    title: "BS Computer Science",
    organization: "Institute of Space Technology (IST), Islamabad",
    location: "Islamabad, Pakistan",
    period: "2024 — Present",
    type: "Education",
    description: "Currently studying Computer Science at IST Islamabad. Learning core computer science fundamentals, web development, data structures, and programming concepts.",
    highlights: [
      "Coursework: Information & Communication Technology (ICT), Programming Fundamentals, Computer Science Basics",
      "Built multi-page web applications for coursework assignments",
      "Active participant in department computing activities"
    ],
    badge: "BS CS Student"
  }
];

export const skillCategories: SkillCategory[] = [
  {
    title: "Languages & Web",
    skills: [
      { name: "HTML5", level: "Proficient", projectIds: ["ict-final-project"] },
      { name: "CSS3", level: "Proficient", projectIds: ["ict-final-project"] },
      { name: "JavaScript", level: "Intermediate", projectIds: ["ict-final-project"] },
      { name: "C++", level: "Intermediate", projectIds: [] },
      { name: "Python", level: "Intermediate", projectIds: [] }
    ]
  },
  {
    title: "Tools & Platforms",
    skills: [
      { name: "Git & GitHub", level: "Proficient", projectIds: ["ict-final-project"] },
      { name: "VS Code", level: "Advanced", projectIds: ["ict-final-project"] },
      { name: "Responsive Web Design", level: "Proficient", projectIds: ["ict-final-project"] }
    ]
  }
];
