# RAD Security Assessment - Hiléo Andersson

## Overview

This project was developed as an AI-powered chat application specialized in cybersecurity, using a modern monorepo architecture with clear separation between backend and frontend. All architectural decisions were made aiming for rapid delivery without compromising quality, including advanced code organization practices and use of specialized libraries.

### Main Architectural Decisions

**Monorepo with Turborepo**: The choice of a monorepo facilitates code sharing, shared typing, centralized visibility, and unified dependency management. Turborepo adds intelligent caching and task parallelization, optimizing build and development time.

**Backend/Frontend Separation**: The Fastify server acts as a critical abstraction layer, protecting API keys and sensitive information from the client bundle. This architecture enables:
- Implementation of security guardrails on the server
- Rate limiting and access control
- Input validation and sanitization
- Centralized logging and monitoring
- Easy switching of AI providers without impacting the client

**Technology Stack**:
- **Backend**: Fastify (high performance), TypeScript, Vercel AI SDK
- **Frontend**: React 19, TanStack Router (typed routing), Assistant UI (specialized components), Zustand (state management), Tailwind CSS 4
- **AI**: Groq API with `meta-llama/llama-4-scout-17b-16e-instruct` model (multimodal)
- **Streaming**: Vercel AI SDK protocol (start, delta, end) for real-time responses

**Note on AI Provider**: Initially planned to use LM Studio locally (OpenAI-compatible API), but due to performance limitations during development, opted for Groq which offers low latency and multimodal support, maintaining compatibility with the OpenAI interface.

## Setup Instructions

### Prerequisites

- Node.js v22.17.0 or higher
- pnpm (recommended package manager)
- Groq account with API key (or LM Studio running locally)

### Installation Steps

1. Clone the repository
2. Install dependencies in the project root:
   ```bash
   pnpm install
   ```

3. Configure environment variables:
   - Create a `.env` file in `apps/server/`
   - Add your Groq API key:
     ```
     GROQ_API_KEY=your_key_here
     ```

### How to Run the Project

Run the command in the project root:
```bash
pnpm dev
```

This will start:
- Fastify server in watch mode (usually on port 3000)
- React application with Vite in development mode (usually on port 5173)

Turborepo will manage both processes in parallel.

## Project Architecture

### Backend (Server)

**Framework**: Fastify was chosen for its excellent performance (up to 2x faster than Express in benchmarks), large community, native TypeScript support, and robust plugin ecosystem.

**Code Organization**: The structure follows **Vertical Slice Architecture** and **Colocation** principles, organizing code by functionality rather than technical type. This facilitates maintenance and scalability.

**Current Structure**:
```
modules/
  ai/
    agents/
      security-analyst.manifest.md  # Agent system prompt
    ai.controller.ts                # Controller with streaming logic
routes/
  prompt/
    index.ts                        # Fastify route exposing the endpoint
```

**Proposed Structure for Scale** (Domain-Driven Design):
```
modules/
  <module-name>/
    api/
      dtos/                         # Data Transfer Objects
      <module-name>.controller.ts   # Controllers/Resolvers
    domains/
      entities/                     # Domain entities
      services/                     # Domain services
      aggregates/                   # Aggregates
      value-objects/                # Value Objects
    infrastructure/
      repositories/                 # Repositories (persistence)
      queries/                      # Query Builders
      mappers/                      # Mappers DTO <-> Domain
    use-cases/                      # Use cases (Mediator Pattern)
    <module-name>.module.ts         # Main module
```

**Implemented Features**:
- **Agent Manifest**: System of specialized prompts loaded from Markdown files, allowing easy customization of AI behavior
- **Streaming**: Implementation of Vercel AI SDK protocol for real-time responses
- **Type Safety**: TypeScript throughout the codebase with strict typing
- **Auto-loading**: Fastify autoload for plugins and routes, facilitating modular organization

### Frontend (Web)

**Main Libraries**:
- **@assistant-ui/react**: Abstracts all the complexity of streaming management, thread state, messages, and specialized UI. Uses Composition Pattern for maximum customization.
- **@assistant-ui/react-ai-sdk**: Integration with Vercel AI SDK, manages HTTP transport and stream protocol parsing.
- **TanStack Router**: Typed routing with end-to-end type-safety and File-Based Routing. Allows parameter validation at compile time.
- **Zustand**: Lightweight and performant state management, ideal for component local state.
- **Tailwind CSS 4**: Utility-first CSS with custom design system (SecureAI Design System).

**Code Organization**:
```
/routes
  /<page>
    /-lib                          # Colocation: route-specific code
      /components                  # Components used only in this route
      /hooks                       # Specific hooks
      /helpers                     # Local helpers
    index.tsx                      # Route component
  /shared                          # Globally shared code
    /components
      /ui                          # Base components (Shadcn-style)
      /assistant-ui                # Custom Assistant UI wrappers
    /contexts                      # React Contexts (Theme, etc.)
    /stores                        # Zustand global stores
    /services                       # Services (API clients, etc.)
    /helpers                        # Utility functions
    /styles                         # Global CSS and variables
    /hooks                          # Shared hooks
    /modules                        # Modules with defined scope
      /authentication
        /stores | hooks | components
```

