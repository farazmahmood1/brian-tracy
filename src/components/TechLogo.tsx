import type { ComponentType, CSSProperties } from "react";
import {
  SiReact, SiNextdotjs, SiNodedotjs, SiExpress, SiTypescript, SiJavascript, SiTailwindcss,
  SiFramer, SiPostgresql, SiMongodb, SiGraphql, SiFirebase, SiStripe, SiMapbox, SiUnity,
  SiFigma, SiPython, SiWebflow, SiHubspot, SiVercel, SiGooglechrome, SiApple, SiAndroid,
  SiJohndeere, SiBunnydotnet, SiWebgl, SiFlutter, SiKotlin, SiSwift, SiAngular, SiDotnet,
  SiGo, SiGooglecloud, SiDocker, SiKubernetes, SiElasticsearch, SiRedis, SiEthereum,
  SiSolidity, SiIpfs, SiWeb3Dotjs, SiClaude, SiLangchain, SiPytorch, SiHuggingface, SiMake,
  SiZapier, SiXero, SiFastapi, SiSnowflake, SiApacheairflow, SiApachekafka, SiLooker,
  SiGooglesearchconsole, SiGoogleanalytics, SiSemrush, SiGoogletagmanager, SiWordpress,
  SiPerplexity, SiGoogleads, SiMeta, SiTiktok, SiShopify, SiGooglemaps, SiMyob, SiSquare, SiQuickbooks,
} from "react-icons/si";
import { FaAws, FaJava, FaLinkedin } from "react-icons/fa6";
import { RiOpenaiFill } from "react-icons/ri";
import { TbBrandTwilio } from "react-icons/tb";
import { VscAzure } from "react-icons/vsc";
import {
  Brain, Cloud, Code2, Database, FileSearch, History, LineChart, Lock, Phone, Radio,
  ShieldCheck, Sprout, Stethoscope, Users, Blocks,
} from "lucide-react";

type IconComponent = ComponentType<{ className?: string; style?: CSSProperties }>;

