import { createServerFn } from "@tanstack/react-start";
import { streamText } from "ai";
import { z } from "zod";
import { createLovableAiGatewayProvider } from "./ai-gateway.server";

const Input = z.object({
  emailType: z.string().min(1),
  recipientName: z.string().max(200).optional().default(""),
  recipientRole: z.string().max(200).optional().default(""),
  senderName: z.string().max(200).optional().default(""),
  purpose: z.string().min(1).max(2000),
  details: z.string().max(4000).optional().default(""),
  tone: z.string().min(1),
  length: z.string().min(1),
});

const LENGTH_GUIDE: Record<string, string> = {
  Short: "80-120 words, three tight paragraphs at most.",
  Medium: "150-220 words.",
  Long: "250-350 words with clear paragraph breaks.",
};

export const generateEmail = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => Input.parse(input))
  .handler(async ({ data }) => {
    const key = process.env["LOVABLE_API_KEY"];
    if (!key) throw new Error("AI is not configured for this app.");

    const gateway = createLovableAiGatewayProvider(key);

    const prompt = [
      `Email type: ${data.emailType}`,
      `Recipient name: ${data.recipientName || "not given"}`,
      `Recipient role/company: ${data.recipientRole || "not given"}`,
      `Sender name: ${data.senderName || "not given"}`,
      `Purpose: ${data.purpose}`,
      `Key details: ${data.details || "none"}`,
      `Tone: ${data.tone}`,
      `Length: ${data.length} — ${LENGTH_GUIDE[data.length] ?? "around 180 words"}`,
    ].join("\n");

    try {
      const result = streamText({
        model: gateway("google/gemini-2.5-flash"),
        system:
          "You are an expert business correspondence writer. Write a complete, ready-to-send email. " +
          "Start with a line 'Subject: <subject>' then a blank line, then the email body including greeting and sign-off. " +
          "Use the sender name in the sign-off if given, otherwise '[Your Name]'. " +
          "Never invent facts that were not supplied; use bracketed placeholders instead. " +
          "Return plain text only — no markdown, no commentary.",
        prompt,
      });
      const text = await result.text;
      return { text };
    } catch (err: unknown) {
      const status = (err as { statusCode?: number; status?: number })?.statusCode ??
        (err as { status?: number })?.status;
      if (status === 429) throw new Error("Too many requests right now — please try again in a moment.");
      if (status === 402) throw new Error("AI credits are exhausted. The app owner needs to top up Lovable AI credits.");
      if (status === 403) throw new Error("AI access is blocked for this workspace.");
      throw new Error(err instanceof Error ? err.message : "Failed to generate the email.");
    }
  });
