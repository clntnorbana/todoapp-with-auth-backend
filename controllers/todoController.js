const Todo = require("../models/todoModel");
const mongoose = require("mongoose");

// response error
const responseError = (response, error) => {
  return response.status(400).json({ error: error.message });
};

// not found error
const notFoundError = (response) => {
  return response.status(404).json({ error: "No such todo" });
};

// create todo
const createTodo = async (req, res) => {
  const { title } = req.body;

  try {
    const user_id = req.user._id;

    const todo = await Todo.create({ title, user_id });
    res.status(200).json(todo);
  } catch (error) {
    responseError(res, error);
  }
};

// get todos
const getTodos = async (req, res) => {
  try {
    const user_id = req.user._id;

    const todos = await Todo.find({ user_id }).sort({ createdAt: -1 });
    res.status(200).json(todos);
  } catch (error) {
    responseError(res, error);
  }
};

// get todo
const getTodo = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    notFoundError(res);
  }

  try {
    const todo = await Todo.findById(id);

    if (!todo) {
      notFoundError(res);
    }

    res.status(200).json(todo);
  } catch (error) {
    responseError(res, error);
  }
};

// delete todo
const deleteTodo = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    notFoundError(res);
  }

  try {
    const todo = await Todo.findByIdAndDelete({ _id: id });

    if (!todo) {
      notFoundError(res);
    }

    res.status(200).json(todo);
  } catch (error) {
    responseError(res, error);
  }
};

// update todo
const updateTodo = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    notFoundError(res);
  }

  try {
    const todo = await Todo.findByIdAndUpdate({ _id: id }, { ...req.body });

    if (!todo) {
      notFoundError(res);
    }

    res.status(200).json(todo);
  } catch (error) {
    responseError(res, error);
  }
};

module.exports = {
  createTodo,
  getTodos,
  getTodo,
  deleteTodo,
  updateTodo,
};
