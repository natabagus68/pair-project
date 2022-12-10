const express = require("express");
const Controller = require("../Controller/Controller");
const router = express.Router();
const { checkSession, denied } = require("../middleware/middleware");

router.get("/", denied, Controller.home);
router.get("/register", denied, Controller.register);
router.post("/register", denied, Controller.postRegister);
router.get("/login", denied, Controller.login);
router.post("/login", denied, Controller.postLogin);

// router.use((req, res, next) => {
//     if (req.session.userId && req.session.userRole==='Admin') {
//         res.redirect('/add')
//     }
//     else if(req.session.userId && req.session.userRole==='User') {
//         next()
//     }
// })
router.get("/successLogin", checkSession, Controller.successLogin);
router.get("/addPost", checkSession, Controller.addPostForm);
router.post("/addPost", checkSession, Controller.addPost);
router.get("/addProfile", checkSession, Controller.formProfile);
router.post("/addProfile", checkSession, Controller.addProfile);
router.get("/updateLike/:postId", checkSession, Controller.addLike);
router.get("/logout", checkSession, Controller.logOut);

router.use((req, res, next) => {
  if (req.session.userId && req.session.userRole != "Admin") {
    res.redirect("/successLogin?errors=You are not admin");
  } else {
    console.log(req.session.userId);
    next();
  }
});
router.get("/listUsers", Controller.adminPage);
router.get("/deleteUser/:userId", Controller.deleteUser);

module.exports = router;
