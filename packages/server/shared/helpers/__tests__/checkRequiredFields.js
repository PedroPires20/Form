const checkRequiredFields = require("../checkRequiredFields")

describe("[Helpers] - checkRequiredFields", () => {
  it("should return whithout error for empty inputs", () => {
    expect(() => {
      checkRequiredFields(null, null, null)
      checkRequiredFields()
    }).not.toThrow()
  })
  it("should return whithout error for lists instead of objects for errors and obj args", () => {
    expect(() => {
      checkRequiredFields([], [], {})
      checkRequiredFields([], {}, [])
      checkRequiredFields({}, {}, {})
    }).not.toThrow()
  })
  it("should add type required to errors for not fields not present in obj", () => {
    const errors = {}
    const obj = {}

    checkRequiredFields(["label", "title"], obj, errors)

    expect(errors).toMatchObject({
      label: { type: "required" },
      title: { type: "required" },
    })
  })
  it("should add type required to errors for not fields are null in obj", () => {
    const errors = {}
    const obj = { label: null, title: null }

    checkRequiredFields(["label", "title"], obj, errors)

    expect(errors).toMatchObject({
      label: { type: "required" },
      title: { type: "required" },
    })
  })
  it("should not change errors if field is present in obj", () => {
    const errors = {}
    const obj = {
      label: true,
      title: false,
      placeholder: "placeholder",
      test: { value: 412 },
    }

    checkRequiredFields(["label", "title", "placeholder", "test"], obj, errors)

    expect(errors).toMatchObject({})
  })
})
