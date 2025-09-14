import React from "react";
import { motion } from "framer-motion";

// -------------------------------------------------------------
// EphoriaX Landing Page (single-file React component)
// TailwindCSS required. Drop into your Vite + React project.
// Optional: framer-motion (already used) and lucide-react (icons inline SVGs here).
// Replace form actions/links with your n8n webhook URLs.
// -------------------------------------------------------------

export default function EphoriaXLandingPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <Header />
      <main>
        <Hero />
        <About />
        <PropertyDataFinder />
        <FutureTools />
        <BetaInvite />
      </main>
      <Footer />
    </div>
  );
}

// -------------------------------------------------------------
// Header
// -------------------------------------------------------------
function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-neutral-950/70 border-b border-neutral-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <LogoMark />
          <div className="leading-tight">
            <div className="text-lg font-semibold tracking-tight">EphoriaX</div>
            <div className="text-xs text-neutral-400 -mt-0.5">Connecting People and Data</div>
          </div>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <a href="#about" className="text-neutral-300 hover:text-white">About</a>
          <a href="#pdf" className="text-neutral-300 hover:text-white">Property Data Finder</a>
          <a href="#future" className="text-neutral-300 hover:text-white">Future Tools</a>
          <a href="#beta" className="text-neutral-300 hover:text-white">Join Beta</a>
          <a href="#contact" className="text-neutral-300 hover:text-white">Contact</a>
        </nav>
        <div className="flex items-center gap-3">
          <a href="#beta" className="inline-flex items-center rounded-xl border border-neutral-700 px-3 py-2 text-sm hover:border-neutral-500">Join Beta</a>
        </div>
      </div>
    </header>
  );
}

// -------------------------------------------------------------
// Hero
// -------------------------------------------------------------
function Hero() {
  return (
    <section className="relative overflow-hidden">
      <HeroBackdrop />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 sm:py-28 lg:py-36">
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight"
        >
          EphoriaX: <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-cyan-400">The Bridge Between People and Data</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="mt-5 max-w-3xl text-base sm:text-lg text-neutral-300"
        >
          For years, YouTube has been the world’s teacher — useful, but noisy and incomplete. EphoriaX builds specialized tools that connect you directly to the data that matters to you.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-8 flex flex-col sm:flex-row gap-3"
        >
          <a
            href="#beta"
            className="inline-flex items-center justify-center rounded-2xl bg-sky-400 px-5 py-3 font-medium text-neutral-900 hover:bg-sky-300 transition"
          >
            Join the Beta
          </a>
          <a
            href="#about"
            className="inline-flex items-center justify-center rounded-2xl border border-neutral-700 px-5 py-3 font-medium hover:border-neutral-500"
          >
            Learn More
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function HeroBackdrop() {
  return (
    <div aria-hidden className="absolute inset-0">
      {/* Gradient base */}
      <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_50%_-10%,rgba(56,189,248,0.18),transparent),radial-gradient(800px_400px_at_70%_10%,rgba(34,211,238,0.14),transparent)]" />
      {/* Abstract bridge over sea of data points */}
      <svg className="absolute inset-x-0 -bottom-8 w-full h-[260px] sm:h-[320px] lg:h-[380px]" viewBox="0 0 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Sea of data dots */}
        {Array.from({ length: 120 }).map((_, i) => {
          const x = (i * 12) % 1440;
          const y = 200 + Math.sin(i / 1.7) * 18 + (i % 3) * 6;
          const opacity = 0.15 + ((i % 7) / 14);
          return <circle key={i} cx={x} cy={y} r="2" fill="#67e8f9" opacity={opacity} />;
        })}
        {/* Stylized bridge path */}
        <path d="M-10 180 C 300 80, 1140 80, 1450 180" stroke="#22d3ee" strokeOpacity="0.6" strokeWidth="2" fill="none" />
        {/* Bridge pillars */}
        {Array.from({ length: 6 }).map((_, i) => {
          const px = 100 + i * 220;
          return <path key={i} d={`M ${px} 180 L ${px} 240`} stroke="#22d3ee" strokeOpacity="0.5" strokeWidth="2" />;
        })}
      </svg>
    </div>
  );
}

