function checkRequiredFields(fields, obj, errors) {
  if(!fields || !obj || !errors) return
  if(!Array.isArray(fields)) return
  if(Array.isArray(obj) || Array.isArray(errors)) return

  fields.forEach(field => {
    if(obj[field] == undefined || obj[field] == null) {
      errors[field] = { type: 'required' }
    }
  })
}

module.exports = checkRequiredFields
