import { Routes, Route } from "react-router-dom";
import  NavBar from "./components/NavBar.jsx"
import BlogDetails from "./pages/BlogDetails.jsx";
import Bookmarks from "./pages/Bookmarks.jsx";
import CreatePost from "./pages/CreatePost.jsx";
import Home from "./pages/Home.jsx"


function App(){
return(

<div>
    <NavBar/>
    <Routes>
    <Route path="/" element = {<Home/>} />
    <Route path="/blog/:id" element = {<BlogDetails/>} />
    <Route path="/create" element = {<CreatePost/>} />
    <Route path="/bookmarks" element = {<Bookmarks/>} />
</Routes>
</div>

);

}

export default App