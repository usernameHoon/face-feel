import axios from "axios";
import { jwtDecode } from "jwt-decode";

import { apiRequest } from "./apiService";

export const getToken = () => localStorage.getItem("token");

export const getUserIdFromToken = () => {
  const token = getToken();
  if (!token) return null;

  try {
    return jwtDecode(token).userId;
  } catch (error) {
    console.error("JWT 디코딩 오류:", error);
    return null;
  }
};

export const loginUser = async (form, setIsLoggedIn, navigate, setError) => {
  try {
    const res = await axios.post("http://localhost:8080/api/login", form);

    const { token, user } = res.data;

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    setIsLoggedIn(true);

    if (user.role === "ADMIN") {
      navigate("/admin");
    } else {
      navigate("/");
    }

  } catch (err) {
    if (err.response) {
      setError(err.response.data.message || "등록되지 않은 이메일이거나 회원탈퇴한 회원입니다.");
    } else {
      setError("서버에 연결할 수 없습니다.");
    }
  }
};

export const signupUser = async (form, navigate, setError) => {
  try {
    await apiRequest("http://localhost:8080/api/signup", "POST", {
      email: form.email,
      password: form.password,
      name: form.name,
    });

    alert("회원가입 성공!");
    navigate("/login");
  } catch (error) {
    setError("이미 존재하는 이메일입니다.");
  }
};