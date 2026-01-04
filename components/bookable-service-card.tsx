"use client"

import { Clock, DollarSign, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import type { Service } from "@/types/service"

interface BookableServiceCardProps {
  service: Service
  onBook: (service: Service) => void
}

export function BookableServiceCard({ service, onBook }: BookableServiceCardProps) {
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
      <CardFooter className="border-t border-border bg-muted/30 pt-4">
        <Button
          onClick={() => onBook(service)}
          className="w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Calendar className="h-4 w-4" />
          Book Now
        </Button>
      </CardFooter>
    </Card>
  )
}
