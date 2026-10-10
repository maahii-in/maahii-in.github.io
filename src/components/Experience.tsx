import React from "react";
import { Briefcase, Calendar, MapPin } from "lucide-react";
import { experience } from "../data/PortfolioData";

const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-12 px-4 overflow-hidden relative">
      <div className="container mx-auto">
        <div className="text-center mb-12 relative">
          <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
            <div className="w-32 h-32 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-3xl opacity-30"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4 relative inline-block group">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent btn-shine relative">
              Experience
            </span>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
              <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
              <div className="w-8 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 mt-0.5 mx-auto opacity-60"></div>
            </div>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm font-light tracking-wider uppercase opacity-70">
            Professional Journey
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {experience.map((job) => (
            <div
              key={`${job.company}-${job.title}`}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 md:p-8"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-4">
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-md bg-blue-600 flex items-center justify-center mr-4 flex-shrink-0">
                    <Briefcase size={22} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-blue-900 dark:text-blue-200">
                      {job.title}
                    </h3>
                    <p className="text-blue-700 dark:text-blue-300">{job.company}</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm flex items-center mt-1">
                      <MapPin size={14} className="mr-1" />
                      {job.location}
                    </p>
                  </div>
                </div>
                <div className="bg-blue-100 text-blue-800 rounded-full px-4 py-1 font-medium text-sm flex items-center self-start dark:bg-blue-600 dark:text-blue-100 whitespace-nowrap">
                  <Calendar size={14} className="mr-1" />
                  {job.duration}
                </div>
              </div>

              <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
                {job.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>

              <div className="mt-5 flex flex-wrap gap-2">
                {job.skills.map((s) => (
                  <span
                    key={s}
                    className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
