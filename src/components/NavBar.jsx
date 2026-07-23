import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        MinimalistBlog
      </Link>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/create">Create Post</Link>
        <Link to="/bookmarks">Bookmarks</Link>
      </div>
    </nav>
  );
}