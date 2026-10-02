import { ServicePageTemplate, TerminalBlock, type ServicePageContent } from "@/components/ServicePageTemplate";
import { seo } from "@/constants/seo";
import {
  AiCodeBlock, SaasTerminalBlock, DnaHelix3D, AppFrame3D, DataCube3D, OrbitRings3D, SocialGraph3D,
} from "@/components/AiMlVisuals";

// Shared across pages - only claims already published elsewhere on the site.
const stats = [
  { value: "150+", label: "Projects Shipped" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "5/5", label: "Rating for Cost on Clutch" },
  { value: "20+", label: "Industries Served" },
];

const sharedWhyUs = {
  ownership: { title: "Full Ownership, No Lock-In", desc: "You own the code, data, accounts, and models. Everything we build is documented and handed over - no hidden dependencies on us." },
  timezone: { title: "Working Hours That Overlap With NZ & AU", desc: "Our team schedules daily overlap with New Zealand and Australian business hours, so you get same-day answers, live calls, and weekly demos." },
  transparent: { title: "Transparent, Fixed-Scope Pricing", desc: "Clear scopes, milestones, and pricing before work begins. You always know what you're paying for and what's being delivered next." },
  senior: { title: "Senior-Led Delivery", desc: "Every engagement is led by senior engineers and strategists who have shipped products in legal, agriculture, fintech, health, and education." },
};

