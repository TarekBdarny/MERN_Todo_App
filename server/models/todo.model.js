import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  markAsDone: {
    type: Boolean,
  },
});
const Todo = mongoose.model("Todo", todoSchema);
export default Todo;
