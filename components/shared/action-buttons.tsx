import { ChevronsUpDown, Eye, EyeOff, Star } from "lucide-react"

interface ActionButtonsProps {
  activeFilter: string
  showDefinitions: boolean
  setActiveFilter: (filter: string) => void
  setShowDefinitions: (show: boolean) => void
  setExpandedSections: (sections: Record<string, boolean>) => void
}

export function ActionButtons({
  activeFilter,
  showDefinitions,
  setActiveFilter,
  setShowDefinitions,
  setExpandedSections,
}: ActionButtonsProps) {
  return (
    <div className="flex items-center gap-2 pr-4">
      <button
        onClick={() => setActiveFilter("favorites")}
        className={`text-sm px-4 py-1.5 rounded-md transition-colors flex items-center gap-2 ${
          activeFilter === "favorites"
            ? "bg-zinc-500 text-white"
            : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700/50 hover:text-zinc-300"
        }`}
      >
        <Star className="w-4 h-4" />
        <span className="hidden sm:inline">Favorites</span>
      </button>

      <button
        onClick={() => setExpandedSections({})}
        className="text-sm px-4 py-1.5 rounded-md transition-colors flex items-center gap-2 shrink-0 bg-zinc-800 text-zinc-400 hover:bg-zinc-700/50 hover:text-zinc-300"
      >
        <ChevronsUpDown className="w-4 h-4" />
        <span className="hidden sm:inline">Collapse All</span>
      </button>

      <button
        onClick={() => setShowDefinitions((prev) => !prev)}
        className={`text-sm px-4 py-1.5 rounded-md transition-colors flex items-center gap-2 shrink-0 ${
          !showDefinitions
            ? "bg-zinc-500 text-white"
            : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700/50 hover:text-zinc-300"
        }`}
      >
        {showDefinitions ? (
          <>
            <EyeOff className="w-4 h-4" />
            <span className="hidden sm:inline">Definitions</span>
          </>
        ) : (
          <>
            <Eye className="w-4 h-4" />
            <span className="hidden sm:inline">Definitions</span>
          </>
        )}
      </button>
    </div>
  )
}

