import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => (
  <nav className="bg-white shadow p-4 flex gap-4">
    <Link to="/">Home</Link>
    <Link to="/login">Login</Link>
    <Link to="/register">Register</Link>
    <Link to="/dashboard">Dashboard</Link>
  </nav>
);
export default Navbar;