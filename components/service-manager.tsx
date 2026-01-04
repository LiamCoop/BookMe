"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ServiceCard } from "@/components/service-card"
import { ServiceDialog } from "@/components/service-dialog"
import type { Service } from "@/types/service"

const initialServices: Service[] = [
  {
    id: "1",
    name: "Basic Haircut",
    description: "A classic haircut with wash and styling",
    price: 45,
    duration: 30,
  },
  {
    id: "2",
    name: "Deep Conditioning Treatment",
    description: "Intensive moisture therapy for damaged hair",
    price: 75,
    duration: 45,
  },
  {
    id: "3",
    name: "Full Color Service",
    description: "Complete color application with toning and styling",
    price: 150,
    duration: 120,
  },
]

export function ServiceManager() {
  const [services, setServices] = useState<Service[]>(initialServices)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingService, setEditingService] = useState<Service | null>(null)

  const handleAddService = (service: Omit<Service, "id">) => {
    const newService: Service = {
      ...service,
      id: Date.now().toString(),
    }
    setServices([...services, newService])
    setIsDialogOpen(false)
  }

  const handleUpdateService = (updatedService: Service | Omit<Service, "id">) => {
    if ("id" in updatedService) {
      setServices(services.map((service) => (service.id === updatedService.id ? updatedService : service)))
    }
    setEditingService(null)
  }

  const handleDeleteService = (id: string) => {
    setServices(services.filter((service) => service.id !== id))
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
          >
            <Plus className="h-4 w-4" />
            Add Service
          </Button>
        </div>
      </div>

      {services.length === 0 ? (
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

