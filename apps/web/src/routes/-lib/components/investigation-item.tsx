import { Clock } from 'lucide-react'
import { cn } from '@/shared/helpers/classname'

interface InvestigationItemProps {
  title: string
  onClick?: () => void
}

export function InvestigationItem({ title, onClick }: InvestigationItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3 px-2.5 py-2",
        "text-left text-sm text-foreground-tertiary",
        "hover:bg-sidebar-accent hover:text-foreground",
        "active:bg-sidebar-accent-hover",
        "transition-all rounded-md"
      )}
    >
      <Clock className="size-4 shrink-0" />
      <span className="truncate">{title}</span>
    </button>
  )
}

