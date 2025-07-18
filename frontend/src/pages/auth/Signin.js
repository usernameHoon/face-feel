import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { signinUser } from "../../services/authService";

const Signin = ({ setIsSignedIn }) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signinUser(form, setIsSignedIn, navigate, setError);
  };

  return (
    <div className="bg-white p-8 rounded shadow w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-center">로그인</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="w-full border p-2 mb-3 rounded"
          type="email"
          name="email"
          placeholder="이메일"
          required
          onChange={handleChange}
          value={form.email}
        />

        <input className="w-full border p-2 mb-5 rounded"
          type="password"
          name="password"
          placeholder="비밀번호"
          required
          onChange={handleChange}
          value={form.password}
        />

        <button className="w-full bg-gray-700 text-white py-2 rounded hover:bg-gray-800 transition">로그인</button>

        {error && (
          <p className="mt-4 text-sm text-red-600 font-medium text-center">
            {error}
          </p>
        )}

      </form>
      <p className="text-center text-sm mt-4">
        계정이 없으신가요? <Link to="/signup" className="text-blue-500">회원가입</Link>
      </p>
    </div>
  );
};

export default Signin;
