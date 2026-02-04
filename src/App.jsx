import { useState, useEffect } from "react";
import lovesvg from "./assets/All You Need Is Love SVG Cut File.svg";
import lovesvg2 from "./assets/Love In The Air SVG Cut File.svg";
import together from "./assets/together.jpeg";
import eyes from "./assets/eyes.jpeg";
import "./valentine.css";

export default function Page() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [noPos, setNoPos] = useState({ top: 30, left: 75 }); // Moved further right and up
  const [confetti, setConfetti] = useState([]);

  const yesButtonSize = noCount * 20 + 24;

  // Generate confetti when yes is pressed
  useEffect(() => {
    if (yesPressed) {
      const newConfetti = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 2,
        duration: 2 + Math.random() * 2,
        color: ['#ff69b4', '#ff1493', '#ffc0cb', '#ff69b4', '#10b981'][Math.floor(Math.random() * 5)]
      }));
      setConfetti(newConfetti);
    }
  }, [yesPressed]);

  const handleNoClick = () => {
    setNoCount(noCount + 1);
  };

  const getNoButtonText = () => {
    const phrases = [
      "No",
      "Are you sure, Maria SUNGA? Look we look soooo gooodd",
      "Really sure? Think for a minute Maria SUNGAAA!!",
      "Think again, Maria!",
      "Last chance! or I won't fuck with ya",
      "Surely not?",
      "You might regret this!",
      "Give it another thought!",
      "Are you absolutely certain?",
      "This could be a mistake! MARIAAAAAAAAAAA",
      "Have a heart!",
      "Don't be so cold!",
      "Change of heart?",
      "Wouldn't you reconsider?",
      "Is that your final answer?",
      "You're breaking my heart ;(",
      "Is that your final answer?",
      "You're breaking my heart ;(",
      "Plsss? :( You're breaking my heart.",
    ];

    return phrases[Math.min(noCount, phrases.length - 1)];
  };

  const moveButtonAway = (clientX, clientY) => {
    const btn = document.getElementById("noBtn");
    if (!btn) return;

    const rect = btn.getBoundingClientRect();
    const btnCenterX = rect.left + rect.width / 2;
    const btnCenterY = rect.top + rect.height / 2;
    
    const distanceX = clientX - btnCenterX;
    const distanceY = clientY - btnCenterY;
    const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);
    
    const threshold = 200; // Increased from 150 to 200 for earlier detection

    if (distance < threshold) {
      const container = btn.parentElement.getBoundingClientRect();
      
      const angle = Math.atan2(distanceY, distanceX);
      const escapeAngle = angle + Math.PI;
      
      const escapeDistance = 200; // Increased from 150 to 200
      const randomOffset = (Math.random() - 0.5) * 120; // Increased randomness
      
      let newLeft = btnCenterX - container.left + Math.cos(escapeAngle) * escapeDistance + randomOffset;
      let newTop = btnCenterY - container.top + Math.sin(escapeAngle) * escapeDistance + randomOffset;
      
      newLeft = Math.max(50, Math.min(newLeft, container.width - 50));
      newTop = Math.max(30, Math.min(newTop, container.height - 30));
      
      const leftPercent = (newLeft / container.width) * 100;
      const topPercent = (newTop / container.height) * 100;
      
      setNoPos({ top: topPercent, left: leftPercent });
    }
  };

  const handleMouseMove = (e) => {
    moveButtonAway(e.clientX, e.clientY);
  };

  const handleTouchMove = (e) => {
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      moveButtonAway(touch.clientX, touch.clientY);
    }
  };

  const handleNoTouch = (e) => {
    e.preventDefault();
    
    const btn = document.getElementById("noBtn");
    if (!btn) return;

    const container = btn.parentElement.getBoundingClientRect();
    
    const newLeft = Math.random() * (container.width - 100) + 50;
    const newTop = Math.random() * (container.height - 60) + 30;
    
    const leftPercent = (newLeft / container.width) * 100;
    const topPercent = (newTop / container.height) * 100;
    
    setNoPos({ top: topPercent, left: leftPercent });
    setNoCount(noCount + 1);
  };

  return (
    <div
      className="valentine-page"
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
    >
      {/* Confetti */}
      {yesPressed && confetti.map((item) => (
        <div
          key={item.id}
          className="confetti"
          style={{
            left: `${item.left}%`,
            animationDelay: `${item.delay}s`,
            animationDuration: `${item.duration}s`,
            background: item.color,
          }}
        />
      ))}

      {yesPressed ? (
        <div className="success-container">
          <img
            src={together}
            className="success-image"
            alt="Together"
          />
          <div className="success-title">
            Ok Yayyyyy!!! 💕
          </div>
          <p className="success-message">
            I knew you'd say yes! Love youuu Maria !!! ❤️
          </p>
        </div>
      ) : (
        <>
          <img
            src={lovesvg}
            className="love-decoration love-decoration-left"
            alt="Love decoration"
          />
          <img
            src={lovesvg2}
            className="love-decoration love-decoration-right"
            alt="Love decoration"
          />
          
          <div className="image-container">
            <img
              className="main-image"
              src={eyes}
              alt="Cute eyes"
            />
          </div>
          
          <h1 className="valentine-title">
            Will you be my Valentine, MARIA Sunga? 💖
          </h1>
          
          <div className="button-container">
            <button
              className="yes-button"
              style={{ fontSize: yesButtonSize }}
              onClick={() => setYesPressed(true)}
            >
              Yes! 💚
            </button>
            
            <button
              id="noBtn"
              onTouchStart={handleNoTouch}
              onClick={handleNoClick}
              className="no-button"
              style={{ 
                top: `${noPos.top}%`, 
                left: `${noPos.left}%`,
                transform: 'translate(-50%, -50%)',
                touchAction: 'none'
              }}
            >
              {noCount === 0 ? "No 💔" : getNoButtonText()}
            </button>
          </div>
        </>
      )}
      <Footer />
    </div>
  );
}

const Footer = () => {
  return (
    <a
      className="footer-link"
      href=""
      target="_blank"
      rel="noopener noreferrer"
    >
      Made with <span role="img" aria-label="heart">❤️</span>
    </a>
  );
};