const mkField = require("../helpers/mkField")

const validField = {
  description: "Test description",
  label: "Test label",
  options: [{ value: "option value", name: "option name" }],
  type: "checkbox",
}

describe("[Fields] - mkField", () => {
  it("Should return field data for a valid field", () => {
    const { data } = mkField(validField)
    expect(data).toEqual(validField)
  })
  it("Should check for required field entity fields", () => {
    const { errors } = mkField({})

    expect(errors).toMatchObject({
      order: { type: "required" },
      label: { type: "required" },
      options: { type: "required" },
      type: { type: "required" },
    })
  })
  it("Should check for emtpy options if type is checkbox, radio or select only", () => {
    const checkboxField = mkField({ ...validField, options: [] })
    const radioField = mkField({ ...validField, type: "radio", options: [] })
    const selectField = mkField({ ...validField, type: "select", options: [] })
    const textField = mkField({ ...validField, type: "text", options: [] })

    expect(checkboxField.errors).toMatchObject({
      options: { type: "empty list" },
    })
    expect(radioField.errors).toMatchObject({
      options: { type: "empty list" },
    })
    expect(selectField.errors).toMatchObject({
      options: { type: "empty list" },
    })
    expect(textField.errors).not.toMatchObject({
      options: { type: "empty list" },
    })
  })
  it("Should check for invalid options", () => {
    const { errors } = mkField({
      ...validField,
      options: [
        { name: "option1 name", lackvalue: "anything" },
        { name: "option2 name", value: "anything2" },
      ],
    })

    expect(errors).toMatchObject({
      options: [{ value: { type: "required" } }],
    })
  })
})
