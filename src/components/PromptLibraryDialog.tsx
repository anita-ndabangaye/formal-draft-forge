import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { EMAIL_TYPES, PROMPT_LIBRARY, type EmailTypeId, type LibraryPrompt } from "@/lib/prompt-library";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApply: (prompt: LibraryPrompt) => void;
}

export function PromptLibraryDialog({ open, onOpenChange, onApply }: Props) {
  const [filter, setFilter] = useState<EmailTypeId | "all">("all");
  const prompts = PROMPT_LIBRARY.filter((p) => filter === "all" || p.type === filter);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] overflow-y-auto rounded-sm border-border bg-card sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl font-semibold">Prompt Library</DialogTitle>
          <DialogDescription>
            Pre-written starting points for each type of correspondence. Apply one to fill the compose form.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-1 flex flex-wrap gap-2 border-b border-border pb-4">
          <FilterChip active={filter === "all"} onClick={() => setFilter("all")}>
            All
          </FilterChip>
          {EMAIL_TYPES.map((t) => (
            <FilterChip key={t.id} active={filter === t.id} onClick={() => setFilter(t.id)}>
              {t.label}
            </FilterChip>
          ))}
        </div>

        <ul className="grid gap-3 sm:grid-cols-2">
          {prompts.map((p) => (
            <li key={p.id} className="flex flex-col rounded-sm border border-border bg-background/60 p-4">
              <span className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                {EMAIL_TYPES.find((t) => t.id === p.type)?.label}
              </span>
              <h3 className="mt-1 font-display text-lg font-semibold leading-snug">{p.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{p.description}</p>
              <p className="mt-3 flex-1 border-l-2 border-gold/70 pl-3 text-sm italic text-foreground/80">
                {p.purpose}
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  {p.tone} · {p.length}
                </span>
                <Button
                  size="sm"
                  onClick={() => {
                    onApply(p);
                    onOpenChange(false);
                  }}
                >
                  Use prompt
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-background text-muted-foreground hover:border-gold hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}
