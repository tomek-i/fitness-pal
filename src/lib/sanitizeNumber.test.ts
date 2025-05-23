import { sanitizeNumber } from "./sanitizeNumber"

describe("sanitizeNumber", () => {
  it("should convert a valid number string to a number", () => {
    const value = "42"
    const result = sanitizeNumber(value)
    expect(result).toBe(42)
  })

  it("should convert a valid number to a number", () => {
    const value = 42
    const result = sanitizeNumber(value)
    expect(result).toBe(42)
  })

  it("should return 0 if the value is null", () => {
    const value = null
    const result = sanitizeNumber(value)
    expect(result).toBe(0)
  })

  it("should return 0 if the value is not a number", () => {
    const value = "not a number"
    const result = sanitizeNumber(value)
    expect(result).toBe(0)
  })
  it("should return a floating point into a valid number", () => {
    const value = 3.14
    const result = sanitizeNumber(value)
    expect(result).toBe(3.14)
  })
  it("should return a string of a floating point into a valid number", () => {
    const value = "3.14"
    const result = sanitizeNumber(value)
    expect(result).toBe(3.14)
  })
})
