export enum UserRole {
  CUSTOMER = "CUSTOMER",
  BUSINESS_OWNER = "BUSINESS_OWNER",
}

export interface User {
  id: string
  clerkId: string
  email: string
  firstName: string | null
  lastName: string | null
  role: UserRole
  createdAt: Date
  updatedAt: Date
}
