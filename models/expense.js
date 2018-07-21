module.exports = function(sequelize, DataTypes) {
    var expense = sequelize.define("Expense", {
      name: DataTypes.STRING,
      cost: DataTypes.INT,
      tabid: DataTypes.INT,
      userid: DataTypes.INT,
      paid: DataTypes.BOOLEAN
    });
    return Expense;
  };