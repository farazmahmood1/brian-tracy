import { ServicePageTemplate, TerminalBlock, type ServicePageContent } from "@/components/ServicePageTemplate";
import { seo } from "@/constants/seo";
import {
  DataCube3D, DnaHelix3D, OrbitRings3D, GridMatrix3D, CloudCluster3D, StrategyCompass3D,
} from "@/components/AiMlVisuals";

const section = { label: "Industries", path: "/industries" };

// Only figures already published elsewhere on the site.
const stats = [
  { value: "150+", label: "Projects Shipped" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "5/5", label: "Rating for Cost on Clutch" },
  { value: "17", label: "People on the Team" },
];

const hours = { title: "Calls in your time zone", desc: "We schedule calls and demos inside your working day, and you get a written update between them so nothing waits on a meeting." };
const fixedQuote = { title: "A fixed quote before we start", desc: "You see the scope, the price in USD and the delivery date before any work begins. If the scope changes, we re-quote. No surprise invoices." };
const ownership = { title: "You own everything", desc: "Source code, cloud accounts, data and documentation are yours from the first commit. You can take the work in-house whenever you like." };

const fintech: ServicePageContent = {
  slug: "fintech-finance",
  name: "FinTech Software Development",
  section,
  meta: seo("/industries/fintech-finance"),
  hero: {
    heading: "FinTech Software Development",
    intro: "Payment flows, lending tools, investor dashboards and reporting systems for finance businesses. Built by the team behind the Signal Sigma investment research platform.",
    cta: "Talk to a FinTech Engineer",
  },
  valueProp: {
    heading: "Finance Software Has to Be Right the First Time",
    intro: "A rounding error or a missed reconciliation is not a small bug in finance. We build with that in mind: tested money paths, audit logs on everything, and nothing shipped without your sign-off.",
    problems: [
      "Reconciling payments by hand between your bank, Stripe and Xero every week?",
      "Customers want open banking features, and your current platform cannot support them?",
      "Client onboarding and KYC checks still run on PDFs and email?",
      "Your reporting lives in spreadsheets that only one person understands?",
      "A legacy system nobody wants to touch, because nobody knows what will break?",
    ],
    answers: [
      { title: "Automatic reconciliation", desc: "We connect your payment provider, bank feeds and accounting software so transactions match themselves. Your team only looks at the exceptions." },
      { title: "Open banking integrations", desc: "We build on open banking APIs through accredited providers such as Plaid and TrueLayer, so customers can share account data and pay by bank safely." },
      { title: "Digital onboarding", desc: "Identity checks, document collection and approvals in one flow, with every step recorded for your AML/CTF program." },
      { title: "Reporting people can trust", desc: "One data source, clear definitions and dashboards that update themselves. The numbers match your ledger, and anyone can trace how they were calculated." },
      { title: "Careful legacy replacement", desc: "We replace old systems one module at a time and run old and new side by side until the figures match. The business keeps operating throughout." },
    ],
  },
  services: {
    heading: "FinTech Development Services",
    intro: "From a single integration to a full product build. Every project comes with a fixed quote, a test plan for the money paths and a named engineer you can call.",
    cards: [
      { title: "Payments and Billing", desc: "Card payments, direct debit, subscriptions, invoicing and payouts using Stripe and local payment rails, with reconciliation into Xero or QuickBooks." },
      { title: "Lending and Credit Tools", desc: "Application portals, credit decision workflows, repayment schedules and borrower dashboards for lenders and brokers." },
      { title: "Investment and Wealth Platforms", desc: "Portfolio dashboards, research tools and strategy builders. We built Signal Sigma, a platform that lets retail investors build and backtest strategies without code." },
      { title: "Open Banking Integrations", desc: "Account data, payment initiation and income verification through accredited open banking providers." },
      { title: "Reporting and Data", desc: "Automated regulatory, board and investor reports built from one reliable data source." },
      { title: "AI for Finance Teams", desc: "Document extraction for statements and invoices, anomaly flags on transactions, and assistants that answer questions over your own policies." },
    ],
  },
  visual: {
    heading: "Tested Where the Money Moves",
    desc: "Every payment, refund and calculation has an automated test and an audit log entry. We run old and new systems in parallel before any switch-over, so you can see the numbers agree.",
    terminal: (
      <TerminalBlock
        lines={[
          "$ forrof reconcile --period month-end",
          "",
          "⬡ Sources",
          "  ├── Stripe payouts ............ ✓ matched",
          "  ├── Bank feed ................. ✓ matched",
          "  └── Xero ledger ............... ✓ matched",
          "",
          "⬡ Controls",
          "  ├── Audit log ................. ✓ complete",
          "  ├── Exceptions ................ 3 for review",
          "  └── Report .................... ✓ generated",
          "",
          "✓ Month-end closed",
        ]}
      />
    ),
  },
  stats,
  techStack: {
    intro: "We work with the payment and accounting tools finance teams already use, on a stack that is easy to audit and hire for.",
    items: [
      { name: "Stripe", desc: "Payments, subscriptions, payouts and billing." },
      { name: "Xero", desc: "Ledger sync, invoicing and reconciliation." },
      { name: "QuickBooks", desc: "Accounting integration for invoices and payments." },
      { name: "Python", desc: "Financial calculations, data pipelines and machine learning." },
      { name: "Node.js", desc: "APIs and integration services." },
      { name: "PostgreSQL", desc: "Transactional data with strong consistency." },
      { name: "React", desc: "Dashboards and customer portals." },
      { name: "AWS", desc: "Hosting in the region your data must stay in." },
    ],
  },
  whyUs: [
    { title: "We have shipped investment software", desc: "Signal Sigma gives retail investors live strategies, backtesting and machine-learning signals in a no-code interface. That work taught us how to keep financial data accurate and fast." },
    { title: "Security built into the design", desc: "Encryption in transit and at rest, role-based access, audit trails and separate environments are standard on every finance project." },
    hours,
    fixedQuote,
    ownership,
  ],
  sideVisual: <DataCube3D className="h-[500px] w-full" />,
  industries: {
    label: "Who We Build For",
    heading: "Finance Businesses We Work With",
    items: [
      { title: "Lenders and Brokers", points: [
        "Online applications that collect documents and bank data in one sitting.",
        "Decision workflows your credit team can adjust without a developer.",
        "Borrower portals for balances, statements and repayments.",
      ] },
      { title: "Payments and Billing Companies", points: [
        "Merchant onboarding and payout dashboards.",
        "Subscription and invoicing engines with proration and tax handled correctly.",
        "Reconciliation between processor, bank and ledger.",
      ] },
      { title: "Wealth and Investment Firms", points: [
        "Client portals with holdings, performance and documents.",
        "Research and strategy tools, like the platform we built for Signal Sigma.",
        "Automated statements and adviser reports.",
      ] },
      { title: "Accounting and Advisory Practices", points: [
        "Client portals connected to Xero or QuickBooks.",
        "Automated data collection for tax and compliance work.",
        "Dashboards that show clients their numbers in plain language.",
      ] },
      { title: "FinTech Startups", points: [
        "An MVP you can put in front of investors and early customers.",
        "Architecture that holds up when a compliance team reviews it.",
        "A team that stays on after launch.",
      ] },
    ],
  },
  process: {
    steps: [
      { num: "01", title: "Map the money", desc: "We trace how money and data move through your business today and mark where errors and delays happen." },
      { num: "02", title: "Agree the rules", desc: "We write down the calculations, limits and compliance requirements with you, in plain language, before any code." },
      { num: "03", title: "Build in small releases", desc: "You see working software every week and can test it with real scenarios." },
      { num: "04", title: "Test the money paths", desc: "Automated tests cover every calculation and payment route. A second engineer reviews every change." },
      { num: "05", title: "Run in parallel", desc: "The new system runs alongside the old one until the numbers match." },
      { num: "06", title: "Support and improve", desc: "Monitoring, fixes and new features on a monthly plan." },
    ],
    note: "* We build software. For licensing and regulatory advice you will still need your own legal or compliance adviser.",
  },
  faqs: [
    { q: "What kind of fintech software do you build?", a: "Payment and billing systems, lending and credit tools, investment and wealth platforms, open banking integrations and automated reporting. We host in the cloud region your data needs to stay in." },
    { q: "Can you integrate with Stripe, Xero and QuickBooks?", a: "Yes. We connect payment providers and bank data to Xero, QuickBooks and other accounting software, so invoices, payments and reconciliations stay in sync without manual entry." },
    { q: "Do you handle regulatory compliance?", a: "We build the technical controls that compliance requires, such as audit logs, access controls, identity-check integrations and reporting. We are not a law firm, so licensing and regulatory advice should come from your legal or compliance adviser." },
    { q: "How much does a fintech MVP cost?", a: "Fintech MVPs start from about USD 9,000. The final price depends on the integrations and compliance requirements, and you get a fixed quote after a short scoping call." },
  ],
  cta: { heading: "Need finance software you can trust?", label: "Talk to a FinTech Engineer" },
};

