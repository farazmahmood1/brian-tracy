import { ServicePageTemplate, TerminalBlock, type ServicePageContent } from "@/components/ServicePageTemplate";
import { WireSphere3D } from "@/components/AiMlVisuals";

const agriculture: ServicePageContent = {
  slug: "agriculture",
  name: "Agriculture & AgriTech Software",
  section: { label: "Industries", path: "/industries" },
  meta: {
    title: "Agriculture & AgriTech Software Development NZ & Australia | Farm Software, Automation & Support | Forrof",
    description: "Agriculture software development, automation, and ongoing support for New Zealand and Australian farms and agribusinesses - farm management platforms, offline field apps, John Deere and Climate FieldView integrations, and compliance reporting.",
    keywords: "agriculture software development, AgriTech New Zealand, farm management software Australia, farm software development, agritech software company, farm app development, John Deere API integration, Climate FieldView integration, Freshwater Farm Plan software, farm compliance reporting, agribusiness automation",
  },
  hero: {
    heading: "Agriculture & AgriTech Software",
    intro: "Farm management platforms, offline-ready field apps, equipment and data integrations, automation, and ongoing support - for farms and agribusinesses across New Zealand and Australia.",
    cta: "Book a Free AgriTech Consultation",
  },
  valueProp: {
    heading: "Farm Software That Works the Way You Farm",
    intro: "Most farms already juggle several systems that don't talk to each other. We connect them, automate the paperwork, and build tools that work in the paddock - not just in the office.",
    problems: [
      "Re-entering the same data into farm, equipment, accounting, and compliance systems?",
      "Compliance reporting - like Freshwater Farm Plans - eating hours of paperwork every season?",
      "Field apps that stop working the moment you lose rural coverage?",
      "Unsure whether new technology will actually pay back on your operation?",
      "Software vendors who disappear after launch, leaving no one to support your team?",
    ],
    answers: [
      { title: "Connected Farm Data", desc: "We integrate equipment, agronomy, stock, and accounting systems - including John Deere Operations Center and Climate FieldView - so data is entered once and available everywhere." },
      { title: "Automated Compliance Reporting", desc: "We pull farm records into the reports regulators, processors, and auditors require, so compliance becomes a review step instead of a paperwork project." },
      { title: "Offline-First Field Apps", desc: "Mobile apps that record work, inspections, and observations without coverage, then sync automatically when you're back in range." },
      { title: "ROI-First Pilots", desc: "We start with a small, fixed-price pilot on one workflow, measure the time and money saved, then scale what works." },
      { title: "Ongoing Support & Maintenance", desc: "A dedicated support team keeps your systems running, updated, and improving - season after season." },
    ],
  },
  services: {
    heading: "Agriculture Software, Automation & Support Services",
    intro: "From a single integration to a full farm management platform - designed for New Zealand and Australian conditions, and supported long after launch.",
    cards: [
      { title: "Farm Management Platforms", desc: "Field, stock, contract, and financial records in one system - like the Bushel farm management platform we helped build for grain farmers." },
      { title: "Equipment & Agronomy Integrations", desc: "Connect John Deere Operations Center, Climate FieldView, and other farm platforms with your records and reporting." },
      { title: "Offline-Ready Field Apps", desc: "iOS and Android apps for recording paddock work, spraying, inspections, and stock movements - even without coverage." },
      { title: "Compliance & Reporting Automation", desc: "Automated reports for environmental, food safety, and processor requirements, built from the data you already capture." },
      { title: "Supply Chain & Traceability", desc: "Track produce and stock from farm to processor with a full audit trail for buyers and auditors." },
      { title: "AgriTech Support & Maintenance", desc: "Ongoing support, monitoring, updates, and user help for farm software and agritech products." },
    ],
  },
  visual: {
    heading: "Built for the Paddock and the Office",
    desc: "Offline sync, simple interfaces for field staff, and reliable integrations behind the scenes - so the system gets used every day, not just set up once.",
    terminal: (
      <TerminalBlock
        lines={[
          "$ forrof sync --farm --offline-ready",
          "",
          "⬡ Connected Systems",
          "  ├── John Deere Ops Center ..... ✓ synced",
          "  ├── Climate FieldView ......... ✓ synced",
          "  ├── Stock Records ............. ✓ up to date",
          "  └── Xero ...................... ✓ invoices synced",
          "",
          "⬡ Field App",
          "  ├── Offline Records ........... ✓ 48 queued",
          "  └── Auto-sync on Coverage ..... ✓ enabled",
          "",
          "✓ Compliance report ready for review",
        ]}
      />
    ),
  },
  stats: [
    { value: "150+", label: "Projects Shipped" },
    { value: "98%", label: "Client Satisfaction" },
    { value: "5/5", label: "Rating for Cost on Clutch" },
    { value: "20+", label: "Industries Served" },
  ],
  techStack: {
    intro: "We use proven, well-supported technology and integrate with the platforms farms already rely on.",
    items: [
      { name: "John Deere API", desc: "Machinery, field operations, and yield data from John Deere Operations Center." },
      { name: "Climate FieldView API", desc: "Agronomy and field data integrated with your farm records." },
      { name: "React Native", desc: "Offline-ready iOS and Android field apps from one codebase." },
      { name: "Flutter", desc: "Fast, natively compiled mobile apps for field teams." },
      { name: "Node.js", desc: "Reliable APIs and integration services." },
      { name: "Python", desc: "Data processing, forecasting, and computer vision." },
      { name: "PostgreSQL", desc: "Dependable storage for farm, stock, and compliance records." },
      { name: "Xero", desc: "Farm financials connected to operational data." },
    ],
  },
  whyUs: [
    { title: "Real AgriTech Experience", desc: "We helped build Bushel's farm management platform, integrating John Deere Operations Center, Climate FieldView, and a network of grain facilities." },
    { title: "Dedicated Support Team", desc: "Our agriculture team handles operations and support, so your software stays reliable through every season." },
    { title: "Designed for Rural Conditions", desc: "Offline-first apps, simple interfaces for field staff, and integrations that remove double entry." },
    { title: "Live Calls in NZ & AU Hours", desc: "Calls, demos, and support between 12-5pm AEST and 2-5pm NZT." },
    { title: "Fixed-Price Pilots", desc: "Start small on one workflow, prove the return, then scale - no large upfront commitment." },
  ],
  sideVisual: <WireSphere3D className="h-[500px] w-full" />,
  industries: {
    heading: "Agriculture Sectors We Support",
    items: [
      { title: "Dairy", points: [
        "Herd and milking data: Bring herd, milk, and health records together in one view.",
        "Compliance reporting: Automate environmental and processor reporting from existing records.",
        "Staff task apps: Simple mobile checklists for shed and paddock work.",
      ] },
      { title: "Horticulture & Kiwifruit", points: [
        "Orchard management: Block-level records for spraying, labour, and harvest.",
        "Packhouse and traceability: Track fruit from block to packhouse with full audit trails.",
        "Seasonal labour tools: Rostering, timesheets, and onboarding for seasonal staff.",
      ] },
      { title: "Viticulture & Wine", points: [
        "Vineyard records: Spray diaries, canopy work, and harvest data per block.",
        "Winery integrations: Connect vineyard and winery systems with accounting.",
        "Sustainability reporting: Automate certification and audit data.",
      ] },
      { title: "Sheep, Beef & Livestock", points: [
        "Stock records: Movements, health treatments, and weights in one system.",
        "Animal tracing data: Keep tracing and movement records accurate and audit-ready.",
        "Grazing and feed planning: Data-driven planning across blocks and seasons.",
      ] },
      { title: "Arable & Grain", points: [
        "Field profitability: Track costs, yields, and contracts per paddock - like the Bushel platform.",
        "Equipment data: Pull machinery and agronomy data from John Deere and Climate FieldView.",
        "Grain contracts: Manage contracts, deliveries, and settlements digitally.",
      ] },
      { title: "Rural Services & AgriTech Companies", points: [
        "Product development: MVPs and platforms for agritech startups.",
        "Customer portals: Self-service portals for farm clients of rural service businesses.",
        "Support and maintenance: Ongoing engineering and user support for agritech products.",
      ] },
    ],
  },
  process: {
    steps: [
      { num: "01", title: "Farm Workflow Review", desc: "We walk through how data and paperwork move across your operation today and find the biggest time savings." },
      { num: "02", title: "Fixed-Price Pilot", desc: "We build or integrate one high-value workflow first, with clear success measures." },
      { num: "03", title: "Field Testing", desc: "Your team uses it in real conditions - in the paddock, shed, and office - and we refine it." },
      { num: "04", title: "Roll Out", desc: "We extend the solution across teams, sites, and systems." },
      { num: "05", title: "Training", desc: "Simple training and guides for owners, managers, and field staff." },
      { num: "06", title: "Ongoing Support", desc: "Monitoring, updates, and support through every season." },
    ],
    note: "* Most pilots are scoped around one season-critical workflow and delivered in weeks.",
  },
  faqs: [
    { q: "Do you build software for New Zealand and Australian farms?", a: "Yes. We build and support farm management software, field apps, integrations, and compliance reporting tools for farms and agribusinesses in New Zealand and Australia." },
    { q: "Can you integrate with John Deere and Climate FieldView?", a: "Yes. We have integrated John Deere Operations Center and Climate FieldView into a farm management platform, and can connect them with your records, reporting, and accounting." },
    { q: "Will the app work without mobile coverage?", a: "Yes. We build offline-first field apps that store records on the device and sync automatically once coverage returns." },
    { q: "Do you provide ongoing support after launch?", a: "Yes. Our agriculture team provides ongoing support, maintenance, and improvements on a monthly plan, so your software keeps working season after season." },
  ],
  cta: { heading: "Let's make your farm data work for you.", label: "Book a Free AgriTech Consultation" },
};

const AgriculturePage = () => <ServicePageTemplate content={agriculture} />;

export default AgriculturePage;
