import { createServerFn } from "@tanstack/react-start";
import { streamText } from "ai";
import { z } from "zod";
import { createLovableAiGatewayProvider } from "./ai-gateway.server";

const Input = z.object({
  format: z.enum(["email", "social", "blog"]),
  docType: z.string().min(1),
  recipient: z.string().max(200).optional().default(""),
  context: z.string().max(200).optional().default(""),
  senderName: z.string().max(200).optional().default(""),
  purpose: z.string().min(1).max(2000),
  details: z.string().max(4000).optional().default(""),
  tone: z.string().min(1),
  length: z.string().min(1),
});

const EMAIL_LENGTH: Record<string, string> = {
  Short: "80-120 words, three tight paragraphs at most.",
  Medium: "150-220 words.",
  Long: "250-350 words with clear paragraph breaks.",
};

const SOCIAL_LENGTH: Record<string, string> = {
  Short: "40-80 words.",
  Medium: "100-160 words.",
  Long: "200-280 words.",
};

const BLOG_LENGTH: Record<string, string> = {
  Short: "350-500 words.",
  Medium: "600-800 words.",
  Long: "1000-1300 words.",
};

const EMAIL_SYSTEM =
  "You are an expert business correspondence writer. Write a complete, ready-to-send email. " +
  "Start with a line 'Subject: <subject>' then a blank line, then the email body including greeting and sign-off. " +
  "Use the sender name in the sign-off if given, otherwise '[Your Name]'. " +
  "Never invent facts that were not supplied; use bracketed placeholders instead. " +
  "Return plain text only — no markdown, no commentary.";

const SOCIAL_SYSTEM =
  "You are an expert social media copywriter. Write one ready-to-publish social media post. " +
  "Open with a strong hook line, use short lines and generous line breaks for scannability, " +
  "end with a clear call to action, then a final line of 3-5 relevant hashtags. " +
  "Match the conventions of the named platform. " +
  "Never invent facts, numbers or quotes that were not supplied; use bracketed placeholders instead. " +
  "Return plain text only — no markdown symbols, no commentary.";

const BLOG_SYSTEM =
  "You are an expert blog writer and editor. Write a complete, publish-ready blog post. " +
  "Start with a line 'Title: <title>' then a blank line, then an engaging intro, " +
  "body sections with short descriptive headings on their own lines, and a closing takeaway. " +
  "Never invent facts, statistics or quotes that were not supplied; use bracketed placeholders instead. " +
  "Return plain text with plain headings — no markdown symbols, no commentary.";

const CONFIG = {
  email: { system: EMAIL_SYSTEM, lengths: EMAIL_LENGTH, typeLabel: "Email type", a: "Recipient name", b: "Recipient role/company", sender: "Sender name" },
  social: { system: SOCIAL_SYSTEM, lengths: SOCIAL_LENGTH, typeLabel: "Post type", a: "Platform", b: "Audience", sender: "Author/brand" },
  blog: { system: BLOG_SYSTEM, lengths: BLOG_LENGTH, typeLabel: "Article type", a: "Publication", b: "Audience", sender: "Author byline" },
} as const;

export const generateEmail = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => Input.parse(input))
  .handler(async ({ data }) => {
    const key = process.env["LOVABLE_API_KEY"];
    if (!key) throw new Error("AI is not configured for this app.");

    const gateway = createLovableAiGatewayProvider(key);
    const cfg = CONFIG[data.format];

    const prompt = [
      `${cfg.typeLabel}: ${data.docType}`,
      `${cfg.a}: ${data.recipient || "not given"}`,
      `${cfg.b}: ${data.context || "not given"}`,
      `${cfg.sender}: ${data.senderName || "not given"}`,
      `Purpose: ${data.purpose}`,
      `Key details: ${data.details || "none"}`,
      `Tone: ${data.tone}`,
      `Length: ${data.length} — ${cfg.lengths[data.length] ?? "a moderate length"}`,
    ].join("\n");

    try {
      const result = streamText({
        model: gateway("google/gemini-2.5-flash"),
        system: cfg.system,
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
      throw new Error(err instanceof Error ? err.message : "Failed to generate the draft.");
    }
  });
