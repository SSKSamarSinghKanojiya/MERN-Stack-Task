const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");

// Register Code

exports.Register = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(StatusCodes.NOT_ACCEPTABLE)
        .json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({ email, password: hashedPassword });
    await user.save();

    res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Admin Registered successfully",
      data: user,
      error: {},
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "something went wrong ",
      data: {},
      error: error,
    });
  }
};

// Login Code

exports.Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Inavlid Credentials" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_Secret, {
      expiresIn: "1h",
    });

    res.status(StatusCodes.ACCEPTED).json({
      success: true,
      message: "Login successfully",
      token: token,
      error: {},
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "something went wrong ",
      data: {},
      error: error,
    });
  }
};
