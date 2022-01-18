const mkForm = require("../helpers/mkForm")

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

describe("[Forms] - mkForm", () => {
  it("Should return form data for a valid form", () => {
    const { data } = mkForm(validForm)
    expect(data).toEqual(validForm)
  })
  it("Should check for required form entity fields", () => {
    const { errors } = mkForm({})

    expect(errors).toMatchObject({
      description: { type: "required" },
      title: { type: "required" },
      fields: { type: "required" },
    })
  })
  it("Should check for emtpy fields", () => {
    const { errors } = mkForm({ ...validForm, fields: [] })

    expect(errors).toMatchObject({
      fields: { type: "empty list" },
    })
  })
  it("Should check for invalid fields", () => {
    const { errors } = mkForm({
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
