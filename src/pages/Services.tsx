/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  MessageSquare,
  ArrowRight,
  Check,
  ChevronDown,
  Sparkles,
  Users,
  Clock,
  Zap,
  Percent,
  Search,
  HelpCircle,
  TrendingUp,
  Mail,
  Heart,
  Share2,
  Instagram,
  Facebook,
  Linkedin,
  Twitter,
  Video,
  Layers,
  Award,
  Eye,
  Rocket,
  ArrowUpRight,
  Calendar,
  ThumbsUp,
  Flame,
  CheckCircle2,
  ChevronRight,
  Plus
} from "lucide-react";
import { CtaBanner } from "../components/CtaBanner";

// CountUp Component triggered by Intersection Observer
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

export function Services({ onContactClick }: { onContactClick: () => void }) {
  // Motion setting for reduced motion accessibility
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  // 1. HERO LIVE-TICKING STATE
  const [likes, setLikes] = useState(1420);
  const [comments, setComments] = useState(243);
  const [shares, setShares] = useState(112);
  const [followers, setFollowers] = useState(12400);
  const [activePlatform, setActivePlatform] = useState(0); // 0: Instagram, 1: LinkedIn, 2: Facebook, 3: X/Twitter

  const platforms = [
    { name: "Instagram", icon: <Instagram className="w-4 h-4 text-[#E4405F]" />, handle: "@analytics_clouds_in" },
    { name: "LinkedIn", icon: <Linkedin className="w-4 h-4 text-[#0A66C2]" />, handle: "company/analytics-clouds" },
    { name: "Facebook", icon: <Facebook className="w-4 h-4 text-[#1877F2]" />, handle: "AnalyticsCloudsIndia" },
    { name: "Twitter", icon: <Twitter className="w-4 h-4 text-[#1DA1F2]" />, handle: "@AnalyticsClouds" }
  ];

  // Live counters ambient loop
  useEffect(() => {
    const counterInterval = setInterval(() => {
      setLikes(prev => prev + Math.floor(Math.random() * 3) + 1);
      if (Math.random() > 0.6) setComments(prev => prev + 1);
      if (Math.random() > 0.8) setShares(prev => prev + 1);
      if (Math.random() > 0.5) setFollowers(prev => prev + Math.floor(Math.random() * 2) + 1);
    }, 2800);

    const platformInterval = setInterval(() => {
      setActivePlatform(prev => (prev + 1) % platforms.length);
    }, 4000);

    return () => {
      clearInterval(counterInterval);
      clearInterval(platformInterval);
    };
  }, []);

  // 3. WHAT'S INCLUDED STATE
  const [selectedIncludeTab, setSelectedIncludeTab] = useState("strategy");
  const includesData = [
    {
      id: "strategy",
      title: "Social Strategy & Audit",
      description: "A comprehensive analysis of your current platforms and a bespoke strategic roadmap to win your niche in Noida or pan-India.",
      capabilities: [
        "Competitive landscape analysis and content positioning",
        "Target persona design and active interest mapping",
        "Platform prioritization tailored to your industry",
        "Comprehensive channel audit (bio, visuals, links, CTA architecture)"
      ],
      metric: "100%",
      metricLabel: "Custom Blueprint"
    },
    {
      id: "creation",
      title: "Content Creation & Design",
      description: "We handle the complete creative process, from copywriting and copywriting structures to highly polished graphic design assets.",
      capabilities: [
        "On-brand custom templates and curated aesthetic families",
        "Expert copywriters crafting engaging hooks and strong CTAs",
        "Bespoke illustration, carousel designs, and infographics",
        "Consistent brand guidelines and tone voice enforcement"
      ],
      metric: "4K+",
      metricLabel: "Assets Produced"
    },
    {
      id: "video",
      title: "Reels & Short-Form Video",
      description: "Harness the absolute highest-performing content format today. We direct, edit, and optimize short-form videos.",
      capabilities: [
        "Trending audio research and platform-native hook design",
        "Dynamic captions, pacing cuts, sound effects, and transitions",
        "Full scripting, storyboard direction, and post-production",
        "Multi-platform format optimization (Reels, TikTok, YouTube Shorts)"
      ],
      metric: "3.2x",
      metricLabel: "Higher Reach Rate"
    },
    {
      id: "community",
      title: "Community Management",
      description: "Social media is a two-way conversation. We respond, spark discussions, handle DMs, and build active, loyal communities.",
      capabilities: [
        "Inbound comment and message response within agreed SLAs",
        "Proactive outreach and engagement with relevant accounts",
        "Nurturing fan-advocates and resolving customer concerns",
        "Review tracking, brand sentiment monitoring, and reporting"
      ],
      metric: "15Mins",
      metricLabel: "Avg Response Time"
    },
    {
      id: "influencer",
      title: "Influencer Collaborations",
      description: "Expand trust and multiply reach via vetted micro and macro influencer partnerships that match your Noida market objectives.",
      capabilities: [
        "Vetted influencer sourcing, audience validation, and metrics audits",
        "Negotiation, legal contracts, and campaign briefing management",
        "Co-created brand campaign oversight and tracking integration",
        "ROI reporting on discount codes, link clicks, and overall impact"
      ],
      metric: "250+",
      metricLabel: "Partner Network"
    },
    {
      id: "amplification",
      title: "Paid Social Amplification",
      description: "We don't just rely on organic hope. We boost your top-performing organic assets to targeted audiences for scalable conversion.",
      capabilities: [
        "Lookalike and interest-based audience target structures",
        "Boost configuration for highest-converting content posts",
        "Structured A/B testing on ad angles, copy and format hook combos",
        "Direct pixel tracking and performance dashboard syncing"
      ],
      metric: "4.8x",
      metricLabel: "Average Ad ROAS"
    },
    {
      id: "analytics",
      title: "Analytics & Reporting",
      description: "Clear, transparent dashboards showing exactly how your social presence translates into real web visits and brand lift.",
      capabilities: [
        "Interactive monthly performance dashboards",
        "Growth metrics tracking: Reach, Engagement, and Conversions",
        "Attribution modeling tracking from post to pipeline sale",
        "Actionable next-month pivot plans and creative insights"
      ],
      metric: "100%",
      metricLabel: "Transparent Data"
    }
  ];

  // 4. PIPELINE STATE (ambient animation fallback for scroll scrub)
  const pipelineStages = [
    { num: "01", name: "Audit & Strategy", desc: "Platform audit & objective-aligned content roadmap", status: "stage_ready" },
    { num: "02", name: "Content Planning & Calendar", desc: "Curated content calendar with pre-planned hooks", status: "in_review" },
    { num: "03", name: "Creative Production", desc: "Design, copywriting & short-form video assembly", status: "approved" },
    { num: "04", name: "Publish & Engage", desc: "Smart-time publishing & real-time response", status: "published" },
    { num: "05", name: "Analyze & Optimize", desc: "Performance tracking & iterative content pivoting", status: "trending" }
  ];

  // 5. CONTENT MIX EXPLORER STATE & TIMELINE DRAGGER STATE
  const [activeFormat, setActiveFormat] = useState("reels");
  const formats = {
    reels: {
      title: "Reels & Shorts",
      accent: "Highest Algorithmic Reach",
      desc: "Captivating visual pacing, dynamic subtitles, and instant hooks tailored for continuous autoplay attention.",
      stats: [
        { val: "3.2x", label: "Higher average reach" },
        { val: "18.4%", label: "Average engagement" },
        { val: "68%", label: "Viewer retention (first 3s)" }
      ],
      previewTitle: "5 Noida Street Food Spots",
      previewLikes: "3.4K Likes",
      icon: <Video className="w-5 h-5 text-white" />
    },
    carousels: {
      title: "Educational Carousels",
      accent: "Maximum Saves & Shares",
      desc: "Step-by-step visual value cards that encourage swipe-throughs, triggering platform algorithms to double-exposure.",
      stats: [
        { val: "2.1x", label: "More saves than static" },
        { val: "14.2%", label: "Swipe-through rate" },
        { val: "1.8x", label: "Comment section depth" }
      ],
      previewTitle: "How Noida Startups Scale ROI",
      previewLikes: "1.9K Likes",
      icon: <Layers className="w-5 h-5 text-white" />
    },
    static: {
      title: "Static Brand Posts",
      accent: "Editorial Identity Cards",
      desc: "Bold display layouts, high-contrast imagery, and distinct branded templates that solidify premium positioning.",
      stats: [
        { val: "100%", label: "Brand-guideline compliant" },
        { val: "95%", label: "Visual recall rating" },
        { val: "4.5%", label: "Core click-to-profile rate" }
      ],
      previewTitle: "Analytics Clouds is Hiring",
      previewLikes: "852 Likes",
      icon: <Award className="w-5 h-5 text-white" />
    },
    stories: {
      title: "Direct Conversion Stories",
      accent: "Instant Web Clicks & Sales",
      desc: "Raw, behind-the-scenes content, interactive poll stickers, and daily direct-response links that convert interest to DMs.",
      stats: [
        { val: "12.8%", label: "Poll sticker interaction" },
        { val: "6.5%", label: "Direct link-click rate" },
        { val: "3.4x", label: "Inbound sales DM lift" }
      ],
      previewTitle: "Free Social Audit (Link Below)",
      previewLikes: "Poll: Ready to Grow? (94% Yes)",
      icon: <Flame className="w-5 h-5 text-white" />
    }
  };

  // Draggable playhead growth chart state
  const [scrubPosition, setScrubPosition] = useState(50); // percentage 0 - 100
  const dragContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Compute stats based on drag position
  const getScrubStats = (pos: number) => {
    // scale from Month 1 to Month 6
    const fraction = pos / 100;
    const baseMonth = 1;
    const maxMonth = 6;
    const currentMonth = Math.min(maxMonth, Math.max(baseMonth, Math.round(baseMonth + fraction * (maxMonth - baseMonth))));
    
    // curve for follower counts (exponential-ish)
    const baseFollowers = 2400;
    const maxFollowers = 34500;
    const curFollowers = Math.round(baseFollowers + Math.pow(fraction, 1.5) * (maxFollowers - baseFollowers));

    // engagement rate (starts high, dips slightly as audience scales, then stabilizes)
    const baseEng = 8.4;
    const minEng = 5.2;
    const maxEng = 7.8;
    let curEng = 8.4;
    if (fraction < 0.4) {
      curEng = baseEng - (baseEng - minEng) * (fraction / 0.4);
    } else {
      curEng = minEng + (maxEng - minEng) * ((fraction - 0.4) / 0.6);
    }

    // Reach count
    const curReach = Math.round((curFollowers * curEng * 3.8) / 100) * 10;

    return {
      month: currentMonth,
      followers: curFollowers.toLocaleString(),
      engagement: curEng.toFixed(1) + "%",
      reach: curReach.toLocaleString() + "+"
    };
  };

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragMove = (clientX: number) => {
    if (!dragContainerRef.current) return;
    const rect = dragContainerRef.current.getBoundingClientRect();
    const relativeX = clientX - rect.left;
    const percentage = Math.min(100, Math.max(0, (relativeX / rect.width) * 100));
    setScrubPosition(percentage);
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        handleDragMove(e.clientX);
      }
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches[0]) {
        handleDragMove(e.touches[0].clientX);
      }
    };

    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchend", handleMouseUp);
    window.addEventListener("touchmove", handleTouchMove);

    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchend", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [isDragging]);

  const scrubStats = getScrubStats(scrubPosition);

  // 9. FAQ ACCORDION STATE
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const faqs = [
    {
      q: "How many posts do you create per month?",
      a: "Depending on your selected tier (Starter, Growth, or Scale), we publish between 12 to 24+ highly customized content pieces per month. This content is curated across formats, blending educational carousel cards, high-impact static templates, and performance-driven vertical video reels designed specifically for social media engagement."
    },
    {
      q: "Do you handle community replies/DMs?",
      a: "Yes! Active engagement is critical to driving Noida sales. For our Growth and Scale packages, we provide daily community management. This includes replying to public comment threads, answering inbound inquiries, and routing hot purchase leads directly to your internal CRM or sales inbox."
    },
    {
      q: "Can you work with our existing brand guidelines?",
      a: "Absolutely. During our initial onboarding phase, we digest your corporate typography systems, HEX palettes, and brand voice documentations. If you do not have solid brand guidelines yet, our creative studio can construct a polished visual style deck to establish a consistent, professional feed presence."
    },
    {
      q: "Do you run paid social ads too, or only organic?",
      a: "We do both. While organic builds real trust and high-retention audiences, we frequently pairing it with Paid Social Amplification. By boosting your highest-converting organic assets, we extend reach to hyper-targeted lookalike segments, driving scalable Noida leads and maximizing your absolute ROI."
    }
  ];

  return (
    <div className="pt-20 bg-white">
      
      {/* 1. HERO — "The Feed, Alive" */}
      <section className="relative py-16 sm:py-24 bg-white border-b border-gray-100 overflow-hidden">
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Hero Left Info */}
            <div className="lg:col-span-5 space-y-6 text-left">
              <span className="font-mono text-xs font-bold text-[#FE7146] tracking-widest uppercase block">
                // SOCIAL MEDIA MARKETING
              </span>
              <h1 className="font-display font-black text-4xl sm:text-5xl text-[#303360] leading-tight tracking-tight">
                Content That Gets Seen.<br />
                Communities That <span className="text-[#FE7146] relative">
                  Grow.
                  <span className="absolute bottom-1 left-0 w-full h-1 bg-[#FE7146]/30 rounded" />
                </span>
              </h1>
              <p className="text-slate-600 text-base sm:text-lg max-w-2xl font-normal leading-relaxed">
                Followers are vanity. Real, platform-native engagement is demand. We design, produce, and optimize high-converting content pipelines that build loyal audiences and turn attention into Noida pipelines.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <button
                  onClick={onContactClick}
                  className="bg-[#FE7146] hover:bg-[#e0562b] text-white font-black text-sm px-7 py-4 rounded-xl shadow-lg shadow-[#FE7146]/20 transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>Get a Free Social Audit</span>
                  <ArrowRight size={16} />
                </button>
                <a
                  href="#included"
                  className="bg-slate-50 hover:bg-slate-100 border border-gray-200/60 text-[#303360] font-bold text-sm px-7 py-4 rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <span>See Our Content Work</span>
                </a>
              </div>

              {/* Status Indicator */}
              <div className="flex items-center gap-3 pt-6">
                <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-50 border border-gray-200 rounded-lg">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="w-2 h-2 rounded-full bg-emerald-500 absolute" />
                  <span className="font-mono text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1.5">
                    status: trending
                  </span>
                </div>
                <div className="text-xs text-slate-500 font-medium">
                  Currently managing <span className="text-[#303360] font-bold">2.4M+</span> impressions across channels.
                </div>
              </div>
            </div>

            {/* Hero Right: Social Media Marketing Dashboard Image */}
            <div className="lg:col-span-7 flex justify-center w-full">
              <div className="w-full relative">
                <img
                  src="https://res.cloudinary.com/dqjlffxja/image/upload/f_auto,q_auto/v1783790035/Social_Media_Marketing_hyks9d.jpg"
                  alt="Social media marketing engagement dashboard"
                  className="relative w-full h-auto rounded-3xl"
                  loading="eager"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. THE CRAFT STATEMENT (Breather Section) */}
      <section className="py-20 sm:py-28 bg-white border-b border-gray-50 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="font-mono text-[10px] font-black text-[#FE7146] tracking-widest uppercase block mb-4">
            // OUR SOCIAL PHILOSOPHY
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-[#303360] leading-snug">
            "Followers are a vanity metric.<br className="hidden sm:block" />
            <span className="text-[#FE7146]">Community is the ultimate goal.</span>"
          </h2>
          <div className="mt-8 w-16 h-1 bg-[#FE7146] mx-auto rounded" />
          <p className="mt-6 text-gray-500 text-sm max-w-xl mx-auto leading-relaxed">
            We reject the visual noise of hollow likes. We focus entirely on strategic content patterns that trigger comments, profile clicks, bookmarks, and direct messages.
          </p>
        </div>
      </section>

      {/* 3. WHAT'S INCLUDED (Interactive Tab Showcase) */}
      <section id="included" className="py-16 sm:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="font-mono text-xs font-black text-[#FE7146] tracking-widest uppercase block">
              // FLAGSHIP CAPABILITIES
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-[#303360] tracking-tight">
              What's Included in Our Social Suite
            </h2>
            <p className="text-gray-500 text-sm sm:text-base">
              A fully integrated team of copywriters, designers, script-writers, and community managers driving your Noida platform presence.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Vertical Tabs (Full viewport scroll on mobile, tab stack on desktop) */}
            <div className="lg:col-span-4 flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 gap-2.5 shrink-0 scrollbar-none">
              {includesData.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedIncludeTab(tab.id)}
                  className={`px-5 py-4 rounded-xl text-left font-display font-black text-xs sm:text-sm tracking-wide uppercase transition-all duration-200 cursor-pointer whitespace-nowrap lg:whitespace-normal flex items-center justify-between gap-3 shrink-0 ${
                    selectedIncludeTab === tab.id
                      ? "bg-[#303360] text-white shadow-md scale-[1.02] lg:translate-x-2"
                      : "bg-white text-[#303360] hover:bg-white/80 border border-gray-100"
                  }`}
                >
                  <span>{tab.title}</span>
                  <ChevronRight size={16} className={`hidden lg:block transition-transform ${selectedIncludeTab === tab.id ? "translate-x-1" : "opacity-30"}`} />
                </button>
              ))}
            </div>

            {/* Right Display Panel */}
            <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-xl text-left relative overflow-hidden min-h-[380px]">
              
              {/* Highlight background element */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFF1EC] opacity-50 rounded-full blur-3xl pointer-events-none" />

              <AnimatePresence mode="wait">
                {includesData.map((tab) => {
                  if (tab.id !== selectedIncludeTab) return null;
                  return (
                    <motion.div
                      key={tab.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-6"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-5">
                        <div>
                          <span className="font-mono text-[10px] font-black text-[#FE7146] tracking-widest uppercase block mb-1">
                            // SERVICE CORE
                          </span>
                          <h3 className="font-display font-black text-2xl text-[#303360]">
                            {tab.title}
                          </h3>
                        </div>

                        {/* Top Accent Stat Chip */}
                        <div className="bg-[#FFF1EC] border border-[#FE7146]/20 px-4 py-2.5 rounded-2xl text-left shrink-0">
                          <span className="font-mono text-xl font-black text-[#FE7146] block leading-none">
                            {tab.metric}
                          </span>
                          <span className="text-[9px] text-gray-500 font-bold uppercase tracking-wider">
                            {tab.metricLabel}
                          </span>
                        </div>
                      </div>

                      <p className="text-gray-600 text-sm leading-relaxed font-medium">
                        {tab.description}
                      </p>

                      <div className="space-y-3.5 pt-2">
                        <h4 className="font-display font-black text-xs text-[#303360] uppercase tracking-wider">
                          Key Capabilities:
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {tab.capabilities.map((cap, idx) => (
                            <div key={idx} className="flex items-start gap-2.5">
                              <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-100">
                                <Check size={11} className="stroke-[3]" />
                              </div>
                              <span className="text-xs text-slate-500 font-medium leading-tight">
                                {cap}
                              </span>
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

      {/* 4. OUR SOCIAL PROCESS — horizontal/vertical pipeline */}
      <section className="py-16 sm:py-24 bg-white overflow-hidden border-b border-gray-50 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl space-y-4 mb-16">
            <span className="font-mono text-xs font-black text-[#FE7146] tracking-widest uppercase block">
              // PRODUCTION WORKFLOW
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-[#303360] tracking-tight">
              Our Content Engine in Action
            </h2>
            <p className="text-gray-500 text-sm">
              We operate an ongoing, fully accountable production cycle. No missed dates, no rushed assets, no generic templates.
            </p>
          </div>

          {/* Process Grid (Collapsable vertical on mobile) */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-4 relative">
            
            {/* Background progress connector bar for desktop */}
            <div className="hidden md:block absolute top-12 left-1/10 right-1/10 h-0.5 bg-gray-100 -z-10">
              <div className="w-4/5 h-full bg-[#FE7146]" /> {/* Mock scrub state fill */}
            </div>

            {pipelineStages.map((stage, idx) => (
              <div
                key={idx}
                className="bg-slate-50 hover:bg-white rounded-2xl p-5 border border-slate-100 hover:border-orange-100 hover:shadow-xl hover:shadow-orange-500/5 transition-all duration-300 relative group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-black text-gray-300 group-hover:text-[#FE7146] transition-colors">
                      {stage.num}
                    </span>
                    <span className="font-mono text-[9px] font-black text-[#FE7146] bg-orange-100 px-2 py-0.5 rounded-md uppercase">
                      {stage.status}
                    </span>
                  </div>
                  <h4 className="font-display font-black text-sm text-[#303360] group-hover:text-[#FE7146] transition-colors leading-tight mb-2">
                    {stage.name}
                  </h4>
                  <p className="text-[11px] text-gray-500 font-medium leading-relaxed">
                    {stage.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100 mt-4 flex items-center gap-1 text-[10px] text-gray-400 font-bold uppercase">
                  <CheckCircle2 size={11} className="text-[#FE7146]" />
                  <span>SLA Cleared</span>
                </div>
              </div>
            ))}

          </div>

        </div>
      </section>

      {/* 5. CONTENT MIX EXPLORER & DRAGGABLE TIMELINE GROWTH CHART (Signature Section) */}
      <section className="py-16 sm:py-24 bg-slate-50 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="font-mono text-xs font-black text-[#FE7146] tracking-widest uppercase block">
              // WHAT WE CREATE
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-[#303360] tracking-tight">
              Every Format, Done Right.
            </h2>
            <p className="text-gray-500 text-sm">
              We produce custom, platform-native content formats structured specifically to win visual exposure and maximize conversion actions.
            </p>
          </div>

          {/* Interactive Format Switcher Row */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {Object.keys(formats).map((key) => (
              <button
                key={key}
                onClick={() => setActiveFormat(key)}
                className={`px-5 py-3.5 rounded-xl font-display font-black text-xs uppercase tracking-wide transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                  activeFormat === key
                    ? "bg-[#FE7146] text-white shadow-lg shadow-[#FE7146]/20 scale-105"
                    : "bg-white text-[#303360] hover:bg-slate-100 border border-gray-100"
                }`}
              >
                <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 ${activeFormat === key ? "bg-white/20" : "bg-orange-50 text-[#FE7146]"}`}>
                  {React.cloneElement(formats[key as keyof typeof formats].icon, { className: `w-3 h-3 ${activeFormat === key ? "text-white" : "text-[#FE7146]"}` })}
                </div>
                <span>{formats[key as keyof typeof formats].title}</span>
              </button>
            ))}
          </div>

          {/* Format Detail Grid Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-xl mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left format text and metric chips */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <span className="font-mono text-[10px] font-black text-[#FE7146] tracking-widest uppercase block mb-1">
                    {formats[activeFormat as keyof typeof formats].accent}
                  </span>
                  <h3 className="font-display font-black text-2xl text-[#303360]">
                    {formats[activeFormat as keyof typeof formats].title}
                  </h3>
                </div>

                <p className="text-gray-600 text-sm leading-relaxed font-medium">
                  {formats[activeFormat as keyof typeof formats].desc}
                </p>

                {/* Stat Chips list */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
                  {formats[activeFormat as keyof typeof formats].stats.map((st, i) => (
                    <div key={i} className="text-left leading-tight">
                      <span className="font-mono text-2xl sm:text-3xl font-black text-[#FE7146] block">
                        {st.val}
                      </span>
                      <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider block">
                        {st.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right format mock smartphone preview (Stylized matching on-brand colors) */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="w-[240px] bg-[#303360] rounded-[36px] p-3 shadow-xl border-2 border-slate-200 relative overflow-hidden">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-4 bg-slate-200/20 rounded-b-xl z-20" />

                  <div className="bg-slate-900 rounded-[28px] text-white min-h-[340px] p-3 flex flex-col justify-between relative overflow-hidden text-left">
                    
                    {/* Visual format elements */}
                    <div className="flex items-center justify-between z-10">
                      <span className="text-[8px] font-mono font-bold px-2 py-0.5 bg-[#FE7146] rounded-md uppercase">
                        {activeFormat} preview
                      </span>
                      <span className="text-[9px] font-bold text-white/50">Analytics Clouds</span>
                    </div>

                    {/* Styled design layout vector based on format */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />
                    
                    {/* Format graphic placeholder element */}
                    <div className="my-auto text-center py-8 z-10">
                      {activeFormat === "reels" && (
                        <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mx-auto flex items-center justify-center animate-pulse">
                          <Video className="w-6 h-6 text-white" />
                        </div>
                      )}
                      {activeFormat === "carousels" && (
                        <div className="flex gap-2 justify-center">
                          <div className="w-10 h-14 rounded-lg bg-white/10 border border-white/20 rotate-[-8deg] flex items-center justify-center font-bold text-[10px] shrink-0">1</div>
                          <div className="w-10 h-14 rounded-lg bg-[#FE7146] shadow-lg z-10 flex items-center justify-center font-bold text-[10px] shrink-0">2</div>
                          <div className="w-10 h-14 rounded-lg bg-white/10 border border-white/20 rotate-[8deg] flex items-center justify-center font-bold text-[10px] shrink-0">3</div>
                        </div>
                      )}
                      {activeFormat === "static" && (
                        <div className="w-16 h-16 rounded-xl bg-white/10 border border-white/20 mx-auto flex items-center justify-center font-display font-black text-xl text-[#FE7146]">
                          AC
                        </div>
                      )}
                      {activeFormat === "stories" && (
                        <div className="w-20 bg-white/10 border border-white/20 rounded-xl p-2 mx-auto space-y-1.5 shadow-lg">
                          <div className="h-1 bg-[#FE7146] rounded" />
                          <div className="h-4 bg-white/5 rounded flex items-center justify-center text-[7px] font-bold text-[#FE7146]">CURIOUS?</div>
                          <div className="h-2.5 bg-[#FE7146] rounded text-[6px] font-extrabold flex items-center justify-center">SWIPE UP ↗</div>
                        </div>
                      )}
                    </div>

                    <div className="space-y-1.5 z-10 pt-2 border-t border-white/10">
                      <h5 className="font-display font-black text-xs truncate">
                        {formats[activeFormat as keyof typeof formats].previewTitle}
                      </h5>
                      <div className="flex items-center gap-2 text-[9px] text-white/70">
                        <span className="flex items-center gap-0.5"><ThumbsUp size={10} className="text-[#FE7146]" /> {formats[activeFormat as keyof typeof formats].previewLikes}</span>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* SIGNATURE ELEMENT: Draggable growth timeline chart */}
          <div className="bg-[#303360] rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden border border-white/5 shadow-2xl">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#FE7146] opacity-5 rounded-full blur-[100px] pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Dragger Left: Live readout based on position */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <span className="font-mono text-xs font-black text-[#FE7146] tracking-widest uppercase block mb-1">
                    // PROVEN GROWTH CURVE
                  </span>
                  <h3 className="font-display font-black text-2xl sm:text-3xl leading-tight">
                    Scrub to Witness<br />
                    Audience Escalation
                  </h3>
                  <p className="text-gray-300 text-xs sm:text-sm mt-3 font-normal">
                    Drag the playhead handle on the timeline to inspect the actual projected growth path of Noida clients partnering with Analytics Clouds over 6 months.
                  </p>
                </div>

                {/* Scaled Readouts */}
                <div className="grid grid-cols-2 gap-4 bg-[#23254A] p-4 rounded-2xl border border-white/5 shadow-inner">
                  <div className="text-left">
                    <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider mb-1">PROJECTED TIMELINE</span>
                    <span className="font-display font-black text-xl text-white">Month {scrubStats.month}</span>
                  </div>
                  <div className="text-left">
                    <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider mb-1">FOLLOWER REACH</span>
                    <span className="font-mono text-xl font-black text-[#FE7146]">{scrubStats.followers}</span>
                  </div>
                  <div className="text-left border-t border-white/5 pt-3 mt-1">
                    <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider mb-1">ENGAGEMENT RATE</span>
                    <span className="font-mono text-xl font-black text-emerald-400">{scrubStats.engagement}</span>
                  </div>
                  <div className="text-left border-t border-white/5 pt-3 mt-1">
                    <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider mb-1">MONTHLY IMPRESSIONS</span>
                    <span className="font-mono text-xl font-black text-[#FE7146]">{scrubStats.reach}</span>
                  </div>
                </div>
              </div>

              {/* Dragger Right: Draggable interface track */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Visual Chart Graphic Area */}
                <div className="bg-[#1C1D33] rounded-2xl p-4 h-48 border border-white/5 relative overflow-hidden flex flex-col justify-between shadow-inner select-none">
                  <div className="flex justify-between text-[9px] font-mono text-gray-500">
                    <span>MONTH 1 (START)</span>
                    <span>MONTH 3</span>
                    <span>MONTH 6 (SCALE)</span>
                  </div>

                  {/* Absolute growth path line based on current position */}
                  <div className="absolute inset-x-0 bottom-12 h-24 pointer-events-none">
                    <svg viewBox="0 0 500 100" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                      <path
                        d="M0,90 Q150,85 250,55 T500,5 L500,100 L0,100 Z"
                        fill="#FE7146"
                        fillOpacity="0.04"
                      />
                      <path
                        d="M0,90 Q150,85 250,55 T500,5"
                        fill="none"
                        stroke="#FE7146"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                      
                      {/* Interactive floating point */}
                      <circle
                        cx={(scrubPosition / 100) * 500}
                        cy={90 - Math.pow(scrubPosition / 100, 1.5) * 85}
                        r="6"
                        fill="#FE7146"
                        className="animate-pulse"
                      />
                      <circle
                        cx={(scrubPosition / 100) * 500}
                        cy={90 - Math.pow(scrubPosition / 100, 1.5) * 85}
                        r="12"
                        fill="none"
                        stroke="#FE7146"
                        strokeWidth="2"
                        strokeOpacity="0.4"
                      />
                    </svg>
                  </div>

                  {/* Draggable scrub line marker over the chart */}
                  <div
                    className="absolute top-0 bottom-10 w-0.5 bg-gray-500/30 border-dashed border-l border-white/20 pointer-events-none"
                    style={{ left: `${scrubPosition}%` }}
                  />

                  <div className="text-right z-10">
                    <span className="inline-block bg-[#FE7146] text-white text-[9px] font-mono font-bold px-2 py-0.5 rounded-md">
                      Interactive Playhead
                    </span>
                  </div>
                </div>

                {/* Timeline Interactive track handle slider */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs text-gray-300 font-medium">
                    <span>Drag handle to scrub:</span>
                    <span className="font-mono text-[#FE7146] font-bold">Position: {Math.round(scrubPosition)}%</span>
                  </div>

                  {/* Drag Slider Track */}
                  <div
                    ref={dragContainerRef}
                    className="h-4 bg-[#23254A] rounded-full border border-white/10 relative cursor-pointer flex items-center select-none"
                    onMouseDown={(e) => {
                      handleDragMove(e.clientX);
                      handleDragStart();
                    }}
                    onTouchStart={(e) => {
                      if (e.touches[0]) {
                        handleDragMove(e.touches[0].clientX);
                        handleDragStart();
                      }
                    }}
                  >
                    {/* Fill */}
                    <div
                      className="absolute left-0 top-0 bottom-0 bg-[#FE7146]/20 rounded-l-full"
                      style={{ width: `${scrubPosition}%` }}
                    />

                    {/* Handle */}
                    <div
                      className="absolute w-8 h-8 rounded-full bg-[#FE7146] hover:bg-[#e0562b] shadow-lg border-2 border-white cursor-grab active:cursor-grabbing flex items-center justify-center transition-transform hover:scale-110 active:scale-95 z-10"
                      style={{ left: `calc(${scrubPosition}% - 16px)` }}
                      onMouseDown={(e) => {
                        e.stopPropagation();
                        handleDragStart();
                      }}
                      onTouchStart={(e) => {
                        e.stopPropagation();
                        handleDragStart();
                      }}
                    >
                      <div className="w-1.5 h-3 flex justify-between gap-0.5">
                        <div className="w-0.5 h-full bg-white/60 rounded-full" />
                        <div className="w-0.5 h-full bg-white/60 rounded-full" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-[10px] text-gray-400 font-semibold text-center uppercase tracking-wider pt-2">
                    ⚡ Drag timeline left/right to witness exponential scaling
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 6. PLATFORM COVERAGE SNAPSHOT */}
      <section className="py-12 bg-white text-center border-b border-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="font-mono text-[9px] font-black text-[#FE7146] tracking-widest uppercase block mb-6">
            // PLATFORM COVERAGE
          </span>
          
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { name: "Instagram Strategy", bestFor: "Reels & Visual Storytelling", icon: <Instagram size={14} className="text-[#E4405F]" /> },
              { name: "LinkedIn Leadership", bestFor: "B2B & Thought Content", icon: <Linkedin size={14} className="text-[#0A66C2]" /> },
              { name: "Facebook Reach", bestFor: "Community & Local Demographics", icon: <Facebook size={14} className="text-[#1877F2]" /> },
              { name: "X (Twitter) Buzz", bestFor: "Real-time trends & Industry threads", icon: <Twitter size={14} className="text-[#1DA1F2]" /> },
              { name: "YouTube Shorts", bestFor: "High-exposure vertical cuts", icon: <Video size={14} className="text-[#FF0000]" /> }
            ].map((p, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2.5 px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl"
              >
                <div className="w-6 h-6 rounded-lg bg-white flex items-center justify-center shadow-sm">
                  {p.icon}
                </div>
                <div className="text-left leading-none">
                  <span className="text-xs font-black text-[#303360] block mb-0.5">{p.name}</span>
                  <span className="text-[9px] text-gray-400 font-semibold">{p.bestFor}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. WHY CHOOSE US FOR SOCIAL MEDIA */}
      <section className="py-16 sm:py-24 bg-[#303360] text-white overflow-hidden text-left relative">
        <div className="absolute inset-0 bg-[radial-gradient(#FE7146_1px,transparent_1px)] [background-size:16px_16px] opacity-5 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Differentiators */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-4">
                <span className="font-mono text-xs font-black text-[#FE7146] tracking-widest uppercase block">
                  // THE Noida ADVANTAGE
                </span>
                <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight">
                  Why Noida Brands Scale With Analytics Clouds
                </h2>
                <p className="text-gray-300 text-sm max-w-xl">
                  We bridge creative intuition with analytical execution. We produce content that honors brand standards while consistently hitting organic reach metrics.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  {
                    title: "Platform-Native Content Strategy",
                    desc: "We design specifically for algorithms—prioritizing hooks, swipe-triggers, and share indicators over static grids.",
                    icon: <Rocket className="text-[#FE7146] w-5 h-5" />
                  },
                  {
                    title: "In-House Noida Creative Team",
                    desc: "Full graphic design studio, copywriters, and script writers producing custom branded assets internally.",
                    icon: <Award className="text-[#FE7146] w-5 h-5" />
                  },
                  {
                    title: "Data-Backed Optimization",
                    desc: "Weekly audits tracing impressions directly to link visits and purchase intentions on your CRM.",
                    icon: <TrendingUp className="text-[#FE7146] w-5 h-5" />
                  },
                  {
                    title: "Fast Turnaround on Trends",
                    desc: "Continuous social listening that inserts your brand into trending audios and cultural conversations in real time.",
                    icon: <Zap className="text-[#FE7146] w-5 h-5" />
                  }
                ].map((dif, idx) => (
                  <div key={idx} className="space-y-2 text-left group">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-[#FE7146] group-hover:border-[#FE7146] transition-colors duration-200">
                        {React.cloneElement(dif.icon, { className: "w-4.5 h-4.5 text-[#FE7146] group-hover:text-white transition-colors" })}
                      </div>
                      <h4 className="font-display font-black text-sm text-white group-hover:text-[#FE7146] transition-colors">
                        {dif.title}
                      </h4>
                    </div>
                    <p className="text-xs text-gray-300 font-medium leading-relaxed pl-11">
                      {dif.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Stat Grid Cards */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              {[
                { count: 184, suffix: "%", label: "Avg Engagement Boost", icon: <ThumbsUp size={16} className="text-[#FE7146]" /> },
                { count: 3.8, suffix: "x", decimals: 1, label: "Follower Multipier Rate", icon: <Users size={16} className="text-indigo-400" /> },
                { count: 480, suffix: "+", label: "Custom Content Monthly", icon: <Calendar size={16} className="text-emerald-400" /> },
                { count: 98, suffix: "%", label: "Client Partner Retention", icon: <Heart size={16} className="text-rose-400" /> }
              ].map((st, i) => (
                <div
                  key={i}
                  className="bg-[#23254A] border border-white/5 p-5 rounded-2xl shadow-lg relative group overflow-hidden hover:border-[#FE7146]/30 transition-all duration-300"
                >
                  <div className="absolute top-0 right-0 w-16 h-16 bg-[#FE7146] opacity-0 group-hover:opacity-10 rounded-full blur-xl transition-opacity duration-300" />
                  
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center mb-4">
                    {st.icon}
                  </div>

                  <div className="space-y-1">
                    <CountUp end={st.count} suffix={st.suffix} decimals={st.decimals} />
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mt-1">
                      {st.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* 8. PRICING / PACKAGES */}
      <section className="py-16 sm:py-24 bg-white text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="font-mono text-xs font-black text-[#FE7146] tracking-widest uppercase block">
              // NOIDA CAMPAIGN BRACKETS
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-[#303360] tracking-tight">
              Honest, Accountable Social Packages
            </h2>
            <p className="text-gray-500 text-sm">
              Tailored scopes structured specifically around visual performance metrics and real conversion objectives.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            
            {/* Starter package */}
            <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6 flex flex-col justify-between hover:shadow-xl transition-all duration-300 relative">
              <div className="space-y-6">
                <div>
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">STARTER</span>
                  <h4 className="font-display font-black text-2xl text-[#303360] mt-1">Organic Presence</h4>
                  <p className="text-xs text-gray-500 font-medium mt-1">Ideal for early-stage Noida ventures looking to establish consistent visibility.</p>
                </div>

                <div className="border-t border-b border-gray-100 py-4">
                  <span className="text-xs text-gray-400 block font-mono">INVESTMENT RANGE</span>
                  <span className="font-display font-black text-2xl sm:text-3xl text-[#303360]">Custom Quote</span>
                  <span className="text-[10px] text-gray-400 block font-bold mt-1">BASED ON SCOPE & CHANNEL DEPTH</span>
                </div>

                <div className="space-y-3">
                  <span className="text-[10px] text-[#FE7146] font-mono font-black uppercase tracking-wider block">WHAT'S INCLUDED:</span>
                  {[
                    "12 Custom Branded Posts/Monthly",
                    "Custom Aesthetic Style family",
                    "Platform optimization (Bio, CTA, visual alignment)",
                    "Captivating copywriting hooks & hashtag maps",
                    "Monthly performance PDF dashboard report"
                  ].map((feat, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs">
                      <CheckCircle2 size={13} className="text-[#FE7146] shrink-0 mt-0.5" />
                      <span className="text-slate-500 font-medium">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={onContactClick}
                className="mt-8 w-full border border-[#303360]/20 hover:border-[#FE7146] hover:bg-[#FE7146] hover:text-white text-[#303360] font-black text-xs py-3.5 rounded-xl transition-all uppercase tracking-wider cursor-pointer"
              >
                Get Started
              </button>
            </div>

            {/* Growth package */}
            <div className="bg-white border-2 border-[#FE7146] rounded-3xl p-6 flex flex-col justify-between shadow-xl shadow-orange-500/5 relative hover:scale-[1.01] transition-all duration-300">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#FE7146] text-white px-3 py-1 rounded-full text-[9px] font-mono font-black uppercase tracking-widest animate-pulse">
                Most Popular
              </div>

              <div className="space-y-6">
                <div>
                  <span className="text-[10px] text-[#FE7146] font-mono font-bold uppercase tracking-widest">GROWTH</span>
                  <h4 className="font-display font-black text-2xl text-[#303360] mt-1">Platform Accelerator</h4>
                  <p className="text-xs text-gray-500 font-medium mt-1">Our flagship framework for scaling active social communities & organic Noida lead channels.</p>
                </div>

                <div className="border-t border-b border-gray-100 py-4">
                  <span className="text-xs text-gray-400 block font-mono">INVESTMENT RANGE</span>
                  <span className="font-display font-black text-2xl sm:text-3xl text-[#303360]">Custom Quote</span>
                  <span className="text-[10px] text-gray-400 block font-bold mt-1">DELIVERING COMPREHENSIVE SCALE</span>
                </div>

                <div className="space-y-3">
                  <span className="text-[10px] text-[#FE7146] font-mono font-black uppercase tracking-wider block">WHAT'S INCLUDED:</span>
                  {[
                    "18 Mixed Posts (Static + Carousels)",
                    "4 Custom Edited Video Reels / Monthly",
                    "Daily community comment & DM reply routes",
                    "Trending audio research & storyboard scripts",
                    "Vetted Micro-influencer sourcing",
                    "Monthly live video syncing review & analytics"
                  ].map((feat, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs">
                      <CheckCircle2 size={13} className="text-[#FE7146] shrink-0 mt-0.5" />
                      <span className="text-slate-500 font-bold text-slate-600">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={onContactClick}
                className="mt-8 w-full bg-[#FE7146] hover:bg-[#e0562b] text-white font-black text-xs py-3.5 rounded-xl shadow-lg shadow-[#FE7146]/20 transition-all uppercase tracking-wider cursor-pointer"
              >
                Inquire Package
              </button>
            </div>

            {/* Scale package */}
            <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6 flex flex-col justify-between hover:shadow-xl transition-all duration-300 relative">
              <div className="space-y-6">
                <div>
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">SCALE</span>
                  <h4 className="font-display font-black text-2xl text-[#303360] mt-1">Dominance Suite</h4>
                  <p className="text-xs text-gray-500 font-medium mt-1">Multi-channel dominance with extensive Reels, short video scripting, and paid boosting.</p>
                </div>

                <div className="border-t border-b border-gray-100 py-4">
                  <span className="text-xs text-gray-400 block font-mono">INVESTMENT RANGE</span>
                  <span className="font-display font-black text-2xl sm:text-3xl text-[#303360]">Custom Quote</span>
                  <span className="text-[10px] text-gray-400 block font-bold mt-1">FOR ESTABLISHED BRANDS</span>
                </div>

                <div className="space-y-3">
                  <span className="text-[10px] text-[#FE7146] font-mono font-black uppercase tracking-wider block">WHAT'S INCLUDED:</span>
                  {[
                    "24 Mixed Grid Posts / Monthly",
                    "8 Curated Video Reels & Subtitle cuts",
                    "Full scale community management & outbound chat",
                    "Paid Social Amplification & custom pixels setup",
                    "Influencer contracts & legal management",
                    "Custom ROI-attribution dashboard & client lead routing"
                  ].map((feat, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs">
                      <CheckCircle2 size={13} className="text-[#FE7146] shrink-0 mt-0.5" />
                      <span className="text-slate-500 font-medium">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={onContactClick}
                className="mt-8 w-full border border-[#303360]/20 hover:border-[#FE7146] hover:bg-[#FE7146] hover:text-white text-[#303360] font-black text-xs py-3.5 rounded-xl transition-all uppercase tracking-wider cursor-pointer"
              >
                Contact Sales
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* 9. FAQ (Accordion Component) */}
      <section className="py-16 sm:py-24 bg-slate-50 border-t border-b border-gray-100 text-left">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-4 mb-16">
            <span className="font-mono text-xs font-black text-[#FE7146] tracking-widest uppercase block">
              // INSIGHT DECK
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-[#303360] tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-500 text-sm">
              Answers regarding our strategy frameworks, onboarding SLAs, and communication loops.
            </p>
          </div>

          {/* Accordion container */}
          <div className="space-y-3 bg-white p-4 sm:p-6 rounded-3xl border border-gray-100 shadow-xl">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="border-b border-gray-100 last-of-type:border-b-0 pb-4 last-of-type:pb-0 pt-4 first-of-type:pt-0"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full flex justify-between items-center text-left py-2 font-display font-black text-sm sm:text-base text-[#303360] hover:text-[#FE7146] transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <div className="w-7 h-7 rounded-full bg-slate-50 flex items-center justify-center text-gray-400 group transition-all duration-200">
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-200 ${isOpen ? "rotate-180 text-[#FE7146]" : ""}`}
                      />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <p className="text-xs sm:text-sm text-gray-500 font-medium leading-relaxed pt-3 pr-4 sm:pr-8">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 10. CTA BANNER (Shared Orange Band style, adapted headline) */}
      <CtaBanner onContactClick={onContactClick} />

    </div>
  );
}
