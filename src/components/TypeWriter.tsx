import React, { useEffect, useState, useMemo } from "react";
import "./TypeWriter.css";

const Typewriter: React.FC = () => {
  const roles = useMemo<string[]>(
    () => ["AI Engineer", "LLM Developer", "RAG Systems Builder", "ML Enthusiast"],
    []
  );
  const [roleIndex, setRoleIndex] = useState<number>(0);
  const [currentRole, setCurrentRole] = useState<string>("");
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [charIndex, setCharIndex] = useState<number>(0);
  const [speed, setSpeed] = useState<number>(200);

  useEffect(() => {
    const typewriterEffect = () => {
      const currentText = roles[roleIndex];
      if (isDeleting) {
        setCurrentRole(currentText.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
        setSpeed(40);
      } else {
        setCurrentRole(currentText.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
        setSpeed(50);
      }

      if (!isDeleting && charIndex === currentText.length) {
        setSpeed(1000);
        setIsDeleting(true);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setRoleIndex((prevIndex) => (prevIndex + 1) % roles.length);
        setSpeed(500);
      }
    };

    const timer = setTimeout(typewriterEffect, speed);
    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, roleIndex, speed, roles]);

  return (
    <div id="typewriter-container">
      <span id="typewriter">{currentRole}</span>
      <span className="cursor"></span>
    </div>
  );
};

export default Typewriter;
