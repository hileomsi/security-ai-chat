import fileSystem from "node:fs/promises";
import { join } from "node:path";
import { FastifyRequest, FastifyReply } from "fastify";
import { createOpenAI } from "@ai-sdk/openai";
import { streamText, convertToModelMessages, UIMessage } from "ai";

const openai = createOpenAI({
  apiKey: process.env.GROQ_API_KEY!,
  baseURL: "https://api.groq.com/openai/v1",
});

export const prompt = async (
  request: FastifyRequest<{ Body: { messages: UIMessage[] } }>,
  reply: FastifyReply
) => {
	const messages = request.body.messages;

  const manifestPath = join(
    process.cwd(),
    "src",
    "modules",
    "ai",
    "agents",
    "security-analyst.manifest.md"
  );
  const agentManifest = await fileSystem.readFile(manifestPath, "utf8");

  const result = streamText({
    model: openai("meta-llama/llama-4-scout-17b-16e-instruct"),
    system: agentManifest,
    prompt: convertToModelMessages(messages),
  });

  reply.header("X-Vercel-AI-Data-Stream", "v1");
  reply.header("Content-Type", "text/plain; charset=utf-8");

  return reply.send(result.toUIMessageStreamResponse());
};