const health: ServicePageContent = {
  slug: "health-wellness",
  name: "Healthcare Software Development",
  section,
  meta: seo("/industries/health-wellness"),
  hero: {
    heading: "Healthcare Software Development",
    intro: "Patient apps, clinic systems, telehealth and wellness products for health providers. Built by the team behind Curogram's patient communication platform.",
    cta: "Talk to a Health Software Engineer",
  },
  valueProp: {
    heading: "Software Your Patients and Staff Will Actually Use",
    intro: "Health software fails when the front desk avoids it or patients cannot log in. We design with the people who use it, and we treat health information as carefully as you do.",
    problems: [
      "Reception spends the morning on reminder calls and rescheduling?",
      "Patients fill in the same paper forms at every visit?",
      "Your booking, records and billing systems do not share information?",
      "You have a health app idea but are unsure about the privacy rules?",
      "A telehealth tool that patients find confusing, so they phone instead?",
    ],
    answers: [
      { title: "Automated reminders and two-way SMS", desc: "Patients confirm, cancel or reschedule by text. The appointment book updates itself and the phones stay quiet." },
      { title: "Digital intake", desc: "Patients complete forms on their phone before they arrive, and the answers go straight into the record." },
      { title: "Connected clinic systems", desc: "We link booking, patient records and billing through their APIs or HL7 FHIR, so details are typed once." },
      { title: "Privacy designed in", desc: "We build around the health privacy rules that apply to you, including HIPAA and GDPR: collect only what is needed, encrypt it, and log who accessed it." },
      { title: "Telehealth that works first time", desc: "One link, no downloads, and a waiting room your clinicians control. We test it with real patients before launch." },
    ],
  },
  services: {
    heading: "Healthcare and Wellness Software Services",
    intro: "Products for clinics, allied health practices, wellness brands and health startups, built with privacy and usability treated as requirements.",
    cards: [
      { title: "Patient Communication", desc: "Appointment reminders, two-way SMS, online forms and payments by text. This is the kind of platform we built for Curogram." },
      { title: "Telehealth", desc: "Secure video consultations, virtual waiting rooms and follow-up messaging." },
      { title: "Clinic and Practice Systems", desc: "Scheduling, patient records, billing and reporting built around how your practice runs." },
      { title: "Patient and Wellness Apps", desc: "iOS and Android apps for bookings, programs, tracking and education." },
      { title: "Practice Software Integrations", desc: "Connections between your practice management system, booking tools, accounting and messaging." },
      { title: "AI for Health Admin", desc: "Note summarization, referral triage and document extraction, with a clinician checking every output." },
    ],
  },
  visual: {
    heading: "Fewer Phone Calls, Fewer No-Shows",
    desc: "The quickest win in most clinics is taking reminders, confirmations and forms off the front desk. We usually start there, measure the change, then move on to the next job.",
    terminal: (
      <TerminalBlock
        lines={[
          "$ forrof clinic --today",
          "",
          "⬡ Appointments",
          "  ├── Reminders sent ............ ✓ 64",
          "  ├── Confirmed by SMS .......... ✓ 51",
          "  └── Rescheduled online ........ ✓ 6",
          "",
          "⬡ Intake",
          "  ├── Forms completed ........... ✓ 47",
          "  └── Synced to records ......... ✓ 47",
          "",
          "✓ Front desk calls avoided: 57",
        ]}
      />
    ),
  },
  stats,
  techStack: {
    intro: "Reliable, widely supported technology, hosted in the region your patient data needs to stay in.",
    items: [
      { name: "React Native", desc: "Patient apps for iOS and Android from one codebase." },
      { name: "Flutter", desc: "Fast, polished mobile apps for wellness products." },
      { name: "Node.js", desc: "APIs and integration services." },
      { name: "Python", desc: "Data processing and clinical AI assistants." },
      { name: "PostgreSQL", desc: "Encrypted storage for patient data." },
      { name: "AWS", desc: "Regional hosting for data residency." },
      { name: "OpenAI", desc: "Summarization and triage with clinician review." },
      { name: "Stripe", desc: "Patient payments and subscriptions." },
    ],
  },
  whyUs: [
    { title: "We have built patient communication at scale", desc: "For Curogram we worked on two-way SMS, automated reminders, online intake, telemedicine and text-to-pay, connected to clinic record systems." },
    { title: "Privacy first, features second", desc: "Role-based access, encryption, audit logs and data minimization go into the first design, before any feature work." },
    hours,
    fixedQuote,
    ownership,
  ],
  sideVisual: <DnaHelix3D className="h-[500px] w-full" />,
  industries: {
    label: "Who We Build For",
    heading: "Health Providers We Work With",
    items: [
      { title: "GP and Specialist Clinics", points: [
        "Reminder and recall messaging that updates the appointment book.",
        "Online intake and consent forms.",
        "Telehealth consultations with a simple patient link.",
      ] },
      { title: "Allied Health and Physiotherapy", points: [
        "Online booking and exercise program apps.",
        "Progress tracking patients can see between visits.",
        "Billing and insurance claim workflows.",
      ] },
      { title: "Mental Health Services", points: [
        "Private video sessions and secure messaging.",
        "Mood and outcome tracking between appointments.",
        "Waitlist and intake management.",
      ] },
      { title: "Fitness and Wellness Brands", points: [
        "Membership and class booking apps.",
        "Programs, habit tracking and wearable data.",
        "Subscriptions and in-app payments.",
      ] },
      { title: "Health Startups", points: [
        "An MVP you can pilot with a real clinic.",
        "Architecture a privacy review will pass.",
        "A product team that continues after launch.",
      ] },
    ],
  },
  process: {
    steps: [
      { num: "01", title: "Spend time with your team", desc: "We learn how reception, clinicians and patients use your systems today." },
      { num: "02", title: "Privacy and data plan", desc: "We agree what is collected, where it is stored, who can see it and how long it is kept." },
      { num: "03", title: "Prototype with real users", desc: "Staff and patients try a clickable prototype before we build." },
      { num: "04", title: "Build and integrate", desc: "Weekly releases, connected to your existing systems." },
      { num: "05", title: "Pilot", desc: "A small rollout with one team or site, then adjustments." },
      { num: "06", title: "Rollout and support", desc: "Training, monitoring and ongoing improvements." },
    ],
    note: "* Software that diagnoses or treats may be regulated as a medical device. We will flag this early so you can get regulatory advice.",
  },
  faqs: [
    { q: "What kind of healthcare software do you build?", a: "Patient communication tools, telehealth, clinic and practice systems, patient and wellness apps, and integrations with practice management and record systems." },
    { q: "How do you protect patient information?", a: "We design around the health privacy rules that apply to you, such as HIPAA and GDPR. That means collecting only what is needed, encrypting data in transit and at rest, role-based access, audit logs and regional hosting when required." },
    { q: "Can you integrate with our practice management system?", a: "Usually, yes. If your system offers an API or supports HL7 FHIR, we can connect booking, messaging, forms and billing to it. We check this during scoping, before you commit." },
    { q: "Have you built healthcare products before?", a: "Yes. We worked on Curogram, a patient communication platform for medical practices that combines SMS, reminders, intake forms, telemedicine and payments." },
  ],
  cta: { heading: "Let's take the admin off your front desk.", label: "Talk to a Health Software Engineer" },
};

