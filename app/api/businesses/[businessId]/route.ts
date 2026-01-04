import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

type RouteContext = {
  params: Promise<{ businessId: string }>
}

// GET /api/businesses/[id] - Get a single business by ID
export async function GET(_: NextRequest, context: RouteContext) {
  try {
    const { businessId: id } = await context.params

    const business = await prisma.business.findUnique({
      where: { id },
      include: {
        services: {
          orderBy: {
            name: "asc",
          },
        },
        _count: {
          select: {
            services: true,
          },
        },
      },
    })

    if (!business) {
      return NextResponse.json({ error: "Business not found" }, { status: 404 })
    }

    return NextResponse.json(business)
  } catch (error) {
    console.error("Error fetching business:", error)
    return NextResponse.json({ error: "Failed to fetch business" }, { status: 500 })
  }
}
