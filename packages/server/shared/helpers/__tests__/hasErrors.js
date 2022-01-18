const hasErrors = require("../hasErrors")

describe("[Helpers] - hasErrors", () => {
  it("should return false if only _value is present", () => {
    const result = hasErrors({ _value: {} })

    expect(result).toBe(false)
  })
  it("should return true if any key other than _value is present", () => {
    const result = hasErrors({ _value: {}, label: { type: "required" } })

    expect(result).toBe(true)
  })
  it("should return false if no key is present", () => {
    const result = hasErrors({})

    expect(result).toBe(false)
  })
  it("should return false if errors is nullish", () => {
    const resultUndefined = hasErrors(undefined)
    const resultNull = hasErrors(null)

    expect(resultUndefined).toBe(false)
    expect(resultNull).toBe(false)
  })
  it("should return false if errors is array", () => {
    const result = hasErrors([])

    expect(result).toBe(false)
  })
})
