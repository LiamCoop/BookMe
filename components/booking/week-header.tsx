"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface WeekHeaderProps {
  weekRange: string
  onPreviousWeek: () => void
  onNextWeek: () => void
}

export function WeekHeader({ weekRange, onPreviousWeek, onNextWeek }: WeekHeaderProps) {
  return (
    <div className="mb-8 flex items-center justify-between">
      <Button
        variant="ghost"
        size="icon"
        onClick={onPreviousWeek}
        className="h-10 w-10 hover:bg-accent"
        aria-label="Previous week"
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>

      <h2 className="text-lg font-medium text-foreground">{weekRange}</h2>

      <Button
        variant="ghost"
        size="icon"
        onClick={onNextWeek}
        className="h-10 w-10 hover:bg-accent"
        aria-label="Next week"
      >
        <ChevronRight className="h-5 w-5" />
      </Button>
    </div>
  )
}

