import React, { useEffect, useState } from 'react';
import {
  SiPython,
  SiJavascript,
  SiTensorflow,
  SiPytorch,
  SiScikitlearn,
  SiLangchain,
  SiFastapi,
  SiMysql,
  SiMilvus,
  SiMlflow,
  SiDocker,
  SiLinux,
  SiGit,
  SiGithub,
  SiPandas,
  SiJupyter,
  SiGooglecolab
} from 'react-icons/si';
import './SkillLogosScroll.css';

const skillLogos = [
  { icon: SiPython, name: 'Python', color: '#3776AB', darkColor: '#3776AB' },
  { icon: SiJavascript, name: 'JavaScript', color: '#F7DF1E', darkColor: '#F7DF1E' },
  { icon: SiLangchain, name: 'LangChain', color: '#1C3C3C', darkColor: '#7FD6C2' },
  { icon: SiFastapi, name: 'FastAPI', color: '#009688', darkColor: '#009688' },
  { icon: SiPytorch, name: 'PyTorch', color: '#EE4C2C', darkColor: '#EE4C2C' },
  { icon: SiTensorflow, name: 'TensorFlow', color: '#FF6F00', darkColor: '#FF6F00' },
  { icon: SiScikitlearn, name: 'Scikit-learn', color: '#F7931E', darkColor: '#F7931E' },
  { icon: SiPandas, name: 'Pandas', color: '#150458', darkColor: '#E599F7' },
  { icon: SiMilvus, name: 'Milvus', color: '#00A1EA', darkColor: '#00A1EA' },
  { icon: SiMysql, name: 'MySQL', color: '#4479A1', darkColor: '#4479A1' },
  { icon: SiMlflow, name: 'MLflow', color: '#0194E2', darkColor: '#0194E2' },
  { icon: SiDocker, name: 'Docker', color: '#2496ED', darkColor: '#2496ED' },
  { icon: SiLinux, name: 'Linux', color: '#000000', darkColor: '#ffffff' },
  { icon: SiGit, name: 'Git', color: '#F05032', darkColor: '#F05032' },
  { icon: SiGithub, name: 'GitHub', color: '#181717', darkColor: '#f0f6fe' },
  { icon: SiJupyter, name: 'Jupyter', color: '#F37626', darkColor: '#F37626' },
  { icon: SiGooglecolab, name: 'Google Colab', color: '#F9AB00', darkColor: '#F9AB00' },
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