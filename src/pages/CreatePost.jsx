import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);

    fetch("https://dummyjson.com/posts/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        body,
        userId: 5, // Required field by DummyJSON API
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to create post");
        return res.json();
      })
      .then((data) => {
        setSubmitting(false);
        setMessage("Post created successfully! (Simulated by DummyJSON)");
        // Clear form
        setTitle("");
        setBody("");
        // Redirect back to home page after 1.5 seconds
        setTimeout(() => {
          navigate("/");
        }, 1500);
      })
      .catch((err) => {
        setSubmitting(false);
        setMessage(`Error: ${err.message}`);
      });
  };

  return (
    <div>
      <h1>Create New Post</h1>
      {message && <p style={{ fontWeight: "bold" }}>{message}</p>}

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "500px" }}>
        <div>
          <label htmlFor="title" style={{ display: "block", marginBottom: "0.5rem" }}>Title:</label>
          <input
            id="title"
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </div>

        <div>
          <label htmlFor="body" style={{ display: "block", marginBottom: "0.5rem" }}>Content:</label>
          <textarea
            id="body"
            required
            rows="6"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </div>

        <button type="submit" disabled={submitting} style={{ padding: "0.5rem 1rem", cursor: "pointer" }}>
          {submitting ? "Submitting..." : "Create Post"}
        </button>
      </form>
    </div>
  );
}