const transport: ServicePageContent = {
  slug: "transportation",
  name: "Logistics & Transport Software",
  section,
  meta: seo("/industries/transportation"),
  hero: {
    heading: "Logistics & Transport Software",
    intro: "Dispatch, tracking, proof of delivery and warehouse tools for transport and logistics operators, connected to the telematics and accounting systems you already run.",
    cta: "Talk to a Logistics Engineer",
  },
  valueProp: {
    heading: "Less Paperwork Between Pickup and Invoice",
    intro: "Most operators we talk to have good trucks and good people, and a gap in the middle where jobs are re-keyed, dockets go missing and invoices go out late. That gap is what we fix.",
    problems: [
      "Jobs taken by phone, written on a whiteboard, then typed into three systems?",
      "Paper dockets and proof of delivery that turn up days later, or never?",
      "Customers ringing to ask where their freight is?",
      "Invoices held up because job details and rates need checking by hand?",
      "Telematics, warehouse and accounting systems that do not talk to each other?",
    ],
    answers: [
      { title: "One job record", desc: "A job is entered once, by your team or by the customer online, and flows through dispatch, the driver app and invoicing." },
      { title: "Driver app with photo proof of delivery", desc: "Signatures, photos and timestamps captured on the phone, even without coverage, and synced when the driver is back in range." },
      { title: "Customer tracking link", desc: "Customers get a live link and delivery notifications, so they stop calling dispatch." },
      { title: "Same-day invoicing", desc: "Completed jobs are rated automatically and pushed to your accounting software as invoices." },
      { title: "Connected systems", desc: "We integrate your telematics provider, warehouse system and accounting software, so data moves without re-keying." },
    ],
  },
  services: {
    heading: "Logistics and Transport Software Services",
    intro: "Tools built around your operation, whether you run five vehicles or five hundred. We start with the job that costs you the most time.",
    cards: [
      { title: "Dispatch and Job Management", desc: "Job booking, allocation, scheduling and run sheets in one screen for your dispatchers." },
      { title: "Driver Mobile Apps", desc: "Job lists, navigation, electronic proof of delivery and vehicle checks on iOS and Android, working offline." },
      { title: "Customer Portals and Tracking", desc: "Online booking, live tracking, delivery notifications and document downloads for your customers." },
      { title: "Telematics and System Integrations", desc: "GPS and telematics data joined with jobs, warehouse stock and accounts through each provider's API." },
      { title: "Warehouse and Inventory Tools", desc: "Receiving, put-away, picking and stock reporting, with barcode scanning on handheld devices." },
      { title: "Route Planning and Reporting", desc: "Route optimization, on-time delivery reports and cost per job, drawn from your own data." },
    ],
  },
  visual: {
    heading: "From Booking to Invoice Without Re-Typing",
    desc: "When the job, the delivery proof and the rate card live in one place, the invoice can go out the same day the freight is delivered.",
    terminal: (
      <TerminalBlock
        lines={[
          "$ forrof dispatch --status today",
          "",
          "⬡ Jobs",
          "  ├── Booked online ............. ✓ 38",
          "  ├── Allocated ................. ✓ 38",
          "  └── Delivered with POD ........ ✓ 31",
          "",
          "⬡ Back Office",
          "  ├── Rated automatically ....... ✓ 31",
          "  └── Invoices sent to Xero ..... ✓ 31",
          "",
          "✓ No dockets outstanding",
        ]}
      />
    ),
  },
  stats,
  techStack: {
    intro: "Mobile apps that work offline, mapping that handles real addresses, and integrations with the accounting tools transport operators use.",
    items: [
      { name: "React Native", desc: "Driver apps for iOS and Android." },
      { name: "Flutter", desc: "Handheld and tablet apps for warehouse and yard." },
      { name: "Google Maps", desc: "Routing, geocoding and live tracking." },
      { name: "Mapbox", desc: "Custom maps and route visualization." },
      { name: "Node.js", desc: "Dispatch services and integrations." },
      { name: "PostgreSQL", desc: "Jobs, rates and delivery records." },
      { name: "Xero", desc: "Invoices and customer accounts." },
      { name: "Stripe", desc: "Online payments for customer bookings." },
    ],
  },
  whyUs: [
    { title: "Offline-first mobile apps", desc: "We build field apps that keep working without coverage and sync later. We used the same approach on agriculture apps, where coverage is worse than on the road." },
    { title: "Integration is our day job", desc: "Connecting equipment data, operational systems and accounting is most of what we do, across farming, legal and finance clients." },
    hours,
    fixedQuote,
    ownership,
  ],
  sideVisual: <OrbitRings3D className="h-[500px] w-full" />,
  industries: {
    label: "Who We Build For",
    heading: "Transport and Logistics Operators We Work With",
    items: [
      { title: "General and Linehaul Freight", points: [
        "Job booking, allocation and run sheets.",
        "Electronic proof of delivery with photos and signatures.",
        "Automatic rating and invoicing.",
      ] },
      { title: "Couriers and Last-Mile Delivery", points: [
        "Route optimization for multi-drop runs.",
        "Live tracking links and delivery notifications.",
        "Driver apps with barcode scanning.",
      ] },
      { title: "Warehousing and 3PL", points: [
        "Stock receiving, picking and dispatch workflows.",
        "Client portals showing stock on hand and orders.",
        "Storage and handling charges calculated automatically.",
      ] },
      { title: "Rural and Bulk Carriers", points: [
        "Offline job capture for areas without coverage.",
        "Weighbridge and docket data captured digitally.",
        "Farm and processor booking portals.",
      ] },
      { title: "Fleet and Equipment Hire", points: [
        "Booking and availability calendars.",
        "Pre-start checks and maintenance schedules.",
        "Utilization and cost reporting.",
      ] },
    ],
  },
  process: {
    steps: [
      { num: "01", title: "Follow a job", desc: "We trace one job from booking to payment and note every time it is re-keyed or waits on paper." },
      { num: "02", title: "Pick the first fix", desc: "We choose the step that saves the most time and quote it as a fixed-price pilot." },
      { num: "03", title: "Build with your dispatchers", desc: "The people who will use it see it every week and tell us what is wrong." },
      { num: "04", title: "Trial on a few runs", desc: "A handful of drivers use it on real jobs before a wider rollout." },
      { num: "05", title: "Roll out", desc: "Training for drivers, dispatch and accounts, depot by depot." },
      { num: "06", title: "Support", desc: "Monitoring, fixes and new features on a monthly plan." },
    ],
    note: "* We integrate with electronic logging and compliance providers. We do not replace approved compliance systems.",
  },
  faqs: [
    { q: "What kind of logistics software do you build?", a: "Dispatch and job management, driver apps with electronic proof of delivery, customer tracking portals, warehouse tools and integrations with telematics and accounting systems." },
    { q: "Can you integrate with our telematics and accounting systems?", a: "In most cases, yes. If your telematics provider and accounting software offer an API, we can connect them to your job data. We confirm this during scoping." },
    { q: "Will the driver app work without mobile coverage?", a: "Yes. Jobs, signatures and photos are stored on the phone and sync automatically when coverage returns." },
    { q: "How long does a first project take?", a: "A focused pilot, such as a driver app with proof of delivery and invoicing, typically takes 6 to 10 weeks." },
  ],
  cta: { heading: "Get dockets off paper and invoices out the same day.", label: "Talk to a Logistics Engineer" },
};

