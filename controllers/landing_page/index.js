class Controller {
  static showlandingPage(req, res) {
    let vld = req.query;
    // console.log(vld);
    res.render("landingPage", { vld });
  }
}

module.exports = Controller;
