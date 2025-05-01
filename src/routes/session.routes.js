const express = require("express");
const auth = require("../middlewares/auth");
const { getSessionList } = require("../controllers/session.controllers");

const router = express.Router();

router.route("/get-all").get(auth, getSessionList);

module.exports = router;
