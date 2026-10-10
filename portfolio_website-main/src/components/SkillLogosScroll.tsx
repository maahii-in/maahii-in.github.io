import React, { useEffect, useState } from 'react';
import {
  SiReact,
  SiNextdotjs,
  SiJavascript,
  SiTypescript,
  SiPython,
  SiTensorflow,
  SiMongodb,
  SiPostgresql,
  SiDocker,
  SiGit,
  SiGithub,
  SiVite,
  SiTailwindcss,
  SiExpress,
  SiFlask,
  SiFastapi,
  SiOpenai,
  SiNumpy,
  SiPandas,
  SiJupyter,
  SiVercel,
  SiSupabase,
  SiPostman,
  SiTableau
} from 'react-icons/si';
import './SkillLogosScroll.css';

const skillLogos = [
  { icon: SiReact, name: 'React', color: '#61DAFB', darkColor: '#61DAFB' },
  { icon: SiNextdotjs, name: 'Next.js', color: '#000000', darkColor: '#ffffff' },
  { icon: SiJavascript, name: 'JavaScript', color: '#F7DF1E', darkColor: '#F7DF1E' },
  { icon: SiTypescript, name: 'TypeScript', color: '#3178C6', darkColor: '#3178C6' },
  { icon: SiPython, name: 'Python', color: '#3776AB', darkColor: '#3776AB' },
  { icon: SiTensorflow, name: 'TensorFlow', color: '#FF6F00', darkColor: '#FF6F00' },
  { icon: SiMongodb, name: 'MongoDB', color: '#47A248', darkColor: '#47A248' },
  { icon: SiPostgresql, name: 'PostgreSQL', color: '#336791', darkColor: '#336791' },
  { icon: SiDocker, name: 'Docker', color: '#2496ED', darkColor: '#2496ED' },
  { icon: SiGit, name: 'Git', color: '#F05032', darkColor: '#F05032' },
  { icon: SiGithub, name: 'GitHub', color: '#181717', darkColor: '#f0f6fe' },
  { icon: SiVite, name: 'Vite', color: '#646CFF', darkColor: '#646CFF' },
  { icon: SiTailwindcss, name: 'Tailwind CSS', color: '#06B6D4', darkColor: '#06B6D4' },
  { icon: SiExpress, name: 'Express.js', color: '#000000', darkColor: '#ffffff' },
  { icon: SiFlask, name: 'Flask', color: '#000000', darkColor: '#ffffff' },
  { icon: SiFastapi, name: 'FastAPI', color: '#009688', darkColor: '#009688' },
  { icon: SiOpenai, name: 'OpenAI', color: '#412991', darkColor: '#412991' },
  { icon: SiNumpy, name: 'NumPy', color: '#013243', darkColor: '#4DABF7' },
  { icon: SiPandas, name: 'Pandas', color: '#150458', darkColor: '#E599F7' },
  { icon: SiJupyter, name: 'Jupyter', color: '#F37626', darkColor: '#F37626' },
  { icon: SiVercel, name: 'Vercel', color: '#000000', darkColor: '#ffffff' },
  { icon: SiSupabase, name: 'Supabase', color: '#3ECF8E', darkColor: '#3ECF8E' },
  { icon: SiPostman, name: 'Postman', color: '#FF6C37', darkColor: '#FF6C37' },
  { icon: SiTableau, name: 'Tableau', color: '#E97627', darkColor: '#E97627' },
];

export const SkillLogosScroll: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check initial dark mode state
    const checkDarkMode = () => {
      const isDark = document.documentElement.classList.contains('dark') || 
                     document.body.classList.contains('dark');
      setIsDarkMode(isDark);
    };

    checkDarkMode();

    // Watch for dark mode changes
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="skill-logos-container">
      <div className="skill-logos-scroll">
        <div className="skill-logos-track">
          {/* First set */}
          {skillLogos.map((skill, index) => {
            const IconComponent = skill.icon;
            const iconColor = isDarkMode ? skill.darkColor : skill.color;
            return (
              <div
                key={`first-${index}`}
                className="skill-logo-item group"
              >
                <IconComponent 
                  className="skill-logo-icon"
                  style={{ 
                    color: iconColor,
                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
                  }}
                />
                <span className="skill-logo-name">{skill.name}</span>
              </div>
            );
          })}
          {/* Second set for seamless loop */}
          {skillLogos.map((skill, index) => {
            const IconComponent = skill.icon;
            const iconColor = isDarkMode ? skill.darkColor : skill.color;
            return (
              <div
                key={`second-${index}`}
                className="skill-logo-item group"
              >
                <IconComponent 
                  className="skill-logo-icon"
                  style={{ 
                    color: iconColor,
                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
                  }}
                />
                <span className="skill-logo-name">{skill.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};