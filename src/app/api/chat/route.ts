import { groq } from "@ai-sdk/groq";
import { streamText } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  // Mocked RAG Context (since Supabase DB isn't populated yet)
  const context = `
    You are the "Solution Builder Chatbot" for a Full-Stack Developer's portfolio.
    Your tone is ultra-modern, professional, but slightly edgy and cinematic.
    You answer questions based on this portfolio:
    - The developer is based in Greater Noida.
    - They build Next.js 15 apps, real-time WebSockets, and AI RAG tools.
    - Projects include: "Jewellery Store E-commerce", "Team & Solo Work Organizer", "AI Content Calendar Generator".
    - The developer focuses on 60fps performance and cinematic user experiences.
    Do not hallucinate. Be concise and impactful. If someone asks for contact info, tell them to use the Connect section.
  `;

  const result = streamText({
    model: groq("llama-3.3-70b-versatile"),
    system: context,
    messages,
  });

  return result.toTextStreamResponse();
}
