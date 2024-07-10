import React, { useEffect, useState } from "react";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { FaMale, FaFemale } from "react-icons/fa";
import { IoIosPerson } from "react-icons/io";

import { useUserContext } from "../context/UserContext";

function UserDetails() {
  const [user, setUser] = useState(
    JSON.parse(window.localStorage.getItem("user")) || null
  );

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const handleUserDetails = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:3001/user/${user._id}`);
        const data = await res.json();
        setUser(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);

        console.log(error.message);
      }
    };
    handleUserDetails();
  }, []);
  return (
    <div className="flex justify-center items-center mt-[30px] ">
      <div
        className=" bg-gray-300 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100
 w-1/2 h-[400px] shadow-2xl text-text-color flex justify-center flex-col gap-5 "
      >
        <div className="border-b-2 border-white p-2 flex items-center gap-3">
          <IoIosPerson />
          <p className=" w-full ">
            Hello <span>{user.fullname} 👋</span>
          </p>
        </div>
        <div className="border-b-2 border-white p-2 flex items-center gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <p>
            FullName: <span>{user.fullname}</span>
          </p>
        </div>
        <div className="border-b-2 border-white p-2 flex items-center gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <p>
            Username: <span>{user.username}</span>
          </p>
        </div>
        <div className="border-b-2 border-white p-2 flex items-center gap-3">
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
          <p>
            Password: <span> **************** </span>
          </p>
        </div>
        <div className="border-b-2 border-white p-2 flex items-center gap-3">
          <IoCalendarNumberOutline />

          <p>
            Age: <span>{user.age}</span>
          </p>
        </div>
        <div className=" p-2 flex items-center gap-3 text-lg">
          {user.gender === "male" ? <FaMale /> : <FaFemale />}
          <p>
            Gender: <span>{user.gender}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserDetails;
