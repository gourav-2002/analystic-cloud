/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  TrendingUp,
  ArrowRight,
  Check,
  ChevronDown,
  ChevronRight,
  Sparkles,
  Award,
  Users,
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
  HelpCircle,
  TrendingDown,
  LineChart,
  Activity,
  Layers,
  Sparkle,
  Gauge,
  Workflow
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

// Interfaces for What's Included Tabs
interface PerformanceTab {
  id: string;
  title: string;
  description: string;
  capabilities: string[];
  metric: string;
  metricLabel: string;
  channelTag: string;
}

// 1. HERO ANIMATED FUNNEL COMPONENT
function AnimatedFunnel() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [counters, setCounters] = useState({
    impressions: 1245042,
    clicks: 142518,
    leads: 8244,
    conversions: 1722,
    roas: 1.0,
  });

  // ROAS count-up triggers on load
  useEffect(() => {
    let startTimestamp: number | null = null;
    const duration = 1500;
    const targetRoas = 4.8;
    
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCounters((prev) => ({
        ...prev,
        roas: parseFloat((progress * targetRoas).toFixed(1)),
      }));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCounters((prev) => ({ ...prev, roas: targetRoas }));
      }
    };
    window.requestAnimationFrame(step);
  }, []);

  // Ambient counter increments
  useEffect(() => {
    const timer = setInterval(() => {
      setCounters((prev) => {
        const impAdd = Math.floor(Math.random() * 5) + 1;
        const clkAdd = Math.random() > 0.4 ? 1 : 0;
        const ldAdd = Math.random() > 0.85 ? 1 : 0;
        const convAdd = Math.random() > 0.96 ? 1 : 0;
        return {
          ...prev,
          impressions: prev.impressions + impAdd,
          clicks: prev.clicks + clkAdd,
          leads: prev.leads + ldAdd,
          conversions: prev.conversions + convAdd,
        };
      });
    }, 1200);

    return () => clearInterval(timer);
  }, []);

  // HTML5 Canvas for particles flow
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    // Particle representation
    interface Particle {
      x: number;
      y: number;
      size: number;
      speed: number;
      color: string;
      alpha: number;
      channel: "google" | "meta" | "display";
      targetX: number;
      stage: number; // 0: input to impressions, 1: impressions to clicks, 2: clicks to leads, 3: leads to conversions, 4: conversion burst
      progress: number;
    }

    const particles: Particle[] = [];
    const colors = {
      google: "#FE7146", // Primary Accent
      meta: "#303360",   // Deep Navy / Indigos
      display: "#8A90E5", // Light Indigo/Purple
    };

    // Define coordinate stages of the funnel relative to width and height
    const getStagesY = () => {
      return {
        sources: height * 0.08,
        impressions: height * 0.28,
        clicks: height * 0.50,
        leads: height * 0.72,
        conversions: height * 0.90,
      };
    };

    const getStagesWidth = () => {
      return {
        sources: width * 0.8,
        impressions: width * 0.7,
        clicks: width * 0.46,
        leads: width * 0.28,
        conversions: width * 0.15,
      };
    };

    // Generate a particle
    const spawnParticle = () => {
      const channels: ("google" | "meta" | "display")[] = ["google", "meta", "display"];
      const channel = channels[Math.floor(Math.random() * channels.length)];
      
      const stagesY = getStagesY();
      const stagesW = getStagesWidth();

      // Source positions
      let spawnX = width / 2;
      if (channel === "google") spawnX = width * 0.22;
      if (channel === "display") spawnX = width * 0.78;

      particles.push({
        x: spawnX,
        y: stagesY.sources,
        size: Math.random() * 2.2 + 2,
        speed: Math.random() * 0.006 + 0.005,
        color: colors[channel],
        alpha: 0.9,
        channel,
        targetX: width / 2 + (Math.random() - 0.5) * (stagesW.impressions * 0.8),
        stage: 0,
        progress: 0,
      });
    };

    // Animation Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const stagesY = getStagesY();
      const stagesW = getStagesWidth();

      // Draw standard glowing funnel guidelines (subtle background)
      ctx.strokeStyle = "rgba(48, 51, 96, 0.08)";
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);

      // Left boundary of funnel
      ctx.beginPath();
      ctx.moveTo(width * 0.15, stagesY.sources);
      ctx.bezierCurveTo(
        width * 0.15, stagesY.impressions,
        width * 0.28, stagesY.clicks,
        width * 0.36, stagesY.leads
      );
      ctx.lineTo(width * 0.42, stagesY.conversions);
      ctx.stroke();

      // Right boundary of funnel
      ctx.beginPath();
      ctx.moveTo(width * 0.85, stagesY.sources);
      ctx.bezierCurveTo(
        width * 0.85, stagesY.impressions,
        width * 0.72, stagesY.clicks,
        width * 0.64, stagesY.leads
      );
      ctx.lineTo(width * 0.58, stagesY.conversions);
      ctx.stroke();

      ctx.setLineDash([]); // Reset line dash

      // Spawn particles
      if (Math.random() < 0.12 && particles.length < 90) {
        spawnParticle();
      }

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.progress += p.speed;

        if (p.progress >= 1) {
          p.progress = 0;
          p.stage += 1;

          if (p.stage > 3) {
            // Reached conversion! Remove particle
            particles.splice(i, 1);
            continue;
          }

          // Calculate new targets
          const nextY = p.stage === 1 ? stagesY.clicks : p.stage === 2 ? stagesY.leads : stagesY.conversions;
          const nextW = p.stage === 1 ? stagesW.clicks : p.stage === 2 ? stagesW.leads : stagesW.conversions;
          p.targetX = width / 2 + (Math.random() - 0.5) * (nextW * 0.7);
        }

        // Calculate position based on Bezier interpolation or linear step
        let startY = stagesY.sources;
        let endY = stagesY.impressions;
        let startX = width / 2;
        if (p.channel === "google") startX = width * 0.22;
        if (p.channel === "display") startX = width * 0.78;

        if (p.stage === 1) {
          startY = stagesY.impressions;
          endY = stagesY.clicks;
          startX = p.x; // smoothly continue
        } else if (p.stage === 2) {
          startY = stagesY.clicks;
          endY = stagesY.leads;
          startX = p.x;
        } else if (p.stage === 3) {
          startY = stagesY.leads;
          endY = stagesY.conversions;
          startX = p.x;
        }

        // Interpolate coordinates
        const currentY = startY + (endY - startY) * p.progress;
        const currentX = startX + (p.targetX - startX) * p.progress;

        // Draw particle
        ctx.beginPath();
        ctx.arc(currentX, currentY, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 6;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
        ctx.globalAlpha = 1.0;
        ctx.shadowBlur = 0; // Reset shadow

        // Keep track of coordinates to feed next stage calculations smoothly
        p.x = currentX;
        p.y = currentY;
      }

      // Draw Funnel Stages Horizontally
      const drawStageLabel = (y: number, w: number, title: string, count: string, color: string) => {
        // Horizontal bar representing the stage
        ctx.fillStyle = "rgba(48, 51, 96, 0.03)";
        ctx.fillRect(width / 2 - w / 2, y - 10, w, 20);

        // Stage dividing line
        ctx.strokeStyle = "rgba(48, 51, 96, 0.15)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(width / 2 - w / 2, y);
        ctx.lineTo(width / 2 + w / 2, y);
        ctx.stroke();
      };

      drawStageLabel(stagesY.impressions, stagesW.impressions, "IMPRESSIONS", "", "#303360");
      drawStageLabel(stagesY.clicks, stagesW.clicks, "CLICKS", "", "#303360");
      drawStageLabel(stagesY.leads, stagesW.leads, "LEADS", "", "#303360");
      drawStageLabel(stagesY.conversions, stagesW.conversions, "CONVERSIONS", "", "#FE7146");

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-[450px] sm:h-[500px] bg-slate-50 border border-slate-100 rounded-3xl p-6 shadow-xl relative overflow-hidden flex flex-col justify-between">
      
      {/* Top Channels Source Nodes */}
      <div className="flex justify-between items-center relative z-10 px-4">
        {/* Google Node */}
        <div className="flex flex-col items-center gap-1.5 bg-white/90 backdrop-blur border border-gray-100 px-3 py-1.5 rounded-2xl shadow-sm">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FE7146] animate-pulse"></span>
          <span className="font-mono text-[9px] font-bold text-slate-500 uppercase tracking-wider">Google</span>
        </div>

        {/* Meta Node */}
        <div className="flex flex-col items-center gap-1.5 bg-white/90 backdrop-blur border border-gray-100 px-3 py-1.5 rounded-2xl shadow-sm">
          <span className="w-2.5 h-2.5 rounded-full bg-[#303360] animate-pulse"></span>
          <span className="font-mono text-[9px] font-bold text-slate-500 uppercase tracking-wider">Meta / Paid</span>
        </div>

        {/* Display Node */}
        <div className="flex flex-col items-center gap-1.5 bg-white/90 backdrop-blur border border-gray-100 px-3 py-1.5 rounded-2xl shadow-sm">
          <span className="w-2.5 h-2.5 rounded-full bg-[#8A90E5] animate-pulse"></span>
          <span className="font-mono text-[9px] font-bold text-slate-500 uppercase tracking-wider">Display</span>
        </div>
      </div>

      {/* Main interactive canvas rendering particles */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Floating Stage Counters (Overlaid precisely next to the funnel) */}
      <div className="absolute inset-0 flex flex-col justify-between py-10 pointer-events-none z-10 select-none">
        <div className="h-6"></div> {/* Offset source */}
        
        {/* Impressions overlay */}
        <div className="px-6 flex justify-between items-center w-full">
          <div className="bg-white/95 backdrop-blur shadow-sm border border-gray-100/80 px-2.5 py-1 rounded-xl flex items-center gap-2 pointer-events-auto">
            <span className="text-[10px] font-mono font-black text-slate-400">01</span>
            <span className="text-[10px] font-mono font-bold text-[#303360] uppercase tracking-wider">Impressions:</span>
            <span className="text-xs font-mono font-black text-slate-700">
              {counters.impressions.toLocaleString()}
            </span>
          </div>
          <span className="text-[9px] font-mono text-slate-300 font-bold tracking-widest hidden sm:inline">STAGE_VOLUME_MAX</span>
        </div>

        {/* Clicks overlay */}
        <div className="px-6 flex justify-between items-center w-full">
          <span className="text-[9px] font-mono text-slate-300 font-bold tracking-widest hidden sm:inline">CTR: 11.4%</span>
          <div className="bg-white/95 backdrop-blur shadow-sm border border-gray-100/80 px-2.5 py-1 rounded-xl flex items-center gap-2 pointer-events-auto">
            <span className="text-[10px] font-mono font-black text-slate-400">02</span>
            <span className="text-[10px] font-mono font-bold text-[#303360] uppercase tracking-wider">Clicks:</span>
            <span className="text-xs font-mono font-black text-slate-700">
              {counters.clicks.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Leads overlay */}
        <div className="px-6 flex justify-between items-center w-full">
          <div className="bg-white/95 backdrop-blur shadow-sm border border-gray-100/80 px-2.5 py-1 rounded-xl flex items-center gap-2 pointer-events-auto">
            <span className="text-[10px] font-mono font-black text-slate-400">03</span>
            <span className="text-[10px] font-mono font-bold text-[#303360] uppercase tracking-wider">Leads:</span>
            <span className="text-xs font-mono font-black text-slate-700">
              {counters.leads.toLocaleString()}
            </span>
          </div>
          <span className="text-[9px] font-mono text-slate-300 font-bold tracking-widest hidden sm:inline">CPL: ₹310</span>
        </div>

        {/* Conversions Spout and ROAS counter */}
        <div className="px-6 flex flex-col items-center gap-1.5 w-full">
          <div className="bg-white/95 backdrop-blur shadow-md border border-[#FE7146]/20 px-3 py-1.5 rounded-xl flex items-center gap-2 pointer-events-auto">
            <Sparkles className="w-3.5 h-3.5 text-[#FE7146] animate-spin" />
            <span className="text-[10px] font-mono font-bold text-[#FE7146] uppercase tracking-wider">Conversions:</span>
            <span className="text-xs font-mono font-black text-[#FE7146]">
              {counters.conversions.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Spout Bottom ROAS Indicator Box */}
      <div className="bg-[#303360] text-white rounded-2xl p-4 flex justify-between items-center relative z-10 border border-white/5 shadow-lg mt-auto">
        <div className="text-left">
          <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest block leading-none">
            TOTAL_FUNNEL_MULTIPLIER
          </span>
          <span className="text-sm font-display font-extrabold text-[#F5F5FA] mt-1 block">
            Combined ROI Metric
          </span>
        </div>
        <div className="flex flex-col items-end">
          <span className="font-mono font-black text-2xl text-[#FE7146] tracking-tight leading-none">
            {counters.roas}x
          </span>
          <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wider mt-1 block">
            Average ROAS
          </span>
        </div>
      </div>

    </div>
  );
}

