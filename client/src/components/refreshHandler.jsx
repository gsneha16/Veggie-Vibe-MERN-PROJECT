import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const refreshHandler = ({ setisAuthenticated }) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setisAuthenticated(true);
      if (
        location.pathname === "/" ||
        location.pathname === "/signin" ||
        location.pathname === "/login"
      ) {
        navigate("/dashboard", { replace: false });
      }
    } else {
      setisAuthenticated(false);
    }
  }, [location, navigate, setisAuthenticated]);

  return null;
};

export default refreshHandler;
