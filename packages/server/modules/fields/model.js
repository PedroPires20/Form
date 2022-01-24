const { Model, DataTypes, Sequelize } = require("sequelize")
const { sequelize, associations } = require("../../sequelize")

class Field extends Model {}
Field.init(
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    order: DataTypes.NUMBER,
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
