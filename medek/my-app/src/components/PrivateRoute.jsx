import React from 'react';
import { Route, Navigate } from 'react-router-dom';

// Token'ı localStorage'dan kontrol ediyoruz
const PrivateRoute = ({ element, ...rest }) => { // rest elementten sonra sınırsız parametre alabileceğini belirtir
  const token = localStorage.getItem("token");

  if (!token) {
    // Eğer token yoksa login sayfasına yönlendir
    return <Navigate to="/login" />;
  }

  // Eğer token varsa, normal şekilde element'i render et
  return element;
};

export default PrivateRoute;