const mkOption = require("./mkOption")

function createOption(values) {
  const { data, errors } = mkOption(values)
  delete data.id

  return { data, errors }
}

module.exports = createOption
