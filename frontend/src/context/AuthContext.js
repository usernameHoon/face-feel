// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (userData && token) {
      const user = JSON.parse(userData);
      setIsSignedIn(true);
      setRole(user.role);
    }
  }, []);

  const signin = (userData, token) => {
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', token);
    setIsSignedIn(true);
    setRole(userData.role);
  };

  const signout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setIsSignedIn(false);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ isSignedIn, role, signin, signout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 커스텀 훅
export const useAuth = () => useContext(AuthContext);
