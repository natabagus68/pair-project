"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Profile.belongsTo(models.User);
    }
    greeting() {
      if (this.gender === 'Male') {
        return `Mr. ${this.name}`
      }
      else {
        return `Mrs. ${this.name}`
      }
    }
  }
  Profile.init(
    {
      name: DataTypes.STRING,
      age: DataTypes.INTEGER,
      UserId: DataTypes.INTEGER,
      bio: DataTypes.TEXT,
      profile_picture: DataTypes.TEXT,
      gender:DataTypes.STRING
    },
    {
      sequelize,
      modelName: "Profile",
    }
  );
  return Profile;
};
