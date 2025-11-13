import { Plus } from 'lucide-react'
import { cn } from '@/shared/helpers/classname'

interface NewConversationButtonProps {
  onClick?: () => void
  className?: string
}

export function NewConversationButton({ onClick, className }: NewConversationButtonProps) {
  return (
    <div className={cn("px-4 mb-6", className)}>
      <button
        onClick={onClick}
        className={cn(
          "w-full py-2 px-3 rounded-md",
          "bg-gradient-to-br from-primary to-primary-hover",
          "text-primary-foreground font-medium text-sm",
          "flex items-center justify-center gap-2",
          "hover:shadow-[0_0_12px_var(--primary-glow)]",
          "active:scale-[0.98]",
          "transition-all"
        )}
      >
        <Plus className="size-4" />
        New Conversation
      </button>
    </div>
  )
}

