import { createFileRoute } from "@tanstack/react-router";
import { ComposerPage } from "@/components/ComposerPage";
import { FORMATS } from "@/lib/prompt-library";

export const Route = createFileRoute("/social")({
  head: () => ({
    meta: [
      { title: "Quill — AI Social Media Post Generator" },
      {
        name: "description",
        content:
          "Write announcements, launches, milestones and audience questions with AI. Choose a platform, tone and length, then publish.",
      },
      { property: "og:title", content: "Quill — AI Social Media Post Generator" },
      {
        property: "og:description",
        content: "Hook-first social posts with a call to action and hashtags, drafted in seconds.",
      },
    ],
  }),
  component: () => <ComposerPage config={FORMATS.social} />,
});
