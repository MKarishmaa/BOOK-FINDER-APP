import React, { useState, useEffect, useCallback } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
  Link,
} from "react-router-dom";

// Inline CSS for the entire app, as per single-file mandate
const AppStyles = () => (
  <style>
    {`
        /* FINAL THEME: Blue-Green Mix (Fresh + Balanced) */
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=Lora:wght@400;700&display=swap');

        :root {
          --primary-color: #26A69A;    /* Teal - Main Accent (Buttons, Links) */
          --secondary-color: #00796B; /* Dark Teal - Headings, Strong Highlights */
          --bg-color-deep: #F5FCFF;   /* Very Light Aqua - Main Background */
          --bg-card: #FFFFFF;         /* Pure White - Card Surfaces/Main App container (for contrast) */
          --text-color-light: #2C2C2C; /* Dark Neutral Gray for body text/readability */
          --text-color-dark: #FFFFFF; /* White for contrast text on dark buttons */
          --accent-warm: #80CBC4;     /* Lighter Teal for subtle highlights */
          
          --border-radius: 12px;
          --shadow-subtle: 0 5px 15px rgba(0, 0, 0, 0.05);
          --shadow-glow: 0 0 20px rgba(38, 166, 154, 0.7); /* Teal glow */
          --shadow-inset: inset 0 0 5px rgba(0, 0, 0, 0.02);
        }
        
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        
        body {
          font-family: 'Roboto', sans-serif;
          color: var(--text-color-light);
          line-height: 1.6;
          min-height: 100vh;
          overflow-y: scroll;
          background: var(--bg-color-deep);
          position: relative;
        }
        
        /* Subtle Aqua Gradient Background */
        body::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            /* Subtle gradient from background color */
            background: linear-gradient(135deg, var(--bg-color-deep) 0%, #E0F2F1 100%); 
            z-index: -2; 
        }

        /* Animations */
        @keyframes fadeInSlideUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }

        @keyframes buttonPulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.03); }
            100% { transform: scale(1); }
        }
        
        .App-overlay {
            background-color: transparent; 
            min-height: 100vh;
            padding: 30px 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
            max-width: 1400px; 
            margin: 0 auto;
            z-index: -1; 
        }
        
        .App {
            width: 100%;
            max-width: 1000px;
            background-color: var(--bg-card); /* Pure White for the main box */
            border-radius: var(--border-radius);
            padding: 30px; 
            box-shadow: var(--shadow-subtle); 
            border: 1px solid #E0E0E0; 
            min-height: 80vh; 
        }
        
        .home-container {
          min-height: calc(100vh - 60px); 
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 40px 20px;
          background-color: transparent; 
        }
        
        .welcome-title {
          font-family: 'Lora', serif; 
          font-size: 3em;
          color: var(--secondary-color); /* Dark Teal for Main Title */
          margin-bottom: 15px;
          font-weight: 700;
          text-shadow: 0 0 10px rgba(0, 121, 107, 0.3); 
          letter-spacing: 1px;
          animation: fadeInSlideUp 1s ease-out forwards;
        }
        
        .home-subtitle {
            font-size: 1.1em;
            color: var(--text-color-light);
            margin-bottom: 30px;
            opacity: 0.8;
            animation: fadeInSlideUp 1.2s ease-out forwards;
        }
        
        .icon-wrapper {
            font-size: 5em;
            color: var(--primary-color); 
            margin-bottom: 25px;
            text-shadow: 0 0 10px rgba(38, 166, 154, 0.3);
        }
        
        .icon {
            display: inline-block;
        }
        
        .home-quick-links {
            margin-top: 40px;
            padding: 20px;
            background-color: var(--bg-color-deep); /* Very Light Aqua box */
            border-radius: var(--border-radius);
            box-shadow: var(--shadow-subtle);
            width: 80%;
            max-width: 600px;
            border: 1px solid #E0E0E0;
            animation: fadeInSlideUp 1.5s ease-out forwards;
        }
        
        .quick-links-title {
            font-family: 'Lora', serif;
            font-size: 1.2em;
            color: var(--secondary-color); /* Dark Teal */
            margin-bottom: 15px;
            font-weight: 700;
        }
        
        .link-grid {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 10px;
        }
        
        .quick-link-button {
            padding: 10px 18px;
            background-color: var(--bg-card);
            color: var(--primary-color);
            border: 1px solid var(--primary-color);
            border-radius: 4px;
            text-decoration: none;
            font-size: 0.9em;
            transition: all 0.3s ease;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            animation: fadeInSlideUp 2s ease-out forwards;
        }
        
        .quick-link-button:hover {
            background-color: var(--primary-color);
            transform: translateY(-3px) scale(1.03);
            box-shadow: 0 0 15px rgba(38, 166, 154, 0.5);
            color: var(--text-color-dark); /* White text on teal hover */
        }
        
        .search-link {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin-top: 30px;
          padding: 14px 30px;
          background-color: var(--primary-color);
          color: var(--text-color-dark); /* White text */
          text-decoration: none;
          border-radius: 50px; 
          font-weight: 700;
          font-size: 1em;
          transition: all 0.3s ease;
          box-shadow: 0 4px 10px rgba(38, 166, 154, 0.3);
          border: 2px solid var(--primary-color);
          animation: fadeInSlideUp 2.2s ease-out forwards, buttonPulse 2s infinite 3s;
        }
        
        .search-link:hover {
            background-color: var(--bg-card);
            color: var(--primary-color);
            box-shadow: var(--shadow-glow);
            transform: scale(1.05);
        }
        
        h1 {
          font-family: 'Lora', serif;
          text-align: center;
          color: var(--secondary-color); /* Dark Teal */
          margin-bottom: 30px;
          padding-top: 10px;
          font-size: 2em;
        }
        
        .header-controls {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            width: 100%;
        }
        
        .go-back-button {
            background: transparent;
            border: 1px solid var(--secondary-color);
            color: var(--secondary-color);
            padding: 7px 14px;
            border-radius: var(--border-radius);
            cursor: pointer;
            font-size: 0.9em;
            transition: all 0.3s ease;
        }
        
        .go-back-button:hover {
            background-color: var(--secondary-color);
            color: var(--text-color-dark);
            transform: translateX(-5px);
        }
        
        .search-bar-container {
            display: flex;
            justify-content: center;
            gap: 15px;
            margin-bottom: 25px;
            width: 100%;
        }
        
        .search-input {
            padding: 12px 18px;
            width: 100%;
            max-width: 500px;
            border: 1px solid #E0E0E0; 
            border-radius: var(--border-radius);
            font-size: 1em;
            background-color: var(--bg-card);
            color: var(--text-color-light);
            transition: all 0.3s ease;
            box-shadow: var(--shadow-inset);
        }
        
        .search-input::placeholder {
            color: #777777;
        }
        
        .search-input:focus {
            border: 1px solid var(--primary-color);
            outline: none;
            box-shadow: 0 0 10px rgba(38, 166, 154, 0.5);
        }
        
        .search-button {
            padding: 12px 22px;
            background-color: var(--primary-color);
            color: var(--text-color-dark);
            border: none;
            border-radius: var(--border-radius);
            font-size: 1em;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 12px rgba(38, 166, 154, 0.3);
        }
        
        .search-button:hover {
            background-color: var(--secondary-color); /* Dark Teal on hover */
            color: var(--text-color-dark);
            transform: translateY(-2px);
        }
        
        .topic-section {
            margin-top: 20px;
            margin-bottom: 30px;
            padding: 15px 0;
            width: 100%;
            text-align: center;
            background-color: var(--bg-color-deep); /* Very Light Aqua background */
            border-radius: var(--border-radius);
            border-left: 5px solid var(--primary-color);
            border-right: 5px solid var(--primary-color);
        }
        
        .topic-title {
            font-family: 'Lora', serif;
            color: var(--secondary-color); /* Dark Teal */
            margin-bottom: 15px;
            font-size: 1.1em;
            font-weight: 700;
            text-shadow: 0 0 5px rgba(0, 121, 107, 0.3);
        }
        
        .topic-list {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 8px;
        }
        
        .topic-button {
            padding: 7px 14px;
            background-color: var(--bg-card);
            border: 1px solid var(--primary-color);
            color: var(--primary-color);
            border-radius: 20px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-weight: 400;
            text-decoration: none; 
        }
        
        .topic-button:hover {
            background-color: var(--primary-color);
            color: var(--text-color-dark);
            transform: scale(1.05);
            box-shadow: var(--shadow-glow);
        }
        
        .book-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); 
          gap: 20px;
          padding: 10px 0;
          width: 100%;
        }
        
        .book-card {
          background-color: var(--bg-card); 
          padding: 18px;
          border-radius: var(--border-radius);
          box-shadow: var(--shadow-subtle);
          display: flex;
          flex-direction: column;
          transition: transform 0.2s, box-shadow 0.2s;
          height: 100%; 
          text-align: center;
          border-left: 3px solid var(--accent-warm);
          animation: fadeInSlideUp 0.5s ease-out forwards;
          opacity: 0;
        }

        .book-card:hover {
          transform: translateY(-5px) scale(1.02);
          box-shadow: var(--shadow-glow);
          border-left-color: var(--secondary-color); /* Dark Teal on hover */
        }
        
        .book-cover {
          width: 100%; 
          max-width: 140px;
          aspect-ratio: 3 / 4; 
          object-fit: cover;
          margin: 0 auto 10px;
          border-radius: 4px;
          background-color: #F0F0F0;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }
        
        .book-title {
          font-family: 'Lora', serif;
          font-size: 1em;
          font-weight: 700;
          margin-bottom: 5px;
          color: var(--secondary-color); /* Dark Teal */
        }
        
        .book-author {
          font-size: 0.8em;
          color: var(--text-color-light);
          margin-bottom: 5px;
          font-style: italic;
          opacity: 0.8;
        }
        
        .book-year {
          font-size: 0.7em;
          color: #757575; /* Gray for subtle details */
        }
        
        .message {
          text-align: center;
          padding: 80px 20px;
          font-size: 1.5em;
          color: var(--secondary-color);
          font-weight: 700;
          text-shadow: 0 0 10px rgba(0, 121, 107, 0.3);
        }

        .pagination-controls {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 15px;
            margin-top: 25px;
        }

        .pagination-button {
            padding: 10px 20px;
            background-color: var(--primary-color);
            color: var(--text-color-dark);
            border: none;
            border-radius: 50px;
            cursor: pointer;
            font-size: 0.9em;
            font-weight: 500;
            transition: all 0.3s ease;
        }

        .pagination-button:hover:not(:disabled) {
            background-color: var(--secondary-color);
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        
        .pagination-button:disabled {
            background-color: #B0BEC5; /* Lighter gray for disabled state */
            cursor: not-allowed;
            opacity: 0.7;
            box-shadow: none;
        }

        .page-info {
            font-size: 1em;
            font-weight: 500;
            color: var(--secondary-color);
        }
        
        @media (max-width: 768px) {
            .App-overlay {
                padding: 15px 10px;
            }
            
            .App {
                padding: 20px 15px;
            }
        
            .welcome-title {
                font-size: 2.2em;
            }
        
            .home-quick-links {
                width: 100%;
                padding: 15px;
            }
        
            .search-link {
                padding: 12px 25px;
            }
        
            .search-bar-container {
                flex-direction: column;
                gap: 10px;
            }
        
            .search-input, .search-button {
                width: 100%;
                max-width: 100%;
                font-size: 0.9em;
                padding: 10px 15px;
            }
            
            .book-list {
                grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); 
            }
            .pagination-controls {
                flex-direction: column;
                gap: 10px;
            }
        }
        `}
  </style>
);

