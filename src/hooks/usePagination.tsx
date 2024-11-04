"use client"
import { getPaginationParams } from "@/util"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useMemo } from "react"

export const usePagination = (totalItems: number, defaultLimit: number = 10) => {
  const { replace } = useRouter()
  const params = new URLSearchParams(useSearchParams())
  const pathName = usePathname()

  const { limit, page, skip, take } = getPaginationParams(params)
  const currentPage = page
  const totalPages = useMemo(() => Math.ceil(totalItems / (limit ?? defaultLimit)), [totalItems, limit, defaultLimit])

  const hasNextPage = currentPage < totalPages
  const hasPreviousPage = currentPage > 1

  function setPage(page: number): void {
    if (page === 1) {
      params.delete("page")
    } else {
      params.set("page", page.toString())
    }
    replace(`${pathName}?${params.toString()}`)
  }

  return {
    skip,
    limit,
    take,
    totalPages,
    setPage,
    hasNextPage,
    hasPreviousPage,
    currentPage,
  }
}
