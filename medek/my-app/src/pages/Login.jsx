import React, { useEffect } from "react";

import LoginForm from "../components/LoginForm";
import { useNavigate } from "react-router-dom";



const LoginPage = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      // İleride token tarih kontrolü yapılabilir
      navigate("/panel");
    }
  }, [token, navigate]);

  if (!token) {
    return (
      <div>
        <LoginForm />
      </div>
    );
  }

  // Token varsa zaten useEffect ile yönlendirme yapılacak
  return null;
};

export default LoginPage;