// Combined Components

const SearchBar = ({ onSearch, initialQuery }) => {
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form className="search-bar-container" onSubmit={handleSubmit}>
      <input
        type="text"
        className="search-input"
        placeholder="Search for a book or subject..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit" className="search-button">
        Search
      </button>
    </form>
  );
};

const BookCard = ({ book, index }) => {
  // Placeholder cover for light theme
  const coverUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : `https://placehold.co/120x160/F5FCFF/2C2C2C?text=No+Cover`;

  return (
    <div className="book-card" style={{ animationDelay: `${index * 0.05}s` }}>
      <img
        src={coverUrl}
        alt={`Cover of ${book.title}`}
        className="book-cover"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = `https://placehold.co/120x160/F5FCFF/2C2C2C?text=No+Cover`;
        }}
      />
      <div className="book-info">
        <h3 className="book-title">{book.title}</h3>
        <p className="book-author">
          by {book.author_name ? book.author_name.join(", ") : "Unknown Author"}
        </p>
        {book.first_publish_year && (
          <p className="book-year">Published: {book.first_publish_year}</p>
        )}
      </div>
    </div>
  );
};

const Home = () => {
  const quickLinks = [
    { label: "APA Formatting Guides", query: "APA guide" },
    { label: "Programming Reference", query: "Python documentation" },
    { label: "History of Art", query: "Art History" },
    { label: "Study Abroad Guides", query: "travel books" },
  ];

  return (
    <div className="home-container">
      <div className="icon-wrapper">
        {/* Book icon changed to use SVG path for easy color control */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100"
          height="100"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon"
        >
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20a1 1 0 0 1 1 1v17H6.5a2.5 2.5 0 0 1-2.5-2.5zM12 21.5h-.5A2.5 2.5 0 0 1 9 19v-15a2.5 2.5 0 0 1 2.5-2.5H20a1 1 0 0 1 1 1v17h-9.5A2.5 2.5 0 0 1 12 21.5z"></path>
        </svg>
      </div>

      <h2 className="welcome-title">Alex's Academic Hub</h2>
      <p className="home-subtitle">
        Quickly find textbooks, research papers, and study materials for your
        semester.
      </p>

      <Link to="/search" className="search-link">
        <span className="material-icons">🔍</span> Start New Search
      </Link>

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

// Main App Logic and Routing
const BOOKS_PER_PAGE = 10;

const topics = [
  { label: "Intro to Java", query: "Java textbook" },
  { label: "Ethics in Philosophy", query: "Philosophical Ethics" },
  { label: "Psychology 101", query: "Introductory Psychology" },
  { label: "Study Skills & Time Management", query: "study techniques" },
  { label: "Fantasy/Sci-Fi Break", query: "fantasy novel" },
];

const SearchPage = ({ fetchBooks, books, loading, error, searchInitiated }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialQuery = queryParams.get("q") || "";

  const [currentPage, setCurrentPage] = useState(1);

  // Reset page to 1 whenever the query changes
  useEffect(() => {
    setCurrentPage(1);
    if (initialQuery) {
      fetchBooks(initialQuery);
    }
  }, [initialQuery, fetchBooks]);

  const handleSearch = (query) => {
    // When searching, navigate and let the useEffect handle fetching and page reset
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  const handleGoBack = () => {
    navigate("/");
  };

  // Pagination logic
  const indexOfLastBook = currentPage * BOOKS_PER_PAGE;
  const indexOfFirstBook = indexOfLastBook - BOOKS_PER_PAGE;
  const paginatedBooks = books.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(books.length / BOOKS_PER_PAGE);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      // Scroll to top to view new results
      window.scrollTo(0, 0);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      // Scroll to top to view new results
      window.scrollTo(0, 0);
    }
  };

  let content;
  if (loading) {
    content = (
      <div className="message">Searching the university database... 💡</div>
    );
  } else if (error) {
    content = (
      <div className="message error">
        Connection error. Check your campus WiFi or network.
      </div>
    );
  } else if (searchInitiated && books.length === 0) {
    content = (
      <div className="message">
        No materials found. Try a different course code or keyword!
      </div>
    );
  } else if (paginatedBooks.length > 0) {
    content = (
      <>
        <div className="book-list">
          {paginatedBooks.map((book, index) => (
            <BookCard key={book.key} book={book} index={index} />
          ))}
        </div>
        {totalPages > 1 && (
          <div className="pagination-controls">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="pagination-button"
            >
              Previous
            </button>
            <span className="page-info">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="pagination-button"
            >
              Next
            </button>
          </div>
        )}
      </>
    );
  } else {
    content = (
      <div className="message">
        Ready to research? Start by typing your subject or book title above.
      </div>
    );
  }

  const currentQuery = queryParams.get("q") || "";

  return (
    <div className="App">
      <div className="header-controls">
        <button className="go-back-button" onClick={handleGoBack}>
          &larr; Back to Home Hub
        </button>
        <div></div>
      </div>
      <h1>Course Materials Search</h1>
      <SearchBar onSearch={handleSearch} initialQuery={currentQuery} />

      <div className="topic-section">
        <h2 className="topic-title">Popular Subjects Alex Might Need:</h2>
        <div className="topic-list">
          {topics.map((topic) => (
            <Link
              key={topic.label}
              to={`/search?q=${topic.query}`}
              className="topic-button"
            >
              {topic.label}
            </Link>
          ))}
        </div>
      </div>

      {content}
    </div>
  );
};

function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchInitiated, setSearchInitiated] = useState(false);

  const BASE_URL = "https://openlibrary.org/search.json?q=";

  const fetchBooks = useCallback(async (query) => {
    if (!query) return;

    setLoading(true);
    setError(null);
    setSearchInitiated(true);

    try {
      // Fetch up to 100 books to ensure we have enough for local pagination over a few pages
      const url = `${BASE_URL}${encodeURIComponent(query)}&limit=100`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const filteredBooks = data.docs.filter(
        (book) => book.title && book.author_name
      );

      setBooks(filteredBooks);
    } catch (err) {
      console.error("Fetching error:", err);
      setError("Failed to connect to the library catalog. Network error.");
      setBooks([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div className="App-overlay">
      <AppStyles />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/search"
            element={
              <SearchPage
                fetchBooks={fetchBooks}
                books={books}
                loading={loading}
                error={error}
                searchInitiated={searchInitiated}
              />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
