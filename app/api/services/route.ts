import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// GET /api/services - List all services (optionally filtered by businessId)
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const businessId = searchParams.get("businessId")

    const services = await prisma.service.findMany({
      where: businessId ? { businessId } : undefined,
      include: {
        business: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(services)
  } catch (error) {
    console.error("Error fetching services:", error)
    return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 })
  }
}

// POST /api/services - Create a new service
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { businessId, name, description, price, duration } = body

    // Validate required fields
    if (!businessId || !name || !description || price === undefined || !duration) {
      return NextResponse.json(
        { error: "Missing required fields: businessId, name, description, price, duration" },
        { status: 400 }
      )
    }

    // Validate business exists
    const business = await prisma.business.findUnique({
      where: { id: businessId },
    })

    if (!business) {
      return NextResponse.json({ error: "Business not found" }, { status: 404 })
    }

    // Create the service
    const service = await prisma.service.create({
      data: {
        businessId,
        name,
        description,
        price: Number(price),
        duration: Number(duration),
      },
      include: {
        business: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })

    return NextResponse.json(service, { status: 201 })
  } catch (error) {
    console.error("Error creating service:", error)
    return NextResponse.json({ error: "Failed to create service" }, { status: 500 })
  }
}
