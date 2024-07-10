import { set } from "mongoose";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import LogOutButton from "./LogOutButton";
import toast from "react-hot-toast";

function Navbar({ setActive, active }) {
  const { user } = useUserContext();
  const handleActive = (e) => {
    const val = e.target.name;
    if (user) {
      setActive(val);
      window.localStorage.setItem("active", val);
    } else {
      if (val === "login" || val === "register") {
        setActive(val);
        window.localStorage.setItem("active", val);
      } else {
        toast.error("You must be logged in");
      }
    }
  };

  return (
    <div className="bg-secondary h-[3.5rem] flex justify-around items-center sticky top-0 left-0">
      <h1 className="text-xl">
        Todo <span className="text-highlight ">App</span>
      </h1>
      <div className="flex gap-5 justify-center items-center ">
        <Link
          to={"/todos"}
          name="todos"
          className={`text-text-color hover:bg-highlight p-3 rounded-md transition-all duration-300 ${
            active === "todos" && "bg-highlight"
          }`}
          onClick={handleActive}
        >
          See all todo's
        </Link>
        <Link
          to={"/create"}
          name="create"
          className={`text-text-color hover:bg-highlight p-3 rounded-md transition-all duration-300 ${
            active === "create" && "bg-highlight"
          }`}
          onClick={handleActive}
        >
          Create a todo
        </Link>

        <Link
          to={"/details"}
          name="details"
          className={`text-text-color hover:bg-highlight p-3 rounded-md transition-all duration-300 ${
            active === "details" && "bg-highlight"
          }`}
          onClick={handleActive}
        >
          See your details
        </Link>
        {!user ? (
          <>
            <Link
              to={"/auth/login"}
              name="login"
              className={`text-text-color w-[100px] text-center hover:bg-highlight p-3 rounded-md transition-all duration-300 ${
                active === "login" && "bg-highlight"
              }`}
              onClick={handleActive}
            >
              Login
            </Link>
            <Link
              to={"/auth/register"}
              name="register"
              className={`text-text-color w-[100px] text-center hover:bg-highlight p-3 rounded-md transition-all duration-300 ${
                active === "register" && "bg-highlight"
              }`}
              onClick={handleActive}
            >
              Register
            </Link>
          </>
        ) : (
          <LogOutButton setActive={setActive} />
        )}
      </div>
    </div>
  );
}

export default Navbar;
