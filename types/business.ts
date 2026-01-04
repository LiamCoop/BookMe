export interface Business {
  id: string
  ownerId: string
  name: string
  description: string | null
  email: string | null
  phone: string | null
  address: string | null
  city: string | null
  state: string | null
  zipCode: string | null
  hoursOfOperation: string | null
  createdAt: Date
  updatedAt: Date
}
