const express = require("express");
const router = require("./routes/index");
const session = require("express-session");
// const path = require("path");
const port = 3000;
const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      sameSite: true,
    },
  })
);
app.use("/", router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
