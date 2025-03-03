"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SkillLevelSelect } from "./skill-level-select"

interface FilterControlsProps {
  activeFilter: string
  setActiveFilter: (filter: string) => void
}

export function FilterControls({ activeFilter, setActiveFilter }: FilterControlsProps) {
  return (
    <div className="flex-1 flex items-center gap-4">
      {/* Desktop view */}
      <Tabs value={activeFilter} onValueChange={setActiveFilter} className="hidden sm:block w-full">
        <TabsList className="bg-transparent border-0 flex items-center justify-start gap-1 overflow-x-auto hide-scrollbar">
          <div className="flex-1 flex items-center gap-1">
            <TabsTrigger
              value="all"
              className={`text-sm px-4 py-1.5 rounded-md transition-colors ${
                activeFilter === "all"
                  ? "bg-zinc-500 text-white"
                  : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700/50 hover:text-zinc-300"
              }`}
            >
              All
            </TabsTrigger>

            <TabsTrigger
              value="beginner"
              className={`text-sm px-4 py-1.5 rounded-md transition-colors ${
                activeFilter === "beginner"
                  ? "bg-zinc-500 text-white"
                  : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700/50 hover:text-zinc-300"
              }`}
            >
              Beginner
            </TabsTrigger>

            <TabsTrigger
              value="intermediate"
              className={`text-sm px-4 py-1.5 rounded-md transition-colors ${
                activeFilter === "intermediate"
                  ? "bg-zinc-500 text-white"
                  : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700/50 hover:text-zinc-300"
              }`}
            >
              Intermediate
            </TabsTrigger>

            <TabsTrigger
              value="advanced"
              className={`text-sm px-4 py-1.5 rounded-md transition-colors ${
                activeFilter === "advanced"
                  ? "bg-zinc-500 text-white"
                  : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700/50 hover:text-zinc-300"
              }`}
            >
              Advanced
            </TabsTrigger>
          </div>
        </TabsList>
      </Tabs>

      {/* Mobile view */}
      <div className="sm:hidden">
        <SkillLevelSelect value={activeFilter} onChange={setActiveFilter} />
      </div>
    </div>
  )
}