**Security and Reliability Features**:
- **Error Boundary**: Implemented at root level (`__root.tsx`) to capture rendering and lifecycle errors, preventing complete application crashes. Displays friendly UI with recovery options.
- **Type Safety**: Strict TypeScript with compile-time type validation
- **Theme System**: Theme system (dark/light) with localStorage persistence and SSR-safe

**Performance Considerations**:
- Lazy loading of heavy components
- Automatic code splitting via Vite
- Response streaming for better UX (perceived performance)
- Re-render optimizations with React 19

## Implemented Features

### Chat Interface with Streaming
- ✅ Specialized UI components from @assistant-ui/react
- ✅ Integration with Groq API (model `meta-llama/llama-4-scout-17b-16e-instruct`)
- ✅ Real-time streaming using Vercel AI SDK protocol
- ✅ Display of user messages and AI responses
- ✅ Loading states during response generation
- ✅ Robust error handling (connection failures, API errors)
- ✅ Global Error Boundary for rendering error capture

### Image Attachment
- ✅ File upload button in chat input
- ✅ Support for formats: PNG, JPG, JPEG, WebP
- ✅ Image preview before sending
- ✅ Image sending in base64 (simplified for quick delivery)
- ✅ Image display in chat history
- ⛔️ File size validation (max 5MB) - pending

### Conversation Management
- ✅ Create new conversations
- ✅ List all conversations in sidebar
- ✅ Switch between conversations
- ✅ Conversation preview (first message or title)
- ✅ Auto-generated titles from first message
- ✅ Delete conversations with confirmation
- ⛔️ localStorage persistence - pending (structure ready, not implemented)

### UI/UX Polish
- ✅ Clean, modern design using Shadcn-style components
- ✅ Smooth animations for streaming text
- ✅ Empty states (no conversations, no messages)
- ✅ Appropriate loading indicators
- ✅ Dark/light theme system with toggle
- ⛔️ Responsive layout (mobile & desktop) - desktop only implemented
- ⛔️ Auto-scroll to latest message - pending

### Bonus Features
- ✅ Message Regeneration: Retry last AI response
- ✅ Markdown Support: Markdown rendering in AI responses
- ✅ Agent Specialization: Specialized prompt system (Security Analyst)
- ✅ Type-safe Routing: Typed routing with TanStack Router
- ✅ DevTools: Integration with Assistant UI DevTools and TanStack Router DevTools
- ⛔️ Chat Export: Download conversations as JSON or Markdown
- ⛔️ Keyboard Shortcuts: Cmd+N for new chat, Enter to send

## Development Time

**~5 hours** - Focused on rapid delivery with architectural quality, prioritizing solid technical decisions even with limited scope.

## Production Considerations

### Security

1. **Input Validation**: Implement robust validation on the server using Zod with Fastify integration (`@fastify/type-provider-typebox` or `@fastify/type-provider-zod`)
   ```typescript
   // Example of necessary validation
   const messageSchema = z.object({
     messages: z.array(z.object({
       role: z.enum(['user', 'assistant', 'system']),
       content: z.string().max(10000), // Character limit
       // ... message parts validation
     }))
   })
   ```

2. **Prompt Injection Protection**: 
   - Implement prompt injection detection system using specialized model
   - User input sanitization
   - Rate limiting per IP/user
   - Logging of suspicious attempts

3. **Secrets Management**: 
   - Use secure environment variables
   - Integration with services like AWS Secrets Manager, Vault, etc.
   - Never expose API keys in code or client bundle

### Performance and Scalability

1. **Caching**:
   - Cache frequent responses (Redis)
   - Agent manifest caching
   - CDN for static assets

2. **Rate Limiting**:
   - Implement rate limiting per user/IP
   - Different limits for different request types
   - Intelligent throttling

3. **Streaming Optimizations**:
   - Response compression (gzip/brotli)
   - Chunk size optimization
   - Timeout handling for slow connections

### Observability

1. **Logging**:
   - Structured logging (Pino in Fastify)
   - Request, error, and performance metric logs
   - Integration with services like Datadog, New Relic, etc.

2. **Monitoring**:
   - Health check endpoints
   - Latency, throughput, error rate metrics
   - Alerts for anomalies

3. **Error Tracking**:
   - Integration with Sentry or similar
   - Error boundaries at different application levels
   - Stack traces and error context

### DevOps and CI/CD

1. **Containerization**:
   - Optimized Dockerfiles (multi-stage builds)
   - Docker Compose for local development
   - Kubernetes for production orchestration

2. **CI/CD Pipeline**:
   - Automated tests (unit, integration, e2e)
   - Linting and type checking
   - Automated build and deploy
   - Separate staging and production environments

3. **Testing**:
   - Test coverage > 80%
   - Integration tests for critical flows
   - E2E tests for main user journeys
   - Load and stress tests

### UX Improvements

1. **Accessibility**:
   - Screen reader support (ARIA labels)
   - Keyboard navigation
   - Adequate color contrast
   - WCAG 2.1 compliance

2. **Responsiveness**:
   - Mobile-first design
   - Appropriate breakpoints
   - Touch gestures for mobile

3. **Internationalization**:
   - Multi-language support (i18n)
   - Date/number formatting by locale

4 **Shortcuts**