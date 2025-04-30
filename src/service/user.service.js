const User = require("../models/user.model");

const createUser = async (data) => {
  try {
    const newUser = new User(data);
    const savedUser = await newUser.save();
    return savedUser;
  } catch (error) {
    throw error;
  }
};

module.exports = { createUser };
