const { Model, DataTypes } = require("sequelize")
const { sequelize, associations } = require("../../sequelize")

class Field extends Model {}
Field.init(
  {
    label: DataTypes.STRING,
    description: DataTypes.TEXT,
    type: DataTypes.STRING,
  },
  { sequelize, modelName: "field" }
)

associations.assign(({ form, option }) => {
  Field.Form = Field.belongsTo(form)
  Field.Options = Field.hasMany(option)
})

module.exports = Field
