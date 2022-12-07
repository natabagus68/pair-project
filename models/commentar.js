"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Commentar extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Commentar.belongsToMany(models.User);
      Commentar.belongsToMany(models.Post);
    }
  }
  Commentar.init(
    {
      UserId: DataTypes.INTEGER,
      PostId: DataTypes.INTEGER,
      comment: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Commentar",
    }
  );
  return Commentar;
};
