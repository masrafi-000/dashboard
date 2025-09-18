
import {  NextResponse } from "next/server"



const mockActivity = [
    {day: "Monday", value: 50},
    {day: "Tuesday", value: 75},
    {day: "Wednesday", value: 30},
    {day: "Thursday", value: 90},
    {day: "Friday", value: 60},
    {day: "Saturday", value: 20},
    {day: "Sunday", value: 80},
]


export async function GET() {
    await new Promise((resolve) => setTimeout(resolve, 800))

    if (Math.random() < 0.05) {
        return NextResponse.json({error: "Failed to fetch activity data"}, {status: 500})
    }

    return NextResponse.json(mockActivity)
}