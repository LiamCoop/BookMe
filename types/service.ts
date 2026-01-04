export interface Service {
  id: string
  businessId: string
  name: string
  description: string
  price: number
  duration: number
  createdAt?: Date
  updatedAt?: Date
}

