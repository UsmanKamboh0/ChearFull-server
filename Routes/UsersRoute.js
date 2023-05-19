const express=require('express');
const { createuser,loginUser, logout } = require('../Controller/UserController');

const router =express.Router();

router.route("/adduser").post(createuser);
router.route("/userlogin").post(loginUser);
router.route("/logout").get(logout);

module.exports=router;