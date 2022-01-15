function checkRequiredFields(fields, obj, errors) {
  fields.forEach(field => {
    if(obj[field] == undefined || obj[field] == null) {
      errors[field] = { type: 'required' }
    }
  })
}

module.exports = checkRequiredFields
