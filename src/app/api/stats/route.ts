import { NextResponse } from "next/server"

// Mock data for demonstration
const mockStats = [
  {
    title: "Total Users",
    value: "2,847",
    change: "+12%",
    trend: "up",
  },
  {
    title: "Active Posts",
    value: "1,234",
    change: "+8%",
    trend: "up",
  },
  {
    title: "Engagement",
    value: "68.2%",
    change: "+3.1%",
    trend: "up",
  },
  {
    title: "Activity",
    value: "1.2s",
    change: "-0.3s",
    trend: "down",
  },
]

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  if (Math.random() < 0.1) {
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 })
  }

  return NextResponse.json(mockStats)
}
