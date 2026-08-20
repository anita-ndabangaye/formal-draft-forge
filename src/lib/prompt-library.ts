export type Format = "email" | "social" | "blog";

export type Tone = "Formal" | "Friendly" | "Direct" | "Warm" | "Persuasive";
export type Length = "Short" | "Medium" | "Long";

export interface DocType {
  id: string;
  label: string;
  blurb: string;
}

export interface LibraryPrompt {
  id: string;
  format: Format;
  type: string;
  title: string;
  description: string;
  purpose: string;
  details: string;
  tone: Tone;
  length: Length;
}

export interface FormatConfig {
  format: Format;
  /** Route path */
  path: string;
  navLabel: string;
  title: string;
  kicker: string;
  intro: string;
  typeLabel: string;
  types: DocType[];
  /** Optional context fields, in order */
  fieldA: { key: "recipient"; label: string; placeholder: string };
  fieldB: { key: "context"; label: string; placeholder: string };
  senderLabel: string;
  senderPlaceholder: string;
  purposePlaceholder: string;
  detailsPlaceholder: string;
  ctaLabel: string;
  outputLabel: string;
  emptyCopy: string;
  defaultType: string;
  defaultTone: Tone;
  defaultLength: Length;
}

export const EMAIL_TYPES: DocType[] = [
  { id: "meeting-request", label: "Meeting Request", blurb: "Propose a time with a clear agenda." },
  { id: "thank-you", label: "Thank You", blurb: "Express specific, sincere gratitude." },
  { id: "business-inquiry", label: "Business Inquiry", blurb: "Ask about services, pricing, or partnership." },
];

export const SOCIAL_TYPES: DocType[] = [
  { id: "announcement", label: "Announcement", blurb: "Share news with a strong opening hook." },
  { id: "product-launch", label: "Product Launch", blurb: "Introduce something new and drive clicks." },
  { id: "milestone", label: "Milestone", blurb: "Celebrate a result and credit the team." },
  { id: "insight", label: "Insight", blurb: "Share a lesson or point of view." },
  { id: "engagement", label: "Engagement Question", blurb: "Invite replies from your audience." },
];

export const BLOG_TYPES: DocType[] = [
  { id: "how-to", label: "How-To Guide", blurb: "Walk readers through a process step by step." },
  { id: "listicle", label: "Listicle", blurb: "A numbered rundown that is easy to skim." },
  { id: "opinion", label: "Opinion Piece", blurb: "Argue a clear position on a trend." },
  { id: "case-study", label: "Case Study", blurb: "Problem, approach, result." },
  { id: "announcement-post", label: "Announcement", blurb: "Explain a launch or change in depth." },
];

