const { prop } = require("ramda")
const hasErrors = require("../../../shared/helpers/hasErrors")
const createOption = require("../../options/helpers/createOption")
const mkField = require("./mkField")

function createField(values) {
  const { data, errors } = mkField(values)
  delete data.id
  delete data.formId

  if (data.options) {
    if (data.options.length) {
      const options = data.options.map(createOption)
      const optionsErrors = options.map(prop("errors")).filter(hasErrors)
      data.options = options.map(prop("data"))
      if (optionsErrors.length) errors.options = optionsErrors
    } else if (["checkbox", "radio", "select"].includes(data.type)) {
      errors.options = { type: "empty list" }
    }
  }

  return { data, errors }
}

module.exports = createField
