var db = require("../models");

module.exports = function(app) {
  // Get all Tabs
  app.get("/api/tabs", function(req, res) {
    db.Tab.findAll({}).then(function(dbTab) {
      res.json(dbTab);
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
  app.get("api/expenses/:tabid", function(req,res) {
    db.Expense.findAll({
      where: { tabid: req.params.tabid} }).then(function(dbExpense) {
        res.json(dbExpense);
      });
    });

  // Add a new expense to a tab
  app.post("/api/expenses", function(req, res) {
    db.Expense.create(req.body).then(function(dbExpense) {
      res.json(dbExpense);
    });
  });

  // Modify an expense by id

  // Delete an expense by id
  app.delete("/api/expenses/:id", function(req, res) {
    db.Expense.destroy({ where: { id: req.params.id } }).then(function(dbExpense) {
      res.json(dbExpense);
    });
  });

  // Get all expenses added by username
  app.get("/api/expenses/:username", function(req, res) {
    db.Expense.findAll({
      where: { username: req.params.username} }).then(function(dbExpense) {
        res.json(dbExpense);
      });
    });

  //Get all expenses NOT added by username

  //Total of expenses added by username

  //Total of all expenses in tab

  //Total of all expenses in tab minus all expenses added by username
};
