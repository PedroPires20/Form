const { keysIn, pipe, without } = require("ramda")

function hasErrors(errors) {
  if (!errors) return false

  const keys = pipe(keysIn, without(["_value"]))(errors)

  return Boolean(keys.length)
}

module.exports = hasErrors
