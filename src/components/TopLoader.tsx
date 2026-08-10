export function TopLoader({ active }: { active: boolean }) {
  if (!active) return null
  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-50 h-0.5 overflow-hidden bg-transparent">
      <div className="h-full w-1/3 animate-[loaderslide_0.9s_ease-in-out_infinite] bg-accent" />
      <style>{`
        @keyframes loaderslide {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(150%); }
          100% { transform: translateX(320%); }
        }
      `}</style>
    </div>
  )
}
