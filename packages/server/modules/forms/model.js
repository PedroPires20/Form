const { Model, DataTypes } = require("sequelize")
const { sequelize, associations } = require("../../sequelize")
require("../fields/model")

class Form extends Model {}
Form.init(
  {
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
