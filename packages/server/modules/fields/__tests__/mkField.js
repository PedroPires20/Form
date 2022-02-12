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
})
