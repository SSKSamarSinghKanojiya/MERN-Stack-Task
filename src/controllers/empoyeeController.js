const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const Employee = require("../models/Employee");

// Create employee
exports.createEmployee = async (req, res) => {
  try {
    const data_employee = new Employee(req.body);
    await data_employee.save();
    res.status(200).json({ data_employee });
  } catch (error) {
    res.status(500).json({ message: "Error ", error: error.message });
  }
};

// Get  employee
exports.getEmployee = async (req, res) => {
  try {
    const data_employee = await Employee.find().select(
      "name email phone department status"
    );
    res.status(200).json({ data_employee });
  } catch (error) {
    res.status(500).json({ message: "Error ", error: error.message });
  }
};

// Update employee
exports.updateEmployee = async (req, res) => {
  try {
    const data_employee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json({ 
      message:"Update Successfully",
      data: data_employee });
  } catch (error) {
    res.status(500).json({ message: "Error ", error: error.message });
  }
};

// delete employee
exports.deleteEmployee = async (req, res) => {
  try {
    const data_employee = await Employee.findByIdAndDelete(req.params.id);
    res.status(200).json({message:"Employee Deleted"});
  } catch (error) {
    res.status(500).json({ message: "Error ", error: error.message });
  }
};
