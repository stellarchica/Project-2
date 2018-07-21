module.exports = function(sequelize, DataTypes) {
  var Tab = sequelize.define("Tab", {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    members: DataTypes.STRING
  });
  return Tab;
};
