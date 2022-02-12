const createField = require("../helpers/createField")

const validField = {
  description: "Test description",
  label: "Test label",
  options: [{ value: "option value", name: "option name" }],
  type: "checkbox",
}

describe("[Fields] - createField", () => {
  it("Should check for emtpy options if type is checkbox, radio or select only", () => {
    const checkboxField = createField({ ...validField, options: [] })
    const radioField = createField({
      ...validField,
      type: "radio",
      options: [],
    })
    const selectField = createField({
      ...validField,
      type: "select",
      options: [],
    })
    const textField = createField({ ...validField, type: "text", options: [] })

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
    const { errors } = createField({
      ...validField,
      options: [
        { name: "option1 name", lackvalue: "anything" },
        { name: "option2 name", value: "anything2" },
      ],
    })

    expect(errors).toMatchObject({
      options: [
        { value: { type: "required" }, order: { type: "required" } },
        { order: { type: "required" } },
      ],
    })
  })
})
