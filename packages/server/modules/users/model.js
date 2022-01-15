const { Model, DataTypes } = require("sequelize")
const { sequelize, associations } = require("../../sequelize")

class User extends Model {}
User.init(
  {
    username: DataTypes.STRING,
    age: DataTypes.INTEGER,
  },
  { sequelize, modelName: "user" }
)

associations.assign(({ form }) => {
  User.Forms = User.hasMany(form)
})

module.exports = User
