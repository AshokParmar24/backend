const express = require("express");
const validate = require("../middlewares/validateRequest");

const router = express.Router();

// router.route("/signup").post(validate(useValidation), newUser);
router.post("/signup", (req, res) => {
  res.send("Signup route working!");
});
module.exports = router;
