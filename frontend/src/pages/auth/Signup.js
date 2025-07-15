import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { signupUser } from "../../services/authService";

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      await signupUser(form);
      navigate("/signin");
    } catch (err) {
      setError("회원가입에 실패했습니다.");
    }
  };

  return (
    <div className="bg-white p-8 rounded shadow w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-center">회원가입</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="이름"
          className="w-full border p-2 mb-3 rounded"
          required
          value={form.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="이메일"
          className="w-full border p-2 mb-3 rounded"
          required
          value={form.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="비밀번호"
          className="w-full border p-2 mb-3 rounded"
          required
          value={form.password}
          onChange={handleChange}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="비밀번호 확인"
          className="w-full border p-2 mb-5 rounded"
          required
          value={form.confirmPassword}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="w-full bg-gray-700 text-white py-2 rounded hover:bg-gray-800 transition"
        >
          회원가입
        </button>
        {error && (
          <p className="mt-4 text-sm text-red-600 font-medium text-center">
            {error}
          </p>
        )}
      </form>
      <p className="text-center text-sm mt-4">
        이미 계정이 있으신가요?{" "}
        <Link to="/signin" className="text-blue-500 hover:underline">
          로그인
        </Link>
      </p>
    </div>
  );
};

export default Signup;
