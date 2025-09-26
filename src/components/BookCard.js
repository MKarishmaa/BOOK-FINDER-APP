import React from "react";

const BookCard = ({ book }) => {
  // Construct a URL for the book cover using Open Library's API
  const coverUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : `https://placehold.co/120x160/2c213c/9370db?text=No+Cover`;

  return (
    <div className="book-card">
      <img
        src={coverUrl}
        alt={`Cover of ${book.title}`}
        className="book-cover"
        onError={(e) => {
          // Fallback to a placeholder if the image fails to load
          e.target.onerror = null;
          e.target.src = `https://placehold.co/120x160/2c213c/9370db?text=No+Cover`;
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

export default BookCard;