const aiAutomation: ServicePageContent = {
  slug: "ai-automation",
  name: "AI & Automation",
  meta: seo("/services/ai-automation"),
  hero: {
    heading: "AI & Automation",
    intro: "Custom AI agents, LLM solutions, and workflow automation that remove manual work and plug straight into the tools your team already uses.",
    cta: "Book an AI Consultation",
  },
  valueProp: {
    heading: "AI That Does Real Work in Your Business",
    intro: "Most AI projects stop at a demo. Ours are built on your own documents and data, connected to the tools your team uses, and put into daily use.",
    problems: [
      "Your team spends hours on repetitive admin, data entry, and copy-paste between systems?",
      "Sitting on documents and data, but can't search or extract insights from them?",
      "Want to use AI but don't know which use cases are realistic or worth the spend?",
      "Paying for AI tools that never reach production or deliver ROI?",
      "Worried about privacy, client confidentiality, or compliance with AI?",
    ],
    answers: [
      { title: "Workflow Automation", desc: "We map the manual steps, then automate them end to end - intake, approvals, data entry, reporting, and notifications - with humans in the loop where it matters." },
      { title: "Document Intelligence & RAG", desc: "We turn contracts, PDFs, emails, and records into a searchable knowledge base your team can question in plain English, with answers that cite their sources." },
      { title: "AI Strategy & Use-Case Discovery", desc: "A short discovery sprint ranks your use cases by value and feasibility, so you invest in the two or three that will pay back first." },
      { title: "Production-Grade Delivery", desc: "Monitoring, evaluation, guardrails, and cost controls are built in from day one - not bolted on after a proof of concept." },
      { title: "Private & Compliant by Design", desc: "We design around the NZ Privacy Act 2020 and Australian Privacy Principles, with data residency, access controls, and audit trails as standard." },
    ],
  },
  services: {
    heading: "AI & Automation Services Overview",
    intro: "From a 4-6 week proof of value to fully integrated AI systems - everything we build is designed to reach production and keep improving.",
    cards: [
      { title: "AI Agents & Assistants", desc: "Custom AI agents that answer questions, draft documents, triage requests, and take actions across your systems - trained on your own knowledge." },
      { title: "LLM & RAG Solutions", desc: "Retrieval-augmented generation over your documents and data, using OpenAI, Claude, or open-source models - accurate, cited, and access-controlled." },
      { title: "Business Process Automation", desc: "End-to-end automation of intake, approvals, invoicing, reporting, and data entry - connecting your CRM, email, accounting, and practice tools." },
      { title: "Document Intelligence", desc: "Extract, classify, and summarise information from contracts, forms, invoices, and records - turning unstructured documents into structured data." },
      { title: "Proof of Value / AI Prototype", desc: "A working AI prototype in 4-6 weeks that tests your hypothesis with real data before you commit to a full build." },
      { title: "Predictive Analytics & ML", desc: "Custom machine learning models for forecasting, scoring, and anomaly detection - deployed with monitoring and retraining pipelines." },
    ],
  },
  visual: {
    heading: "Built to Run Every Day",
    desc: "Every AI system we ship is tested against real examples, monitored for accuracy and cost, and limited to the tasks you approve. When it is unsure, it hands over to a person.",
    terminal: <AiCodeBlock />,
  },
  stats,
  techStack: {
    intro: "We pick the right model and tooling for each job - frontier LLMs where quality matters, open-source where privacy and cost matter, and automation platforms where speed matters.",
    items: [
      { name: "OpenAI", desc: "GPT models for reasoning, drafting, extraction, and agents - with structured outputs and function calling." },
      { name: "Claude", desc: "Anthropic's Claude models for long-document analysis, careful reasoning, and safe, reliable assistants." },
      { name: "LangChain", desc: "Orchestration for RAG pipelines, multi-step agents, and tool use across your systems." },
      { name: "Python", desc: "The core language for our AI, data, and machine learning work - from APIs to model training." },
      { name: "PyTorch", desc: "Custom model training and fine-tuning when an off-the-shelf model isn't enough." },
      { name: "Hugging Face", desc: "Open-source models for private, self-hosted AI where data must stay in your environment." },
      { name: "Make", desc: "Visual automation for fast, maintainable workflows your team can understand and extend." },
      { name: "Zapier", desc: "Quick integrations across thousands of SaaS apps for lightweight automations." },
    ],
  },
  whyUs: [
    sharedWhyUs.senior,
    { title: "Hands-On LegalTech & AI Experience", desc: "We've built AI chatbots for legal professionals, e-signature platforms, and lawyer-client applications - we know how sensitive data must be handled." },
    sharedWhyUs.timezone,
    sharedWhyUs.ownership,
    sharedWhyUs.transparent,
  ],
  sideVisual: <DnaHelix3D className="h-[500px] w-full" />,
  industries: {
    heading: "AI & Automation Across Industries",
    items: [
      { title: "LegalTech & Law Firms", points: [
        "Legal AI assistants: Chatbots that answer questions over precedents, templates, and firm knowledge - with citations lawyers can verify.",
        "Contract review & clause extraction: Flag risky clauses, missing terms, and key dates across hundreds of documents in minutes.",
        "Client intake automation: Capture, qualify, and route new enquiries automatically, with conflict-check data ready for review.",
      ] },
      { title: "Agriculture & AgriTech", points: [
        "Yield and demand forecasting: ML models that use weather, soil, and historical data to plan harvests, inputs, and logistics.",
        "Compliance and reporting automation: Pull farm records into the reports regulators and processors require, without manual re-entry.",
        "Computer vision: Detect crop disease, count stock, and grade produce from drone, camera, or phone images.",
      ] },
      { title: "Education & EdTech", points: [
        "Adaptive learning: AI that personalises content difficulty and pacing to each learner.",
        "Automated feedback: NLP models that assess written work and deliver instant, consistent feedback.",
        "Student retention prediction: Spot at-risk learners early from engagement signals.",
      ] },
      { title: "FinTech & Finance", points: [
        "Fraud and anomaly detection: Behavioural models that flag unusual transactions in real time.",
        "Document processing: Automate KYC, loan, and invoice processing with extraction and validation.",
        "Forecasting: Cash-flow and risk forecasting from historical and alternative data.",
      ] },
      { title: "Health & Wellness", points: [
        "Clinical note summarisation: Turn unstructured notes and referrals into structured, searchable records.",
        "Patient triage assistants: AI-assisted intake that routes patients to the right care faster.",
        "Operational forecasting: Predict demand and no-shows to plan staff and appointments.",
      ] },
    ],
  },
  process: {
    steps: [
      { num: "01", title: "Discovery & Use-Case Ranking", desc: "We map your workflows and data, then rank AI and automation opportunities by value, feasibility, and risk." },
      { num: "02", title: "Data Preparation", desc: "We connect, clean, and structure the data the solution needs - with privacy and access controls agreed up front." },
      { num: "03", title: "Prototype & Evaluate", desc: "A working prototype tested against real examples, with accuracy, cost, and hallucination metrics you can see." },
      { num: "04", title: "Build & Integrate", desc: "We harden the solution and integrate it into your systems, email, CRM, or practice management tools." },
      { num: "05", title: "Launch & Train", desc: "Staged rollout with team training, documentation, and clear escalation paths for edge cases." },
      { num: "06", title: "Monitor & Improve", desc: "Ongoing monitoring of quality, cost, and usage, with regular improvements as your needs evolve." },
    ],
    note: "* Every AI project is different - we adapt the process to your data, risk, and timeline.",
  },
  faqs: [
    { q: "How much does an AI or automation project cost?", a: "Most clients start with a fixed-price discovery or proof of value, typically delivered in 4-6 weeks. Full builds are scoped and priced after that, so you only invest further once the value is proven." },
    { q: "Is our data safe when using AI models like ChatGPT or Claude?", a: "Yes. We use enterprise API terms that exclude your data from model training, apply strict access controls, and can deploy open-source models in your own cloud when data must not leave your environment." },
    { q: "Do you work with businesses in New Zealand and Australia?", a: "Yes - New Zealand and Australia are our focus markets. We schedule overlapping hours for calls and design around the NZ Privacy Act 2020 and the Australian Privacy Principles." },
    { q: "Can AI integrate with the software we already use?", a: "Usually, yes. We connect AI and automations to CRMs, accounting software like Xero, practice management systems, email, and document storage through their APIs." },
  ],
  cta: { heading: "Which task would you hand to AI first?", label: "Book an AI Consultation" },
};

