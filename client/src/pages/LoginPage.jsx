import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import Loading from "../components/Loading";

function LoginPage({ activeState }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { setActive } = activeState;
  const { setUser } = useUserContext();

  const handleNavigate = () => {
    setActive("register");
    window.localStorage.setItem("active", "register");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      window.localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
      location.reload(true);
      window.localStorage.setItem("active", "todos");

      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center mt-[100px]  flex-col  h-[500px] ">
      <form className="w-1/3 flex flex-col justify-center gap-3 border-red-100 border-2 h-[600px] relative p-4">
        <h1 className="text-left absolute top-5 left-5 text-2xl ">
          <span className="text-highlight">Login</span> Page
        </h1>
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input
            type="text"
            className=" text-text-color"
            placeholder="User Name"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="password"
            className="grow text-text-color"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button
          className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg w-full bg-highlight text-text-color"
          onClick={handleLogin}
        >
          {loading ? <Loading /> : "Login"}
        </button>
        <Link
          to={"/auth/register"}
          className=" hover:underline "
          onClick={handleNavigate}
        >
          Don't have an account?{" "}
          <span className="text-highlight">Register now.</span>{" "}
        </Link>
      </form>
    </div>
  );
}

export default LoginPage;
