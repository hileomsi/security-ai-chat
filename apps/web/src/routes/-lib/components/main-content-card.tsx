import { MessageSquare, Sparkles } from 'lucide-react'
import { NewConversationButton } from './new-conversation-button'
import { cn } from '@/shared/helpers/classname'

interface MainContentCardProps {
  onNewConversation?: () => void
  quickActions?: string[]
  title?: string
  description?: string
}

const defaultQuickActions = ['Analyze Logs', 'Check Vulnerabilities', 'Incident Response']

export function MainContentCard({
  onNewConversation,
  quickActions = defaultQuickActions,
  title = 'Start a New Investigation',
  description = 'Begin analyzing security threats with AI-powered insights. Describe an incident or ask about potential vulnerabilities.',
}: MainContentCardProps) {
  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className={cn(
        "max-w-2xl w-full",
        "bg-card border border-border rounded-xl p-12",
        "flex flex-col items-center text-center"
      )}>
        <div className="relative mb-6">
          <MessageSquare className="size-16 text-primary" />
          <div className="absolute -top-1 -right-1">
            <Sparkles className="size-6 text-primary fill-primary" />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-foreground mb-3 leading-tight">
          {title}
        </h2>
        
        <p className="text-foreground-secondary mb-8 max-w-md leading-relaxed">
          {description}
        </p>
        
        <NewConversationButton 
          onClick={onNewConversation}
          className="mb-10"
        />
        
        <div className="w-full">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-[0.05em] mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {quickActions.map((action) => (
              <button
                key={action}
                className={cn(
                  "px-4 py-3 rounded-lg",
                  "bg-card border border-border",
                  "text-sm text-foreground",
                  "hover:bg-surface-hover hover:border-border-focus",
                  "transition-all"
                )}
              >
                {action}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