export const PROMPT_LIBRARY: LibraryPrompt[] = [
  // ---------- Email ----------
  {
    id: "mr-1",
    format: "email",
    type: "meeting-request",
    title: "Intro call with a prospect",
    description: "Short, respectful, easy to say yes to.",
    purpose: "Request a 20-minute introductory call.",
    details:
      "One line on who I am; the specific value in meeting; three proposed time slots; offer to work around their calendar; agenda in two bullets.",
    tone: "Direct",
    length: "Short",
  },
  {
    id: "mr-2",
    format: "email",
    type: "meeting-request",
    title: "Internal project sync",
    description: "Agenda-first request to colleagues.",
    purpose: "Schedule a project sync with the team.",
    details:
      "Project name and current blocker; agenda items; who needs to attend; suggested 30-minute slot next week; pre-reading link.",
    tone: "Friendly",
    length: "Short",
  },
  {
    id: "ty-1",
    format: "email",
    type: "thank-you",
    title: "After an interview",
    description: "Reinforces fit while thanking the panel.",
    purpose: "Thank the interviewer and restate my interest in the role.",
    details:
      "Thank them for their time; reference one specific topic we discussed; one sentence reinforcing my fit; note that I'm happy to share references.",
    tone: "Formal",
    length: "Short",
  },
  {
    id: "ty-2",
    format: "email",
    type: "thank-you",
    title: "Thanking a mentor or helper",
    description: "Specific, personal gratitude.",
    purpose: "Thank someone for advice or help they gave me.",
    details:
      "What exactly they did; the outcome it produced for me; how I plan to pay it forward; an offer to help them in return.",
    tone: "Warm",
    length: "Short",
  },
  {
    id: "bi-1",
    format: "email",
    type: "business-inquiry",
    title: "Pricing and availability",
    description: "Clear scope, clear questions.",
    purpose: "Enquire about services, pricing and lead times.",
    details:
      "Who we are in one line; scope of what we need; volume and timeline; specific questions on pricing tiers and availability; budget range if helpful.",
    tone: "Direct",
    length: "Medium",
  },
  {
    id: "bi-2",
    format: "email",
    type: "business-inquiry",
    title: "Partnership proposal",
    description: "Frames mutual benefit up front.",
    purpose: "Propose a partnership or collaboration.",
    details:
      "Brief intro to my company; why their audience and ours align; a concrete first collaboration idea; what each side contributes; ask for a call.",
    tone: "Persuasive",
    length: "Medium",
  },

  // ---------- Social ----------
  {
    id: "sm-1",
    format: "social",
    type: "announcement",
    title: "Company news announcement",
    description: "Hook, news, why it matters, call to action.",
    purpose: "Announce company news and explain why it matters to our audience.",
    details:
      "The news in one sentence; why it matters to customers; one supporting detail or number; link placeholder; 3-5 hashtags.",
    tone: "Direct",
    length: "Short",
  },
  {
    id: "sm-2",
    format: "social",
    type: "product-launch",
    title: "Product launch teaser",
    description: "Punchy launch post that drives clicks.",
    purpose: "Tease a new product or feature and drive traffic to the launch page.",
    details:
      "Product name and the single problem it solves; one concrete benefit; launch date; link placeholder; short lines for readability; clear call to action.",
    tone: "Persuasive",
    length: "Short",
  },
  {
    id: "sm-3",
    format: "social",
    type: "milestone",
    title: "Milestone celebration",
    description: "Celebratory post with a credit line.",
    purpose: "Celebrate a company milestone and thank the people behind it.",
    details:
      "The milestone and the number behind it; a one-line hook; who to credit; what it means for customers; a closing question.",
    tone: "Warm",
    length: "Short",
  },
  {
    id: "sm-4",
    format: "social",
    type: "insight",
    title: "Lesson learned",
    description: "Short story that lands one takeaway.",
    purpose: "Share a professional lesson learned and the takeaway for others.",
    details:
      "The situation in two lines; what went wrong or surprised me; the lesson in a single sentence; how readers can apply it.",
    tone: "Friendly",
    length: "Medium",
  },
  {
    id: "sm-5",
    format: "social",
    type: "engagement",
    title: "Audience question",
    description: "Invites replies without sounding like bait.",
    purpose: "Ask the audience a question that sparks useful discussion.",
    details:
      "Set up the topic in two lines; state my own answer briefly; ask the question plainly; invite people to reply with their approach.",
    tone: "Friendly",
    length: "Short",
  },

  // ---------- Blog ----------
  {
    id: "bp-1",
    format: "blog",
    type: "how-to",
    title: "Step-by-step how-to guide",
    description: "Practical article with headings and a takeaway.",
    purpose: "Write a practical how-to article that walks readers through a process.",
    details:
      "Topic and target reader; the outcome they'll achieve; 4-6 numbered steps; common pitfalls to avoid; a short conclusion with next steps.",
    tone: "Friendly",
    length: "Long",
  },
  {
    id: "bp-2",
    format: "blog",
    type: "listicle",
    title: "Numbered rundown",
    description: "Skimmable list with a short intro and close.",
    purpose: "Write a numbered list article on a topic my readers care about.",
    details:
      "Topic and number of items; one short paragraph per item with a concrete example; intro that frames the problem; closing summary.",
    tone: "Friendly",
    length: "Medium",
  },
  {
    id: "bp-3",
    format: "blog",
    type: "opinion",
    title: "Thought leadership piece",
    description: "Argues a clear position, backed by reasoning.",
    purpose: "Publish an opinion piece arguing a clear position on an industry trend.",
    details:
      "The trend and my position; two or three supporting arguments; one counter-argument addressed honestly; a concrete example; closing call to reflection.",
    tone: "Direct",
    length: "Long",
  },
  {
    id: "bp-4",
    format: "blog",
    type: "case-study",
    title: "Customer case study",
    description: "Problem, approach, measurable result.",
    purpose: "Write a customer case study showing the problem, our approach and the results.",
    details:
      "Client and industry; the problem and its cost; what we did in three phases; measurable results with numbers; a client quote placeholder; call to action.",
    tone: "Formal",
    length: "Long",
  },
  {
    id: "bp-5",
    format: "blog",
    type: "announcement-post",
    title: "Launch announcement article",
    description: "Deeper explanation behind a launch.",
    purpose: "Announce a launch and explain the thinking behind it.",
    details:
      "What we launched; why we built it; who it's for; three key capabilities; availability and pricing placeholders; where to get started.",
    tone: "Persuasive",
    length: "Medium",
  },
];

