"use client"
import { Button } from "@/components/ui/Button"
import axios, { AxiosError } from "axios"

const handleGet = async () => {
  try {
    const response = await axios.get<[{ id: number; name: string }]>("/api/example")
    console.log("GET response data:", response.data)
  } catch (error) {
    console.error("GET error:", error)
  }
}

const handlePost = async () => {
  try {
    const response = await axios.post<{ id: number; message: string }>("/api/example", {
      data: "example data",
    })
    console.log("POST response:", response.data.message)
  } catch (error) {
    console.error("POST error:", error)
  }
}

const handlePut = async () => {
  try {
    await axios.put("/api/example", { data: "updated data" })
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log("PUT error.response.data.error:", error.response?.data?.error)
      console.log("PUT error.message:", error.message)
    } else {
      console.error("PUT error:", error)
    }
  }
}

const handleDelete = async () => {
  try {
    const response = await axios.delete("/api/example")
    console.log("DELETE response:", response.data)
  } catch (error) {
    console.error("DELETE error:", error)
  }
}

export default function ExampleRequests() {
  return (
    <div className="flex gap-2">
      <Button onClick={handleGet}>GET</Button>
      <button className="bg-sky-400 px-4 py-2" onClick={handlePost}>
        POST
      </button>
      <button className="bg-sky-400 px-4 py-2" onClick={handlePut}>
        PUT
      </button>
      <button className="bg-sky-400 px-4 py-2" onClick={handleDelete}>
        DELETE
      </button>
    </div>
  )
}
