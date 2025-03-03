"use client"

import { useState } from "react"
import { TabsNavigation } from "./components/navigation/tabs-navigation"
import { PlaceholderContent } from "./components/shared/placeholder-content"
import { FrameworkContent } from "./components/outline/framework-content"
import { OutlineProvider } from "./contexts/outline-context"
import { outlineData } from "./data/outline-data"

const OutlineNavigation = () => {
  const [activeTab, setActiveTab] = useState("creativity")

  const renderContent = () => {
    switch (activeTab) {
      case "creativity":
        return <FrameworkContent outlineData={outlineData} />
      case "askrick":
        return <PlaceholderContent title="Ask Rick" />
      case "ai":
        return <PlaceholderContent title="AI" />
      case "promptcoach":
        return <PlaceholderContent title="Prompt Coach" />
      case "interviewcoach":
        return <PlaceholderContent title="Interview Coach" />
      default:
        return null
    }
  }

  return (
    <OutlineProvider>
      <div className="flex flex-col h-screen bg-zinc-950">
        <TabsNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
        {renderContent()}
      </div>
    </OutlineProvider>
  )
}

export default OutlineNavigation

