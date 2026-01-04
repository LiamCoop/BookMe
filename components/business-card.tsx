"use client"

import { MapPin, Building2, Phone, ChevronRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { Business } from "@/types/business"

interface BusinessCardProps {
  business: Business & { _count?: { services: number } }
  onClick: (business: Business) => void
}

export function BusinessCard({ business, onClick }: BusinessCardProps) {
  const fullAddress = [business.address, business.city, business.state, business.zipCode]
    .filter(Boolean)
    .join(", ")

  return (
    <Card
      className="group flex cursor-pointer flex-col border-border bg-card transition-all hover:shadow-lg hover:border-primary/50"
      onClick={() => onClick(business)}
    >
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-balance text-xl font-semibold text-card-foreground group-hover:text-primary transition-colors">
              {business.name}
            </CardTitle>
            {business.description && (
              <CardDescription className="mt-2 text-pretty leading-relaxed line-clamp-2">
                {business.description}
              </CardDescription>
            )}
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
        </div>
      </CardHeader>
      <CardContent className="flex-1 space-y-3 pb-4">
        {fullAddress && (
          <div className="flex items-start gap-2 text-sm">
            <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
            <span className="text-muted-foreground">{fullAddress}</span>
          </div>
        )}
        {business.phone && (
          <div className="flex items-center gap-2 text-sm">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">{business.phone}</span>
          </div>
        )}
        {business._count && business._count.services > 0 && (
          <div className="flex items-center gap-2 text-sm">
            <Building2 className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">
              {business._count.services} {business._count.services === 1 ? "service" : "services"} available
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
