import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CreateTodoPage from "./pages/CreateTodoPage";
import TodosPage from "./pages/TodosPage";
import UpdateTodo from "./pages/UpdateTodo";
import UserDetails from "./pages/UserDetails";
import NotFound from "./pages/NotFound";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import { useUserContext } from "./context/UserContext";

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(
    window.localStorage.getItem("active") || ""
  );
  const { user } = useUserContext();
  const id = user?._id || "";
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:3001/todo/${id}`);
        const data = await res.json();
        setTodos(data);
        setLoading(false);
        return;
      } catch (error) {
        setLoading(false);
        console.log(error.message);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    setActive(window.localStorage.getItem("active"));
  }, [window.localStorage.getItem("active")]);
  return (
    <div>
      {/* TODO:  update Todo*/}

      {/* TODO:  Login Logic*/}

      {/* TODO: make that the user can change their information */}
      <Navbar setActive={setActive} active={active} />
      <Routes>
        <Route
          path="/todos"
          element={
            !user ? (
              <Navigate to={"/auth/login"} />
            ) : (
              <TodosPage todos={todos} loading={loading} />
            )
          }
        />
        <Route
          path="/update"
          element={!user ? <Navigate to={"/auth/login"} /> : <UpdateTodo />}
        />
        <Route
          path="/details"
          element={!user ? <Navigate to={"/auth/login"} /> : <UserDetails />}
        />
        <Route
          path="/create"
          element={!user ? <Navigate to={"/auth/login"} /> : <CreateTodoPage />}
        />

        <Route path="/auth">
          <Route
            path="/auth/login"
            element={
              !user ? (
                <LoginPage activeState={{ active, setActive }} />
              ) : (
                <Navigate to={"/todos"} />
              )
            }
          />
          <Route
            path="/auth/register"
            element={
              !user ? (
                <RegisterPage activeState={{ active, setActive }} />
              ) : (
                <Navigate to={"/todos"} />
              )
            }
          />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
