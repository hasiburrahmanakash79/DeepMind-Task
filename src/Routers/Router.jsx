import { createBrowserRouter } from "react-router";
import Main from "../Layouts/Main";
import PageNotFound from "../Pages/PageNotFound/PageNotFound";
import Hero from "../Pages/HomePage/Hero";
import Signin from "../Pages/AuthPage/Signin";
import SignUp from "../Pages/AuthPage/SignUp";
import UserDashboard from "../Pages/Dashboards/UserDashboard";
import PrivateRoute from "./PrivateRoute";
import About from "../Pages/About/About";
import Contact from "../Pages/Contact/Contact";
import Products from "../Pages/Products/Products";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Main/>,
      children: [
        {
            path: "/",
            element: <Hero/>,
        },
        {
            path: "/login",
            element: <Signin/>,
        },
        {
            path: "/signUp",
            element: <SignUp/>,
        },
        {
            path: "/about",
            element: <About/>,
        },
        {
            path: "/products",
            element: <Products/>,
        },
        {
            path: "/contact",
            element: <Contact/>,
        },
      ],
    },
    {
      path: "/dashboard",
      element: <PrivateRoute>
        <UserDashboard/>
      </PrivateRoute>,
    },
    {
      path: "*",
      element: <PageNotFound/>,
    },
  ]);
  
  export default router;