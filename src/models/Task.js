const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  assignedEmployee: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
  priority: { type: String, enum: ["Low", "Medium", "High"], default: "Medium" },
  deadline: Date,
  status: { type: String, enum: ["Pending", "In Progress", "Completed"], default: "Pending" }
});

module.exports = mongoose.model("Task", taskSchema);
