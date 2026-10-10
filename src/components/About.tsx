import React from "react";

const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      className="section-padding bg-white relative overflow-hidden dark:bg-black
 "
    >
      {/* Background elements */}      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12 relative">
          {/* Decorative background elements */}
          <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
            <div className="w-32 h-32 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-3xl opacity-30"></div>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4 relative inline-block group">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent btn-shine relative">
              About Me
              {/* Glowing effect on hover */}
              <span className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-300 blur-sm"></span>
            </span>
            
            {/* Enhanced underline with animation */}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
              <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
              <div className="w-8 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 mt-0.5 mx-auto opacity-60"></div>
            </div>
            
            {/* Side accent dots */}
            <div className="absolute left-0 top-1/2 transform -translate-x-8 -translate-y-1/2 hidden md:block">
              <div className="w-2 h-2 bg-blue-500 rounded-full opacity-60"></div>
            </div>
            <div className="absolute right-0 top-1/2 transform translate-x-8 -translate-y-1/2 hidden md:block">
              <div className="w-2 h-2 bg-purple-500 rounded-full opacity-60"></div>
            </div>
          </h2>
          
          {/* Subtle tagline */}
          <p className="text-gray-500 dark:text-gray-400 text-sm font-light tracking-wider uppercase opacity-70">
            Discover My Journey
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center md:space-x-12">
          <div className="md:w-2/5 mb-8 md:mb-0 w-full max-w-sm mx-auto">
            <div className="relative aspect-[3/4] w-full">
              <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="/img/abt.jpg"
                  alt="About Mahieshwar"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-full h-full border-2 border-blue-300 rounded-2xl z-[-1] dark:bg-black"></div>
            </div>
          </div>

          <div className="md:w-3/5">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 dark:text-white btn-shine">
              I'm Mahieshwar
            </h3>

            <p className="text-gray-600 mb-4 dark:text-white">
              AI Engineer and Machine Learning enthusiast with hands-on experience
              building NLP and Large Language Model (LLM) applications.
            </p>

            <p className="text-gray-600 mb-6 dark:text-white">
              Skilled in Python, LangChain, FastAPI and vector databases for
              building Retrieval-Augmented Generation (RAG) systems and scalable AI solutions.
            </p>            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 group">
                <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-2 flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 group-hover:bg-blue-600 transition-colors"></div>
                  Name:
                </h4>
                <p className="text-gray-700 dark:text-gray-300 font-medium">Mahieshwar Budati</p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 group">
                <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-2 flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-2 group-hover:bg-purple-600 transition-colors"></div>
                  Email:
                </h4>
                <p className="text-gray-700 dark:text-gray-300 text-sm break-all">
                  mahieshwar.budati@gmail.com
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 group">
                <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-2 flex items-center">
                  <div className="w-2 h-2 bg-cyan-500 rounded-full mr-2 group-hover:bg-cyan-600 transition-colors"></div>
                  Location:
                </h4>
                <p className="text-gray-700 dark:text-gray-300">
                  Coimbatore, INDIA (Remote)
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 group">
                <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-2 flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2 group-hover:bg-green-600 transition-colors"></div>
                  Available:
                </h4>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <p className="text-gray-700 dark:text-gray-300 font-medium">
                    Open to AI roles
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
