"use client"

import { useState, useEffect } from "react"

interface UseFetchState<T> {
  data: T | null
  loading: boolean
  error: string | null
}

interface UseFetchOptions {
  immediate?: boolean
}

export function useFetch<T>(
  url: string,
  options: UseFetchOptions = { immediate: true },
): UseFetchState<T> & { refetch: () => Promise<void> } {
  const [state, setState] = useState<UseFetchState<T>>({
    data: null,
    loading: false,
    error: null,
  })

  const fetchData = async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }))

    try {
      const response = await fetch(url)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      setState({ data, loading: false, error: null })
    } catch (error) {
      setState({
        data: null,
        loading: false,
        error: error instanceof Error ? error.message : "An error occurred",
      })
    }
  }

  useEffect(() => {
    if (options.immediate) {
      fetchData()
    }
  }, [url, options.immediate])

  return {
    ...state,
    refetch: fetchData,
  }
}
