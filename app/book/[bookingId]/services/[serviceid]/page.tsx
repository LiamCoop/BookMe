import { BookingCalendar } from "@/components/booking/booking-calendar"

type PageProps = {
  params: Promise<{ bookingId: string; serviceid: string }>
}

export default async function BookingPage({ params }: PageProps) {
  const { bookingId, serviceid } = await params
  console.log({ bookingId, serviceid });

  return (
    <main className="min-h-screen bg-background py-12 px-4">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-medium tracking-tight text-foreground">Book Your Service</h1>
          <p className="mt-3 text-lg text-muted-foreground">Select a time slot that works best for you</p>
        </div>

        <BookingCalendar businessId={bookingId} serviceId={serviceid} />
      </div>
    </main>
  )
}

