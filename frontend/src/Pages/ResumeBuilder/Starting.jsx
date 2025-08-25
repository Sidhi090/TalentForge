import React, { useState, useEffect, useRef } from 'react';
import "../ResumeBuilder/starting.css";

const Starting = () => {
  const [activeItem, setActiveItem] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);
    const cleanup = setupCanvasAnimation();
    return cleanup;
  }, [activeItem]); // rerun when step changes

  const setupCanvasAnimation = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 500;

    let animationFrame;
    let progress = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw robot + resume flow
      drawRobotScene(ctx, progress, activeItem);

      progress += 0.01;
      if (progress > 1) progress = 0;

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationFrame);
  };

  const drawRobotScene = (ctx, progress, step) => {
    const width = 800;
    const height = 500;

    // Background
    ctx.fillStyle = '#FFF9E5';
    ctx.fillRect(0, 0, width, height);

    // Desk
    ctx.fillStyle = '#DCD0A8';
    ctx.fillRect(100, 350, 600, 20);
    ctx.fillRect(150, 370, 500, 10);

    // Robot body
    ctx.fillStyle = '#4A9782';
    ctx.fillRect(350, 250, 100, 100); // Body
    ctx.fillRect(330, 230, 140, 20);  // Head

    // Robot eyes
    ctx.fillStyle = '#004030';
    ctx.fillRect(360, 235, 10, 10);
    ctx.fillRect(430, 235, 10, 10);

    // Robot arms
    ctx.fillStyle = '#4A9782';
    ctx.fillRect(320, 260, 30, 10); // Left
    ctx.fillRect(450, 260, 30, 10); // Right

    // Resume pieces
    drawResumePieces(ctx, progress, step);

    // Portfolio screen
    ctx.fillStyle = '#2D3748';
    ctx.fillRect(550, 200, 200, 120);
    ctx.fillStyle = '#4A9782';
    ctx.fillRect(555, 205, 190, 110);

    // Flying resumes
    for (let i = 0; i < 3; i++) {
      const x = 450 + Math.sin(progress * 10 + i) * 20;
      const y = 270 + Math.cos(progress * 10 + i) * 10;
      const size = 15 + Math.sin(progress * 5 + i) * 5;

      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(x, y, size, size * 1.4);
      ctx.strokeStyle = '#004030';
      ctx.strokeRect(x, y, size, size * 1.4);

      // Resume lines
      ctx.fillStyle = '#004030';
      ctx.fillRect(x + 2, y + 5, size - 4, 1);
      ctx.fillRect(x + 2, y + 10, size - 4, 1);
      ctx.fillRect(x + 2, y + 15, size - 10, 1);
    }
  };

  const drawResumePieces = (ctx, progress, step) => {
    const pieces = [
      // Create step
      { x: 250, y: 300, width: 40, height: 10, color: '#FFFFFF' },
      { x: 200, y: 280, width: 30, height: 8, color: '#FFFFFF' },
      { x: 300, y: 290, width: 35, height: 9, color: '#FFFFFF' },

      // Design step
      { x: 250, y: 300, width: 50, height: 15, color: '#DCD0A8' },
      { x: 200, y: 280, width: 45, height: 12, color: '#4A9782' },
      { x: 300, y: 290, width: 40, height: 10, color: '#004030' },

      // Export step
      { x: 250, y: 300, width: 60, height: 20, color: '#FFFFFF' },
      { x: 200, y: 280, width: 55, height: 18, color: '#FFFFFF' },
      { x: 300, y: 290, width: 50, height: 15, color: '#FFFFFF' },

      // Share step
      { x: 250, y: 300, width: 40, height: 40, color: '#4A9782' },
      { x: 200, y: 280, width: 35, height: 35, color: '#DCD0A8' },
      { x: 300, y: 290, width: 30, height: 30, color: '#004030' },
    ];

    for (let i = 0; i < 3; i++) {
      const piece = pieces[step * 3 + i];
      if (piece) {
        const targetX = 380 + i * 10;
        const targetY = 280;
        const moveProgress = Math.min(1, progress * 3);

        const currentX = piece.x + (targetX - piece.x) * moveProgress;
        const currentY = piece.y + (targetY - piece.y) * moveProgress;

        ctx.fillStyle = piece.color;
        ctx.fillRect(currentX, currentY, piece.width, piece.height);
        ctx.strokeStyle = '#2D3748';
        ctx.strokeRect(currentX, currentY, piece.width, piece.height);
      }
    }
  };

  const navItems = [
    { id: 0, label: "Create", color: "#004030", icon: "📝" },
    { id: 1, label: "Design", color: "#4A9782", icon: "🎨" },
    { id: 2, label: "Export", color: "#DCD0A8", icon: "📤" },
    { id: 3, label: "Share", color: "#2D3748", icon: "🔗" }
  ];

  const handleNavClick = (id) => setActiveItem(id);

  return (
    <div className="unique-starting-page">
      {/* Background shapes */}
      <div className="background-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="shape shape-4"></div>
      </div>

      {/* Main */}
      <div className={`unique-main-content ${isVisible ? 'visible' : ''}`}>
        {/* Tagline */}
        <div className="unique-tagline">
          <div className="tagline-line">Craft Your Perfect Resume</div>
          <div className="tagline-line">With Our AI Assistant</div>
        </div>

        {/* Navigation + Animation */}
        <div className="animation-navigation-container">
          {/* Left Nav */}
          <div className="nav-column left-nav">
            {navItems.slice(0, 2).map((item) => (
              <div
                key={item.id}
                className={`nav-item ${activeItem === item.id ? 'active' : ''}`}
                onClick={() => handleNavClick(item.id)}
                style={{ '--item-color': item.color }}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
                <div className="nav-dot"></div>
              </div>
            ))}
          </div>

          {/* Canvas */}
          <div className="animation-container">
            <canvas ref={canvasRef} className="robot-animation"></canvas>
          </div>

          {/* Right Nav */}
          <div className="nav-column right-nav">
            {navItems.slice(2, 4).map((item) => (
              <div
                key={item.id}
                className={`nav-item ${activeItem === item.id ? 'active' : ''}`}
                onClick={() => handleNavClick(item.id)}
                style={{ '--item-color': item.color }}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
                <div className="nav-dot"></div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="unique-cta">
          <button className="floating-cta">
            <span className="cta-text">Start Creating</span>
            <span className="cta-arrow">→</span>
          </button>
        </div>

        {/* Scroll indicator */}
        <div className="scroll-indicator">
          <div className="indicator-dots">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Starting;
