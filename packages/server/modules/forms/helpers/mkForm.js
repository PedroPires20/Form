const { prop } = require("ramda")
const checkRequiredFields = require("../../../shared/helpers/checkRequiredFields")
const hasErrors = require("../../../shared/helpers/hasErrors")
const mkField = require("../../fields/helpers/mkField")

function mkForm(values) {
  const data = { ...values }
  const errors = { _value: values }

  checkRequiredFields(["title", "description", "fields"], data, errors)

  if (data.fields) {
    const fields = data.fields.map(mkField)
    const fieldsErrors = fields.map(prop("errors")).filter(hasErrors)
    data.fields = fields.map(prop("data"))
    if (fieldsErrors.length) errors.fields = fieldsErrors
  }

  return {
    errors,
    data,
  }
}

module.exports = mkForm
