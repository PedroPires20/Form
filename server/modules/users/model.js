const { Model, DataTypes } = require("sequelize")
const { sequelize, associations } = require("../../sequelize")
const Form = require("../forms/model")

class User extends Model {}
User.init(
  {
    username: DataTypes.STRING,
    age: DataTypes.INTEGER,
  },
  { sequelize, modelName: "User" }
)

associations.assign(({ Form }) => {
  User.hasMany(Form)
})

module.exports = User
