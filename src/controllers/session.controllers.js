const Session = require("../models/session.model");
const { updateSession } = require("../service/session.service");

const getSessionList = async (req, res) => {
  try {
    const totalCount = await Session.countDocuments({});
    const activeCount = await Session.countDocuments({ isActive: true });
    const inactiveCount = await Session.countDocuments({ isActive: false });
    const sessions = await Session.find().sort({ createdAt: -1 }); // Optional sorting

    res.status(200).json({
      totalCount,
      activeCount,
      inactiveCount,
      sessions,
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching sessions", error: err });
  }
};

const updateSessionStatus = async (req, res) => {
  const { sessionId } = req.params;
  const { isActive } = req.body;

  try {
    const session = await updateSession(
      { _id: sessionId },
      { $set: { isActive: isActive } }
    );
    console.log("sessionsessionsession", session);

    if (!session) {
      return res
        .status(404)
        .json({ message: "Session not found", status: false });
    }
    res.status(200).json({ message: "Session status updated", status: true });
  } catch (err) {
     res.status(500).json({
      message: 'Something went wrong',
      status: false,
     });
  }
};

module.exports = { getSessionList, updateSessionStatus };
