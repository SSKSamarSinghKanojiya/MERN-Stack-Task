const mongoose = require("mongoose");

// Name, Email, Phone, Department, Status (Active/Inactive)

const employeeSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  department: String,
  status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
});

module.exports = mongoose.model("Employee", employeeSchema);
