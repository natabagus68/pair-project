const express = require("express");
const app = express();
const routers = require("./routers");
const PORT = 8989;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.use("/", routers);

app.listen(PORT, () => {
  console.log(`Server ${PORT} is running...`);
});