const smallBusiness: ServicePageContent = {
  slug: "small-business",
  name: "Software & IT for Small Business",
  section,
  meta: seo("/industries/small-business"),
  hero: {
    heading: "Software for Small Business",
    intro: "Websites, automations, apps and accounting integrations for small businesses. Fixed quotes from USD 2,900, explained in plain English.",
    cta: "Get a Fixed Quote",
  },
  valueProp: {
    heading: "Fix the Jobs That Eat Your Week",
    intro: "You do not need a digital transformation. You need the quoting, invoicing, booking or follow-up that takes hours every week to take minutes. We find that job and fix it.",
    problems: [
      "Copying details from inquiry emails into a spreadsheet, then into Xero?",
      "Quotes and invoices that take an evening to prepare?",
      "Leads from your website that sit unanswered for a day or two?",
      "A website that looks fine but does not bring in inquiries?",
      "Past developers who were hard to reach or blew the budget?",
    ],
    answers: [
      { title: "Automation between your apps", desc: "We connect your forms, email, CRM and accounting software so information is entered once and moves on its own." },
      { title: "Quoting and invoicing in minutes", desc: "Templates, price lists and one-click invoices pushed straight to your accounting software." },
      { title: "Instant lead follow-up", desc: "Inquiries get an immediate reply, land in your CRM and remind you to call. No lead goes cold." },
      { title: "A website that gets found", desc: "Fast pages, local SEO and clear calls to action, so people searching in your town can find and contact you." },
      { title: "A fixed price and one contact", desc: "You get a written quote, a delivery date and one person who answers your messages." },
    ],
  },
  services: {
    heading: "What We Do for Small Businesses",
    intro: "Small, well-defined projects that pay for themselves quickly. Most take two to six weeks.",
    cards: [
      { title: "Business Automation", desc: "Connect the apps you already pay for and automate quoting, invoicing, onboarding and reporting.", slug: "ai-automation" },
      { title: "Accounting Software Integrations", desc: "Sync invoices, payments and contacts between Xero or QuickBooks and everything else you use.", slug: "systems-integration" },
      { title: "Websites and Online Stores", desc: "Fast, search-friendly websites and Shopify stores that turn visitors into inquiries and orders." },
      { title: "Booking and Customer Portals", desc: "Online booking, payments and a place for customers to see their jobs and documents.", slug: "custom-software" },
      { title: "Local SEO", desc: "Google Business Profile, reviews and location pages so you show up when locals search.", slug: "seo" },
      { title: "Google and Meta Ads", desc: "Small, tightly managed ad budgets focused on phone calls and inquiries.", slug: "performance-marketing" },
    ],
  },
  visual: {
    heading: "Small Projects, Quick Payback",
    desc: "We would rather fix one process properly for a few thousand dollars than sell you a platform you do not need. If it saves you five hours a week, the next project is an easy decision.",
    terminal: (
      <TerminalBlock
        lines={[
          "$ forrof automate --workflow new-inquiry",
          "",
          "⬡ When a website form is submitted",
          "  ├── Reply to customer ......... ✓ instant",
          "  ├── Create CRM contact ........ ✓ done",
          "  ├── Draft quote ............... ✓ ready",
          "  └── Remind owner to call ...... ✓ set",
          "",
          "⬡ When the quote is accepted",
          "  └── Invoice created in Xero ... ✓ sent",
          "",
          "✓ Manual steps removed: 6",
        ]}
      />
    ),
  },
  stats,
  techStack: {
    intro: "We build on tools small businesses already know, so you are never locked into something only we can maintain.",
    items: [
      { name: "Xero", desc: "Invoices, payments and contacts in sync." },
      { name: "QuickBooks", desc: "Accounting integration." },
      { name: "Shopify", desc: "Online stores and product catalogs." },
      { name: "Stripe", desc: "Online payments and subscriptions." },
      { name: "Zapier", desc: "Quick automations between apps." },
      { name: "Make", desc: "More complex automated workflows." },
      { name: "WordPress", desc: "Websites you can edit yourself." },
      { name: "HubSpot", desc: "CRM and email follow-up." },
    ],
  },
  whyUs: [
    { title: "Plain English, no jargon", desc: "We explain what we are doing and why, and we tell you when a cheaper off-the-shelf tool would do the job." },
    fixedQuote,
    hours,
    { title: "Support after launch", desc: "Thirty days of support is included, and a monthly plan is available if you want us on call." },
    ownership,
  ],
  sideVisual: <GridMatrix3D className="h-[500px] w-full" />,
  industries: {
    label: "Who We Work With",
    heading: "Small Businesses We Help",
    items: [
      { title: "Trades and Home Services", points: [
        "Job booking, quoting and invoicing connected to your accounting software.",
        "Automatic follow-up on quotes that have not been accepted.",
        "Local SEO and Google Ads for your service area.",
      ] },
      { title: "Professional Services", points: [
        "Client onboarding forms and document collection.",
        "Client portals for files, updates and invoices.",
        "Time tracking and billing automation.",
      ] },
      { title: "Retail and E-commerce", points: [
        "Shopify stores connected to stock and accounting.",
        "Abandoned cart and repeat purchase emails.",
        "Product and sales reporting.",
      ] },
      { title: "Hospitality and Tourism", points: [
        "Online bookings and payments.",
        "Review requests and repeat visitor offers.",
        "Seasonal ad campaigns.",
      ] },
      { title: "Clinics and Studios", points: [
        "Online booking and reminders.",
        "Membership and class payments.",
        "Intake forms completed before the visit.",
      ] },
    ],
  },
  process: {
    steps: [
      { num: "01", title: "A 30-minute call", desc: "You tell us what takes the most time. We ask questions and suggest the simplest fix." },
      { num: "02", title: "A written quote", desc: "A fixed price, what is included and when it will be finished." },
      { num: "03", title: "We build it", desc: "You see progress every week and can ask for changes." },
      { num: "04", title: "You test it", desc: "We adjust it until it fits how you work." },
      { num: "05", title: "Go live", desc: "We switch it on and show your team how to use it." },
      { num: "06", title: "We stay on call", desc: "Thirty days of support, then a monthly plan if you want one." },
    ],
  },
  faqs: [
    { q: "How much does a small business project cost?", a: "Most small business projects cost between USD 2,900 and 9,000. Automations and integrations are at the lower end. Custom portals and apps cost more. You always get a fixed quote first." },
    { q: "Can you connect my software to Xero or QuickBooks?", a: "Yes. We connect websites, CRMs, booking tools and job management software to Xero, QuickBooks and other accounting software, so invoices and payments stay in sync." },
    { q: "Do I need custom software, or will an existing app do?", a: "Often an existing app with the right automation is enough, and we will tell you if that is the case. Custom software makes sense when no product fits how you work." },
    { q: "How quickly can you start?", a: "Usually within a week of you approving the quote. Most small business projects are finished in two to six weeks." },
  ],
  cta: { heading: "Tell us what takes too long.", label: "Get a Fixed Quote" },
};

