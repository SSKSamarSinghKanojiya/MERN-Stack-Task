const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const Employee = require("../models/Employee");
const Task = require("../models/Task");



// Create employee
exports.createTask = async (req, res) => {
  try {
    const task = new Task(req.body)
    await task.save();
    res.status(200).json({ 
      messageL:"Task Created Successfully",
      task:task});
  } catch (error) {
    res.status(500).json({ message: "Error ", error: error.message });
  }
};

// Get  task
exports.getTask = async (req, res) => {
  try {
    const task = await Task.find().populate("assignedEmployee")
    res.status(200).json({ 
      message:"Get Data Sucessfully",
      task: task});
  } catch (error) {
    res.status(500).json({ message: "Error ", error: error.message });
  }
};

// Update task
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ 
      message:"Update Successfully",
      data: task });
  } catch (error) {
    res.status(500).json({ message: "Error ", error: error.message });
  }
};


// delete task
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({message:"Task Deleted"});
  } catch (error) {
    res.status(500).json({ message: "Error ", error: error.message });
  }
};
