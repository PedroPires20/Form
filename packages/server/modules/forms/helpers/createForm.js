const { prop } = require("ramda")
const hasErrors = require("../../../shared/helpers/hasErrors")
const createField = require("../../fields/helpers/createField")
const mkForm = require("./mkForm")

function createForm(values) {
  const { data, errors } = mkForm(values)
  delete data.id

  if (data.fields) {
    if (data.fields.length) {
      const fields = data.fields.map(createField)
      const fieldsErrors = fields.map(prop("errors")).filter(hasErrors)
      data.fields = fields.map(prop("data"))
      if (fieldsErrors.length) errors.fields = fieldsErrors
    } else {
      errors.fields = { type: "empty list" }
    }
  }

  return { data, errors }
}

module.exports = createForm
