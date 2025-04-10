import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:5000/api/login", { email, password });
      localStorage.setItem("token", data.token);
      toast.success("Успешный вход");
      navigate("/dashboard");
    } catch (err) {
      toast.error("Ошибка входа");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto p-4">
      <input className="w-full p-2 mb-2" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input className="w-full p-2 mb-2" value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Пароль" />
      <button className="bg-blue-500 text-white p-2 w-full" type="submit">Войти</button>
    </form>
  );
};
export default Login;