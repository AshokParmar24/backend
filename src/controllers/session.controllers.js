const Session = require("../models/session.model");

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


module.exports={getSessionList}