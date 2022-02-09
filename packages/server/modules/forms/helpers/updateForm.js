const { prop } = require("ramda")
const hasErrors = require("../../../shared/helpers/hasErrors")
const updateField = require("../../fields/helpers/updateField")
const mkForm = require("./mkForm")

function updateForm(values) {
  const { data, errors } = mkForm(values)

  if (data.fields) {
    if (data.fields.length) {
      const fields = data.fields.map(updateField)
      const fieldsErrors = fields.map(prop("errors")).filter(hasErrors)
      data.fields = fields.map(prop("data"))
      if (fieldsErrors.length) errors.fields = fieldsErrors
    } else {
      errors.fields = { type: "empty list" }
    }
  }

  return { data, errors }
}

module.exports = updateForm
