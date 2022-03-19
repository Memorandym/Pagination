import About from "../pages/About";
import PostIdPage from "../pages/PostIdPage";
import Posts from "../pages/Posts";
import Login from "../pages/Login";

export const privateRoutes = [
    {path: '/About', element: <About/>, exact: true},
    {path: '/Posts', element: <Posts/>, exact: true},
    {path: '/Posts/:id', element: <PostIdPage/>, exact: true},
]

export const publicRoutes = [
    {path: '/Login', element: <Login/>, exact: true}
]