const customSoftware: ServicePageContent = {
  slug: "custom-software",
  name: "Custom Software Development",
  meta: seo("/services/custom-software"),
  hero: {
    heading: "Custom Software Development",
    intro: "Web platforms, SaaS products, mobile apps, and internal systems - designed, built, and scaled by one senior team, from first sprint to production.",
    cta: "Start Your Project",
  },
  valueProp: {
    heading: "Software That Fits How You Work",
    intro: "Off-the-shelf tools make your team work around them. We build software around your process, and we keep improving it as the business grows.",
    problems: [
      "Running the business on spreadsheets, email threads, and disconnected tools?",
      "Off-the-shelf software doesn't fit your workflow - and the workarounds keep growing?",
      "Need a client portal or app, but past vendors missed deadlines or went quiet?",
      "Have a product idea and need an MVP fast enough to test with real customers?",
      "Stuck with a legacy system that's slow, fragile, and hard to change?",
    ],
    answers: [
      { title: "Custom Internal Systems", desc: "We replace spreadsheet chaos with a single, secure system - dashboards, workflows, permissions, and reporting built around your process." },
      { title: "Workflow-First Design", desc: "We start with how your team works today, then design software that removes the workarounds instead of adding new ones." },
      { title: "Predictable Delivery", desc: "Fixed-scope milestones, weekly demos, and a shared board mean you always know what's done, what's next, and what it costs." },
      { title: "MVP in Weeks, Not Months", desc: "A lean, production-grade MVP that gets real customer feedback quickly - built on foundations that scale when it works." },
      { title: "Legacy Modernisation", desc: "We modernise module by module, so the business keeps running while old systems are replaced safely." },
    ],
  },
  services: {
    heading: "Custom Software Development Services",
    intro: "One team for the full lifecycle - product strategy, UX, engineering, launch, and ongoing support.",
    cards: [
      { title: "Web Application Development", desc: "Fast, secure web applications and client portals built with React, Next.js, and Node.js - responsive on every device." },
      { title: "SaaS Product Development", desc: "Multi-tenant SaaS platforms with subscriptions, billing, roles, and analytics - engineered to scale from day one.", slug: "saas" },
      { title: "Mobile App Development", desc: "iOS and Android apps with React Native, Flutter, Swift, and Kotlin - from first release to App Store optimisation.", slug: "mobile" },
      { title: "Enterprise & Internal Software", desc: "Dashboards, workflow systems, and internal tools that streamline operations and replace spreadsheets.", slug: "enterprise" },
      { title: "MVP & Proof of Concept", desc: "Lean MVPs and prototypes that validate your idea with real users and investors - fast.", slug: "mvp" },
      { title: "Product Strategy & Architecture", desc: "System design, technical due diligence, and CTO-as-a-service to de-risk big decisions.", slug: "strategy" },
    ],
  },
  visual: {
    heading: "Easy to Maintain, Ready to Grow",
    desc: "Automated tests, code review, continuous deployment and documented architecture are part of every build. The next developer, ours or yours, can pick it up without guesswork.",
    terminal: <SaasTerminalBlock />,
  },
  stats,
  techStack: {
    intro: "We choose proven, well-supported technologies - so your software is easy to hire for, maintain, and scale long after launch.",
    items: [
      { name: "React", desc: "Fast, component-based interfaces for web apps, dashboards, and client portals." },
      { name: "Next.js", desc: "SEO-friendly, high-performance web applications with server rendering." },
      { name: "Node.js", desc: "Scalable APIs and back-end services with a single language across the stack." },
      { name: "TypeScript", desc: "Type-safe code that catches bugs early and keeps large codebases maintainable." },
      { name: "React Native", desc: "Cross-platform iOS and Android apps from a single codebase." },
      { name: "Flutter", desc: "Visually rich, natively compiled mobile apps from one codebase." },
      { name: "PostgreSQL", desc: "Reliable, secure relational data for transactional and reporting workloads." },
      { name: "AWS", desc: "Secure, scalable cloud hosting with data residency options in Australia." },
    ],
  },
  whyUs: [
    sharedWhyUs.senior,
    { title: "Proven in Regulated Industries", desc: "We've built e-signature platforms, lawyer-client applications, and farm management software - where security and reliability are non-negotiable." },
    sharedWhyUs.timezone,
    sharedWhyUs.transparent,
    sharedWhyUs.ownership,
  ],
  sideVisual: <AppFrame3D className="h-[500px] w-full" />,
  industries: {
    heading: "Custom Software Across Industries",
    items: [
      { title: "LegalTech & Law Firms", points: [
        "Client portals: Secure portals for document sharing, matter updates, and messaging between lawyers and clients.",
        "E-signature and document workflows: Legally binding signing, templates, and approvals built into your process.",
        "Practice and matter tools: Custom intake, task, and billing workflows that fit how your firm works.",
      ] },
      { title: "Agriculture & AgriTech", points: [
        "Farm management platforms: Field, stock, and financial records in one system - like the Bushel platform we helped build.",
        "Mobile field apps: Offline-ready apps for recording work, inspections, and compliance data on the farm.",
        "Supply-chain and traceability systems: Track produce from paddock to processor with full audit trails.",
      ] },
      { title: "Education & EdTech", points: [
        "Learning platforms: Course delivery, assessments, and progress tracking for learners and educators.",
        "Student and admin portals: Enrolment, scheduling, and communication in one place.",
        "Mobile learning apps: Engaging, accessible learning on any device.",
      ] },
      { title: "FinTech & Finance", points: [
        "Customer portals and dashboards: Secure account, payments, and reporting experiences.",
        "Payment integrations: Stripe and banking integrations with reconciliation built in.",
        "Internal risk and operations tools: Workflows that replace manual checks and spreadsheets.",
      ] },
      { title: "Health & Wellness", points: [
        "Patient and practitioner apps: Booking, records, and telehealth experiences.",
        "Clinic management systems: Scheduling, billing, and reporting tailored to your practice.",
        "Secure data platforms: Privacy-first architecture for sensitive health information.",
      ] },
    ],
  },
  process: {
    steps: [
      { num: "01", title: "Discovery & Scoping", desc: "We map your goals, users, and workflows, then agree on a clear scope, milestones, and budget." },
      { num: "02", title: "UX & Architecture", desc: "Wireframes, prototypes, and system design validated with you before development starts." },
      { num: "03", title: "Agile Development", desc: "Two-week sprints with weekly demos, so you see progress and give feedback early." },
      { num: "04", title: "Testing & QA", desc: "Automated and manual testing across devices, with security checks before every release." },
      { num: "05", title: "Launch", desc: "Zero-downtime deployment, App Store submission, monitoring, and team handover." },
      { num: "06", title: "Support & Growth", desc: "Ongoing maintenance, improvements, and new features as your business grows." },
    ],
    note: "* We adapt our process to each project - from a 6-week MVP to a multi-year platform.",
  },
  faqs: [
    { q: "How much does custom software development cost?", a: "It depends on scope. Most projects start with a short paid discovery that produces a fixed-scope estimate, so you know the cost and timeline before development begins." },
    { q: "How long does it take to build custom software?", a: "An MVP typically takes 6-12 weeks. Larger platforms are delivered in phases, with usable releases every few weeks rather than one big launch." },
    { q: "Do we own the source code?", a: "Yes. You own all source code, designs, data, and accounts from day one. Everything is documented so any team can maintain it." },
    { q: "Can you work with our existing systems?", a: "Yes. We integrate new software with your existing tools - accounting, CRM, practice management, and more - and can modernise legacy systems step by step." },
  ],
  cta: { heading: "Tell us what you need built.", label: "Start Your Project" },
};

