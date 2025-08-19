import React from 'react';
import "../assets/styles/Footer.css";

export const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-main">
        <div className="footer-logo">
          <h1>TALENTFORGE</h1>
        </div>
        
        <div className="footer-links">
          <div className="link-column">
            <h3>ATS CHECKER</h3>
            <ul>
              <li><a href="/ats-checker">How it works</a></li>
              <li><a href="/ats-checker/test">Test your resume</a></li>
              <li><a href="/ats-checker/tips">Tips</a></li>
            </ul>
          </div>
          
          <div className="link-column">
            <h3>COMMUNITY</h3>
            <ul>
              <li><a href="/community">Join</a></li>
              <li><a href="/community/forum">Forum</a></li>
              <li><a href="/community/events">Events</a></li>
            </ul>
          </div>
          
          <div className="link-column">
            <h3>RESUME BUILDER</h3>
            <ul>
              <li><a href="/resume-builder">Create</a></li>
              <li><a href="/resume-builder/templates">Templates</a></li>
              <li><a href="/resume-builder/examples">Examples</a></li>
            </ul>
          </div>
          
          <div className="link-column">
            <h3>CHATBOT</h3>
            <ul>
              <li><a href="/chatbot">Ask questions</a></li>
              <li><a href="/chatbot/career">Career advice</a></li>
              <li><a href="/chatbot/interview">Interview prep</a></li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} TalentForge. All rights reserved.</p>
        <div className="legal-links">
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
          <a href="/cookies">Cookies</a>
        </div>
      </div>
    </footer>
  );
};