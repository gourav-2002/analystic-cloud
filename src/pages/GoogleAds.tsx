/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  TrendingUp,
  ArrowRight,
  ArrowDown,
  ArrowUp,
  Check,
  ChevronDown,
  ChevronRight,
  Sparkles,
  Award,
  Users,
  ShieldCheck,
  Clock,
  Target,
  BarChart3,
  MousePointerClick,
  CheckCircle2,
  Copy,
  Zap,
  Percent,
  Search,
  MessageSquare,
  BadgeAlert,
  HelpCircle
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
interface AdsTab {
  id: string;
  title: string;
  description: string;
  capabilities: string[];
  metric: string;
  metricLabel: string;
  stageName: string;
}

export function GoogleAds({ onContactClick }: { onContactClick: () => void }) {
  // Motion settings
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  // 1. Hero Search-Ads Auction Animation State
  const [auctionStep, setAuctionStep] = useState(0); // 0: initial (low Quality Score, high CPC, lower pos), 1: transitioning, 2: completed (9/10, lower CPC, pos #1)
  
  useEffect(() => {
    if (prefersReducedMotion) {
      setAuctionStep(2);
      return;
    }

    const timer1 = setTimeout(() => {
      setAuctionStep(1);
      const timer2 = setTimeout(() => {
        setAuctionStep(2);
      }, 1500);
      return () => clearTimeout(timer2);
    }, 1200);

    return () => clearTimeout(timer1);
  }, [prefersReducedMotion]);

  const handleReplayAuction = () => {
    setAuctionStep(0);
    setTimeout(() => {
      setAuctionStep(1);
      setTimeout(() => {
        setAuctionStep(2);
      }, 1500);
    }, 400);
  };

  // 3. What's Included vertical tabs state
  const [activeTab, setActiveTab] = useState("strategy");
  const adsTabs: AdsTab[] = [
    {
      id: "strategy",
      title: "Campaign Strategy & Structure",
      description: "We architect search campaigns using custom-grouped Single Theme Ad Groups (STAGs) to guarantee maximum relevance and eliminate budget cannibalization.",
      capabilities: [
        "Advanced Alpha-Beta Campaign Design",
        "Competitor Auction Leak Assessments",
        "Budget Partitioning & Share-of-Voice Planning",
        "Target ROAS/CPA Bidding Alignments"
      ],
      metric: "100%",
      metricLabel: "Structured Ad Groups Alignment",
      stageName: "funnel_architecture"
    },
    {
      id: "keyword",
      title: "Keyword Research & Match Types",
      description: "We implement dynamic keyword intent mining, separating broad search intent from surgical brand-buying triggers, backed by persistent negative lists.",
      capabilities: [
        "Surgical Exact-Match Focus Core",
        "Persistent Negative Keyword Scapes",
        "Dynamic Long-Tail Buying Trigger Sets",
        "Search Term Impression-Share Mining"
      ],
      metric: "94%",
      metricLabel: "Intent Term Purity Score",
      stageName: "keyword_clustering"
    },
    {
      id: "copy",
      title: "Ad Copy & Creative Testing",
      description: "Crafting highly relevant Responsive Search Ads (RSAs) leveraging dynamic keyword insertion (DKI) and custom creative asset hooks.",
      capabilities: [
        "Dynamic Phrase Keyword Insertion",
        "Continuous Title & Line Split-Testing",
        "Dynamic Ad Extensions & Sitelink Bundling",
        "Aesthetic Highlight & Callout Assets"
      ],
      metric: "1.4x",
      metricLabel: "Benchmark CTR Multiplier",
      stageName: "rsa_optimization"
    },
    {
      id: "bid",
      title: "Bid Strategy & Budget Management",
      description: "Daily bidding adjustments utilizing Google's machine learning, guided by strict manual margin caps to prevent waste.",
      capabilities: [
        "Portfolio Bidding Strategies with Shared Caps",
        "Dayparting & Geo-Bid Scaling Modifiers",
        "Google Smart Bidding Over-ride Diagnostics",
        "Wasteful Impression Bid Throttling"
      ],
      metric: "24/7",
      metricLabel: "Pacing & Bid Monitoring",
      stageName: "algorithmic_bidding"
    },
    {
      id: "landing",
      title: "Landing Page Alignment",
      description: "We build dedicated high-converting custom landing pages that align perfectly with search queries, securing the highest Quality Scores possible.",
      capabilities: [
        "Query-to-Hero Copy Synced Hooks",
        "Mobile-First Blazing Load Times",
        "Ultra-simplified Checkout & Form Paths",
        "Micro-segment Personalization Feeds"
      ],
      metric: "+42%",
      metricLabel: "Average Conversion Rate Jump",
      stageName: "destination_synced"
    },
    {
      id: "tracking",
      title: "Conversion Tracking Setup",
      description: "Flawless tracking architecture using Google Tag Manager and GA4 Enhanced Conversions to feed perfect data back to bidding systems.",
      capabilities: [
        "Google GTM Tag & Consent Mode v2 Setup",
        "Server-Side API Conversion Proxying",
        "GA4 Enhanced Attribution Models",
        "Offline Lead Revenue Import Integrations"
      ],
      metric: "100%",
      metricLabel: "Accurate Conversion Attribution",
      stageName: "attribution_integrity"
    },
    {
      id: "reporting",
      title: "Reporting & Optimization Sprints",
      description: "Completely transparent dashboards detailing actual conversions, cost-per-lead, cost-per-sale, and attributed brand lift.",
      capabilities: [
        "Looker Studio Real-Time Spend Feeds",
        "Bi-weekly Performance Optimization Sprints",
        "True ROI & Margin Revenue Breakdown",
        "Competitor Domain Bid Countermeasures"
      ],
      metric: "Zero",
      metricLabel: "Hidden Agency Markup Fees",
      stageName: "performance_review"
    }
  ];

  // 4. Process Pipeline scroll progress
  const [scrollProgress, setScrollProgress] = useState(0);
  const pipelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!pipelineRef.current) return;
      const rect = pipelineRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      const sectionHeight = rect.height;
      const elementTop = rect.top;
      
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
      title: "Account Audit & Research",
      desc: "Deep forensic scan of historical performance, keyword efficiency leaks, and competitor share of voice.",
      status: "stage_01"
    },
    {
      num: "02",
      title: "Campaign Build & Structure",
      desc: "Creating isolated thematic ad groups, negative keyword exclusions, and responsive search copy.",
      status: "stage_02"
    },
    {
      num: "03",
      title: "Landing Page Syncing",
      desc: "Aligning custom visual checkout pages to ensure high keyword relevance and lower Quality Scores costs.",
      status: "stage_03"
    },
    {
      num: "04",
      title: "Launch & Bid Optimization",
      desc: "Deploying Google Tag tracking, activating bids, and scrubbing broad intent leaks immediately.",
      status: "stage_04"
    },
    {
      num: "05",
      title: "Scale & Creative Testing",
      desc: "Rotating high-performing headline copy assets, budget scaling, and expanding into YouTube / Display.",
      status: "stage_05"
    }
  ];

  // 5. Ad Copy Split-Test Showcase & Draggable Spend Chart
  const [activeAdSplit, setActiveAdSplit] = useState<"A" | "B">("A");
  const [scrubPercent, setScrubPercent] = useState(0.7); // 70% progress initially
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  // Spend Timeline Data
  const spendData = [
    { month: "Month 1", spend: 80000, clicks: 1400, conversions: 24, qs: 5, cpc: 57, d_point: 80 },
    { month: "Month 2", spend: 95000, clicks: 1850, conversions: 38, qs: 6, cpc: 51, d_point: 120 },
    { month: "Month 3", spend: 120000, clicks: 2600, conversions: 65, qs: 7, cpc: 46, d_point: 200 },
    { month: "Month 4", spend: 150000, clicks: 3900, conversions: 110, qs: 8, cpc: 38, d_point: 320 },
    { month: "Month 5", spend: 180000, clicks: 5400, conversions: 168, qs: 9, cpc: 33, d_point: 480 },
    { month: "Month 6", spend: 220000, clicks: 7100, conversions: 240, qs: 9, cpc: 31, d_point: 680 },
    { month: "Month 7", spend: 280000, clicks: 9500, conversions: 352, qs: 9, cpc: 29, d_point: 920 },
    { month: "Month 8", spend: 350000, clicks: 12800, conversions: 510, qs: 10, cpc: 27, d_point: 1200 }
  ];

  const maxDataIdx = spendData.length - 1;
  const currentScrubIndex = Math.min(
    maxDataIdx,
    Math.max(0, Math.floor(scrubPercent * (maxDataIdx + 1)))
  );
  const activeSpendPoint = spendData[currentScrubIndex];

  // Drag handlers
  const handleScrubberMove = (clientX: number) => {
    if (!chartContainerRef.current) return;
    const rect = chartContainerRef.current.getBoundingClientRect();
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

  // 6. Quality Score meters state (simulate on-scroll fill)
  const [qsProgress, setQsProgress] = useState(0);
  const qsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleQsScroll = () => {
      if (!qsRef.current) return;
      const rect = qsRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      if (rect.top <= viewportHeight * 0.85) {
        setQsProgress(1);
      }
    };
    window.addEventListener("scroll", handleQsScroll);
    handleQsScroll(); // check once immediately
    return () => window.removeEventListener("scroll", handleQsScroll);
  }, []);

  // 9. FAQ State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const faqs = [
    {
      q: "What is the recommended minimum ad budget for Google Ads?",
      a: "While Google has no strict minimums, we generally recommend starting with at least ₹45,000 to ₹60,000 per month. This allows us to capture enough click volume and conversion data within the first 30 days to train bidding algorithms and feed statistically relevant optimization cycles."
    },
    {
      q: "How does Analytics Clouds improve Quality Score?",
      a: "Quality Score is Google's rating of the relevance of your keywords, ad copy, and landing pages. We improve it by structuring campaigns into laser-focused thematic groups (STAGs) so that ads perfectly match search terms, rewriting ad headlines for higher expected CTR, and building custom, lightning-fast landing pages with synched hero headlines."
    },
    {
      q: "Do you manage Search, Display, and Shopping ads?",
      a: "Yes. Our team is fully Google Certified across the entire Google Ads network. We run high-intent Search and Shopping Campaigns, dynamic remarketing Display Ads, Performance Max (PMax) automation, and YouTube Video Campaigns to capture prospects at every stage of the funnel."
    },
    {
      q: "How soon will my business start seeing lead/sales results?",
      a: "Unlike SEO, Google Ads delivers instant traffic. Once campaigns are configured, approved, and launched, your ads will start displaying in search results immediately. Substantial conversions generally begin tracking on day one, and we refine bidding cost-efficiencies further over the first 2 to 4 weeks."
    }
  ];

  return (
    <div className="pt-24 bg-white selection:bg-[#FE7146] selection:text-white">
      
      {/* SECTION 1: HERO - "The Auction" */}
      <section className="relative min-h-[90vh] flex items-center justify-center py-16 overflow-hidden bg-white border-b border-gray-100">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#F5F5FA_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-75"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#FFF1EC]/50 blur-3xl -translate-y-1/3 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-[#F5F5FA]/80 blur-3xl translate-y-1/3 -translate-x-1/3"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Hero Left Info */}
            <div className="lg:col-span-5 text-left space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFF1EC] border border-[#FE7146]/20 rounded-full">
                <Target className="w-3.5 h-3.5 text-[#FE7146]" />
                <span className="text-[10px] sm:text-xs font-mono font-black tracking-widest text-[#FE7146] uppercase">
                  // GOOGLE ADS STRATEGY
                </span>
              </div>

              <h1 className="font-display font-black text-4xl sm:text-5xl text-[#303360] tracking-tight leading-[1.1]">
                Win the Click.<br />
                Win It <span className="text-[#FE7146]">Cheaper</span>.
              </h1>

              <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal max-w-xl">
                The highest bidder doesn't always win Google searches. We build smart campaigns around relevance, high CTR structures, and optimal landing page flows to reduce cost-per-click and double conversion volumes.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
                <button
                  onClick={onContactClick}
                  className="w-full sm:w-auto bg-[#FE7146] hover:bg-[#FE7146]/95 text-white font-black text-sm px-8 py-4 rounded-xl shadow-lg shadow-[#FE7146]/20 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Get a Free Ads Audit</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href="#split-test-showcase"
                  className="w-full sm:w-auto bg-slate-50 hover:bg-slate-100 text-[#303360] font-black text-sm px-8 py-4 rounded-xl border border-gray-200/60 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>See Campaign Results</span>
                </a>
              </div>
            </div>

            {/* Hero Right: Google Ads Dashboard Image */}
            <div className="lg:col-span-7 flex justify-center w-full">
              <div className="w-full relative">
                {/* Soft ambient glow behind the visual */}
                <div className="absolute -inset-3 bg-gradient-to-tr from-[#FE7146]/15 via-transparent to-indigo-400/10 rounded-[2rem] blur-2xl pointer-events-none" />
                <img
                  src="https://res.cloudinary.com/dqjlffxja/image/upload/f_auto,q_auto/v1783790035/google-ads_dgueeu.jpg"
                  alt="Google Ads campaign performance dashboard"
                  className="relative w-full h-auto rounded-3xl shadow-2xl border border-gray-100 bg-white"
                  loading="eager"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 2: THE CRAFT STATEMENT */}
      <section className="py-28 bg-white overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[180px] font-serif font-black text-slate-50 select-none pointer-events-none -z-10 opacity-60">
            “
          </span>
          <blockquote className="space-y-6">
            <p className="font-display font-bold text-2xl sm:text-4xl text-[#303360] leading-relaxed tracking-tight max-w-3xl mx-auto">
              "The highest bidder doesn't always win. <span className="text-[#FE7146] underline decoration-dashed decoration-2 underline-offset-8">The most relevant one does.</span>"
            </p>
            <cite className="block font-mono text-xs sm:text-sm font-bold text-slate-400 tracking-wider uppercase">
              — ANALYTICS CLOUDS GOOGLE ADS CREDO
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
              Google Ads Campaign <span className="text-[#FE7146]">Tactical Suite</span>
            </h2>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
              We manage every aspect of the auction environment — bid pacing, matching purity, GTM tag telemetry, and dedicated landing page alignment.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Vertical Tab List */}
            <div className="lg:col-span-4 space-y-2">
              {adsTabs.map((tab) => {
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
                        {tab.id === "strategy" && <Target size={14} />}
                        {tab.id === "keyword" && <Search size={14} />}
                        {tab.id === "copy" && <Copy size={14} />}
                        {tab.id === "bid" && <Zap size={14} />}
                        {tab.id === "landing" && <Sparkles size={14} />}
                        {tab.id === "tracking" && <Percent size={14} />}
                        {tab.id === "reporting" && <BarChart3 size={14} />}
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
                {adsTabs.map((tab) => {
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

                        {/* Visual metric badge */}
                        <div className="p-3 bg-[#FFF1EC]/50 border border-[#FE7146]/15 rounded-2xl flex flex-col items-center sm:items-end">
                          <span className="font-mono font-black text-xl sm:text-2xl text-[#FE7146] leading-none">
                            {tab.metric}
                          </span>
                          <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest leading-none pt-1 text-center">
                            {tab.metricLabel}
                          </span>
                        </div>
                      </div>

                      <p className="text-slate-600 text-sm leading-relaxed font-normal">
                        {tab.description}
                      </p>

                      {/* Capabilities */}
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

      {/* SECTION 4: PROCESS - Animated Optimization Pipeline */}
      <section ref={pipelineRef} className="py-24 bg-white overflow-hidden border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-mono font-black text-[#FE7146] tracking-widest uppercase">
              // METHODICAL RIGOR
            </span>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-[#303360] leading-tight tracking-tight">
              Our Ad Campaign <span className="text-[#FE7146]">Optimization Loop</span>
            </h2>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
              We never launch and set-and-forget. We run continuous daily bid adjustments and dynamic search query cleanups to maximize margin growth.
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
                const stepThreshold = idx / (pipelineSteps.length - 1);
                const isStepActive = scrollProgress >= stepThreshold || prefersReducedMotion;

                return (
                  <div key={idx} className="group text-left space-y-4">
                    
                    {/* Circle Node */}
                    <div className="flex items-center gap-3 lg:block">
                      <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isStepActive
                          ? "bg-[#FE7146] text-white ring-4 ring-[#FE7146]/20 shadow-lg shadow-[#FE7146]/10"
                          : "bg-slate-100 text-slate-400 group-hover:bg-slate-200"
                      }`}>
                        <span className="font-mono font-black text-base">{step.num}</span>
                      </div>

                      {/* Connecting Line for mobile */}
                      <div className="h-[2px] bg-slate-100 flex-grow lg:hidden"></div>
                    </div>

                    {/* Content */}
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

      {/* SECTION 5: AD COPY SPLIT-TEST SHOWCASE & DRAGGABLE TIMELINE CHART */}
      <section id="split-test-showcase" className="py-24 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-mono font-black text-[#FE7146] tracking-widest uppercase">
              // WHAT WORKS
            </span>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-[#303360] leading-tight tracking-tight">
              We Test Everything, <span className="text-[#FE7146]">So You Don't Have To</span>
            </h2>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
              Check out a live ad split-test example from our portfolio below, then drag the orange playhead slider on our performance graph to view how spend and conversions scaled over 8 months.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center max-w-5xl mx-auto">
            
            {/* Interactive Ad Copy split test comparison (Left) */}
            <div className="lg:col-span-5 space-y-6">
              <span className="block text-xs font-mono font-black text-[#303360] uppercase tracking-wider text-left">
                LIVE AD COPY SPLIT-TEST DEMO:
              </span>

              {/* Selector toggles */}
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveAdSplit("A")}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-mono font-black transition-all cursor-pointer border ${
                    activeAdSplit === "A"
                      ? "bg-slate-100 text-[#FE7146] border-[#FE7146]"
                      : "bg-slate-50 text-slate-400 border-gray-200/50"
                  }`}
                >
                  Ad Variation A (Vague)
                </button>
                <button
                  onClick={() => setActiveAdSplit("B")}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-mono font-black transition-all cursor-pointer border ${
                    activeAdSplit === "B"
                      ? "bg-[#FFF1EC] text-[#FE7146] border-[#FE7146] shadow-sm shadow-[#FE7146]/5"
                      : "bg-slate-50 text-slate-400 border-gray-200/50"
                  }`}
                >
                  Ad Variation B (Surgical)
                </button>
              </div>

              {/* Interactive Flippable Panel */}
              <div className="relative min-h-[170px]">
                <AnimatePresence mode="wait">
                  {activeAdSplit === "A" ? (
                    <motion.div
                      key="adA"
                      initial={{ opacity: 0, scale: 0.97 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.97 }}
                      transition={{ duration: 0.2 }}
                      className="bg-slate-50 rounded-2xl p-4 border border-gray-200/60 text-left space-y-3 relative overflow-hidden"
                    >
                      <div className="absolute top-2 right-2 px-2 py-0.5 bg-slate-200 text-slate-500 rounded text-[9px] font-mono font-bold">
                        ORIGINAL CONTROL
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-[9px] font-mono font-black bg-slate-200 text-slate-400 px-1 py-0.5 rounded">AD</span>
                        <span className="text-[10px] font-mono text-slate-400">www.agency-sample.in</span>
                      </div>
                      <h4 className="text-sm font-bold text-blue-500 leading-tight">
                        Best Digital Marketing Agency Noida - Grow Your Revenue
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed font-normal">
                        Talk to Noida's best marketing agency. We offer custom strategies for lead generation, SEO, and paid media. Grow today!
                      </p>

                      <div className="flex gap-4 pt-1.5 text-[10px] font-mono text-slate-400 border-t border-gray-100">
                        <span>CTR: <strong className="text-slate-600">2.1%</strong></span>
                        <span>Conv. Rate: <strong className="text-slate-600">1.8%</strong></span>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="adB"
                      initial={{ opacity: 0, scale: 0.97 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.97 }}
                      transition={{ duration: 0.2 }}
                      className="bg-[#FFF1EC]/30 rounded-2xl p-4 border border-[#FE7146]/30 text-left space-y-3 relative overflow-hidden"
                    >
                      <div className="absolute top-2 right-2 px-2 py-0.5 bg-[#FE7146] text-white rounded text-[9px] font-mono font-black">
                        WINNER (+220%)
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-[9px] font-mono font-black bg-[#FE7146] text-white px-1.5 py-0.5 rounded">AD</span>
                        <span className="text-[10px] font-mono text-[#FE7146] font-bold uppercase tracking-wider">www.analyticsclouds.com</span>
                      </div>
                      <h4 className="text-sm font-black text-[#FE7146] leading-tight">
                        Performance Marketing Agency Noida | Live ROAS Dashboard Setup
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed font-normal">
                        Stop burning ad budgets on fake clicks. Get a custom tag telemetry setup, 9+ Quality Score alignments & a live conversion dashboard.
                      </p>

                      <div className="flex gap-4 pt-1.5 text-[10px] font-mono text-slate-400 border-t border-gray-200/50">
                        <span>CTR: <strong className="text-[#FE7146] font-black">6.8%</strong></span>
                        <span>Conv. Rate: <strong className="text-[#FE7146] font-black">5.4%</strong></span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Draggable spend chart (Right) */}
            <div className="lg:col-span-7 bg-slate-50 border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-xl">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 pb-4 mb-6 text-left">
                <div>
                  <span className="text-[10px] font-mono font-black text-slate-400 bg-slate-200 px-2 py-0.5 rounded uppercase">
                    Attributed Growth Curve
                  </span>
                  <h3 className="font-display font-black text-lg text-[#303360] pt-1">
                    Camp Performance Scale
                  </h3>
                </div>

                <div className="flex gap-4 text-left">
                  <div>
                    <span className="block font-mono font-black text-lg text-[#FE7146] leading-none">
                      ₹{(activeSpendPoint.spend / 1000).toFixed(0)}k
                    </span>
                    <span className="text-[9px] font-mono font-bold text-slate-400 tracking-wider uppercase block mt-1">
                      Ad Spend
                    </span>
                  </div>
                  <div className="border-l border-gray-300 h-8 self-center"></div>
                  <div>
                    <span className="block font-mono font-black text-lg text-[#303360] leading-none">
                      {activeSpendPoint.conversions}
                    </span>
                    <span className="text-[9px] font-mono font-bold text-slate-400 tracking-wider uppercase block mt-1">
                      Conversions
                    </span>
                  </div>
                </div>
              </div>

              {/* Chart Plotter Plot Area */}
              <div className="relative">
                <div className="h-[150px] w-full relative flex items-end">
                  <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="spend-glow" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#FE7146" stopOpacity="0.15" />
                        <stop offset="100%" stopColor="#FE7146" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>

                    {/* Area fill path */}
                    <path
                      d={`M 0 150 ${spendData.map((pt, idx) => {
                        const x = (idx / maxDataIdx) * 100;
                        const y = 150 - (pt.d_point / 1200) * 130;
                        return `L ${x}% ${y}`;
                      }).join(" ")} L 100% 150 Z`}
                      fill="url(#spend-glow)"
                    />

                    {/* Line path */}
                    <path
                      d={spendData.map((pt, idx) => {
                        const x = (idx / maxDataIdx) * 100;
                        const y = 150 - (pt.d_point / 1200) * 130;
                        return `${idx === 0 ? "M" : "L"} ${x}% ${y}`;
                      }).join(" ")}
                      fill="none"
                      stroke="#FE7146"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />

                    {/* Active highlight node */}
                    {(() => {
                      const actX = (currentScrubIndex / maxDataIdx) * 100;
                      const actY = 150 - (activeSpendPoint.d_point / 1200) * 130;
                      return (
                        <g>
                          <circle cx={`${actX}%`} cy={actY} r="6" fill="#FE7146" />
                          <circle cx={`${actX}%`} cy={actY} r="12" fill="none" stroke="#FE7146" strokeWidth="2" strokeOpacity="0.3" className="animate-ping" />
                        </g>
                      );
                    })()}
                  </svg>
                  
                  {/* Month timeline */}
                  <div className="absolute -bottom-6 inset-x-0 flex justify-between text-[10px] font-mono text-slate-400">
                    <span>Month 1</span>
                    <span>Month 4</span>
                    <span>Month 8</span>
                  </div>
                </div>

                {/* Scrubber slider track */}
                <div
                  ref={chartContainerRef}
                  className="mt-12 h-6 relative bg-slate-200/50 rounded-lg cursor-ew-resize select-none border border-gray-200/50 flex items-center"
                  onMouseDown={handleMouseDown}
                  onTouchStart={handleTouchStart}
                >
                  <div
                    className="absolute left-0 h-full bg-[#FE7146]/10 rounded-l-lg pointer-events-none"
                    style={{ width: `${scrubPercent * 100}%` }}
                  ></div>

                  <div
                    className="absolute w-8 h-8 rounded-full bg-[#FE7146] border-4 border-white shadow-lg flex items-center justify-center pointer-events-none -translate-x-1/2"
                    style={{ left: `${scrubPercent * 100}%` }}
                  >
                    <span className="font-mono text-[9px] font-black text-white">{activeSpendPoint.month.replace("Month ", "M")}</span>
                  </div>
                </div>

                {/* Performance stats chips beneath */}
                <div className="grid grid-cols-3 gap-3 pt-6 mt-2 border-t border-gray-200/60 text-left">
                  <div className="p-2 bg-white rounded-xl border border-gray-100">
                    <span className="text-[9px] font-mono text-slate-400 block uppercase">Quality Score</span>
                    <strong className="font-mono text-xs text-[#303360]">{activeSpendPoint.qs}/10</strong>
                  </div>
                  <div className="p-2 bg-white rounded-xl border border-gray-100">
                    <span className="text-[9px] font-mono text-slate-400 block uppercase">Avg Click CPC</span>
                    <strong className="font-mono text-xs text-[#303360]">₹{activeSpendPoint.cpc}</strong>
                  </div>
                  <div className="p-2 bg-white rounded-xl border border-gray-100">
                    <span className="text-[9px] font-mono text-slate-400 block uppercase">Clicks volume</span>
                    <strong className="font-mono text-xs text-[#FE7146]">{activeSpendPoint.clicks}</strong>
                  </div>
                </div>

                <div className="text-center mt-3 text-[10px] font-mono text-slate-400 font-semibold">
                  ◄ DRAG THE INDICATOR TO SCRUB MONTHLY ATTRIBUTION DATA ►
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 6: QUALITY SCORE EXPLAINER (Meters fill in on scroll) */}
      <section ref={qsRef} className="py-24 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-mono font-black text-[#FE7146] tracking-widest uppercase">
              // RELEVANCE BLUEPRINT
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-[#303360] leading-tight tracking-tight">
              Anatomy of the <span className="text-[#FE7146]">Quality Score</span>
            </h2>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
              Google ranks paid search results based on Ad Relevance, Landing Page integrity, and expected CTR. Higher scores mean cheaper, better placements.
            </p>
          </div>

          <div className="bg-[#303360] text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-white/10 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#FE7146]/20 border border-[#FE7146]/30 flex items-center justify-center">
                <Sparkles size={16} className="text-[#FE7146]" />
              </div>
              <h3 className="font-display font-black text-lg text-white">
                How We Boost Quality Scores
              </h3>
            </div>

            <div className="space-y-6">
              {[
                {
                  label: "Ad Relevance Alignment",
                  percentage: "95%",
                  desc: "Aligning ad titles perfectly to matching intent clusters to maximize copy alignment.",
                  color: "bg-[#FE7146]"
                },
                {
                  label: "Landing Page Speed & Relevance",
                  percentage: "90%",
                  desc: "Building custom React landing pages with ultra-fast loads to drop bounce rates below 30%.",
                  color: "bg-[#FE7146]"
                },
                {
                  label: "Expected Click-Through Rate (CTR)",
                  percentage: "85%",
                  desc: "Continuous headline split testing to optimize CTR indices above standard benchmarks.",
                  color: "bg-[#FE7146]"
                }
              ].map((meter, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold">
                    <span className="text-slate-200">{meter.label}</span>
                    <span className="font-mono text-[#FE7146] font-black">{meter.percentage}</span>
                  </div>
                  
                  {/* Outer bar */}
                  <div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full ${meter.color}`}
                      initial={{ width: "0%" }}
                      animate={{ width: qsProgress ? meter.percentage : "0%" }}
                      transition={{ duration: 1.2, ease: "easeOut", delay: idx * 0.15 }}
                    ></motion.div>
                  </div>

                  <p className="text-slate-400 text-xs leading-normal">
                    {meter.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 7: WHY CHOOSE US - Split Differentiator/Stat Band */}
      <section className="py-24 bg-[#303360] text-white overflow-hidden relative border-b border-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(rgba(254,113,70,0.05)_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-75"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Differentiators Column */}
            <div className="lg:col-span-6 text-left space-y-8">
              <div className="space-y-4">
                <span className="text-xs font-mono font-black text-[#FE7146] tracking-widest uppercase">
                  // THE DIFFERENCE
                </span>
                <h2 className="font-display font-black text-3xl sm:text-5xl leading-tight tracking-tight">
                  Stop Wasting Lakhs <span className="text-[#FE7146]">on Vague Clicks</span>
                </h2>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  We don't rely on automated generic set-and-forget loops. Our Noida certified Google Ads crew conducts daily pacing audits and technical alignments.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  {
                    title: "Google Certified PPC Specialists",
                    desc: "Your campaign is architected and audited by certified performance market makers, not interns."
                  },
                  {
                    title: "Dynamic Keyword & RSA Testing",
                    desc: "Continuous headlines rotation testing across responsive formats to keep CTRs optimized."
                  },
                  {
                    title: "Custom Synced Landing Pages",
                    desc: "We build dedicated visual layouts designed specifically for click-to-conversion performance."
                  },
                  {
                    title: "Attribution Transparency Setup",
                    desc: "Full integrations with GA4 and Offline Conversions API to map actual attributed profits."
                  }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-3 items-start">
                    <div className="w-5 h-5 rounded-full bg-[#FE7146]/20 border border-[#FE7146]/30 flex items-center justify-center mt-1 shrink-0">
                      <Check className="w-3 h-3 text-[#FE7146]" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-display font-extrabold text-sm sm:text-base text-white">
                        {item.title}
                      </h4>
                      <p className="text-slate-400 text-xs leading-relaxed font-normal">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right 2x2 Stats Grid Column */}
            <div className="lg:col-span-6">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: 38, suffix: "%", label: "Average CPC Reduction", sub: "Via Relevance Tuning" },
                  { value: 9, suffix: "/10", label: "Avg Quality Score Achieved", sub: "Standard CTR Dominance" },
                  { value: 150, suffix: "+", label: "Paid Campaigns Managed", sub: "Lakhs in Spent Refined" },
                  { value: 98, suffix: "%", label: "Client Account Retention", sub: "Transparency Driven" }
                ].map((stat, idx) => (
                  <div
                    key={idx}
                    className="p-6 bg-white/5 border border-white/10 rounded-2xl text-left space-y-2 hover:bg-white/10 transition-colors group relative overflow-hidden"
                  >
                    {/* Subtle hovering glow */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(254,113,70,0.1),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    
                    <CountUp end={stat.value} suffix={stat.suffix} />
                    <h4 className="text-xs font-mono font-black text-slate-400 uppercase tracking-widest leading-none pt-2">
                      {stat.label}
                    </h4>
                    <p className="text-[11px] text-slate-400 leading-normal font-normal">
                      {stat.sub}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 8: PRICING / PACKAGES */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-mono font-black text-[#FE7146] tracking-widest uppercase">
              // INVESTMENT SCHEMES
            </span>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-[#303360] leading-tight tracking-tight">
              Transparent Google <span className="text-[#FE7146]">Ads Packages</span>
            </h2>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
              No hidden percentage markup fees on your ad spent. Choose a package tier tailored to your active target scope.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-5xl mx-auto">
            
            {/* Plan 1 */}
            <div className="bg-slate-50 border border-gray-200/60 rounded-3xl p-6 sm:p-8 flex flex-col justify-between text-left relative">
              <div className="space-y-4">
                <span className="text-[10px] font-mono font-black text-slate-400 uppercase tracking-wider block">
                  tier_01
                </span>
                <h3 className="font-display font-black text-xl text-[#303360]">
                  Starter Ads
                </h3>
                <p className="text-xs text-slate-500 font-normal">
                  Ideal for local businesses in Noida looking to launch their search campaign and capture warm leads nearby.
                </p>
                <div className="border-t border-gray-200/60 pt-4 space-y-3">
                  {[
                    "Google Keyword & Intent Research",
                    "Max 3 Structured Ad Groups (STAGs)",
                    "Responsive Search Ads (RSA) Copy",
                    "GTM Basic Click Tracking Integration",
                    "Bi-weekly Performance Reports"
                  ].map((feat, fIdx) => (
                    <div key={fIdx} className="flex gap-2 items-start text-xs text-slate-600">
                      <Check className="w-3.5 h-3.5 text-[#FE7146] mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="pt-8">
                <button
                  onClick={onContactClick}
                  className="w-full py-3 bg-white hover:bg-slate-100 text-[#303360] font-black text-xs rounded-xl border border-gray-200 transition-all cursor-pointer"
                >
                  Get Started
                </button>
              </div>
            </div>

            {/* Plan 2: Highly Elevated */}
            <div className="bg-[#FFF1EC]/25 border-2 border-[#FE7146] rounded-3xl p-6 sm:p-8 flex flex-col justify-between text-left relative shadow-lg shadow-[#FE7146]/5">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#FE7146] text-white rounded-full font-mono text-[9px] font-black tracking-widest uppercase animate-pulse">
                MOST POPULAR
              </div>

              <div className="space-y-4">
                <span className="text-[10px] font-mono font-black text-[#FE7146] uppercase tracking-wider block">
                  tier_02
                </span>
                <h3 className="font-display font-black text-xl text-[#303360]">
                  Growth PPC
                </h3>
                <p className="text-xs text-slate-500 font-normal">
                  Perfect for fast-growing Indian D2C brands, tech startups, and lead-generation firms scaling budgets.
                </p>
                <div className="border-t border-[#FE7146]/20 pt-4 space-y-3">
                  {[
                    "Everything in Starter Package +",
                    "Advanced Alpha-Beta Structured STAGs",
                    "Custom Synced Mobile Landing Page",
                    "Enhanced Tracking (Consent Mode v2)",
                    "Dynamic Remarketing Creative setup",
                    "Weekly Performance Call Diagnostics"
                  ].map((feat, fIdx) => (
                    <div key={fIdx} className="flex gap-2 items-start text-xs text-slate-600">
                      <Check className="w-3.5 h-3.5 text-[#FE7146] mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="pt-8">
                <button
                  onClick={onContactClick}
                  className="w-full py-3 bg-[#FE7146] hover:bg-[#FE7146]/95 text-white font-black text-xs rounded-xl shadow-md shadow-[#FE7146]/10 transition-all hover:scale-[1.01] cursor-pointer"
                >
                  Scale Campaign
                </button>
              </div>
            </div>

            {/* Plan 3 */}
            <div className="bg-slate-50 border border-gray-200/60 rounded-3xl p-6 sm:p-8 flex flex-col justify-between text-left relative">
              <div className="space-y-4">
                <span className="text-[10px] font-mono font-black text-slate-400 uppercase tracking-wider block">
                  tier_03
                </span>
                <h3 className="font-display font-black text-xl text-[#303360]">
                  Enterprise PPC
                </h3>
                <p className="text-xs text-slate-500 font-normal">
                  Tailored specifically for massive ecommerce portals and high-scale enterprises mapping multi-channel attributions.
                </p>
                <div className="border-t border-gray-200/60 pt-4 space-y-3">
                  {[
                    "Unlimited Ad Groups & RSA Sets",
                    "Dedicated Performance Max (PMax) Tuning",
                    "Server-Side API Tracking Proxying",
                    "Multi-Attribution Attribution Modeling",
                    "Live Looker Studio BI Dashboard feeds",
                    "Dedicated Slack Channel Support 24/7"
                  ].map((feat, fIdx) => (
                    <div key={fIdx} className="flex gap-2 items-start text-xs text-slate-600">
                      <Check className="w-3.5 h-3.5 text-[#FE7146] mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="pt-8">
                <button
                  onClick={onContactClick}
                  className="w-full py-3 bg-white hover:bg-slate-100 text-[#303360] font-black text-xs rounded-xl border border-gray-200 transition-all cursor-pointer"
                >
                  Contact Enterprise
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 9: FAQ */}
      <section className="py-24 bg-[#F5F5FA]/50 border-t border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-mono font-black text-[#FE7146] tracking-widest uppercase">
              // TRANSPARENCY MANUAL
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-[#303360] leading-tight tracking-tight">
              Frequently Asked <span className="text-[#FE7146]">Queries</span>
            </h2>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
              Find answers to core bidding mechanics, Quality Score formulas, and how we manage monthly budgets.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-white border border-gray-100 rounded-2xl overflow-hidden transition-shadow hover:shadow-md"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="font-display font-extrabold text-sm sm:text-base text-[#303360]">
                      {faq.q}
                    </span>
                    <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                      <ChevronDown
                        size={14}
                        className={`text-[#FE7146] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                      />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                      >
                        <div className="p-5 pt-0 text-xs sm:text-sm text-slate-500 leading-relaxed border-t border-slate-50 font-normal">
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

      {/* SECTION 10: SHARED CTA BANNER */}
      <CtaBanner onContactClick={onContactClick} />

    </div>
  );
}
