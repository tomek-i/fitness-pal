import { getUrlSearchParams, getPaginationParams } from "./url-params"
import { NextRequest } from "next/server"

describe("getUrlSearchParams", () => {
  it("should extract search parameters from a URL", () => {
    const request = { url: "https://example.com?param1=value1&param2=value2" } as NextRequest
    const searchParams = getUrlSearchParams(request)
    expect(searchParams.get("param1")).toBe("value1")
    expect(searchParams.get("param2")).toBe("value2")
  })

  it("should return empty search parameters for a URL without search parameters", () => {
    const request = { url: "https://example.com" } as NextRequest
    const searchParams = getUrlSearchParams(request)
    expect(searchParams.toString()).toBe("")
  })
})

describe("getPaginationParams", () => {
  it("should extract pagination parameters from search parameters", () => {
    const searchParams = new URLSearchParams("page=2&limit=10")
    const paginationParams = getPaginationParams(searchParams)
    expect(paginationParams).toEqual({
      page: 2,
      limit: 10,
      skip: 10,
      take: 10,
    })
  })

  it("should handle missing limit parameter", () => {
    const searchParams = new URLSearchParams("page=2")
    const paginationParams = getPaginationParams(searchParams)
    expect(paginationParams).toEqual({
      page: 2,
      limit: undefined,
      skip: 0,
      take: undefined,
    })
  })

  it("should handle missing page parameter", () => {
    const searchParams = new URLSearchParams("limit=10")
    const paginationParams = getPaginationParams(searchParams)
    expect(paginationParams).toEqual({
      page: 1,
      limit: 10,
      skip: 0,
      take: 10,
    })
  })

  it("should handle missing page and limit parameters", () => {
    const searchParams = new URLSearchParams("")
    const paginationParams = getPaginationParams(searchParams)
    expect(paginationParams).toEqual({
      page: 1,
      limit: undefined,
      skip: 0,
      take: undefined,
    })
  })
})
