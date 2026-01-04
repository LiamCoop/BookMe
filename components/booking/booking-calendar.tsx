"use client"

import { useState } from "react"
import { generateWeekSchedule, getWeekRange, getWeekStart, type SlotStatus } from "@/lib/booking-utils"
import { WeekHeader } from "./week-header"
import { DayColumn } from "./day-column"
import { CalendarLegend } from "./calendar-legend"

interface BookingCalendarProps {
  businessId: string
  serviceId: string
}

export function BookingCalendar({ businessId, serviceId }: BookingCalendarProps) {
  const [currentWeekStart, setCurrentWeekStart] = useState(() => getWeekStart())
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)
  const [schedule, setSchedule] = useState(() => generateWeekSchedule(currentWeekStart))

  // TODO: Use businessId and serviceId to:
  // 1. Fetch service details for display
  // 2. Fetch actual availability for this service
  // 3. Create bookings when user selects a slot

  const goToPreviousWeek = () => {
    const newWeekStart = new Date(currentWeekStart)
    newWeekStart.setDate(currentWeekStart.getDate() - 7)
    setCurrentWeekStart(newWeekStart)
    setSchedule(generateWeekSchedule(newWeekStart))
    setSelectedSlot(null)
  }

  const goToNextWeek = () => {
    const newWeekStart = new Date(currentWeekStart)
    newWeekStart.setDate(currentWeekStart.getDate() + 7)
    setCurrentWeekStart(newWeekStart)
    setSchedule(generateWeekSchedule(newWeekStart))
    setSelectedSlot(null)
  }

  const handleSlotClick = (slotId: string, status: SlotStatus) => {
    if (status === "available") {
      setSelectedSlot(slotId)
    }
  }

  return (
    <div className="mx-auto max-w-7xl">
      <WeekHeader
        weekRange={getWeekRange(currentWeekStart)}
        onPreviousWeek={goToPreviousWeek}
        onNextWeek={goToNextWeek}
      />

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-3 md:gap-4">
        {schedule.map((day) => (
          <DayColumn key={day.date.toISOString()} day={day} selectedSlot={selectedSlot} onSlotClick={handleSlotClick} />
        ))}
      </div>

      <CalendarLegend />
    </div>
  )
}

