import { Search } from 'lucide-react'
import { cn } from '@/shared/helpers/classname'
import { useSidebarSearch } from './hooks/use-sidebar-search'

export function SidebarSearch() {
  const { search, setSearch } = useSidebarSearch()

  return (
    <div className="p-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-[14px] text-muted-foreground" />
        <input
          type="text"
          placeholder="Search conversations..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={cn(
            "w-full h-8 pl-[34px] pr-3 rounded-md",
            "bg-input border border-border-subtle",
            "text-sm text-foreground placeholder:text-muted-foreground",
            "focus:outline-none focus:border-border-focus",
            "transition-all"
          )}
        />
      </div>
    </div>
  )
}

