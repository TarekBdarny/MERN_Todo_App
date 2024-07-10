import React, { useEffect, useState } from "react";
import { GrUpdate } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { IoMdCheckmark } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import toast from "react-hot-toast";
import EditTodoText from "./EditTodoText";
const Todo = ({ todo }) => {
  const [loading, setLoading] = useState(false);
  const [toUpdate, setToUpdate] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(todo.title);
  const navigate = useNavigate();
  const handleDelete = async () => {
    try {
      setLoading(true);
      await fetch(`http://localhost:3001/todo/${todo._id}`, {
        method: "DELETE",
        "Content-Type": "application/json",
      });
      setLoading(false);
      toast.success(`${todo.title} successfully deleted`);
      setTimeout(() => location.reload(true), 2000);
    } catch (error) {
      setLoading(false);
      console.log(error.message);
    }
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);
      await fetch(`http://localhost:3001/todo/${todo._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...todo, markAsDone: !todo.markAsDone }),
      });
      setLoading(false);
      toast.success(`${todo.title} successfully updated`);
      setTimeout(() => location.reload(true), 400);
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  const handleToUpdate = async () => {
    try {
      setToUpdate(!toUpdate);
      await fetch(`http://localhost:3001/todo/${todo._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...todo, title: updatedTitle }),
      });
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="w-1/2 bg-highlight min-h-[100px] flex items-center justify-between text-text-color rounded-xl p-5 ">
      <div>
        <p
          className={`text-xl ${
            todo.markAsDone ? " line-through text-black " : ""
          } `}
        >
          {loading ? (
            <Loading />
          ) : toUpdate ? (
            <EditTodoText
              data={{
                toUpdate,
                setToUpdate,
                setUpdatedTitle,
                updatedTitle,
                handleToUpdate,
              }}
            />
          ) : (
            todo.title
          )}
        </p>
      </div>
      <div className="flex h-[60px] p-3 w-[150px] rounded-md justify-between text-2xl ">
        <button className="transition-all hover:text-[#037278]">
          <IoMdCheckmark onClick={handleUpdate} />
        </button>
        <button className="transition-all duration-300 hover:text-[#037278]">
          <GrUpdate onClick={handleToUpdate} />
        </button>
        <button className="transition-all hover:text-[#037278]">
          <MdDelete onClick={handleDelete} />
        </button>
      </div>
    </div>
  );
};

export default Todo;

// <div className="w-1/2 flex justify-between   bg-highlight p-4 rounded-xl min-h-[100px] text-text-color">
//       <div className="flex items-center justify-between">
//         <p>{todo.title}</p>
//         <div className="w-[150px] flex justify-center items-center gap-4 text-xl">
//           <button>
//             <IoMdCheckmark />
//           </button>
//           <button>
//             <GrUpdate />
//           </button>
//           <button>
//             <MdDelete />
//           </button>
//         </div>
//       </div>
//     </div>
