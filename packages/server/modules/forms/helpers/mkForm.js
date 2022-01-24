const checkRequiredFields = require("../../../shared/helpers/checkRequiredFields")

function mkForm(values) {
  const data = { ...values }
  const errors = { _value: values }

  checkRequiredFields(
    ["title", "description", "fields", "userId"],
    data,
    errors
  )

  return {
    errors,
    data,
  }
}

module.exports = mkForm
