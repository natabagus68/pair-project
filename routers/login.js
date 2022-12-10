const express = require("express");
const router = express.Router();
const ControllerLogin = require("../controllers/login");

router.post("/", ControllerLogin.login);
module.exports = router;
