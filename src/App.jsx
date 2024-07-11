/* eslint-disable no-unused-vars */
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import NotFound from "./pages/Not Found Page/Not-Found";
import Home from "./pages/Home/Home";
import Contact from "./pages/Contact/Contact";
import Products from "./pages/Products/Products";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./components/SignUp";
import Protected from "./routes/Protected/Protected";
import UserProtected from "./routes/Protected/UserProtected";
import UserProfile from "./components/Users/UserProfile";
import UserOrder from "./components/Users/UserOrder";
import UserFavorites from "./components/Users/UserFavorites";
import UserReturns from "./components/Users/UserReturns";
import UserCoupons from "./components/Users/UserCoupons";
import UserAddress from "./components/Users/UserAddress";
import AdminProtected from "./routes/Protected/AdminProtected";
import AdminDashboard from "./components/Admin/AdminDashboard";
import Cart from "./pages/Cart/Cart";
import { ProductsProvider } from "./components/UseContext";
import ProductShow from "./components/ProductShow";
import MainLayout from "./Layouts/MainLayout";
import Order from "./pages/Order/Order";
import Forgot from "./pages/SignIn/Forgot";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      { path: "/", element: <Home /> },
      { path: "home", element: <Home /> },
      { path: "contact", element: <Contact /> },
      { path: "products", element: <Products /> },
      { path: "products/product/:id", element: <ProductShow /> },
      { path: "cart", element: <Cart /> },
      { path: "cart/order/payment", element: <Order /> },
      //if user already logged in then protect singIn and Signup, and i want to only profile releated page
      {
        path: "/",
        element: <Protected />,
        children: [
          { path: "signin", element: <SignIn /> },
          {
            path: "/forgot-password",
            element: <Forgot />,
          },
          {
            path: "/sign-up/:email",
            element: <SignUp />,
          },
          { path: "sign-up", element: <SignUp /> },
        ],
      },
      {
        path: "/dashboard",
        element: <UserProtected />,
        children: [
          // Profile
          // My Orders
          // My Favorites
          // My Returns
          // My Coupons
          // My Address
          // Logout
          { path: "user/profile", element: <UserProfile /> },
          { path: "user/orders", element: <UserOrder /> },
          { path: "user/favorites", element: <UserFavorites /> },
          { path: "user/returns", element: <UserReturns /> },
          { path: "user/coupons", element: <UserCoupons /> },
          { path: "user/address", element: <UserAddress /> },
        ],
      },
      {
        path: "admin",
        element: <AdminProtected />,
        children: [
          // Admin Dashboard
          // Admin Products
          // Admin Categories
          // Admin Users
          // Admin Orders
          // Admin Returns
          // Admin Coupons
          {
            path: "admin/dashboard",
            element: <AdminDashboard />,
          },
        ],
      },

      { path: "*", element: <NotFound /> }, // catch-all route to display 404 page
    ],
  },
]);
const App = () => {
  return (
    <ProductsProvider>
      <RouterProvider router={router} />
    </ProductsProvider>
  );
};

export default App;
