import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import Shop from "../pages/Shop";
import History from "../pages/History";
import Cart from "../pages/Cart";
import Checkout from "../pages/checkout";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Layout from "../layouts/Layout";
import LayoutAdmin from "../layouts/LayoutAdmin";
import Category from "../pages/admin/Category";
import Dashboard from "../pages/admin/dashboard";
import Product from "../pages/admin/Product";
import Manage from "../pages/admin/Manage";
import LayoutUser from "../layouts/LayoutUser";
import HomeUser from "../pages/User/HomeUser";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "shop", element: <Shop /> },
      { path: "history", element: <History /> },
      { path: "cart", element: <Cart /> },
      { path: "checkout", element: <Checkout /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
  {
    path: "/admin",
    element: <LayoutAdmin/>,
    children: [
      { index:true, element: <Dashboard/> },
      { path: 'category', element:<Category/>},
      { path: 'product', element:<Product/>},
      { path: 'manage', element:<Manage/>},
    ]
  },
  {
    path: "/user",
    element: <LayoutUser/>,
    children: [
      { index:true, element: <HomeUser/> },

    ]
  }
]);

const AppRoutes = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default AppRoutes;