// -------------------------------------------------------------
// About
// -------------------------------------------------------------
function About() {
  return (
    <section id="about" className="relative py-20 sm:py-24 border-t border-neutral-800 bg-neutral-950">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-7">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">About EphoriaX</h2>
          <p className="mt-4 text-neutral-300 leading-relaxed">
            We live in a sea of data — vast, unorganized, and often out of reach. The challenge isn’t the lack of information, but finding the right data when you need it. EphoriaX builds tools that cut through the noise and connect people with information that matters. Like tutors focused on a single subject, each tool is designed for one task — and does it well.
          </p>
          <div className="mt-6 inline-flex items-center rounded-2xl bg-neutral-900/60 border border-neutral-800 px-4 py-2 text-sm text-neutral-300">
            <span className="font-medium text-neutral-200">One Task. One Tool. Done Well.</span>
          </div>
        </div>
        <div className="lg:col-span-5">
          <AboutCardGrid />
        </div>
      </div>
    </section>
  );
}

function AboutCardGrid() {
  const items = [
    { title: "Specialized Tools", body: "Each product is purpose-built to master a single task.", icon: CircleCheckIcon },
    { title: "Tutor-Like Guidance", body: "Designed to guide you from question to answer.", icon: CompassIcon },
    { title: "Actionable Outputs", body: "Clean reports and insights you can use immediately.", icon: FileChartIcon },
  ];
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {items.map((it) => (
        <div key={it.title} className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-5">
          <div className="flex items-center gap-3">
            <it.icon className="w-5 h-5 text-sky-300" />
            <div className="font-medium">{it.title}</div>
          </div>
          <p className="mt-2 text-sm text-neutral-300">{it.body}</p>
        </div>
      ))}
    </div>
  );
}

