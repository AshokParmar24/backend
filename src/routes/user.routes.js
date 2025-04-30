const express = require("express");
const validate = require("../middlewares/validateRequest");
const { createNewUser } = require("../controllers/user.controllers");
const useValidation = require("../validations/user.validator");

const router = express.Router();

router.route("/signup").post(validate(useValidation), createNewUser);

module.exports=router