// `color` is the brand color. Brands whose mark is black or near-black have no
// color so they inherit the surrounding text color and stay visible on dark backgrounds.
const logos: Record<string, { icon: IconComponent; color?: string }> = {
  // Frontend
  "React": { icon: SiReact, color: "#61DAFB" },
  "React Native": { icon: SiReact, color: "#61DAFB" },
  "Next.js": { icon: SiNextdotjs },
  "TypeScript": { icon: SiTypescript, color: "#3178C6" },
  "JavaScript": { icon: SiJavascript, color: "#F7DF1E" },
  "Tailwind CSS": { icon: SiTailwindcss, color: "#06B6D4" },
  "Framer Motion": { icon: SiFramer },
  "Angular": { icon: SiAngular, color: "#DD0031" },
  "Webflow": { icon: SiWebflow, color: "#146EF5" },
  "WebGL": { icon: SiWebgl, color: "#CC3333" },
  "Unity": { icon: SiUnity },
  // Backend & languages
  "Node.js": { icon: SiNodedotjs, color: "#5FA04E" },
  "Express": { icon: SiExpress },
  "Python": { icon: SiPython, color: "#3776AB" },
  ".NET": { icon: SiDotnet, color: "#512BD4" },
  "Java": { icon: FaJava, color: "#ED8B00" },
  "Go": { icon: SiGo, color: "#00ADD8" },
  "GraphQL": { icon: SiGraphql, color: "#E10098" },
  // Mobile
  "Flutter": { icon: SiFlutter, color: "#54C5F8" },
  "Kotlin": { icon: SiKotlin, color: "#7F52FF" },
  "Swift": { icon: SiSwift, color: "#F05138" },
  "iOS Native": { icon: SiApple },
  "Android Native": { icon: SiAndroid, color: "#3DDC84" },
  // Data
  "PostgreSQL": { icon: SiPostgresql, color: "#4169E1" },
  "MongoDB": { icon: SiMongodb, color: "#47A248" },
  "Firebase": { icon: SiFirebase, color: "#FFCA28" },
  "Elasticsearch": { icon: SiElasticsearch, color: "#00BFB3" },
  "Redis": { icon: SiRedis, color: "#FF4438" },
  "Vector Database": { icon: Database },
  // Cloud & infra
  "AWS": { icon: FaAws, color: "#FF9900" },
  "Azure": { icon: VscAzure, color: "#0078D4" },
  "GCP": { icon: SiGooglecloud, color: "#4285F4" },
  "Docker": { icon: SiDocker, color: "#2496ED" },
  "Kubernetes": { icon: SiKubernetes, color: "#326CE5" },
  "Vercel": { icon: SiVercel },
  "Bunny CDN": { icon: SiBunnydotnet, color: "#FFAA00" },
  "SAAS": { icon: Cloud },
  // Services & APIs
  "Stripe": { icon: SiStripe, color: "#635BFF" },
  "Twilio": { icon: TbBrandTwilio, color: "#F22F46" },
  "HubSpot": { icon: SiHubspot, color: "#FF7A59" },
  "Mapbox": { icon: SiMapbox },
  "OpenAI API": { icon: RiOpenaiFill },
  "OpenAI": { icon: RiOpenaiFill },
  "ChatGPT": { icon: RiOpenaiFill },
  "Claude": { icon: SiClaude, color: "#D97757" },
  "Perplexity": { icon: SiPerplexity, color: "#1FB8CD" },
  // AI & automation
  "LangChain": { icon: SiLangchain },
  "PyTorch": { icon: SiPytorch, color: "#EE4C2C" },
  "Hugging Face": { icon: SiHuggingface, color: "#FFD21E" },
  "Make": { icon: SiMake, color: "#6D00CC" },
  "Zapier": { icon: SiZapier, color: "#FF4F00" },
  // Integration & data
  "Xero": { icon: SiXero, color: "#13B5EA" },
  "MYOB": { icon: SiMyob, color: "#6100A5" },
  "QuickBooks": { icon: SiQuickbooks, color: "#2CA01C" },
  "Shopify": { icon: SiShopify, color: "#7AB55C" },
  "Square": { icon: SiSquare },
  "Google Maps": { icon: SiGooglemaps, color: "#4285F4" },
  "FastAPI": { icon: SiFastapi, color: "#009688" },
  "Snowflake": { icon: SiSnowflake, color: "#29B5E8" },
  "Apache Airflow": { icon: SiApacheairflow, color: "#017CEE" },
  "Apache Kafka": { icon: SiApachekafka },
  "Looker Studio": { icon: SiLooker, color: "#4285F4" },
  // SEO & marketing
  "Google Search Console": { icon: SiGooglesearchconsole, color: "#458CF5" },
  "Google Analytics": { icon: SiGoogleanalytics, color: "#E37400" },
  "Semrush": { icon: SiSemrush, color: "#FF642D" },
  "Google Tag Manager": { icon: SiGoogletagmanager, color: "#246FDB" },
  "WordPress": { icon: SiWordpress, color: "#21759B" },
  "Google Ads": { icon: SiGoogleads, color: "#4285F4" },
  "Meta Ads": { icon: SiMeta, color: "#0467DF" },
  "LinkedIn Ads": { icon: FaLinkedin, color: "#0A66C2" },
  "TikTok Ads": { icon: SiTiktok },
  "LinkedIn API": { icon: FaLinkedin, color: "#0A66C2" },
  "John Deere API": { icon: SiJohndeere, color: "#367C2B" },
  "Climate FieldView API": { icon: Sprout, color: "#4CAF50" },
  "Chrome Extension": { icon: SiGooglechrome, color: "#4285F4" },
  "Figma": { icon: SiFigma, color: "#F24E1E" },
  // Blockchain
  "Ethereum": { icon: SiEthereum },
  "Solidity": { icon: SiSolidity },
  "Hyperledger": { icon: Blocks },
  "IPFS": { icon: SiIpfs, color: "#65C2CB" },
  "Web3.js": { icon: SiWeb3Dotjs, color: "#F16822" },
  // Concepts with no brand logo
  "Machine Learning": { icon: Brain },
  "RAG Pipeline": { icon: FileSearch },
  "Quantitative Models": { icon: LineChart },
  "Backtesting Engine": { icon: History },
  "EMR Integrations": { icon: Stethoscope },
  "VOIP": { icon: Phone },
  "HIPAA-Compliant Infrastructure": { icon: ShieldCheck },
  "Real-time Multiplayer": { icon: Users },
  "WebSockets": { icon: Radio },
  "Encryption Libraries": { icon: Lock },
};

const byLowerName = new Map(Object.entries(logos).map(([name, logo]) => [name.toLowerCase(), logo]));

export const TechLogo = ({ name, className = "w-6 h-6" }: { name: string; className?: string }) => {
  const logo = byLowerName.get(name.toLowerCase());
  const Icon = logo?.icon ?? Code2;
  return <Icon className={className} style={logo?.color ? { color: logo.color } : undefined} aria-hidden />;
};