// -------------------------------------------------------------
// Property Data Finder (Flagship)
// -------------------------------------------------------------
function PropertyDataFinder() {
  return (
    <section id="pdf" className="relative py-20 sm:py-24 border-t border-neutral-800 bg-neutral-950">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-10 items-start">
          <div className="flex-1">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">Meet Our First Tool: Property Data Finder</h2>
            <p className="mt-4 text-neutral-300 leading-relaxed">
              Researching property details is slow, fragmented, and often unreliable. Property Data Finder is built for one task: giving inspectors, underwriters, and analysts the property insights they need in minutes.
            </p>
            <p className="mt-3 text-neutral-300 leading-relaxed">
              Think of it as your specialized tutor for real estate data — guiding you through ownership facts, building details, and permit history, so you can focus on making decisions, not chasing records.
            </p>
            <ul className="mt-6 grid sm:grid-cols-2 gap-3">
              {[
                "Property Summaries — age, size, class at a glance",
                "Permit Insights — roofing, electrical, HVAC, plumbing",
                "Hazard Context — fire stations, flood zones, seismic notes",
                "Structured Reports — clean, professional outputs",
              ].map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-neutral-300">
                  <CircleCheckIcon className="mt-0.5 w-4 h-4 text-sky-300" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex gap-3">
              <a href="#beta" className="inline-flex items-center rounded-2xl bg-sky-400 px-4 py-2.5 font-medium text-neutral-900 hover:bg-sky-300 transition">Try Property Data Finder (Beta)</a>
              <a href="#" className="inline-flex items-center rounded-2xl border border-neutral-700 px-4 py-2.5 hover:border-neutral-500">View Sample Report</a>
            </div>
          </div>
          <div className="w-full lg:w-[40%]">
            <ReportMockup />
          </div>
        </div>
      </div>
    </section>
  );
}

function ReportMockup() {
  return (
    <div className="relative rounded-3xl border border-neutral-800 bg-neutral-900/40 p-4 shadow-xl">
      <div className="rounded-2xl bg-neutral-950 border border-neutral-800 p-4">
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium">Property Report</div>
          <div className="h-2 w-24 bg-gradient-to-r from-sky-400 to-cyan-300 rounded-full" />
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
          <Field label="Address" value="719 Da Vinci Ct, El Dorado Hills, CA" />
          <Field label="Year Built" value="2015" />
          <Field label="Size (SF)" value="4,295" />
          <Field label="Beds/Baths" value="4 / 4" />
        </div>
        <div className="mt-4">
          <div className="text-xs font-medium text-neutral-200">Permits</div>
          <ul className="mt-2 space-y-1 text-xs text-neutral-300">
            <li>2016 — NSFD Grading Permit</li>
            <li>2021 — HVAC Replacement</li>
          </ul>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
          <Field label="Nearest Fire Station" value="2.1 mi (estimate)" />
          <Field label="Flood Zone" value="Outside FEMA zones" />
        </div>
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-neutral-800 p-3 bg-neutral-900/50">
      <div className="text-[10px] uppercase tracking-wide text-neutral-400">{label}</div>
      <div className="mt-0.5 text-sm text-neutral-200">{value}</div>
    </div>
  );
}

// -------------------------------------------------------------
// Future Tools Teaser (re-usable card template)
// -------------------------------------------------------------
function FutureTools() {
  const tools = [
    {
      name: "Bible Study Tool",
      desc: "Your study tutor — cross-references, context, and notes in one place.",
      bullets: ["Multi-translation view", "Cross-reference explorer", "Commentary layers"],
    },
    {
      name: "Credit Enhancement Tool",
      desc: "Guides smarter financial steps with transparent, actionable insights.",
      bullets: ["Credit factor breakdown", "Scenario planning", "Next-step checklist"],
    },
    {
      name: "GitHub Helper",
      desc: "Streamlines development workflows and documentation discovery.",
      bullets: ["Repo search", "PR review prompts", "Doc snippets → actions"],
    },
  ];

  return (
    <section id="future" className="relative py-20 sm:py-24 border-t border-neutral-800 bg-neutral-950">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between flex-wrap gap-4">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">More Tools. Same Mission.</h2>
          <a href="#beta" className="text-sm text-sky-300 hover:text-sky-200">Stay Updated →</a>
        </div>
        <p className="mt-3 text-neutral-300 max-w-3xl">
          EphoriaX is a growing ecosystem of specialized tools — each built for one task and designed to act like a tutor that guides you from question to answer.
        </p>
        <div className="mt-8 grid md:grid-cols-3 gap-5">
          {tools.map((t) => (
            <div key={t.name} className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-5">
              <div className="flex items-center gap-3">
                <CompassIcon className="w-5 h-5 text-sky-300" />
                <div className="font-medium">{t.name}</div>
              </div>
              <p className="mt-2 text-sm text-neutral-300">{t.desc}</p>
              <ul className="mt-3 space-y-1 text-sm text-neutral-300">
                {t.bullets.map((b) => (
                  <li key={b} className="flex gap-2"><CircleCheckIcon className="w-4 h-4 text-sky-300 mt-0.5" />{b}</li>
                ))}
              </ul>
              <div className="mt-4">
                <a href="#beta" className="inline-flex items-center rounded-xl border border-neutral-700 px-3 py-2 text-sm hover:border-neutral-500">Join Beta</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// -------------------------------------------------------------
// Beta Invite (form wires to n8n)
// -------------------------------------------------------------
function BetaInvite() {
  return (
    <section id="beta" className="relative py-20 sm:py-24 border-t border-neutral-800 bg-neutral-950">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-neutral-800 bg-gradient-to-br from-neutral-900 to-neutral-950 p-6 sm:p-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/2">
              <h3 className="text-xl sm:text-2xl font-semibold tracking-tight">Help Shape the Future</h3>
              <p className="mt-2 text-neutral-300 text-sm sm:text-base">
                Join our beta community for early access to new tools. Your feedback helps us build solutions that work better for everyone.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-neutral-300">
                <li className="flex gap-2"><CircleCheckIcon className="w-4 h-4 text-sky-300 mt-0.5" />Early feature access</li>
                <li className="flex gap-2"><CircleCheckIcon className="w-4 h-4 text-sky-300 mt-0.5" />Direct input to roadmap</li>
                <li className="flex gap-2"><CircleCheckIcon className="w-4 h-4 text-sky-300 mt-0.5" />Priority support</li>
              </ul>
            </div>
            <div className="lg:w-1/2">
              <BetaForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BetaForm() {
  return (
    <form
      method="POST"
      action="/api/n8n-webhook" // TODO: replace with your actual n8n intake webhook URL
      className="grid grid-cols-1 gap-4"
    >
      <div>
        <label htmlFor="name" className="block text-sm text-neutral-300 mb-1">Name</label>
        <input id="name" name="name" required className="w-full rounded-xl bg-neutral-900 border border-neutral-700 px-3 py-2.5 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-sky-400/50" placeholder="Your name" />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm text-neutral-300 mb-1">Email</label>
        <input id="email" name="email" type="email" required className="w-full rounded-xl bg-neutral-900 border border-neutral-700 px-3 py-2.5 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-sky-400/50" placeholder="you@example.com" />
      </div>
      <div>
        <label htmlFor="company" className="block text-sm text-neutral-300 mb-1">Company / Role (optional)</label>
        <input id="company" name="company" className="w-full rounded-xl bg-neutral-900 border border-neutral-700 px-3 py-2.5 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-sky-400/50" placeholder="Inspector, Underwriter, Analyst…" />
      </div>
      <div>
        <label htmlFor="interest" className="block text-sm text-neutral-300 mb-1">Primary Interest</label>
        <select id="interest" name="interest" className="w-full rounded-xl bg-neutral-900 border border-neutral-700 px-3 py-2.5 text-neutral-100 focus:outline-none focus:ring-2 focus:ring-sky-400/50">
          <option>Property Data Finder</option>
          <option>Bible Study Tool</option>
          <option>Credit Enhancement Tool</option>
          <option>GitHub Helper</option>
          <option>Other</option>
        </select>
      </div>
      <div>
        <label htmlFor="message" className="block text-sm text-neutral-300 mb-1">Anything we should know?</label>
        <textarea id="message" name="message" rows={4} className="w-full rounded-xl bg-neutral-900 border border-neutral-700 px-3 py-2.5 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-sky-400/50" placeholder="Use-cases, workflows, integrations…" />
      </div>
      <button type="submit" className="mt-2 inline-flex items-center justify-center rounded-2xl bg-sky-400 px-5 py-3 font-medium text-neutral-900 hover:bg-sky-300 transition">
        Request Beta Access
      </button>
      <p className="text-xs text-neutral-400 mt-2">By submitting, you agree to be contacted about the beta program.</p>
    </form>
  );
}

// -------------------------------------------------------------
// Footer
// -------------------------------------------------------------
function Footer() {
  return (
    <footer id="contact" className="border-t border-neutral-800 bg-neutral-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-3">
            <LogoMark />
            <div className="leading-tight">
              <div className="font-semibold">EphoriaX</div>
              <div className="text-xs text-neutral-400">Connecting People and Data</div>
            </div>
          </div>
          <p className="mt-3 text-sm text-neutral-300 max-w-xs">One Task. One Tool. Done Well.</p>
        </div>
        <div>
          <div className="font-medium">Products</div>
          <ul className="mt-3 space-y-2 text-sm text-neutral-300">
            <li><a href="#pdf" className="hover:text-white">Property Data Finder</a></li>
            <li className="text-neutral-500">Bible Study Tool (coming)</li>
            <li className="text-neutral-500">Credit Enhancement (coming)</li>
            <li className="text-neutral-500">GitHub Helper (coming)</li>
          </ul>
        </div>
        <div>
          <div className="font-medium">Company</div>
          <ul className="mt-3 space-y-2 text-sm text-neutral-300">
            <li><a href="#about" className="hover:text-white">About</a></li>
            <li><a href="#future" className="hover:text-white">Future Tools</a></li>
            <li><a href="#beta" className="hover:text-white">Beta Program</a></li>
          </ul>
        </div>
        <div>
          <div className="font-medium">Contact</div>
          <ul className="mt-3 space-y-2 text-sm text-neutral-300">
            <li><a href="mailto:paulreaume@proton.me" className="hover:text-white">paulreaume@proton.me</a></li>
            <li><a href="tel:19168715763" className="hover:text-white">916‑871‑5763</a></li>
            <li className="text-neutral-400">Stockton / San Joaquin County, CA</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-neutral-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between text-xs text-neutral-500">
          <div>© {new Date().getFullYear()} EphoriaX. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-neutral-300">Privacy</a>
            <a href="#" className="hover:text-neutral-300">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// -------------------------------------------------------------
// Simple inline icons (no extra deps)
// -------------------------------------------------------------
function CircleCheckIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z" stroke="currentColor" strokeWidth="1.5"/>
      <path d="m8.5 12.5 2.5 2.5 4.5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function CompassIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M15.5 8.5 10 10l-1.5 5.5 5.5-1.5 1.5-5.5Z" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  );
}

function FileChartIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M14 2H8a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8l-6-6Z" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M14 2v6h6" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M9 16v-3M12 16v-5M15 16v-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function LogoMark({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      {/* A simple abstract bridge mark over waves */}
      <rect x="2" y="2" width="44" height="44" rx="10" className="fill-neutral-900 stroke-neutral-800" strokeWidth="1" />
      <path d="M8 28 C 16 18, 32 18, 40 28" stroke="#22d3ee" strokeWidth="2" fill="none" />
      <path d="M8 32 C 16 22, 32 22, 40 32" stroke="#67e8f9" strokeWidth="1.5" fill="none" opacity="0.7" />
      <circle cx="12" cy="30" r="1.2" fill="#67e8f9" />
      <circle cx="24" cy="26" r="1.2" fill="#67e8f9" />
      <circle cx="36" cy="30" r="1.2" fill="#67e8f9" />
    </svg>
  );
}
