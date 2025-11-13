import { SidebarHeader } from './sidebar-header'
import { SidebarSearch } from '../sidebar-search/sidebar-search'
import { SidebarFooter } from './sidebar-footer'
import { cn } from '@/shared/helpers/classname'
import { ThreadList } from '@/shared/components/assistant-ui/thread-list'

interface SidebarProps {}

export function Sidebar(props: SidebarProps) {
  return (
    <aside className={cn(
      "w-[280px] bg-sidebar border-r border-sidebar-border",
      "flex flex-col h-screen",
      "overflow-y-auto"
    )}>
      <SidebarHeader />
      <SidebarSearch />
      <ThreadList />
      <SidebarFooter />
    </aside>
  )
}

