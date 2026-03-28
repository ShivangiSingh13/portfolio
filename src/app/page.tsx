"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import {
  AlertCircle,
  ArrowUp,
  Award,
  BarChart3,
  Bot,
  BookOpenCheck,
  BrainCircuit,
  Clock,
  Code2,
  Download,
  ExternalLink,
  Github,
  GitPullRequest,
  Laptop,
  Linkedin,
  Mail,
  Menu,
  Moon,
  Package,
  Search,
  Server,
  SendHorizontal,
  Sparkles,
  Star,
  Sun,
  Trophy,
  Users,
  X,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

const profileLinks = {
  github: "https://github.com/ShivangiSingh13",
  linkedin: "https://www.linkedin.com/in/shivangi131/",
  email: "mailto:2005shivangisingh@gmail.com",
  resume: "/shivangi-cv.pdf",
};

const navItems = [
  "about",
  "education",
  "timeline",
  "skills",
  "projects",
  "profiles",
  "github",
  "certifications",
  "extracurricular",
  "contact",
];

const skillGroups = [
  {
    title: "Languages",
    icon: Code2,
    items: ["Python", "Java", "C++", "C", "JavaScript", "SQL"],
  },
  {
    title: "AI / ML",
    icon: BrainCircuit,
    items: [
      "TensorFlow",
      "Keras",
      "scikit-learn",
      "OpenCV",
      "MediaPipe",
      "Hugging Face",
      "NLP",
      "Computer Vision",
      "Deep Learning",
      "SHAP",
    ],
  },
  {
    title: "Web Development",
    icon: Server,
    items: [
      "MongoDB",
      "Express.js",
      "React.js",
      "Node.js",
      "HTML",
      "CSS",
      "REST APIs",
    ],
  },
  {
    title: "Data & Analytics",
    icon: BarChart3,
    items: [
      "Pandas",
      "NumPy",
      "Matplotlib",
      "Seaborn",
      "Excel",
      "Power BI",
    ],
  },
  {
    title: "Core CS",
    icon: Laptop,
    items: [
      "DSA",
      "Operating Systems",
      "DBMS",
      "Computer Networks",
      "OOP",
    ],
  },
  {
    title: "Soft Skills",
    icon: Users,
    items: [
      "Problem Solving",
      "Team Collaboration",
      "Communication",
      "Adaptability",
      "Time Management",
      "Critical Thinking",
      "Attention to Detail",
      "Self-Learning",
      "Leadership",
      "Creativity",
    ],
  },
];

type ProjectCard = {
  title: string;
  description: string;
  primaryTech: string;
  tech: string[];
  github: string;
  demo?: string;
};

type ProjectDetail = {
  overview: string;
  keyFeatures: string[];
  techStack: {
    frontend: string[];
    backend: string[];
    database: string[];
    aiml: string[];
    tools: string[];
  };
  workflow: string[];
  screenshots: Array<{ src: string; caption: string }>;
  liveDemo?: string;
  challengesAndLearnings: Array<{ challenge: string; solution: string }>;
  futureImprovements: string[];
};

type Certification = {
  title: string;
  description: string;
  proofUrl: string;
};

const projectDetailsByTitle: Record<string, ProjectDetail> = {
  "AI-Based Tuberculosis Detection System": {
    overview:
      "A medical imaging assistant that analyzes chest X-rays and flags tuberculosis risk, helping speed up early screening.",
    keyFeatures: [
      "Image preprocessing and augmentation pipeline",
      "ResNet50 transfer learning classifier",
      "Grad-CAM heatmap for explainability",
      "Interactive inference through desktop and web interfaces",
    ],
    techStack: {
      frontend: ["Gradio", "Tkinter"],
      backend: ["Python"],
      database: ["Local file pipeline"],
      aiml: ["TensorFlow", "Keras", "OpenCV", "ResNet50", "Grad-CAM"],
      tools: ["NumPy", "Matplotlib", "Jupyter Notebook"],
    },
    workflow: [
      "User uploads X-ray image",
      "System normalizes and preprocesses the image",
      "Model predicts TB probability",
      "Grad-CAM generates visual explanation overlay",
      "Result and confidence are displayed to user",
    ],
    screenshots: [
      { src: "/tb-screenshot-1.jpg", caption: "Model prediction interface" },
      { src: "/tb-screenshot-2.jpg", caption: "Grad-CAM visualization output" },
    ],
    challengesAndLearnings: [
      {
        challenge: "Handling noisy and imbalanced X-ray datasets",
        solution: "Used augmentation and tuned class-aware training strategy.",
      },
      {
        challenge: "Making predictions interpretable for non-technical users",
        solution: "Integrated Grad-CAM heatmaps with concise explanation labels.",
      },
    ],
    futureImprovements: [
      "Add multi-disease detection support",
      "Integrate cloud deployment with secure auth",
      "Track model drift with periodic retraining",
    ],
  },
  "CodeCampus Platform": {
    overview:
      "A collaborative coding platform where learners practice problems, share projects, and discuss technical solutions in one space.",
    keyFeatures: [
      "Role-based user authentication",
      "Discussion threads and community posts",
      "Project upload and showcase modules",
      "Coding challenge discovery workflow",
    ],
    techStack: {
      frontend: ["React.js", "HTML", "CSS"],
      backend: ["Node.js", "Express.js"],
      database: ["MongoDB"],
      aiml: [],
      tools: ["JavaScript", "Git", "REST APIs"],
    },
    workflow: [
      "User signs in and selects learning track",
      "Platform serves coding tasks and discussions",
      "User submits solutions and project updates",
      "Community feedback and iteration loop continues",
      "Progress grows through practice and collaboration",
    ],
    screenshots: [
      { src: "/codecampus-1.png", caption: "Dashboard and problem listing" },
      { src: "/codecampus-2.png", caption: "Discussion and project sharing view" },
    ],
    challengesAndLearnings: [
      {
        challenge: "Keeping UI responsive with growing content blocks",
        solution: "Introduced modular components and layout constraints.",
      },
      {
        challenge: "Managing scalable API routes for different modules",
        solution: "Structured Express routes by domain and reused middleware.",
      },
    ],
    futureImprovements: [
      "Add real-time notifications",
      "Introduce integrated code editor",
      "Add mentor-led learning tracks",
    ],
  },
  "School Education Analytics Dashboard": {
    overview:
      "A policy-focused analytics dashboard that transforms UDISE+ datasets into actionable insights on enrollment and infrastructure metrics.",
    keyFeatures: [
      "Interactive KPI and trend dashboards",
      "Regional and category drill-down filters",
      "40+ DAX measures for advanced metrics",
      "Clean data model built with Power Query",
    ],
    techStack: {
      frontend: ["Power BI visuals"],
      backend: ["Power BI model layer"],
      database: ["Excel/CSV UDISE+ datasets"],
      aiml: [],
      tools: ["Power BI", "DAX", "Power Query", "Excel"],
    },
    workflow: [
      "Import raw education datasets",
      "Clean and transform using Power Query",
      "Build relational model and measures",
      "Create interactive dashboards and slicers",
      "Publish insights for decision making",
    ],
    screenshots: [
      { src: "/school-analysis-1.jpg", caption: "Enrollment and infrastructure overview" },
      { src: "/school-analysis-2.jpg", caption: "Comparative district analytics" },
    ],
    liveDemo:
      "https://app.powerbi.com/view?r=eyJrIjoiOWM5YWJmYzItNzNmNS00YzgxLWJlNjctOTFiYWQ5NDE2Y2I3IiwidCI6ImUxNGU3M2ViLTUyNTEtNDM4OC04ZDY3LThmOWYyZTJkNWE0NiIsImMiOjEwfQ%3D%3D",
    challengesAndLearnings: [
      {
        challenge: "Inconsistent schema across source files",
        solution: "Created repeatable transformation steps in Power Query.",
      },
      {
        challenge: "Balancing dashboard depth with readability",
        solution: "Used progressive drill-down and KPI prioritization.",
      },
    ],
    futureImprovements: [
      "Add yearly forecasting visuals",
      "Include teacher-student ratio anomaly detection",
      "Publish public-facing web report",
    ],
  },
  "Forum System": {
    overview:
      "A threaded discussion system designed for communities to create topics, post answers, and maintain structured conversations.",
    keyFeatures: [
      "Topic and reply threads",
      "User-centric post creation/editing",
      "Category-based filtering",
      "Searchable discussion history",
    ],
    techStack: {
      frontend: ["HTML", "CSS", "JavaScript"],
      backend: ["Node.js", "Express.js"],
      database: ["MongoDB"],
      aiml: [],
      tools: ["Git", "REST APIs"],
    },
    workflow: [
      "User creates account and joins forum",
      "User opens or browses discussion topics",
      "Replies are posted in nested thread structure",
      "Community interactions drive knowledge sharing",
      "Threads remain searchable for future reference",
    ],
    screenshots: [
      { src: "/forum-detail-1.png", caption: "Forum topic list and category navigation" },
      { src: "/forum-detail-2.png", caption: "Discussion thread and post interaction view" },
    ],
    challengesAndLearnings: [
      {
        challenge: "Designing clean nested thread rendering",
        solution: "Used recursive-friendly response formatting and UI grouping.",
      },
      {
        challenge: "Maintaining consistent validation across endpoints",
        solution: "Centralized validation middleware and schema checks.",
      },
    ],
    futureImprovements: [
      "Add moderation dashboard",
      "Implement real-time replies with websockets",
      "Introduce topic voting and ranking",
    ],
  },
  "Task Manager Application": {
    overview:
      "A productivity-oriented task manager for planning, prioritizing, and tracking personal or team work items.",
    keyFeatures: [
      "Task CRUD with status updates",
      "Priority and deadline handling",
      "Search and filter options",
      "Progress-oriented workflow tracking",
    ],
    techStack: {
      frontend: ["React.js", "JavaScript"],
      backend: ["Node.js", "Express.js"],
      database: ["MongoDB"],
      aiml: [],
      tools: ["REST APIs", "Git"],
    },
    workflow: [
      "User creates and categorizes tasks",
      "Tasks are stored and retrieved from database",
      "User updates status and priority over time",
      "System reflects completion and pending trends",
      "User optimizes planning based on progress",
    ],
    screenshots: [
      { src: "/task-manager-1.png", caption: "Task dashboard and task list view" },
      { src: "/task-manager-2.png", caption: "Task creation and management interface" },
    ],
    challengesAndLearnings: [
      {
        challenge: "Keeping state predictable across task operations",
        solution: "Refined component state flow and API sync patterns.",
      },
      {
        challenge: "Ensuring fast filtering with growing task lists",
        solution: "Optimized filter logic and render paths.",
      },
    ],
    futureImprovements: [
      "Add recurring tasks",
      "Add calendar timeline view",
      "Enable collaboration and task assignments",
    ],
  },
  "AI-Powered Document Summarizer and Q/A Tool": {
    overview:
      "An NLP assistant that ingests PDF documents, produces summaries, and answers user questions from document context.",
    keyFeatures: [
      "PDF ingestion and parsing",
      "Automatic document summarization",
      "Question-answering over uploaded content",
      "Streamlit-based interactive UI",
    ],
    techStack: {
      frontend: ["Streamlit"],
      backend: ["Python"],
      database: ["In-memory vector/context store"],
      aiml: ["Hugging Face Transformers", "NLP pipelines"],
      tools: ["PyMuPDF", "Git", "Jupyter Notebook"],
    },
    workflow: [
      "User uploads one or more PDFs",
      "System extracts and chunks document text",
      "Model generates concise summary",
      "User asks questions in natural language",
      "System returns context-aware answers",
    ],
    screenshots: [
      { src: "/doc-summarizer-1.jpg", caption: "Upload and summary interface" },
      { src: "/doc-summarizer-2.jpg", caption: "Q/A interaction output" },
    ],
    challengesAndLearnings: [
      {
        challenge: "Handling long documents with response quality",
        solution: "Used chunking and context-focused answer generation.",
      },
      {
        challenge: "Balancing speed and NLP quality",
        solution: "Tuned preprocessing and model workflow for practical latency.",
      },
    ],
    futureImprovements: [
      "Add citation-backed answers",
      "Support multi-document comparative Q/A",
      "Integrate user session history",
    ],
  },
};

function ProjectDetailSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="project-detail-section rounded-2xl border border-white/10 bg-white/[0.03] p-4 md:p-5">
      <h4 className="project-detail-title text-sm font-semibold tracking-wide text-[var(--accent)] md:text-base">{title}</h4>
      <div className="project-detail-body mt-3 text-sm leading-7 text-white/85 md:text-base">{children}</div>
    </section>
  );
}

function ProjectDetailsModal({
  project,
  detail,
  onClose,
}: {
  project: ProjectCard;
  detail: ProjectDetail;
  onClose: () => void;
}) {
  return (
    <motion.div
          key={project.title}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="project-modal-overlay fixed inset-0 z-[10000] flex items-end justify-center bg-black/70 p-0 backdrop-blur-sm md:items-center md:p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        onClick={(event) => event.stopPropagation()}
        className="project-modal relative max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-t-3xl border border-white/15 bg-[#0b1020] p-5 text-white md:rounded-3xl md:p-7"
      >
              <button
                type="button"
                suppressHydrationWarning
                onClick={onClose}
                className="project-modal-close absolute top-4 right-4 rounded-full border border-white/20 bg-white/5 p-2 text-white/80 transition hover:bg-white/10 hover:text-white"
                aria-label="Close project details"
              >
                <X size={16} />
              </button>

          <div className="pr-10">
            <p className="font-mono text-xs tracking-[0.2em] text-[var(--accent)]">PROJECT DETAILS</p>
            <h3 className="mt-2 text-2xl font-semibold tracking-tight md:text-4xl">{project.title}</h3>
            <p className="project-modal-description mt-3 text-sm text-white/75 md:text-base">{project.description}</p>
          </div>

          <div className="mt-6 grid gap-4 md:mt-7 md:grid-cols-2">
            <ProjectDetailSection title="Project Overview">
              <p>{detail.overview}</p>
            </ProjectDetailSection>

            <ProjectDetailSection title="Key Features">
              <ul className="list-disc space-y-1.5 pl-5">
                {detail.keyFeatures.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </ProjectDetailSection>

            <ProjectDetailSection title="Tech Stack">
              <div className="grid gap-2">
                {Object.entries(detail.techStack).map(([group, items]) =>
                  items.length > 0 ? (
                    <div key={group} className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-semibold uppercase tracking-[0.12em] text-white/60">{group}</span>
                      {items.map((item) => (
                        <span
                          key={`${group}-${item}`}
                          className="rounded-full border border-[var(--primary)]/35 bg-[var(--primary)]/12 px-2.5 py-0.5 text-xs"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  ) : null,
                )}
              </div>
            </ProjectDetailSection>

            <ProjectDetailSection title="System Workflow / Architecture">
              <ol className="list-decimal space-y-1.5 pl-5">
                {detail.workflow.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </ProjectDetailSection>
          </div>

          <ProjectDetailSection title="Screenshots / Demo">
            <div className="grid gap-4 md:grid-cols-2">
              {detail.screenshots.map((shot) => (
                <figure key={`${project.title}-${shot.caption}`} className="project-modal-shot overflow-hidden rounded-xl border border-white/10 bg-black/35">
                  <Image
                    src={shot.src}
                    alt={`${project.title} screenshot: ${shot.caption}`}
                    width={960}
                    height={540}
                    className="h-auto w-full object-cover"
                  />
                  <figcaption className="project-modal-caption border-t border-white/10 px-3 py-2 text-xs text-white/70">{shot.caption}</figcaption>
                </figure>
              ))}
            </div>
          </ProjectDetailSection>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <ProjectDetailSection title="Challenges & Learnings">
              <div className="space-y-2.5">
                {detail.challengesAndLearnings.map((item) => (
                  <div key={item.challenge} className="project-modal-challenge rounded-xl border border-white/10 bg-white/[0.02] p-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/60">Challenge</p>
                    <p className="mt-1">{item.challenge}</p>
                    <p className="mt-2 text-xs font-semibold uppercase tracking-[0.12em] text-white/60">Solved By</p>
                    <p className="mt-1">{item.solution}</p>
                  </div>
                ))}
              </div>
            </ProjectDetailSection>

            <ProjectDetailSection title="Future Improvements">
              <ul className="list-disc space-y-1.5 pl-5">
                {detail.futureImprovements.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </ProjectDetailSection>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--primary)] px-5 py-2 text-sm font-semibold text-black"
            >
              <Github size={15} /> GitHub Repository
            </a>
          </div>
      </motion.div>
    </motion.div>
  );
}

function CertificationCard({ certificate }: { certificate: Certification }) {
  return (
    <motion.article
      key={certificate.title}
      whileHover={{ y: -6, scale: 1.01 }}
      className="certificate-card group relative flex h-[260px] flex-col overflow-hidden rounded-3xl border border-white/15 bg-black/55"
    >
      <div
        className="certificate-head relative h-16"
        style={{
          background:
            "linear-gradient(140deg, #140d1f 0%, #2b1236 52%, #421741 100%)",
        }}
      >
        <div className="certificate-head-overlay absolute inset-0 bg-gradient-to-t from-black/75 via-black/45 to-transparent" />
        <div className="certificate-head-badge absolute left-4 top-3 rounded-full border border-white/15 bg-black/55 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur-sm">
          <span className="mr-1.5 inline-block h-2 w-2 rounded-full bg-[var(--primary)]" />
          Certificate
        </div>
        <BookOpenCheck
          size={18}
          className="certificate-head-icon absolute right-4 top-3 text-white/80 transition group-hover:text-[var(--primary)]"
        />
      </div>

      <div className="flex flex-1 flex-col px-5 py-4">
        <p className="text-base font-semibold leading-6 text-white">
          {certificate.title}
        </p>
        <p className="mt-2 line-clamp-3 text-xs leading-5 text-white/60">
          {certificate.description}
        </p>
        <a
          href={certificate.proofUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-auto inline-flex items-center justify-end gap-1.5 text-right text-xs font-medium tracking-[0.06em] text-white/75 transition hover:text-[var(--primary)]"
        >
          View Credential
          <ExternalLink size={12} className="credential-icon" />
        </a>
      </div>
    </motion.article>
  );
}

function CertificationsModal({
  certifications,
  onClose,
}: {
  certifications: Certification[];
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[10000] flex items-end justify-center bg-black/70 p-0 backdrop-blur-sm md:items-center md:p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        onClick={(event) => event.stopPropagation()}
        className="relative max-h-[92vh] w-full max-w-6xl overflow-y-auto rounded-t-3xl border border-white/15 bg-[#0b1020] p-5 text-white md:rounded-3xl md:p-7"
      >
        <button
          type="button"
          suppressHydrationWarning
          onClick={onClose}
          className="absolute top-4 right-4 rounded-full border border-white/20 bg-white/5 p-2 text-white/80 transition hover:bg-white/10 hover:text-white"
          aria-label="Close certifications"
        >
          <X size={16} />
        </button>

        <div className="pr-10">
          <p className="font-mono text-xs tracking-[0.2em] text-[var(--accent)]">CERTIFICATIONS</p>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight md:text-4xl">All Certifications</h3>
          <p className="mt-3 text-sm text-white/75 md:text-base">
            Complete list of verified certifications and credentials.
          </p>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {certifications.map((certificate) => (
            <CertificationCard key={`modal-${certificate.title}`} certificate={certificate} />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

const projects: ProjectCard[] = [
  {
    title: "AI-Based Tuberculosis Detection System",
    description:
      "Developed a deep-learning system to detect tuberculosis from chest X-ray images using ResNet50.",
    primaryTech: "Python",
    tech: [
      "Python",
      "TensorFlow/Keras",
      "OpenCV",
      "ResNet50",
      "Grad-CAM",
      "Tkinter",
      "Gradio",
    ],
    github: "https://github.com/ShivangiSingh13/Tuberculosis-Detector",
    demo: "https://github.com/ShivangiSingh13/Tuberculosis-Detector",
  },
  {
    title: "CodeCampus Platform",
    description:
      "Built a full-stack coding platform with problem practice, discussions, and placement-focused preparation.",
    primaryTech: "MERN Stack",
    tech: [
      "MongoDB",
      "Express.js",
      "React.js",
      "Node.js",
      "HTML",
      "CSS",
      "JavaScript",
    ],
    github: "https://github.com/ShivangiSingh13/campuscode",
    demo: "https://github.com/ShivangiSingh13/campuscode",
  },
  {
    title: "School Education Analytics Dashboard",
    description:
      "Designed an interactive Power BI dashboard on UDISE+ data to support education-focused insights and decisions.",
    primaryTech: "Power BI",
    tech: ["Power BI", "DAX", "Power Query", "Excel"],
    github: "https://github.com/ShivangiSingh13/School-Education-Analysis-PowerBI",
    demo: "https://app.powerbi.com/view?r=eyJrIjoiOWM5YWJmYzItNzNmNS00YzgxLWJlNjctOTFiYWQ5NDE2Y2I3IiwidCI6ImUxNGU3M2ViLTUyNTEtNDM4OC04ZDY3LThmOWYyZTJkNWE0NiIsImMiOjEwfQ%3D%3D",
  },
  {
    title: "Forum System",
    description:
      "Engineered a full-stack discussion platform for topic creation, threaded conversations, and user engagement.",
    primaryTech: "Node.js",
    tech: ["JavaScript", "Node.js", "Express.js", "MongoDB", "HTML", "CSS"],
    github: "https://github.com/ShivangiSingh13/formie",
    demo: "https://github.com/ShivangiSingh13/formie",
  },
  {
    title: "Task Manager Application",
    description:
      "Developed a task management web app to organize, prioritize, and track tasks with a clear workflow.",
    primaryTech: "React",
    tech: ["JavaScript", "React.js", "Node.js", "Express.js", "MongoDB"],
    github: "https://github.com/ShivangiSingh13/task-manager",
    demo: "https://github.com/ShivangiSingh13/task-manager",
  },
  {
    title: "AI-Powered Document Summarizer and Q/A Tool",
    description:
      "Built an AI assistant that summarizes PDFs and answers user queries using Hugging Face models.",
    primaryTech: "NLP",
    tech: ["Python", "Streamlit", "NLP", "Hugging Face Transformers", "PyMuPDF"],
    github: "https://github.com/ShivangiSingh13/AI-Powered-Document-Summarizer-and-Q-A-Tool",
    demo: "https://github.com/ShivangiSingh13/AI-Powered-Document-Summarizer-and-Q-A-Tool",
  },
];

const projectCovers = [
  "/project-cover-1.svg",
  "/project-cover-2.svg",
  "/project-cover-3.svg",
];

const featuredProjectTitles = [
  "AI-Based Tuberculosis Detection System",
  "CodeCampus Platform",
  "AI-Powered Document Summarizer and Q/A Tool",
];

const codingProfiles = [
  {
    name: "LeetCode",
    icon: Code2,
    link: "https://leetcode.com/u/shivangi1315/",
    stats: [
      "Solved: 109 problems (Easy 73, Medium 31, Hard 5)",
      "LeetCode rank: 1,362,200 | Active submissions in the last year",
    ],
    metrics: ["109 Solved", "Daily Practice", "DSA Focus"],
    highlight:
      "LeetCode profile with regular contest-style practice and consistent progress across Easy, Medium, and Hard sets.",
  },
  {
    name: "CodeChef",
    icon: Trophy,
    link: "https://www.codechef.com/users/shivangi1315",
    stats: ["Competitive programming practice", "Regular contest participation"],
    metrics: ["Contests", "Algorithms", "Speed"],
    highlight: "Competitive coding workflow centered on speed, accuracy, and ranking improvement.",
  },
  {
    name: "HackerRank",
    icon: Award,
    link: "https://www.hackerrank.com/profile/2005shivangisin1",
    stats: [
      "Badges: C++, Java, Python, SQL, C",
      "Certificates: Python, SQL, JavaScript, CSS, Problem Solving",
    ],
    metrics: ["Badges", "Certificates", "Problem Solving"],
    highlight:
      "Verified HackerRank profile with language badges and skill certifications, including Problem Solving (Intermediate).",
  },
  {
    name: "GeeksforGeeks",
    icon: BookOpenCheck,
    link: "https://www.geeksforgeeks.org/profile/2005shivac362",
    stats: [
      "Coding Score: 168 | Problems Solved: 63 | Institute Rank: 7645",
      "Submissions in 2026: 62 | POTD Solved: 23 | Longest Streak: 19 days",
    ],
    metrics: ["63 Solved", "POTD", "Coding Score 168"],
    highlight:
      "GeeksforGeeks profile with consistent POTD participation and balanced progress across Basic, Easy, Medium, and Hard levels.",
  },
];

const certifications: Certification[] = [
  {
    title: "Cloud Computing – NPTEL",
    description: "Learned cloud computing concepts including virtualization, cloud architecture, and service models (IaaS, PaaS, SaaS).",
    proofUrl: "/certificates/nptel-cloud-computing.png",
  },
  {
    title: "Artificial Intelligence Fundamentals – IBM",
    description: "Covered core AI concepts such as machine learning, neural networks, and AI applications in real-world systems.",
    proofUrl: "https://www.credly.com/badges/7653a663-04e7-43fd-bc58-bb0687572214/linked_in_profile",
  },
  {
    title: "Computer Communications Specialization – University of Colorado Boulder",
    description: "Studied networking fundamentals including TCP/IP, LAN protocols, and peer-to-peer communication systems.",
    proofUrl: "https://www.coursera.org/account/accomplishments/specialization/ODCV90ARMF98",
  },
  {
    title: "Prompt Engineering & Generative AI – Infosys Springboard",
    description: "Learned prompt engineering techniques and applications of generative AI using ChatGPT and LLM models.",
    proofUrl: "/certificates/prompt-engineering-infosys.png",
  },
  {
    title: "Graph Theory Programming Camp – AlgoUniversity",
    description: "Completed advanced graph theory programming camp solving algorithmic problems related to graphs and competitive programming.",
    proofUrl: "/certificates/graph-theory-algouniversity.png",
  },
];

const otherCertifications: Certification[] = [
  {
    title: "Introduction to Generative AI – Google Cloud",
    description: "Covered basics of generative AI models, LLMs, and real-world AI applications.",
    proofUrl: "https://www.coursera.org/account/accomplishments/verify/WF44SEMTN6KW",
  },
  {
    title: "Git and GitHub – Google",
    description: "Learned version control, collaboration workflows, and GitHub project management.",
    proofUrl: "https://www.coursera.org/account/accomplishments/verify/936NSTG949AL",
  },
  {
    title: "TCS iON Career Edge – Young Professional",
    description: "Developed professional communication, interview preparation, and workplace skills.",
    proofUrl: "/certificates/tcs-ion-career-edge.jpg",
  },
  {
    title: "Responsive Web Design",
    description: "Built mobile-friendly websites using HTML, CSS, Flexbox, and Grid.",
    proofUrl: "/certificates/responsive-web-design.png",
  },
];

const extracurricularActivities = [
  {
    title: "Fine Arts Head",
    organization: "LEGACY LPU",
    description:
      "Led creative initiatives and coordinated cultural activities, promoting collaboration and student engagement.",
  },
  {
    title: "Member & Public Speaker",
    organization: "OASIS LPU",
    description:
      "Participated in organizational initiatives and delivered presentations, strengthening communication and leadership skills.",
  },
  {
    title: "NSS Volunteer",
    organization: "NATIONAL SERVICE SCHEME (NSS)",
    description:
      "Contributed to community service and social awareness activities supporting public well-being.",
  },
];

const typingSkills = [
  "Building Product-Focused Solutions",
  "Open to Full-Stack, AI/ML, and Data Science Internships",
  "Turning Ideas into Scalable Applications",
  "Continuous Learning and Execution",
];

const focusAreas = [
  "AI / Machine Learning",
  "Full-Stack Development (MERN Stack)",
  "Data Analytics & Visualization",
  "Core Computer Science",
];

type EducationEntry = {
  institution: string;
  qualification: string;
  specialization?: string;
  period: string;
  cgpa?: string;
  percentage?: string;
  subjects: string[];
  skillsGained: string[];
};

const educationHistory: EducationEntry[] = [
  {
    institution: "Lovely Professional University, Phagwara, Punjab",
    qualification: "Bachelor of Technology",
    specialization: "Computer Science and Engineering",
    period: "Aug 2023 - Present",
    cgpa: "7.63",
    subjects: [
      "DSA",
      "DBMS",
      "OS",
      "CN",
      "OOP",
      "AI",
      "Software Engineering",
      "Theory of Computation",
      "Computer Organization and Architecture",
      "Design and Analysis of Algorithms",
      "Mathematics",
    ],
    skillsGained: ["Problem Solving", "System Design Thinking", "Team Collaboration", "Project Execution"],
  },
  {
    institution: "Kendriya Vidyalaya No. 2 Delhi Cantt., Delhi",
    qualification: "Intermediate",
    specialization: "PCM",
    period: "Mar 2022 - May 2023",
    percentage: "83.8%",
    subjects: ["Physics", "Chemistry", "Mathematics", "Computer Science"],
    skillsGained: ["Analytical Thinking", "Problem Solving", "Mathematical Skills", "Conceptual Understanding"],
  },
  {
    institution: "Kendriya Vidyalaya No. 2 Tezpur, Assam",
    qualification: "Matriculation",
    period: "Mar 2020 - May 2021",
    percentage: "98%",
    subjects: ["Mathematics", "Science", "English", "Social Science", "Hindi"],
    skillsGained: ["Basic Problem Solving", "Communication Skills", "Time Management", "Learning Ability"],
  },
];

const professionalTimeline = [
  {
    phase: "Current Focus",
    title: "B.Tech CSE and Product-Building",
    period: "2023 - Present",
    summary:
      "Building production-ready AI and full-stack applications while strengthening core CSE subjects like DSA, DBMS, OS, and Computer Networks.",
    highlights: ["AI/ML Projects", "Full-Stack MERN Apps", "Analytics Dashboards", "Core CS Subjects"],
    featured: true,
  },
  {
    phase: "Competitive Practice",
    title: "Consistent DSA Growth",
    period: "2024 - Present",
    summary:
      "Practiced data structures and algorithms daily across major coding platforms with measurable progress.",
    highlights: ["Daily DSA Practice", "Cross-Platform Consistency", "Interview Preparation"],
    proofUrl: "https://leetcode.com/u/shivangi1315/",
  },
  {
    phase: "Hackathon Participation",
    title: "Multiple Hackathon Experiences",
    period: "2024 - 2025",
    summary:
      "Participated in 6+ national and online hackathons, building AI-powered and full-stack solutions under time pressure. Practiced rapid prototyping, teamwork, and technical pitching.",
    highlights: [
      "AI/ML Solutions",
      "Full-Stack Development",
      "Team Collaboration",
      "Rapid Prototyping",
      "Certificates available on request"
    ],
  },
  {
    phase: "Open Source and Collaboration",
    title: "Contributor and Community Builder",
    period: "2024 - 2025",
    summary:
      "Contributed through programs like GSSoC and actively collaborated in peer learning and project communities.",
    highlights: ["Open-Source Contributions", "Technical Collaboration", "Documentation and Review"],
    proofImage: "/gssoc.jpg",
  },
];

const projectDomainOrder = ["All", "AI/ML", "Full Stack", "Data Analytics", "Developer Tools"] as const;
type ProjectDomain = (typeof projectDomainOrder)[number];

function getProjectDomain(project: ProjectCard): ProjectDomain {
  const haystack = `${project.title} ${project.description} ${project.tech.join(" ")}`.toLowerCase();

  if (/(ai|ml|machine learning|tensorflow|keras|nlp|hugging face|grad-cam|resnet)/.test(haystack)) {
    return "AI/ML";
  }

  if (/(power bi|dax|power query|analytics|dashboard|excel|udise)/.test(haystack)) {
    return "Data Analytics";
  }

  if (/(react|node|express|mongodb|mern|full-stack|full stack|forum|task manager|platform)/.test(haystack)) {
    return "Full Stack";
  }

  return "Developer Tools";
}

type GithubLanguageStat = {
  name: string;
  percent: number;
  color: string;
};

type GithubStats = {
  totalStars: number;
  commitsLastYear: number;
  totalPrsLastYear: number;
  totalIssuesLastYear: number;
  activeReposLastYear: number;
};

type GithubActivityDay = {
  date: string;
  count: number;
  level: number;
};

const staticGithubLanguageStats: GithubLanguageStat[] = [
  { name: "Python", percent: 47.35, color: "#3572A5" },
  { name: "Jupyter Notebook", percent: 41.22, color: "#F37726" },
  { name: "JavaScript", percent: 8.71, color: "#F1E05A" },
  { name: "HTML", percent: 1.61, color: "#22C55E" },
  { name: "CSS", percent: 0.94, color: "#663399" },
  { name: "PowerShell", percent: 0.09, color: "#012456" },
];

const staticGithubStats: GithubStats = {
  totalStars: 13,
  commitsLastYear: 171,
  totalPrsLastYear: 0,
  totalIssuesLastYear: 0,
  activeReposLastYear: 0,
};

const staticGithubContributionTotal = 171;
const staticGithubYears = ["2026", "2025", "2024", "2023"] as const;
const staticGithubActiveYear = "2026";

const staticGithubContributionOverrides: Record<string, { count: number; level: number }> = {
  "2025-03-30": { count: 6, level: 3 },
  "2025-03-31": { count: 5, level: 2 },
  "2025-04-07": { count: 4, level: 2 },
  "2025-04-08": { count: 7, level: 3 },
  "2025-04-09": { count: 8, level: 4 },
  "2025-04-14": { count: 6, level: 3 },
  "2025-04-15": { count: 7, level: 4 },
  "2025-05-20": { count: 4, level: 2 },
  "2025-06-16": { count: 6, level: 3 },
  "2025-06-21": { count: 5, level: 2 },
  "2025-06-22": { count: 7, level: 3 },
  "2025-06-23": { count: 8, level: 4 },
  "2025-06-28": { count: 5, level: 2 },
  "2025-06-29": { count: 6, level: 3 },
  "2025-06-30": { count: 5, level: 2 },
  "2025-07-07": { count: 5, level: 2 },
  "2025-07-08": { count: 8, level: 4 },
  "2025-07-12": { count: 5, level: 2 },
  "2025-07-13": { count: 6, level: 3 },
  "2025-07-14": { count: 8, level: 4 },
  "2025-07-15": { count: 5, level: 2 },
  "2025-07-20": { count: 6, level: 3 },
  "2025-07-21": { count: 8, level: 4 },
  "2025-12-07": { count: 6, level: 3 },
  "2025-12-10": { count: 5, level: 2 },
  "2025-12-12": { count: 6, level: 3 },
  "2025-12-14": { count: 5, level: 2 },
  "2026-02-09": { count: 5, level: 2 },
  "2026-02-22": { count: 5, level: 2 },
  "2026-03-14": { count: 8, level: 4 },
};

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const contributionLevelColor = (level: number) => {
  if (level >= 4) return "#ff4fa3";
  if (level === 3) return "#ff77ba";
  if (level === 2) return "#ff9fcf";
  if (level === 1) return "#ffc8e4";
  return "#161b22";
};

function createStaticGithubActivity() {
  const start = new Date("2025-03-16T00:00:00");
  const end = new Date("2026-03-14T00:00:00");
  const days: GithubActivityDay[] = [];

  for (const current = new Date(start); current <= end; current.setDate(current.getDate() + 1)) {
    const date = current.toISOString().slice(0, 10);
    const override = staticGithubContributionOverrides[date];
    days.push({
      date,
      count: override?.count ?? 0,
      level: override?.level ?? 0,
    });
  }

  return days;
}

const staticGithubActivity = createStaticGithubActivity();

const fadeInUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as const },
  },
} as const;

function useTypingEffect(words: string[]) {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[index];
    const delay = isDeleting ? 45 : 90;

    const timeout = setTimeout(() => {
      if (!isDeleting && subIndex === currentWord.length) {
        setTimeout(() => setIsDeleting(true), 900);
        return;
      }

      if (isDeleting && subIndex === 0) {
        setIsDeleting(false);
        setIndex((prev) => (prev + 1) % words.length);
        return;
      }

      setSubIndex((prev) => prev + (isDeleting ? -1 : 1));
    }, delay);

    return () => clearTimeout(timeout);
  }, [index, isDeleting, subIndex, words]);

  return `${words[index].slice(0, subIndex)}|`;
}

export default function Home() {
  const formEndpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const [activeProfile, setActiveProfile] = useState(codingProfiles[0].name);
  const [activeSkillGroup, setActiveSkillGroup] = useState(skillGroups[0].title);
  const [activeProjectDomain, setActiveProjectDomain] = useState<ProjectDomain>("All");
  const [projectSearch, setProjectSearch] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formStatus, setFormStatus] = useState<
    "idle" | "sending" | "sent" | "error" | "fallback"
  >("idle");
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatThinking, setChatThinking] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectCard | null>(null);
  const [isCertificationsModalOpen, setIsCertificationsModalOpen] = useState(false);
  const [expandedEducationSubjects, setExpandedEducationSubjects] = useState<Record<string, boolean>>({});
  const [chatMessages, setChatMessages] = useState<Array<{ role: "bot" | "user"; text: string }>>([
    {
      role: "bot",
      text: "Hello, I am Shivangi's portfolio assistant. Ask about projects, skills, certifications, or contact details.",
    },
  ]);
  const typedSkill = useTypingEffect(typingSkills);
  const githubLanguageStats = staticGithubLanguageStats;
  const githubStats = staticGithubStats;
  const githubActivity = staticGithubActivity;

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("sending");
    try {
      if (!formEndpoint) {
        throw new Error("Missing form endpoint");
      }

      const res = await fetch(formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setFormStatus("sent");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setFormStatus("error");
      }
    } catch {
      const subject = encodeURIComponent(`Portfolio contact from ${formData.name}`);
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`,
      );
      window.location.href = `mailto:2005shivangisingh@gmail.com?subject=${subject}&body=${body}`;
      setFormStatus("fallback");
    }
  };

  // Sync saved theme from localStorage after hydration (client only).
  useEffect(() => {
    const saved = window.localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") {
      setTheme(saved);
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const documentHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = documentHeight > 0 ? (scrollTop / documentHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: "-30% 0px -55% 0px",
        threshold: 0,
      },
    );

    navItems.forEach((id) => {
      const section = document.getElementById(id);
      if (section) {
        observer.observe(section);
      }
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!selectedProject && !isCertificationsModalOpen) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (selectedProject) {
          setSelectedProject(null);
        } else {
          setIsCertificationsModalOpen(false);
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedProject, isCertificationsModalOpen]);

  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(id);
    }
    setMenuOpen(false);
  };

  const totalStats = useMemo(
    () => [
      { label: "Coding Problems Solved", value: "250+" },
      { label: "Primary Domains", value: "AI/ML, MERN, Analytics" },
      { label: "Open Source", value: "GSSoC Contributor" },
    ],
    [],
  );
  const githubLanguageTotal = useMemo(
    () => githubLanguageStats.reduce((sum, language) => sum + language.percent, 0),
    [githubLanguageStats],
  );
  const githubActivityWeeks = useMemo(() => {
    if (githubActivity.length === 0) {
      return [] as Array<Array<GithubActivityDay | null>>;
    }

    const firstDay = new Date(`${githubActivity[0].date}T00:00:00`);
    const startPadding = firstDay.getDay();
    const paddedDays: Array<GithubActivityDay | null> = [
      ...Array.from({ length: startPadding }, () => null),
      ...githubActivity,
    ];

    const weekCount = Math.ceil(paddedDays.length / 7);
    return Array.from({ length: weekCount }, (_, index) => paddedDays.slice(index * 7, index * 7 + 7));
  }, [githubActivity]);

  const githubMonthMarkers = useMemo(() => {
    if (githubActivity.length === 0 || githubActivityWeeks.length === 0) {
      return [] as Array<{ label: string; weekIndex: number }>;
    }

    const firstDate = new Date(`${githubActivity[0].date}T00:00:00`);
    const startPadding = firstDate.getDay();
    const markers: Array<{ label: string; weekIndex: number }> = [];
    let previousMonth = -1;

    githubActivity.forEach((day, index) => {
      const date = new Date(`${day.date}T00:00:00`);
      const month = date.getMonth();

      if ((date.getDate() <= 7 && month !== previousMonth) || index === 0) {
        const weekIndex = Math.floor((index + startPadding) / 7);
        markers.push({ label: monthNames[month], weekIndex });
        previousMonth = month;
      }
    });

    return markers;
  }, [githubActivity, githubActivityWeeks.length]);

  const selectedProfile =
    codingProfiles.find((profile) => profile.name === activeProfile) ?? codingProfiles[0];
  const SelectedProfileIcon = selectedProfile.icon;
  const topCertifications = useMemo(() => certifications.slice(0, 5), []);
  const featuredProjects = projects.filter((project) => featuredProjectTitles.includes(project.title));
  const remainingProjects = projects.filter((project) => !featuredProjectTitles.includes(project.title));
  const projectSearchNormalized = projectSearch.trim().toLowerCase();
  const filterProjects = useCallback(
    (project: ProjectCard) => {
      const matchesDomain =
        activeProjectDomain === "All" || getProjectDomain(project) === activeProjectDomain;

      if (!matchesDomain) {
        return false;
      }

      if (!projectSearchNormalized) {
        return true;
      }

      const haystack = `${project.title} ${project.description} ${project.primaryTech} ${project.tech.join(" ")}`.toLowerCase();
      return haystack.includes(projectSearchNormalized);
    },
    [activeProjectDomain, projectSearchNormalized],
  );
  const filteredFeaturedProjects = useMemo(
    () => featuredProjects.filter(filterProjects),
    [featuredProjects, filterProjects],
  );
  const filteredRemainingProjects = useMemo(
    () => remainingProjects.filter(filterProjects),
    [remainingProjects, filterProjects],
  );
  const filteredProjectCount = filteredFeaturedProjects.length + filteredRemainingProjects.length;
  const selectedProjectDetail = selectedProject ? projectDetailsByTitle[selectedProject.title] : null;

  const buildAssistantReply = (question: string) => {
    const q = question.toLowerCase().replace(/\s+/g, " ").trim();
    const includesAny = (terms: string[]) => terms.some((term) => q.includes(term));

    if (includesAny(["hi", "hello", "hey"])) {
      return "Hello. You can ask about education, projects, skills, certifications, coding profiles, GitHub stats, achievements, extracurricular activities, resume, or contact details.";
    }

    if (includesAny(["resume", "cv"])) {
      return `You can view/download Shivangi's resume here: ${profileLinks.resume}`;
    }

    if (includesAny(["contact", "email", "linkedin", "github link", "phone"])) {
      return `Contact details: Email ${profileLinks.email.replace("mailto:", "")}, LinkedIn ${profileLinks.linkedin}, GitHub ${profileLinks.github}.`;
    }

    if (includesAny(["about", "focus", "domain", "interest"])) {
      return `Focus areas: ${focusAreas.join(" | ")}.`;
    }

    if (includesAny(["education", "college", "school", "btech", "intermediate", "matriculation", "cgpa"])) {
      return `Education: ${educationHistory
        .map(
          (item) =>
            `${item.qualification} (${item.period}) at ${item.institution}${item.specialization ? ` - ${item.specialization}` : ""}${item.cgpa ? `; CGPA: ${item.cgpa}` : ""}${item.percentage ? `; Percentage: ${item.percentage}` : ""}. Subjects: ${item.subjects.slice(0, 3).join(", ")}. Skills gained: ${item.skillsGained.slice(0, 3).join(", ")}`,
        )
        .join(" | ")}.`;
    }

    if (includesAny(["achievement", "gssoc", "open source", "coding problems"])) {
      return `Key achievements: ${totalStats.map((stat) => `${stat.label}: ${stat.value}`).join(" | ")}.`;
    }

    if (includesAny(["github", "contribution", "stars", "commits", "language stats"])) {
      return `GitHub snapshot: ${staticGithubContributionTotal} contributions last year, ${githubStats.totalStars} stars, ${githubStats.commitsLastYear} commits. Top languages: ${githubLanguageStats
        .slice(0, 4)
        .map((language) => `${language.name} ${language.percent.toFixed(2)}%`)
        .join(", ")}.`;
    }

    if (includesAny(["profile", "leetcode", "hackerrank", "codechef", "geeksforgeeks", "gfg"])) {
      const matchedProfile = codingProfiles.find((profile) =>
        q.includes(profile.name.toLowerCase()) ||
        (profile.name === "GeeksforGeeks" && q.includes("gfg")),
      );

      if (matchedProfile) {
        return `${matchedProfile.name}: ${matchedProfile.highlight} Stats: ${matchedProfile.stats.join(" | ")}. Profile link: ${matchedProfile.link}`;
      }

      return `Coding profiles: ${codingProfiles.map((profile) => profile.name).join(", ")}. Ask for any one profile to get detailed stats.`;
    }

    if (includesAny(["certification", "certificate", "nptel", "ibm", "infosys", "coursera"])) {
      const allCertifications = [...certifications, ...otherCertifications];
      const matchedCertification = allCertifications.find((certificate) =>
        q.includes(certificate.title.toLowerCase().slice(0, 18)) ||
        q.includes("nptel") && certificate.title.toLowerCase().includes("nptel") ||
        q.includes("ibm") && certificate.title.toLowerCase().includes("ibm") ||
        q.includes("infosys") && certificate.title.toLowerCase().includes("infosys") ||
        q.includes("google") && certificate.title.toLowerCase().includes("google"),
      );

      if (matchedCertification) {
        return `${matchedCertification.title}: ${matchedCertification.description} Proof: ${matchedCertification.proofUrl}`;
      }

      return `Shivangi has ${allCertifications.length} certifications. Top ones include: ${topCertifications
        .map((certificate) => certificate.title)
        .join(", ")}.`;
    }

    if (includesAny(["extracurricular", "activity", "nss", "oasis", "legacy"])) {
      return `Extracurricular highlights: ${extracurricularActivities
        .map((activity) => `${activity.title} (${activity.organization})`)
        .join(" | ")}.`;
    }

    if (q.includes("tb") || q.includes("tuberculosis")) {
      const tbProject = projects.find((project) => project.title.includes("Tuberculosis"));
      if (tbProject) {
        return `${tbProject.title}: ${tbProject.description} Core technologies: ${tbProject.tech.join(", ")}.`;
      }
    }

    const matchedProject = projects.find((project) => {
      const title = project.title.toLowerCase();
      const description = project.description.toLowerCase();
      return q.includes(title) || title.split(" ").some((word) => word.length > 4 && q.includes(word)) || q.includes(description.slice(0, 18));
    });

    if (matchedProject) {
      return `${matchedProject.title}: ${matchedProject.description} Tech stack: ${matchedProject.tech.join(", ")}. GitHub: ${matchedProject.github}${matchedProject.demo ? ` | Demo: ${matchedProject.demo}` : ""}.`;
    }

    if (includesAny(["ai project", "ml project", "ai projects", "nlp project"])) {
      const aiProjects = projects.filter((project) => {
        const haystack = `${project.title} ${project.description} ${project.tech.join(" ")}`.toLowerCase();
        return /(ai|ml|machine learning|nlp|tensorflow|keras|hugging face|grad-cam)/.test(haystack);
      });
      if (aiProjects.length > 0) {
        return `AI-focused projects: ${aiProjects.map((project) => project.title).join(", ")}.`;
      }
    }

    if (includesAny(["project", "work", "portfolio project"])) {
      return `Featured projects: ${featuredProjects.map((project) => project.title).join(", ")}. Other projects: ${remainingProjects
        .slice(0, 4)
        .map((project) => project.title)
        .join(", ")}.`;
    }

    if (includesAny(["technolog", "skill", "stack", "language"])) {
      const allSkills = Array.from(new Set(skillGroups.flatMap((group) => group.items)));
      return `Skills across ${skillGroups.length} groups: ${skillGroups.map((group) => group.title).join(", ")}. Key technologies: ${allSkills.slice(0, 25).join(", ")}.`;
    }

    return "I can help with portfolio details including education, projects, tech stacks, certifications with proof links, coding profiles, GitHub stats, achievements, extracurricular activities, resume, and contact information. Ask for any specific section or project title.";
  };

  const sendChatMessage = useCallback(() => {
    const prompt = chatInput.trim();
    if (!prompt) {
      return;
    }

    setChatMessages((prev) => [...prev, { role: "user", text: prompt }]);
    setChatInput("");
    setChatThinking(true);

    window.setTimeout(() => {
      const reply = buildAssistantReply(prompt);
      setChatMessages((prev) => [...prev, { role: "bot", text: reply }]);
      setChatThinking(false);
    }, 450);
  }, [chatInput]);

  const handleChatSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendChatMessage();
  };

  return (
    <div className="animated-bg min-h-screen text-[var(--foreground)]">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/20 backdrop-blur-xl">
        <div
          className="absolute top-0 left-0 h-[2px] bg-[var(--primary)] transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-4 md:px-8">
          <a href="#hero" className="font-mono text-sm font-semibold tracking-widest">
            SHIVANGI.SINGH
          </a>

          <nav className="hidden items-center gap-4 text-xs capitalize lg:flex lg:gap-5 lg:text-sm">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item}`}
                onClick={(event) => handleNavClick(event, item)}
                className={`transition hover:text-[var(--primary)] ${
                  activeSection === item ? "text-[var(--primary)]" : ""
                }`}
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              suppressHydrationWarning
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="glass rounded-full p-2 transition hover:scale-105"
              aria-label="Toggle color theme"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              type="button"
              suppressHydrationWarning
              className="glass rounded-full p-2 lg:hidden"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="glass mx-4 mb-4 rounded-2xl p-4 lg:hidden">
            <div className="grid grid-cols-2 gap-3 text-sm capitalize">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item}`}
                  onClick={(event) => handleNavClick(event, item)}
                  className={`rounded-lg px-2 py-1 hover:bg-white/10 ${
                    activeSection === item ? "bg-white/10 text-[var(--primary)]" : ""
                  }`}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      <main className="light-readable mx-auto flex w-full max-w-6xl flex-col gap-7 px-5 py-8 md:px-8 md:py-10">
        <motion.section
          id="hero"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="hero-cinematic relative overflow-hidden rounded-3xl p-7 md:p-8"
        >
          <div className="pointer-events-none absolute inset-y-0 right-0 w-[52%] bg-gradient-to-l from-black/55 via-black/25 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-[42%] bg-gradient-to-l from-[var(--secondary)]/14 to-transparent" />
          <div className="pointer-events-none absolute -top-24 -left-24 h-64 w-64 rounded-full bg-[var(--primary)]/12 blur-3xl" />
          <div className="grid items-center gap-8 lg:grid-cols-[1.25fr_0.9fr] lg:gap-10">
            <div>
              <p className="mb-4 font-mono text-xs tracking-[0.28em] text-[var(--accent)] md:text-sm">
                PORTFOLIO
              </p>
              <h1 className="text-4xl font-semibold leading-[1.02] tracking-tight sm:text-5xl md:text-6xl lg:text-8xl">
                Hello,
                <span className="block text-[var(--accent)]">I&apos;m Shivangi</span>
              </h1>
              <p className="mt-5 text-sm text-white/85 md:text-lg">
                B.Tech CSE | AI/ML Enthusiast | MERN Stack Developer | Data Analyst
              </p>
              <p className="mt-3 text-lg font-medium text-[var(--primary)] md:text-2xl">{typedSkill}</p>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-white/80 md:text-base">
                Building AI-powered systems, data-driven insights, and scalable full-stack applications.
              </p>

              <div className="mt-6 grid gap-3 md:grid-cols-3">
                <div className="light-border-soft rounded-xl border border-white/15 bg-white/[0.04] px-3 py-2">
                  <p className="text-[11px] uppercase tracking-wide text-white/55">Projects</p>
                  <p className="mt-1 text-sm font-semibold text-white">15+ Built</p>
                </div>
                <div className="light-border-soft rounded-xl border border-white/15 bg-white/[0.04] px-3 py-2">
                  <p className="text-[11px] uppercase tracking-wide text-white/55">Coding</p>
                  <p className="mt-1 text-sm font-semibold text-white">250+ Solved</p>
                </div>
                <div className="light-border-soft rounded-xl border border-white/15 bg-white/[0.04] px-3 py-2">
                  <p className="text-[11px] uppercase tracking-wide text-white/55">Open Source</p>
                  <p className="mt-1 text-sm font-semibold text-white">GSSoC Contributor</p>
                </div>
              </div>

              <div className="light-border-soft mt-5 rounded-xl border border-white/15 bg-black/20 px-4 py-3 text-xs text-white/80 md:text-sm">
                <p className="leading-6 md:whitespace-nowrap">
                  <span className="font-semibold text-white">Location:</span> Punjab, India
                  <span className="mx-2 text-white/35">|</span>
                  <span className="font-semibold text-white">Availability:</span> Internship / Full-Time
                  <span className="mx-2 text-white/35">|</span>
                  <span className="font-semibold text-white">Graduation:</span> 2027
                </p>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="#projects"
                  className="rounded-full bg-[var(--primary)] px-5 py-2 text-sm font-semibold text-black transition hover:-translate-y-0.5"
                >
                  View Projects
                </a>
                <a
                  href={profileLinks.resume}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-5 py-2 text-sm font-semibold transition hover:-translate-y-0.5 hover:bg-white/10"
                >
                  <Download size={16} /> Download Resume
                </a>
                <a
                  href="#contact"
                  className="rounded-full border border-white/30 px-5 py-2 text-sm font-semibold transition hover:bg-white/10"
                >
                  Contact Me
                </a>
              </div>

            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, rotate: -1 }}
              className="relative mx-auto mt-2 w-full max-w-[290px] sm:max-w-[330px] lg:mt-0"
            >
              <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-[var(--secondary)]/35 via-[var(--primary)]/18 to-[var(--accent)]/28 blur-2xl" />
              <div className="relative overflow-hidden rounded-[2rem] border border-white/25 bg-black/35 p-3 backdrop-blur-sm">
                <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-white/14 to-transparent" />
                <Image
                  src="/shivangi-profile.jpeg"
                  alt="Profile illustration for Shivangi Singh"
                  width={640}
                  height={760}
                  priority
                  className="relative h-auto w-full rounded-[1.5rem] object-cover"
                />
              </div>
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          id="about"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="hero-cinematic relative overflow-hidden rounded-3xl p-7 md:p-8"
        >
          <div className="pointer-events-none absolute -top-14 -right-16 h-40 w-40 rounded-full bg-[var(--primary)]/12 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 -left-14 h-36 w-36 rounded-full bg-[var(--secondary)]/12 blur-3xl" />

          <div className="grid gap-6 lg:grid-cols-[0.75fr_1.5fr] lg:items-center">
            <div className="order-2 lg:order-1 lg:max-w-[300px] lg:self-center">
              <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-black/30 p-2">
                <Image
                  src="/about-profile.jpeg"
                  alt="Shivangi portrait"
                  width={600}
                  height={760}
                  className="h-auto w-full rounded-xl object-cover"
                />
                <div className="absolute inset-x-3 bottom-3 rounded-full border border-white/20 bg-black/45 px-3 py-1 text-center text-[10px] font-medium tracking-[0.14em] text-white/85 backdrop-blur-sm">
                  FULL-STACK • AI/ML • DATA SCIENCE
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <h2 className="section-title text-2xl font-semibold md:text-3xl">About</h2>
              <p className="mt-4 max-w-4xl text-sm leading-8 text-white/88 md:text-base">
                I am a Computer Science undergraduate focused on building reliable, user-centered products.
                I enjoy turning complex problems into practical solutions with a strong foundation in
                engineering principles and continuous learning.
              </p>
              <p className="mt-3 max-w-4xl text-sm leading-8 text-white/88 md:text-base">
                Career Objective: Seeking internship opportunities in Full-Stack Development, AI/ML,
                and Data Science where I can contribute to production-ready products.
              </p>

              <h3 className="mt-7 text-lg font-semibold tracking-wide text-[var(--primary)] md:text-xl">Highlights</h3>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                <div className="rounded-2xl border border-white/15 bg-gradient-to-br from-white/[0.08] to-transparent p-4">
                  <h4 className="text-base font-semibold">End-to-End Project Delivery</h4>
                  <p className="mt-2 text-sm leading-6 text-white/85">
                    Designed and delivered AI, analytics, and full-stack solutions from ideation to deployment-ready prototypes.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/15 bg-gradient-to-br from-white/[0.08] to-transparent p-4">
                  <h4 className="text-base font-semibold">Technical Depth and Consistency</h4>
                  <p className="mt-2 text-sm leading-6 text-white/85">
                    Strengthened DSA and core CSE fundamentals through consistent practice and structured problem-solving.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/15 bg-gradient-to-br from-white/[0.08] to-transparent p-4 sm:col-span-2 xl:col-span-1">
                  <h4 className="text-base font-semibold">Collaboration and Leadership</h4>
                  <p className="mt-2 text-sm leading-6 text-white/85">
                    Contributed through open source and campus initiatives with documentation, peer collaboration, and communication.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          id="education"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="hero-cinematic rounded-3xl p-6 md:p-7"
        >
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="section-title text-2xl font-semibold md:text-3xl">Education</h2>
              <p className="mt-1.5 text-sm text-white/75">Academic milestones with subjects, skills, and scores.</p>
            </div>
            <span className="rounded-full border border-[var(--primary)]/30 bg-[var(--primary)]/10 px-3 py-1 text-xs font-medium text-[var(--accent)]">
              Academic Track
            </span>
          </div>

          <div className="mt-5">
            <div className="relative space-y-3 before:absolute before:top-2 before:bottom-2 before:left-3 before:w-px before:bg-white/20">
              {educationHistory.map((item, index) => {
                const educationKey = `${item.institution}-${item.qualification}`;
                const shouldCollapseSubjects = item.qualification === "Bachelor of Technology";
                const isSubjectsExpanded = expandedEducationSubjects[educationKey] ?? false;
                const visibleSubjects =
                  shouldCollapseSubjects && !isSubjectsExpanded ? item.subjects.slice(0, 6) : item.subjects;
                const hiddenSubjectsCount = shouldCollapseSubjects
                  ? Math.max(item.subjects.length - 6, 0)
                  : 0;

                return (
                <motion.article
                  key={educationKey}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.35, delay: index * 0.06 }}
                  className="relative ml-8 rounded-2xl border border-white/15 bg-white/[0.05] p-4 shadow-[0_10px_30px_rgba(0,0,0,0.2)]"
                >
                  <span className="absolute top-7 -left-[29px] h-3 w-3 rounded-full border border-[var(--primary)]/60 bg-[var(--primary)] shadow-[0_0_0_4px_rgba(255,255,255,0.08)]" />

                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h3 className="text-lg font-semibold text-white md:text-xl">{item.qualification}</h3>
                      {item.specialization ? <p className="mt-1 text-sm text-white/78">{item.specialization}</p> : null}
                    </div>
                    <span className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-medium text-white/80">
                      {item.period}
                    </span>
                  </div>

                  <p className="mt-2.5 text-sm leading-6 text-white/82">{item.institution}</p>

                  <div className="mt-4 flex flex-wrap gap-2 text-xs">
                    {item.cgpa ? (
                      <span className="rounded-full border border-[var(--primary)]/40 bg-[var(--primary)]/12 px-3 py-1.5 font-semibold text-[var(--accent)]">
                        CGPA: {item.cgpa}
                      </span>
                    ) : null}
                    {item.percentage ? (
                      <span className="rounded-full border border-[var(--primary)]/40 bg-[var(--primary)]/12 px-3 py-1.5 font-semibold text-[var(--accent)]">
                        Percentage: {item.percentage}
                      </span>
                    ) : null}
                  </div>

                  <div className="mt-3 grid gap-3 md:grid-cols-2">
                    <div className="rounded-xl border border-white/10 bg-black/15 p-3">
                      <p className="text-xs font-semibold tracking-wide text-[var(--accent)]">Subjects</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {visibleSubjects.map((subject) => (
                          <span
                            key={`${item.qualification}-${subject}`}
                            className="rounded-md border border-white/20 bg-white/5 px-2 py-1 text-xs text-white/80"
                          >
                            {subject}
                          </span>
                        ))}
                        {hiddenSubjectsCount > 0 ? (
                          <button
                            type="button"
                            onClick={() =>
                              setExpandedEducationSubjects((prev) => ({
                                ...prev,
                                [educationKey]: !isSubjectsExpanded,
                              }))
                            }
                            className="rounded-md border border-[var(--primary)]/35 bg-[var(--primary)]/12 px-2 py-1 text-xs font-medium text-[var(--accent)] transition hover:bg-[var(--primary)]/20"
                          >
                            {isSubjectsExpanded ? "Show Less" : "Show More"}
                          </button>
                        ) : null}
                      </div>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-black/15 p-3">
                      <p className="text-xs font-semibold tracking-wide text-[var(--accent)]">Skills Gained</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {item.skillsGained.slice(0, 4).map((skill) => (
                          <span
                            key={`${item.qualification}-${skill}`}
                            className="rounded-md border border-white/20 bg-white/5 px-2 py-1 text-xs text-white/80"
                          >
                            {skill}
                          </span>
                        ))}
                        {item.skillsGained.length > 4 ? (
                          <span className="rounded-md border border-[var(--primary)]/35 bg-[var(--primary)]/12 px-2 py-1 text-xs text-[var(--accent)]">
                            +{item.skillsGained.length - 4} more
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </motion.article>
                );
              })}
            </div>
          </div>
        </motion.section>

        <motion.section
          id="timeline"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="hero-cinematic rounded-3xl p-7 md:p-8"
        >
          <div className="flex items-end justify-between gap-3">
            <h2 className="section-title text-2xl font-semibold md:text-3xl">Professional Journey</h2>
            <span className="rounded-full border border-[var(--primary)]/30 bg-[var(--primary)]/10 px-3 py-1 text-xs font-medium text-[var(--accent)]">
              Timeline
            </span>
          </div>

          {/* All Cards Grid */}
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-2">
            {professionalTimeline.map((step, index) => (
                <motion.article
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.35, delay: index * 0.1 }}
                  className="light-border-soft group relative overflow-hidden rounded-2xl border border-white/15 bg-white/[0.05] p-6 transition duration-300 hover:border-[var(--primary)]/40 hover:bg-white/[0.08] hover:shadow-[0_15px_40px_rgba(255,107,168,0.1)]"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/0 via-transparent to-[var(--primary)]/0 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />

                  <div className="relative z-10">
                    <div className="mb-3 flex flex-wrap items-center gap-2 text-xs">
                      <span className="inline-flex items-center rounded-full border border-[var(--primary)]/35 bg-[var(--primary)]/12 px-3 py-1.5 font-semibold text-[var(--accent)]">
                        {step.phase}
                      </span>
                      <span className="inline-flex items-center rounded-full border border-white/20 bg-white/8 px-3 py-1.5 text-xs font-medium text-white/70">
                        {step.period}
                      </span>
                    </div>

                    <h3 className="mb-3 text-lg font-semibold text-white">
                      {step.title}
                    </h3>

                    <p className="mb-4 text-sm leading-6 text-white/80">{step.summary}</p>

                    <div className="flex flex-wrap gap-2">
                      {step.highlights.map((highlight) => (
                        <span
                          key={`${step.title}-${highlight}`}
                          className="inline-flex items-center rounded-md border border-[var(--primary)]/25 bg-[var(--primary)]/8 px-2.5 py-1 text-xs font-medium text-[var(--accent)]"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>

                    {/* DSA Growth Coding Profile Proof Link (scroll to section) */}
                    {step.title === "Consistent DSA Growth" && (
                      <a
                        href="#profiles"
                        onClick={e => {
                          e.preventDefault();
                          const section = document.getElementById("profiles");
                          if (section) section.scrollIntoView({ behavior: "smooth", block: "start" });
                        }}
                        className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium tracking-[0.06em] text-white/75 transition hover:text-[var(--primary)] border border-white/20 bg-white/5 rounded-md px-3 py-2"
                      >
                        View Coding Profile
                        <ExternalLink size={12} className="credential-icon" />
                      </a>
                    )}

                    {/* GSSoC Proof Link */}
                    {step.title === "Contributor and Community Builder" && step.proofImage && (
                      <a
                        href={step.proofImage}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium tracking-[0.06em] text-white/75 transition hover:text-[var(--primary)] border border-white/20 bg-white/5 rounded-md px-3 py-2"
                      >
                        View Proof
                        <ExternalLink size={12} className="credential-icon" />
                      </a>
                    )}
                  </div>
                </motion.article>
              ))}
          </div>
        </motion.section>

        <motion.section
          id="coding-profiles"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="hero-cinematic rounded-3xl p-7 md:p-8 space-y-6"
        >
          <h2 className="section-title text-2xl font-semibold md:text-3xl">Skills</h2>

          {/* tab switcher */}
          <div className="flex flex-wrap gap-2">
            {skillGroups.map(({ title, icon: Icon }) => {
              const isActive = activeSkillGroup === title;
              return (
                <button
                  key={title}
                  type="button"
                  suppressHydrationWarning
                  onClick={() => setActiveSkillGroup(title)}
                  className={`skill-tab inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition hover:-translate-y-0.5 ${
                    isActive
                      ? "skill-tab-active bg-[var(--primary)] text-black shadow-lg shadow-[var(--primary)]/20"
                      : "border border-white/20 bg-white/5 hover:bg-white/10"
                  }`}
                >
                  <Icon size={14} />
                  {title}
                </button>
              );
            })}
          </div>

          {/* active group panel */}
          {skillGroups.map(({ title, items, icon: Icon }) =>
            title === activeSkillGroup ? (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="mb-4 flex items-center gap-2 text-[var(--primary)]">
                  <Icon size={18} />
                  <span className="font-semibold">{title}</span>
                  <span className="ml-auto rounded-full border border-[var(--primary)]/30 bg-[var(--primary)]/10 px-2.5 py-0.5 text-xs">
                    {items.length} skills
                  </span>
                </div>

                <div className="flex flex-wrap gap-3">
                  {items.map((skill, i) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.25, delay: i * 0.05 }}
                      whileHover={{ scale: 1.08, y: -2 }}
                      className="cursor-default rounded-full border border-[var(--primary)]/30 bg-[var(--primary)]/10 px-4 py-1.5 text-sm font-medium text-[var(--primary)] transition"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ) : null
          )}

        </motion.section>

        <motion.section
          id="projects"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="hero-cinematic rounded-3xl p-7 md:p-8 space-y-6"
        >
          <h2 className="section-title text-2xl font-semibold md:text-3xl">Projects</h2>

          <div className="light-border-soft grid gap-3 rounded-2xl border border-white/15 bg-white/[0.04] p-4 lg:grid-cols-[1.15fr_auto] lg:items-center">
            <label className="light-border-strong flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-3 py-2">
              <Search size={15} className="text-white/60" />
              <input
                type="search"
                suppressHydrationWarning
                value={projectSearch}
                onChange={(event) => setProjectSearch(event.target.value)}
                placeholder="Search by Project Title or Technology"
                className="w-full bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
              />
            </label>

            <div className="flex flex-wrap items-center gap-2">
              {projectDomainOrder.map((domain) => {
                const isActive = activeProjectDomain === domain;
                return (
                  <button
                    key={domain}
                    type="button"
                    suppressHydrationWarning
                    onClick={() => setActiveProjectDomain(domain)}
                    className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                      isActive
                        ? "border border-[var(--primary)]/55 bg-[var(--primary)]/20 text-[var(--accent)]"
                        : "border border-white/20 bg-white/5 text-white/75 hover:bg-white/10"
                    }`}
                  >
                    {domain}
                  </button>
                );
              })}
              <span className="ml-1 text-xs text-white/65">{filteredProjectCount} Results</span>
            </div>
          </div>

          <h3 className="text-lg font-semibold text-[var(--primary)] md:text-xl">Featured Projects</h3>
          <div className="grid items-stretch gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredFeaturedProjects.map((project) => (
              <motion.article
                key={project.title}
                whileHover={{ y: -6, scale: 1.03 }}
                className="project-card group relative flex h-full min-h-[300px] flex-col overflow-hidden rounded-3xl border border-white/15 bg-black/55 md:min-h-[320px]"
              >
                <div
                  className="project-head relative h-14"
                  style={{
                    background:
                      "linear-gradient(140deg, #140d1f 0%, #2b1236 52%, #421741 100%)",
                  }}
                >
                  <div className="project-head-overlay absolute inset-0 bg-gradient-to-t from-black/75 via-black/45 to-transparent" />
                  <div className="project-head-badge absolute left-4 top-3 rounded-full border border-white/15 bg-black/55 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur-sm">
                    <span className="mr-1.5 inline-block h-2 w-2 rounded-full bg-[var(--primary)]" />
                    Project
                  </div>
                  <Code2
                    size={18}
                    className="project-head-icon absolute right-4 top-3 text-white/80 transition group-hover:text-[var(--primary)]"
                  />
                </div>
                <div className="project-hover-glow pointer-events-none absolute inset-0" />

                <div className="flex flex-1 flex-col px-4 py-3 md:px-5 md:py-4">
                  <h3 className="line-clamp-2 text-xl font-semibold leading-snug tracking-tight text-white">
                    {project.title}
                  </h3>
                  <div className="project-tech-pill mt-3 inline-flex w-fit items-center rounded-full border border-[var(--primary)]/35 bg-[var(--primary)]/10 px-2.5 py-1 text-[11px] font-medium text-[var(--accent)]">
                    Tech: {project.primaryTech}
                  </div>
                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-white/70">
                    {project.description}
                  </p>

                  <div className="mt-auto flex items-center gap-2 border-t border-white/10 pt-4">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-3 py-1.5 text-xs text-white/85 transition hover:bg-white/10"
                    >
                      <Github size={13} /> View Repo
                    </a>
                    <span
                      aria-hidden="true"
                      className="inline-flex min-w-[88px] items-center justify-center px-3 py-1.5 text-xs opacity-0"
                    >
                      Live Demo
                    </span>
                    <button
                      type="button"
                      suppressHydrationWarning
                      onClick={() => setSelectedProject(project)}
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-3 py-1.5 text-xs text-white/85 transition hover:bg-white/10"
                    >
                      <ExternalLink size={12} /> Details
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
            {filteredFeaturedProjects.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-white/25 bg-white/[0.03] p-5 text-sm text-white/75 md:col-span-2 xl:col-span-3">
                No featured projects match the current filters. Try another domain or keyword.
              </div>
            ) : null}
          </div>

          <h3 className="pt-6 text-lg font-semibold text-[var(--primary)] md:text-xl">More Projects</h3>
          <div className="grid items-stretch gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredRemainingProjects.map((project) => (
              <motion.article
                key={project.title}
                whileHover={{ y: -6, scale: 1.03 }}
                className="project-card group relative flex h-full min-h-[300px] flex-col overflow-hidden rounded-3xl border border-white/15 bg-black/55 md:min-h-[320px]"
              >
                <div
                  className="project-head relative h-14"
                  style={{
                    background:
                      "linear-gradient(140deg, #140d1f 0%, #2b1236 52%, #421741 100%)",
                  }}
                >
                  <div className="project-head-overlay absolute inset-0 bg-gradient-to-t from-black/75 via-black/45 to-transparent" />
                  <div className="project-head-badge absolute left-4 top-3 rounded-full border border-white/15 bg-black/55 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur-sm">
                    <span className="mr-1.5 inline-block h-2 w-2 rounded-full bg-[var(--primary)]" />
                    Project
                  </div>
                  <Code2
                    size={18}
                    className="project-head-icon absolute right-4 top-3 text-white/80 transition group-hover:text-[var(--primary)]"
                  />
                </div>
                <div className="project-hover-glow pointer-events-none absolute inset-0" />

                <div className="flex flex-1 flex-col px-4 py-3 md:px-5 md:py-4">
                  <h3 className="line-clamp-2 text-xl font-semibold leading-snug tracking-tight text-white">
                    {project.title}
                  </h3>
                  <div className="project-tech-pill mt-3 inline-flex w-fit items-center rounded-full border border-[var(--primary)]/35 bg-[var(--primary)]/10 px-2.5 py-1 text-[11px] font-medium text-[var(--accent)]">
                    Tech: {project.primaryTech}
                  </div>
                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-white/70">
                    {project.description}
                  </p>

                  <div className="mt-auto flex items-center gap-2 border-t border-white/10 pt-4">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-3 py-1.5 text-xs text-white/85 transition hover:bg-white/10"
                    >
                      <Github size={13} /> View Repo
                    </a>
                    <span
                      aria-hidden="true"
                      className="inline-flex min-w-[88px] items-center justify-center px-3 py-1.5 text-xs opacity-0"
                    >
                      Live Demo
                    </span>
                    <button
                      type="button"
                      suppressHydrationWarning
                      onClick={() => setSelectedProject(project)}
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-3 py-1.5 text-xs text-white/85 transition hover:bg-white/10"
                    >
                      <ExternalLink size={12} /> Details
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
            {filteredRemainingProjects.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-white/25 bg-white/[0.03] p-5 text-sm text-white/75 md:col-span-2 xl:col-span-3">
                No additional projects match the current filters.
              </div>
            ) : null}
          </div>
        </motion.section>

        <motion.section
          id="profiles"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="hero-cinematic rounded-3xl p-7 md:p-8 space-y-4"
        >
          <h2 className="section-title text-2xl font-semibold md:text-3xl">Coding Profiles</h2>
          <div className="flex flex-wrap gap-2">
            {codingProfiles.map((profile) => (
              <a
                key={`visit-${profile.name}`}
                href={profile.link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-4 py-2 text-sm font-medium transition hover:-translate-y-0.5 hover:border-[var(--primary)] hover:text-[var(--primary)]"
              >
                Visit {profile.name}
              </a>
            ))}
          </div>
          <div className="grid gap-4 lg:grid-cols-[1.25fr_0.95fr]">
            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-1">
            {codingProfiles.map((profile) => {
              const Icon = profile.icon;
              const isActive = activeProfile === profile.name;
              const profileTheme = {
                border: "rgba(191, 129, 92, 0.52)",
                glow: "rgba(191, 129, 92, 0.32)",
                chip: "rgba(191, 129, 92, 0.2)",
                bg: "rgba(191, 129, 92, 0.12)",
              };

              return (
                <motion.button
                  key={profile.name}
                  type="button"
                  suppressHydrationWarning
                  whileHover={{ y: -4, scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => setActiveProfile(profile.name)}
                  style={
                    {
                      "--profile-border": profileTheme.border,
                      "--profile-glow": profileTheme.glow,
                      "--profile-chip": profileTheme.chip,
                      "--profile-bg": profileTheme.bg,
                    } as React.CSSProperties
                  }
                  className={`profile-card glass rounded-2xl p-5 text-left transition ${
                    isActive
                      ? "profile-card-active border-[var(--primary)] bg-white/10"
                      : "hover:-translate-y-1"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                    <Icon size={18} className="text-[var(--primary)]" />
                    <h3 className="font-semibold">{profile.name}</h3>
                    </div>
                    <span
                      className={`profile-chip rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] transition ${
                        isActive
                          ? "profile-chip-active bg-[var(--primary)] text-black"
                          : "bg-white/10 text-white/70"
                      }`}
                    >
                      {isActive ? "Active" : "Select"}
                    </span>
                  </div>
                  <div className="profile-stats mt-3 space-y-1 text-sm text-white/85">
                    {profile.stats.map((stat) => (
                      <p key={stat}>{stat}</p>
                    ))}
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {profile.metrics.map((metric) => (
                      <span key={metric} className="profile-metric-chip rounded-full bg-white/8 px-2.5 py-1 text-[11px]">
                        {metric}
                      </span>
                    ))}
                  </div>
                </motion.button>
              );
            })}
            </div>

            <motion.div
              key={selectedProfile.name}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="glass rounded-2xl p-6"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-mono text-xs tracking-[0.2em] text-[var(--accent)]">PROFILE DETAILS</p>
                  <h3 className="mt-2 text-xl font-semibold">{selectedProfile.name}</h3>
                </div>
                <SelectedProfileIcon size={22} className="text-[var(--primary)]" />
              </div>

              <p className="mt-4 text-sm leading-7 text-white/85">{selectedProfile.highlight}</p>

              <div className="mt-5 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                {selectedProfile.stats.map((stat) => (
                  <div key={stat} className="rounded-xl border border-white/12 bg-white/5 p-3 text-sm">
                    {stat}
                  </div>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {selectedProfile.metrics.map((metric) => (
                  <span
                    key={metric}
                    className="rounded-full border border-[var(--primary)]/30 bg-[var(--primary)]/12 px-3 py-1 text-xs"
                  >
                    {metric}
                  </span>
                ))}
              </div>

              <a
                href={selectedProfile.link}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-black"
              >
                Visit {selectedProfile.name} <ExternalLink size={14} />
              </a>
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          id="github"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="hero-cinematic rounded-3xl p-7 md:p-8"
        >
          <h2 className="section-title text-2xl font-semibold md:text-3xl">GitHub Activity</h2>

          <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_148px]">
            <div>
              <div className="mt-4 flex items-center justify-between gap-4 text-sm text-[#8b949e]">
                <p className="text-[15px] font-medium text-[#f0f6fc] md:text-[18px]">
                  {staticGithubContributionTotal} contributions in the last year
                </p>
                <div className="hidden items-center gap-2 md:flex">
                  <span>Contribution settings</span>
                  <span className="h-0 w-0 border-x-4 border-t-[5px] border-x-transparent border-t-[#8b949e]" />
                </div>
              </div>

              <div className="mt-4 rounded-md border border-[#30363d] bg-[#0d1117] px-4 py-5 md:px-7 md:py-6">
                <div className="relative mb-4 ml-11 h-5">
                  {githubMonthMarkers.map((month) => (
                    <span
                      key={`${month.label}-${month.weekIndex}`}
                      className="absolute text-xs text-[#f0f6fc]"
                      style={{
                        left: `${(month.weekIndex / Math.max(githubActivityWeeks.length - 1, 1)) * 100}%`,
                      }}
                    >
                      {month.label}
                    </span>
                  ))}
                </div>

                <div className="flex items-start gap-4">
                  <div className="grid grid-rows-7 gap-[3px] pt-[2px] text-xs text-[#f0f6fc]">
                    <span className="row-start-2">Mon</span>
                    <span className="row-start-4">Wed</span>
                    <span className="row-start-6">Fri</span>
                  </div>

                  <div className="overflow-x-auto">
                    <div className="flex gap-[3px] pb-1">
                      {githubActivityWeeks.map((week, weekIndex) => (
                        <div key={`week-${weekIndex}`} className="grid grid-rows-7 gap-[3px]">
                          {Array.from({ length: 7 }).map((_, dayIndex) => {
                            const day = week[dayIndex] ?? null;
                            return (
                              <span
                                key={`day-${weekIndex}-${dayIndex}`}
                                className="h-[11px] w-[11px] rounded-[2px] border border-black/0"
                                style={{ backgroundColor: day ? contributionLevelColor(day.level) : "#161b22" }}
                                title={day ? `${day.date}: ${day.count} contributions` : ""}
                                aria-hidden="true"
                              />
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex flex-col gap-3 text-xs text-[#8b949e] md:flex-row md:items-center md:justify-between">
                  <span>Learn how we count contributions</span>
                  <div className="flex items-center gap-2 self-end md:self-auto">
                    <span>Less</span>
                    <div className="flex items-center gap-1">
                      {[0, 1, 2, 3, 4].map((level) => (
                        <span
                          key={level}
                          className="h-[10px] w-[10px] rounded-[2px]"
                          style={{ backgroundColor: contributionLevelColor(level) }}
                        />
                      ))}
                    </div>
                    <span>More</span>
                  </div>
                </div>
              </div>

              <h3 className="mt-8 text-[18px] font-medium text-[#f0f6fc]">Contribution activity</h3>
            </div>

            <div className="hidden xl:block">
              <div className="space-y-3 text-center text-[15px] text-[#8b949e]">
                {staticGithubYears.map((year) => {
                  const isActive = year === staticGithubActiveYear;
                  return (
                    <div
                      key={year}
                      className={`rounded-md px-5 py-4 transition ${
                        isActive ? "bg-[#1f6feb] text-white" : "bg-transparent text-[#8b949e]"
                      }`}
                    >
                      {year}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div className="overflow-hidden rounded-xl border border-white/15 bg-black/25 p-2">
              <div className="rounded-lg border border-[#21365f] bg-[#0b1020] p-5 text-[#b7fbff]">
                <h3 className="text-3xl font-semibold tracking-tight text-[#ff4fa3]">Shivangi Singh&apos;s GitHub Stats</h3>
                <p className="mt-1 text-xs text-[#7bd9db]">Static snapshot matching your current profile</p>

                <div className="mt-5 flex items-start gap-4">
                  <div className="flex-1 space-y-3 text-sm">
                    <div className="flex items-center gap-2">
                      <Star size={14} className="shrink-0 text-[#f6db56]" />
                      <span className="flex-1 text-[#f6db56]">Total Stars Earned:</span>
                      <span className="font-bold text-[#b7fbff]">{githubStats.totalStars}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={14} className="shrink-0 text-[#f6db56]" />
                      <span className="flex-1 text-[#f6db56]">Total Commits (last year):</span>
                      <span className="font-bold text-[#b7fbff]">{githubStats.commitsLastYear}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <GitPullRequest size={14} className="shrink-0 text-[#f6db56]" />
                      <span className="flex-1 text-[#f6db56]">Total PRs:</span>
                      <span className="font-bold text-[#b7fbff]">{githubStats.totalPrsLastYear}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <AlertCircle size={14} className="shrink-0 text-[#f6db56]" />
                      <span className="flex-1 text-[#f6db56]">Total Issues:</span>
                      <span className="font-bold text-[#b7fbff]">{githubStats.totalIssuesLastYear}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Package size={14} className="shrink-0 text-[#f6db56]" />
                      <span className="flex-1 text-[#f6db56]">Contributed to (last year):</span>
                      <span className="font-bold text-[#b7fbff]">{githubStats.activeReposLastYear}</span>
                    </div>
                  </div>

                  <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-2 border-[#ff4fa3]/40 bg-[#0d1f40]">
                    <Github size={38} className="text-[#7bd9db]" />
                  </div>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-white/15 bg-black/25 p-2">
              <div className="rounded-lg border border-[#21365f] bg-[#0b1020] p-5 text-[#b7fbff]">
                <h3 className="text-3xl font-semibold tracking-tight text-[#ff4fa3]">Most Used Languages</h3>
                <p className="mt-1 text-xs text-[#7bd9db]">Static snapshot of repository language distribution</p>

                <div className="mt-6 h-3 w-full overflow-hidden rounded-full bg-[#23334f]">
                  <div className="flex h-full w-full">
                    {githubLanguageStats.map((language) => (
                      <span
                        key={language.name}
                        style={{
                          width: `${(language.percent / githubLanguageTotal) * 100}%`,
                          backgroundColor: language.color,
                        }}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                </div>

                <div className="mt-6 grid gap-x-8 gap-y-4 text-[1.9rem] leading-none md:grid-cols-2">
                  {githubLanguageStats.map((language) => (
                    <div key={language.name} className="flex items-center gap-2 text-sm md:text-base">
                      <span
                        className="h-3.5 w-3.5 rounded-full"
                        style={{ backgroundColor: language.color }}
                        aria-hidden="true"
                      />
                      <span className="text-[#b7fbff]">
                        {language.name} {language.percent.toFixed(2)}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          id="certifications"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="hero-cinematic rounded-3xl p-7 md:p-8 space-y-4"
        >
          <div className="flex items-center justify-between gap-4">
            <h2 className="section-title text-2xl font-semibold md:text-3xl">Top Certifications</h2>
            <button
              type="button"
              suppressHydrationWarning
              onClick={() => setIsCertificationsModalOpen(true)}
              className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-sm font-medium text-white/85 transition hover:border-[var(--primary)] hover:text-[var(--primary)]"
            >
              View All <span aria-hidden="true">→</span>
            </button>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {topCertifications.map((certificate) => (
              <CertificationCard key={certificate.title} certificate={certificate} />
            ))}
          </div>
        </motion.section>

        <motion.section
          id="extracurricular"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="hero-cinematic rounded-3xl p-7 md:p-8"
        >
          <h2 className="section-title text-2xl font-semibold md:text-3xl">Extracurricular Activities</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {extracurricularActivities.map((activity) => (
              <motion.article
                key={`${activity.title}-${activity.organization}`}
                whileHover={{ y: -4, scale: 1.01 }}
                className="extra-card group rounded-2xl border border-white/15 bg-gradient-to-br from-white/12 to-transparent p-5"
              >
                <Sparkles size={18} className="extra-icon text-[var(--accent)] transition" />
                <h3 className="mt-3 text-base font-semibold">{activity.title}</h3>
                <p className="mt-1 text-xs font-medium tracking-wide text-[var(--primary)] uppercase">
                  {activity.organization}
                </p>
                <p className="mt-3 text-sm leading-7 text-white/85">{activity.description}</p>
              </motion.article>
            ))}
          </div>
        </motion.section>

        <motion.section
          id="contact"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="hero-cinematic relative overflow-hidden rounded-3xl p-7 md:p-10"
        >
          {/* decorative blobs */}
          <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-[var(--primary)]/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-[var(--secondary)]/20 blur-3xl pointer-events-none" />

          <p className="font-mono text-xs tracking-[0.2em] text-[var(--accent)]">GET IN TOUCH</p>
          <h2 className="section-title mt-2 text-2xl font-semibold md:text-3xl">Let&apos;s Connect</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-white/85 md:text-base">
            I&apos;m always open to meaningful collaborations and impactful projects. Whether you have an
            idea, an opportunity, or just want to say hi, my inbox is always open.
          </p>

          {/* contact cards */}
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <a
              href={profileLinks.email}
              className="contact-card group glass flex flex-col items-center gap-3 rounded-2xl p-5 text-center transition hover:-translate-y-1 hover:border-[var(--primary)]/50"
            >
              <span className="contact-icon flex h-11 w-11 items-center justify-center rounded-full bg-[var(--primary)]/15 text-[var(--primary)] transition group-hover:bg-[var(--primary)]/25">
                <Mail size={20} />
              </span>
              <div>
                <p className="text-sm font-semibold">Email</p>
                <p className="mt-1 break-all text-xs text-white/60">2005shivangisingh@gmail.com</p>
              </div>
              <span className="contact-action mt-auto rounded-full bg-[var(--primary)]/10 px-3 py-1 text-[11px] font-medium text-[var(--primary)] transition">
                Send a message
              </span>
            </a>

            <a
              href={profileLinks.linkedin}
              target="_blank"
              rel="noreferrer"
              className="contact-card group glass flex flex-col items-center gap-3 rounded-2xl p-5 text-center transition hover:-translate-y-1 hover:border-[var(--primary)]/50"
            >
              <span className="contact-icon flex h-11 w-11 items-center justify-center rounded-full bg-[var(--primary)]/15 text-[var(--primary)] transition group-hover:bg-[var(--primary)]/25">
                <Linkedin size={20} />
              </span>
              <div>
                <p className="text-sm font-semibold">LinkedIn</p>
                <p className="mt-1 text-xs text-white/60">shivangi131</p>
              </div>
              <span className="contact-action mt-auto rounded-full bg-[var(--primary)]/10 px-3 py-1 text-[11px] font-medium text-[var(--primary)] transition">
                Connect with me
              </span>
            </a>

            <a
              href={profileLinks.github}
              target="_blank"
              rel="noreferrer"
              className="contact-card group glass flex flex-col items-center gap-3 rounded-2xl p-5 text-center transition hover:-translate-y-1 hover:border-[var(--primary)]/50"
            >
              <span className="contact-icon flex h-11 w-11 items-center justify-center rounded-full bg-[var(--primary)]/15 text-[var(--primary)] transition group-hover:bg-[var(--primary)]/25">
                <Github size={20} />
              </span>
              <div>
                <p className="text-sm font-semibold">GitHub</p>
                <p className="mt-1 text-xs text-white/60">ShivangiSingh13</p>
              </div>
              <span className="contact-action mt-auto rounded-full bg-[var(--primary)]/10 px-3 py-1 text-[11px] font-medium text-[var(--primary)] transition">
                View my work
              </span>
            </a>
          </div>

          {/* form + badge row */}
          <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1.2fr]">

            {/* left — badge + quick links */}
            <div className="flex flex-col gap-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-4 py-2 text-sm text-green-400 w-fit">
                <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
                Available for opportunities!
              </div>
              <p className="text-sm leading-7 text-white/70">
                Prefer a quick message? Use the form and I&apos;ll get back to you as soon as possible.
              </p>

              <div className="light-border-soft rounded-2xl border border-white/15 bg-white/[0.03] p-4">
                <p className="text-xs font-semibold tracking-[0.12em] text-[var(--accent)]">RESPONSE PROMISE</p>
                <p className="mt-2 text-sm leading-6 text-white/80">
                  I usually respond within 24 hours for internship, collaboration, and project inquiries.
                </p>
              </div>

              <div className="light-border-soft rounded-2xl border border-white/15 bg-white/[0.03] p-4">
                <p className="text-xs font-semibold tracking-[0.12em] text-[var(--accent)]">AVAILABILITY SNAPSHOT</p>
                <div className="mt-3 flex flex-wrap gap-2 text-xs">
                  <span className="rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-white/85">Current: Open</span>
                  <span className="rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-white/85">Start Date: Immediate</span>
                  <span className="rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-white/85">Mode: Remote / Onsite</span>
                </div>
              </div>
            </div>

            {/* right — contact form */}
            <form onSubmit={handleFormSubmit} className="glass rounded-2xl p-6 flex flex-col gap-4">
              <h3 className="text-base font-semibold">Send a Message</h3>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-name" className="text-xs font-medium text-white/70">Name</label>
                  <input
                    id="contact-name"
                    type="text"
                    suppressHydrationWarning
                    required
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                    className="rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm placeholder:text-white/30 focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-email" className="text-xs font-medium text-white/70">Email</label>
                  <input
                    id="contact-email"
                    type="email"
                    suppressHydrationWarning
                    required
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                    className="rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm placeholder:text-white/30 focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="contact-message" className="text-xs font-medium text-white/70">Message</label>
                <textarea
                  id="contact-message"
                  suppressHydrationWarning
                  required
                  rows={4}
                  placeholder="What would you like to say?"
                  value={formData.message}
                  onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                  className="resize-none rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm placeholder:text-white/30 focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
                />
              </div>

              <button
                type="submit"
                suppressHydrationWarning
                disabled={formStatus === "sending"}
                className="self-start rounded-full bg-[var(--primary)] px-6 py-2.5 text-sm font-semibold text-black transition hover:-translate-y-0.5 disabled:opacity-60"
              >
                {formStatus === "sending" ? "Sending…" : formStatus === "sent" ? "Message Sent ✓" : "Send Message"}
              </button>

              {formStatus === "sent" && (
                <p className="text-xs text-green-400">Thanks! I&apos;ll get back to you soon.</p>
              )}
              {formStatus === "error" && (
                <p className="text-xs text-red-400">Something went wrong. Please email me directly.</p>
              )}
              {formStatus === "fallback" && (
                <p className="text-xs text-amber-300">
                  Opened your email app as fallback. You can send the prefilled message directly.
                </p>
              )}
            </form>
          </div>
        </motion.section>
      </main>

      <AnimatePresence>
        {selectedProject && selectedProjectDetail ? (
          <ProjectDetailsModal
            project={selectedProject}
            detail={selectedProjectDetail}
            onClose={() => setSelectedProject(null)}
          />
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {isCertificationsModalOpen ? (
          <CertificationsModal
            certifications={[...certifications, ...otherCertifications]}
            onClose={() => setIsCertificationsModalOpen(false)}
          />
        ) : null}
      </AnimatePresence>

      <div className="fixed right-5 bottom-5 z-[9999]">
        {chatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="mb-3 w-[min(92vw,360px)] overflow-hidden rounded-2xl border border-[var(--primary)]/40 bg-black/85 shadow-2xl backdrop-blur-xl"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <div className="flex items-center gap-2">
                <Bot size={16} className="text-[var(--primary)]" />
                <p className="text-sm font-semibold">AI Portfolio Assistant</p>
              </div>
              <button
                type="button"
                suppressHydrationWarning
                onClick={() => setChatOpen(false)}
                className="rounded-full p-1 text-white/70 hover:bg-white/10 hover:text-white"
                aria-label="Close assistant"
              >
                <X size={14} />
              </button>
            </div>

            <div className="max-h-72 space-y-3 overflow-y-auto px-4 py-3 text-sm">
              {chatMessages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={`rounded-xl px-3 py-2 leading-6 ${
                    message.role === "user"
                      ? "ml-8 bg-[var(--primary)]/20 text-white"
                      : "mr-8 border border-white/10 bg-white/5 text-white/90"
                  }`}
                >
                  {message.text}
                </div>
              ))}
              {chatThinking && (
                <div className="mr-8 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white/80">
                  Thinking...
                </div>
              )}
            </div>

            <form onSubmit={handleChatSubmit} className="flex items-center gap-2 border-t border-white/10 p-3">
              <input
                suppressHydrationWarning
                value={chatInput}
                onChange={(event) => setChatInput(event.target.value)}
                placeholder="Ask about Shivangi..."
                className="flex-1 rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:border-[var(--primary)] focus:outline-none"
              />
              <button
                type="button"
                suppressHydrationWarning
                onClick={sendChatMessage}
                className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--primary)] text-black transition hover:brightness-110"
                aria-label="Send message"
              >
                <SendHorizontal size={15} />
              </button>
            </form>
          </motion.div>
        )}

        <button
          type="button"
          suppressHydrationWarning
          onClick={() => setChatOpen((prev) => !prev)}
          className="inline-flex items-center gap-2 rounded-full border border-[var(--primary)]/40 bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-black shadow-xl shadow-[var(--primary)]/30 backdrop-blur-md transition hover:-translate-y-0.5 hover:brightness-110"
        >
          <span className="text-base">💬</span> Ask about Shivangi
        </button>
      </div>

      {scrollProgress > 24 ? (
        <button
          type="button"
          suppressHydrationWarning
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-5 left-5 z-[9999] inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/55 px-4 py-2 text-sm font-semibold text-white shadow-xl backdrop-blur-md transition hover:-translate-y-0.5 hover:border-[var(--primary)] hover:text-[var(--accent)]"
          aria-label="Back to top"
        >
          <ArrowUp size={14} /> Back to top
        </button>
      ) : null}
    </div>
  );
}
