import { describe, it, expect, beforeEach } from "vitest"
import { GET, PUT, DELETE } from "@/app/api/services/[id]/route"
import { prismaMock } from "../../../mocks/prisma"
import { NextRequest } from "next/server"

describe("GET /api/services/[id]", () => {
  it("should return a service by ID", async () => {
    const now = new Date()
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
        email: "salon@example.com",
        phone: "555-1234",
      },
    }

    prismaMock.service.findUnique.mockResolvedValue(mockService as any)

    const request = new NextRequest("http://localhost:3000/api/services/service-1")
    const context = { params: Promise.resolve({ id: "service-1" }) }
    const response = await GET(request, context)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data).toMatchObject({
      id: "service-1",
      businessId: "business-1",
      name: "Haircut",
      description: "Basic haircut",
      price: 45,
      duration: 30,
    })
    expect(prismaMock.service.findUnique).toHaveBeenCalledWith({
      where: { id: "service-1" },
      include: {
        business: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
      },
    })
  })

  it("should return 404 if service is not found", async () => {
    prismaMock.service.findUnique.mockResolvedValue(null)

    const request = new NextRequest("http://localhost:3000/api/services/non-existent")
    const context = { params: Promise.resolve({ id: "non-existent" }) }
    const response = await GET(request, context)
    const data = await response.json()

    expect(response.status).toBe(404)
    expect(data).toEqual({ error: "Service not found" })
  })

  it("should handle database errors gracefully", async () => {
    prismaMock.service.findUnique.mockRejectedValue(new Error("Database error"))

    const request = new NextRequest("http://localhost:3000/api/services/service-1")
    const context = { params: Promise.resolve({ id: "service-1" }) }
    const response = await GET(request, context)
    const data = await response.json()

    expect(response.status).toBe(500)
    expect(data).toEqual({ error: "Failed to fetch service" })
  })
})

