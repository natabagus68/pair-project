const { User, Profile, Post, Commentar } = require("../../models");

class Controller {
  static login(req, res) {
    let dataEmail;
    const { email, password } = req.body;
    User.findOne({
      where: {
        email,
      },
    })
      .then((data) => {
        if (data) {
          dataEmail = data;
          return User.findOne({
            where: { password },
          });
        } else res.redirect("/?email=email tidak ada");
      })
      .then((pw) => {
        if (pw) {
          return User.findOne({
            where: {
              email,
              password,
            },
            include: [Profile, Post, Commentar],
          });
        } else {
          res.redirect("/?password=password anda salah");
        }
      })
      .then((data) => {
        console.log(data);
        res.render("beranda", { data });
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

module.exports = Controller;
