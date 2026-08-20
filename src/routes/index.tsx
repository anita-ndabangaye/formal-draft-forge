import { createFileRoute } from "@tanstack/react-router";
import { ComposerPage } from "@/components/ComposerPage";
import { FORMATS } from "@/lib/prompt-library";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Quill — AI Email Generator for Formal Correspondence" },
      {
        name: "description",
        content:
          "Draft meeting requests, thank-yous and business inquiries with AI. Pick a tone, length and prompt, and get a polished, ready-to-send email.",
      },
      { property: "og:title", content: "Quill — AI Email Generator" },
      {
        property: "og:description",
        content: "Draft formal, well-structured emails in seconds with a prompt library for every email type.",
      },
    ],
  }),
  component: () => <ComposerPage config={FORMATS.email} />,
});
