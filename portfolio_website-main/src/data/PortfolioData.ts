import { Education, Certification, Project, Internship } from "../types";

// Projects
export const projects: Project[] = [
  {
    title: "Face Recognition",
    description:
      "AI-driven scalable web app for automated attendance using real-time facial recognition, secure authentication, geolocation, and an AI RAG assistant.",
    image: "img/fr.png", 
    github: "https://github.com/chinni-d",
    live: "https://fr.manikantadarapureddy.in",
    technologies: [
      "Next.js",
      "Face.js pipeline",
      "RAG",
      "MongoDB",
      "WebRTC",
      "Resend Service",
      "Browser Geolocation APIs",
    ],
    category: "AI",
  },
  {
    title: "VisionAI",
    description:
      "AI-powered computer vision platform featuring real-time object detection, hand gesture recognition, and face detection using MediaPipe and OpenCV technologies.",
    image: "img/visionai.png",
    github: "https://github.com/chinni-d/objectdetection",
    live: "https://visionai.manikantadarapureddy.in",
    technologies: [
      "Next.js",
      "MediaPipe",
      "TensorFlow",
      "PyTorch",
      "Resend",
      "Computer Vision",
      "CI/CD",
    ],
    category: "AI",
  },
  {
    title: "AI Chatbot",
    description:
      "An AI-powered chatbot that engages users in real-time conversations, providing helpful, human-like responses with a smooth and interactive chat experience.",
    image: "img/chat.png",
    github: "https://github.com/chinni-d/Multi_Modeled_AI_Chatbot",
    live: "https://chat.manikantadarapureddy.in",
    technologies: [
      "Next.js",
      "Python via Uvicorn",
      "GPT-4o mini",
      "GPT-4.1",
      "Gemini Pro",
      "Deepseek V3",
      "CI/CD",
    ],
    category: "AI",
  },
  {
    title: "Driver Safety AI",
    description:
      "A real-time driver safety monitoring application using client-side AI for face mesh tracking and object detection to prevent distracted driving and ensure road safety.",
    image: "img/drive_safe.png",
    github: "https://github.com/chinni-d/driver_safety_ai",
    live: "https://drivesafe.manikantadarapureddy.in",
    technologies: [
      "Next.js",
      "MediaPipe Face Mesh",
      "Object Detection",
      "WebRTC",
      "RAG",
      "Client-Side Processing",
      "Real-Time Analysis",
    ],
    category: "AI",
  },
  {
    title: "Diabetes Predictor",
    description:
      "This project predicts the likelihood of diabetes using machine learning algorithms and a user-friendly interface.",
    image: "img/predict.png",
    github: "https://github.com/chinni-d/diabetes_predictor",
    live: "https://app.manikantadarapureddy.in",
    technologies: [
      "Next.js",
      "ShadCN UI",
      "Flask",
      "scikit-learn",
      "Tailwind CSS",
      "Ensemble Learning",
      "CI/CD",
    ],
    category: "ML",
  },
  {
    title: "AI Analyzer",
    description:
      "A smart web app to upload PDFs, TXT, or DOCX files, URLs, and get contextual answers using RAG with LLMs and vector embeddings.",
    image: "img/chatai.png",
    github: "https://github.com/chinni-d/AI_Analyzer",
    live: "https://chatai.manikantadarapureddy.in",
    technologies: [
      "Next.js",
      "LangChain",
      "RetrievalQA",
      "FAISS",
      "OpenAI GPT-4o-mini",
      "Web Scraping",
      "CI/CD",
    ],
    category: "AI",
  },
  {
    title: "Kidney Stone Detection",
    description:
      "This project uses image classification techniques to detect kidney stones in medical scans.",
    image: "img/detect.png",
    github: "https://github.com/chinni-d/Kidney-stone-detection",
    live: "https://detect.manikantadarapureddy.in",
    technologies: [
      "MLP",
      "TensorFlow",
      "Flask",
      "PIL",
      "HTML",
      "TailWind CSS",
      "CSS",
      "JS",
      "CI/CD",
    ],
    category: "ML",
  },
  {
    title: "Cat vs Dog Classifier",
    description:
      "This project classifies images of cats and dogs using a Convolutional Neural Network (CNN) model built with TensorFlow and deployed using Flask.",
    image:
      "https://thaka.bing.com/th/id/OIP.Vt7nnxlt4r0XSfzYCik3hQAAAA?rs=1&pid=ImgDetMain",
    github: "https://github.com/chinni-d/catdog-classification",
    live: "https://classify.manikantadarapureddy.in",
    technologies: [
      "CNN",
      "TensorFlow",
      "Flask",
      "PIL",
      "HTML",
      "TailWind",
      "CSS",
      "JS",
      "CI/CD",
    ],
    category: "ML",
  },
  {
    title: "Sentiment Analysis",
    description:
      "A machine learning-based web application that analyzes customer reviews using sentiment classification algorithms to determine whether the sentiment is positive, negative, or neutral.",
    image: "https://www.altexsoft.com/media/2018/09/sentiment_analysis.jpg",
    github: "https://github.com/chinni-d/SentimentAnalysis",
    live: "https://sentiment.manikantadarapureddy.in",
    technologies: ["HTML", "CSS", "JavaScript", "Machine Learning", "CI/CD"],
    category: "ML",
  },
  {
    title: "Smart Dictionary",
    description:
      "A web application that provides word definitions, example sentences, visual images, and audio pronunciations using a public dictionary and Pexels API.",
    image:
      "https://img.freepik.com/premium-photo/ai-generated-illustrution-humanoid-robot-with-artificial-intelligence-reading-book_441362-10274.jpg",
    github: "https://github.com/chinni-d/Smart_Dictionary",
    live: "https://smartdict.manikantadarapureddy.in",
    technologies: [
      "Next.js",
      "Tailwind CSS",
      "TypeScript",
      "Dictionary API",
      "Pexels API",
      "CI/CD",
    ],
    category: "Web Dev",
  },

];

