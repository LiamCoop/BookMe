"use client"

import type { DaySchedule, SlotStatus } from "@/lib/booking-utils"
import { TimeSlotButton } from "./time-slot-button"

interface DayColumnProps {
  day: DaySchedule
  selectedSlot: string | null
  onSlotClick: (slotId: string, status: SlotStatus) => void
}

export function DayColumn({ day, selectedSlot, onSlotClick }: DayColumnProps) {
  return (
    <div className="flex flex-col">
      {/* Day Header */}
      <div className="mb-4 text-center">
        <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{day.dayName}</div>
        <div className="mt-1.5 text-2xl font-medium text-foreground">{day.dayNumber}</div>
      </div>

      {/* Time Slots */}
      <div className="flex flex-col gap-2">
        {day.slots.map((slot) => (
          <TimeSlotButton
            key={slot.id}
            slot={slot}
            isSelected={selectedSlot === slot.id}
            onClick={() => onSlotClick(slot.id, slot.status)}
          />
        ))}
      </div>
    </div>
  )
}

