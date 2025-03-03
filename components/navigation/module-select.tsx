"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

const MODULES = [
  { value: "creativity", label: "Creativity" },
  { value: "askrick", label: "Ask Rick" },
  { value: "ai", label: "AI" },
  { value: "promptcoach", label: "Prompt Coach" },
  { value: "interviewcoach", label: "Interview Coach" },
] as const

interface ModuleSelectProps {
  value: string
  onChange: (value: string) => void
}

export function ModuleSelect({ value, onChange }: ModuleSelectProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between bg-zinc-800 text-zinc-400 hover:bg-zinc-700/50 hover:text-zinc-300 border-0"
        >
          {value ? MODULES.find((module) => module.value === value)?.label : "Select module..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search module..." />
          <CommandList>
            <CommandEmpty>No module found.</CommandEmpty>
            <CommandGroup>
              {MODULES.map((module) => (
                <CommandItem
                  key={module.value}
                  value={module.value}
                  onSelect={(currentValue) => {
                    onChange(currentValue)
                    setOpen(false)
                  }}
                >
                  <Check className={cn("mr-2 h-4 w-4", value === module.value ? "opacity-100" : "opacity-0")} />
                  {module.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