const systemsIntegration: ServicePageContent = {
  slug: "systems-integration",
  name: "Systems Integration & Data",
  meta: seo("/services/systems-integration"),
  hero: {
    heading: "Systems Integration & Data",
    intro: "Connect the software you already use, eliminate double entry, and get one reliable view of your business - in real time.",
    cta: "Plan Your Integration",
  },
  valueProp: {
    heading: "Enter It Once, Use It Everywhere",
    intro: "Most businesses run on five or six apps that do not share data. We connect them, so details are typed once and every report shows the same numbers.",
    problems: [
      "Re-typing the same data into your CRM, accounting, and practice software?",
      "Reports take days to compile from spreadsheets - and the numbers don't match?",
      "Your systems don't have a built-in integration, or the existing one keeps breaking?",
      "Leadership can't see the real-time numbers needed to make decisions?",
      "Stuck on a legacy system that can't connect to modern tools?",
    ],
    answers: [
      { title: "Automated Data Sync", desc: "We connect your systems through their APIs so records, invoices, and contacts update everywhere automatically - no double entry, no errors." },
      { title: "Single Source of Truth", desc: "We centralise data from every system into a clean, governed data store, so every report uses the same numbers." },
      { title: "Custom, Reliable Integrations", desc: "When off-the-shelf connectors fall short, we build custom integrations with retries, alerts and logging, so a failed sync is caught the same day." },
      { title: "Real-Time Dashboards", desc: "Live dashboards for revenue, operations, and KPIs - built for leaders who need answers, not spreadsheets." },
      { title: "Legacy System Bridges", desc: "We wrap legacy systems in modern APIs, so they can connect to new tools while you plan a safe migration." },
    ],
  },
  services: {
    heading: "Systems Integration & Data Services",
    intro: "From a single Xero integration to a company-wide data platform - built to be reliable, secure, and easy to maintain.",
    cards: [
      { title: "API Integration Development", desc: "Custom integrations between your CRM, accounting, e-commerce, and operational systems - with monitoring and error handling." },
      { title: "Accounting & Xero Integrations", desc: "Sync invoices, payments, payroll, and contacts between Xero and the rest of your stack." },
      { title: "Practice & Farm Software Integrations", desc: "Connect legal practice management or farm management software with accounting, CRM, and reporting tools." },
      { title: "Data Pipelines & Warehousing", desc: "Automated pipelines that collect, clean, and centralise data from every system into one warehouse." },
      { title: "BI Dashboards & Reporting", desc: "Real-time dashboards and automated reports for leadership, finance, and operations teams." },
      { title: "Legacy System Modernisation", desc: "Modern APIs around legacy systems, data migration, and step-by-step replacement without downtime." },
    ],
  },
  visual: {
    heading: "Integrations You Can Rely On",
    desc: "Every integration ships with monitoring, retries, alerting, and documentation - so data keeps flowing and issues are caught before your team notices.",
    terminal: (
      <TerminalBlock
        lines={[
          "$ forrof sync --sources all --monitor",
          "",
          "⬡ Connected Systems",
          "  ├── Xero ...................... ✓ invoices synced",
          "  ├── CRM ....................... ✓ contacts synced",
          "  ├── Practice Management ....... ✓ matters synced",
          "  └── Email & Documents ......... ✓ indexed",
          "",
          "⬡ Data Platform",
          "  ├── Pipelines ................. ✓ scheduled",
          "  ├── Data Quality Checks ....... ✓ passing",
          "  └── Dashboards ................ ✓ real-time",
          "",
          "✓ All systems in sync | Alerts: active",
        ]}
      />
    ),
  },
  stats,
  techStack: {
    intro: "We integrate with the platforms NZ and Australian businesses rely on, using proven data tools that scale from a single sync to a full data platform.",
    items: [
      { name: "Xero", desc: "Accounting integrations for invoices, payments, payroll, and reconciliation." },
      { name: "Node.js", desc: "Lightweight, reliable integration services and API gateways." },
      { name: "FastAPI", desc: "High-performance Python APIs for data services and legacy system wrappers." },
      { name: "PostgreSQL", desc: "A dependable operational data store for integrated records." },
      { name: "Snowflake", desc: "Cloud data warehousing for analytics across all your systems." },
      { name: "Apache Airflow", desc: "Scheduled, observable data pipelines with retries and alerting." },
      { name: "Apache Kafka", desc: "Real-time event streaming for high-volume integrations." },
      { name: "Looker Studio", desc: "Shareable dashboards and reports for every team." },
    ],
  },
  whyUs: [
    { title: "Deep Integration Experience", desc: "We've integrated with John Deere, Climate FieldView, Stripe, HubSpot, LinkedIn, and more - and we know how to handle rate limits, edge cases, and API changes." },
    sharedWhyUs.senior,
    sharedWhyUs.timezone,
    sharedWhyUs.ownership,
    sharedWhyUs.transparent,
  ],
  sideVisual: <DataCube3D className="h-[500px] w-full" />,
  industries: {
    heading: "Systems Integration Across Industries",
    items: [
      { title: "LegalTech & Law Firms", points: [
        "Practice management integrations: Connect your practice management system with Xero, e-signing, and document storage.",
        "Client data sync: Keep contacts, matters, and billing consistent across every tool your firm uses.",
        "Firm performance dashboards: Real-time views of billable hours, WIP, and matter progress.",
      ] },
      { title: "Agriculture & AgriTech", points: [
        "Equipment and field data: Integrate machinery and agronomy platforms like John Deere and Climate FieldView into one view.",
        "Farm financials: Connect farm records with accounting so profitability is visible per paddock or block.",
        "Supply-chain data: Share data with processors, buyers, and auditors automatically.",
      ] },
      { title: "FinTech & Finance", points: [
        "Payment and banking integrations: Reconcile payments across Stripe, banks, and accounting automatically.",
        "Regulatory reporting: Pull data from every system into accurate, auditable reports.",
        "Risk dashboards: Real-time monitoring of transactions and exposure.",
      ] },
      { title: "Health & Wellness", points: [
        "Practice system integrations: Connect booking, records, and billing systems securely.",
        "Patient data consolidation: One accurate record across multiple systems.",
        "Operational reporting: Live dashboards for appointments, utilisation, and revenue.",
      ] },
      { title: "Logistics & Transportation", points: [
        "Fleet and tracking integrations: Combine GPS, telematics, and dispatch data in one place.",
        "Order-to-invoice automation: Sync orders, deliveries, and invoices across systems.",
        "Performance dashboards: On-time delivery, costs, and capacity in real time.",
      ] },
    ],
  },
  process: {
    steps: [
      { num: "01", title: "Systems Audit", desc: "We map your systems, data flows, and pain points, and identify where integration delivers the biggest return." },
      { num: "02", title: "Integration Design", desc: "We design the data model, sync rules, and error handling - and agree on what 'correct' looks like." },
      { num: "03", title: "Build & Connect", desc: "We build the integrations and pipelines, starting with the highest-value connection first." },
      { num: "04", title: "Test & Validate", desc: "We test with real data and reconcile results against your existing records before go-live." },
      { num: "05", title: "Launch & Monitor", desc: "Go-live with monitoring, alerts, and dashboards so issues are caught immediately." },
      { num: "06", title: "Maintain & Extend", desc: "We keep integrations healthy as APIs change and add new connections as you grow." },
    ],
    note: "* Most integrations go live in weeks - larger data platforms are delivered in phases.",
  },
  faqs: [
    { q: "Can you integrate software that doesn't have a built-in integration?", a: "In most cases, yes. If a system has an API, we can integrate it. If it doesn't, we can often use exports, databases, or a secure middleware layer to connect it." },
    { q: "Do you build Xero integrations?", a: "Yes. We build custom Xero integrations for invoices, payments, contacts, payroll, and reporting - connecting Xero with your CRM, practice, or operational systems." },
    { q: "What happens when an integration fails?", a: "Every integration we build includes retries, logging, and alerts. If something fails, it's flagged immediately and resolved before data falls out of sync." },
    { q: "How long does an integration project take?", a: "A single integration typically takes 2-6 weeks. Multi-system data platforms are delivered in phases, with value delivered from the first phase." },
  ],
  cta: { heading: "Which two systems should talk first?", label: "Plan Your Integration" },
};