export const TONES: Tone[] = ["Formal", "Friendly", "Direct", "Warm", "Persuasive"];
export const LENGTHS: Length[] = ["Short", "Medium", "Long"];

export const FORMATS: Record<Format, FormatConfig> = {
  email: {
    format: "email",
    path: "/",
    navLabel: "Email",
    title: "Email",
    kicker: "Correspondence Desk",
    intro:
      "A drafting desk for letters that matter. Choose the kind of email, set the tone, and receive a composed, ready-to-send draft.",
    typeLabel: "Email type",
    types: EMAIL_TYPES,
    fieldA: { key: "recipient", label: "Recipient name", placeholder: "Ms. Adebayo" },
    fieldB: { key: "context", label: "Recipient role / company", placeholder: "Hiring Manager, Northwind" },
    senderLabel: "Your name",
    senderPlaceholder: "Anita Ndabangaye",
    purposePlaceholder: "What should this email achieve?",
    detailsPlaceholder: "Dates, names, numbers, attachments, anything that must appear.",
    ctaLabel: "Generate Email",
    outputLabel: "Draft",
    emptyCopy: "Your composed letter will appear here, ready to copy into your mail client.",
    defaultType: "meeting-request",
    defaultTone: "Formal",
    defaultLength: "Medium",
  },
  social: {
    format: "social",
    path: "/social",
    navLabel: "Social Post",
    title: "Social Post",
    kicker: "Broadcast Desk",
    intro:
      "Short-form posts with a hook, a point and a call to action. Pick the kind of post, set the tone, and get something ready to publish.",
    typeLabel: "Post type",
    types: SOCIAL_TYPES,
    fieldA: { key: "recipient", label: "Platform", placeholder: "LinkedIn" },
    fieldB: { key: "context", label: "Audience", placeholder: "Operations leaders in logistics" },
    senderLabel: "Author / brand",
    senderPlaceholder: "Northwind Studio",
    purposePlaceholder: "What should this post achieve?",
    detailsPlaceholder: "Numbers, names, links, hashtags, anything that must appear.",
    ctaLabel: "Generate Post",
    outputLabel: "Post",
    emptyCopy: "Your post will appear here, ready to paste into your scheduler.",
    defaultType: "announcement",
    defaultTone: "Friendly",
    defaultLength: "Short",
  },
  blog: {
    format: "blog",
    path: "/blog",
    navLabel: "Blog Post",
    title: "Blog Post",
    kicker: "Editorial Desk",
    intro:
      "Longer-form articles with a title, structured sections and a closing takeaway. Choose the article type and let the draft take shape.",
    typeLabel: "Article type",
    types: BLOG_TYPES,
    fieldA: { key: "recipient", label: "Publication / blog", placeholder: "The Northwind Journal" },
    fieldB: { key: "context", label: "Audience", placeholder: "Small business owners" },
    senderLabel: "Author byline",
    senderPlaceholder: "Anita Ndabangaye",
    purposePlaceholder: "What should this article cover and achieve?",
    detailsPlaceholder: "Key points, sources, examples, keywords, anything that must appear.",
    ctaLabel: "Generate Article",
    outputLabel: "Article",
    emptyCopy: "Your article will appear here, ready to move into your CMS.",
    defaultType: "how-to",
    defaultTone: "Friendly",
    defaultLength: "Long",
  },
};
