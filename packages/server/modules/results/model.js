const { Model, Sequelize } = require("sequelize")
const { sequelize, associations } = require("../../sequelize")

class Result extends Model {}
Result.init(
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
  },
  { sequelize, modelName: "result" }
)

associations.assign(({ form, resultItem }) => {
  Result.Form = Result.belongsTo(form)
  Result.ResultItems = Result.hasMany(resultItem)
})

module.exports = Result