const seoAiSearch: ServicePageContent = {
  slug: "seo",
  name: "SEO & AI Search Visibility",
  meta: seo("/services/seo"),
  hero: {
    heading: "SEO & AI Search Visibility",
    intro: "Rank on Google and get recommended by ChatGPT, Perplexity, and Google's AI Overviews - with technical SEO, content, and local search done properly.",
    cta: "Get a Free SEO Audit",
  },
  valueProp: {
    heading: "Show Up When Customers Are Looking",
    intro: "People now ask ChatGPT and Google's AI for a recommendation, as well as typing a search. We work on both, so your business is named in the answer and listed in the results.",
    problems: [
      "Competitors outrank you on Google for the services you offer?",
      "Your business never appears when people ask ChatGPT or Perplexity for a recommendation?",
      "Website traffic is flat - or it doesn't turn into enquiries?",
      "Not showing in the Google Maps local pack for your city?",
      "Paying for SEO but can't see what's being done or what it's delivering?",
    ],
    answers: [
      { title: "Search-Led Content Strategy", desc: "We find the searches your buyers make, then create pages and articles that answer them better than anyone else." },
      { title: "AI Search Optimisation (GEO)", desc: "We structure your content, schema, and brand mentions so AI assistants understand, trust, and cite your business." },
      { title: "Conversion-Focused SEO", desc: "We optimise for enquiries, not just traffic - with landing pages, calls to action, and tracking that connect rankings to revenue." },
      { title: "Local SEO", desc: "Google Business Profile optimisation, local citations, and location pages that win the map pack in NZ and Australian cities." },
      { title: "Transparent Monthly Reporting", desc: "Clear reports on rankings, traffic, AI visibility, and enquiries - plus exactly what we did and what's next." },
    ],
  },
  services: {
    heading: "SEO & AI Search Services",
    intro: "A complete search programme - technical foundations, content, local presence, and AI visibility - managed by one team.",
    cards: [
      { title: "Technical SEO", desc: "Site speed, Core Web Vitals, crawlability, indexing, and structured data fixed so search engines can understand every page." },
      { title: "AI Search Optimisation (GEO)", desc: "Optimisation for ChatGPT, Perplexity, Gemini, and Google AI Overviews - so your brand is cited in AI answers." },
      { title: "Local SEO", desc: "Google Business Profile, reviews, citations, and location pages to rank in local search and Maps." },
      { title: "Content Strategy & Writing", desc: "Keyword research, topic clusters, and expert content that ranks and converts readers into enquiries." },
      { title: "SEO Audits", desc: "A detailed audit of technical, content, and competitor gaps - with a prioritised action plan." },
      { title: "Schema & Structured Data", desc: "Rich results and machine-readable data for services, FAQs, reviews, and your organisation." },
    ],
  },
  visual: {
    heading: "Visibility You Can Measure",
    desc: "We track rankings, organic traffic, AI citations, and enquiries - so you can see exactly how search is contributing to your pipeline.",
    terminal: (
      <TerminalBlock
        lines={[
          "$ forrof audit --seo --ai-search",
          "",
          "⬡ Technical Foundations",
          "  ├── Core Web Vitals ........... ✓ passing",
          "  ├── Indexing & Sitemaps ....... ✓ clean",
          "  └── Structured Data ........... ✓ valid",
          "",
          "⬡ Visibility",
          "  ├── Google Rankings ........... ✓ tracked",
          "  ├── Local Map Pack ............ ✓ optimised",
          "  └── AI Answer Citations ....... ✓ monitored",
          "",
          "✓ Report ready | Enquiries attributed",
        ]}
      />
    ),
  },
  stats,
  techStack: {
    intro: "We use industry-standard SEO platforms and track visibility across both traditional search engines and AI assistants.",
    items: [
      { name: "Google Search Console", desc: "Indexing, rankings, and search performance data straight from Google." },
      { name: "Google Analytics", desc: "Traffic and conversion tracking that ties organic search to enquiries." },
      { name: "Semrush", desc: "Keyword research, competitor analysis, and rank tracking." },
      { name: "Google Tag Manager", desc: "Accurate conversion and event tracking across your site." },
      { name: "ChatGPT", desc: "Monitoring how AI assistants describe and recommend your business." },
      { name: "Perplexity", desc: "Tracking citations in answer engines that link back to sources." },
      { name: "WordPress", desc: "SEO-ready content management and technical optimisation." },
      { name: "Next.js", desc: "Fast, server-rendered websites built for search performance." },
    ],
  },
  whyUs: [
    { title: "Developers and Marketers in One Team", desc: "Most SEO agencies can't fix the technical issues they find. Our engineers implement fixes directly - no waiting on another vendor." },
    { title: "Early Adopters of AI Search", desc: "We optimise for AI assistants and answer engines, not just ten blue links - so you're visible where search is heading." },
    sharedWhyUs.timezone,
    sharedWhyUs.transparent,
    { title: "No Long Lock-In Contracts", desc: "Month-to-month engagements after the initial setup - we earn your business with results." },
  ],
  sideVisual: <OrbitRings3D className="h-[500px] w-full" />,
  industries: {
    heading: "SEO & AI Search Across Industries",
    items: [
      { title: "Law Firms", points: [
        "Practice-area pages: Rank for high-intent searches like conveyancing, family, or immigration lawyers in your city.",
        "Local SEO: Win the Google Maps pack for each office location.",
        "Authority content: Guides and FAQs that build trust and get cited in AI answers.",
      ] },
      { title: "Agriculture & AgriTech", points: [
        "Product and service visibility: Rank for the equipment, services, and solutions farmers search for.",
        "Regional SEO: Reach rural customers across New Zealand and Australian regions.",
        "AgriTech thought leadership: Content that builds credibility with buyers and investors.",
      ] },
      { title: "Professional Services", points: [
        "Service pages built to convert: Clear, expert pages for each service you offer.",
        "Review and reputation growth: More reviews and better visibility in local search.",
        "Lead tracking: Attribute calls and form enquiries to organic search.",
      ] },
      { title: "SaaS & Technology", points: [
        "Product-led content: Pages that rank for problems your product solves.",
        "Comparison and alternative pages: Capture buyers evaluating options.",
        "AI search visibility: Get recommended when buyers ask AI for tools.",
      ] },
      { title: "Health & Wellness", points: [
        "Clinic local SEO: Rank for treatments and practitioners near your patients.",
        "Trustworthy health content: Accurate, expert-reviewed pages that meet quality standards.",
        "Booking conversion: Turn search visits into appointments.",
      ] },
    ],
  },
  process: {
    steps: [
      { num: "01", title: "Audit & Benchmark", desc: "A full technical, content, local, and AI-visibility audit benchmarked against your competitors." },
      { num: "02", title: "Strategy & Roadmap", desc: "A prioritised plan of keywords, pages, and fixes focused on the searches that drive enquiries." },
      { num: "03", title: "Technical Fixes", desc: "Our engineers fix speed, indexing, and structured-data issues directly in your site." },
      { num: "04", title: "Content & Local", desc: "New and improved pages, Google Business Profile optimisation, and citations." },
      { num: "05", title: "Authority & AI Visibility", desc: "Digital PR, mentions, and structured content that build trust with search engines and AI." },
      { num: "06", title: "Report & Refine", desc: "Monthly reporting on rankings, traffic, AI citations, and enquiries - and a plan for next month." },
    ],
    note: "* SEO compounds over time - most clients see meaningful movement within 3-6 months.",
  },
  faqs: [
    { q: "What is AI search optimisation (GEO)?", a: "Generative engine optimisation (GEO) makes your business more likely to be cited when people ask AI assistants like ChatGPT, Perplexity, or Google's AI Overviews for recommendations. It combines clear, well-structured content, schema markup, and trusted mentions across the web." },
    { q: "How long does SEO take to work?", a: "Technical fixes can show results within weeks, but most businesses see meaningful ranking and traffic growth within 3-6 months, compounding over time." },
    { q: "Do you offer local SEO for New Zealand and Australian cities?", a: "Yes. We optimise Google Business Profiles, local citations, reviews, and location pages for cities across New Zealand and Australia." },
    { q: "Can you implement technical SEO fixes on our website?", a: "Yes. Our team includes developers, so we implement technical fixes directly rather than handing you a list of recommendations." },
  ],
  cta: { heading: "See where you rank today.", label: "Get a Free SEO Audit" },
};

