"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { SKILL_LEVELS } from "@/constants/skill-levels"

interface SkillLevelSelectProps {
  value: string
  onChange: (value: string) => void
}

export function SkillLevelSelect({ value, onChange }: SkillLevelSelectProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[140px] justify-between bg-zinc-800 text-zinc-400 hover:bg-zinc-700/50 hover:text-zinc-300 border-0"
        >
          {value ? SKILL_LEVELS.find((level) => level.value === value)?.label : "Select level..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[140px] p-0">
        <Command>
          <CommandInput placeholder="Search level..." />
          <CommandList>
            <CommandEmpty>No level found.</CommandEmpty>
            <CommandGroup>
              {SKILL_LEVELS.map((level) => (
                <CommandItem
                  key={level.value}
                  value={level.value}
                  onSelect={(currentValue) => {
                    onChange(currentValue)
                    setOpen(false)
                  }}
                >
                  <Check className={cn("mr-2 h-4 w-4", value === level.value ? "opacity-100" : "opacity-0")} />
                  {level.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

