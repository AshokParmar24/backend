const Session = require("../models/session.model");

const findOneSession = async (query) => {
  console.log("query", query);
  try {
    const session = await Session.findOne(query);
    return session;
  } catch (error) {
    throw error;
  }
};

const createSession = async (data) => {
  try {
    const newSession = new Session(data);
    const savedSession = await newSession.save();
    return savedSession;
  } catch (error) {
    throw error;
  }
};

const updateSession = async (sessionId, updateData) => {
  console.log("sessionId", sessionId, "updateData", updateData);

  try {
    const updatedSession = await Session.findOneAndUpdate(
      { _id: sessionId },
      updateData,
      { new: true }
    );

    if (!updatedSession) {
      throw new Error("Session not found");
    }

    return updatedSession;
  } catch (error) {
    throw error;
  }
};

module.exports = { createSession, updateSession, findOneSession };
