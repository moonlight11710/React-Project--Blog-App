import { useNavigate } from "react-router-dom";

export default function BlogCard({ post }) {
  const navigate = useNavigate();

  return (
    <div 
      className="post-card" 
      onClick={() => navigate(`/blog/${post.id}`)}
    >
      <h2>{post.title}</h2>
      <p>{post.body.substring(0, 100)}...</p>
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
  );
}