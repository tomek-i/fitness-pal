import { NextRequest } from "next/server"

/**
 * Extracts URL search parameters from a NextRequest object.
 *
 * @param {NextRequest} request - The NextRequest object containing the URL.
 * @return {URLSearchParams} The URL search parameters.
 */
export const getUrlSearchParams = (request: NextRequest) => {
  const url = new URL(request.url)
  return new URLSearchParams(url.search)
}

/**
 * Extracts pagination parameters from URL search parameters.
 *
 * @param {URLSearchParams} searchParams - The URL search parameters to extract pagination parameters from.
 * @return {{ page: number, limit: number | undefined, skip: number, take: number | undefined }} - An object containing the extracted pagination parameters.
 */
export const getPaginationParams = (searchParams: URLSearchParams) => {
  const pageParam = searchParams.get("page")
  const limitParam = searchParams.get("limit")
  const page = pageParam === null ? 1 : Number(pageParam)
  const limit = limitParam === null ? undefined : Number(limitParam)

  return {
    page,
    limit,

    skip: (page - 1) * (limit ?? 0),
    take: limit,
  }
}
