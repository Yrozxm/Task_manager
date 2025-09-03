import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/tasks");

const Task = mongoose.model("Task", new mongoose.Schema({
  title: String,
  done: Boolean
}));

app.get("/tasks", async (req, res) => res.json(await Task.find()));
app.post("/tasks", async (req, res) => {
  const task = new Task(req.body);
  await task.save();
  res.json(task);
});

app.listen(4000, () => console.log("Backend porta 4000"));
