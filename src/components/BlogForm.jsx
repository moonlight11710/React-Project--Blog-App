import { useState } from "react";

export default function BlogForm({ onSubmit }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Title cannot be empty!");
      return;
    }
    onSubmit({ title, body });
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      {error && <p className="error-message">{error}</p>}
      
      <div className="form-group">
        <label htmlFor="title">Title:</label>
        <input
          id="title"
          className="form-input"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="content">Content:</label>
        <textarea
          id="content"
          className="form-textarea"
          rows="6"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </div>

      <button type="submit" className="btn-primary">
        Publish Post
      </button>
    </form>
  );
}