const { Model, Sequelize, DataTypes } = require("sequelize")
const { sequelize, associations } = require("../../sequelize")

class FieldValue extends Model {}
FieldValue.init(
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    fieldId: DataTypes.STRING,
    value: DataTypes.STRING,
  },
  { sequelize, modelName: "fieldValue" }
)

associations.assign(({ resultItem }) => {
  FieldValue.ResultItem = FieldValue.belongsTo(resultItem)
})

module.exports = FieldValue
