const { Model, DataTypes, Sequelize } = require("sequelize")
const { sequelize, associations } = require("../../sequelize")

class User extends Model {}
User.init(
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    username: DataTypes.STRING,
    age: DataTypes.INTEGER,
  },
  { sequelize, modelName: "user" }
)

associations.assign(({ form }) => {
  User.Forms = User.hasMany(form)
})

module.exports = User
