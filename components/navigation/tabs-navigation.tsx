"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ModuleSelect } from "./module-select"

interface TabsNavigationProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export function TabsNavigation({ activeTab, setActiveTab }: TabsNavigationProps) {
  return (
    <div className="w-full bg-zinc-900 border-b border-zinc-800 px-4 py-3">
      <div className="flex justify-start items-center">
        {/* Mobile view */}
        <div className="sm:hidden flex items-center gap-3">
          <span className="text-zinc-400 text-sm">Module:</span>
          <ModuleSelect value={activeTab} onChange={setActiveTab} />
        </div>

        {/* Desktop view */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="hidden sm:block w-full">
          <TabsList className="bg-transparent border-0 flex items-center justify-start">
            <TabsTrigger
              value="creativity"
              className={`text-sm px-4 py-2 whitespace-nowrap ${
                activeTab === "creativity"
                  ? "bg-white text-black rounded-md font-medium"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              Creativity
            </TabsTrigger>

            <div className="h-5 border-r border-zinc-700 mx-1"></div>

            <TabsTrigger
              value="askrick"
              className={`text-sm px-4 py-2 whitespace-nowrap ${
                activeTab === "askrick"
                  ? "bg-white text-black rounded-md font-medium"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              Ask Rick
            </TabsTrigger>

            <div className="h-5 border-r border-zinc-700 mx-1"></div>

            <TabsTrigger
              value="ai"
              className={`text-sm px-4 py-2 whitespace-nowrap ${
                activeTab === "ai" ? "bg-white text-black rounded-md font-medium" : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              AI
            </TabsTrigger>

            <div className="h-5 border-r border-zinc-700 mx-1"></div>

            <TabsTrigger
              value="promptcoach"
              className={`text-sm px-4 py-2 whitespace-nowrap ${
                activeTab === "promptcoach"
                  ? "bg-white text-black rounded-md font-medium"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              Prompt Coach
            </TabsTrigger>

            <div className="h-5 border-r border-zinc-700 mx-1"></div>

            <TabsTrigger
              value="interviewcoach"
              className={`text-sm px-4 py-2 whitespace-nowrap ${
                activeTab === "interviewcoach"
                  ? "bg-white text-black rounded-md font-medium"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              Interview Coach
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  )
}