describe("PUT /api/services/[id]", () => {
  it("should update a service", async () => {
    const now = new Date()
    const existingService = {
      id: "service-1",
      businessId: "business-1",
      name: "Haircut",
      description: "Basic haircut",
      price: 45,
      duration: 30,
      createdAt: now,
      updatedAt: now,
    }

    const updatedService = {
      ...existingService,
      price: 50,
      duration: 45,
      business: {
        id: "business-1",
        name: "Hair Salon",
      },
    }

    prismaMock.service.findUnique.mockResolvedValue(existingService)
    prismaMock.service.update.mockResolvedValue(updatedService as any)

    const request = new NextRequest("http://localhost:3000/api/services/service-1", {
      method: "PUT",
      body: JSON.stringify({
        price: 50,
        duration: 45,
      }),
    })
    const context = { params: Promise.resolve({ id: "service-1" }) }
    const response = await PUT(request, context)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data).toMatchObject({
      id: "service-1",
      businessId: "business-1",
      name: "Haircut",
      description: "Basic haircut",
      price: 50,
      duration: 45,
    })
    expect(prismaMock.service.update).toHaveBeenCalledWith({
      where: { id: "service-1" },
      data: {
        price: 50,
        duration: 45,
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

  it("should update only provided fields", async () => {
    const existingService = {
      id: "service-1",
      businessId: "business-1",
      name: "Haircut",
      description: "Basic haircut",
      price: 45,
      duration: 30,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const updatedService = {
      ...existingService,
      name: "Premium Haircut",
      business: {
        id: "business-1",
        name: "Hair Salon",
      },
    }

    prismaMock.service.findUnique.mockResolvedValue(existingService)
    prismaMock.service.update.mockResolvedValue(updatedService as any)

    const request = new NextRequest("http://localhost:3000/api/services/service-1", {
      method: "PUT",
      body: JSON.stringify({
        name: "Premium Haircut",
      }),
    })
    const context = { params: Promise.resolve({ id: "service-1" }) }
    const response = await PUT(request, context)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.name).toBe("Premium Haircut")
    expect(prismaMock.service.update).toHaveBeenCalledWith({
      where: { id: "service-1" },
      data: {
        name: "Premium Haircut",
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

  it("should return 404 if service does not exist", async () => {
    prismaMock.service.findUnique.mockResolvedValue(null)

    const request = new NextRequest("http://localhost:3000/api/services/non-existent", {
      method: "PUT",
      body: JSON.stringify({
        price: 50,
      }),
    })
    const context = { params: Promise.resolve({ id: "non-existent" }) }
    const response = await PUT(request, context)
    const data = await response.json()

    expect(response.status).toBe(404)
    expect(data).toEqual({ error: "Service not found" })
  })

  it("should handle database errors gracefully", async () => {
    prismaMock.service.findUnique.mockResolvedValue({
      id: "service-1",
      businessId: "business-1",
      name: "Haircut",
      description: "Basic haircut",
      price: 45,
      duration: 30,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    prismaMock.service.update.mockRejectedValue(new Error("Database error"))

    const request = new NextRequest("http://localhost:3000/api/services/service-1", {
      method: "PUT",
      body: JSON.stringify({
        price: 50,
      }),
    })
    const context = { params: Promise.resolve({ id: "service-1" }) }
    const response = await PUT(request, context)
    const data = await response.json()

    expect(response.status).toBe(500)
    expect(data).toEqual({ error: "Failed to update service" })
  })
})

describe("DELETE /api/services/[id]", () => {
  it("should delete a service", async () => {
    const existingService = {
      id: "service-1",
      businessId: "business-1",
      name: "Haircut",
      description: "Basic haircut",
      price: 45,
      duration: 30,
      createdAt: new Date(),
      updatedAt: new Date(),
      bookings: [],
    }

    prismaMock.service.findUnique.mockResolvedValue(existingService as any)
    prismaMock.service.delete.mockResolvedValue(existingService)

    const request = new NextRequest("http://localhost:3000/api/services/service-1", {
      method: "DELETE",
    })
    const context = { params: Promise.resolve({ id: "service-1" }) }
    const response = await DELETE(request, context)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data).toEqual({ message: "Service deleted successfully" })
    expect(prismaMock.service.delete).toHaveBeenCalledWith({
      where: { id: "service-1" },
    })
  })

  it("should return 404 if service does not exist", async () => {
    prismaMock.service.findUnique.mockResolvedValue(null)

    const request = new NextRequest("http://localhost:3000/api/services/non-existent", {
      method: "DELETE",
    })
    const context = { params: Promise.resolve({ id: "non-existent" }) }
    const response = await DELETE(request, context)
    const data = await response.json()

    expect(response.status).toBe(404)
    expect(data).toEqual({ error: "Service not found" })
  })

  it("should return 409 if service has bookings", async () => {
    const existingService = {
      id: "service-1",
      businessId: "business-1",
      name: "Haircut",
      description: "Basic haircut",
      price: 45,
      duration: 30,
      createdAt: new Date(),
      updatedAt: new Date(),
      bookings: [
        {
          id: "booking-1",
          userId: "user-1",
          serviceId: "service-1",
          startTime: new Date(),
          endTime: new Date(),
          status: "CONFIRMED",
          notes: null,
          priceSnapshot: 45,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    }

    prismaMock.service.findUnique.mockResolvedValue(existingService as any)

    const request = new NextRequest("http://localhost:3000/api/services/service-1", {
      method: "DELETE",
    })
    const context = { params: Promise.resolve({ id: "service-1" }) }
    const response = await DELETE(request, context)
    const data = await response.json()

    expect(response.status).toBe(409)
    expect(data).toEqual({ error: "Cannot delete service with existing bookings" })
    expect(prismaMock.service.delete).not.toHaveBeenCalled()
  })

  it("should handle database errors gracefully", async () => {
    prismaMock.service.findUnique.mockRejectedValue(new Error("Database error"))

    const request = new NextRequest("http://localhost:3000/api/services/service-1", {
      method: "DELETE",
    })
    const context = { params: Promise.resolve({ id: "service-1" }) }
    const response = await DELETE(request, context)
    const data = await response.json()

    expect(response.status).toBe(500)
    expect(data).toEqual({ error: "Failed to delete service" })
  })
})
