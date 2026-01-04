"use client"

import { Pencil, Trash2, Clock, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import type { Service } from "@/types/service"

interface ServiceCardProps {
  service: Service
  onEdit: (service: Service) => void
  onDelete: (id: string) => void
}

export function ServiceCard({ service, onEdit, onDelete }: ServiceCardProps) {
  return (
    <Card className="flex flex-col border-border bg-card transition-shadow hover:shadow-md">
      <CardHeader className="pb-4">
        <CardTitle className="text-balance text-xl font-semibold text-card-foreground">{service.name}</CardTitle>
        <CardDescription className="text-pretty leading-relaxed">{service.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 space-y-3 pb-4">
        <div className="flex items-center gap-2 text-sm">
          <DollarSign className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium text-foreground">${service.price.toFixed(2)}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">{service.duration} minutes</span>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2 border-t border-border bg-muted/30 pt-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onEdit(service)}
          className="flex-1 gap-2 border-border bg-card text-foreground hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300"
        >
          <Pencil className="h-3.5 w-3.5" />
          Edit
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onDelete(service.id)}
          className="flex-1 gap-2 border-destructive/30 bg-card text-destructive hover:bg-destructive/10 hover:text-destructive"
        >
          <Trash2 className="h-3.5 w-3.5" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  )
}

