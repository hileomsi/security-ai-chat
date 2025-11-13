import { useAssistantState } from '@assistant-ui/react'
import { useState } from 'react';

export function useThreadTitle(): string | null {
  const [title, setTitle] = useState<string | null>(null);

  useAssistantState(({ thread }) => {
    if (title !== null) return;

    if (!thread?.messages || thread.messages.length === 0) {
      return;
    }

    const firstUserMessage = thread.messages.find(
      (msg) => msg.role === 'user'
    )

    if (!firstUserMessage) return;

    if (Array.isArray(firstUserMessage.parts)) {
      const textPart = firstUserMessage.parts.find(
        (part) => part.type === 'text'
      )
      
      if (textPart && typeof textPart.text === 'string' && textPart.text.trim()) {
        setTitle(textPart.text.trim())
      }
    }

    const content = firstUserMessage.content
    if (content && typeof content === 'string') {
      setTitle(content)
    }
  })

  return title;
}

