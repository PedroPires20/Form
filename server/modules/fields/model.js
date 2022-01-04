const { Model, DataTypes } = require("sequelize")
const { sequelize, associations } = require("../../sequelize")

class Field extends Model {}
Field.init(
  {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
  },
  { sequelize, modelName: "Field" }
)

associations.assign(({ Form }) => {
  Field.belongsTo(Form)
})


module.exports = Field