// Education
export const education: Education[] = [
  {
    degree: "B.Tech in Computer Science",
    institution: "Bonam Venkata Chalamayya Engineering College, Odalarevu",
    duration: "2022 - 2026",
    description: "Specialized in Artificial Intelligence and Data Science",
    logo: "/img/bvc.png", // Replace with your college logo URL if available
  },
  {
    degree: "MPC Intermediate",
    institution: "Educare Junior College, Nagaram",
    duration: "2020 - 2022",
    description: "Studied Mathematics, Physics, and Chemistry",
    logo: "/img/educare.png", // Replace with your junior college logo URL if available
  },
  {
    degree: "SSC",
    institution: "Educare E.M School, Nagaram",
    duration: "2019 - 2020",
    description: "Completed 10th standard with a strong academic record",
    logo: "/img/educare.png", // Replace with your school logo URL if available
  },
];

// Certifications
export const certifications: Certification[] = [
  {
    name: " Certified Application Developer",
    issuer: "ServiceNow",
    date: "2025",
    image: "img/cad_servicenow.png",
    url: "img/cad.png",
  },
  {
    name: "Certified System Administrator",
    issuer: "ServiceNow",
    date: "2025",
    image: "img/csa_servicenow.png",
    url: "img/csa.png",
  },
  {
    name: "IBM Data Analyst",
    issuer: "IBM",
    date: "2025",
    image: "img/ibm_data_analyst.png",
    url: "img/certi6.png",
  },
  {
    name: "Data-Driven Decisions with PowerBI",
    issuer: "IBM",
    date: "2025",
    image: "img/powerbi.png",
    url: "img/certi1.png",
  },
  {
    name: "Introduction to Web Development",
    issuer: "IBM",
    date: "2024",
    image: "img/web_dev.png",
    url: "img/certi5.png",
  },
  {
    name: "Excel Basics for Data Analysis",
    issuer: "IBM",
    date: "2024",
    image: "img/excel_analysis.png",
    url: "img/certi3.png",
  },
  {
    name: "Python for Data Science & AI Development",
    issuer: "IBM",
    date: "2025",
    image: "img/python_ai.png",
    url: "img/certi4.png",
  },
  {
    name: "Introduction to Data Analysis",
    issuer: "IBM",
    date: "2024",
    image: "img/data_analysis.png",
    url: "img/certi2.png",
  },
  {
    name: "Data Visualization with Excel and Cognos",
    issuer: "IBM",
    date: "2025",
    image: "img/data_viz_cognos.png",
    url: "img/certi7.png",
  },
  {
    name: "Data Visualization with Python",
    issuer: "IBM",
    date: "2025",
    image: "img/data_viz_python.png",
    url: "img/certi8.png",
  },
  {
    name: "Python Project for Data Science",
    issuer: "IBM",
    date: "2025",
    image: "img/python_project.png",
    url: "img/certi9.png",
  },
];

// Internships
export const internships: Internship[] = [
  {
    title: "Web Development",
    startDate: "May 2024",
    endDate: "June 2024",
    myName: "Manikanta Darapureddy",
    certificateName: "Web Development",
    certificate: "img/intern_web_dev.png",
    url: "img/certi10.png",
  },
  {
    title: "Cybersecurity & Ethical Hacking Intern",
    startDate: "May 2024",
    endDate: "June 2024",
    myName: "Manikanta Darapureddy",
    certificateName: "Cybersecurity",
    certificate: "img/cybersecurity.png",
    url: "img/certi11.png",
  },
  {
    title: "AWS-CLOUD COMPUTING Workshop",
    startDate: "19-08-2024",
    endDate: "24-08-2024",
    myName: "Manikanta Darapureddy",
    certificateName: "AWS-CLOUD COMPUTING",
    certificate: "img/aws_cloud.png",
    url: "img/certi12.png",
  },
  {
    title: "Python Development",
    startDate: "30-05-2025",
    endDate: "30-06-2025",
    myName: "Manikanta Darapureddy",
    certificateName: "Python Development",
    certificate: "img/python_dev_intern.png",
    url: "img/pythondevelopment.png",
  },
];
