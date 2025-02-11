// src/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, role }) => {
  console.log('PrivateRoute received element:', element);
  const userRole = localStorage.getItem('role');
  const isAuthenticated = localStorage.getItem('token');

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (userRole !== role) {
    return <Navigate to="/unauthorized" />;
  }

  return element;
};

export default PrivateRoute;
