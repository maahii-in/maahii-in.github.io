import { useState } from "react";
import { Github, ExternalLink, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { projects } from "../data/PortfolioData";
import "./Projects.css";
import {
  SiNextdotjs,
  SiPython,
  SiOpenai,
  SiReact,
  SiFlask,
  SiScikitlearn,
  SiTailwindcss,
  SiLangchain,
  SiTensorflow,
  SiPytorch,
  SiOpencv,
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiGooglegemini,
  SiGithubactions,
  SiTypescript,
  SiMongodb,
  SiWebrtc,
} from "react-icons/si";
import { Eye, Brain, Image, BookOpen, Mail, MapPin, Smartphone, Cpu, Zap } from "lucide-react";

// Technology to icon mapping
const getTechIcon = (tech: string) => {
  const techIconMap: { [key: string]: JSX.Element } = {
    "Next.js": <SiNextdotjs className="w-5 h-5 text-black dark:text-white" />,
    "Face.js pipeline": <Brain className="w-5 h-5 text-purple-600" />,
    "RAG": <Brain className="w-5 h-5 text-indigo-500" />,
    "MongoDB": <SiMongodb className="w-5 h-5 text-green-600" />,
    "WebRTC": <SiWebrtc className="w-5 h-5 text-blue-500" />,
    "Resend Service": <Mail className="w-5 h-5 text-red-500" />,
    "Browser Geolocation APIs": <MapPin className="w-5 h-5 text-orange-500" />,
    "MediaPipe Face Mesh": <Brain className="w-5 h-5 text-pink-500" />,
    "Object Detection": <Smartphone className="w-5 h-5 text-red-500" />,
    "Client-Side Processing": <Cpu className="w-5 h-5 text-yellow-500" />,
    "Real-Time Analysis": <Zap className="w-5 h-5 text-red-500" />,
    "Python via Uvicorn": <SiPython className="w-5 h-5 text-blue-500" />,
    "Python": <SiPython className="w-5 h-5 text-blue-500" />,
    "MediaPipe": <Brain className="w-5 h-5 text-blue-600" />,
    "OpenCV": <SiOpencv className="w-5 h-5 text-green-600" />,
    "PyTorch": <SiPytorch className="w-5 h-5 text-red-500" />,
    "Resend": <SiReact className="w-5 h-5 text-purple-600" />,
    "Computer Vision": <Eye className="w-5 h-5 text-indigo-600" />,
    "GPT-4o mini": <SiOpenai className="w-5 h-5 text-green-600" />,
    "GPT-4.1": <SiOpenai className="w-5 h-5 text-green-600" />,
    "Gemini Pro": <SiGooglegemini className="w-5 h-5 text-blue-600" />,
    "Deepseek V3": <SiOpenai className="w-5 h-5 text-purple-600" />,
    "ShadCN UI": <SiReact className="w-5 h-5 text-cyan-500" />,
    "Flask": <SiFlask className="w-5 h-5 text-gray-700 dark:text-gray-300" />,
    "scikit-learn": <SiScikitlearn className="w-5 h-5 text-orange-500" />,
    "Tailwind CSS": <SiTailwindcss className="w-5 h-5 text-cyan-500" />,
    "TailWind CSS": <SiTailwindcss className="w-5 h-5 text-cyan-500" />,
    "TailWind": <SiTailwindcss className="w-5 h-5 text-cyan-500" />,
    "Ensemble Learning": <SiScikitlearn className="w-5 h-5 text-orange-500" />,
    "LangChain": <SiLangchain className="w-5 h-5 text-green-700" />,
    "RetrievalQA": <SiLangchain className="w-5 h-5 text-green-700" />,
    "FAISS": <SiPython className="w-5 h-5 text-indigo-600" />,
    "OpenAI GPT-4o-mini": <SiOpenai className="w-5 h-5 text-green-600" />,
    "Web Scraping": <SiPython className="w-5 h-5 text-yellow-600" />,
    "TensorFlow": <SiTensorflow className="w-5 h-5 text-orange-600" />,
    "MLP": <SiTensorflow className="w-5 h-5 text-orange-600" />,
    "PIL": <SiPython className="w-5 h-5 text-blue-600" />,
    "HTML": <SiHtml5 className="w-5 h-5 text-orange-600" />,
    "CNN": <SiTensorflow className="w-5 h-5 text-orange-600" />,
    "CSS": <SiCss3 className="w-5 h-5 text-blue-600" />,
    "JS": <SiJavascript className="w-5 h-5 text-yellow-500" />,
    "JavaScript": <SiJavascript className="w-5 h-5 text-yellow-500" />,
    "Machine Learning": <SiTensorflow className="w-5 h-5 text-orange-600" />,
    "OpenWeatherMap API": <SiJavascript className="w-5 h-5 text-blue-500" />,
    "CI/CD": <SiGithubactions className="w-5 h-5 text-blue-600" />,
    "TypeScript": <SiTypescript className="w-5 h-5 text-blue-600" />,
    "Dictionary API": <BookOpen className="w-5 h-5 text-green-600" />,
    "Pexels API": <Image className="w-5 h-5 text-purple-600" />,
  };

  return techIconMap[tech] || <span className="text-sm text-gray-500">•</span>;
};

export function Projects() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const categories = ["All", "AI", "ML", "Web Dev"];
  
  const filteredProjects = selectedCategory === "All" 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const navigate = useNavigate();
  
  return (
    <section id="projects" className="py-12 px-4 overflow-hidden relative">
      <div className="container mx-auto">
        <div className="text-center mb-12 relative">
          {/* Decorative background elements */}
          <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
            <div className="w-32 h-32 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-3xl opacity-30"></div>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4 relative inline-block group">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent btn-shine relative">
              Projects
              {/* Glowing effect on hover */}
              <span className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-300 blur-sm"></span>
            </span>
            
            {/* Enhanced underline with animation */}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
              <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
              <div className="w-8 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 mt-0.5 mx-auto opacity-60"></div>
            </div>
            
            {/* Side accent dots */}
            <div className="hidden md:block absolute left-0 top-1/2 transform -translate-x-6 -translate-y-1/2">
              <div className="w-2 h-2 bg-blue-500 rounded-full opacity-60"></div>
            </div>
            <div className="hidden md:block absolute right-0 top-1/2 transform translate-x-6 -translate-y-1/2">
              <div className="w-2 h-2 bg-purple-500 rounded-full opacity-60"></div>
            </div>
          </h2>
          
          {/* Subtle tagline */}
          <p className="text-gray-500 dark:text-gray-400 text-sm font-light tracking-wider uppercase opacity-70">
            Featured Work
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap justify-center items-center gap-4 mb-8">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Filter by:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {filteredProjects.slice(0, 3).map((project, index) => (
            <div
              key={`${project.title}-${project.category}`}
              className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg group h-full flex flex-col project-card"
            >
              <div className="relative overflow-hidden project-card-content">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    console.error(`Failed to load image for ${project.title}:`, project.image);
                    e.currentTarget.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200" viewBox="0 0 400 200"><rect width="400" height="200" fill="%23f3f4f6"/><text x="200" y="100" text-anchor="middle" dominant-baseline="middle" fill="%236b7280" font-family="Arial, sans-serif" font-size="14">Image not found</text></svg>';
                  }}
                  loading={index < 3 ? "eager" : "lazy"}
                  fetchPriority={index < 3 ? "high" : "auto"}
                />
                <div className="absolute top-2 right-2">
                  <span className="px-2 py-1 bg-black bg-opacity-70 text-white text-xs rounded-full">
                    {project.category}
                  </span>
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                  <a
                    href={project.github}
                    className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
                    aria-label="View on GitHub"
                  >
                    <Github className="w-6 h-6 text-gray-900" />
                  </a>
                  {project.live && (
                    <a
                      href={project.live}
                      className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
                      aria-label="View Live Demo"
                    >
                      <ExternalLink className="w-6 h-6 text-gray-900" />
                    </a>
                  )}
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col project-card-content">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold">{project.title}</h3>
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 hover:bg-green-200 dark:bg-green-900 dark:hover:bg-green-800 text-green-700 dark:text-green-300 text-sm font-medium rounded-full transition-all duration-200 hover:scale-105"
                      aria-label="View Live Demo"
                    >
                      <ExternalLink className="w-3 h-3" />
                      Live
                    </a>
                  )}
                </div>
                <p className="text-gray-600 dark:text-gray-300 flex-1">
                  {project.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-1 mt-auto">
                  {project.technologies.map((tech, idx) => {
                    const techId = `${project.title}-${tech}-${idx}`;
                    const isHovered = hoveredTech === techId;
                    
                    return (
                        <div
                        key={techId}
                        className="relative flex items-center justify-center w-8 h-8 bg-gray-100 dark:bg-transparent rounded-full hover:bg-gray-200 dark:hover:bg-gray-800/30 transition-all duration-200 hover:scale-110"
                        onMouseEnter={() => setHoveredTech(techId)}
                        onMouseLeave={() => setHoveredTech(null)}
                      >
                        {getTechIcon(tech)}
                        
                        {/* State-controlled Tooltip */}
                        {isHovered && (
                          <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-black dark:bg-white text-white dark:text-black text-xs rounded-lg whitespace-nowrap z-[100] animate-in fade-in slide-in-from-bottom-1 duration-200">
                            {tech}
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[4px] border-r-[4px] border-t-[4px] border-transparent border-t-black dark:border-t-white"></div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <button
            onClick={() => navigate("/all-projects")}
            className="px-4 py-2 bg-transparent text-blue-600 border border-blue-600 rounded-md hover:bg-blue-200 hover:text-blue-700 dark:border-white dark:text-white dark:hover:bg-gray-500"
          >
            Show More
          </button>
        </div>
      </div>
    </section>
  );
}