const midSized: ServicePageContent = {
  slug: "mid-sized-business",
  name: "Software for Mid-Sized Businesses",
  section,
  meta: seo("/industries/mid-sized-business"),
  hero: {
    heading: "Software for Mid-Sized Businesses",
    intro: "Custom platforms, integrations and a dedicated development team for companies that have outgrown spreadsheets and off-the-shelf tools.",
    cta: "Book a Scoping Call",
  },
  valueProp: {
    heading: "When Your Systems Stop Keeping Up",
    intro: "Somewhere between 30 and 300 staff, the tools that got you here start slowing you down. You do not need an enterprise suite. You need your existing systems connected, and custom software for the gaps.",
    problems: [
      "Each department runs its own system, and nobody trusts the combined numbers?",
      "Your ERP or CRM does most of what you need, and staff work around the rest in Excel?",
      "The internal IT team is fully occupied keeping things running?",
      "Month-end reporting takes a week of exports and manual fixes?",
      "A vendor quoted an enterprise price for a mid-sized problem?",
    ],
    answers: [
      { title: "One version of the numbers", desc: "We integrate your ERP, CRM, finance and operational systems into a single reporting layer, with agreed definitions for every metric." },
      { title: "Custom tools for the gaps", desc: "Where your core systems fall short, we build focused tools that sit alongside them and share their data." },
      { title: "Extra engineering capacity", desc: "A dedicated team works to your roadmap, in your tools, alongside your IT staff. You can add or remove people month to month." },
      { title: "Automated reporting", desc: "Dashboards and scheduled reports built from live data, so month-end is a review and not a project." },
      { title: "Pricing that fits your size", desc: "A fixed quote per project, or a monthly rate per developer. Both are a fraction of local agency rates." },
    ],
  },
  services: {
    heading: "Services for Mid-Sized Companies",
    intro: "Project work for defined outcomes, and dedicated teams when you need ongoing capacity.",
    cards: [
      { title: "Systems Integration", desc: "Connect ERP, CRM, accounting, warehouse and HR systems so data flows without re-keying.", slug: "systems-integration" },
      { title: "Custom Business Platforms", desc: "Operations, customer and partner portals built around your processes.", slug: "custom-software" },
      { title: "Workflow and AI Automation", desc: "Approvals, document handling and routine decisions automated, with people in the loop where it matters.", slug: "ai-automation" },
      { title: "Reporting and Dashboards", desc: "A data warehouse and dashboards your leadership team can rely on." },
      { title: "Legacy Modernization", desc: "Replace ageing systems in stages, without a risky big-bang switch.", slug: "enterprise" },
      { title: "Dedicated Development Team", desc: "Senior engineers, QA and a project lead working to your roadmap from USD 3,490 per developer per month." },
    ],
  },
  visual: {
    heading: "Add Capacity Without Adding Headcount",
    desc: "Our engineers join your stand-ups, use your ticketing system and follow your code review process. You direct the work, and we handle hiring, management and continuity.",
    terminal: (
      <TerminalBlock
        lines={[
          "$ forrof team --status sprint",
          "",
          "⬡ Dedicated Team",
          "  ├── Senior developers ......... 3",
          "  ├── QA engineer ............... 1",
          "  └── Project lead .............. 1",
          "",
          "⬡ This Sprint",
          "  ├── ERP to CRM sync ........... ✓ shipped",
          "  ├── Sales dashboard ........... ✓ in review",
          "  └── Approval workflow ......... in progress",
          "",
          "✓ Demo: Thursday, your time zone",
        ]}
      />
    ),
  },
  stats,
  techStack: {
    intro: "A mainstream stack your own team can maintain, integrated with the business systems mid-sized companies commonly run.",
    items: [
      { name: "React", desc: "Internal tools and customer portals." },
      { name: "Node.js", desc: "APIs and integration services." },
      { name: ".NET", desc: "Integration with Microsoft-based systems." },
      { name: "PostgreSQL", desc: "Operational data and reporting." },
      { name: "Snowflake", desc: "Data warehousing across systems." },
      { name: "Azure", desc: "Hosting for Microsoft-centred organizations." },
      { name: "AWS", desc: "Hosting in the region you choose." },
      { name: "HubSpot", desc: "CRM and marketing integration." },
    ],
  },
  whyUs: [
    { title: "We work alongside your IT team", desc: "We fit into your tools, security rules and release process, and we document everything so your team is never dependent on us." },
    { title: "Continuity you can plan around", desc: "A named project lead, a stable team and written handovers. If someone goes on leave, the work continues." },
    hours,
    fixedQuote,
    ownership,
  ],
  sideVisual: <CloudCluster3D className="h-[500px] w-full" />,
  industries: {
    label: "Who We Work With",
    heading: "Mid-Sized Companies We Help",
    items: [
      { title: "Professional Services Firms", points: [
        "Practice, time and billing systems integrated with finance.",
        "Client portals and document automation.",
        "Utilization and profitability dashboards.",
      ] },
      { title: "Agribusiness and Food Producers", points: [
        "Farm, packing and supply chain systems connected.",
        "Traceability and compliance reporting.",
        "Grower and supplier portals.",
      ] },
      { title: "Distribution and Wholesale", points: [
        "Order, inventory and warehouse integrations.",
        "B2B ordering portals for customers.",
        "Sales and margin reporting.",
      ] },
      { title: "Healthcare Groups", points: [
        "Multi-site booking and patient communication.",
        "Clinic systems integrated with finance.",
        "Group-wide reporting.",
      ] },
      { title: "Financial Services", points: [
        "Client onboarding and document workflows.",
        "Reconciliation and reporting automation.",
        "Adviser and client portals.",
      ] },
    ],
  },
  process: {
    steps: [
      { num: "01", title: "Systems review", desc: "We map your systems and data flows and list where time and accuracy are being lost." },
      { num: "02", title: "Roadmap", desc: "A prioritized plan with costs, so you can fund the highest-value work first." },
      { num: "03", title: "First delivery", desc: "One integration or tool delivered in weeks, to prove the approach." },
      { num: "04", title: "Scale the team", desc: "Add engineers as the roadmap grows, or keep it project by project." },
      { num: "05", title: "Handover and documentation", desc: "Your team gets code, documentation and training." },
      { num: "06", title: "Ongoing support", desc: "A support plan with agreed response times." },
    ],
  },
  faqs: [
    { q: "How does a dedicated development team work?", a: "You get named senior engineers who work only on your projects, join your meetings and use your tools. You set priorities. We handle recruitment, management and cover. Pricing starts at USD 3,490 per developer per month, and you can change the team size monthly." },
    { q: "Can you integrate with our ERP and CRM?", a: "Yes, provided they expose an API or data export. We connect ERP, CRM, accounting and operational systems, and we confirm feasibility during the systems review." },
    { q: "How do you work with our internal IT team?", a: "We follow your security policies, code review process and release schedule, and we document everything we build so your team can maintain it." },
    { q: "Where is our data hosted?", a: "Wherever you require. We deploy to the AWS or Azure region closest to your users, or the one your compliance team specifies." },
  ],
  cta: { heading: "Outgrown your current systems?", label: "Book a Scoping Call" },
};

