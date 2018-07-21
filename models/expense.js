module.exports = function(sequelize, DataTypes) {
    var Expense = sequelize.define("Expense", {
      name: DataTypes.STRING,
      cost: DataTypes.INTEGER,
      tabid: DataTypes.INTEGER,
      username: DataTypes.STRING,
      paid: DataTypes.BOOLEAN
    });
    return Expense;
  };