const performanceMarketing: ServicePageContent = {
  slug: "performance-marketing",
  name: "Performance Marketing",
  meta: seo("/services/performance-marketing"),
  hero: {
    heading: "Performance Marketing",
    intro: "Paid ads and social media built around one goal - turning ad spend into qualified, booked revenue, with tracking you can trust.",
    cta: "Get a Free Ad Account Audit",
  },
  valueProp: {
    heading: "Know What Every Ad Dollar Brings In",
    intro: "Our developers set up the tracking before we spend anything, so every campaign is measured by the enquiries and sales it produces.",
    problems: [
      "Spending on Google or Meta ads but can't tell which campaigns bring in customers?",
      "Leads are coming in, but they're the wrong fit or never convert?",
      "Cost per lead keeps rising while results stay flat?",
      "Social media takes time, but doesn't grow your pipeline?",
      "Tracking broke after iOS and cookie changes - and nobody fixed it?",
    ],
    answers: [
      { title: "Revenue-Level Tracking", desc: "Server-side tracking and CRM integration connect every click to the leads and revenue it produced." },
      { title: "Intent-Based Targeting", desc: "We focus budget on high-intent searches and audiences, and exclude the clicks that never convert." },
      { title: "Continuous Testing", desc: "Structured creative, audience, and landing-page tests that steadily lower cost per qualified lead." },
      { title: "Social That Builds Pipeline", desc: "Content and paid social planned around your buyers - building trust that turns into enquiries." },
      { title: "Tracking That Survives Privacy Changes", desc: "Conversion APIs and first-party data setups that keep reporting accurate after iOS and cookie changes." },
    ],
  },
  services: {
    heading: "Performance Marketing Services",
    intro: "Paid search, paid social, and organic social managed by one team - with shared tracking and one view of results.",
    cards: [
      { title: "Paid Ads Management", desc: "Full-funnel campaigns across Google, Meta, LinkedIn, and TikTok with API-level tracking.", slug: "paid-ads" },
      { title: "Google Ads", desc: "Search, Performance Max, YouTube, and Local Service Ads built around high-intent keywords.", slug: "google-ads" },
      { title: "Meta Ads", desc: "Facebook and Instagram campaigns with creative testing and Conversion API.", slug: "meta-ads" },
      { title: "LinkedIn Ads", desc: "B2B campaigns targeting decision-makers by role, industry, and company size.", slug: "linkedin-ads" },
      { title: "Social Media Marketing", desc: "Strategy, content creation, and community management that grow an engaged audience.", slug: "social-media" },
      { title: "Landing Pages & CRO", desc: "Fast, conversion-focused landing pages and ongoing tests that lift enquiry rates." },
    ],
  },
  visual: {
    heading: "Reports You Can Act On",
    desc: "We connect ad platforms, analytics, and your CRM, so you see cost per qualified lead and return on ad spend - not just clicks and impressions.",
    terminal: (
      <TerminalBlock
        lines={[
          "$ forrof campaign --optimise --track revenue",
          "",
          "⬡ Channels",
          "  ├── Google Search & PMax ...... ✓ live",
          "  ├── Meta (FB + IG) ............ ✓ live",
          "  └── LinkedIn .................. ✓ live",
          "",
          "⬡ Tracking",
          "  ├── Server-side Conversions ... ✓ verified",
          "  ├── CRM Lead Sync ............. ✓ connected",
          "  └── Landing Page Tests ........ ✓ running",
          "",
          "✓ Reporting: cost per qualified lead",
        ]}
      />
    ),
  },
  stats,
  techStack: {
    intro: "We run campaigns on every major platform and connect them to analytics and your CRM for accurate, revenue-level reporting.",
    items: [
      { name: "Google Ads", desc: "Search, Performance Max, YouTube, and Local Service Ads." },
      { name: "Meta Ads", desc: "Facebook and Instagram campaigns with Conversion API." },
      { name: "LinkedIn Ads", desc: "B2B targeting by job title, industry, and company." },
      { name: "TikTok Ads", desc: "Short-form video campaigns for reach and engagement." },
      { name: "Google Analytics", desc: "Cross-channel analytics and conversion attribution." },
      { name: "Google Tag Manager", desc: "Reliable, server-side-ready event and conversion tracking." },
      { name: "HubSpot", desc: "CRM integration that tracks leads through to revenue." },
      { name: "Looker Studio", desc: "Live dashboards that show spend, leads, and ROAS." },
    ],
  },
  whyUs: [
    { title: "Engineering-Grade Tracking", desc: "Our developers set up server-side tracking and CRM integrations most agencies can't - so your data is accurate." },
    { title: "Focused on Qualified Leads", desc: "We optimise for enquiries that turn into customers, not vanity metrics like clicks and impressions." },
    sharedWhyUs.timezone,
    sharedWhyUs.transparent,
    { title: "You Own Your Ad Accounts", desc: "Campaigns run in your accounts, so you keep all data, history, and audiences." },
  ],
  sideVisual: <SocialGraph3D className="h-[500px] w-full" />,
  industries: {
    heading: "Performance Marketing Across Industries",
    items: [
      { title: "Law Firms", points: [
        "Practice-area search campaigns: Reach people actively searching for legal help in your area.",
        "Call and form tracking: Know which keywords produce real consultations.",
        "Retargeting: Stay visible while prospects compare firms.",
      ] },
      { title: "Agriculture & AgriTech", points: [
        "Regional targeting: Reach farmers and agribusinesses across rural NZ and Australia.",
        "B2B lead generation: LinkedIn and search campaigns for agritech and rural service providers.",
        "Seasonal campaigns: Budgets aligned with planting, harvest, and buying cycles.",
      ] },
      { title: "SaaS & Technology", points: [
        "Demo and trial acquisition: Campaigns optimised for qualified sign-ups.",
        "LinkedIn ABM: Target the companies and roles that buy your product.",
        "Full-funnel attribution: Connect ad spend to pipeline and revenue.",
      ] },
      { title: "Professional Services", points: [
        "Local lead generation: Google Ads and Local Service Ads for service-area businesses.",
        "Landing page optimisation: Pages built to turn clicks into bookings.",
        "Reputation and social proof: Social content that builds trust.",
      ] },
      { title: "E-commerce & Retail", points: [
        "Shopping and Performance Max: Product campaigns optimised for ROAS.",
        "Creative testing: Rapid iteration on ads that sell.",
        "Retention campaigns: Bring past customers back with targeted offers.",
      ] },
    ],
  },
  process: {
    steps: [
      { num: "01", title: "Audit & Tracking Setup", desc: "We audit your accounts and fix tracking first, so every decision is based on accurate data." },
      { num: "02", title: "Strategy & Targeting", desc: "We define your ideal customers, channels, budgets, and success metrics." },
      { num: "03", title: "Creative & Landing Pages", desc: "Ads and landing pages designed to convert your specific audience." },
      { num: "04", title: "Launch", desc: "Campaigns go live with structured tests and clear budget controls." },
      { num: "05", title: "Optimise", desc: "Weekly optimisation of bids, audiences, creative, and pages based on lead quality." },
      { num: "06", title: "Report & Scale", desc: "Monthly reporting on cost per qualified lead and ROAS - and scaling what works." },
    ],
    note: "* Most accounts see clear improvements within the first 60-90 days of optimisation.",
  },
  faqs: [
    { q: "How much should we spend on Google Ads or Meta Ads?", a: "It depends on your market and goals. We recommend a starting budget based on your cost per lead targets and competition, then scale spend as campaigns prove profitable." },
    { q: "Do you manage campaigns for New Zealand and Australian businesses?", a: "Yes. We run campaigns targeting New Zealand and Australian audiences, with ads, landing pages, and reporting tailored to each market." },
    { q: "Will we own our ad accounts and data?", a: "Yes. Campaigns run in accounts you own, so you keep all data, audiences, and history if you ever change providers." },
    { q: "How do you measure success?", a: "We focus on cost per qualified lead, conversion rate, and return on ad spend - connected to your CRM wherever possible, rather than clicks or impressions alone." },
  ],
  cta: { heading: "Find out where your ad budget is going.", label: "Get a Free Ad Account Audit" },
};

export const servicePages = { aiAutomation, customSoftware, systemsIntegration, seoAiSearch, performanceMarketing };
export type ServicePageKey = keyof typeof servicePages;

const ServicePage = ({ page }: { page: ServicePageKey }) => <ServicePageTemplate key={page} content={servicePages[page]} />;

export default ServicePage;
