import React from "react";
import { useNavigate } from "react-router-dom";
function LogOutButton({ setActive }) {
  const navigate = useNavigate();
  const handleLogOut = () => {
    window.localStorage.removeItem("user");
    location.reload(true);
    window.localStorage.setItem("active", "login");
    navigate("/login");
  };
  return (
    <button
      onClick={handleLogOut}
      className="text-text-color hover:bg-highlight p-3 rounded-md transition-all duration-300"
    >
      Logout
    </button>
  );
}

export default LogOutButton;
