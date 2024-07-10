import React from "react";
import Todo from "../components/Todo";
import InfoFound from "../components/InfoFound";
import Loading from "../components/Loading";

function TodosPage({ todos, loading }) {
  return (
    <div className="flex flex-col items-center my-[50px] w-full gap-4 ">
      <InfoFound number={todos.length} />
      {loading ? (
        <Loading />
      ) : (
        todos.map((todo) => <Todo key={todo._id} todo={todo} />)
      )}
    </div>
  );
}

export default TodosPage;
