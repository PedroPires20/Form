const { prop } = require("ramda")
const checkRequiredFields = require("../../../shared/helpers/checkRequiredFields")
const hasErrors = require("../../../shared/helpers/hasErrors")
const mkOption = require("../../options/helpers/mkOption")

function mkField(values) {
  const data = { ...values }
  const errors = { _value: values }

  checkRequiredFields(["label", "description", "type", "options"], data, errors)

  if (data.options) {
    const options = data.options.map(mkOption)
    const optionsErrors = options.map(prop("errors")).filter(hasErrors)
    data.options = options.map(prop("data"))
    if (optionsErrors.length) errors.options = optionsErrors
  }

  return {
    errors,
    data,
  }
}

module.exports = mkField
