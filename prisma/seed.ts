import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  console.log("Starting seed...")

  // Create a test user (business owner)
  const user = await prisma.user.upsert({
    where: { email: "owner@testbusiness.com" },
    update: {},
    create: {
      clerkId: "test_clerk_id_123",
      email: "owner@testbusiness.com",
      firstName: "Test",
      lastName: "Owner",
      role: "BUSINESS_OWNER",
    },
  })

  console.log("Created/found test user:", user.email)

  // Create a test business
  const business = await prisma.business.upsert({
    where: { ownerId: user.id },
    update: {
      name: "Test Hair & Nail Salon",
      description: "A beautiful salon offering hair and nail services",
      email: "contact@testhairsalon.com",
      phone: "555-0123",
      address: "123 Main Street",
      city: "San Francisco",
      state: "CA",
      zipCode: "94102",
      hoursOfOperation: "Mon-Fri: 9am-7pm, Sat: 10am-6pm, Sun: Closed",
    },
    create: {
      ownerId: user.id,
      name: "Test Hair & Nail Salon",
      description: "A beautiful salon offering hair and nail services",
      email: "contact@testhairsalon.com",
      phone: "555-0123",
      address: "123 Main Street",
      city: "San Francisco",
      state: "CA",
      zipCode: "94102",
      hoursOfOperation: "Mon-Fri: 9am-7pm, Sat: 10am-6pm, Sun: Closed",
    },
  })

  console.log("Created/found test business:", business.name)

  // Create test services
  const services = [
    {
      name: "Basic Haircut",
      description: "A classic haircut with wash and styling",
      price: 45,
      duration: 30,
    },
    {
      name: "Deep Conditioning Treatment",
      description: "Intensive moisture therapy for damaged hair",
      price: 75,
      duration: 45,
    },
    {
      name: "Full Color Service",
      description: "Complete color application with toning and styling",
      price: 150,
      duration: 120,
    },
    {
      name: "Basic Manicure",
      description: "Nail shaping, cuticle care, and polish application",
      price: 35,
      duration: 30,
    },
    {
      name: "Deluxe Pedicure",
      description: "Luxurious foot treatment with massage and polish",
      price: 65,
      duration: 60,
    },
  ]

  for (const serviceData of services) {
    const service = await prisma.service.upsert({
      where: {
        // Composite unique constraint based on business + name
        businessId_name: {
          businessId: business.id,
          name: serviceData.name,
        },
      },
      update: serviceData,
      create: {
        ...serviceData,
        businessId: business.id,
      },
    })
    console.log("Created/updated service:", service.name)
  }

  // Create additional test businesses for the booking page
  const additionalBusinesses = [
    {
      email: "owner2@testbusiness.com",
      firstName: "Maria",
      lastName: "Garcia",
      businessData: {
        name: "Downtown Spa & Wellness",
        description: "Relaxation and rejuvenation in the heart of the city",
        email: "info@downtownspa.com",
        phone: "555-0456",
        address: "456 Market Street",
        city: "San Francisco",
        state: "CA",
        zipCode: "94103",
        hoursOfOperation: "Mon-Sun: 8am-9pm",
      },
      services: [
        { name: "Swedish Massage", description: "Relaxing full body massage", price: 120, duration: 60 },
        { name: "Deep Tissue Massage", description: "Therapeutic muscle treatment", price: 140, duration: 75 },
        { name: "Aromatherapy", description: "Essential oils relaxation therapy", price: 100, duration: 50 },
      ],
    },
    {
      email: "owner3@testbusiness.com",
      firstName: "James",
      lastName: "Chen",
      businessData: {
        name: "Precision Cuts Barbershop",
        description: "Traditional barbering with modern style",
        email: "contact@precisioncuts.com",
        phone: "555-0789",
        address: "789 Valencia Street",
        city: "San Francisco",
        state: "CA",
        zipCode: "94110",
        hoursOfOperation: "Tue-Sat: 9am-7pm, Sun: 10am-5pm",
      },
      services: [
        { name: "Men's Haircut", description: "Classic or modern cut with styling", price: 35, duration: 30 },
        { name: "Hot Towel Shave", description: "Traditional straight razor shave", price: 40, duration: 45 },
        { name: "Beard Trim & Shape", description: "Precision beard grooming", price: 25, duration: 20 },
      ],
    },
  ]

  for (const businessInfo of additionalBusinesses) {
    const owner = await prisma.user.upsert({
      where: { email: businessInfo.email },
      update: {},
      create: {
        clerkId: `test_clerk_${businessInfo.email}`,
        email: businessInfo.email,
        firstName: businessInfo.firstName,
        lastName: businessInfo.lastName,
        role: "BUSINESS_OWNER",
      },
    })

    const newBusiness = await prisma.business.upsert({
      where: { ownerId: owner.id },
      update: businessInfo.businessData,
      create: {
        ...businessInfo.businessData,
        ownerId: owner.id,
      },
    })

    console.log("Created/found business:", newBusiness.name)

    for (const serviceData of businessInfo.services) {
      const service = await prisma.service.upsert({
        where: {
          businessId_name: {
            businessId: newBusiness.id,
            name: serviceData.name,
          },
        },
        update: serviceData,
        create: {
          ...serviceData,
          businessId: newBusiness.id,
        },
      })
      console.log("  - Created/updated service:", service.name)
    }
  }

  console.log("\nSeed completed successfully!")
  console.log("📋 Main Test Business ID:", business.id)
  console.log("Use this ID when testing the service management page")
  console.log("\nNow you have 3 businesses total for the booking page! 🎉\n")
}

main()
  .catch((e) => {
    console.error("Error during seed:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
