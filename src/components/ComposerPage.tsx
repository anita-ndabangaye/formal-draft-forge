import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Copy, RefreshCw, Trash2, Loader2, BookOpen, PenLine } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PromptLibraryDialog } from "@/components/PromptLibraryDialog";
import { generateEmail } from "@/lib/email.functions";
import {
  FORMATS,
  LENGTHS,
  TONES,
  type FormatConfig,
  type Length,
  type LibraryPrompt,
  type Tone,
} from "@/lib/prompt-library";

interface FormState {
  docType: string;
  recipient: string;
  context: string;
  senderName: string;
  purpose: string;
  details: string;
  tone: Tone;
  length: Length;
}

const NAV = [FORMATS.email, FORMATS.social, FORMATS.blog];

export function ComposerPage({ config }: { config: FormatConfig }) {
  const empty: FormState = {
    docType: config.defaultType,
    recipient: "",
    context: "",
    senderName: "",
    purpose: "",
    details: "",
    tone: config.defaultTone,
    length: config.defaultLength,
  };

  const [form, setForm] = useState<FormState>(empty);
  const [draft, setDraft] = useState("");
  const [libraryOpen, setLibraryOpen] = useState(false);

  const callGenerate = useServerFn(generateEmail);

  const mutation = useMutation({
    mutationFn: async (state: FormState) => {
      const typeLabel = config.types.find((t) => t.id === state.docType)?.label ?? state.docType;
      return callGenerate({ data: { ...state, format: config.format, docType: typeLabel } });
    },
    onSuccess: (res) => setDraft(res.text.trim()),
    onError: (err: Error) => toast.error(err.message || "Something went wrong."),
  });

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const submit = () => {
    if (!form.purpose.trim()) {
      toast.error("Tell us the purpose first.");
      return;
    }
    mutation.mutate(form);
  };

  const applyPrompt = (p: LibraryPrompt) => {
    setForm((f) => ({
      ...f,
      docType: p.type,
      purpose: p.purpose,
      details: p.details,
      tone: p.tone,
      length: p.length,
    }));
    toast.success(`Applied "${p.title}"`);
  };

  const copyDraft = async () => {
    try {
      await navigator.clipboard.writeText(draft);
      toast.success("Draft copied to clipboard.");
    } catch {
      toast.error("Couldn't copy — select the text and copy manually.");
    }
  };

  const clearAll = () => {
    setForm(empty);
    setDraft("");
  };

  return (
    <main className="mx-auto min-h-screen w-full max-w-6xl px-5 py-10 sm:px-8 lg:py-16">
      <header className="letterpress relative rounded-sm px-6 py-8 sm:px-10 sm:py-10">
        <div className="rule-gold absolute inset-x-0 top-0 h-[3px] rounded-t-sm" />
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
              {config.kicker}
            </p>
            <h1 className="mt-3 font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
              Quill <span className="text-muted-foreground">· {config.title}</span>
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">{config.intro}</p>
          </div>
          <Button variant="outline" onClick={() => setLibraryOpen(true)} className="gap-2 self-start rounded-sm">
            <BookOpen className="size-4" />
            Prompt Library
          </Button>
        </div>

        <nav className="mt-7 flex flex-wrap gap-2 border-t border-border pt-5">
          {NAV.map((f) => (
            <Link
              key={f.path}
              to={f.path}
              className={`rounded-sm border px-3 py-1.5 text-xs font-medium transition-colors ${
                f.format === config.format
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background text-muted-foreground hover:border-gold hover:text-foreground"
              }`}
            >
              {f.navLabel}
            </Link>
          ))}
        </nav>
      </header>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        {/* Compose */}
        <section className="letterpress rounded-sm p-6 sm:p-8">
          <div className="flex items-center gap-2 border-b border-border pb-4">
            <PenLine className="size-4 text-primary" />
            <h2 className="font-display text-xl font-semibold">Compose</h2>
          </div>

          <div className="mt-6 space-y-5">
            <Field label={config.typeLabel}>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {config.types.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => set("docType", t.id)}
                    title={t.blurb}
                    className={`rounded-sm border px-3 py-2 text-left text-xs font-medium leading-tight transition-colors ${
                      form.docType === t.id
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-background text-foreground/80 hover:border-gold"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </Field>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label={config.fieldA.label} htmlFor="fieldA">
                <Input
                  id="fieldA"
                  value={form.recipient}
                  onChange={(e) => set("recipient", e.target.value)}
                  placeholder={config.fieldA.placeholder}
                  className="rounded-sm"
                />
              </Field>
              <Field label={config.fieldB.label} htmlFor="fieldB">
                <Input
                  id="fieldB"
                  value={form.context}
                  onChange={(e) => set("context", e.target.value)}
                  placeholder={config.fieldB.placeholder}
                  className="rounded-sm"
                />
              </Field>
            </div>

            <Field label={config.senderLabel} htmlFor="senderName">
              <Input
                id="senderName"
                value={form.senderName}
                onChange={(e) => set("senderName", e.target.value)}
                placeholder={config.senderPlaceholder}
                className="rounded-sm"
              />
            </Field>

            <Field label="Purpose" htmlFor="purpose">
              <Textarea
                id="purpose"
                value={form.purpose}
                onChange={(e) => set("purpose", e.target.value)}
                placeholder={config.purposePlaceholder}
                rows={3}
                className="rounded-sm"
              />
            </Field>

            <Field label="Key details" htmlFor="details">
              <Textarea
                id="details"
                value={form.details}
                onChange={(e) => set("details", e.target.value)}
                placeholder={config.detailsPlaceholder}
                rows={4}
                className="rounded-sm"
              />
            </Field>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Tone">
                <Select value={form.tone} onValueChange={(v) => set("tone", v as Tone)}>
                  <SelectTrigger className="w-full rounded-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {TONES.map((t) => (
                      <SelectItem key={t} value={t}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Length">
                <Select value={form.length} onValueChange={(v) => set("length", v as Length)}>
                  <SelectTrigger className="w-full rounded-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {LENGTHS.map((l) => (
                      <SelectItem key={l} value={l}>
                        {l}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            </div>

            <Button
              onClick={submit}
              disabled={mutation.isPending}
              className="w-full rounded-sm py-6 text-sm font-semibold tracking-wide"
            >
              {mutation.isPending ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" /> Drafting…
                </>
              ) : (
                config.ctaLabel
              )}
            </Button>
          </div>
        </section>

        {/* Output */}
        <section className="letterpress flex min-h-[28rem] flex-col rounded-sm p-6 sm:p-8">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <h2 className="font-display text-xl font-semibold">{config.outputLabel}</h2>
            {draft && (
              <div className="flex gap-2">
                <IconAction label="Copy" onClick={copyDraft}>
                  <Copy className="size-4" />
                </IconAction>
                <IconAction label="Regenerate" onClick={submit} disabled={mutation.isPending}>
                  <RefreshCw className={`size-4 ${mutation.isPending ? "animate-spin" : ""}`} />
                </IconAction>
                <IconAction label="Clear" onClick={clearAll}>
                  <Trash2 className="size-4" />
                </IconAction>
              </div>
            )}
          </div>

          <div className="mt-6 flex-1">
            {mutation.isPending && !draft ? (
              <div className="space-y-3">
                {[...Array(7)].map((_, i) => (
                  <div
                    key={i}
                    className="h-3 animate-pulse rounded-full bg-muted"
                    style={{ width: `${60 + ((i * 13) % 38)}%` }}
                  />
                ))}
              </div>
            ) : draft ? (
              <article className="whitespace-pre-wrap font-display text-[0.95rem] leading-[1.85] text-foreground">
                {draft}
              </article>
            ) : (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <div className="flex size-14 items-center justify-center rounded-full border border-gold/60 bg-accent/40">
                  <PenLine className="size-5 text-gold-foreground" />
                </div>
                <p className="mt-4 max-w-xs text-sm text-muted-foreground">{config.emptyCopy}</p>
              </div>
            )}
          </div>
        </section>
      </div>

      <footer className="mt-12 border-t border-border pt-6 text-center text-xs text-muted-foreground">
        Drafted with care · Always read before you send.
      </footer>

      <PromptLibraryDialog
        open={libraryOpen}
        onOpenChange={setLibraryOpen}
        onApply={applyPrompt}
        format={config.format}
        types={config.types}
        description={`Pre-written starting points for every ${config.title.toLowerCase()}. Apply one to fill the compose form.`}
      />
    </main>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label
        htmlFor={htmlFor}
        className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground"
      >
        {label}
      </Label>
      {children}
    </div>
  );
}

function IconAction({
  label,
  onClick,
  disabled,
  children,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      disabled={disabled}
      className="rounded-sm border border-border bg-background p-2 text-foreground/70 transition-colors hover:border-gold hover:text-foreground disabled:opacity-50"
    >
      {children}
    </button>
  );
}
