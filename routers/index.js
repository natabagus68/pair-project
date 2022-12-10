const express = require("express");
const router = express.Router();
const landingPage = require("../controllers/landing_page");
const login = require("./login");
router.get("/", landingPage.showlandingPage);
router.use("/login", login);
module.exports = router;
