const { Model, Sequelize, DataTypes } = require("sequelize")
const { sequelize, associations } = require("../../sequelize")

class OptionValue extends Model {}
OptionValue.init(
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    fieldId: DataTypes.STRING,
    optionId: DataTypes.STRING,
    value: DataTypes.STRING,
  },
  { sequelize, modelName: "optionValue" }
)

associations.assign(({ resultItem }) => {
  OptionValue.ResultItem = OptionValue.belongsTo(resultItem)
})

module.exports = OptionValue
