export type EmailTypeId =
  | "job-application"
  | "apology"
  | "meeting-request"
  | "thank-you"
  | "business-inquiry"
  | "social-media-post"
  | "blog-post";

export type Tone = "Formal" | "Friendly" | "Direct" | "Warm" | "Persuasive";
export type Length = "Short" | "Medium" | "Long";

export interface EmailType {
  id: EmailTypeId;
  label: string;
  blurb: string;
}

export const EMAIL_TYPES: EmailType[] = [
  { id: "job-application", label: "Job Application", blurb: "Introduce yourself and make the case for a role." },
  { id: "apology", label: "Apology", blurb: "Acknowledge, take responsibility, and repair." },
  { id: "meeting-request", label: "Meeting Request", blurb: "Propose a time with a clear agenda." },
  { id: "thank-you", label: "Thank You", blurb: "Express specific, sincere gratitude." },
  { id: "business-inquiry", label: "Business Inquiry", blurb: "Ask about services, pricing, or partnership." },
  { id: "social-media-post", label: "Social Media Post", blurb: "A short, scroll-stopping post with a clear hook." },
  { id: "blog-post", label: "Blog Post", blurb: "A structured article with headings and a closing takeaway." },
];

export interface LibraryPrompt {
  id: string;
  type: EmailTypeId;
  title: string;
  description: string;
  purpose: string;
  details: string;
  tone: Tone;
  length: Length;
}

export const PROMPT_LIBRARY: LibraryPrompt[] = [
  {
    id: "ja-1",
    type: "job-application",
    title: "Cold application to a posted role",
    description: "A concise cover-letter email for an advertised position.",
    purpose: "Apply for an advertised position and request an interview.",
    details:
      "Role and where I saw it; 2-3 relevant achievements with numbers; why this company specifically; CV attached; availability for a call.",
    tone: "Formal",
    length: "Medium",
  },
  {
    id: "ja-2",
    type: "job-application",
    title: "Referred by a mutual contact",
    description: "Leads with the referral, then the fit.",
    purpose: "Apply for a role after being referred by a mutual contact.",
    details:
      "Name of referrer and how we know each other; the role; short summary of my background; one standout project; ask for a short intro call.",
    tone: "Warm",
    length: "Short",
  },
  {
    id: "ap-1",
    type: "apology",
    title: "Missed deadline",
    description: "Owns the delay and offers a concrete recovery plan.",
    purpose: "Apologise for missing an agreed deadline and set a new one.",
    details:
      "What was due and when; brief honest reason without excuses; impact acknowledged; new delivery date; what I'm changing to prevent a repeat.",
    tone: "Formal",
    length: "Short",
  },
  {
    id: "ap-2",
    type: "apology",
    title: "Service issue with a client",
    description: "Repairs trust after a customer-facing mistake.",
    purpose: "Apologise to a client for a service failure and offer remedy.",
    details:
      "Describe the issue plainly; sincere apology; what we've already fixed; goodwill gesture or credit offered; direct contact for follow-up.",
    tone: "Warm",
    length: "Medium",
  },
  {
    id: "mr-1",
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
    type: "business-inquiry",
    title: "Partnership proposal",
    description: "Frames mutual benefit up front.",
    purpose: "Propose a partnership or collaboration.",
    details:
      "Brief intro to my company; why their audience and ours align; a concrete first collaboration idea; what each side contributes; ask for a call.",
    tone: "Persuasive",
    length: "Medium",
  },
];

export const TONES: Tone[] = ["Formal", "Friendly", "Direct", "Warm", "Persuasive"];
export const LENGTHS: Length[] = ["Short", "Medium", "Long"];
