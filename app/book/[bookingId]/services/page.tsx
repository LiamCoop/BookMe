import { BusinessServicesPage } from "@/components/business-services-page"

type PageProps = {
  params: Promise<{ bookingId: string }>
}

export default async function Page({ params }: PageProps) {
  const { bookingId } = await params

  return (
    <main className="min-h-screen bg-background">
      <BusinessServicesPage businessId={bookingId} />
    </main>
  )
}
