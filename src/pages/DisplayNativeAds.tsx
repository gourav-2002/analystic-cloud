/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Tv,
  ArrowRight,
  Check,
  ChevronDown,
  ChevronRight,
  Sparkles,
  Users,
  Clock,
  Percent,
  Search,
  HelpCircle,
  TrendingUp,
  Layers,
  Sparkle,
  Gauge,
  Workflow,
  CheckCircle2,
  AlertTriangle,
  Smartphone,
  ShieldCheck,
  Flame,
  ArrowUpRight,
  Eye,
  MousePointerClick,
  Monitor,
  Target,
  RefreshCw,
  Award,
  Lock,
  Compass,
  FileText
} from "lucide-react";

// CountUp component triggered by intersection observer
interface CountUpProps {
  end: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  duration?: number;
}

function CountUp({ end, suffix = "", prefix = "", decimals = 0, duration = 1200 }: CountUpProps) {
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
            const currentVal = progress * end;
            setCount(currentVal);
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
      {prefix}
      {count.toFixed(decimals)}
      {suffix}
    </span>
  );
}

// Interfaces for What's Included vertical tabs
interface ServiceTab {
  id: string;
  title: string;
  description: string;
  capabilities: string[];
  metric: string;
  metricLabel: string;
  channelTag: string;
}

