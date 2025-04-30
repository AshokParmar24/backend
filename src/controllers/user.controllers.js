const User = require("../models/user.model");
const { createUser } = require("../service/user.service");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createNewUser = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const userData = {
      ...req.body,
      password: hashedPassword,
    };
    req.body.password = hashedPassword;
    const newUser = await createUser(userData);
    console.log("newUsernewUser", newUser);
    return res.status(201).json({
      data: newUser,
      status: true,
      message: "User created successfully",
    });
  } catch (error) {
    throw error;
  }
};

module.exports = { createNewUser };
