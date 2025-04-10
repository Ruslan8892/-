import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
}
const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/register", { email, password });
      toast.success("Успішна реєстрація");
      navigate("/login");
    } catch (err) {
      toast.error("Помилка реєстрації");
    }
  };
  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto p-4">
      <input
        className="w-full p-2 mb-2"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        className="w-full p-2 mb-2"
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit" className="w-full bg-green-600 text-white p-2">
        Зареєструватися
      </button>
    </form>
  );