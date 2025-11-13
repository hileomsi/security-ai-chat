import { type FC } from "react";
import {
  ThreadListItemPrimitive,
  ThreadListPrimitive,
  useAssistantState,
} from "@assistant-ui/react";
import { ArchiveIcon, PlusIcon, MessageSquare } from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import { TooltipIconButton } from "@/shared/components/assistant-ui/tooltip-icon-button";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { Separator } from "@/shared/components/ui/separator";
import { cn } from "@/shared/helpers/classname";
import { useThreadTitle } from "@/shared/hooks/use-thread-title";
import { useSidebarSearch } from "@/routes/-lib/sidebar-search/hooks/use-sidebar-search";

export const ThreadList: FC = () => {
  return (
    <ThreadListPrimitive.Root className="aui-root aui-thread-list-root flex flex-col items-stretch gap-1.5 px-4" >
      <ThreadListNew />
      <Separator className="my-2" />
      
      <div className="text-sm font-medium text-muted-foreground">Recent Conversations</div>
      <ThreadListItems />
    </ThreadListPrimitive.Root>
  );
};

const ThreadListNew: FC = () => {
  return (
    <ThreadListPrimitive.New asChild>
      <Button
        className="aui-thread-list-new flex items-center justify-center gap-1 rounded-lg px-2.5 py-2 text-start hover:bg-muted data-active:bg-muted bg-gradient-to-br from-primary to-primary-hover hover:shadow-[0_0_12px_var(--primary-glow)] active:scale-[0.98] transition-all"
        variant="ghost"
      >
        <PlusIcon />
        New Conversation
      </Button>
    </ThreadListPrimitive.New>
  );
};

const ThreadListItems: FC = () => {
  const isLoading = useAssistantState(({ threads }) => threads.isLoading);
  const threadIds = useAssistantState(({ threads }) => threads.threadIds);

  if (isLoading) {
    return <ThreadListSkeleton />;
  }

  if (threadIds.length === 0) {
    return <ThreadListEmptyState />;
  }

  return <ThreadListPrimitive.Items components={{ ThreadListItem }} />;
};

const ThreadListSkeleton: FC = () => {
  return (
    <>
      {Array.from({ length: 5 }, (_, i) => (
        <div
          key={i}
          role="status"
          aria-label="Loading threads"
          aria-live="polite"
          className="aui-thread-list-skeleton-wrapper flex items-center gap-2 rounded-md px-3 py-2"
        >
          <Skeleton className="aui-thread-list-skeleton h-[22px] flex-grow" />
        </div>
      ))}
    </>
  );
};

const ThreadListEmptyState: FC = () => {
  return (
    <div className="aui-thread-list-empty-state flex flex-col items-center justify-center py-8 px-4 text-center">
      <div className="relative mb-4 inline-flex items-center justify-center">
        <div className={cn(
          "rounded-2xl p-3 h-12 w-12 flex items-center justify-center",
          "bg-[var(--sidebar-footer-bg)] border border-[var(--sidebar-footer-border)]"
        )}>
          <MessageSquare className="size-6 text-primary stroke-[1.5]" />
        </div>
        <div className="absolute -top-0.5 -right-0.5 bg-primary-hover rounded-md size-4 flex items-center justify-center">
          <PlusIcon className="size-2 text-primary-foreground" />
        </div>
      </div>
      <p className="text-sm text-muted-foreground mb-1">No conversations yet</p>
      <p className="text-xs text-foreground-tertiary">Start a new conversation to get started</p>
    </div>
  );
};

const ThreadListItem: FC = () => {
  const title = useThreadTitle();
  const { debouncedSearch } = useSidebarSearch();

  const isSearchMatch = debouncedSearch ? title?.toLowerCase().includes(debouncedSearch.toLowerCase()) : true;

  if (!isSearchMatch) return null;

  return (
    <ThreadListItemPrimitive.Root className="aui-thread-list-item flex items-center gap-2 rounded-lg transition-all hover:bg-muted focus-visible:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none data-active:bg-muted w-full">
      <ThreadListItemPrimitive.Trigger className="aui-thread-list-item-trigger flex items-center justify-between flex-grow text-start w-full">
        <MessageSquare className="size-4 text-primary stroke-[1.5]" />
        <ThreadListItemTitle title={title} className="flex-1" />
        <ThreadListItemArchive />
      </ThreadListItemPrimitive.Trigger>
    </ThreadListItemPrimitive.Root>
  );
};

const ThreadListItemTitle: FC<{ title: string | null, className?: string }> = ({ title, className }) => {
  return (
    <span className={cn("aui-thread-list-item-title text-sm px-2 truncate min-w-0", className)}>
      {title || 'New Chat'}
    </span>
  );
};

const ThreadListItemArchive: FC = () => {
  return (
    <ThreadListItemPrimitive.Archive asChild>
      <TooltipIconButton tooltip="Delete conversation" asChild>
        <ArchiveIcon />
      </TooltipIconButton>
    </ThreadListItemPrimitive.Archive>
  );
};
