const checkRequiredFields = require("../../../shared/helpers/checkRequiredFields")

function mkField(values) {
  const data = { ...values }
  const errors = { _value: values }

  checkRequiredFields(["label", "order", "type", "options"], data, errors)

  return {
    errors,
    data,
  }
}

module.exports = mkField
