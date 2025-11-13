import { Info, Paperclip, Send } from 'lucide-react'
import { cn } from '@/shared/helpers/classname'

interface InputBarProps {
  onSend?: (message: string) => void
  onAttach?: () => void
}

export function InputBar({ onSend, onAttach }: InputBarProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const message = formData.get('message') as string
    if (message?.trim()) {
      onSend?.(message.trim())
      e.currentTarget.reset()
    }
  }

  return (
    <div className="border-t border-border bg-background p-4">
      <form onSubmit={handleSubmit} className="flex items-center gap-2 max-w-4xl mx-auto">
        <Info className="size-5 text-muted-foreground shrink-0" />
        <div className="relative flex-1">
          <input
            type="text"
            name="message"
            placeholder="Describe the security incident, attach files, or ask about threats..."
            className={cn(
              "w-full px-4 pr-[48px] py-3 rounded-xl min-h-[48px]",
              "bg-input border border-input-border",
              "text-[15px] text-foreground placeholder:text-muted-foreground",
              "focus:outline-none focus:border-border-focus",
              "transition-all resize-none"
            )}
          />
          <button
            type="submit"
            className={cn(
              "absolute right-2 top-1/2 -translate-y-1/2",
              "size-8 rounded-md",
              "bg-gradient-to-br from-primary to-primary-hover",
              "text-primary-foreground flex items-center justify-center",
              "hover:shadow-[0_0_12px_var(--primary-glow)]",
              "active:scale-[0.98]",
              "transition-all"
            )}
            aria-label="Send message"
          >
            <Send className="size-4" />
          </button>
        </div>
        <button
          type="button"
          onClick={onAttach}
          className={cn(
            "p-2 rounded-lg",
            "text-muted-foreground hover:text-foreground",
            "hover:bg-surface-hover",
            "transition-all"
          )}
          aria-label="Attach file"
        >
          <Paperclip className="size-5" />
        </button>
      </form>
    </div>
  )
}

