import { AssistantRuntimeProvider } from "@assistant-ui/react";
import { useChatRuntime, AssistantChatTransport,  } from "@assistant-ui/react-ai-sdk";
import { createRootRoute, Outlet } from '@tanstack/react-router'

import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { DevToolsModal } from "@assistant-ui/react-devtools";
import { ThemeProvider } from '@/shared/contexts/theme-context';
import { ErrorBoundary } from '@/shared/components/ui/error-boundary';

const RootLayout = () => {
  const runtime = useChatRuntime({
    transport: new AssistantChatTransport({
      api: "/api/prompt",
    })
  });

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <AssistantRuntimeProvider runtime={runtime}>
          <div className="h-screen w-screen overflow-hidden">
            <Outlet />
            <TanStackRouterDevtools />
          </div>
          <DevToolsModal />
        </AssistantRuntimeProvider>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export const Route = createRootRoute({ component: RootLayout })