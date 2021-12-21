const { Model, DataTypes } = require("sequelize")
const { sequelize } = require("../../sequelize")

class User extends Model {}
User.init(
  {
    username: DataTypes.STRING,
    age: DataTypes.INTEGER,
  },
  { sequelize, modelName: "user" }
)

module.exports = User
