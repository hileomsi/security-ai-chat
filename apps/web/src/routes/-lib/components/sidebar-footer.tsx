import { Moon, Sun } from 'lucide-react'
import { cn } from '@/shared/helpers/classname'
import { useTheme } from '@/shared/hooks/use-theme'

export function SidebarFooter() {
  const { theme, toggleTheme } = useTheme()
  return (
    <div className="mt-auto px-4 py-4">
      <button
        onClick={toggleTheme}
        className={cn(
          "w-full dark:bg-[var(--sidebar-footer-bg)]  border dark:border-[var(--sidebar-footer-border)] rounded-lg",
          "px-4 py-3 flex items-center gap-3",
          "hover:bg-[var(--sidebar-footer-bg)]/80 transition-colors",
          "cursor-pointer"
        )}
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        style={{
          backgroundColor: theme === 'dark' ? 'var(--sidebar-footer-bg)' : 'white',
          borderColor: theme === 'dark' ? 'var(--sidebar-footer-border)' : 'border',
        }}
      >
        {theme === 'dark' ? (
          <Moon className="size-5 text-primary shrink-0" />
        ) : (
          <Sun className="size-5 text-primary shrink-0" />
        )}
        <div className="flex-1 min-w-0 text-left">
          <p className="text-sm font-medium text-foreground">AI Threat Analysis</p>
          <p className="text-xs text-muted-foreground">Powered by SecureAI</p>
        </div>
      </button>
    </div>
  )
}

