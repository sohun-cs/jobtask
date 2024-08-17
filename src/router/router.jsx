import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import Home from "../pages/home/Home";
import Register from "../pages/authentication/Register";
import Login from "../pages/authentication/Login";


const router = createBrowserRouter([

    {
        path: '/',
        element: <Root></Root>,
        children: [
            {
                index: true,
                element: <Home></Home>,
                loader: () => fetch('https://product-site-server.vercel.app/productsCount')
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/login',
                element: <Login></Login>
            }
        ]
    }

])

export default router;