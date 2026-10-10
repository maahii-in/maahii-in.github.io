import { Education, Certification, Project, Experience } from "../types";

// Projects
export const projects: Project[] = [
  {
    title: "Real-Time AI Voice Agent",
    description:
      "A real-time AI voice agent built with LiveKit for low-latency conversations. An STT/TTS pipeline connects to an LLM backend for multi-turn voice chats, using the LiveKit Agents framework for room and track management.",
    image: "img/project_voice_agent.svg",
    github: "https://github.com/mahieshwar-budati/javis-live-voice-agent",
    technologies: ["Python", "LiveKit", "STT/TTS", "LLM"],
    category: "AI",
  },
  {
    title: "Retrieval-Augmented Generation (RAG) AI System",
    description:
      "A context-aware AI system that answers user queries accurately from document datasets using LangChain and vector search. Includes data pipelines for document chunking, embedding generation and semantic similarity search.",
    image: "img/project_rag.svg",
    github: "https://github.com/mahieshwar-budati/Basic-Advance-RAG",
    technologies: ["Python", "LangChain", "RAG", "Vector Search", "Embeddings"],
    category: "AI",
  },
  {
    title: "AI-Based Suicidal Tendencies Detection Model",
    description:
      "An NLP-based machine learning model that detects suicidal tendencies from text data. Data preprocessing and model training were done with Python, Pandas and Scikit-learn.",
    image: "img/project_nlp.svg",
    github: "https://github.com/mahieshwar-budati/suicidal-tendency-report",
    technologies: ["Python", "NLP", "Pandas", "Scikit-learn", "Machine Learning"],
    category: "ML",
  },
];

// Work experience
export const experience: Experience[] = [
  {
    title: "AI Engineer",
    company: "XaasIO Pvt Ltd",
    location: "Coimbatore, India (Remote)",
    duration: "Dec 2025 - Present",
    points: [
      "Built AI/ML workflow automation pipelines using Kubeflow and MLflow for model tracking and orchestration.",
      "Developed Retrieval-Augmented Generation (RAG) based intelligent retrieval systems, including a live voice agent and a document-insight chatbot using LangChain and NLP.",
      "Integrated Milvus, LangGraph, and vLLM for vector search, workflow orchestration, and efficient model serving.",
      "Managed deployment environments with Linux, Docker, and version control using Git.",
    ],
    skills: [
      "Python", "Linux", "Docker", "Kubeflow", "MLflow", "LangChain",
      "LangGraph", "Milvus", "vLLM", "RAG", "FastAPI", "Git", "NLP",
    ],
  },
];

// Education
export const education: Education[] = [
  {
    degree: "Bachelor of Technology, Information Technology",
    institution: "Chirala Engineering College, JNTU Kakinada, Andhra Pradesh",
    duration: "2021 - 2025",
    description: "CGPA: 8.0 / 10",
  },
  {
    degree: "Intermediate",
    institution: "Narayana Junior College, Chirala, Andhra Pradesh",
    duration: "2019 - 2021",
    description: "Completed intermediate education at Narayana Junior College, Chirala.",
  },
  {
    degree: "Secondary Education",
    institution: "Sri Chaitanya School, Chirala, Andhra Pradesh",
    duration: "2015 - 2019",
    description: "Completed secondary education at Sri Chaitanya School, Chirala.",
  },
];

// Certifications
// Replace the .svg files in public/img with screenshots of your real certificates
// (keep the file names, or update the paths below).
export const certifications: Certification[] = [
  {
    name: "OCI AI Foundations & OCI Generative AI",
    issuer: "Oracle",
    date: "Certified",
    image: "img/cert_oracle.svg",
    url: "img/cert_oracle.svg",
  },
  {
    name: "Azure Fundamentals",
    issuer: "Microsoft",
    date: "Certified",
    image: "img/cert_azure.svg",
    url: "img/cert_azure.svg",
  },
  {
    name: "Big Data 101, 201, 301",
    issuer: "Infosys",
    date: "Certified",
    image: "img/cert_infosys.svg",
    url: "img/cert_infosys.svg",
  },
  {
    name: "Generative AI Workshops",
    issuer: "IIT Hyderabad & IIT Madras",
    date: "Workshop",
    image: "img/cert_iit.svg",
    url: "img/cert_iit.svg",
  },
];
