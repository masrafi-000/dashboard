"use client"

import { useQuery } from "@tanstack/react-query"

interface Stat {
  title: string
  value: string
  change: string
  trend: "up" | "down"
}

interface ActivityData {
  day: string
  value: number
}

async function fetchStats(): Promise<Stat[]> {
  const response = await fetch("/api/stats")
  if (!response.ok) {
    throw new Error("Failed to fetch stats")
  }
  return response.json()
}

async function fetchActivity(): Promise<ActivityData[]> {
  const response = await fetch("/api/activity")
  if (!response.ok) {
    throw new Error("Failed to fetch activity data")
  }
  return response.json()
}

export function useStats() {
  return useQuery({
    queryKey: ["stats"],
    queryFn: fetchStats,
    staleTime: 1000 * 60 * 5, 
  })
}

export function useActivity() {
  return useQuery({
    queryKey: ["activity"],
    queryFn: fetchActivity,
    staleTime: 1000 * 60 * 5, 
  })
}
