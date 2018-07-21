var db = require("../models");

module.exports = function(app) {
  // Get all Tabs
  app.get("/api/tabs", function(req, res) {
    db.Tab.findAll({}).then(function(dbTabs) {
      res.json(dbTabs);
    });
  });

  // Create a new Tab
  app.post("/api/tabs", function(req, res) {
    db.Tab.create(req.body).then(function(dbTab) {
      res.json(dbTab);
    });
  });

  // Delete a tab by id
  app.delete("/api/tabs/:id", function(req, res) {
    db.Tab.destroy({ where: { id: req.params.id } }).then(function(dbTab) {
      res.json(dbTab);
    });
  });

  // Get all expenses for a tab

  // Add a new expense to a tab

  // Modify an expense by id

  // Delete an expense by id

  // Get all expenses added by username
  
  //Get all expenses NOT added by username

  //Total of expenses added by username

  //Total of all expenses in tab

  //Total of all expenses in tab minus all expenses added by username
};
