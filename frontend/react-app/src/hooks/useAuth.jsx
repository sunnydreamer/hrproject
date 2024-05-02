import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      setIsAuthenticated(false);
    } else {
      axios
        .get("http://localhost:3000/user/auth", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            setIsAuthenticated(true);
          }
        })
        .catch((error) => {
          console.log(error);
          // setIsAuthenticated(false);
          navigate("/not-found", { state: { errorTitle: "403 Forbidden" }, replace: true })
        });
    }
  }, []);
  return isAuthenticated;
};

export default useAuth;
