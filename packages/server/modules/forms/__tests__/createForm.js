const createForm = require("../helpers/createForm")

const validForm = {
  title: "Form title",
  description: "Form description",
  fields: [
    {
      description: "Test description",
      label: "Test label",
      options: [{ value: "option value", name: "option name" }],
      type: "checkbox",
    },
  ],
}

describe("[Forms] - createForm", () => {
  it("Should check for emtpy fields", () => {
    const { errors } = createForm({ ...validForm, fields: [] })

    expect(errors).toMatchObject({
      fields: { type: "empty list" },
    })
  })
  it("Should check for invalid fields", () => {
    const { errors } = createForm({
      ...validForm,
      fields: [
        { type: "text", lacklabel: "anything", options: [] },
        { type: "checkbox", label: "anything", options: [{ name: "option1" }] },
      ],
    })

    expect(errors).toMatchObject({
      fields: [
        { label: { type: "required" } },
        { options: [{ value: { type: "required" } }] },
      ],
    })
  })
})
