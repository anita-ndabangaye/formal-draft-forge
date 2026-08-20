import { createFileRoute } from "@tanstack/react-router";
import { ComposerPage } from "@/components/ComposerPage";
import { FORMATS } from "@/lib/prompt-library";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Quill — AI Blog Post Generator" },
      {
        name: "description",
        content:
          "Draft how-to guides, listicles, opinion pieces and case studies with AI. Structured articles with a title, headings and a closing takeaway.",
      },
      { property: "og:title", content: "Quill — AI Blog Post Generator" },
      {
        property: "og:description",
        content: "Publish-ready articles with structure and a clear takeaway, drafted in seconds.",
      },
    ],
  }),
  component: () => <ComposerPage config={FORMATS.blog} />,
});
