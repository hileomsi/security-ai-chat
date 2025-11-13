import { createFileRoute } from '@tanstack/react-router'
import { Sidebar } from './-lib/components/sidebar'
import { cn } from '@/shared/helpers/classname'
import { Thread } from '@/shared/components/assistant-ui/thread'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <div className={cn(
      "flex h-screen bg-background",
      "overflow-hidden"
    )}>
      <Sidebar />
      <div className="flex-1 flex flex-col bg-background">
        <Thread />
      </div>
    </div>
  )
}