"use client"

import { useState, useEffect } from "react"
import { Search } from "lucide-react"
import { BusinessCard } from "@/components/business-card"
import type { Business } from "@/types/business"
import { useRouter } from "next/navigation"

export function BookingPage() {
  const router = useRouter()
  const [businesses, setBusinesses] = useState<(Business & { _count?: { services: number } })[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchBusinesses()
  }, [])

  const fetchBusinesses = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await fetch("/api/businesses")

      if (!response.ok) {
        throw new Error("Failed to fetch businesses")
      }

      const data = await response.json()
      setBusinesses(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
      console.error("Error fetching businesses:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleBusinessClick = (business: Business) => {
    router.push(`/book/${business.id}/services`)
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground">
              Find a Service Provider
            </h1>
            <p className="mt-2 text-pretty text-base leading-relaxed text-muted-foreground">
              Browse local businesses and book your next appointment
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
            <Search className="h-4 w-4" />
            <span>{businesses.length} {businesses.length === 1 ? "business" : "businesses"} available</span>
          </div>
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
            <p className="mt-4 text-sm text-muted-foreground">Loading businesses...</p>
          </div>
        </div>
      ) : businesses.length === 0 ? (
        <div className="flex min-h-[400px] items-center justify-center rounded-lg border-2 border-dashed border-border bg-card">
          <div className="text-center">
            <Search className="mx-auto h-12 w-12 text-muted-foreground/50" />
            <h3 className="mt-4 text-lg font-medium text-card-foreground">No businesses found</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              There are no service providers available at the moment
            </p>
          </div>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {businesses.map((business) => (
            <BusinessCard key={business.id} business={business} onClick={handleBusinessClick} />
          ))}
        </div>
      )}
    </div>
  )
}
