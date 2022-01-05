const { Model, DataTypes } = require("sequelize")
const { sequelize, associations } = require("../../sequelize")

class Option extends Model {}
Option.init(
  {
    text: DataTypes.STRING,
    value: DataTypes.STRING
  },
  { sequelize, modelName: "option" }
)

associations.assign(({ field }) => {
  Option.Field = Option.belongsTo(field)
})


module.exports = Option
