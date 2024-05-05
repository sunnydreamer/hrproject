import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const useAuth = (token) => {
  console.log("in useAuth");
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    console.log("in useAuth useEffect");
    const tokenFromCookie = Cookies.get("token");
    console.log("tokenFromCookie", tokenFromCookie);
    console.log("tokenFromState", token);
    if (!token) {
      console.log("in useAuth no token - if branch");
      setIsAuthenticated(false);
    } else {
      console.log("sending axios request");
      axios
        .post("http://localhost:3000/user/auth", {
          headers: {
            // Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ token }),
        })
        .then((res) => {
          if (res.status === 200) {
            console.log("authenticated");
            setIsAuthenticated(true);
          }
        })
        .catch((error) => {
          console.log(error);
          // setIsAuthenticated(false);
          navigate("/not-found", { state: { errorTitle: "403 Not Authorized" }, replace: true })
        });
    }
  }, []);
  return isAuthenticated;
};

export default useAuth;
