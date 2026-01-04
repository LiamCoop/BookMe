"use client"

import { useState, useEffect } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ServiceCard } from "@/components/service-card"
import { ServiceDialog } from "@/components/service-dialog"
import type { Service } from "@/types/service"

// TODO: In production, get this from authenticated user's business
const TEST_BUSINESS_ID = "cmjz1im8c0002oxwdeq20g33g"

export function ServiceManager() {
  const [services, setServices] = useState<Service[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch services on mount
  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await fetch(`/api/services?businessId=${TEST_BUSINESS_ID}`)

      if (!response.ok) {
        throw new Error("Failed to fetch services")
      }

      const data = await response.json()
      setServices(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
      console.error("Error fetching services:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddService = async (service: Omit<Service, "id" | "businessId" | "createdAt" | "updatedAt">) => {
    try {
      setError(null)
      const response = await fetch("/api/services", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...service,
          businessId: TEST_BUSINESS_ID,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to create service")
      }

      const newService = await response.json()
      setServices([newService, ...services])
      setIsDialogOpen(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
      console.error("Error creating service:", err)
    }
  }

  const handleUpdateService = async (updatedService: Service | Omit<Service, "id" | "businessId" | "createdAt" | "updatedAt">) => {
    if (!("id" in updatedService)) return

    try {
      setError(null)
      const response = await fetch(`/api/services/${updatedService.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: updatedService.name,
          description: updatedService.description,
          price: updatedService.price,
          duration: updatedService.duration,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to update service")
      }

      const updated = await response.json()
      setServices(services.map((service) => (service.id === updated.id ? updated : service)))
      setEditingService(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
      console.error("Error updating service:", err)
    }
  }

  const handleDeleteService = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) {
      return
    }

    try {
      setError(null)
      const response = await fetch(`/api/services/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to delete service")
      }

      setServices(services.filter((service) => service.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
      console.error("Error deleting service:", err)
    }
  }

  const handleEdit = (service: Service) => {
    setEditingService(service)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
  }

  const handleCloseEditDialog = () => {
    setEditingService(null)
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground">Service Management</h1>
            <p className="mt-2 text-pretty text-base leading-relaxed text-muted-foreground">
              Create and manage the services you offer to your customers
            </p>
          </div>
          <Button
            onClick={() => setIsDialogOpen(true)}
            className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
            disabled={isLoading}
          >
            <Plus className="h-4 w-4" />
            Add Service
          </Button>
        </div>
      </div>

      {error && (
        <div className="mb-6 rounded-lg border border-destructive bg-destructive/10 p-4">
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}

      {isLoading ? (
        <div className="flex min-h-[400px] items-center justify-center">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
            <p className="mt-4 text-sm text-muted-foreground">Loading services...</p>
          </div>
        </div>
      ) : services.length === 0 ? (
        <div className="flex min-h-[400px] items-center justify-center rounded-lg border-2 border-dashed border-border bg-card">
          <div className="text-center">
            <h3 className="text-lg font-medium text-card-foreground">No services yet</h3>
            <p className="mt-1 text-sm text-muted-foreground">Get started by creating your first service</p>
            <Button
              onClick={() => setIsDialogOpen(true)}
              className="mt-4 gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Plus className="h-4 w-4" />
              Add Service
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} onEdit={handleEdit} onDelete={handleDeleteService} />
          ))}
        </div>
      )}

      <ServiceDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSubmit={handleAddService}
        onClose={handleCloseDialog}
      />

      {editingService && (
        <ServiceDialog
          open={!!editingService}
          onOpenChange={(open) => !open && handleCloseEditDialog()}
          onSubmit={handleUpdateService}
          onClose={handleCloseEditDialog}
          service={editingService}
        />
      )}
    </div>
  )
}

