// src/components/Home.jsx - Focused on Alex's College Needs
import React from "react";
import { Link } from "react-router-dom";

// New array of quick links relevant to a college student
const quickLinks = [
  { label: "APA Formatting Guides", query: "APA guide" },
  { label: "Programming Reference", query: "Python documentation" },
  { label: "History of Art", query: "Art History" },
  { label: "Study Abroad Guides", query: "travel books" },
];

const Home = () => {
  return (
    <div className="home-container">
      <div className="book-icon-wrapper">
        <div className="book-icon">📚</div> {/* Book icon added */}
      </div>

      <h2 className="welcome-title">Alex's Academic Hub</h2>
      <p className="home-subtitle">
        Quickly find textbooks, research papers, and study materials for your
        semester.
      </p>

      {/* Primary Call to Action */}
      <Link to="/search" className="search-link">
        <span className="material-icons">🔍</span> Start New Search
      </Link>

      {/* New Quick Links Section to fill space */}
      <div className="home-quick-links">
        <p className="quick-links-title">Quick Links for Your Studies:</p>
        <div className="link-grid">
          {quickLinks.map((link) => (
            <Link
              key={link.label}
              to={`/search?q=${link.query}`}
              className="quick-link-button"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
