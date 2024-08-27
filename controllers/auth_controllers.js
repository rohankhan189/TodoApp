const User = require("../models/user.models");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({
      error: true,
      message: "Full Name, Email, and Password are required",
    });
  }

  const isUser = await User.findOne({ email });
  if (isUser) {
    return res.json({
      error: true,
      message: "User Already Exist",
    });
  }

  const user = new User({ fullName, email, password });
  await user.save();

  const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "30000m",
  });

  return res.json({
    error: false,
    user,
    accessToken,
    message: "Registration Successful",
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      error: true,
      message: "Email and Password are required",
    });
  }

  const userInfo = await User.findOne({ email });
  if (!userInfo || userInfo.password !== password) {
    return res.status(400).json({
      error: true,
      message: "Invalid Credentials",
    });
  }

  const accessToken = jwt.sign({ user: userInfo }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "30000m",
  });

  return res.json({
    error: false,
    message: "Login Successful",
    email,
    accessToken,
  });
};

module.exports = { register, login };
