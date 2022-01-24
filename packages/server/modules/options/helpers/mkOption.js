const checkRequiredFields = require("../../../shared/helpers/checkRequiredFields")

function mkOption(values) {
  const data = { ...values }
  const errors = { _value: values }

  checkRequiredFields(["name", "order", "value"], data, errors)

  return {
    errors,
    data,
  }
}

module.exports = mkOption
