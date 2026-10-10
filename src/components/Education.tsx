import React from "react";
import { GraduationCap, Calendar } from "lucide-react";
import { education } from "../data/PortfolioData";

const Education: React.FC = () => {  return (
    <section id="education" className="py-0.5 overflow-hidden relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 relative">
          {/* Decorative background elements */}
          <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
            <div className="w-32 h-32 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-3xl opacity-30"></div>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4 relative inline-block group">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent btn-shine relative">
              Education
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
            Academic Journey
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-200 dark:bg-blue-600 z-0"></div>

          {/* Education Items */}
          {education.map((item, index) => (
            <div
              key={index}
              className={`relative z-10 flex flex-col md:flex-row ${
                index % 2 === 0 ? "md:flex-row-reverse" : ""
              } items-center md:items-start mb-16`}
            >
              {/* Timeline Circle */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-blue-600 border-4 border-white shadow-md flex items-center justify-center z-10">
                <GraduationCap size={12} className="text-white" />
              </div>

              {/* Date Tag */}
              <div
                className={`w-full md:w-1/2 mt-8 md:mt-0 flex ${
                  index % 2 === 0 ? "md:justify-start" : "md:justify-end"
                } justify-center px-4 md:px-0`}
              >
                <div className="bg-blue-100 text-blue-800 rounded-full px-4 py-1 font-medium text-sm flex items-center dark:bg-blue-600 dark:text-blue-100">
                  <Calendar size={14} className="mr-1" />
                  {item.duration}
                </div>
              </div>

              {/* Content */}
              <div
                className={`w-full md:w-1/2 mt-6 md:mt-0 px-4 md:px-0 ${
                  index % 2 === 0 ? "md:pr-12" : "md:pl-12"
                }`}>
                  <div className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg hover:z-20 hover:scale-105 dark:bg-gray-900 dark:text-white">
                  <div className="flex items-start mb-4">
                    {item.logo && (
                      <div className="w-12 h-12 rounded-md overflow-hidden mr-4 flex-shrink-0">
                        <img
                          src={item.logo}
                          alt={item.institution}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <div>
                      <h3 className="text-xl font-semibold text-blue-900 dark:text-blue-200">
                        {item.degree}
                      </h3>
                      <p className="text-blue-700 dark:text-blue-300">
                        {item.institution}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