export function PerformanceMarketing({ onContactClick }: { onContactClick: () => void }) {
  // Motion setting for reduced motion accessibility
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  // 3. What's Included vertical tabs state
  const [activeTab, setActiveTab] = useState("strategy");
  const performanceTabs: PerformanceTab[] = [
    {
      id: "strategy",
      title: "Campaign Strategy & Planning",
      description: "We align channels to match user-intent patterns. We structure exact budgets, negative keyword filters, and micro-conversions around real-time product margin metrics.",
      capabilities: [
        "Interactive Competitor Spend Diagnostics",
        "Coordinated Multi-Channel Budget Allocations",
        "Comprehensive LTV-to-CAC Target Benchmarks",
        "Alpha-Beta Audience Segment Architecture"
      ],
      metric: "99.4%",
      metricLabel: "Audit Discovery Accuracy",
      channelTag: "strategic_discovery"
    },
    {
      id: "search",
      title: "Paid Search Management (Google)",
      description: "High-intent search query capturing. We configure Single-Theme Ad Groups (STAGs) and custom visual extensions to maximize Quality Score and reduce actual CPC bids.",
      capabilities: [
        "Surgical Exact-Match Keyword Strategy",
        "Continuous Quality Score Boosting Loops",
        "Negative Keyword Shield Exclusions",
        "Automated bidding caps & daypart pacing"
      ],
      metric: "-28%",
      metricLabel: "Average CPA Reduction",
      channelTag: "high_intent_search"
    },
    {
      id: "social",
      title: "Paid Social Management (Meta/LinkedIn)",
      description: "Thumb-stopping creative assets synced with robust, demographic targeting. We scale conversions by constantly rotating hooks and scaling post engagements.",
      capabilities: [
        "Broad Intent Lookalike Conversions",
        "Dynamic Creative Asset Optimizations",
        "Instant Form Lead Funnels & Syncs",
        "Professional B2B Account Targeting Maps"
      ],
      metric: "3.8x",
      metricLabel: "Meta Campaign ROAS",
      channelTag: "social_segmentation"
    },
    {
      id: "display",
      title: "Display & Programmatic",
      description: "Omnipresent display and YouTube ad coverage. We recapture bouncing prospects using targeted remarketing grids to keep your brand top-of-mind.",
      capabilities: [
        "Remarketing Audiences Custom Pools",
        "Premium Video Pre-Roll Storyboards",
        "Cross-Domain Placement Exclusions",
        "Dynamic Contextual Interest Buying"
      ],
      metric: "+150%",
      metricLabel: "Attributed Conversion Lift",
      channelTag: "brand_omnipresence"
    },
    {
      id: "cro",
      title: "Conversion Rate Optimization (CRO)",
      description: "Ad spend is useless without a converting destination. We craft lightweight, mobile-first, distraction-free landing pages that increase conversion rate percentages.",
      capabilities: [
        "A/B Split Landing Page Copy Tests",
        "Heatmap & Form Friction Audits",
        "Instant Loading Pages Deployment",
        "Simplified Checkout Flow Enhancements"
      ],
      metric: "+42%",
      metricLabel: "Form Submission Boost",
      channelTag: "landing_page_purity"
    },
    {
      id: "bid",
      title: "Budget & Bid Management",
      description: "We direct capital dynamically. Bids shift continuously from low-performing placements to high-ROI channels based on actual lead cost efficiency indexes.",
      capabilities: [
        "Intelligent Portfolio Bid Caps Setup",
        "Pacing Guards to Eliminate Bid Spikes",
        "Automated Cross-Channel Pacing Scrapers",
        "Manual Bid Override Auditing Blocks"
      ],
      metric: "24/7",
      metricLabel: "Algorithmic Tracking",
      channelTag: "bid_arbitrage"
    },
    {
      id: "reporting",
      title: "Performance Reporting",
      description: "No vanity metrics. You get real-time dashboards mapping ad expenditure directly to closed deals, customer acquisition costs, and actual net revenue margins.",
      capabilities: [
        "Custom Client Looker Studio Dashboards",
        "Direct CRMs Offline Conversion Imports",
        "Bi-weekly Strategy Review Callouts",
        "Complete Revenue Attribution Integrity"
      ],
      metric: "100%",
      metricLabel: "Attribution Transparency",
      channelTag: "attribution_control"
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
      title: "Audit & Goal Setting",
      desc: "Detailed historical data run. We locate spend leaks, negative match gaps, and establish hard LTV-to-CAC margin rules.",
      status: "lead_validation"
    },
    {
      num: "02",
      title: "Channel & Budget Strategy",
      desc: "Capital allocation planning. We split budget tiers across high-intent search, social qualifiers, and display remarketing.",
      status: "allocation_matrix"
    },
    {
      num: "03",
      title: "Campaign Launch",
      desc: "Pixel integration, custom UTM tag tracking setups, ad copywriting deployment, and fast-loading page syncs.",
      status: "pixel_integration"
    },
    {
      num: "04",
      title: "Continuous Testing",
      desc: "Daily query scrapings, visual creative iterations, bid modifier optimizations, and page split-testing.",
      status: "pacing_optimization"
    },
    {
      num: "05",
      title: "Scale What Works",
      desc: "Aggressive portfolio budget shifting. We scale high-ROAS segments and duplicate winning landing pages to expand reach.",
      status: "scale_expansion"
    }
  ];

  // 5. Live Campaign Command Center Dashboard switcher and Draggable Chart state
  const [activeChannel, setActiveChannel] = useState<"google" | "meta" | "display">("google");
  const [scrubPercent, setScrubPercent] = useState(0.7); // default 70%
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  // Channels specific timeline data
  const channelDataMap = {
    google: [
      { month: "Month 1", spend: 45000, roas: 3.2, cpa: 480, conversions: 94, revenue: 144000, graphPct: 20 },
      { month: "Month 2", spend: 60000, roas: 3.5, cpa: 440, conversions: 136, revenue: 210000, graphPct: 30 },
      { month: "Month 3", spend: 85000, roas: 3.9, cpa: 410, conversions: 207, revenue: 331500, graphPct: 45 },
      { month: "Month 4", spend: 110000, roas: 4.2, cpa: 390, conversions: 282, revenue: 462000, graphPct: 58 },
      { month: "Month 5", spend: 150000, roas: 4.4, cpa: 360, conversions: 416, revenue: 660000, graphPct: 70 },
      { month: "Month 6", spend: 180000, roas: 4.6, cpa: 340, conversions: 529, revenue: 828000, graphPct: 82 },
      { month: "Month 7", spend: 220000, roas: 4.7, cpa: 330, conversions: 654, revenue: 1034000, graphPct: 92 },
      { month: "Month 8", spend: 280000, roas: 4.8, cpa: 310, conversions: 864, revenue: 1344000, graphPct: 100 },
    ],
    meta: [
      { month: "Month 1", spend: 35000, roas: 2.8, cpa: 380, conversions: 92, revenue: 98000, graphPct: 18 },
      { month: "Month 2", spend: 50000, roas: 3.0, cpa: 350, conversions: 142, revenue: 150000, graphPct: 28 },
      { month: "Month 3", spend: 70000, roas: 3.3, cpa: 330, conversions: 212, revenue: 231000, graphPct: 40 },
      { month: "Month 4", spend: 100000, roas: 3.5, cpa: 310, conversions: 322, revenue: 350000, graphPct: 55 },
      { month: "Month 5", spend: 130000, roas: 3.7, cpa: 290, conversions: 448, revenue: 481000, graphPct: 68 },
      { month: "Month 6", spend: 160000, roas: 3.8, cpa: 280, conversions: 571, revenue: 608000, graphPct: 80 },
      { month: "Month 7", spend: 200000, roas: 3.9, cpa: 270, conversions: 722, revenue: 780000, graphPct: 90 },
      { month: "Month 8", spend: 250000, roas: 4.0, cpa: 260, conversions: 961, revenue: 1000000, graphPct: 100 },
    ],
    display: [
      { month: "Month 1", spend: 20000, roas: 1.8, cpa: 620, conversions: 32, revenue: 36000, graphPct: 15 },
      { month: "Month 2", spend: 30000, roas: 2.0, cpa: 580, conversions: 51, revenue: 60000, graphPct: 24 },
      { month: "Month 3", spend: 40000, roas: 2.2, cpa: 550, conversions: 75, revenue: 88000, graphPct: 35 },
      { month: "Month 4", spend: 55000, roas: 2.4, cpa: 510, conversions: 112, revenue: 132000, graphPct: 48 },
      { month: "Month 5", spend: 75000, roas: 2.6, cpa: 480, conversions: 168, revenue: 195000, graphPct: 62 },
      { month: "Month 6", spend: 95000, roas: 2.7, cpa: 450, conversions: 228, revenue: 256500, graphPct: 75 },
      { month: "Month 7", spend: 120000, roas: 2.8, cpa: 430, conversions: 302, revenue: 336000, graphPct: 88 },
      { month: "Month 8", spend: 150000, roas: 3.0, cpa: 410, conversions: 408, revenue: 450000, graphPct: 100 },
    ],
  };

  const currentChannelData = channelDataMap[activeChannel];
  const maxIdx = currentChannelData.length - 1;
  const activeScrubIdx = Math.min(
    maxIdx,
    Math.max(0, Math.floor(scrubPercent * (maxIdx + 1)))
  );
  const activePoint = currentChannelData[activeScrubIdx];

  // Dragger handlers
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

  // 6. Channel Mix Snapshot State (simulated trigger on scroll)
  const [mixVisible, setMixVisible] = useState(false);
  const mixRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMixVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    if (mixRef.current) {
      observer.observe(mixRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const channelMixes = [
    { name: "Paid Search (High-Intent Conversion)", share: 45, color: "bg-[#FE7146]" },
    { name: "Paid Social (Audience Nurture & Lead Gen)", share: 35, color: "bg-[#303360]" },
    { name: "Display & YouTube (Recapture & Remarketing)", share: 20, color: "bg-[#8A90E5]" },
  ];

  // 9. FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const faqs = [
    {
      q: "What is the minimum ad budget you recommend?",
      a: "While we scale campaigns spending upwards of 20 lakhs per month, we recommend starting with a minimum overall ad budget of ₹50,000 to ₹75,000 per month. This baseline ensures we gather adequate data to train machine learning bid algorithms, execute conversion rate tests, and capture meaningful volumes inside our primary thematic ad groups."
    },
    {
      q: "Which channels will you use for my business?",
      a: "Every industry demands a unique channel mix. For immediate transactional conversions, we prioritize high-intent Google Search and Shopping. For audience-building, visual education, and social leads, we use Meta Ads (Instagram & Facebook). For long-cycle products, we deploy a programmatic Display retargeting mesh."
    },
    {
      q: "How is performance reported?",
      a: "Total attribution transparency. You receive access to a live, custom Looker Studio dashboard that updates continuously with live API integrations. We map cost-per-click and impressions directly to CRM events, so you see exactly how many rupees were spent and the precise volume of generated profit margin."
    },
    {
      q: "How soon can I expect results?",
      a: "Paid channels deliver instant traffic. The moment pixel tags are verified, ad assets approved, and bids activated, your ads go live immediately. Leads and transactions generally populate on Day 1. However, the first 14 to 30 days are crucial for budget arbitrage and search query scrubs to dial in cost-efficiencies."
    }
  ];

  return (
    <div className="pt-24 bg-white selection:bg-[#FE7146] selection:text-white">
      
      {/* SECTION 1: HERO - "The Funnel, Live" */}
      <section className="relative min-h-[90vh] flex items-center justify-center py-16 overflow-hidden bg-white border-b border-gray-100">
        <div className="absolute inset-0 bg-[radial-gradient(#F5F5FA_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-75"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#FFF1EC]/50 blur-3xl -translate-y-1/3 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-[#F5F5FA]/80 blur-3xl translate-y-1/3 -translate-x-1/3"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Info Column */}
            <div className="lg:col-span-5 text-left space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFF1EC] border border-[#FE7146]/20 rounded-full">
                <Activity className="w-3.5 h-3.5 text-[#FE7146]" />
                <span className="text-[10px] sm:text-xs font-mono font-black tracking-widest text-[#FE7146] uppercase">
                  // PERFORMANCE MARKETING
                </span>
              </div>

              <h1 className="font-display font-black text-4xl sm:text-5xl text-[#303360] tracking-tight leading-[1.1]">
                Every Rupee Tracked.<br />
                Every Result <span className="text-[#FE7146]">Owned.</span>
              </h1>

              <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal max-w-xl">
                We manage performance marketing like a precision mission control room. Our multi-channel campaigns integrate Google Search, Meta Social, and Display retargeting to maximize net customer margins.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
                <button
                  onClick={onContactClick}
                  className="w-full sm:w-auto bg-[#FE7146] hover:bg-[#FE7146]/95 text-white font-black text-sm px-8 py-4 rounded-xl shadow-lg shadow-[#FE7146]/20 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Get a Free Growth Audit</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href="#command-center"
                  className="w-full sm:w-auto bg-slate-50 hover:bg-slate-100 text-[#303360] font-black text-sm px-8 py-4 rounded-xl border border-gray-200/60 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>See Channel Performance</span>
                </a>
              </div>
            </div>

            {/* Hero Right: Performance Marketing Dashboard Image */}
            <div className="lg:col-span-7 flex justify-center w-full">
              <div className="w-full relative">
                {/* Soft ambient glow behind the visual */}
                <div className="absolute -inset-3 bg-gradient-to-tr from-[#FE7146]/15 via-transparent to-indigo-400/10 rounded-[2rem] blur-2xl pointer-events-none" />
                <img
                  src="https://res.cloudinary.com/dqjlffxja/image/upload/f_auto,q_auto/v1783790035/performance-marketing_pscnb3.jpg"
                  alt="Performance marketing funnel and channel dashboard"
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
              "We don't chase impressions. <span className="text-[#FE7146] underline decoration-dashed decoration-2 underline-offset-8">We chase outcomes.</span>"
            </p>
            <cite className="block font-mono text-xs sm:text-sm font-bold text-slate-400 tracking-wider uppercase">
              — ANALYTICS CLOUDS PERFORMANCE CREDO
            </cite>
          </blockquote>
        </div>
      </section>

      {/* SECTION 3: WHAT'S INCLUDED */}
      <section className="py-24 bg-[#F5F5FA]/50 border-t border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-mono font-black text-[#FE7146] tracking-widest uppercase">
              // COMPLETE OVERWATCH
            </span>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-[#303360] leading-tight tracking-tight">
              A Connected <span className="text-[#FE7146]">Acquisition Engine</span>
            </h2>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
              We align visual design, copywriting, tag telemetry, and mathematical bidding algorithms to drive ROI.
            </p>
          </div>

          {/* DESKTOP VIEW: Sidebar Vertical Tabs */}
          <div className="hidden lg:grid lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Vertical Tabs list */}
            <div className="lg:col-span-4 space-y-2">
              {performanceTabs.map((tab) => {
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
                        {tab.id === "strategy" && <Layers size={14} />}
                        {tab.id === "search" && <Search size={14} />}
                        {tab.id === "social" && <Users size={14} />}
                        {tab.id === "display" && <Sparkle size={14} />}
                        {tab.id === "cro" && <Workflow size={14} />}
                        {tab.id === "bid" && <Gauge size={14} />}
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

            {/* Right Content Panel */}
            <div className="lg:col-span-8">
              <AnimatePresence mode="wait">
                {performanceTabs.map((tab) => {
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
            {performanceTabs.map((tab) => {
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
                        {tab.id === "strategy" && <Layers size={14} />}
                        {tab.id === "search" && <Search size={14} />}
                        {tab.id === "social" && <Users size={14} />}
                        {tab.id === "display" && <Sparkle size={14} />}
                        {tab.id === "cro" && <Workflow size={14} />}
                        {tab.id === "bid" && <Gauge size={14} />}
                        {tab.id === "reporting" && <BarChart3 size={14} />}
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

      {/* SECTION 4: PROCESS - Scroll Scrubbed Optimization Pipeline */}
      <section ref={pipelineRef} className="py-24 bg-white overflow-hidden border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-mono font-black text-[#FE7146] tracking-widest uppercase">
              // METHODICAL RIGOR
            </span>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-[#303360] leading-tight tracking-tight">
              Ad Optimization <span className="text-[#FE7146]">Iterative Process</span>
            </h2>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
              We build, launch, test, prune, and scale. Every client account goes through a rigorous daily lifecycle to scrub broad-match leaks and secure clean leads.
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
                            MONITORED
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

      {/* SECTION 5: LIVE CAMPAIGN COMMAND CENTER */}
      <section id="command-center" className="py-24 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-mono font-black text-[#FE7146] tracking-widest uppercase">
              // REAL RESULTS
            </span>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-[#303360] leading-tight tracking-tight">
              See Spend <span className="text-[#FE7146]">Become Revenue</span>
            </h2>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
              We manage performance like a dashboard command center. Click between Google Ads, Meta Ads, and Display programmatic tiers, and drag the orange scrubber slider to track budget conversions.
            </p>
          </div>

          <div className="bg-slate-50 border border-gray-100 rounded-3xl p-6 sm:p-10 shadow-2xl max-w-5xl mx-auto">
            
            {/* Segment switchers */}
            <div className="flex flex-wrap gap-2.5 mb-8 justify-start border-b border-gray-200 pb-6">
              {[
                { id: "google", label: "Google Ads (Search/PMax)", icon: <Search size={14} /> },
                { id: "meta", label: "Meta Ads (Social Conversions)", icon: <Users size={14} /> },
                { id: "display", label: "Display & YouTube Retargeting", icon: <Sparkle size={14} /> }
              ].map((ch) => {
                const isActive = activeChannel === ch.id;
                return (
                  <button
                    key={ch.id}
                    onClick={() => {
                      setActiveChannel(ch.id as any);
                    }}
                    className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-mono font-black transition-all border cursor-pointer ${
                      isActive
                        ? "bg-[#303360] text-[#FE7146] border-[#303360] shadow-md shadow-[#303360]/10"
                        : "bg-white text-slate-500 border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    {ch.icon}
                    <span>{ch.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Metric Tiles (Freshly Ticks up when channel chosen) */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10 text-left">
              
              {/* Spend Tile */}
              <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
                <span className="text-[9px] font-mono font-bold text-slate-400 block uppercase tracking-wider">
                  MONTHLY AD SPEND
                </span>
                <span className="font-mono font-black text-xl sm:text-2xl text-[#303360] mt-1.5 block">
                  ₹{(activePoint.spend / 1000).toFixed(0)}K
                </span>
                <div className="flex items-center gap-1 text-[9px] text-slate-400 font-mono mt-1">
                  <span>CAP_LIMIT: 100% pacing</span>
                </div>
              </div>

              {/* ROAS Tile */}
              <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm relative overflow-hidden">
                <span className="text-[9px] font-mono font-bold text-[#FE7146] block uppercase tracking-wider">
                  REAL-TIME ROAS
                </span>
                <span className="font-mono font-black text-xl sm:text-2xl text-[#FE7146] mt-1.5 block">
                  {activePoint.roas}x
                </span>
                <div className="flex items-center gap-1 text-[9px] text-[#FE7146] font-mono mt-1">
                  <TrendingUp size={10} />
                  <span>Above baseline target</span>
                </div>
              </div>

              {/* CPA Tile */}
              <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
                <span className="text-[9px] font-mono font-bold text-slate-400 block uppercase tracking-wider">
                  AVERAGE CPA
                </span>
                <span className="font-mono font-black text-xl sm:text-2xl text-[#303360] mt-1.5 block">
                  ₹{activePoint.cpa}
                </span>
                <div className="flex items-center gap-1 text-[9px] text-green-500 font-mono mt-1">
                  <TrendingDown size={10} />
                  <span>Cost optimized</span>
                </div>
              </div>

              {/* Conversions Tile */}
              <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
                <span className="text-[9px] font-mono font-bold text-slate-400 block uppercase tracking-wider">
                  MONTH_CONVERSIONS
                </span>
                <span className="font-mono font-black text-xl sm:text-2xl text-[#303360] mt-1.5 block">
                  {activePoint.conversions}
                </span>
                <div className="flex items-center gap-1 text-[9px] text-slate-400 font-mono mt-1">
                  <span>99.8% tracking integrity</span>
                </div>
              </div>

            </div>

            {/* Draggable scrubbable spend-vs-revenue chart */}
            <div className="bg-white rounded-2xl p-5 sm:p-7 border border-gray-100 shadow-md">
              <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
                <div className="text-left">
                  <span className="text-[9px] font-mono font-bold bg-[#FFF1EC] text-[#FE7146] px-2 py-0.5 rounded uppercase">
                    SCRUBBABLE PREVIEW TIMELINE
                  </span>
                  <h4 className="font-display font-extrabold text-[#303360] text-sm sm:text-base pt-1">
                    Attribute Growth Matrix ({activePoint.month})
                  </h4>
                </div>

                <div className="flex items-end gap-2 sm:gap-4 font-mono">
                  <div className="text-left sm:text-right">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">SPENT</span>
                    <span className="text-xs sm:text-sm font-black text-slate-700 block">₹{activePoint.spend.toLocaleString()}</span>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className="text-[9px] font-bold text-[#FE7146] uppercase tracking-widest block">REVENUE RECOGNIZED</span>
                    <span className="text-xs sm:text-sm font-black text-[#FE7146] block">₹{activePoint.revenue.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Chart Plot Area */}
              <div className="relative h-[180px] w-full flex items-end">
                <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="revenue-glow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#FE7146" stopOpacity="0.18" />
                      <stop offset="100%" stopColor="#FE7146" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Draw grid lines */}
                  <line x1="0" y1="45" x2="100%" y2="45" stroke="#F1F1F5" strokeWidth="1" />
                  <line x1="0" y1="90" x2="100%" y2="90" stroke="#F1F1F5" strokeWidth="1" />
                  <line x1="0" y1="135" x2="100%" y2="135" stroke="#F1F1F5" strokeWidth="1" />

                  {/* Area fill path */}
                  <path
                    d={`M 0 180 ${currentChannelData.map((pt, idx) => {
                      const x = (idx / maxIdx) * 100;
                      const y = 180 - (pt.graphPct / 100) * 150;
                      return `L ${x}% ${y}`;
                    }).join(" ")} L 100% 180 Z`}
                    fill="url(#revenue-glow)"
                  />

                  {/* Revenue Curve Path */}
                  <path
                    d={currentChannelData.map((pt, idx) => {
                      const x = (idx / maxIdx) * 100;
                      const y = 180 - (pt.graphPct / 100) * 150;
                      return `${idx === 0 ? "M" : "L"} ${x}% ${y}`;
                    }).join(" ")}
                    fill="none"
                    stroke="#FE7146"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />

                  {/* Spend Reference line */}
                  <path
                    d={currentChannelData.map((pt, idx) => {
                      const x = (idx / maxIdx) * 100;
                      // Spend is roughly lower than revenue, scaling it relative to height
                      const y = 180 - ((pt.spend / 300000) * 150);
                      return `${idx === 0 ? "M" : "L"} ${x}% ${y}`;
                    }).join(" ")}
                    fill="none"
                    stroke="#303360"
                    strokeWidth="2"
                    strokeDasharray="4,4"
                    strokeOpacity="0.5"
                  />

                  {/* Drag Point highlight bubble */}
                  {(() => {
                    const actX = (activeScrubIdx / maxIdx) * 100;
                    const actY = 180 - (activePoint.graphPct / 100) * 150;
                    return (
                      <g>
                        <circle cx={`${actX}%`} cy={actY} r="6" fill="#FE7146" />
                        <circle cx={`${actX}%`} cy={actY} r="12" fill="none" stroke="#FE7146" strokeWidth="2.5" strokeOpacity="0.3" className="animate-pulse" />
                      </g>
                    );
                  })()}
                </svg>

                {/* Vertical timeline markings */}
                <div className="absolute -bottom-6 inset-x-0 flex justify-between text-[10px] font-mono text-slate-400 select-none">
                  <span>Month 1 (Initiation)</span>
                  <span>Month 4 (Arbitrage)</span>
                  <span>Month 8 (Scaled Portfolio)</span>
                </div>
              </div>

              {/* Scrubber Drag Control strip */}
              <div
                ref={chartContainerRef}
                className="mt-12 h-8 relative bg-slate-100 border border-gray-200/50 rounded-xl cursor-ew-resize select-none flex items-center"
                onMouseDown={handleMouseDown}
                onTouchStart={handleTouchStart}
              >
                <div
                  className="absolute left-0 h-full bg-[#FE7146]/5 rounded-l-xl pointer-events-none"
                  style={{ width: `${scrubPercent * 100}%` }}
                ></div>

                {/* Actual Draggable playhead handle */}
                <div
                  className="absolute w-10 h-10 rounded-full bg-[#FE7146] border-4 border-white shadow-lg flex items-center justify-center pointer-events-none -translate-x-1/2 cursor-grab"
                  style={{ left: `${scrubPercent * 100}%` }}
                >
                  <div className="flex gap-0.5">
                    <span className="w-0.5 h-3.5 bg-white/70 rounded-full"></span>
                    <span className="w-0.5 h-3.5 bg-white/70 rounded-full"></span>
                  </div>
                </div>
              </div>

              <div className="text-center mt-5">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-slate-400">
                  <MousePointerClick size={12} className="text-[#FE7146]" />
                  <span>Drag or hold the orange playhead along the timeline grid</span>
                </span>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* SECTION 6: CHANNEL MIX SNAPSHOT */}
      <section ref={mixRef} className="py-20 bg-slate-50 border-b border-gray-100 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-4 mb-12">
            <span className="text-xs font-mono font-black text-[#FE7146] tracking-widest uppercase block">
              // BALANCED DIVERSIFICATION
            </span>
            <h3 className="font-display font-black text-2xl sm:text-3xl text-[#303360] tracking-tight">
              Optimal Budget Allocation Ratio
            </h3>
            <p className="text-slate-500 text-xs sm:text-sm">
              We never pool your capital into a single basket. We diversify budgets based on funnel contribution velocities.
            </p>
          </div>

          <div className="space-y-6 bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-md text-left">
            
            {/* Split chips representation bar */}
            <div className="h-8 rounded-full overflow-hidden flex w-full border border-gray-200">
              {channelMixes.map((mix, idx) => {
                const initialWidth = mixVisible ? `${mix.share}%` : "0%";
                return (
                  <div
                    key={idx}
                    className={`${mix.color} h-full transition-all duration-1000 ease-out`}
                    style={{ width: initialWidth }}
                    title={`${mix.name}: ${mix.share}%`}
                  ></div>
                );
              })}
            </div>

            {/* Legend chips detailed lists */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              {channelMixes.map((mix, idx) => (
                <div key={idx} className="space-y-1 bg-slate-50/50 p-3.5 rounded-2xl border border-gray-100">
                  <div className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full ${mix.color} shrink-0`}></span>
                    <span className="font-mono font-black text-sm text-[#303360]">
                      {mix.share}%
                    </span>
                  </div>
                  <h5 className="font-display font-bold text-xs text-slate-700 leading-tight">
                    {mix.name}
                  </h5>
                  <p className="text-[10px] text-slate-400 font-mono uppercase tracking-wider block">
                    STAGE_PROPORTION_RATIO
                  </p>
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 7: WHY CHOOSE US - Split Differentiator/Stats band */}
      <section className="py-24 bg-[#303360] text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(rgba(254,113,70,0.08)_1.5px,transparent_1.5px)] [background-size:20px_20px] opacity-40"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-[#FE7146]/5 blur-3xl -translate-y-1/2"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: 4 differentiators */}
            <div className="lg:col-span-7 text-left space-y-8">
              <div className="space-y-4">
                <span className="text-xs font-mono font-black text-[#FE7146] tracking-widest uppercase block">
                  // AGILITY & TRANSPARENCY
                </span>
                <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight leading-tight">
                  We Work Like an <span className="text-[#FE7146]">In-House</span> Growth Unit
                </h2>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal max-w-xl">
                  Unlike conventional agencies that dump budget reports once a month, we maintain a hyper-active feedback loop tracking net client profitability indexes.
                </p>
              </div>

              {/* Differentiators cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    title: "Full-Funnel Expertise",
                    desc: "We align high-intent Google searches with custom responsive Meta remarketing loops.",
                    icon: <Layers className="w-5 h-5 text-[#FE7146]" />
                  },
                  {
                    title: "Attribution Transparency",
                    desc: "Looker Studio dashboards mapped to your real customer CRM events in real time.",
                    icon: <BarChart3 className="w-5 h-5 text-[#FE7146]" />
                  },
                  {
                    title: "ROI-First Allocation",
                    desc: "Daily automated paced optimization shifts capital instantly to top acquisition nodes.",
                    icon: <TrendingUp className="w-5 h-5 text-[#FE7146]" />
                  },
                  {
                    title: "Google & Meta Certified",
                    desc: "Campaign architectures constructed exclusively by verified ad management veterans.",
                    icon: <Award className="w-5 h-5 text-[#FE7146]" />
                  }
                ].map((diff, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#FE7146]/10 flex items-center justify-center">
                      {diff.icon}
                    </div>
                    <h4 className="font-display font-extrabold text-sm text-slate-100">
                      {diff.title}
                    </h4>
                    <p className="text-slate-400 text-xs leading-relaxed font-normal">
                      {diff.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: 2x2 Stat cards grid */}
            <div className="lg:col-span-5 w-full">
              <div className="grid grid-cols-2 gap-4">
                
                {/* Stat 1 */}
                <div className="p-6 bg-white/5 border border-white/5 rounded-3xl text-left hover:border-[#FE7146]/30 transition-all group relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#FE7146]/0 to-[#FE7146]/5 opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-300"></div>
                  <CountUp end={4.8} prefix="" suffix="x" decimals={1} />
                  <span className="block font-display font-extrabold text-xs text-slate-200 mt-2">
                    Avg. ROAS Delivered
                  </span>
                  <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider block mt-1">
                    campaign_purity_index
                  </span>
                </div>

                {/* Stat 2 */}
                <div className="p-6 bg-white/5 border border-white/5 rounded-3xl text-left hover:border-[#FE7146]/30 transition-all group relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#FE7146]/0 to-[#FE7146]/5 opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-300"></div>
                  <CountUp end={28} suffix="%" prefix="-" />
                  <span className="block font-display font-extrabold text-xs text-slate-200 mt-2">
                    CPA Average Reduction
                  </span>
                  <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider block mt-1">
                    cost_savings_average
                  </span>
                </div>

                {/* Stat 3 */}
                <div className="p-6 bg-white/5 border border-white/5 rounded-3xl text-left hover:border-[#FE7146]/30 transition-all group relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#FE7146]/0 to-[#FE7146]/5 opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-300"></div>
                  <CountUp end={2.5} suffix="Cr+" decimals={1} />
                  <span className="block font-display font-extrabold text-xs text-slate-200 mt-2">
                    Ad Spend Managed
                  </span>
                  <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider block mt-1">
                    capital_portfolio_cap
                  </span>
                </div>

                {/* Stat 4 */}
                <div className="p-6 bg-white/5 border border-white/5 rounded-3xl text-left hover:border-[#FE7146]/30 transition-all group relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#FE7146]/0 to-[#FE7146]/5 opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-300"></div>
                  <CountUp end={94} suffix="%" />
                  <span className="block font-display font-extrabold text-xs text-slate-200 mt-2">
                    Client Retention
                  </span>
                  <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider block mt-1">
                    partner_longevity_rate
                  </span>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 8: PRICING PACKAGES */}
      <section className="py-24 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-mono font-black text-[#FE7146] tracking-widest uppercase">
              // RIGIDLY TRANSPARENT
            </span>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-[#303360] leading-tight tracking-tight">
              Predictable <span className="text-[#FE7146]">Investment Tiers</span>
            </h2>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
              Choose the package aligned to your current monthly spend footprint. Fully structured deliverables, zero markup fees.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
            
            {/* Starter Package */}
            <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 text-left flex flex-col justify-between shadow-sm hover:border-gray-300 transition-all">
              <div className="space-y-4">
                <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                  BUDGET LIMIT: UP TO ₹1L/mo
                </span>
                <h3 className="font-display font-black text-2xl text-[#303360]">Starter Growth</h3>
                <p className="text-slate-500 text-xs font-medium min-h-[32px]">
                  Perfect for local brands looking to stabilize consistent cost-per-lead channels.
                </p>
                
                <div className="pt-2">
                  <span className="text-sm font-bold text-slate-400">MANAGEMENT FEE</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="font-mono font-black text-3xl text-[#303360]">₹15,000</span>
                    <span className="text-slate-400 text-xs">/month</span>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-6 space-y-3.5">
                  {[
                    "Google Search Campaign Audit & Build",
                    "Keyword Intent Match Setup",
                    "Custom Mobile landing page alignment",
                    "Standard GA4 Conversion Telemetry",
                    "Monthly Performance Review Call"
                  ].map((feat, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-xs text-slate-600">
                      <Check className="w-4 h-4 text-[#FE7146] shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8">
                <button
                  onClick={onContactClick}
                  className="w-full py-3 px-6 rounded-xl border border-gray-200 hover:border-slate-300 text-[#303360] font-black text-xs sm:text-sm tracking-tight transition-colors cursor-pointer text-center"
                >
                  Acquire Starter Plan
                </button>
              </div>
            </div>

            {/* Growth Package (Elevated) */}
            <div className="bg-white border-2 border-[#FE7146] rounded-3xl p-6 sm:p-8 text-left flex flex-col justify-between shadow-xl relative scale-100 md:scale-[1.03] z-10">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#FE7146] text-white font-mono font-black text-[9px] tracking-widest uppercase rounded-full animate-pulse">
                MOST POPULAR
              </div>

              <div className="space-y-4">
                <span className="text-[9px] font-mono font-bold text-[#FE7146] uppercase tracking-wider block">
                  BUDGET RANGE: ₹1L - ₹5L/mo
                </span>
                <h3 className="font-display font-black text-2xl text-[#303360]">Velocity Scale</h3>
                <p className="text-slate-500 text-xs font-medium min-h-[32px]">
                  Our flagship multi-channel setup to scale conversions and build remarketing networks.
                </p>

                <div className="pt-2">
                  <span className="text-sm font-bold text-[#FE7146]">MANAGEMENT FEE</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="font-mono font-black text-3xl text-[#303360]">₹35,000</span>
                    <span className="text-slate-400 text-xs">/month</span>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-6 space-y-3.5">
                  {[
                    "Google Search + Meta Social Integrated Funnel",
                    "Custom Landing Page A/B Testing Grid",
                    "Persistent Negative Keyword Exclusions Lists",
                    "Tag Telemetry via GTM (Consent Mode v2)",
                    "Bi-weekly looker dashboard optimization sprints"
                  ].map((feat, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-xs text-slate-600 font-medium">
                      <Check className="w-4 h-4 text-[#FE7146] shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8">
                <button
                  onClick={onContactClick}
                  className="w-full py-3.5 px-6 rounded-xl bg-[#FE7146] hover:bg-[#FE7146]/95 text-white font-black text-xs sm:text-sm tracking-tight transition-transform hover:scale-[1.02] shadow-lg shadow-[#FE7146]/10 cursor-pointer text-center"
                >
                  Deploy Velocity Plan
                </button>
              </div>
            </div>

            {/* Scale Package */}
            <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 text-left flex flex-col justify-between shadow-sm hover:border-gray-300 transition-all">
              <div className="space-y-4">
                <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                  BUDGET RANGE: ₹5L+/mo
                </span>
                <h3 className="font-display font-black text-2xl text-[#303360]">Enterprise Arbitrage</h3>
                <p className="text-slate-500 text-xs font-medium min-h-[32px]">
                  Custom programmatic solutions with dedicated margin bidding override grids.
                </p>

                <div className="pt-2">
                  <span className="text-sm font-bold text-slate-400">MANAGEMENT FEE</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="font-mono font-black text-3xl text-[#303360]">₹75,000</span>
                    <span className="text-slate-400 text-xs">/month</span>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-6 space-y-3.5">
                  {[
                    "Search + Social + Programmatic Display retargeting",
                    "Dedicated designer for landing pages & visual copy",
                    "Server-Side Conversion API proxy setups",
                    "Direct CRMs offline data ingestion loops",
                    "Weekly custom looker attribution sprints"
                  ].map((feat, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-xs text-slate-600">
                      <Check className="w-4 h-4 text-[#FE7146] shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8">
                <button
                  onClick={onContactClick}
                  className="w-full py-3 px-6 rounded-xl border border-gray-200 hover:border-slate-300 text-[#303360] font-black text-xs sm:text-sm tracking-tight transition-colors cursor-pointer text-center"
                >
                  Deploy Enterprise Plan
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 9: FAQ */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-mono font-black text-[#FE7146] tracking-widest uppercase">
              // TRANSPARENT INTELLIGENCE
            </span>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-[#303360] leading-tight tracking-tight">
              Performance Marketing <span className="text-[#FE7146]">FAQs</span>
            </h2>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
              We resolve common client concerns about budget pacing, conversion attribution loops, and ROI speeds.
            </p>
          </div>

          <div className="space-y-4 text-left">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div key={idx} className="bg-slate-50 rounded-2xl border border-gray-100 overflow-hidden">
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-5 flex items-center justify-between text-left cursor-pointer transition-colors"
                  >
                    <span className="font-display font-extrabold text-sm sm:text-base text-[#303360]">
                      {faq.q}
                    </span>
                    <div className={`w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm border border-gray-100 transition-transform ${
                      isOpen ? "rotate-180 text-[#FE7146]" : "text-[#303360]"
                    }`}>
                      <ChevronDown size={16} />
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
                        <div className="p-5 pt-0 border-t border-gray-100 text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
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
