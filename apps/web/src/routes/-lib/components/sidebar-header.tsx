import { Shield } from 'lucide-react'

export function SidebarHeader() {
  return (
    <div className="flex items-center gap-3 px-5 py-4">
      <div className="relative">
        <Shield className="size-5 text-primary" />
        <div className="absolute -top-0.5 -right-0.5 size-2.5 rounded-full border-2 border-sidebar bg-primary" />
      </div>
      <p className="font-semibold text-2xl text-foreground leading-tight">SecureAI</p>
    </div>
  )
}