export function DisplayNativeAds({ onContactClick }: { onContactClick: () => void }) {
  // Motion settings for reduced motion accessibility
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  // 1. HERO "Constellation Reach Map" state
  const [activeFrameIndex, setActiveFrameIndex] = useState(0);
  const [impressionsCount, setImpressionsCount] = useState(1842900);

  useEffect(() => {
    // Increment the active frame spotlight in sequence
    const intervalFrame = setInterval(() => {
      setActiveFrameIndex((prev) => (prev + 1) % 5);
    }, 1800);

    // Slowly increment the live impressions tracker
    const intervalImpressions = setInterval(() => {
      setImpressionsCount((prev) => prev + Math.floor(Math.random() * 8) + 1);
    }, 120);

    return () => {
      clearInterval(intervalFrame);
      clearInterval(intervalImpressions);
    };
  }, []);

  // 3. DISPLAY VS NATIVE TOGGLE Mode
  const [adFormatMode, setAdFormatMode] = useState<"display" | "native">("display");

  // 4. WHAT'S INCLUDED Tab list
  const [activeTab, setActiveTab] = useState("targeting");
  const serviceTabs: ServiceTab[] = [
    {
      id: "targeting",
      title: "Audience Research & Targeting",
      description: "Stop shooting arrows in the dark. We map out high-value intent audiences by indexing search intent, behavioral cohorts, content clusters, and programmatic contextual parameters.",
      capabilities: [
        "In-Market & Affinity Cohort Mapping",
        "Contextual Keyword & Topic Lock-ins",
        "Custom Intent Keyword Grouping",
        "Geofenced Location Placement Grids"
      ],
      metric: "94.2%",
      metricLabel: "Audience Target Match",
      channelTag: "targeting_cohorts"
    },
    {
      id: "display",
      title: "Creative Design for Display Ads",
      description: "Visual assets that earn clicks without shouting. We engineer rich-media display banners, HTML5 animated units, responsive display blocks, and high-CTR interstitial mockups.",
      capabilities: [
        "HTML5 Rich Media Interactive Assets",
        "High-Impact Billboard & Sidebar Blocks",
        "Responsive Adaptive Image Assets",
        "Conversion-Optimized CTA Buttons"
      ],
      metric: "4.2x",
      metricLabel: "Average CTR Lift vs Static",
      channelTag: "creative_rendering"
    },
    {
      id: "native",
      title: "Native Ad Content & Formatting",
      description: "In-feed placements that read like real articles. We craft sponsored posts, matching feed placements, and content discovery widgets that align perfectly with host aesthetics.",
      capabilities: [
        "Feed-Matched Editorial Layouts",
        "Sponsored Article Copywriting",
        "Multi-Platform Native Adapters",
        "Discovery Widget Placement Optimization"
      ],
      metric: "+82%",
      metricLabel: "Higher Reader Engagement",
      channelTag: "contextual_alignment"
    },
    {
      id: "buying",
      title: "Programmatic Ad Buying",
      description: "Acquire premium inventory at wholesale prices. We bid programmatically in milliseconds across Google Display Network, Taboola, Outbrain, and major open-ad exchanges.",
      capabilities: [
        "Millisecond Real-Time Bidding (RTB)",
        "Direct-Deal Private Market Access",
        "Frequency Capping Brand Safeguards",
        "Multi-Gateway Floor Price Bidding"
      ],
      metric: "0.08s",
      metricLabel: "Average Bid Clearance Time",
      channelTag: "programmatic_rtb"
    },
    {
      id: "retargeting",
      title: "Retargeting & Remarketing",
      description: "Stay in front of high-value shoppers. We engineer dynamic product display carousels that remind abandoners exactly what they left behind in their cart.",
      capabilities: [
        "Dynamic Product Feed Sync (DPA)",
        "Staggered Lifetime Frequency Curves",
        "Cross-Device Device Graph Pairing",
        "Loyalty Retention Reactivation Loops"
      ],
      metric: "6.1x",
      metricLabel: "Remarketing ROAS Average",
      channelTag: "recapture_funnel"
    },
    {
      id: "reporting",
      title: "Performance Reporting",
      description: "No vanity stats. We provide complete transparent reports mapping impressions, clicks, attribution points, and real conversion dollars down to the placement level.",
      capabilities: [
        "Live-Sync Datastudio Dashboards",
        "View-Through Conversion Tracking",
        "Fraud Click Protection Audits",
        "First-Touch & Last-Touch Attribution"
      ],
      metric: "100%",
      metricLabel: "Data Attribution Transparency",
      channelTag: "accounting_ledger"
    }
  ];

  // 5. PROCESS PIPELINE Scroll Scrubbed State
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
      title: "Audience & Placement Research",
      desc: "Profiling your precise target persona and locating exactly which premium media networks and editorial sites they consume daily.",
      status: "network_mapping"
    },
    {
      num: "02",
      title: "Creative Design & Formatting",
      desc: "Creating rich display assets and formatting native copy layouts designed to look organic or stand out beautifully.",
      status: "asset_engineering"
    },
    {
      num: "03",
      title: "Programmatic Setup & Launch",
      desc: "Configuring bid rules, white-lists, frequency caps, and custom contextual targeting in top programmatic buying DSPs.",
      status: "real_time_bidding"
    },
    {
      num: "04",
      title: "Retargeting Activation",
      desc: "Launching cohorts to follow warm visitors with contextually relevant, dynamic retargeting sequences that nurture conversions.",
      status: "cohort_recapture"
    },
    {
      num: "05",
      title: "Monitor & Optimize",
      desc: "Scrubbing low-performance placements, refining bids dynamically, and reinvesting on the highest converting ad blocks.",
      status: "margin_maximization"
    }
  ];

  // 6. THE RETARGETING FUNNEL & SCRUBBABLE TIMELINE CHART
  const [funnelActive, setFunnelActive] = useState(false);
  const funnelSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setFunnelActive(true);
        }
      },
      { threshold: 0.25 }
    );
    if (funnelSectionRef.current) {
      observer.observe(funnelSectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  // Draggable timeline state (6 Months progression)
  const [scrubPercent, setScrubPercent] = useState(0.4); // default 40%
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const timelineData = [
    { month: "Month 1: Launch", impressions: "500K", clicks: "4,200", conversions: "120", ctr: "0.84%", roas: "1.8x", desc: "Setting baseline targeting, pixel cookies, and programmatic bid algorithms." },
    { month: "Month 2: Scaling", impressions: "1.2M", clicks: "11,500", conversions: "410", ctr: "0.96%", roas: "2.4x", desc: "Introducing audience affinity expansion and HTML5 animated display modules." },
    { month: "Month 3: Retargeting", impressions: "1.8M", clicks: "24,600", conversions: "890", ctr: "1.37%", roas: "3.8x", desc: "Dynamic Remarketing campaigns activate, reclaiming abandoned checkouts instantly." },
    { month: "Month 4: Maturity", impressions: "2.5M", clicks: "38,200", conversions: "1,540", ctr: "1.53%", roas: "4.5x", desc: "Algorithmic placement filtering removes low-conversion editorial zones." },
    { month: "Month 5: Mastery", impressions: "3.1M", clicks: "52,100", conversions: "2,210", ctr: "1.68%", roas: "5.2x", desc: "Multi-device retargeting graph aligns users across desktop, tablets, and phones." },
    { month: "Month 6: Flagship Peak", impressions: "4.0M", clicks: "71,400", conversions: "3,180", ctr: "1.79%", roas: "6.1x", desc: "Maximum programmatic placement efficiency, delivering sustained top-tier ROAS." }
  ];

  const maxTimelineIdx = timelineData.length - 1;
  const activeTimelineIdx = Math.min(
    maxTimelineIdx,
    Math.max(0, Math.floor(scrubPercent * (maxTimelineIdx + 1)))
  );
  const activePoint = timelineData[activeTimelineIdx];

  const handleScrubberMove = (clientX: number) => {
    if (!chartContainerRef.current) return;
    const rect = chartContainerRef.current.getBoundingClientRect();
    const pos = clientX - rect.left;
    let percent = pos / rect.width;
    percent = Math.max(0, Math.min(percent, 0.99));
    setScrubPercent(percent);
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

  // 9. FAQ ACCORDION State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const faqs = [
    {
      q: "What is the difference between display and native ads?",
      a: "Display ads are highly visual, structured banner formats placed in designated spaces (such as sidebars or header billboards) on a webpage. They are designed to stand out. Native ads are designed to blend into the editorial environment, matching the typography, layout, and visual cards of the host content. They appear as 'sponsored' or 'promoted' articles within feeds, and typically achieve higher engagement."
    },
    {
      q: "How do you ensure brand-safe placements?",
      a: "We implement multi-layered safety filters within programmatic demand-side platforms (DSPs). We use strict negative-topic exclusions, monitor keyword associations, and audit real-time inventory to block adult, highly polarized, or low-quality clickbait media channels, keeping your brand in premium safe havens."
    },
    {
      q: "Do you handle retargeting for website visitors?",
      a: "Yes, retargeting is the engine of display ad ROI. We configure cookie pixels, custom parameters, and device charts to create tailored lists (e.g., users who browsed a product but didn't buy). We then deliver dynamic product display ads to remind them of those products as they browse other premier sites."
    },
    {
      q: "What ad formats and sizes do you design?",
      a: "We design all industry-standard Interactive Advertising Bureau (IAB) formats, including Leaderboards (728x90), Half Pages (300x600), Medium Rectangles (300x250), Billboards (970x250), Mobile Banners, and high-impact HTML5 responsive interactive units."
    }
  ];

  return (
    <div className="pt-24 bg-white selection:bg-[#FE7146] selection:text-white">
      
      {/* SECTION 1: HERO - "Everywhere, On Brand" */}
      <section className="relative min-h-[90vh] flex items-center justify-center py-16 overflow-hidden bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column Description */}
            <div className="lg:col-span-5 text-left space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFF1EC] border border-[#FE7146]/20 rounded-full">
                <Tv className="w-3.5 h-3.5 text-[#FE7146]" />
                <span className="text-[10px] sm:text-xs font-mono font-black tracking-widest text-[#FE7146] uppercase">
                  // DISPLAY & NATIVE ADS
                </span>
              </div>

              <h1 className="font-display font-black text-4xl sm:text-5xl text-[#303360] tracking-tight leading-[1.1]">
                Your Brand, <span className="text-[#FE7146]">Everywhere</span> Your Audience Already Is.
              </h1>

              <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal max-w-xl">
                Command attention and build sustainable brand equity across the web's premium publisher networks. We architect native in-feed storytelling and high-impact programmatic display campaigns that convert.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
                <button
                  onClick={onContactClick}
                  className="w-full sm:w-auto bg-[#FE7146] hover:bg-[#FE7146]/95 text-white font-black text-sm px-8 py-4 rounded-xl shadow-lg shadow-[#FE7146]/20 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Get a Free Reach Audit</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href="#ad-toggle-section"
                  className="w-full sm:w-auto bg-slate-50 hover:bg-slate-100 text-[#303360] font-black text-sm px-8 py-4 rounded-xl border border-gray-200/60 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>See Ad Placements</span>
                </a>
              </div>
            </div>

            {/* Hero Right: Display & Native Ads Dashboard Image */}
            <div className="lg:col-span-7 flex justify-center w-full">
              <div className="w-full relative">
                <img
                  src="https://res.cloudinary.com/dqjlffxja/image/upload/f_auto,q_auto/v1783790036/DISPLAY_NATIVE_ADS_cnxqiq.jpg"
                  alt="Display and native ads reach dashboard"
                  className="relative w-full h-auto rounded-3xl"
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
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[180px] font-serif font-black text-slate-50 select-none pointer-events-none -z-10 opacity-60">
            “
          </span>
          <blockquote className="space-y-6">
            <p className="font-display font-bold text-2xl sm:text-4xl text-[#303360] leading-relaxed tracking-tight max-w-3xl mx-auto">
              "The best ad isn't always the loudest. <span className="text-[#FE7146] underline decoration-dashed decoration-2 underline-offset-8">Sometimes it's the one that belongs.</span>"
            </p>
            <cite className="block font-mono text-xs sm:text-sm font-bold text-slate-400 tracking-wider uppercase">
              — ANALYTICS CLOUDS DESIGN PHILOSOPHY
            </cite>
          </blockquote>
        </div>
      </section>

      {/* SECTION 3: DISPLAY VS NATIVE: SEE THE DIFFERENCE (Signature Interactive element) */}
      <section id="ad-toggle-section" className="py-24 bg-slate-50 border-t border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
            <span className="text-xs font-mono font-black text-[#FE7146] tracking-widest uppercase">
              // TWO FORMATS, ONE GOAL
            </span>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-[#303360] leading-tight tracking-tight">
              Stand Out, or Blend In — <span className="text-[#FE7146]">By Design</span>
            </h2>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
              We engineer beautiful banners that command eyeballs and native layouts that weave contextually into premium media sites. Toggle the switch below to witness the difference in context.
            </p>
          </div>

          {/* Interactive Toggle Control Switch */}
          <div className="flex justify-center mb-10">
            <div className="inline-flex p-1 bg-slate-200/80 rounded-2xl border border-slate-300/40 relative">
              <button
                onClick={() => setAdFormatMode("display")}
                className={`px-6 py-3 rounded-xl font-display font-black text-xs sm:text-sm transition-all cursor-pointer relative z-10 flex items-center gap-2 ${
                  adFormatMode === "display" ? "bg-white text-[#FE7146] shadow-sm" : "text-[#303360]/80 hover:text-[#303360]"
                }`}
              >
                <Monitor size={14} />
                <span>Display Banner Format</span>
              </button>
              <button
                onClick={() => setAdFormatMode("native")}
                className={`px-6 py-3 rounded-xl font-display font-black text-xs sm:text-sm transition-all cursor-pointer relative z-10 flex items-center gap-2 ${
                  adFormatMode === "native" ? "bg-white text-[#FE7146] shadow-sm" : "text-[#303360]/80 hover:text-[#303360]"
                }`}
              >
                <FileText size={14} />
                <span>Native In-Feed Format</span>
              </button>
            </div>
          </div>

          {/* Stylized Simulated Publisher Website */}
          <div className="bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden max-w-5xl mx-auto text-left relative">
            
            {/* Publisher Header bar */}
            <div className="bg-[#303360] px-6 py-4 flex items-center justify-between border-b border-slate-700/80 text-white">
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="font-display font-black tracking-tight text-sm">THE TIMES INSIGHT</span>
                <span className="hidden sm:inline font-mono text-[9px] text-slate-400 border-l border-slate-600 pl-2.5">PUBLISHER_NETWORK: PORTAL_A_SECURE</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-300">
                <span className="hidden md:inline font-mono text-[9px] text-[#FE7146] font-bold">STATUS: AD_INTEGRATION_ONLINE</span>
                <div className="w-4 h-4 rounded bg-slate-700"></div>
              </div>
            </div>

            {/* Simulated Layout Area */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 sm:p-8">
              
              {/* Main Content Area */}
              <div className="lg:col-span-8 space-y-6">
                
                {/* Simulated Article Header */}
                <div className="space-y-2">
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block">
                    BUSINESS & MARKETING STRATEGY · 5 MIN READ
                  </span>
                  <h3 className="font-display font-black text-xl sm:text-3xl text-[#303360] tracking-tight leading-tight">
                    How Modern Enterprises Scale Customer Reach in High-Competition Decades
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span className="font-bold">By Dr. Amit Sen</span>
                    <span>·</span>
                    <span>July 10, 2026</span>
                  </div>
                </div>

                {/* Simulated Article Body Par 1 */}
                <p className="text-slate-600 text-sm leading-relaxed font-normal">
                  Scale is no longer built simply on volume; it is built on digital presence. Modern marketers face fragmented media landscapes where attention is divided across countless domains. The traditional method of broadcasting generic copy fails because buyers seek relevance.
                </p>

                {/* INTERACTIVE COMPONENT AD SLOT IN-FEED */}
                <div className="relative border-y border-dashed border-slate-200 py-6 my-6 transition-all duration-300">
                  <AnimatePresence mode="wait">
                    {adFormatMode === "display" ? (
                      /* Display Leaderboard Ad in Content Feed */
                      <motion.div
                        key="display-infeed"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="bg-[#FFF1EC] rounded-2xl p-4 sm:p-6 border-2 border-[#FE7146] shadow-md shadow-[#FE7146]/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-left"
                      >
                        <div className="space-y-1.5 flex-grow">
                          <span className="px-2 py-0.5 bg-[#FE7146] text-white font-mono text-[8px] font-black tracking-widest uppercase rounded">
                            ADVERTISEMENT
                          </span>
                          <h4 className="font-display font-black text-lg text-[#303360] leading-tight">
                            Scale Your Growth with Analytics Clouds
                          </h4>
                          <p className="text-slate-600 text-xs leading-relaxed max-w-md">
                            Unlock high-CTR programmatic campaigns designed for extreme return on investment. Get a performance audit today.
                          </p>
                        </div>
                        <button
                          onClick={onContactClick}
                          className="w-full sm:w-auto bg-[#FE7146] hover:bg-[#FE7146]/95 text-white font-black text-xs px-5 py-3 rounded-xl shadow-md transition-all shrink-0 cursor-pointer"
                        >
                          Audit My Reach
                        </button>
                      </motion.div>
                    ) : (
                      /* Native Sponsored Card in Content Feed */
                      <motion.div
                        key="native-infeed"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="p-5 rounded-2xl border border-gray-100 hover:border-gray-200 bg-slate-50/50 flex gap-4 transition-all"
                      >
                        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-slate-200 shrink-0 overflow-hidden relative">
                          <div className="absolute inset-0 bg-gradient-to-tr from-[#303360]/10 to-[#FE7146]/10"></div>
                          <div className="w-full h-full flex items-center justify-center text-slate-400">
                            <Tv className="w-8 h-8 text-[#FE7146]/60" />
                          </div>
                        </div>
                        <div className="space-y-2 flex-grow text-left">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[9px] font-black text-[#FE7146] tracking-widest uppercase">
                              ★ SPONSORED CONTENT
                            </span>
                            <span className="text-slate-400 text-[10px]">·</span>
                            <span className="text-slate-400 text-[10px]">Analytics Clouds</span>
                          </div>
                          <h4 className="font-display font-extrabold text-base sm:text-lg text-[#303360] tracking-tight leading-tight hover:text-[#FE7146] transition-colors cursor-pointer" onClick={onContactClick}>
                            5 Overlooked Programmatic Channels That Outperform Paid Search in 2026
                          </h4>
                          <p className="text-slate-500 text-xs sm:text-sm leading-relaxed hidden sm:block">
                            Discover how forward-thinking performance marketers utilize native, contextual banner strategies to bypass cookie-decay blocks.
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Simulated Article Body Par 2 */}
                <p className="text-slate-600 text-sm leading-relaxed font-normal">
                  In addition, placement efficiency is highly governed by layout constraints. High-CPM billboard blocks remain powerful for pure recall, but when programmatic channels are aligned with native in-feed storytelling, audiences exhibit up to 8x higher recall retention metrics.
                </p>

              </div>

              {/* Sidebar Content Area */}
              <div className="lg:col-span-4 space-y-6 border-t lg:border-t-0 lg:border-l border-gray-100 pt-6 lg:pt-0 lg:pl-6">
                
                {/* Popular articles list widget */}
                <div className="space-y-4">
                  <h4 className="font-display font-black text-xs text-[#303360] tracking-wider uppercase border-b border-gray-100 pb-2">
                    MOST READ ARTICLES
                  </h4>
                  <div className="space-y-3 text-xs">
                    <div className="space-y-1">
                      <span className="font-mono text-[9px] text-[#FE7146] font-bold">01</span>
                      <p className="font-extrabold text-[#303360] hover:text-[#FE7146] cursor-pointer">
                        The Rise of Decentered Direct ad exchanges in India
                      </p>
                    </div>
                    <div className="space-y-1">
                      <span className="font-mono text-[9px] text-slate-400">02</span>
                      <p className="font-extrabold text-slate-600 hover:text-[#FE7146] cursor-pointer">
                        DLT registries enforce stricter templates rules for TRAI
                      </p>
                    </div>
                  </div>
                </div>

                {/* INTERACTIVE COMPONENT AD SLOT SIDEBAR */}
                <div className="pt-4 border-t border-gray-100">
                  <AnimatePresence mode="wait">
                    {adFormatMode === "display" ? (
                      /* Display Sidebar Banner */
                      <motion.div
                        key="display-sidebar"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className="bg-[#FFF1EC] rounded-2xl p-5 border-2 border-[#FE7146] text-center space-y-4 relative overflow-hidden"
                      >
                        <span className="inline-block px-2 py-0.5 bg-[#FE7146] text-white font-mono text-[8px] font-black tracking-widest uppercase rounded">
                          SPONSORED AD
                        </span>
                        <div className="space-y-2">
                          <h4 className="font-display font-black text-base text-[#303360] leading-tight">
                            Scale Your ROAS Globally
                          </h4>
                          <p className="text-slate-600 text-[11px] leading-relaxed">
                            Bespoke HTML5 ads engineered for higher click volumes and verified human views.
                          </p>
                        </div>
                        <button
                          onClick={onContactClick}
                          className="w-full bg-[#303360] hover:bg-slate-800 text-white font-black text-xs py-3 rounded-xl shadow transition-colors cursor-pointer"
                        >
                          Audit My Brand Reach
                        </button>
                      </motion.div>
                    ) : (
                      /* Native Sidebar Article Link card */
                      <motion.div
                        key="native-sidebar"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className="rounded-2xl p-4 bg-slate-50 border border-gray-100 hover:border-gray-200 transition-all text-left space-y-2"
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[8px] font-black text-slate-400 tracking-wider uppercase">
                            RECOMMENDED ARTICLE
                          </span>
                          <span className="text-[9px] font-mono font-black text-[#FE7146] tracking-widest uppercase">
                            (SPONSORED)
                          </span>
                        </div>
                        <h4 className="font-display font-extrabold text-xs sm:text-sm text-[#303360] hover:text-[#FE7146] leading-snug cursor-pointer" onClick={onContactClick}>
                          How We Scaled an E-Commerce Brand to 12.8M impressions in 90 Days Without Cookie Pixels
                        </h4>
                        <p className="text-slate-500 text-[10px] leading-relaxed">
                          A breakdown of modern contextual cookieless bidding workflows and DPA systems.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* SECTION 4: WHAT'S INCLUDED (Interactive tab explorer) */}
      <section className="py-24 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-mono font-black text-[#FE7146] tracking-widest uppercase">
              // COMPLETE STACK
            </span>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-[#303360] leading-tight tracking-tight">
              An End-to-End <span className="text-[#FE7146]">Ad-Buying Pipeline</span>
            </h2>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
              We manage the entire visual funnel, from high-fidelity HTML5 banner engineering and sponsored content layouts to programmatic real-time bidding management and dynamic product retargeting.
            </p>
          </div>

          {/* DESKTOP VIEW: Sidebar Vertical Tabs */}
          <div className="hidden lg:grid lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Vertical Tabs list */}
            <div className="lg:col-span-4 space-y-2">
              {serviceTabs.map((tab) => {
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
                        {tab.id === "targeting" && <Target size={14} />}
                        {tab.id === "display" && <Tv size={14} />}
                        {tab.id === "native" && <FileText size={14} />}
                        {tab.id === "buying" && <Compass size={14} />}
                        {tab.id === "retargeting" && <RefreshCw size={14} />}
                        {tab.id === "reporting" && <Award size={14} />}
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

            {/* Right Content Panel */}
            <div className="lg:col-span-8">
              <AnimatePresence mode="wait">
                {serviceTabs.map((tab) => {
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
                      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 pb-4">
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono font-black text-slate-400 tracking-wider">
                            SYSTEM_STAGE: {tab.channelTag}
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

                      {/* Capabilities Grid */}
                      <div className="space-y-3 pt-2">
                        <span className="text-xs font-mono font-black text-[#303360] tracking-wide uppercase block">
                          SYSTEM CAPABILITIES:
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

          {/* MOBILE VIEW: Collapsible Accordion List */}
          <div className="block lg:hidden space-y-4 text-left">
            {serviceTabs.map((tab) => {
              const isOpen = activeTab === tab.id;
              return (
                <div key={tab.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                  <button
                    onClick={() => setActiveTab(isOpen ? "" : tab.id)}
                    className="w-full p-4 flex items-center justify-between text-left cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono text-xs font-black ${
                        isOpen ? "bg-[#FFF1EC] text-[#FE7146]" : "bg-slate-100 text-slate-400"
                      }`}>
                        {tab.id === "targeting" && <Target size={14} />}
                        {tab.id === "display" && <Tv size={14} />}
                        {tab.id === "native" && <FileText size={14} />}
                        {tab.id === "buying" && <Compass size={14} />}
                        {tab.id === "retargeting" && <RefreshCw size={14} />}
                        {tab.id === "reporting" && <Award size={14} />}
                      </div>
                      <span className="text-sm font-extrabold text-[#303360] tracking-tight">
                        {tab.title}
                      </span>
                    </div>
                    <div className={`w-7 h-7 rounded-full bg-slate-50 flex items-center justify-center border border-gray-100 transition-transform ${
                      isOpen ? "rotate-180 text-[#FE7146]" : "text-[#303360]"
                    }`}>
                      <ChevronDown size={14} />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.22, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="p-4 pt-0 border-t border-gray-50 space-y-4">
                          <div className="flex items-center justify-between gap-4 pt-3">
                            <span className="text-[9px] font-mono font-black text-slate-400 tracking-wider">
                              SYSTEM_STAGE: {tab.channelTag}
                            </span>
                            <div className="px-2.5 py-1 bg-[#FFF1EC]/80 border border-[#FE7146]/10 rounded-xl flex items-center gap-1.5">
                              <span className="font-mono font-black text-xs text-[#FE7146]">
                                {tab.metric}
                              </span>
                              <span className="text-[8px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                                {tab.metricLabel}
                              </span>
                            </div>
                          </div>

                          <p className="text-slate-600 text-xs leading-relaxed font-normal">
                            {tab.description}
                          </p>

                          <div className="space-y-2 pt-1">
                            <span className="text-[9px] font-mono font-black text-[#303360] tracking-wide uppercase block">
                              SYSTEM CAPABILITIES:
                            </span>
                            <div className="grid grid-cols-1 gap-2">
                              {tab.capabilities.map((cap, capIdx) => (
                                <div key={capIdx} className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-50 border border-gray-100 text-xs text-slate-600">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-[#FE7146] shrink-0 mt-0.5" />
                                  <span className="leading-tight">{cap}</span>
                                </div>
                              ))}
                            </div>
                          </div>
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

      {/* SECTION 5: OUR PROCESS - Scroll Scrubbed Campaign Pipeline */}
      <section ref={pipelineRef} className="py-24 bg-white overflow-hidden border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-mono font-black text-[#FE7146] tracking-widest uppercase">
              // METHODICAL EXCELLENCE
            </span>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-[#303360] leading-tight tracking-tight">
              An Elite Programmatic <span className="text-[#FE7146]">Launch Sequence</span>
            </h2>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
              We treat programmatic buying and creative production as an extreme science. Our 5-stage setup sequence guarantees optimized bids and brand safety prior to any bid clearances.
            </p>
          </div>

          {/* Timeline Pipeline */}
          <div className="relative pt-6">
            
            {/* Horizontal connection line */}
            <div className="absolute top-[36px] left-0 w-full h-[3px] bg-slate-100 hidden lg:block"></div>

            {/* Dynamic scroll-progress timeline */}
            <div
              className="absolute top-[36px] left-0 h-[3px] bg-[#FE7146] transition-all duration-150 hidden lg:block"
              style={{ width: `${scrollProgress * 100}%` }}
            ></div>

            {/* Steps Nodes */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 relative z-10">
              {pipelineSteps.map((step, idx) => {
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
                      
                      {/* Mobile line connection */}
                      <div className="h-[2px] bg-slate-100 flex-grow lg:hidden"></div>
                    </div>

                    {/* Step description */}
                    <div className="space-y-2 pt-2">
                      <div className="flex justify-between items-center">
                        <span className="text-[9px] font-mono font-bold text-slate-400">
                          {step.status}
                        </span>
                        {isStepActive && (
                          <span className="text-[9px] font-mono font-bold text-[#FE7146] tracking-wider animate-pulse">
                            ACTIVE_PASS
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

      {/* SECTION 6: THE RETARGETING FUNNEL & SCRUBBABLE TIMELINE (Proof Moment) */}
      <section ref={funnelSectionRef} className="py-24 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-mono font-black text-[#FE7146] tracking-widest uppercase">
              // STAYING ON THEIR RADAR
            </span>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-[#303360] leading-tight tracking-tight">
              From First Glance to <span className="text-[#FE7146]">Final Click</span>
            </h2>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
              We map the cold impressions to highly optimized, device-graph targeted remarketing cohorts, converting passive visitors into lifelong brand advocates.
            </p>
          </div>

          {/* Interactive Horizontal Funnel Diagram with flow dots */}
          <div className="bg-[#303360] rounded-3xl p-6 sm:p-10 border border-white/5 shadow-2xl relative overflow-hidden mb-12 max-w-5xl mx-auto text-left text-white">
            <div className="absolute inset-0 bg-[radial-gradient(rgba(254,113,70,0.04)_1px,transparent_1px)] [background-size:16px_16px]"></div>

            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-10 relative z-10">
              <div className="flex items-center gap-2">
                <Workflow className="w-4 h-4 text-[#FE7146] animate-pulse" />
                <span className="font-mono text-xs font-extrabold tracking-wider">RETARGETING_FLOW_DEVICES</span>
              </div>
              <span className="text-[9px] font-mono text-slate-400 uppercase bg-white/5 px-2 py-0.5 rounded">
                Telemetry: ACTIVE
              </span>
            </div>

            {/* Funnel diagram grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-4 relative z-10">
              
              {/* Funnel Stage 1 */}
              <div className="bg-slate-950/40 p-4 rounded-2xl border border-white/5 space-y-2 relative flex flex-col justify-between">
                <div className="space-y-1">
                  <span className="font-mono text-[9px] text-[#FE7146] font-bold">STAGE 01</span>
                  <h4 className="font-display font-extrabold text-base">01. Cold Impression</h4>
                  <p className="text-slate-400 text-xs font-normal">
                    User views an on-brand contextual banner on a premier news portal.
                  </p>
                </div>
                <div className="pt-4 border-t border-white/5 font-mono text-[10px] text-slate-400 flex items-center justify-between">
                  <span>Engagement:</span>
                  <span className="text-[#FE7146] font-bold">Passive Views</span>
                </div>
              </div>

              {/* Funnel Stage 2 */}
              <div className="bg-slate-950/40 p-4 rounded-2xl border border-white/5 space-y-2 relative flex flex-col justify-between">
                <div className="space-y-1">
                  <span className="font-mono text-[9px] text-[#FE7146] font-bold">STAGE 02</span>
                  <h4 className="font-display font-extrabold text-base">02. Web Visit & Click</h4>
                  <p className="text-slate-400 text-xs font-normal">
                    Intrigued by editorial storytelling, they click and browse product offers.
                  </p>
                </div>
                <div className="pt-4 border-t border-white/5 font-mono text-[10px] text-slate-400 flex items-center justify-between">
                  <span>Engagement Rate:</span>
                  <span className="text-white font-bold">1.5% - 2.8% CTR</span>
                </div>
              </div>

              {/* Funnel Stage 3 */}
              <div className="bg-slate-950/40 p-4 rounded-2xl border border-white/5 space-y-2 relative flex flex-col justify-between">
                <div className="space-y-1">
                  <span className="font-mono text-[9px] text-[#FE7146] font-bold">STAGE 03</span>
                  <h4 className="font-display font-extrabold text-base">03. Dynamic Remarket</h4>
                  <p className="text-slate-400 text-xs font-normal">
                    Pixel registers bounce. Dynamic product ads display checkout offers.
                  </p>
                </div>
                <div className="pt-4 border-t border-white/5 font-mono text-[10px] text-slate-400 flex items-center justify-between">
                  <span>Re-engagement:</span>
                  <span className="text-[#FE7146] font-extrabold">2.3x Conversion Lift</span>
                </div>
              </div>

              {/* Funnel Stage 4 */}
              <div className="bg-slate-950/40 p-4 rounded-2xl border border-white/5 space-y-2 relative flex flex-col justify-between">
                <div className="space-y-1">
                  <span className="font-mono text-[9px] text-[#FE7146] font-bold">STAGE 04</span>
                  <h4 className="font-display font-extrabold text-base">04. conversion</h4>
                  <p className="text-slate-400 text-xs font-normal">
                    Dynamic checkout coupon code clears purchase. ROI maps directly.
                  </p>
                </div>
                <div className="pt-4 border-t border-white/5 font-mono text-[10px] text-slate-400 flex items-center justify-between">
                  <span>Attribution ROAS:</span>
                  <span className="text-emerald-400 font-extrabold">Avg 6.1x ROAS</span>
                </div>
              </div>

            </div>

            {/* Small animated flow dots */}
            <div className="hidden md:flex justify-around items-center h-4 mt-6 relative z-10">
              <div className="w-full h-[1px] bg-gradient-to-r from-[#FE7146] to-transparent relative">
                <motion.div
                  initial={{ left: 0 }}
                  animate={funnelActive ? { left: "100%" } : { left: 0 }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
                  className="absolute w-2 h-2 rounded-full bg-[#FE7146] shadow-md shadow-[#FE7146]/50 -top-0.5"
                ></motion.div>
              </div>
            </div>

          </div>

          {/* Draggable scrubbable chart scrubber */}
          <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xl max-w-5xl mx-auto text-left space-y-6">
            
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 pb-4">
              <div className="space-y-1">
                <span className="text-xs font-mono font-black text-[#FE7146] uppercase">
                  // CAMPAIGN ACCELERATOR CHART
                </span>
                <h3 className="font-display font-black text-xl text-[#303360]">
                  Interactive Programmatic Growth Scrubber
                </h3>
              </div>
              <p className="text-slate-500 text-xs sm:text-sm max-w-md">
                Drag the playhead handle below to trace how conversions, impressions, and attributed ROAS compound over a 6-month programmatic optimization schedule.
              </p>
            </div>

            {/* Draggable interactive scrubber container */}
            <div
              ref={chartContainerRef}
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
              className="h-32 bg-white rounded-2xl border border-gray-100 shadow-inner relative overflow-hidden select-none cursor-ew-resize flex items-center"
            >
              {/* Backing visual grid blocks */}
              <div className="absolute inset-y-0 left-0 bg-[#FFF1EC]/30 border-r border-[#FE7146]/5" style={{ width: "16.6%" }}></div>
              <div className="absolute inset-y-0 left-[16.6%] bg-[#FFF1EC]/40 border-r border-[#FE7146]/5" style={{ width: "16.6%" }}></div>
              <div className="absolute inset-y-0 left-[33.2%] bg-[#FFF1EC]/50 border-r border-[#FE7146]/5" style={{ width: "16.6%" }}></div>
              <div className="absolute inset-y-0 left-[49.8%] bg-[#FFF1EC]/60 border-r border-[#FE7146]/5" style={{ width: "16.6%" }}></div>
              <div className="absolute inset-y-0 left-[66.4%] bg-[#FFF1EC]/70 border-r border-[#FE7146]/15" style={{ width: "16.6%" }}></div>
              <div className="absolute inset-y-0 left-[83%] bg-[#FFF1EC]/80" style={{ width: "17%" }}></div>

              {/* Growth Wave Vector Path underlays */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40" preserveAspectRatio="none" viewBox="0 0 100 100">
                <path d="M 0,90 Q 20,80 40,65 T 80,40 T 100,10 L 100,100 L 0,100 Z" fill="#FE7146" />
                <path d="M 0,90 Q 20,80 40,65 T 80,40 T 100,10" fill="none" stroke="#FE7146" strokeWidth="2" />
              </svg>

              {/* Month Markers Labels */}
              <div className="absolute inset-x-0 bottom-2 flex justify-between px-4 text-[9px] font-mono text-[#303360] font-bold">
                <span>Month 1</span>
                <span>Month 2</span>
                <span>Month 3</span>
                <span>Month 4</span>
                <span>Month 5</span>
                <span>Month 6</span>
              </div>

              {/* Vertical Scrubber Line Handle indicator */}
              <div
                className="absolute inset-y-0 w-1 bg-[#FE7146] shadow-lg flex items-center justify-center transition-all duration-100"
                style={{ left: `${scrubPercent * 100}%` }}
              >
                <div className="w-6 h-6 rounded-full bg-white border-2 border-[#FE7146] flex items-center justify-center shadow-md">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FE7146] animate-ping"></div>
                </div>
              </div>
            </div>

            {/* Toggled Interactive metrics readout readout */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 p-5 rounded-2xl bg-[#303360] text-white border border-slate-700">
              
              {/* Metric 1 */}
              <div className="space-y-1">
                <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest block">
                  TIMELINE_STAGE
                </span>
                <div className="font-display font-black text-[#FE7146] text-sm leading-none truncate">
                  {activePoint.month}
                </div>
              </div>

              {/* Metric 2 */}
              <div className="space-y-1">
                <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest block">
                  IMPRESSIONS
                </span>
                <div className="font-mono font-bold text-white text-base leading-none">
                  {activePoint.impressions}
                </div>
              </div>

              {/* Metric 3 */}
              <div className="space-y-1">
                <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest block">
                  CLICKS (CTR)
                </span>
                <div className="font-mono font-bold text-white text-base leading-none">
                  {activePoint.clicks} ({activePoint.ctr})
                </div>
              </div>

              {/* Metric 4 */}
              <div className="space-y-1">
                <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest block">
                  CONVERSIONS
                </span>
                <div className="font-mono font-bold text-white text-base leading-none">
                  {activePoint.conversions}
                </div>
              </div>

              {/* Metric 5 */}
              <div className="space-y-1 col-span-2 md:col-span-1">
                <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest block">
                  ATTRIBUTION_ROAS
                </span>
                <div className="font-mono font-black text-emerald-400 text-lg leading-none">
                  {activePoint.roas}
                </div>
              </div>

            </div>

            {/* Descriptive Context sentence */}
            <div className="p-4 bg-white rounded-xl border border-gray-150 text-xs text-slate-600 leading-relaxed font-normal">
              <span className="font-bold text-[#303360]">Stage Detail: </span>
              {activePoint.desc}
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 7: WHY CHOOSE US - Split Stat/Differentiator band */}
      <section className="py-24 bg-[#303360] text-white overflow-hidden relative border-b border-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(rgba(254,113,70,0.02)_1px,transparent_1px)] [background-size:20px_20px] opacity-70"></div>
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-[#FE7146]/5 blur-3xl translate-y-1/3 translate-x-1/3"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: 4 differentiators */}
            <div className="lg:col-span-6 space-y-8 text-left">
              <div className="space-y-4">
                <span className="text-xs font-mono font-black text-[#FE7146] tracking-widest uppercase block">
                  // WHY PARTNER WITH US
                </span>
                <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight leading-tight">
                  High-Impact Visuals, <span className="text-[#FE7146]">Extreme Brand Safety</span>
                </h2>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  We don't buy cheap, cluttered ad blocks that damage brand status. We clear custom placements only on premium domain havens that yield real conversions.
                </p>
              </div>

              {/* Differentiators list */}
              <div className="space-y-4">
                
                {/* Diff 1 */}
                <div className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-[#FFF1EC] flex items-center justify-center text-[#FE7146] shrink-0 mt-0.5">
                    <Compass size={18} />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-display font-extrabold text-sm sm:text-base text-white">
                      Premium Publisher & App Network Access
                    </h4>
                    <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                      Clear private marketplace direct-deals with India's top publisher outlets, completely bypassing low-grade blind ad inventory.
                    </p>
                  </div>
                </div>

                {/* Diff 2 */}
                <div className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-[#FFF1EC] flex items-center justify-center text-[#FE7146] shrink-0 mt-0.5">
                    <Tv size={18} />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-display font-extrabold text-sm sm:text-base text-white">
                      Format-Native Creative Design
                    </h4>
                    <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                      Bespoke interactive HTML5 animated display modules built by in-house design veterans to matches any host column perfectly.
                    </p>
                  </div>
                </div>

                {/* Diff 3 */}
                <div className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-[#FFF1EC] flex items-center justify-center text-[#FE7146] shrink-0 mt-0.5">
                    <Target size={18} />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-display font-extrabold text-sm sm:text-base text-white">
                      Smart Retargeting Strategy
                    </h4>
                    <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                      Device-graph cookie mapping tracks shopping abandoners across multiple systems, keeping your brand warm without fatigue.
                    </p>
                  </div>
                </div>

                {/* Diff 4 */}
                <div className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-[#FFF1EC] flex items-center justify-center text-[#FE7146] shrink-0 mt-0.5">
                    <Lock size={18} />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-display font-extrabold text-sm sm:text-base text-white">
                      Brand-Safe Placement Controls
                    </h4>
                    <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                      Continuous real-time safety sweeps exclude problematic news categories, adult panels, or toxic clickbait domains immediately.
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Right Column: 2x2 grid stats with CountUp */}
            <div className="lg:col-span-6 w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Stat card 1 */}
              <div className="bg-slate-950/40 p-6 rounded-2xl border border-white/5 text-left relative group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#FE7146]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="space-y-2 relative z-10">
                  <CountUp end={45} suffix="M+" />
                  <h4 className="font-display font-extrabold text-sm text-white">
                    Impressions Delivered Monthly
                  </h4>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Vast real-time bidding network footprint spanning premier domains.
                  </p>
                </div>
              </div>

              {/* Stat card 2 */}
              <div className="bg-slate-950/40 p-6 rounded-2xl border border-white/5 text-left relative group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#FE7146]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="space-y-2 relative z-10">
                  <CountUp end={82} suffix="%" />
                  <h4 className="font-display font-extrabold text-sm text-white">
                    Engagement Uplift
                  </h4>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Average CTR improvement across native article feed modules.
                  </p>
                </div>
              </div>

              {/* Stat card 3 */}
              <div className="bg-slate-950/40 p-6 rounded-2xl border border-white/5 text-left relative group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#FE7146]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="space-y-2 relative z-10">
                  <CountUp end={6.1} decimals={1} suffix="x" />
                  <h4 className="font-display font-extrabold text-sm text-white">
                    Average Campaign ROAS
                  </h4>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Proven conversion returns on programmatic remarketing tunnels.
                  </p>
                </div>
              </div>

              {/* Stat card 4 */}
              <div className="bg-slate-950/40 p-6 rounded-2xl border border-white/5 text-left relative group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#FE7146]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="space-y-2 relative z-10">
                  <CountUp end={95} suffix="%" />
                  <h4 className="font-display font-extrabold text-sm text-white">
                    Client Retention Rate
                  </h4>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Sustained partnerships built purely on direct margin attribution.
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* SECTION 8: PRICING / PACKAGES */}
      <section className="py-24 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-mono font-black text-[#FE7146] tracking-widest uppercase">
              // REASONABLE COMMITMENT
            </span>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-[#303360] leading-tight tracking-tight">
              Honest, Transparent <span className="text-[#FE7146]">Investment Packages</span>
            </h2>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
              No hidden agency fees or blind margin write-offs. Choose a performance package designed to match your specific commercial footprint.
            </p>
          </div>

          {/* Pricing Tiers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto text-left">
            
            {/* Starter Package */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-150 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow relative">
              <div className="space-y-6">
                <div className="space-y-2">
                  <span className="text-xs font-mono font-black text-slate-400 tracking-wider block uppercase">
                    STARTER BUNDLE
                  </span>
                  <h3 className="font-display font-black text-2xl text-[#303360]">
                    Reach Pilot
                  </h3>
                  <p className="text-slate-500 text-xs">
                    Ideal for local brands looking to establish baseline programmatic banner presence on premium regional networks.
                  </p>
                </div>

                <div className="border-t border-b border-gray-100 py-4 font-mono">
                  <span className="text-3xl font-black text-[#303360]">₹35,000</span>
                  <span className="text-slate-400 text-xs"> / Month</span>
                </div>

                <ul className="space-y-3 text-xs text-slate-600">
                  <li className="flex items-center gap-2">
                    <Check size={14} className="text-[#FE7146]" />
                    <span>Contextual Banner Placements</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={14} className="text-[#FE7146]" />
                    <span>Standard Creative Display Set</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={14} className="text-[#FE7146]" />
                    <span>Basic Remessaging Cohort</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={14} className="text-[#FE7146]" />
                    <span>Google Display Network Only</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={14} className="text-[#FE7146]" />
                    <span>Monthly Performance Audit Logs</span>
                  </li>
                </ul>
              </div>

              <div className="pt-8">
                <button
                  onClick={onContactClick}
                  className="w-full bg-[#303360] hover:bg-slate-800 text-white font-black text-xs py-3.5 rounded-xl transition-colors cursor-pointer text-center"
                >
                  Activate Reach Pilot
                </button>
              </div>
            </div>

            {/* Growth Package */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#FE7146] flex flex-col justify-between shadow-xl relative scale-100 lg:scale-105 z-10">
              
              {/* Most popular badge */}
              <div className="absolute top-0 right-8 -translate-y-1/2 px-3 py-1 bg-[#FE7146] text-white font-mono text-[9px] font-black tracking-widest uppercase rounded-full shadow-md animate-bounce">
                MOST POPULAR
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <span className="text-xs font-mono font-black text-[#FE7146] tracking-wider block uppercase">
                    GROWTH SUITE
                  </span>
                  <h3 className="font-display font-black text-2xl text-[#303360]">
                    Brand Accelerator
                  </h3>
                  <p className="text-slate-500 text-xs">
                    Perfect for mid-tier enterprises seeking synchronized native feeds and HTML5 interactive display carousels.
                  </p>
                </div>

                <div className="border-t border-b border-gray-100 py-4 font-mono">
                  <span className="text-3xl font-black text-[#FE7146]">₹75,000</span>
                  <span className="text-slate-400 text-xs"> / Month</span>
                </div>

                <ul className="space-y-3 text-xs text-slate-600">
                  <li className="flex items-center gap-2">
                    <Check size={14} className="text-[#FE7146]" />
                    <span className="font-bold text-[#303360]">Premium Taboola & Outbrain Access</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={14} className="text-[#FE7146]" />
                    <span>Interactive HTML5 Display Sets</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={14} className="text-[#FE7146]" />
                    <span>Dynamic Product Ad Feeds Sync</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={14} className="text-[#FE7146]" />
                    <span>Cross-Device Graph Retargeting</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={14} className="text-[#FE7146]" />
                    <span>Bi-Weekly Live Dashboard Sync</span>
                  </li>
                </ul>
              </div>

              <div className="pt-8">
                <button
                  onClick={onContactClick}
                  className="w-full bg-[#FE7146] hover:bg-[#FE7146]/95 text-white font-black text-xs py-3.5 rounded-xl shadow-md shadow-[#FE7146]/10 transition-transform hover:scale-[1.01] cursor-pointer text-center"
                >
                  Acquire Brand Accelerator
                </button>
              </div>
            </div>

            {/* Scale Package */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-150 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow relative">
              <div className="space-y-6">
                <div className="space-y-2">
                  <span className="text-xs font-mono font-black text-slate-400 tracking-wider block uppercase">
                    ENTERPRISE BUNDLE
                  </span>
                  <h3 className="font-display font-black text-2xl text-[#303360]">
                    Omnipresent Force
                  </h3>
                  <p className="text-slate-500 text-xs">
                    Designed for dominant market players requiring absolute custom coverage, programmatic PMP deals, and full margin auditing.
                  </p>
                </div>

                <div className="border-t border-b border-gray-100 py-4 font-mono">
                  <span className="text-3xl font-black text-[#303360]">₹1,50,000</span>
                  <span className="text-slate-400 text-xs"> / Month</span>
                </div>

                <ul className="space-y-3 text-xs text-slate-600">
                  <li className="flex items-center gap-2">
                    <Check size={14} className="text-[#FE7146]" />
                    <span className="font-bold text-[#303360]">Private Marketplace (PMP) Exclusives</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={14} className="text-[#FE7146]" />
                    <span>Bespoke Interactive Ads Production</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={14} className="text-[#FE7146]" />
                    <span>Complete Custom Native Placements</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={14} className="text-[#FE7146]" />
                    <span>Staggered Frequency Cap Lock-ins</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={14} className="text-[#FE7146]" />
                    <span>Dedicated ROI Analytics Team</span>
                  </li>
                </ul>
              </div>

              <div className="pt-8">
                <button
                  onClick={onContactClick}
                  className="w-full bg-[#303360] hover:bg-slate-800 text-white font-black text-xs py-3.5 rounded-xl transition-colors cursor-pointer text-center"
                >
                  Deploy Omnipresent Force
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 9: FAQ (Accordion, matching sitewide accordion styling) */}
      <section className="py-24 bg-slate-50 border-t border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16 space-y-4">
            <span className="text-xs font-mono font-black text-[#FE7146] tracking-widest uppercase">
              // INTELLECTUAL RESOLUTION
            </span>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-[#303360] leading-tight tracking-tight">
              Frequently Asked <span className="text-[#FE7146]">Ad Inquiries</span>
            </h2>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
              Have specific questions about programmatic buying rules or brand safety exclusions? Read through our standard answers below.
            </p>
          </div>

          {/* Accordion List */}
          <div className="space-y-4 text-left">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div key={idx} className="bg-white rounded-2xl border border-gray-150 overflow-hidden shadow-sm">
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-5 flex items-center justify-between text-left cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#FFF1EC] flex items-center justify-center text-[#FE7146] shrink-0">
                        <HelpCircle size={12} />
                      </div>
                      <span className="text-sm sm:text-base font-extrabold text-[#303360] tracking-tight">
                        {faq.q}
                      </span>
                    </div>
                    <div className={`w-7 h-7 rounded-full bg-slate-50 flex items-center justify-center border border-gray-100 transition-transform ${
                      isOpen ? "rotate-180 text-[#FE7146]" : "text-[#303360]"
                    }`}>
                      <ChevronDown size={14} />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.22, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="p-5 pt-0 border-t border-gray-100">
                          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal pt-4">
                            {faq.a}
                          </p>
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

      {/* SECTION 10: CTA BANNER (Custom styled adapted banner) */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-[#FE7146] rounded-3xl p-8 sm:p-12 lg:p-16 text-white relative overflow-hidden shadow-2xl shadow-[#FE7146]/30 flex flex-col lg:flex-row justify-between items-center gap-8 text-left">
            
            {/* Background vector underlays */}
            <div className="absolute inset-0 opacity-10 pointer-events-none select-none">
              <svg className="w-full h-full" viewBox="0 0 800 300" preserveAspectRatio="none">
                <path
                  d="M -50,250 Q 200,240 350,150 T 650,80 T 850,20 L 850,350 L -50,350 Z"
                  fill="white"
                />
                <path
                  d="M -50,250 Q 200,240 350,150 T 650,80 T 850,20"
                  fill="none"
                  stroke="white"
                  strokeWidth="10"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <div className="absolute right-10 bottom-0 opacity-10 pointer-events-none select-none hidden lg:block">
              <ArrowUpRight size={240} className="stroke-[1.5]" />
            </div>

            {/* Title & Copy */}
            <div className="space-y-4 max-w-2xl relative z-10">
              <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white leading-tight tracking-tight">
                Ready to Put Your Brand in Front of the Right Audience, Everywhere?
              </h2>
              <p className="text-orange-50 text-base sm:text-lg font-normal">
                Let us deploy premium programmatic native feeds and high-impact custom banner campaigns. Start your free reach audit with Analytics Clouds today.
              </p>
            </div>

            {/* Action button */}
            <div className="relative z-10 w-full lg:w-auto">
              <button
                onClick={onContactClick}
                className="w-full lg:w-auto bg-white hover:bg-orange-50 text-[#FE7146] font-black text-base px-8 py-4 rounded-xl shadow-lg transition-all hover:scale-[1.03] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Get a Free Reach Audit</span>
                <TrendingUp size={18} />
              </button>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
