import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { bookmarksAtom } from "../atoms/bookmarkAtom";

export default function BlogDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [bookmarks, setBookmarks] = useAtom(bookmarksAtom);

  useEffect(() => {
    setLoading(true);
    setError(null);

    // 1. Fetch single post
    const fetchPost = fetch(`https://dummyjson.com/posts/${id}`).then(
      (res) => {
        if (!res.ok) throw new Error("Failed to fetch post details");
        return res.json();
      },
    );

    // 2. Fetch comments for post
    const fetchComments = fetch(
      `https://dummyjson.com/comments/post/${id}`,
    ).then((res) => {
      if (!res.ok) throw new Error("Failed to fetch comments");
      return res.json();
    });

    Promise.all([fetchPost, fetchComments])
      .then(([postData, commentsData]) => {
        setPost(postData);
        setComments(commentsData.comments || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <h2>Loading post...</h2>;
  if (error) return <h2 className="error-message">Error: {error}</h2>;
  if (!post) return <h2>Post not found.</h2>;

  const isBookmarked = bookmarks.some((b) => b.id === post.id);

  const handleBookmarkToggle = () => {
    if (isBookmarked) {
      setBookmarks(bookmarks.filter((b) => b.id !== post.id));
    } else {
      setBookmarks([...bookmarks, post]);
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      {/* Back to Home Button */}
      <button onClick={() => navigate("/")} className="btn-secondary">
        ← Back to Home
      </button>

      {/* Main Post Section */}
      <div className="post-card" style={{ marginBottom: "2rem" }}>
        <div className="page-header">
          <h1>{post.title}</h1>
          <button onClick={handleBookmarkToggle} className="btn-primary">
            {isBookmarked ? "★ Bookmarked" : "☆ Bookmark"}
          </button>
        </div>

        <p style={{ lineHeight: "1.6", fontSize: "1.1rem" }}>{post.body}</p>

        {post.tags && (
          <div className="tag-list">
            {post.tags.map((tag, index) => (
              <span key={index} className="tag">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Comments Section */}
      <div>
        <h3>Comments ({comments.length})</h3>
        {comments.length === 0 ? (
          <p>No comments for this post yet.</p>
        ) : (
          <div className="card-grid">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="post-card"
                style={{ backgroundColor: "#f9fafb" }}
              >
                <p style={{ fontWeight: "bold", marginBottom: "0.25rem" }}>
                  @{comment.user?.username || "anonymous"}
                </p>
                <p style={{ margin: 0 }}>{comment.body}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
