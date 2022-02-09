const { Model, Sequelize } = require("sequelize")
const { sequelize, associations } = require("../../../sequelize")

class ResultItem extends Model {}
ResultItem.init(
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
  },
  { sequelize, modelName: "resultItem" }
)

associations.assign(({ result, fieldValue, optionValue }) => {
  ResultItem.Result = ResultItem.belongsTo(result)
  ResultItem.FieldValue = ResultItem.hasOne(fieldValue)
  ResultItem.OptionValues = ResultItem.hasMany(optionValue)
})

module.exports = ResultItem
