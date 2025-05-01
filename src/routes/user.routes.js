const express = require("express");
const validate = require("../middlewares/validateRequest");
const {
  createNewUser,
  singInUser,
} = require("../controllers/user.controllers");
const useValidation = require("../validations/user.validator");
const useSingInValidation = require("../validations/user.login.validator");

const router = express.Router();

router.route("/signup").post(validate(useValidation), createNewUser);
router.route("/singin").post(validate(useSingInValidation), singInUser);

module.exports = router;
