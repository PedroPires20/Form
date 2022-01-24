const { Model, DataTypes, Sequelize } = require("sequelize")
const { sequelize, associations } = require("../../sequelize")

class Option extends Model {}
Option.init(
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    value: DataTypes.STRING,
    order: DataTypes.NUMBER,
  },
  { sequelize, modelName: "option" }
)

associations.assign(({ field }) => {
  Option.Field = Option.belongsTo(field)
})

module.exports = Option
