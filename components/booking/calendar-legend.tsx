"use client"

export function CalendarLegend() {
  return (
    <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm">
      <LegendItem color="bg-card" border="border-border" label="Available" />
      <LegendItem color="bg-primary" border="border-primary" label="Selected" />
      <LegendItem color="bg-muted/70" border="border-border" label="Booked" />
      <LegendItem color="bg-secondary" border="border-border" label="Blocked" />
    </div>
  )
}

interface LegendItemProps {
  color: string
  border: string
  label: string
}

function LegendItem({ color, border, label }: LegendItemProps) {
  return (
    <div className="flex items-center gap-2">
      <div className={`h-4 w-4 rounded border ${border} ${color}`} />
      <span className="text-muted-foreground">{label}</span>
    </div>
  )
}

