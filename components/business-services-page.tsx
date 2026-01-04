"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, MapPin, Phone, Clock as ClockIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BookableServiceCard } from "@/components/bookable-service-card"
import type { Business } from "@/types/business"
import type { Service } from "@/types/service"
import { useRouter } from "next/navigation"

interface BusinessServicesPageProps {
  businessId: string
}

export function BusinessServicesPage({ businessId }: BusinessServicesPageProps) {
  const router = useRouter()
  const [business, setBusiness] = useState<Business | null>(null)
  const [services, setServices] = useState<Service[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchBusiness()
  }, [businessId])

  const fetchBusiness = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await fetch(`/api/businesses/${businessId}`)

      if (!response.ok) {
        throw new Error("Failed to fetch business")
      }

      const data = await response.json()
      setBusiness(data)
      setServices(data.services || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
      console.error("Error fetching business:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleBookService = (service: Service) => {
    router.push(`/book/${businessId}/services/${service.id}`)
  }

  const handleBack = () => {
    router.push("/book")
  }

  const fullAddress = business
    ? [business.address, business.city, business.state, business.zipCode].filter(Boolean).join(", ")
    : ""

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <Button
        variant="ghost"
        onClick={handleBack}
        className="mb-6 gap-2 text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to businesses
      </Button>

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
      ) : business ? (
        <>
          <div className="mb-10">
            <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground">{business.name}</h1>
            {business.description && (
              <p className="mt-2 text-pretty text-base leading-relaxed text-muted-foreground">
                {business.description}
              </p>
            )}

            <div className="mt-6 flex flex-wrap gap-4 text-sm text-muted-foreground">
              {fullAddress && (
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>{fullAddress}</span>
                </div>
              )}
              {business.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>{business.phone}</span>
                </div>
              )}
              {business.hoursOfOperation && (
                <div className="flex items-center gap-2">
                  <ClockIcon className="h-4 w-4" />
                  <span>{business.hoursOfOperation}</span>
                </div>
              )}
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-foreground">Available Services</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Choose a service to book your appointment
            </p>
          </div>

          {services.length === 0 ? (
            <div className="flex min-h-[300px] items-center justify-center rounded-lg border-2 border-dashed border-border bg-card">
              <div className="text-center">
                <h3 className="text-lg font-medium text-card-foreground">No services available</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  This business hasn't added any services yet
                </p>
              </div>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <BookableServiceCard key={service.id} service={service} onBook={handleBookService} />
              ))}
            </div>
          )}
        </>
      ) : null}
    </div>
  )
}
