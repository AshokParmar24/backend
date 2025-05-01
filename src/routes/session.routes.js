const express = require("express");
const auth = require("../middlewares/auth");
const {
  getSessionList,
  updateSessionStatus,
} = require("../controllers/session.controllers");

const router = express.Router();

router.route("/get-all").get(auth, getSessionList);
router.route("/update/:sessionId").patch(auth, updateSessionStatus);

module.exports = router;