const government: ServicePageContent = {
  slug: "government",
  name: "Public Sector Software Development",
  section,
  meta: seo("/industries/government"),
  hero: {
    heading: "Public Sector Software Development",
    intro: "Accessible websites, online forms and internal tools for local government, public organizations and the agencies that deliver for them.",
    cta: "Discuss Your Project",
  },
  valueProp: {
    heading: "Digital Services People Can Actually Use",
    intro: "Public services have to work for everyone, including people on old phones, slow connections and screen readers. We build to accessibility standards from the first screen and test with real users.",
    problems: [
      "Residents still download a PDF, print it and post it back?",
      "A website that does not meet accessibility requirements?",
      "Staff re-typing online submissions into an internal system?",
      "A legacy system that works, with nobody left who understands it?",
      "A small project that is too minor for your large suppliers?",
    ],
    answers: [
      { title: "Online forms that complete the job", desc: "Applications, payments and status updates in one flow, with the data delivered straight to your back-office system." },
      { title: "Accessibility from the start", desc: "We design and test to WCAG 2.2 AA, including keyboard navigation, screen readers and plain-language content." },
      { title: "Integration with existing systems", desc: "Submissions arrive in your records, finance or case system through secure APIs, with no manual re-entry." },
      { title: "Documented modernization", desc: "We document what the old system does, replace it in stages and keep it running until the new one is proven." },
      { title: "Right-sized delivery", desc: "Fixed-price projects sized for a small team, delivered directly or as a subcontractor to your primary supplier." },
    ],
  },
  services: {
    heading: "Public Sector Digital Services",
    intro: "Focused projects delivered to a fixed scope and price, with the documentation your procurement and security teams will ask for.",
    cards: [
      { title: "Accessible Websites", desc: "Fast, plain-language websites built and tested to WCAG 2.2 AA." },
      { title: "Online Forms and Applications", desc: "Permits, bookings, requests and payments completed online, with status tracking." },
      { title: "Internal Workflow Tools", desc: "Case tracking, approvals and reporting tools for staff." },
      { title: "Systems Integration", desc: "Secure connections between public-facing services and back-office systems.", slug: "systems-integration" },
      { title: "Legacy Modernization", desc: "Staged replacement of ageing systems with full documentation." },
      { title: "Document and Inquiry Automation", desc: "AI-assisted sorting and summarizing of inquiries and documents, with staff making every decision.", slug: "ai-automation" },
    ],
  },
  visual: {
    heading: "Built to Be Checked",
    desc: "Accessibility reports, security documentation, test results and source code are delivered with every project, so your reviewers can verify the work themselves.",
    terminal: (
      <TerminalBlock
        lines={[
          "$ forrof audit --service online-forms",
          "",
          "⬡ Accessibility",
          "  ├── WCAG 2.2 AA ............... ✓ tested",
          "  ├── Keyboard navigation ....... ✓ pass",
          "  └── Screen reader ............. ✓ pass",
          "",
          "⬡ Delivery",
          "  ├── Documentation ............. ✓ supplied",
          "  ├── Source code ............... ✓ handed over",
          "  └── Hosting region ............ ✓ in-country",
          "",
          "✓ Ready for review",
        ]}
      />
    ),
  },
  stats,
  techStack: {
    intro: "Open, widely supported technology that any future supplier can maintain, hosted in the region you require.",
    items: [
      { name: "React", desc: "Accessible front ends." },
      { name: "Next.js", desc: "Fast, server-rendered public websites." },
      { name: "Node.js", desc: "APIs and integrations." },
      { name: ".NET", desc: "Integration with Microsoft-based systems." },
      { name: "PostgreSQL", desc: "Reliable open-source database." },
      { name: "Azure", desc: "Regional hosting." },
      { name: "AWS", desc: "Regional hosting." },
      { name: "Docker", desc: "Portable, repeatable deployments." },
    ],
  },
  whyUs: [
    { title: "Accessibility is part of the build", desc: "We test with keyboards and screen readers throughout the project, not in a single audit at the end." },
    { title: "No lock-in", desc: "Open technology, full documentation and source code handed over, so any supplier can take the work on." },
    { title: "Happy to subcontract", desc: "We can deliver directly or work under your existing panel supplier." },
    hours,
    fixedQuote,
  ],
  sideVisual: <StrategyCompass3D className="h-[500px] w-full" />,
  industries: {
    label: "Who We Work With",
    heading: "Public Organizations We Can Help",
    items: [
      { title: "Local Government", points: [
        "Online applications for permits, bookings and requests.",
        "Accessible websites and service pages.",
        "Integration with records and finance systems.",
      ] },
      { title: "Education Providers", points: [
        "Enrolment and application portals.",
        "Student and parent communication tools.",
        "Reporting dashboards.",
      ] },
      { title: "Health and Community Organizations", points: [
        "Referral and booking systems.",
        "Client and case tracking.",
        "Funding and outcome reporting.",
      ] },
      { title: "Industry Bodies and Not-for-Profits", points: [
        "Membership and event systems.",
        "Grant application portals.",
        "Member directories and resources.",
      ] },
      { title: "Suppliers to Government", points: [
        "Extra engineering capacity for existing contracts.",
        "Accessibility remediation.",
        "Integration and automation work.",
      ] },
    ],
  },
  process: {
    steps: [
      { num: "01", title: "Discovery", desc: "We review the service, its users and the systems it must connect to." },
      { num: "02", title: "Scope and documentation", desc: "A fixed scope, price and the documents your procurement process needs." },
      { num: "03", title: "Design and user testing", desc: "Prototypes tested with real users, including people who use assistive technology." },
      { num: "04", title: "Build", desc: "Fortnightly demos and accessibility checks throughout." },
      { num: "05", title: "Security and accessibility review", desc: "Testing and reports supplied for your reviewers." },
      { num: "06", title: "Launch and handover", desc: "Deployment, training, documentation and source code." },
    ],
    note: "* We are a small team and best suited to focused projects. We do not hold government security certifications, and we will say so clearly if a project requires them.",
  },
  faqs: [
    { q: "Do you build to accessibility standards?", a: "Yes. We design, build and test to WCAG 2.2 AA, the level most government accessibility standards reference, including Section 508 and EN 301 549." },
    { q: "Can data be hosted in our own country?", a: "Yes. We deploy to the cloud region you specify, or to your own infrastructure." },
    { q: "Can you work as a subcontractor?", a: "Yes. We can work as an extension of another team and deliver under your existing supplier or panel arrangement." },
    { q: "What size of project suits you?", a: "Focused projects such as an online form, a website rebuild, an integration or an internal tool. For large multi-year programs we work best as a specialist partner to a lead supplier." },
  ],
  cta: { heading: "Have a public service that should be online?", label: "Discuss Your Project" },
};

export const industryPages = { fintech, health, transport, smallBusiness, midSized, government };
export type IndustryPageKey = keyof typeof industryPages;

const IndustryPage = ({ page }: { page: IndustryPageKey }) => <ServicePageTemplate key={page} content={industryPages[page]} />;

export default IndustryPage;
