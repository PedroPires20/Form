const { Model, DataTypes } = require("sequelize")
const { sequelize, associations } = require("../../sequelize")
require("../fields/model")

class Form extends Model {}
Form.init(
  {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
  },
  { sequelize, modelName: "Form" }
)

associations.assign(({ User, Field }) => {
  Form.belongsTo(User)
  Form.hasMany(Field)
})


module.exports = Form
