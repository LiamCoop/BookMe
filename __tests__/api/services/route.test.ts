import { describe, it, expect, beforeEach } from "vitest"
import { GET, POST } from "@/app/api/services/route"
import { prismaMock } from "../../mocks/prisma"
import { NextRequest } from "next/server"

describe("GET /api/services", () => {
  beforeEach(() => {
    // Reset mocks before each test
  })

  it("should return all services", async () => {
    const now = new Date()
    const mockServices = [
      {
        id: "service-1",
        businessId: "business-1",
        name: "Haircut",
        description: "Basic haircut",
        price: 45,
        duration: 30,
        createdAt: now,
        updatedAt: now,
        business: {
          id: "business-1",
          name: "Hair Salon",
        },
      },
      {
        id: "service-2",
        businessId: "business-1",
        name: "Manicure",
        description: "Basic manicure",
        price: 35,
        duration: 45,
        createdAt: now,
        updatedAt: now,
        business: {
          id: "business-1",
          name: "Hair Salon",
        },
      },
    ]

    prismaMock.service.findMany.mockResolvedValue(mockServices as any)

    const request = new NextRequest("http://localhost:3000/api/services")
    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data).toHaveLength(2)
    expect(data[0]).toMatchObject({
      id: "service-1",
      businessId: "business-1",
      name: "Haircut",
      description: "Basic haircut",
      price: 45,
      duration: 30,
    })
    expect(data[1]).toMatchObject({
      id: "service-2",
      businessId: "business-1",
      name: "Manicure",
      description: "Basic manicure",
      price: 35,
      duration: 45,
    })
    expect(prismaMock.service.findMany).toHaveBeenCalledWith({
      where: undefined,
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
  })

  it("should filter services by businessId", async () => {
    const now = new Date()
    const mockServices = [
      {
        id: "service-1",
        businessId: "business-1",
        name: "Haircut",
        description: "Basic haircut",
        price: 45,
        duration: 30,
        createdAt: now,
        updatedAt: now,
        business: {
          id: "business-1",
          name: "Hair Salon",
        },
      },
    ]

    prismaMock.service.findMany.mockResolvedValue(mockServices as any)

    const request = new NextRequest("http://localhost:3000/api/services?businessId=business-1")
    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data).toHaveLength(1)
    expect(data[0]).toMatchObject({
      id: "service-1",
      businessId: "business-1",
      name: "Haircut",
      description: "Basic haircut",
      price: 45,
      duration: 30,
    })
    expect(prismaMock.service.findMany).toHaveBeenCalledWith({
      where: { businessId: "business-1" },
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
  })

  it("should handle database errors gracefully", async () => {
    prismaMock.service.findMany.mockRejectedValue(new Error("Database error"))

    const request = new NextRequest("http://localhost:3000/api/services")
    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(500)
    expect(data).toEqual({ error: "Failed to fetch services" })
  })
})

describe("POST /api/services", () => {
  it("should create a new service", async () => {
    const now = new Date()
    const mockBusiness = {
      id: "business-1",
      ownerId: "user-1",
      name: "Hair Salon",
      description: null,
      email: null,
      phone: null,
      address: null,
      city: null,
      state: null,
      zipCode: null,
      hoursOfOperation: null,
      createdAt: now,
      updatedAt: now,
    }

    const mockService = {
      id: "service-1",
      businessId: "business-1",
      name: "Haircut",
      description: "Basic haircut",
      price: 45,
      duration: 30,
      createdAt: now,
      updatedAt: now,
      business: {
        id: "business-1",
        name: "Hair Salon",
      },
    }

    prismaMock.business.findUnique.mockResolvedValue(mockBusiness)
    prismaMock.service.create.mockResolvedValue(mockService as any)

    const request = new NextRequest("http://localhost:3000/api/services", {
      method: "POST",
      body: JSON.stringify({
        businessId: "business-1",
        name: "Haircut",
        description: "Basic haircut",
        price: 45,
        duration: 30,
      }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(201)
    expect(data).toMatchObject({
      id: "service-1",
      businessId: "business-1",
      name: "Haircut",
      description: "Basic haircut",
      price: 45,
      duration: 30,
    })
    expect(prismaMock.business.findUnique).toHaveBeenCalledWith({
      where: { id: "business-1" },
    })
    expect(prismaMock.service.create).toHaveBeenCalledWith({
      data: {
        businessId: "business-1",
        name: "Haircut",
        description: "Basic haircut",
        price: 45,
        duration: 30,
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
  })

  it("should return 400 if required fields are missing", async () => {
    const request = new NextRequest("http://localhost:3000/api/services", {
      method: "POST",
      body: JSON.stringify({
        name: "Haircut",
        // Missing other required fields
      }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.error).toContain("Missing required fields")
  })

  it("should return 404 if business does not exist", async () => {
    prismaMock.business.findUnique.mockResolvedValue(null)

    const request = new NextRequest("http://localhost:3000/api/services", {
      method: "POST",
      body: JSON.stringify({
        businessId: "non-existent",
        name: "Haircut",
        description: "Basic haircut",
        price: 45,
        duration: 30,
      }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(404)
    expect(data).toEqual({ error: "Business not found" })
  })

  it("should handle database errors gracefully", async () => {
    prismaMock.business.findUnique.mockResolvedValue({
      id: "business-1",
      ownerId: "user-1",
      name: "Hair Salon",
      description: null,
      email: null,
      phone: null,
      address: null,
      city: null,
      state: null,
      zipCode: null,
      hoursOfOperation: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    prismaMock.service.create.mockRejectedValue(new Error("Database error"))

    const request = new NextRequest("http://localhost:3000/api/services", {
      method: "POST",
      body: JSON.stringify({
        businessId: "business-1",
        name: "Haircut",
        description: "Basic haircut",
        price: 45,
        duration: 30,
      }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(500)
    expect(data).toEqual({ error: "Failed to create service" })
  })
})
