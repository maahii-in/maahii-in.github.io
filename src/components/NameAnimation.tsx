import React, { useEffect, useState } from "react";
import "./NameAnimation.css";

const NameAnimation: React.FC = () => {
  const firstName = "MAHIESHWAR";
  const lastName = "BUDATI";
  const finalText = `${firstName} ${lastName}`;
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const [firstNameDisplay, setFirstNameDisplay] = useState<string>("");
  const [lastNameDisplay, setLastNameDisplay] = useState<string>("");

  useEffect(() => {
    // Check for mobile device
    let displayArray: string[] = Array(finalText.length).fill(" ");
    displayArray[0] = "M"; // Start with 'M'
    let currentPosition = 1;
    let animationInterval: number | undefined;

    function randomizeCurrentLetter() {
      if (currentPosition >= finalText.length) {
        // Reset animation after completion
        clearInterval(animationInterval);
        setTimeout(() => {
          displayArray = Array(finalText.length).fill(" ");
          displayArray[0] = "M";
          currentPosition = 1;
          randomizeCurrentLetter();
        }, 3000); // 1 second delay before restart
        return;
      }

      // Skip spaces automatically
      if (finalText[currentPosition] === " ") {
        displayArray[currentPosition] = " ";
        currentPosition++;
        randomizeCurrentLetter();
        return;
      }

      let randomCount = 0;
      animationInterval = window.setInterval(() => {
        if (randomCount < 3) {
          displayArray[currentPosition] =
            alphabet[Math.floor(Math.random() * alphabet.length)];
          updateDisplayText(displayArray);
          randomCount++;
        } else {
          clearInterval(animationInterval);
          displayArray[currentPosition] = finalText[currentPosition];
          updateDisplayText(displayArray);
          currentPosition++;
          randomizeCurrentLetter();
        }
      }, 80);
    }

    function updateDisplayText(displayArray: string[]) {
      const fullName = displayArray.join("");
      const [first, last] = fullName.split(" ");
      setFirstNameDisplay(first || "");
      setLastNameDisplay(last || "");
    }

    randomizeCurrentLetter();

    return () => clearInterval(animationInterval); // Clean up the interval on component unmount
  }, [finalText]);

  return (
    <span>
      <span className="first-name">{firstNameDisplay}</span>{" "}
      <span className="last-name">{lastNameDisplay}</span>
    </span>
  );
};

export default NameAnimation;
