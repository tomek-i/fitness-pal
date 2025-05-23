import { slugify } from "./slugify"

describe("slugify", () => {
  it("should convert a string to a slug by replacing non-alphanumeric characters with hyphens", () => {
    const name = "Hello World!"
    const result = slugify(name)
    expect(result).toBe("hello-world")
  })

  it("should remove leading and trailing hyphens from the slug", () => {
    const name = "-hello-world-"
    const result = slugify(name)
    expect(result).toBe("hello-world")
  })

  it("should convert uppercase characters to lowercase in the slug", () => {
    const name = "HelloWorld"
    const result = slugify(name)
    expect(result).toBe("helloworld")
  })

  it("should handle special characters in the slug", () => {
    const name = "This is a test!@#$%^&*()_+"
    const result = slugify(name)
    expect(result).toBe("this-is-a-test")
  })

  it("should handle numbers in the slug", () => {
    const name = "article 12345"
    const result = slugify(name)
    expect(result).toBe("article-12345")
  })
})
