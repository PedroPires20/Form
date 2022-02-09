const { prop } = require("ramda")
const hasErrors = require("../../../shared/helpers/hasErrors")
const updateOption = require("../../options/helpers/updateOption")
const mkField = require("./mkField")

function updateField(values) {
  const { data, errors } = mkField(values)

  if (data.options) {
    if (data.options.length) {
      const options = data.options.map(updateOption)
      const optionsErrors = options.map(prop("errors")).filter(hasErrors)
      data.options = options.map(prop("data"))
      if (optionsErrors.length) errors.options = optionsErrors
    } else if (["checkbox", "radio", "select"].includes(data.type)) {
      errors.options = { type: "empty list" }
    }
  }

  return { data, errors }
}

module.exports = updateField
