import { NextResponse } from "next/server"

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "OPTIONS" | "HEAD" | "CONNECT" | "TRACE"

type errorResponse<T> = {
  error: T
}

const success = <T>(payload: T) => {
  return payload
}

const error = <T>(payload: T) => {
  const errorResponse: errorResponse<T> = {
    error: {
      ...payload,
    },
  }
  return errorResponse
}

export function OK<T>(payload?: T) {
  if (!payload) return NextResponse.json(null, { status: 200 })
  return NextResponse.json(success(payload), { status: 200 })
}

//TODO: need to add headers for the response to locate the created resourceb y id
export function Created<T>(payload: T, location?: string) {
  const headers = location ? { location: location } : undefined
  return NextResponse.json(success(payload), { status: 201, headers })
}

export function Conflict<T>(payload: T) {
  return NextResponse.json(error(payload), { status: 409 })
}

export function ServerError<T>(payload: T) {
  return NextResponse.json(error(payload), { status: 500 })
}

export function NoContent() {
  return new NextResponse(null, {
    status: 204,
  })
}

export function BadRequest<T>(payload: T) {
  return NextResponse.json(error(payload), { status: 400 })
}

export function Unauthorized<T>(payload?: T) {
  return NextResponse.json(error(payload), { status: 401 })
}

export function NotFound<T>(payload: T) {
  return NextResponse.json(error(payload), { status: 404 })
}
