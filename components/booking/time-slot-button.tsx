"use client"

import { cn } from "@/lib/utils"
import type { TimeSlot } from "@/lib/booking-utils"

interface TimeSlotButtonProps {
  slot: TimeSlot
  isSelected: boolean
  onClick: () => void
}

export function TimeSlotButton({ slot, isSelected, onClick }: TimeSlotButtonProps) {
  const isAvailable = slot.status === "available"
  const isBooked = slot.status === "booked"
  const isBlocked = slot.status === "blocked"

  return (
    <button
      onClick={onClick}
      disabled={!isAvailable}
      className={cn(
        "rounded-lg border px-3 py-4 text-left transition-all duration-200",
        "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        // Available state
        isAvailable && [
          "border-border bg-card hover:border-primary/40 hover:bg-accent/60 cursor-pointer",
          "hover:shadow-sm",
          isSelected && "border-primary bg-primary text-primary-foreground shadow-md",
        ],
        // Booked state
        isBooked && ["border-border bg-muted/70 text-muted-foreground cursor-not-allowed"],
        // Blocked state
        isBlocked && ["border-border bg-secondary text-muted-foreground cursor-not-allowed opacity-60"],
      )}
    >
      <div className="text-xs font-medium leading-relaxed">{slot.time}</div>
      {isBooked && <div className="mt-1 text-[10px] uppercase tracking-wide opacity-70">Booked</div>}
      {isBlocked && <div className="mt-1 text-[10px] uppercase tracking-wide opacity-70">Blocked</div>}
    </button>
  )
}

