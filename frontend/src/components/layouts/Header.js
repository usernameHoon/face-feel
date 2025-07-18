import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

import { logoutAndRedirect } from '../../utils/authUtils';

const Header = ({ isSignedIn, setIsSignedIn }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUserName(user.name);
    }
  }, [isSignedIn]);

  return (
    <header className="bg-gray-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">
          <Link to="/" className="hover:text-gray-300">
            Emotion AI
          </Link>
        </h1>

        <nav className="flex items-center space-x-6 text-sm font-medium">
          {isSignedIn ? (
            <>
              <span className="text-base text-green-600">
                [ {userName} ]님 환영합니다.
              </span>

              {user?.role === "ADMIN" ? (
                <Link
                  to="/admin"
                  className="hover:text-blue-300 transition-colors"
                >
                  관리자 페이지
                </Link>
              ) : (
                <Link
                  to="/mypage"
                  className="hover:text-blue-300 transition-colors"
                >
                  MyPage
                </Link>
              )}

              <button
                onClick={() => logoutAndRedirect(setIsSignedIn, navigate)}
                className="hover:text-blue-700 transition-colors"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link to="/signin" className="hover:text-blue-300 transition-colors">
                Sign In
              </Link>
              <Link to="/signup" className="hover:text-blue-300 transition-colors">
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
