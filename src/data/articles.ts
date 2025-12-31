export interface Article {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  tags: string[];
}

export const articles: Article[] = [
  {
    id: "future-of-brand-identity",
    title: "The Future of Brand Identity in a Digital-First World",
    category: "Branding",
    date: "Dec 15, 2024",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1200&q=80",
    excerpt: "Exploring how digital transformation is reshaping brand identity strategies for modern businesses.",
    content: `
      <p>In an era where digital presence defines business success, brand identity has evolved far beyond logos and color palettes. Today's brands must navigate a complex landscape of touchpoints, from mobile apps to social media, from AR experiences to voice interfaces.</p>
      
      <h2>The Digital Evolution of Branding</h2>
      <p>The traditional approach to brand identity—static logos, fixed guidelines, and print-focused assets—is giving way to dynamic, responsive brand systems. Modern brands need to be fluid, adapting their expression while maintaining core recognition across wildly different contexts.</p>
      
      <p>Consider how a brand must appear consistently yet appropriately across a 4K display, a smartwatch notification, a social media story, and a virtual reality environment. This demands a new approach to brand architecture—one built on principles rather than rigid rules.</p>
      
      <h2>Key Principles for Digital-First Branding</h2>
      <p>First, embrace systematic flexibility. Your brand should have a robust system of components that can be recombined and adapted. Think of it as a visual language rather than a fixed template. Second, prioritize motion and interaction. In digital spaces, how your brand moves and responds is as important as how it looks static. Third, consider the full sensory experience—sound design, haptic feedback, and even spatial presence in AR/VR contexts are becoming essential brand touchpoints.</p>
      
      <h2>The Role of AI in Brand Evolution</h2>
      <p>Artificial intelligence is increasingly playing a role in brand expression, from generating personalized content to adapting brand elements in real-time based on context and user preferences. This raises important questions about brand consistency and authenticity that forward-thinking companies must address.</p>
      
      <p>The future belongs to brands that can maintain their essential character while continuously evolving their expression. It's not about abandoning tradition—it's about building on it with the tools and thinking of tomorrow.</p>
    `,
    author: {
      name: "Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
      role: "Brand Strategist"
    },
    tags: ["Branding", "Digital Strategy", "Design Systems", "Innovation"]
  },
  {
    id: "micro-interactions-ui-design",
    title: "Mastering the Art of Micro-Interactions in UI Design",
    category: "UI/UX",
    date: "Dec 10, 2024",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&q=80",
    excerpt: "How subtle animations and micro-interactions can dramatically improve user experience.",
    content: `
      <p>The difference between a good interface and a great one often lies in the details—specifically, the micro-interactions that guide, delight, and inform users throughout their journey. These subtle animations and feedback mechanisms are the secret sauce of exceptional user experience.</p>
      
      <h2>What Makes a Great Micro-Interaction?</h2>
      <p>Great micro-interactions share four key characteristics: they serve a clear purpose, feel natural and expected, provide immediate feedback, and add personality without becoming distracting. The best ones are so seamless that users don't consciously notice them—they just feel that the interface "works well."</p>
      
      <h2>The Psychology Behind the Magic</h2>
      <p>Micro-interactions tap into fundamental aspects of human psychology. They reduce cognitive load by providing clear feedback, create emotional connections through playful touches, and build user confidence by making the interface feel responsive and alive.</p>
      
      <p>When a button slightly pulses on hover, when a toggle switch bounces satisfyingly into place, when a form field gently shakes to indicate an error—these moments create a dialogue between user and interface that makes the experience feel human and intuitive.</p>
      
      <h2>Implementation Best Practices</h2>
      <p>Timing is everything. Most micro-interactions should complete in 100-300ms—fast enough to feel responsive, slow enough to be perceived. Use easing functions to create natural-feeling motion, and always consider reduced-motion preferences for accessibility.</p>
      
      <p>Remember: the goal is to enhance, not to show off. Every animation should serve the user's goals, not the designer's ego.</p>
    `,
    author: {
      name: "Alex Rivera",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
      role: "UI Designer"
    },
    tags: ["UI Design", "Animation", "User Experience", "Frontend"]
  },
  {
    id: "seo-trends-2025",
    title: "SEO Trends That Will Dominate 2025",
    category: "Marketing",
    date: "Dec 5, 2024",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=1200&q=80",
    excerpt: "Stay ahead of the curve with these emerging SEO strategies and techniques.",
    content: `
      <p>Search engine optimization continues to evolve at a breakneck pace. As we approach 2025, several key trends are emerging that will reshape how we think about search visibility and organic traffic.</p>
      
      <h2>AI-Generated Content and E-E-A-T</h2>
      <p>With the proliferation of AI-generated content, search engines are doubling down on signals of expertise, experience, authoritativeness, and trustworthiness. Original research, first-hand experience, and genuine expertise will become increasingly valuable differentiators.</p>
      
      <h2>Search Generative Experience (SGE)</h2>
      <p>Google's AI-powered search results are changing the game. Optimizing for featured snippets is no longer enough—brands must now consider how to be cited within AI-generated summaries. This means creating content that provides clear, quotable answers while maintaining depth and nuance.</p>
      
      <h2>Video and Visual Search</h2>
      <p>Visual search capabilities are expanding rapidly. From Google Lens to TikTok's search feature, users are increasingly searching with images and videos. Optimizing visual content with proper metadata, structured data, and accessibility features is becoming essential.</p>
      
      <h2>Core Web Vitals and UX Signals</h2>
      <p>Page experience signals continue to grow in importance. Sites that load quickly, remain stable during loading, and respond instantly to user input will have a significant advantage. This isn't just about technical metrics—it's about creating genuinely excellent user experiences.</p>
      
      <p>The most successful SEO strategies in 2025 will be those that put users first, create genuinely valuable content, and build authentic authority in their space.</p>
    `,
    author: {
      name: "Jordan Park",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
      role: "SEO Director"
    },
    tags: ["SEO", "Digital Marketing", "Content Strategy", "Google"]
  },
  {
    id: "design-systems-scale",
    title: "Building Design Systems That Scale",
    category: "Design",
    date: "Nov 28, 2024",
    readTime: "12 min read",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&q=80",
    excerpt: "A comprehensive guide to creating and maintaining design systems for growing organizations.",
    content: `
      <p>A well-built design system is like a well-designed city: it provides structure and consistency while enabling creativity and growth. But building one that truly scales requires careful planning and ongoing commitment.</p>
      
      <h2>Foundations First</h2>
      <p>Start with your design tokens—the atomic values that define your visual language. Colors, typography, spacing, and shadows should be codified as tokens that can be referenced throughout your system. This creates a single source of truth that makes global changes effortless.</p>
      
      <h2>Component Architecture</h2>
      <p>Design your components in layers: primitives (buttons, inputs, cards), patterns (forms, navigation, modals), and templates (page layouts, workflows). Each layer builds on the one below, creating a hierarchy that's both powerful and maintainable.</p>
      
      <h2>Documentation as Product</h2>
      <p>Your design system's documentation is itself a product. It needs to be discoverable, accurate, and helpful. Include usage guidelines, code examples, accessibility notes, and dos and don'ts for each component. Make it easy for teams to do the right thing.</p>
      
      <h2>Governance and Evolution</h2>
      <p>A design system is never "done." Establish clear processes for proposing changes, reviewing updates, and deprecating outdated patterns. Regular audits ensure the system stays healthy and aligned with your products' needs.</p>
      
      <p>Remember: the goal isn't consistency for its own sake. It's enabling teams to build better products faster by giving them the tools and patterns they need.</p>
    `,
    author: {
      name: "Maya Johnson",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
      role: "Design Systems Lead"
    },
    tags: ["Design Systems", "Component Libraries", "Team Collaboration", "Scalability"]
  },
  {
    id: "psychology-of-color",
    title: "The Psychology of Color in Digital Interfaces",
    category: "UI/UX",
    date: "Nov 20, 2024",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1525909002-1b05e0c869d8?w=1200&q=80",
    excerpt: "Understanding how color choices influence user behavior and emotional responses.",
    content: `
      <p>Color is one of the most powerful tools in a designer's arsenal. It influences perception, guides attention, creates emotional responses, and communicates meaning—often before users consciously process what they're seeing.</p>
      
      <h2>Beyond the Basics</h2>
      <p>We all know that red signifies danger and green means go. But effective color psychology goes much deeper. Context matters enormously: the same shade of red that signals an error in a form might suggest luxury on a wine label or excitement on a gaming site.</p>
      
      <h2>Cultural Considerations</h2>
      <p>Color meanings vary significantly across cultures. White represents purity in Western contexts but mourning in some Asian cultures. Blue is universally calming but can be seen as cold or corporate depending on context. Always research your audience's cultural associations with color.</p>
      
      <h2>Accessibility and Contrast</h2>
      <p>Beautiful colors mean nothing if users can't perceive them. Design for colorblind users by never relying on color alone to convey information. Ensure sufficient contrast ratios for text readability. Consider how your palette works in both light and dark modes.</p>
      
      <h2>Strategic Color Systems</h2>
      <p>Build a color system that serves your brand's personality while supporting usability. This typically includes primary and secondary brand colors, semantic colors (success, warning, error, info), and neutral scales for backgrounds and text. Each color should have a clear purpose and usage guidelines.</p>
      
      <p>The best color choices feel inevitable—so right for the context that users can't imagine an alternative. That's the result of careful research, testing, and iteration.</p>
    `,
    author: {
      name: "Chris Wong",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
      role: "Creative Director"
    },
    tags: ["Color Theory", "Psychology", "UI Design", "Accessibility"]
  },
  {
    id: "future-of-web-development",
    title: "The Future of Web Development: What's Next?",
    category: "Technology",
    date: "Nov 15, 2024",
    readTime: "9 min read",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&q=80",
    excerpt: "Exploring emerging technologies and methodologies shaping the future of web development.",
    content: `
      <p>The web development landscape is evolving faster than ever. New frameworks, paradigms, and technologies emerge constantly, promising to revolutionize how we build for the web. Let's look at the trends that will define the next era of web development.</p>
      
      <h2>Edge Computing and CDN Evolution</h2>
      <p>The edge is becoming the new frontier. Serverless functions deployed globally, edge databases, and intelligent caching are enabling applications that are both blazingly fast and infinitely scalable. Expect to see more tools and frameworks built edge-first.</p>
      
      <h2>AI-Assisted Development</h2>
      <p>AI coding assistants are moving from novelty to necessity. They're accelerating development, catching bugs, and even generating entire components. But the best developers will be those who know how to prompt effectively and when to trust—or override—AI suggestions.</p>
      
      <h2>Web Components and Framework Convergence</h2>
      <p>After years of framework fragmentation, we're seeing convergence around standard web platform features. Web Components, though long promised, are finally becoming practical. Meanwhile, frameworks are becoming more interoperable, with tools enabling components to work across React, Vue, Svelte, and beyond.</p>
      
      <h2>Sustainability and Performance</h2>
      <p>Web sustainability is emerging as a serious consideration. Efficient code, optimized assets, and green hosting aren't just nice-to-haves—they're becoming differentiators as both users and organizations prioritize environmental impact.</p>
      
      <p>The future of web development is exciting, challenging, and full of opportunity. The key to thriving is staying curious, embracing change, and focusing on the fundamentals that never go out of style.</p>
    `,
    author: {
      name: "Taylor Martinez",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80",
      role: "Tech Lead"
    },
    tags: ["Web Development", "Technology", "AI", "Edge Computing"]
  }
];

export const getArticleById = (id: string): Article | undefined => {
  return articles.find(article => article.id === id);
};

export const getRelatedArticles = (currentId: string, limit: number = 3): Article[] => {
  const current = getArticleById(currentId);
  if (!current) return articles.slice(0, limit);
  
  return articles
    .filter(article => article.id !== currentId)
    .filter(article => 
      article.category === current.category || 
      article.tags.some(tag => current.tags.includes(tag))
    )
    .slice(0, limit);
};
