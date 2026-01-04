export enum BookingStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

export interface Booking {
  id: string
  userId: string
  serviceId: string
  startTime: Date
  endTime: Date
  status: BookingStatus
  notes: string | null
  priceSnapshot: number
  createdAt: Date
  updatedAt: Date
}
