export function PlaceholderContent({ title }: { title: string }) {
  return (
    <div className="flex-1 flex items-center justify-center p-6">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-zinc-200 mb-2">{title}</h2>
        <p className="text-zinc-400">Coming soon...</p>
      </div>
    </div>
  )
}

