import Todo from "../models/todo.model.js";
import User from "../models/user.model.js";
export const getTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) return res.status(404).json({ message: "user not found" });
    const todo = await Todo.find({ userID: id });
    res.status(200).json(todo);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "server error" });
  }
};
export const addTodo = async (req, res) => {
  try {
    const { id, title, markAsDone } = req.body;
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "user not found" });
    const newTodo = new Todo({
      title,
      userID: id,
      markAsDone,
    });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};
export const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, markAsDone } = req.body;

    const todo = await Todo.findById(id);
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    todo.title = title;
    todo.markAsDone = markAsDone;
    await todo.save();
    res.status(200).json({ message: "Todo updated successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "server error" });
  }
};
export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id);
    if (!todo) return res.status(404).json({ message: "todo not found" });
    await Todo.findByIdAndDelete(id);
    // await todo.save();
    res.status(204).json({ message: "Todo deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "server error" });
  }
};
