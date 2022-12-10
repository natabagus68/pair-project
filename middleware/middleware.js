const express = require("express");
const router = express.Router();

exports.checkSession = (req, res, next) => {
  console.log(req.session);
  if (req.session.userId) next();
  else res.redirect("/?sorry=maaf anda harus login dulu");
};

exports.denied = (req, res, next) => {
  console.log("ini check session", req.session);
  if (!req.session.userId) next();
  else res.redirect("/successLogin?success=selamat anda berhasil login");
};
