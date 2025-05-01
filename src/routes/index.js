const express = require("express");
const userRoute=require("./user.routes")
const sessionRoute=require("./session.routes")

const router = express?.Router();

router.use("/user", userRoute);
router.use("/session", sessionRoute);



module.exports=router
