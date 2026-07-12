/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  ArrowUp,
  ArrowRight,
  TrendingUp,
  Check,
  ChevronDown,
  ChevronRight,
  Sparkles,
  Award,
  Users,
  ShieldCheck,
  Clock,
  ArrowUpRight,
  Activity,
  FileSpreadsheet,
  Globe,
  LineChart,
  HelpCircle,
  Database,
  SearchIcon,
  MessageSquare,
  CheckCircle2,
  Lock,
  Calendar
} from "lucide-react";
import { CtaBanner } from "../components/CtaBanner";

// Intersection Observer Count Up Component for Stats
interface CountUpProps {
  end: number;
  suffix?: string;
  duration?: number;
}

function CountUp({ end, suffix = "", duration = 1500 }: CountUpProps) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let startTime: number | null = null;
          
          const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            setCount(Math.floor(progress * end));
            if (progress < 1) {
              window.requestAnimationFrame(step);
            } else {
              setCount(end);
            }
          };
          window.requestAnimationFrame(step);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [end, duration]);

  return (
    <span ref={elementRef} className="font-mono font-black text-3xl sm:text-4xl lg:text-5xl text-[#FE7146]">
      {count}
      {suffix}
    </span>
  );
}

// Interfaces for What's Included Tabs
interface SeoTab {
  id: string;
  title: string;
  description: string;
  capabilities: string[];
  metric: string;
  metricLabel: string;
  stageName: string;
}

