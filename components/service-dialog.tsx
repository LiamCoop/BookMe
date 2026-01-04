"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { Service } from "@/types/service"

interface ServiceDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (service: Service | Omit<Service, "id">) => void
  onClose: () => void
  service?: Service | null
}

export function ServiceDialog({ open, onOpenChange, onSubmit, onClose, service }: ServiceDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    duration: "",
  })

  useEffect(() => {
    if (service) {
      setFormData({
        name: service.name,
        description: service.description,
        price: service.price.toString(),
        duration: service.duration.toString(),
      })
    } else {
      setFormData({
        name: "",
        description: "",
        price: "",
        duration: "",
      })
    }
  }, [service, open])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const serviceData = {
      name: formData.name,
      description: formData.description,
      price: Number.parseFloat(formData.price),
      duration: Number.parseInt(formData.duration, 10),
    }

    if (service) {
      onSubmit({ ...serviceData, id: service.id })
    } else {
      onSubmit(serviceData)
    }

    setFormData({
      name: "",
      description: "",
      price: "",
      duration: "",
    })
  }

  const handleClose = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      duration: "",
    })
    onClose()
  }

  const isFormValid =
    formData.name.trim() &&
    formData.description.trim() &&
    formData.price &&
    Number.parseFloat(formData.price) > 0 &&
    formData.duration &&
    Number.parseInt(formData.duration, 10) > 0

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-card-foreground">
            {service ? "Edit Service" : "Add New Service"}
          </DialogTitle>
          <DialogDescription className="text-pretty leading-relaxed">
            {service ? "Update the details of your service" : "Fill in the details to create a new service"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-5 py-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium text-foreground">
                Service Name
              </Label>
              <Input
                id="name"
                placeholder="e.g., Basic Haircut"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="border-border bg-background"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium text-foreground">
                Description
              </Label>
              <Textarea
                id="description"
                placeholder="Describe your service..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="min-h-[100px] resize-none border-border bg-background leading-relaxed"
                required
              />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="price" className="text-sm font-medium text-foreground">
                  Price ($)
                </Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="border-border bg-background"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration" className="text-sm font-medium text-foreground">
                  Duration (minutes)
                </Label>
                <Input
                  id="duration"
                  type="number"
                  min="1"
                  placeholder="30"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  className="border-border bg-background"
                  required
                />
              </div>
            </div>
          </div>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="border-border bg-background text-foreground hover:bg-secondary hover:text-secondary-foreground"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!isFormValid}
              className="bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
            >
              {service ? "Update Service" : "Create Service"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

