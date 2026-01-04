export type SlotStatus = "available" | "booked" | "blocked"

export interface TimeSlot {
  id: string
  time: string
  endTime: string
  status: SlotStatus
}

export interface DaySchedule {
  date: Date
  dayName: string
  dayNumber: number
  slots: TimeSlot[]
}

/**
 * Format date range for week display
 */
export function getWeekRange(date: Date): string {
  const startOfWeek = new Date(date)
  startOfWeek.setDate(date.getDate() - date.getDay())

  const endOfWeek = new Date(startOfWeek)
  endOfWeek.setDate(startOfWeek.getDate() + 6)

  const monthStart = startOfWeek.toLocaleString("default", { month: "short" })
  const monthEnd = endOfWeek.toLocaleString("default", { month: "short" })
  const year = startOfWeek.getFullYear()

  if (monthStart === monthEnd) {
    return `${monthStart} ${startOfWeek.getDate()}-${endOfWeek.getDate()}, ${year}`
  }

  return `${monthStart} ${startOfWeek.getDate()} - ${monthEnd} ${endOfWeek.getDate()}, ${year}`
}

/**
 * Generate time slots for a day (9 AM to 6 PM with 90-minute slots)
 */
export function generateTimeSlots(date: Date): TimeSlot[] {
  const slots: TimeSlot[] = []
  const startHour = 9
  const endHour = 18
  const slotDuration = 90 // minutes

  let currentHour = startHour
  let currentMinute = 0
  let slotIndex = 0

  while (currentHour < endHour) {
    const startTime = `${currentHour.toString().padStart(2, "0")}:${currentMinute.toString().padStart(2, "0")}`

    const endMinute = (currentMinute + slotDuration) % 60
    const endHour = currentHour + Math.floor((currentMinute + slotDuration) / 60)
    const endTime = `${endHour.toString().padStart(2, "0")}:${endMinute.toString().padStart(2, "0")}`

    // Randomly assign statuses for demo purposes
    const statuses: SlotStatus[] = ["available", "available", "available", "booked", "blocked"]
    const status = statuses[Math.floor(Math.random() * statuses.length)]

    slots.push({
      id: `${date.toISOString()}-${slotIndex}`,
      time: startTime,
      endTime,
      status,
    })

    currentMinute = endMinute
    currentHour = endHour
    slotIndex++
  }

  return slots
}

/**
 * Generate week schedule starting from a given date
 */
export function generateWeekSchedule(weekStartDate: Date): DaySchedule[] {
  const schedule: DaySchedule[] = []
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  for (let i = 0; i < 7; i++) {
    const date = new Date(weekStartDate)
    date.setDate(weekStartDate.getDate() + i)

    schedule.push({
      date,
      dayName: days[date.getDay()],
      dayNumber: date.getDate(),
      slots: generateTimeSlots(date),
    })
  }

  return schedule
}

/**
 * Get the start of the week for a given date (Sunday)
 */
export function getWeekStart(date: Date = new Date()): Date {
  const weekStart = new Date(date)
  weekStart.setDate(date.getDate() - date.getDay())
  weekStart.setHours(0, 0, 0, 0)
  return weekStart
}

