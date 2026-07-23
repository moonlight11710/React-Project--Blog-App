import { useAtom } from "jotai";
import { Link } from "react-router-dom";
import { bookmarksAtom } from "../atoms/bookmarkAtom";

export default function Bookmarks() {
  const [bookmarks, setBookmarks] = useAtom(bookmarksAtom);

  const removeBookmark = (id) => {
    setBookmarks(bookmarks.filter((post) => post.id != id));
  };

  return (
    <div>
      <h1>Bookmarked Posts</h1>
      {bookmarks.length === 0 ? (
        <p>No bookmarked posts yet.</p>
      ) : (
        bookmarks.map((post) => (
          <div key={post.id} className="post-card">
            <h2>
              <Link to={`/blog/${post.id}`}>{post.title}</Link>
            </h2>
            <p>{post.body.substring(0, 100)}....</p>
            <button onClick={() => removeBookmark(post.id)}>Remove</button>
          </div>
        ))
      )}
    </div>
  );
}
