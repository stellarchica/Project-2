var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Tab.findAll({}).then(function(dbTabs) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbTabs
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/tab/:id", function(req, res) {
    db.Tab.findOne({ where: { id: req.params.id } }).then(function(dbTab) {
      res.render("tab", {
        name: dbTab
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
