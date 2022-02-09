const mkOption = require("./mkOption")

function createOption(values) {
  const { data, errors } = mkOption(values)
  delete data.id
  delete data.fieldId

  return { data, errors }
}

module.exports = createOption
