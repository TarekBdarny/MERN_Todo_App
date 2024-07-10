import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { IoAdd } from "react-icons/io5";
import { useUserContext } from "../context/UserContext";
import toast from "react-hot-toast";

function CreateTodoPage() {
  const { user } = useUserContext();
  const [todo, setTodo] = useState({
    title: "",
    markAsDone: false,
    id: user._id,
  });
  const [err, setErr] = useState("sdf");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (todo === "") {
      toast.error("Empty todo not valid!");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3001/todo/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
      });
      setLoading(false);
      window.localStorage.setItem("active", "todos");
      setTimeout(() => {
        navigate("/todos");
        location.reload(true);
      }, 400);
      toast.success(`${todo.title} successfully updated`);
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };
  return (
    <>
      <div className="flex flex-col justify-center items-center mt-[100px]">
        <h1 className="mb-[50px] text-highlight text-5xl">Add A Todo</h1>
        <div className="w-1/2 flex justify-center items-center gap-2   ">
          <label className="input input-bordered flex items-center gap-2 ">
            <input
              type="text"
              className="w-[500px] text-text-color"
              placeholder="Walk The Dog"
              value={todo.title}
              onChange={(e) => setTodo({ ...todo, title: e.target.value })}
            />
          </label>
          <button
            className="btn bg-highlight text-text-color text-3xl"
            onClick={handleSubmit}
          >
            {!loading ? <IoAdd /> : <Loading />}
          </button>
        </div>
      </div>
    </>
  );
}

export default CreateTodoPage;
