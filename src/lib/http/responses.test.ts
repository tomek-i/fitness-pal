import { BadRequest, Conflict, Created, NoContent, NotFound, OK, ServerError, Unauthorized } from "./responses"

describe("HTTP Response Functions", () => {
  describe("HTTP - OK", () => {
    it("should return a response with status 200", () => {
      const response = OK()
      expect(response.status).toBe(200)
    })

    it("should return a the property ok set to be true", () => {
      const response = OK()
      expect(response.ok).toBe(true)
    })

    it("should return a response with status 200 and the provided payload", async () => {
      const payload = { foo: "bar" }

      const response = OK(payload)
      const result = await response.json()

      expect(response.status).toBe(200)
      expect(result).toEqual(payload)
    })

    it("should return a response with status 200 and no payload if none is provided", async () => {
      const response = OK()
      const result = await response.json()

      expect(result).toEqual(null)
    })

    it("should return a response with the correct payload type", async () => {
      const payload = { foo: "bar" }
      const response = await OK(payload).json()
      expect(response).toEqual(payload)
    })

    it("should handle an empty object payload correctly", async () => {
      const payload = {}
      const response = await OK(payload).json()
      expect(response).toEqual(payload)
    })

    it("should handle a null payload correctly", async () => {
      const payload = null
      const response = await OK(payload).json()
      expect(response).toBeNull()
    })

    it("should handle an array payload correctly", async () => {
      const payload = [1, 2, 3]
      const response = await OK(payload).json()
      expect(response).toEqual(payload)
    })

    it("should handle a string payload correctly", async () => {
      const payload = "test"
      const response = await OK(payload).json()
      expect(response).toBe(payload)
    })
  })

  // Tests for Created
  describe("HTTP - Created", () => {
    it("should return a response with status 201", async () => {
      const response = Created(null)

      expect(response.status).toBe(201)
    })

    it("should return a the property ok set to be true", () => {
      const response = OK()
      expect(response.ok).toBe(true)
    })

    it("should return a response with status 201 and the given payload", async () => {
      const payload = { id: 1, message: "Resource created" }
      const response = Created(payload)
      const result = await response.json()

      expect(response.status).toBe(201)
      expect(result).toEqual(payload)
    })

    it("should return a the location headers", async () => {
      const payload = { id: 1, message: "Resource created" }
      const response = Created(payload, "example.com/1")

      const locationHeader = response.headers.get("location")

      expect(locationHeader).not.toBeNull()
      expect(locationHeader).toBe("example.com/1")
    })
  })

  // Tests for Conflict
  describe("HTTP - Conflict", () => {
    it("should return a response with status 409 and the given payload", async () => {
      const payload = { error: "Conflict occurred" }
      const response = Conflict(payload)
      const result = await response.json()

      expect(response.status).toBe(409)
      expect(result.error).toEqual(payload)
    })

    it("should return a response with status 409", async () => {
      const payload = { error: "Conflict occurred" }
      const response = Conflict(payload)

      expect(response.status).toBe(409)
    })

    it("should return a ok property with the value false", async () => {
      const payload = { error: "Conflict occurred" }
      const response = Conflict(payload)

      expect(response.ok).toBe(false)
    })
  })

  // Tests for ServerError<T>
  describe("HTTP - ServerError", () => {
    it("should return a response with status 500 and the given payload", async () => {
      const payload = { error: "Internal server error" }
      const response = ServerError(payload)
      const result = await response.json()

      expect(response.status).toBe(500)
      expect(result.error).toEqual(payload)
    })

    it("should return a response with status 500", async () => {
      const payload = { error: "Internal server error" }
      const response = ServerError(payload)

      expect(response.status).toBe(500)
    })

    it("should return a the property ok set to be false", async () => {
      const payload = { error: "Internal server error" }
      const response = ServerError(payload)

      expect(response.ok).toBe(false)
    })
  })

  describe("HTTP - NoContent", () => {
    it("should return a response with status 204", async () => {
      const response = NoContent()
      expect(response.status).toBe(204)
    })

    it("should return a response with no payload", async () => {
      const response = NoContent()
      const result = await response.text()
      expect(result).toBe("")
    })

    it("should not have an ok property", async () => {
      const response = NoContent()
      const result = await response.json().catch(() => null)
      expect(result).toBeNull()
    })
  })

  describe("HTTP - BadRequest", () => {
    it("should return a response with status 400 and the given payload", async () => {
      const payload = { error: "Bad request" }
      const response = BadRequest(payload)
      const result = await response.json()

      expect(response.status).toBe(400)
      expect(result.error).toEqual(payload)
    })

    it("should return a response with status 400", async () => {
      const payload = { error: "Bad request" }
      const response = BadRequest(payload)

      expect(response.status).toBe(400)
    })

    it("should return a the property ok set to be false", async () => {
      const payload = { error: "Bad request" }
      const response = BadRequest(payload)

      expect(response.ok).toBe(false)
    })
  })

  describe("HTTP - Unauthorized", () => {
    it("should return a response with status 401 and the given payload", async () => {
      const payload = { error: "Unauthorized" }
      const response = Unauthorized(payload)
      const result = await response.json()

      expect(response.status).toBe(401)
      expect(result.error).toEqual(payload)
    })

    it("should return a response with status 401", async () => {
      const payload = { error: "Unauthorized" }
      const response = Unauthorized(payload)

      expect(response.status).toBe(401)
    })

    it("should return a the property ok set to be false", async () => {
      const payload = { error: "Unauthorized" }
      const response = Unauthorized(payload)

      expect(response.ok).toBe(false)
    })
  })

  describe("HTTP - NotFound", () => {
    it("should return a response with status 404 and the given payload", async () => {
      const payload = { error: "Not found" }
      const response = NotFound(payload)
      const result = await response.json()

      expect(response.status).toBe(404)
      expect(result.error).toEqual(payload)
    })

    it("should return a response with status 404", async () => {
      const payload = { error: "Not found" }
      const response = NotFound(payload)

      expect(response.status).toBe(404)
    })

    it("should return a the property ok set to be false", async () => {
      const payload = { error: "Not found" }
      const response = NotFound(payload)

      expect(response.ok).toBe(false)
    })
  })
})
