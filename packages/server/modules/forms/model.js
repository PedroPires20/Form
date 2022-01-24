const { Model, DataTypes, Sequelize } = require("sequelize")
const { sequelize, associations } = require("../../sequelize")
require("../fields/model")

class Form extends Model {}
Form.init(
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
  },
  { sequelize, modelName: "form" }
)

associations.assign(({ user, field }) => {
  Form.User = Form.belongsTo(user)
  Form.Fields = Form.hasMany(field)
})

module.exports = Form
