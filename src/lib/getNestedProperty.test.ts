import { getNestedProperty } from "./getNestedProperty"

describe("getNestedProperty", () => {
  it("should return the value of a nested property", () => {
    const obj = {
      foo: {
        bar: {
          baz: "value",
        },
      },
    }
    const path = "foo.bar.baz"
    const result = getNestedProperty(obj, path)
    expect(result).toBe("value")
  })

  it("should return undefined if the nested property is not found", () => {
    const obj = {
      foo: {
        bar: {
          baz: "value",
        },
      },
    }
    const path = "foo.bar.qux"
    const result = getNestedProperty(obj, path)
    expect(result).toBeUndefined()
  })

  it("should return null if the object is null", () => {
    const obj = null
    const path = "foo.bar.baz"
    const result = getNestedProperty(obj, path)
    expect(result).toBeNull()
  })

  it("should return null if the object is undefined", () => {
    const obj = undefined
    const path = "foo.bar.baz"
    const result = getNestedProperty(obj, path)
    expect(result).toBeNull()
  })

  it("should return undefined if the path is empty", () => {
    const obj = {
      foo: {
        bar: {
          baz: "value",
        },
      },
    }
    const path = ""
    const result = getNestedProperty(obj, path)
    expect(result).toBeUndefined()
  })
})
