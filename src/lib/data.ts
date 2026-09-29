export const profile = {
  name: "Aman Joshi",
  role: "Full Stack Developer",
  location: "Lalitpur, Sanepa, Nepal",
  phone: "9762303180",
  email: "aman.joshi6915@gmail.com",
  linkedin: "https://www.linkedin.com/in/aman-joshi-1a20a0252",
  github: "https://github.com/Aman2132",
  summary:
    "Computer Engineering graduate with 2+ years of experience building production Java and Node.js backends, IoT systems, and modern frontends with Angular, React, and Next.js. I like owning things end to end — from schema and transaction logic to the pixels that ship.",
  longSummary:
    "I'm a full stack developer at Mentor Friends, where I review code, help ship production-ready applications, and mentor newer engineers. My core strength is backend systems — transaction management, payment gateway integrations, and third-party API work — but I move comfortably across the stack into React, Next.js, and Angular frontends. Outside of client work I build IoT prototypes and mobile apps for fun.",
  statement:
    "Transaction systems, payment gateways, and the interfaces on top of them — built end to end.",
};

export type Experience = {
  company: string;
  role: string;
  location: string;
  period: string;
  current: boolean;
  bullets: string[];
  clientWork: {
    name: string;
    url: string;
    description: string;
    tags: string[];
  }[];
};

export const experience: Experience[] = [
  {
    company: "Mentor Friends",
    role: "Full Stack Developer",
    location: "Trade Tower, Thapathali",
    period: "04/2024 — Present",
    current: true,
    bullets: [
      "Review code and help make applications production-ready across multiple client projects.",
      "Mentor freshers on backend architecture, Git workflow, and debugging.",
      "Work primarily on backend systems: transaction management, third-party API integration, and payment gateway integrations.",
      "Ship frontend features in React and Next.js alongside backend work when a project needs full-stack ownership.",
    ],
    clientWork: [
      {
        name: "a2aorchestra.com",
        url: "https://a2aorchestra.com",
        description:
          "Agent orchestration platform. Focused on the Node.js backend — token consumption tracking and the transaction management system behind agent usage billing.",
        tags: ["Node.js", "Transaction Systems", "Backend"],
      },
      {
        name: "sleepinghats.com",
        url: "http://sleepinghats.com",
        description:
          "Commercial e-commerce site selling sleeping hats. Built out the frontend and integrated the payment gateway end to end.",
        tags: ["Frontend", "E-commerce", "Payment Gateway"],
      },
      {
        name: "BoomMarket",
        url: "https://boomconsole.com/market",
        description:
          "Marketplace product under BoomConsole. Handled transaction integration and frontend development.",
        tags: ["Frontend", "Transaction Integration"],
      },
      {
        name: "BoomConsole",
        url: "https://boomconsole.com",
        description:
          "A combined project management, CRM, and extensions platform — worked across the product surface, not a single isolated feature.",
        tags: ["Project Management", "CRM", "Full Stack"],
      },
    ],
  },
];

export type Project = {
  name: string;
  period: string;
  location: string;
  description: string;
  bullets: string[];
  tags: string[];
  status: "ongoing" | "complete";
  badge?: string;
  url?: string;
};

export const projects: Project[] = [
  {
    name: "Site Tracker",
    period: "2025 — Ongoing",
    location: "Personal Project",
    description:
      "Expo / React Native / TypeScript app for construction site owners: crew location tracking and geotagged site camera for their workers.",
    bullets: [
      "Role-based owner and worker experiences: live crew map, site/crew/photo management for owners, and a camera + activity flow for workers.",
      "Geotags photos by embedding GPS EXIF data on capture, using expo-camera and expo-location.",
      "Clean architecture split — services own device I/O, controllers own orchestration, Zustand stores own state, and a mocked api/ layer stands in for the eventual backend.",
    ],
    tags: ["React Native", "Expo", "TypeScript", "Zustand", "expo-location"],
    status: "ongoing",
    url: "https://github.com/Aman2132/Site-tracker",
  },
  {
    name: "Employee Management System",
    period: "01/2023 — Present",
    location: "Lalitpur, Sanepa",
    description:
      "Full stack employee management app with authentication and complete CRUD operations for managing staff records.",
    bullets: [
      "Built login authentication from scratch alongside employee add, update, delete, and view operations.",
    ],
    tags: ["Java", "JDBC", "MySQL", "Full Stack"],
    status: "complete",
  },
  {
    name: "IoT Based Smart Parking System",
    period: "Internship Project — 01/2022",
    location: "Internship Project",
    description:
      "Smart parking prototype combining embedded sensors with automated gate control.",
    bullets: [
      "Used IR sensors for vehicle detection and a servo motor for automated gate control.",
    ],
    tags: ["IoT", "Embedded Systems", "Sensors"],
    status: "complete",
  },
  {
    name: "Localized Air Quality Monitoring System",
    period: "Final Year Project — 2022",
    location: "RR Institution of Technology",
    description:
      "Final year capstone project — awarded Best Project in college. Real-time air quality monitoring with location display, built to be portable.",
    bullets: [
      "Built user registration, login, and real-time air quality monitoring with live location display.",
      "Designed to be vehicle- or drone-mountable for real-time, location-tagged air quality readings.",
    ],
    tags: ["IoT", "Sensors", "Real-time Data"],
    status: "complete",
    badge: "Best Project Award",
  },
];

export const skills = {
  frontend: ["JavaScript", "TypeScript", "React", "React Native", "Expo", "Next.js", "Angular", "HTML", "CSS", "Bootstrap"],
  backend: [
    "Java",
    "JDBC",
    "Node.js",
    "ExpressJS",
    "Fastify",
    "MySQL",
    "Graph Databases",
    "Transaction Management",
    "Payment Gateway Integration",
    "IoT",
    "Git",
  ],
  soft: ["Teamwork", "Communication", "Public Speaking", "Decision-making", "Leadership"],
};

export type EducationItem = {
  school: string;
  program: string;
  location: string;
  period: string;
  detail?: string;
};

export const education: EducationItem[] = [
  {
    school: "RR Institution of Technology",
    program: "Computer Engineering",
    location: "Bangalore, India",
    period: "01/2019 — 06/2023",
    detail: "7.53 GPA in Computer Engineering",
  },
  {
    school: "KMC National",
    program: "Science",
    location: "Kathmandu, Nepal",
    period: "01/2017 — 12/2019",
    detail: "80%",
  },
];
