import { Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import Navbar from "./components/navbar";
import Cart from "./components/cart";
import OrderConfirm from "./components/orderConfirm";
import OrderHistory from "./components/orderHistory";
import Store from "./components/products";
import Login from "./components/login";
import Signin from "./components/signin";
import Wishlist from "./components/wishlist";
import Dashboard from "./components/dashboard";
import RefreshHandler from "./components/refreshHandler";
import Welcome from "./components/welcome";
import { useState } from "react";
import TrialHome from "./components/trialHome";

function App() {
  const [isAuthenticated, setisAuthenticated] = useState(false);

  const PrivateRoute = ({ element, redirectTo = "/login" }) => {
    return isAuthenticated ? element : <Navigate to={redirectTo} />;
  };

  return (
    <>
      <Navbar />
      <RefreshHandler setisAuthenticated={setisAuthenticated} />{" "}
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/home" element={<TrialHome />} />
        <Route path="/cart" element={<PrivateRoute element={<Cart />} />} />
        <Route path="/orderConfirm" element={<OrderConfirm />} />
        <Route
          path="/wishlist"
          element={<PrivateRoute element={<Wishlist />} />}
        />
        <Route path="/signin" element={<Signin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/orderHistory" element={<OrderHistory />} />
        <Route
          path="/dashboard"
          element={<PrivateRoute element={<Dashboard />} redirectTo="/" />}
        />
        <Route
          path="/store"
          element={
            <>
              <Store />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
