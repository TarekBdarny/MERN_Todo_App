import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { useUserContext } from "../context/UserContext";
function RegisterPage({ activeState }) {
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    fullname: "",
    username: "",
    password: "",
    confirmPassword: "",
    age: "",
    gender: "",
  });

  const [errMessage, setErrMessage] = useState("");
  const navigate = useNavigate();
  const { setActive } = activeState;
  const handleNavigate = () => {
    setActive("login");
    window.localStorage.setItem("active", "login");
  };
  const { setUser } = useUserContext();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!handleInputs()) return false;
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });
      const data = await res.json();
      setErrMessage(data.message);
      setLoading(false);
      toast.success("Account successfully registered");
      setUser(data);
      window.localStorage.setItem("user", JSON.stringify(data));
      navigate("/auth/login");
    } catch (error) {
      setLoading(false);
      setErrMessage(error.message);
    }
  };
  const handleInputs = () => {
    if (
      inputs.username === "" ||
      inputs.fullname === "" ||
      inputs.password === "" ||
      inputs.confirmPassword === "" ||
      inputs.age === ""
    ) {
      setErrMessage("All input fields are required");
      return false;
    }
    if (inputs.password.length < 8) {
      setErrMessage("password must be at least 8 characters long");
      return false;
    }
    if (inputs.password.charAt(0) > "z" && inputs.password.charAt(0) < "a") {
      setErrMessage("password must start with a letter");
      return false;
    }
    if (inputs.password !== inputs.confirmPassword) {
      setErrMessage("passwords do not match");

      return false;
    }
    if (inputs.age < 12) {
      setErrMessage("age must be above 12");
    }

    return true;
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-1/3 flex flex-col gap-4">
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
            className="grow text-text-color"
            placeholder="User Name"
            value={inputs.username}
            onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <input
            type="text"
            className="grow text-text-color"
            placeholder="Full Name"
            value={inputs.fullname}
            onChange={(e) => setInputs({ ...inputs, fullname: e.target.value })}
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
            value={inputs.password}
            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
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
            placeholder="confirm password"
            value={inputs.confirmPassword}
            onChange={(e) =>
              setInputs({ ...inputs, confirmPassword: e.target.value })
            }
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <IoCalendarNumberOutline />
          <input
            type="number"
            className="grow text-text-color"
            placeholder="age"
            value={inputs.age}
            onChange={(e) => setInputs({ ...inputs, age: e.target.value })}
          />
        </label>
        <div className="flex justify-center gap-5">
          <div className="flex justify-center items-center gap-3">
            <label htmlFor="male" className="cursor-pointer text-text-color">
              Male
            </label>
            <input
              type="radio"
              id="male"
              name="radio-1"
              className="radio"
              defaultChecked
              onChange={(e) => setInputs({ ...inputs, gender: "male" })}
            />
          </div>
          <div className="flex justify-center items-center gap-3">
            <label htmlFor="female" className="cursor-pointer text-text-color">
              Female
            </label>

            <input
              type="radio"
              id="female"
              name="radio-1"
              className="radio"
              onChange={(e) => setInputs({ ...inputs, gender: "female" })}
            />
          </div>
        </div>
        <button
          className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg bg-highlight text-text-color"
          onClick={handleSubmit}
        >
          {!loading ? "Submit" : <Loading />}
        </button>
        <p className="text-red-600">{errMessage}</p>
        <Link
          to={"/auth/login"}
          className="hover:underline"
          onClick={handleNavigate}
        >
          Already have an account?{" "}
          <span className="text-highlight">Login.</span>
        </Link>
      </div>
    </div>
  );
}

export default RegisterPage;