export function Seo({ onContactClick }: { onContactClick: () => void }) {
  // Motion settings
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  // 1. Hero SERP Simulation State
  const [typedQuery, setTypedQuery] = useState("");
  const [serpStep, setSerpStep] = useState(0); // 0: idle/typing, 1: reordering, 2: completed
  const targetQuery = "best performance marketing agency in noida";

  useEffect(() => {
    let timer: any;
    if (prefersReducedMotion) {
      setTypedQuery(targetQuery);
      setSerpStep(2);
      return;
    }

    // Phase 1: Type query
    let charIndex = 0;
    const typeInterval = setInterval(() => {
      if (charIndex < targetQuery.length) {
        setTypedQuery((prev) => prev + targetQuery.charAt(charIndex));
        charIndex++;
      } else {
        clearInterval(typeInterval);
        // Phase 2: Start reordering after typing finishes
        timer = setTimeout(() => {
          setSerpStep(1);
          // Phase 3: Final state after 1.5s climb
          timer = setTimeout(() => {
            setSerpStep(2);
          }, 1800);
        }, 800);
      }
    }, 45);

    return () => {
      clearInterval(typeInterval);
      clearTimeout(timer);
    };
  }, [prefersReducedMotion]);

  // Restart SERP animation for playability
  const handleRestartSerp = () => {
    setTypedQuery("");
    setSerpStep(0);
    let charIndex = 0;
    const typeInterval = setInterval(() => {
      if (charIndex < targetQuery.length) {
        setTypedQuery((prev) => prev + targetQuery.charAt(charIndex));
        charIndex++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => {
          setSerpStep(1);
          setTimeout(() => {
            setSerpStep(2);
          }, 1800);
        }, 800);
      }
    }, 45);
  };

  // 3. What's Included vertical tabs state
  const [activeTab, setActiveTab] = useState("technical");
  const seoTabs: SeoTab[] = [
    {
      id: "technical",
      title: "Technical SEO Audit",
      description: "We patch server settings, index bloating, and Core Web Vitals issues that prevent Google from crawling your system effectively.",
      capabilities: [
        "Core Web Vitals & Speed Optimization",
        "Sitemap & Robots.txt Restructuring",
        "Schema Markup & Rich Snippets Insertion",
        "Bloated Redirect & Loop Resolution"
      ],
      metric: "98/100",
      metricLabel: "Avg. Mobile Audit Speed",
      stageName: "tech_audit"
    },
    {
      id: "on-page",
      title: "On-Page Optimization",
      description: "Fine-tuning HTML structure, keyword placement, metadata hierarchies, and link alignment to ensure immediate semantic relevance.",
      capabilities: [
        "Meta Title & Description Engineering",
        "H1-H6 Heading Semantic Cleansing",
        "Dynamic Keyword-Dense Alt Tags",
        "Smart Internal Link Architecture"
      ],
      metric: "+120%",
      metricLabel: "CTR Performance Lift",
      stageName: "on_page_tune"
    },
    {
      id: "keyword",
      title: "Keyword Research & Strategy",
      description: "We trace buyer-intent terms, identify competitor rank leaks, and claim zero-competition organic opportunities.",
      capabilities: [
        "Forensic Intent Map (Nav, Info, Trans)",
        "Competitor Position Gap Mining",
        "High-Volume, Low-Difficulty Filtering",
        "Long-Tail Conversion Roadmaps"
      ],
      metric: "1.4k+",
      metricLabel: "Transactional Terms Mapped",
      stageName: "keyword_discovery"
    },
    {
      id: "content",
      title: "Content Optimization",
      description: "Crafting comprehensive, authoritative resources that satisfy search intent and keep visitors reading longer.",
      capabilities: [
        "NLP & Search Intent Cleansing",
        "Competitive E-E-A-T Content Layouts",
        "In-depth Topic-Cluster Architecture",
        "Conversion-Optimized In-line CTAs"
      ],
      metric: "4m 12s",
      metricLabel: "Average Time-on-Page",
      stageName: "editorial_production"
    },
    {
      id: "link-building",
      title: "Link Building & Authority",
      description: "Securing premium editorial backlinks from highly reputable, contextual publications that Google respects.",
      capabilities: [
        "Strict White-Hat Editorial Outreach",
        "Niche-Relevant Publisher Placement",
        "Anchor-Text Diversity Stabilization",
        "Toxic Backlink Audit & Cleansing"
      ],
      metric: "DA 70+",
      metricLabel: "Exclusive Partner Network",
      stageName: "backlink_acquisition"
    },
    {
      id: "local",
      title: "Local SEO & GMB",
      description: "Dominating geographical keywords and Google Maps searches for high-intent nearby customers.",
      capabilities: [
        "Google Business Profile Optimization",
        "Geo-Targeted Landing Page Networks",
        "Consistent NAP Citation Syncing",
        "Review Capture Strategy Consulting"
      ],
      metric: "3.2x",
      metricLabel: "Map Pack Phone Calls Lift",
      stageName: "local_citations"
    },
    {
      id: "analytics",
      title: "Analytics & Reporting",
      description: "Complete transparent dashboards showing conversions, rankings, organic pipeline, and real revenue tracking.",
      capabilities: [
        "Google Analytics 4 Multi-Channel setup",
        "Search Console Integrity Audits",
        "Real-Time Keyword Rank Tracking",
        "Attribution Modeling Optimization"
      ],
      metric: "100%",
      metricLabel: "Attributed Revenue Reporting",
      stageName: "transparent_bi"
    }
  ];

  // 4. Process Pipeline Scroll-Scrubbed Progress
  const [scrollProgress, setScrollProgress] = useState(0);
  const pipelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!pipelineRef.current) return;
      const rect = pipelineRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Calculate scroll progress percentage relative to the process section
      const sectionHeight = rect.height;
      const elementTop = rect.top;
      
      // When the top enters the center of viewport to when bottom leaves the viewport
      const startTrigger = viewportHeight * 0.85;
      const endTrigger = viewportHeight * 0.25;
      
      let progress = (startTrigger - elementTop) / (sectionHeight + startTrigger - endTrigger);
      progress = Math.max(0, Math.min(progress, 1));
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const pipelineSteps = [
    {
      num: "01",
      title: "Audit & Competitor Audit",
      desc: "Forensic code crawler crawl to patch site performance logs, index bloat, and competitor keywords.",
      status: "stage_01"
    },
    {
      num: "02",
      title: "Strategic Keyword Roadmaps",
      desc: "Mapping low-difficulty keyword clusters with massive transaction values.",
      status: "stage_02"
    },
    {
      num: "03",
      title: "On-Page & Core Web Vitals Fixes",
      desc: "Optimizing header tags, meta content, and server configurations for instant crawlability.",
      status: "stage_03"
    },
    {
      num: "04",
      title: "Authority & Backlink Sourcing",
      desc: "Acquiring pure editorial placements with high domain authority in your industry.",
      status: "stage_04"
    },
    {
      num: "05",
      title: "Continuous Search Scaling",
      desc: "Live keyword position audits, conversion tuning, and competitor reaction defense.",
      status: "stage_05"
    }
  ];

  // 5. Draggable/Scrubbable Traffic Growth Chart State
  const [activeChartClient, setActiveChartClient] = useState("fintech");
  const [scrubPercent, setScrubPercent] = useState(0.8); // Start at 80% progression
  const scrubberContainerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  // Growth Data Sets
  const clientDataMap: Record<string, {
    name: string;
    industry: string;
    timeline: { month: string; traffic: number; keywords: number; roas?: string; d_point: number }[]
  }> = {
    fintech: {
      name: "RupeeScale Fintech",
      industry: "Financial Services",
      timeline: [
        { month: "Month 1", traffic: 2400, keywords: 45, d_point: 100 },
        { month: "Month 2", traffic: 2900, keywords: 72, d_point: 110 },
        { month: "Month 3", traffic: 4100, keywords: 130, d_point: 140 },
        { month: "Month 4", traffic: 6800, keywords: 210, d_point: 190 },
        { month: "Month 5", traffic: 12400, keywords: 340, d_point: 280 },
        { month: "Month 6", traffic: 21800, keywords: 550, d_point: 380 },
        { month: "Month 7", traffic: 34500, keywords: 820, d_point: 510 },
        { month: "Month 8", traffic: 51200, keywords: 1200, d_point: 680 },
        { month: "Month 9", traffic: 73000, keywords: 1650, d_point: 850 },
        { month: "Month 10", traffic: 98400, keywords: 2200, d_point: 1000 }
      ]
    },
    ecommerce: {
      name: "UrbanGlow Apparel",
      industry: "D2C Fashion Retail",
      timeline: [
        { month: "Month 1", traffic: 8900, keywords: 110, d_point: 120 },
        { month: "Month 2", traffic: 9200, keywords: 145, d_point: 125 },
        { month: "Month 3", traffic: 13400, keywords: 260, d_point: 170 },
        { month: "Month 4", traffic: 19000, keywords: 480, d_point: 230 },
        { month: "Month 5", traffic: 28500, keywords: 710, d_point: 320 },
        { month: "Month 6", traffic: 42000, keywords: 1050, d_point: 460 },
        { month: "Month 7", traffic: 65000, keywords: 1540, d_point: 620 },
        { month: "Month 8", traffic: 98000, keywords: 2100, d_point: 800 },
        { month: "Month 9", traffic: 142000, keywords: 2850, d_point: 980 },
        { month: "Month 10", traffic: 184000, keywords: 3900, d_point: 1200 }
      ]
    },
    saas: {
      name: "ProSync Enterprise",
      industry: "B2B SaaS Platform",
      timeline: [
        { month: "Month 1", traffic: 1100, keywords: 30, d_point: 50 },
        { month: "Month 2", traffic: 1300, keywords: 55, d_point: 60 },
        { month: "Month 3", traffic: 1800, keywords: 90, d_point: 80 },
        { month: "Month 4", traffic: 3200, keywords: 160, d_point: 130 },
        { month: "Month 5", traffic: 5400, keywords: 280, d_point: 200 },
        { month: "Month 6", traffic: 8900, keywords: 410, d_point: 310 },
        { month: "Month 7", traffic: 13500, keywords: 680, d_point: 440 },
        { month: "Month 8", traffic: 21200, keywords: 990, d_point: 620 },
        { month: "Month 9", traffic: 32800, keywords: 1450, d_point: 840 },
        { month: "Month 10", traffic: 48500, keywords: 2100, d_point: 1100 }
      ]
    }
  };

  const selectedClientData = clientDataMap[activeChartClient];
  const maxDataIdx = selectedClientData.timeline.length - 1;
  const currentScrubIndex = Math.min(
    maxDataIdx,
    Math.max(0, Math.floor(scrubPercent * (maxDataIdx + 1)))
  );
  const currentDataPoint = selectedClientData.timeline[currentScrubIndex];

  // Drag logic for chart
  const handleScrubberMove = (clientX: number) => {
    if (!scrubberContainerRef.current) return;
    const rect = scrubberContainerRef.current.getBoundingClientRect();
    const positionX = clientX - rect.left;
    let newPercent = positionX / rect.width;
    newPercent = Math.max(0, Math.min(newPercent, 0.99));
    setScrubPercent(newPercent);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    handleScrubberMove(e.clientX);
    window.addEventListener("mousemove", handleMouseHoldMove);
    window.addEventListener("mouseup", handleMouseHoldUp);
  };

  const handleMouseHoldMove = (e: MouseEvent) => {
    if (!isDragging.current) return;
    handleScrubberMove(e.clientX);
  };

  const handleMouseHoldUp = () => {
    isDragging.current = false;
    window.removeEventListener("mousemove", handleMouseHoldMove);
    window.removeEventListener("mouseup", handleMouseHoldUp);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    isDragging.current = true;
    handleScrubberMove(e.touches[0].clientX);
    window.addEventListener("touchmove", handleTouchHoldMove);
    window.addEventListener("touchend", handleTouchHoldEnd);
  };

  const handleTouchHoldMove = (e: TouchEvent) => {
    if (!isDragging.current) return;
    handleScrubberMove(e.touches[0].clientX);
  };

  const handleTouchHoldEnd = () => {
    isDragging.current = false;
    window.removeEventListener("touchmove", handleTouchHoldMove);
    window.removeEventListener("touchend", handleTouchHoldEnd);
  };

  // 9. FAQ State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const faqs = [
    {
      q: "How long until we start seeing real SEO ranking results?",
      a: "While code fixes and technical index corrections can yield minor crawl boosts within the first 14 days, substantial organic keyword leaps typically take 3 to 6 months of systematic content cluster scaling and white-hat domain authority backing. Organic growth is compounding: the results build slower but last permanently without ongoing ad spend."
    },
    {
      q: "Do you guarantee #1 rankings on Google?",
      a: "Any agency guaranteeing an exact #1 position for broad search terms is lying. Google's ranking algorithm updates continuously and factors in personalized search histories and geography. Instead, we guarantee rigorous white-hat methodology, comprehensive technical excellence, and transparent growth dashboards. We focus on ranking transaction-heavy intent terms that drive high-intent pipeline, not vanity traffic."
    },
    {
      q: "What is included in our monthly reporting?",
      a: "Every month, you receive a full multi-attribution dashboard tracking real business indicators: total organic sessions, transactional search term rankings, Google Search Console crawls, and exact attribution conversions (leads or sales). We review this with you on a direct growth call, detailing technical adjustments completed and next month's publishing pipeline."
    },
    {
      q: "Do you work with our existing website or rebuild it completely?",
      a: "We work with whatever performs best for your bottom-line. If your current stack is stable and fast, we will coordinate directly with your developer or write targeted fixes on your CMS (WordPress, Webflow, Shopify, etc.). However, if your speed score is under 40 and contains massive technical code bloat, we will propose an optimized visual build using Next.js/React to give you a structural head start."
    }
  ];

  return (
    <div className="pt-24 bg-white selection:bg-[#FE7146] selection:text-white">
      
      {/* SECTION 1: HERO - "The Climb" */}
      <section className="relative min-h-[90vh] flex items-center justify-center py-16 overflow-hidden bg-white border-b border-gray-100">
        {/* Subtle grid backdrop */}
        <div className="absolute inset-0 bg-[radial-gradient(#F5F5FA_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-75"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#FFF1EC]/50 blur-3xl -translate-y-1/3 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-[#F5F5FA]/80 blur-3xl translate-y-1/3 -translate-x-1/3"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Hero Left Content */}
            <div className="lg:col-span-5 text-left space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFF1EC] border border-[#FE7146]/20 rounded-full">
                <Sparkles className="w-3.5 h-3.5 text-[#FE7146]" />
                <span className="text-[10px] sm:text-xs font-mono font-black tracking-widest text-[#FE7146] uppercase">
                  // SEARCH ENGINE OPTIMIZATION
                </span>
              </div>

              <h1 className="font-display font-black text-4xl sm:text-5xl text-[#303360] tracking-tight leading-[1.1]">
                Get Found <span className="text-[#FE7146] inline-flex items-center">
                  First
                  <ArrowUp className="w-8 h-8 sm:w-10 sm:h-10 ml-1 text-[#FE7146]" />
                  <span className="text-[#303360]">.</span>
                </span><br />
                Get Chosen More.
              </h1>

              <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal max-w-xl">
                Break your dependency on skyrocketing ad costs. We engineer bulletproof organic funnels combining technical audits, buyer-intent search research, and authoritative backlinks to scale your business.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
                <button
                  onClick={onContactClick}
                  className="w-full sm:w-auto bg-[#FE7146] hover:bg-[#FE7146]/95 text-white font-black text-sm px-8 py-4 rounded-xl shadow-lg shadow-[#FE7146]/20 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Get a Free SEO Audit</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href="#visualized-growth"
                  className="w-full sm:w-auto bg-slate-50 hover:bg-slate-100 text-[#303360] font-black text-sm px-8 py-4 rounded-xl border border-gray-200/60 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>See Real Results</span>
                </a>
              </div>
            </div>

            {/* Hero Right: SEO Dashboard Image */}
            <div className="lg:col-span-7 flex justify-center w-full">
              <div className="w-full relative">
                {/* Soft ambient glow behind the visual */}
                <div className="absolute -inset-3 bg-gradient-to-tr from-[#FE7146]/15 via-transparent to-indigo-400/10 rounded-[2rem] blur-2xl pointer-events-none" />
                <img
                  src="https://res.cloudinary.com/dqjlffxja/image/upload/f_auto,q_auto/v1783789168/seo-hero_skm8fk.jpg"
                  alt="Analytics Clouds SEO dashboard showing organic growth performance"
                  className="relative w-full h-auto rounded-3xl shadow-2xl border border-gray-100 bg-white"
                  loading="eager"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 2: THE CRAFT STATEMENT (Breather section) */}
      <section className="py-28 bg-white overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          {/* Subtle quote icon backdrop */}
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[180px] font-serif font-black text-slate-50 select-none pointer-events-none -z-10 opacity-60">
            “
          </span>
          
          <blockquote className="space-y-6">
            <p className="font-display font-bold text-2xl sm:text-4xl text-[#303360] leading-relaxed tracking-tight max-w-3xl mx-auto">
              "Traffic that converts <span className="text-[#FE7146] underline decoration-dashed decoration-2 underline-offset-8">beats traffic</span> that just visits."
            </p>
            <cite className="block font-mono text-xs sm:text-sm font-bold text-slate-400 tracking-wider uppercase">
              — ANALYTICS CLOUDS SEO PHILOSOPHY
            </cite>
          </blockquote>
        </div>
      </section>

      {/* SECTION 3: WHAT'S INCLUDED (Interactive tab/showcase) */}
      <section className="py-24 bg-[#F5F5FA]/50 border-t border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-mono font-black text-[#FE7146] tracking-widest uppercase">
              // COMPLETE STACK
            </span>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-[#303360] leading-tight tracking-tight">
              What's Included in Our <span className="text-[#FE7146]">SEO Engine</span>
            </h2>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
              We take care of every layer required to scale organic traffic — technical crawl integrity, keyword intent, copy systems, and link profiles.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Vertical Tab List */}
            <div className="lg:col-span-4 space-y-2">
              {seoTabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    onMouseEnter={() => !prefersReducedMotion && setActiveTab(tab.id)}
                    className={`w-full text-left p-4 rounded-2xl transition-all flex items-center justify-between border cursor-pointer ${
                      isActive
                        ? "bg-white border-[#FE7146] text-[#303360] shadow-md shadow-[#FE7146]/5"
                        : "bg-transparent border-transparent text-slate-500 hover:bg-white hover:border-gray-200"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono text-xs font-black transition-colors ${
                        isActive ? "bg-[#FFF1EC] text-[#FE7146]" : "bg-slate-100 text-slate-400"
                      }`}>
                        {tab.id === "technical" && <Database size={14} />}
                        {tab.id === "on-page" && <Sparkles size={14} />}
                        {tab.id === "keyword" && <Search size={14} />}
                        {tab.id === "content" && <FileSpreadsheet size={14} />}
                        {tab.id === "link-building" && <Globe size={14} />}
                        {tab.id === "local" && <Clock size={14} />}
                        {tab.id === "analytics" && <Activity size={14} />}
                      </div>
                      <span className="text-sm font-extrabold tracking-tight">
                        {tab.title}
                      </span>
                    </div>
                    <ChevronRight size={16} className={`text-[#FE7146] transition-transform ${isActive ? "translate-x-1" : "opacity-0"}`} />
                  </button>
                );
              })}
            </div>

            {/* Right Tab Content Panel */}
            <div className="lg:col-span-8">
              <AnimatePresence mode="wait">
                {seoTabs.map((tab) => {
                  if (tab.id !== activeTab) return null;
                  return (
                    <motion.div
                      key={tab.id}
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -12 }}
                      transition={{ duration: 0.22 }}
                      className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xl space-y-6 text-left"
                    >
                      {/* Segment header */}
                      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 pb-4">
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono font-black text-slate-400 tracking-wider">
                            SYSTEM_STAGE: {tab.stageName}
                          </span>
                          <h3 className="font-display font-extrabold text-2xl text-[#303360]">
                            {tab.title}
                          </h3>
                        </div>

                        {/* Large visual metric display */}
                        <div className="p-3 bg-[#FFF1EC]/50 border border-[#FE7146]/15 rounded-2xl flex flex-col items-center sm:items-end">
                          <span className="font-mono font-black text-xl sm:text-2xl text-[#FE7146] leading-none">
                            {tab.metric}
                          </span>
                          <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest leading-none pt-1">
                            {tab.metricLabel}
                          </span>
                        </div>
                      </div>

                      <p className="text-slate-600 text-sm leading-relaxed font-normal">
                        {tab.description}
                      </p>

                      {/* Bullet Capabilities list */}
                      <div className="space-y-3 pt-2">
                        <span className="text-xs font-mono font-black text-[#303360] tracking-wide uppercase block">
                          SYSTEM DELIVERABLES:
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {tab.capabilities.map((cap, capIdx) => (
                            <div key={capIdx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-gray-100 text-xs text-slate-600">
                              <CheckCircle2 className="w-4 h-4 text-[#FE7146] shrink-0 mt-0.5" />
                              <span className="font-medium leading-tight">{cap}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 4: OUR PROCESS - Animated Growth Pipeline */}
      <section ref={pipelineRef} className="py-24 bg-white overflow-hidden border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-mono font-black text-[#FE7146] tracking-widest uppercase">
              // RIGOROUS FLOW
            </span>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-[#303360] leading-tight tracking-tight">
              Our Structured <span className="text-[#FE7146]">SEO Pipeline</span>
            </h2>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
              We execute in sequential, disciplined sprints to ensure every code change or asset publication translates to direct position updates.
            </p>
          </div>

          {/* Horizontal / Vertical Pipeline timeline */}
          <div className="relative pt-6">
            
            {/* Background line */}
            <div className="absolute top-[36px] left-0 w-full h-[3px] bg-slate-100 hidden lg:block"></div>

            {/* Scroll Scrubbed Active Progress Line */}
            <div
              className="absolute top-[36px] left-0 h-[3px] bg-[#FE7146] transition-all duration-150 hidden lg:block"
              style={{ width: `${scrollProgress * 100}%` }}
            ></div>

            {/* Steps Container */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 relative z-10">
              {pipelineSteps.map((step, idx) => {
                // Determine step activation state based on progress percent
                const stepThreshold = idx / (pipelineSteps.length - 1);
                const isStepActive = scrollProgress >= stepThreshold || prefersReducedMotion;

                return (
                  <div key={idx} className="group text-left space-y-4">
                    
                    {/* Circle Node indicator */}
                    <div className="flex items-center gap-3 lg:block">
                      <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isStepActive
                          ? "bg-[#FE7146] text-white ring-4 ring-[#FE7146]/20 shadow-lg shadow-[#FE7146]/10"
                          : "bg-slate-100 text-slate-400 group-hover:bg-slate-200"
                      }`}>
                        <span className="font-mono font-black text-base">{step.num}</span>
                      </div>

                      {/* Connecting Line for mobile views */}
                      <div className="h-[2px] bg-slate-100 flex-grow lg:hidden"></div>
                    </div>

                    {/* Step Content */}
                    <div className="space-y-2 pt-2">
                      <div className="flex justify-between items-center">
                        <span className="text-[9px] font-mono font-bold text-slate-400">
                          {step.status}
                        </span>
                        {isStepActive && (
                          <span className="text-[9px] font-mono font-bold text-[#FE7146]">
                            ACTIVE
                          </span>
                        )}
                      </div>
                      <h4 className="font-display font-extrabold text-base text-[#303360] leading-tight group-hover:text-[#FE7146] transition-colors">
                        {step.title}
                      </h4>
                      <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-normal">
                        {step.desc}
                      </p>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 5: REAL GROWTH VISUALIZED (Interactive Traffic Chart Scrubber) */}
      <section id="visualized-growth" className="py-24 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-mono font-black text-[#FE7146] tracking-widest uppercase">
              // REAL RESULTS
            </span>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-[#303360] leading-tight tracking-tight">
              Watch the <span className="text-[#FE7146]">Growth Happen</span>
            </h2>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
              Select one of our actual Noida/global client campaigns and drag the orange playhead slider to view how traffic compounded over 10 months.
            </p>
          </div>

          {/* Stack layout: Client Selector + Scrubber Card */}
          <div className="space-y-8">
            
            {/* Tab selection for client datasets */}
            <div className="flex justify-center gap-2">
              {[
                { key: "fintech", label: "RupeeScale Fintech" },
                { key: "ecommerce", label: "UrbanGlow Apparel" },
                { key: "saas", label: "ProSync Enterprise" }
              ].map((client) => {
                const isSelected = activeChartClient === client.key;
                return (
                  <button
                    key={client.key}
                    onClick={() => {
                      setActiveChartClient(client.key);
                      // Settle scrubber to ~80%
                      setScrubPercent(0.8);
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-mono font-black transition-all cursor-pointer border ${
                      isSelected
                        ? "bg-[#303360] text-white border-[#303360] shadow-md shadow-[#303360]/10"
                        : "bg-slate-50 text-slate-500 hover:text-[#303360] hover:bg-slate-100 border-gray-200/50"
                    }`}
                  >
                    {client.label}
                  </button>
                );
              })}
            </div>

            {/* Interactive Scrubber Main Dashboard */}
            <div className="max-w-4xl mx-auto bg-slate-50 border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center mb-8">
                
                {/* Real-time stats readout */}
                <div className="md:col-span-4 text-left space-y-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-black text-slate-400 bg-slate-200 px-2.5 py-1 rounded-md">
                      {selectedClientData.industry}
                    </span>
                    <h3 className="font-display font-black text-lg text-[#303360] pt-1">
                      {selectedClientData.name}
                    </h3>
                  </div>

                  <div className="grid grid-cols-2 gap-4 border-t border-gray-200 pt-4">
                    <div>
                      <span className="block font-mono font-black text-2xl text-[#FE7146] tracking-tight leading-none">
                        {currentDataPoint.traffic.toLocaleString()}
                      </span>
                      <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wider block mt-1">
                        Monthly Traffic
                      </span>
                    </div>

                    <div>
                      <span className="block font-mono font-black text-2xl text-[#303360] tracking-tight leading-none">
                        {currentDataPoint.keywords.toLocaleString()}
                      </span>
                      <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wider block mt-1">
                        Keywords Ranking
                      </span>
                    </div>
                  </div>

                  <div className="p-3 bg-white border border-gray-100 rounded-xl">
                    <span className="block text-[10px] font-mono font-bold text-[#FE7146] uppercase tracking-wider">
                      ATTRIBUTED PROGRESS:
                    </span>
                    <span className="text-xs text-slate-500 leading-snug font-normal block mt-1">
                      {currentScrubIndex === 0 && "Audit phase launched."}
                      {currentScrubIndex > 0 && currentScrubIndex <= 2 && "Core crawl speed bugs resolved. Indexing began."}
                      {currentScrubIndex > 2 && currentScrubIndex <= 5 && "Content cluster strategy went live. Immediate CTR spike."}
                      {currentScrubIndex > 5 && "High domain authority links acquired. Dominated Noida search terms."}
                    </span>
                  </div>
                </div>

                {/* Simulated Chart Plotter Area */}
                <div className="md:col-span-8 relative">
                  
                  {/* SVG Chart Plotter */}
                  <div className="h-[200px] w-full relative flex items-end">
                    <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="chart-glow" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#FE7146" stopOpacity="0.15" />
                          <stop offset="100%" stopColor="#FE7146" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>

                      {/* Area graph background path */}
                      <path
                        d={`M 0 200 ${selectedClientData.timeline.map((point, pIdx) => {
                          const x = (pIdx / maxDataIdx) * 100; // percent
                          // Inverse height (since SVG 0,0 is top left)
                          const y = 200 - (point.d_point / 1100) * 180;
                          return `L ${x}% ${y}`;
                        }).join(" ")} L 100% 200 Z`}
                        fill="url(#chart-glow)"
                      />

                      {/* Line graph path */}
                      <path
                        d={selectedClientData.timeline.map((point, pIdx) => {
                          const x = (pIdx / maxDataIdx) * 100;
                          const y = 200 - (point.d_point / 1100) * 180;
                          return `${pIdx === 0 ? "M" : "L"} ${x}% ${y}`;
                        }).join(" ")}
                        fill="none"
                        stroke="#FE7146"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />

                      {/* Active highlighted node dot on line */}
                      {(() => {
                        const actX = (currentScrubIndex / maxDataIdx) * 100;
                        const actY = 200 - (currentDataPoint.d_point / 1100) * 180;
                        return (
                          <g>
                            <circle cx={`${actX}%`} cy={actY} r="7" fill="#FE7146" />
                            <circle cx={`${actX}%`} cy={actY} r="14" fill="none" stroke="#FE7146" strokeWidth="2" strokeOpacity="0.35" className="animate-ping" />
                          </g>
                        );
                      })()}
                    </svg>

                    {/* Timeline labels at bottom */}
                    <div className="absolute -bottom-6 inset-x-0 flex justify-between text-[10px] font-mono text-slate-400">
                      <span>Month 1</span>
                      <span>Month 5</span>
                      <span>Month 10</span>
                    </div>
                  </div>

                  {/* Scrubber Drag Track Area */}
                  <div
                    ref={scrubberContainerRef}
                    className="mt-12 h-6 relative bg-slate-200/50 rounded-lg cursor-ew-resize select-none border border-gray-200/50 flex items-center"
                    onMouseDown={handleMouseDown}
                    onTouchStart={handleTouchStart}
                  >
                    {/* Fill track color */}
                    <div
                      className="absolute left-0 h-full bg-[#FE7146]/10 rounded-l-lg pointer-events-none"
                      style={{ width: `${scrubPercent * 100}%` }}
                    ></div>

                    {/* Draggable indicator handle */}
                    <div
                      className="absolute w-8 h-8 rounded-full bg-[#FE7146] border-4 border-white shadow-lg flex flex-col items-center justify-center pointer-events-none -translate-x-1/2"
                      style={{ left: `${scrubPercent * 100}%` }}
                    >
                      <span className="font-mono text-[9px] font-black text-white">{currentDataPoint.month.replace("Month ", "M")}</span>
                    </div>
                  </div>

                  <div className="text-center mt-3 text-[10px] font-mono text-slate-400 font-bold">
                    ◄ DRAG OR SLIDE THE MONTH INDICATOR TO SCRUB DATA ►
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 6: KEYWORD RANKING SHOWCASE (Before -> After comparisons) */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-mono font-black text-[#FE7146] tracking-widest uppercase">
              // INDEX AUDITS
            </span>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-[#303360] leading-tight tracking-tight">
              Real Keyword <span className="text-[#FE7146]">Climbs</span>
            </h2>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
              We target high-volume transaction intent keywords. Here is a handful of real positions claimed for our Noida/international clients.
            </p>
          </div>

          <div className="max-w-3xl mx-auto bg-white border border-gray-100 rounded-3xl shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left font-sans border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-gray-100 font-mono text-[10px] sm:text-xs text-slate-400 font-black tracking-wider uppercase">
                    <th className="p-4 sm:p-5">KEYWORD PHRASE</th>
                    <th className="p-4 sm:p-5">START POSITION</th>
                    <th className="p-4 sm:p-5 text-center">CLIMB</th>
                    <th className="p-4 sm:p-5">END POSITION</th>
                    <th className="p-4 sm:p-5 text-right">MONTHLY SEARCH VOL</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100/60 text-xs sm:text-sm font-semibold text-[#303360]">
                  {[
                    { phrase: "best performance marketing agency in noida", start: "POS #24", end: "POS #1", climb: "▲ +23", vol: "2,400/mo" },
                    { phrase: "no-code web design noida", start: "POS #45", end: "POS #2", climb: "▲ +43", vol: "850/mo" },
                    { phrase: "fintech billing software scale", start: "POS #84", end: "POS #3", climb: "▲ +81", vol: "3,100/mo" },
                    { phrase: "luxury apparel direct marketing", start: "POS #19", end: "POS #1", climb: "▲ +18", vol: "1,200/mo" },
                    { phrase: "b2b real-time attribution platforms", start: "POS #62", end: "POS #2", climb: "▲ +60", vol: "950/mo" }
                  ].map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-[#FFF1EC]/20 transition-all">
                      <td className="p-4 sm:p-5 font-bold">{row.phrase}</td>
                      <td className="p-4 sm:p-5 text-slate-400 font-normal">{row.start}</td>
                      <td className="p-4 sm:p-5 text-center">
                        <span className="px-2 py-0.5 rounded-md bg-green-50 text-green-600 font-mono text-[10px] font-black inline-block">
                          {row.climb}
                        </span>
                      </td>
                      <td className="p-4 sm:p-5 text-[#FE7146] font-mono font-black text-sm">{row.end}</td>
                      <td className="p-4 sm:p-5 text-right text-slate-400 font-mono text-xs">{row.vol}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 7: WHY CHOOSE US - Split Stat/Differentiator band */}
      <section className="py-24 bg-[#303360] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff02_1px,transparent_1px)] [background-size:16px_16px] opacity-75"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left Column: Differentiators */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-4">
                <span className="text-xs font-mono font-black text-[#FE7146] tracking-widest uppercase block">
                  // THE COLD ADVANTAGE
                </span>
                <h2 className="font-display font-black text-3xl sm:text-5xl text-white leading-tight tracking-tight">
                  Why Noida Brands <span className="text-[#FE7146]">Choose Our SEO</span>
                </h2>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal">
                  SEO is plagued by agencies using automated spam link builders and boilerplate text. We take an engineering-first approach that Google's quality algorithms value.
                </p>
              </div>

              {/* 4 differentiators list */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  {
                    title: "100% White-Hat Sourcing",
                    desc: "No link-farms or dangerous shortcuts. We secure authentic editorial backlinks from actual publications.",
                    icon: <ShieldCheck className="w-5 h-5 text-[#FE7146]" />
                  },
                  {
                    title: "Attributed Revenue Focus",
                    desc: "We track actual pipeline conversions and form submissions, not just high vanity traffic logs.",
                    icon: <TrendingUp className="w-5 h-5 text-indigo-400" />
                  },
                  {
                    title: "Technical Code Tuning",
                    desc: "Our web developers patch index bloat and Core Web Vitals to elevate crawl performance.",
                    icon: <Sparkles className="w-5 h-5 text-sky-400" />
                  },
                  {
                    title: "Zero Locked-In Contracts",
                    desc: "We work on rolling monthly schedules. We retain client accounts with compounding results, not legal loops.",
                    icon: <Lock className="w-5 h-5 text-[#FE7146]" />
                  }
                ].map((diff, dIdx) => (
                  <div key={dIdx} className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-[#FE7146]/25 transition-all space-y-2">
                    <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center">
                      {diff.icon}
                    </div>
                    <h4 className="font-display font-extrabold text-[#FE7146] text-sm tracking-tight pt-1">
                      {diff.title}
                    </h4>
                    <p className="text-slate-300 text-xs leading-relaxed font-normal">
                      {diff.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: 2x2 grid stats with subtle hover glow */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              {[
                { val: 180, suffix: "%", label: "Avg. Traffic Growth", desc: "Achieved within 6 months" },
                { val: 240, suffix: "+", label: "Top 10 Terms Ranked", desc: "Attributed client keywords" },
                { val: 98, suffix: "%", label: "Client Account Retention", desc: "Noida's highest trust rate" },
                { val: 12, suffix: "m+", label: "Organic Visitors Driven", desc: "Across Noida & global portfolios" }
              ].map((stat, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 text-center hover:border-[#FE7146]/30 transition-all group relative overflow-hidden">
                  {/* Subtle inner hover glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#FE7146]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                  
                  <CountUp end={stat.val} suffix={stat.suffix} />
                  <h4 className="font-display font-extrabold text-xs sm:text-sm text-white pt-2 leading-tight">
                    {stat.label}
                  </h4>
                  <p className="text-slate-400 text-[10px] sm:text-xs pt-1 font-normal">
                    {stat.desc}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 8: PRICING / PACKAGES */}
      <section className="py-24 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-mono font-black text-[#FE7146] tracking-widest uppercase">
              // PRICING MODEL
            </span>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-[#303360] leading-tight tracking-tight">
              Invest in Compounding <span className="text-[#FE7146]">Pipeline</span>
            </h2>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
              Fully transparent pricing schedules based on campaign sizes. No surprise bills. No locked contracts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Starter SEO",
                ideal: "Ideal for local Noida brands starting organic crawls",
                price: "₹45,000",
                period: "per month",
                popular: false,
                features: [
                  "Technical Audit & Schema Fixes",
                  "Up to 25 Target Keyword Focus",
                  "2 High-Quality Editorial Copy Blocks",
                  "Consistent Local Citations Syncing",
                  "Monthly Rank Position Reports",
                  "1 Strategic Growth Call / Month"
                ],
                btnText: "Start Crawling"
              },
              {
                name: "Growth SEO",
                ideal: "Best for high-traction scale ecommerce and tech brands",
                price: "₹85,000",
                period: "per month",
                popular: true,
                features: [
                  "Full Technical Audit & Speed Optimization",
                  "Up to 75 Target Keyword Focus",
                  "5 Comprehensive Intent Copy Sprints",
                  "5 High Domain Authority Links (DA 40+)",
                  "Topic-Cluster Architecture Mapping",
                  "Dynamic rank tracking dashboard",
                  "Bi-Weekly Strategy Coordination"
                ],
                btnText: "Acquire & Scale"
              },
              {
                name: "Enterprise SEO",
                ideal: "Engineered for international corporate portfolios",
                price: "₹1,50,000",
                period: "per month",
                popular: false,
                features: [
                  "Blazing-fast Headless React SEO consults",
                  "Unlimited Target Keyword Tracking",
                  "Complete Content Authority Blueprint",
                  "10 Premium DA 60+ Backlinks",
                  "Competitor Rank Leak Defenses",
                  "Attribution GA4 integrations",
                  "Weekly Priority Engineer Calls"
                ],
                btnText: "Dominate Search"
              }
            ].map((pkg, idx) => (
              <div
                key={idx}
                className={`p-8 rounded-3xl border flex flex-col justify-between text-left transition-all ${
                  pkg.popular
                    ? "border-[#FE7146] ring-2 ring-[#FE7146]/20 bg-[#FFF1EC]/10 relative scale-102 shadow-2xl"
                    : "border-gray-100 bg-white hover:border-gray-200"
                }`}
              >
                {pkg.popular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#FE7146] text-white font-mono text-[9px] font-black px-4 py-1.5 rounded-full tracking-widest animate-pulse">
                    MOST POPULAR
                  </span>
                )}

                <div className="space-y-6">
                  <div className="space-y-1">
                    <h3 className="font-display font-black text-xl text-[#303360]">
                      {pkg.name}
                    </h3>
                    <p className="text-slate-400 text-xs font-normal">
                      {pkg.ideal}
                    </p>
                  </div>

                  <div className="flex items-baseline gap-1">
                    <span className="font-mono font-black text-3xl sm:text-4xl text-[#303360]">
                      {pkg.price}
                    </span>
                    <span className="text-slate-400 font-medium text-xs font-mono">
                      / {pkg.period}
                    </span>
                  </div>

                  {/* Bullet list */}
                  <ul className="space-y-3 pt-4 border-t border-gray-100">
                    {pkg.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-600">
                        <Check className="w-4 h-4 text-[#FE7146] shrink-0 mt-0.5" />
                        <span className="font-semibold">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-8">
                  <button
                    onClick={onContactClick}
                    className={`w-full py-4 rounded-xl font-black text-sm tracking-tight transition-all cursor-pointer text-center ${
                      pkg.popular
                        ? "bg-[#FE7146] hover:bg-[#FE7146]/95 text-white shadow-lg shadow-[#FE7146]/20 hover:scale-[1.01]"
                        : "bg-slate-50 hover:bg-slate-100 text-[#303360] border border-gray-200/50"
                    }`}
                  >
                    {pkg.btnText}
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 9: FAQ (Accordion matching sitewide accordion styling) */}
      <section className="py-24 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-mono font-black text-[#FE7146] tracking-widest uppercase block">
              // SEARCH INTELLIGENCE
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-[#303360] tracking-tight">
              Frequently Asked <span className="text-[#FE7146]">Questions</span>
            </h2>
            <p className="text-slate-500 text-sm sm:text-base font-normal leading-relaxed">
              Find answers to core technical questions and optimization guidelines we follow.
            </p>
          </div>

          {/* Accordion component */}
          <div className="space-y-4 max-w-3xl mx-auto text-left">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-white border border-gray-100 rounded-2xl overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-5 sm:p-6 flex items-center justify-between gap-4 text-left font-display font-extrabold text-base text-[#303360] hover:text-[#FE7146] transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <span className={`w-6 h-6 rounded-lg bg-[#FFF1EC] flex items-center justify-center text-[#FE7146] shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
                      <ChevronDown size={14} />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-slate-500 leading-relaxed font-normal border-t border-gray-100/40 pt-4">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* SECTION 10: CTA BANNER */}
      <section id="elevated-cta">
        <CtaBanner onContactClick={onContactClick} />
      </section>

    </div>
  );
}
