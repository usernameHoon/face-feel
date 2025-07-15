import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import Signin from "./pages/auth/Signin";
import Signup from "./pages/auth/Signup";
import MyPage from "./pages/userPage/MyPage";
import Home from './pages/Home';

import PrivateRoute from "./routes/PrivateRoute";

function AppWrapper() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem("token"));
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.role === "ADMIN";
  const isAdminPage = location.pathname.startsWith("/admin");

  const hideHeader = isAdmin && isAdminPage;

  return (
    <>
      <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
        {!hideHeader && <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}
        <main className="flex-grow flex justify-center items-start pt-44">
          <Routes>
            <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin setIsLoggedIn={setIsLoggedIn} />} />
            <Route
              path="/mypage"
              element={
                <PrivateRoute>
                  <MyPage />
                </PrivateRoute>
              }
            />
          </Routes>
        </main >
        <Footer />
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
