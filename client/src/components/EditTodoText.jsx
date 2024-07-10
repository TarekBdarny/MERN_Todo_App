import React, { useState } from "react";
import toast from "react-hot-toast";

function EditTodoText({ data }) {
  const {
    toUpdate,
    setToUpdate,
    setUpdatedTitle,
    updatedTitle,
    handleToUpdate,
  } = data;
  const [title, setTitle] = useState(updatedTitle);
  const handleUpdate = async (e) => {
    e.preventDefault();
    handleToUpdate();
    setUpdatedTitle(title);
    setToUpdate(!toUpdate);

    toast.success(`${updatedTitle} got updated`);
    setTimeout(() => {
      location.reload(true);
    }, 600);
  };
  return (
    <div className="w-full">
      <form className="flex items-center gap-5">
        <input
          className="w-[450px] h-[50px] p-2 bg-transparent border-b outline-none"
          type="text"
          placeholder="Change Todo Title"
          value={updatedTitle}
          onChange={(e) => setUpdatedTitle(e.target.value)}
        />
        <button
          onClick={handleUpdate}
          className="text-text-color hover:bg-highlight p-3 rounded-md transition-all duration-300"
        >
          Done
        </button>
      </form>
    </div>
  );
}

export default EditTodoText;
