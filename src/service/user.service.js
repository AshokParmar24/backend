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

const findByUser = async (query) => {
  try {
    const user = await User.findOne(query);
    return user;
  } catch (error) {
    throw error;
  }
};

module.exports = { createUser, findByUser };
