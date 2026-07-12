/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { 
  Laptop, 
  Smartphone, 
  Search, 
  Zap, 
  LifeBuoy, 
  Code2, 
  ShieldCheck, 
  Check, 
  ChevronDown, 
  ArrowRight, 
  ChevronRight, 
  Sparkles, 
  Star, 
  Palette, 
  ShoppingCart, 
  Layers, 
  Monitor, 
  Cpu, 
  ArrowUpRight,
  TrendingUp,
  HelpCircle,
  Database,
  RefreshCw,
  Sliders,
  Terminal,
  Activity,
  Award,
  Globe
} from "lucide-react";
import { CtaBanner } from "../components/CtaBanner";

// Intersection Observer Count Up Component for Why Choose Us Stats
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
    <span ref={elementRef} className="font-mono font-black text-3xl sm:text-4xl text-[#FE7146]">
      {count}
      {suffix}
    </span>
  );
}

// Before/After Image Slider Component
interface BeforeAfterProps {
  beforeImg: string;
  afterImg: string;
  beforeLabel?: string;
  afterLabel?: string;
}

function BeforeAfterSlider({ beforeImg, afterImg, beforeLabel = "BEFORE (2022)", afterLabel = "AFTER REDESIGN" }: BeforeAfterProps) {
  const [sliderPos, setSliderPos] = useState(50); // percentage 0-100
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) handleMove(e.touches[0].clientX);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (e.buttons === 1 || isDragging) {
      handleMove(e.clientX);
    }
  };

  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    handleMove(e.clientX);
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    window.addEventListener("mouseup", handleMouseUp);
    return () => window.removeEventListener("mouseup", handleMouseUp);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-video sm:aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl select-none cursor-ew-resize border border-gray-200 bg-slate-900"
      onMouseMove={onMouseMove}
      onTouchMove={onTouchMove}
      onMouseDown={onMouseDown}
    >
      {/* After Image (Full Background) */}
      <img 
        src={afterImg} 
        alt="After Redesign" 
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        referrerPolicy="no-referrer"
      />
      <div className="absolute top-4 right-4 bg-[#FE7146] text-white text-[9px] font-mono font-black tracking-widest px-2.5 py-1 rounded shadow-md z-20">
        {afterLabel}
      </div>

      {/* Before Image (Left Clipped Overlay) — clip-path keeps the image at
          full container size (no squish on first render or window resize) */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none z-10"
        style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
      >
        <img
          src={beforeImg}
          alt="Before Design"
          className="absolute inset-0 w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 left-4 bg-slate-800 text-gray-300 text-[9px] font-mono font-black tracking-widest px-2.5 py-1 rounded shadow-md">
          {beforeLabel}
        </div>
      </div>

      {/* Drag handle line & circle */}
      <div 
        className="absolute inset-y-0 z-30 pointer-events-none flex items-center justify-center"
        style={{ left: `${sliderPos}%` }}
      >
        <div className="absolute inset-y-0 w-0.5 bg-[#FE7146] shadow-xl" />
        <div className="w-10 h-10 rounded-full bg-[#FE7146] text-white shadow-lg border-2 border-white flex items-center justify-center -translate-x-1/2 cursor-ew-resize">
          <Sliders className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
}

interface WebDesignDevelopmentProps {
  onContactClick: () => void;
}

export function WebDesignDevelopment({ onContactClick }: WebDesignDevelopmentProps) {
  // 1. Hero Mockup Self-Building Sequence States:
  // "init" -> "wireframe" -> "skeleton" -> "resolved"
  const [buildStep, setBuildStep] = useState<"wireframe" | "skeleton" | "resolved">("wireframe");
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);

  useEffect(() => {
    // Add logs progressively to simulate real compile steps
    const logs = [
      "// INITIALIZING STACK BUILDER v4.8...",
      "Connecting to Noida Sector 62 server nodes... Connected.",
      "Loading Tailwind Design System v4.0...",
      "Importing font weights [Space Grotesk, Inter]... Done.",
      "Parsing content hierarchies & journeys... Done.",
      "Synthesizing visual layers & performance targets...",
      "Optimizing media layers & Lighthouse targets... Ready ✓"
    ];

    let currentLogIndex = 0;
    const logInterval = setInterval(() => {
      if (currentLogIndex < logs.length) {
        // Capture the log before the async state updater runs — reading
        // logs[currentLogIndex] inside the updater races with the increment
        // below and ends up pushing undefined, crashing the render.
        const nextLog = logs[currentLogIndex];
        currentLogIndex++;
        setTerminalLogs((prev) => [...prev, nextLog]);
      } else {
        clearInterval(logInterval);
      }
    }, 450);

    const wireframeTimer = setTimeout(() => {
      setBuildStep("skeleton");
    }, 1500);

    const skeletonTimer = setTimeout(() => {
      setBuildStep("resolved");
    }, 3200);

    return () => {
      clearInterval(logInterval);
      clearTimeout(wireframeTimer);
      clearTimeout(skeletonTimer);
    };
  }, []);

  // 2. Interactive "What We Offer" Tabs
  const [activeOfferTab, setActiveOfferTab] = useState<number>(0);

  const subServices = [
    {
      title: "UI/UX & Journey Design",
      tagline: "Conversion Architecture First",
      description: "Interactive Figma wireframes, thorough sitemap mapping, and responsive screen flows built precisely to turn general traffic into highly qualified buyers.",
      icon: <Palette className="w-5 h-5" />,
      bullets: [
        "Collaborative Figma visual mapping",
        "Deep competitor conversion wireframing",
        "Strict structural sitemap layouts",
        "Direct user-intent click targets"
      ],
      mockupBg: "bg-indigo-900/40",
      mockupVisual: (
        <div className="w-full h-full p-4 flex flex-col justify-between text-white font-mono text-[10px]">
          <div className="flex justify-between items-center border-b border-white/10 pb-2">
            <span>[Figma wireframe_v2]</span>
            <span className="w-2 h-2 rounded-full bg-[#FE7146] animate-pulse" />
          </div>
          <div className="grid grid-cols-12 gap-2 my-2 flex-grow">
            <div className="col-span-4 border border-dashed border-white/30 rounded p-2 flex flex-col justify-between">
              <span className="text-gray-400">// sidebar_nav</span>
              <div className="space-y-1">
                <div className="h-1 bg-white/20 rounded w-full" />
                <div className="h-1 bg-white/20 rounded w-5/6" />
                <div className="h-1 bg-[#FE7146]/40 rounded w-4/5" />
              </div>
            </div>
            <div className="col-span-8 border border-dashed border-white/30 rounded p-2 flex flex-col justify-between">
              <div className="flex justify-between">
                <span className="text-gray-400">// main_hero</span>
                <span className="text-emerald-400">[960px]</span>
              </div>
              <div className="h-4 bg-white/10 rounded w-full flex items-center justify-center text-[8px] text-[#FE7146] font-bold">
                BesTone Display Headline
              </div>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <div className="h-8 bg-white/5 rounded border border-white/10" />
                <div className="h-8 bg-white/5 rounded border border-white/10" />
              </div>
            </div>
          </div>
          <div className="text-[8px] text-gray-400 text-center">
            Click to style canvas layout parameters
          </div>
        </div>
      )
    },
    {
      title: "Responsive Web Development",
      tagline: "Fluid Performance Code",
      description: "Pixel-perfect front-end code built natively with Next.js or Tailwind CSS, adapting fluidly from 375px mobile viewports to large-format ultra-wide 4K screens.",
      icon: <Laptop className="w-5 h-5" />,
      bullets: [
        "Fluid desktop-first, mobile-friendly design",
        "Clean, semantic TypeScript structure",
        "Fully indexable static site layouts",
        "Zero template bloat, extreme speed"
      ],
      mockupBg: "bg-emerald-900/40",
      mockupVisual: (
        <div className="w-full h-full p-4 flex flex-col justify-between text-white font-mono text-[9px]">
          <div className="flex justify-between items-center border-b border-white/10 pb-2">
            <span className="text-emerald-400">Layout.tsx — TypeScript</span>
            <span className="text-gray-400">1.2kb minified</span>
          </div>
          <div className="flex-grow py-3 space-y-1.5 text-left font-mono text-[8px] text-gray-300">
            <p><span className="text-purple-400">import</span> {"{ motion }"} <span className="text-purple-400">from</span> <span className="text-orange-300">&quot;motion/react&quot;</span>;</p>
            <p><span className="text-blue-400">export function</span> <span className="text-yellow-300">Navbar</span>() {"{"}</p>
            <p className="pl-4"><span className="text-blue-400">return</span> (</p>
            <p className="pl-8 text-gray-500">&lt;<span className="text-red-400">motion.nav</span> className=<span className="text-orange-300">&quot;w-full sticky top-0&quot;</span></p>
            <p className="pl-12 text-gray-500">animate={"{{ y: 0, opacity: 1 }}"}&gt;</p>
            <p className="pl-8 text-gray-500">...</p>
          </div>
          <div className="flex items-center gap-1 bg-emerald-500/20 text-emerald-300 p-1.5 rounded text-[8px] justify-center">
            <Activity className="w-3 h-3 text-emerald-400 animate-pulse" />
            <span>Compiled successfully. Node active on port 3000.</span>
          </div>
        </div>
      )
    },
    {
      title: "E-Commerce Architectures",
      tagline: "High-Velocity Retail Stores",
      description: "Fast custom storefronts built natively on Shopify, WooCommerce, or headless structures with rapid filters and optimized checkouts designed to limit cart abandonments.",
      icon: <ShoppingCart className="w-5 h-5" />,
      bullets: [
        "Headless or Shopify dynamic template layers",
        "Optimized product grids & variations",
        "Single-step instant checkouts",
        "Integrated stock & CRM APIs"
      ],
      mockupBg: "bg-amber-950/40",
      mockupVisual: (
        <div className="w-full h-full p-4 flex flex-col justify-between text-white">
          <div className="flex justify-between items-center border-b border-white/10 pb-2 font-mono text-[9px]">
            <span>Shopify Engine V2</span>
            <span className="text-[#FE7146]">Cart (3 items)</span>
          </div>
          <div className="grid grid-cols-2 gap-2 my-2">
            <div className="bg-white/5 rounded-lg p-2 border border-white/5 space-y-2">
              <div className="h-10 bg-gradient-to-tr from-[#FE7146]/20 to-amber-500/20 rounded relative flex items-center justify-center text-[8px] font-bold">
                PRODUCT IMAGE
              </div>
              <div className="h-1 bg-white/20 rounded w-3/4" />
              <div className="flex justify-between items-center">
                <span className="text-[8px] text-[#FE7146] font-bold">₹2,999</span>
                <span className="text-[7px] bg-white/10 px-1 py-0.5 rounded text-gray-300 font-mono">ADD</span>
              </div>
            </div>
            <div className="bg-white/5 rounded-lg p-2 border border-white/5 space-y-2">
              <div className="h-10 bg-gradient-to-tr from-[#FE7146]/20 to-amber-500/20 rounded relative flex items-center justify-center text-[8px] font-bold">
                PRODUCT IMAGE
              </div>
              <div className="h-1 bg-white/20 rounded w-3/4" />
              <div className="flex justify-between items-center">
                <span className="text-[8px] text-[#FE7146] font-bold">₹4,499</span>
                <span className="text-[7px] bg-[#FE7146] px-1 py-0.5 rounded text-white font-mono">ADDED</span>
              </div>
            </div>
          </div>
          <div className="h-5 bg-emerald-500/90 text-white font-bold rounded flex items-center justify-center text-[8px] shadow-lg">
            PROCEED TO CHECKOUT (₹7,498)
          </div>
        </div>
      )
    },
    {
      title: "Conversion-Focused Landing Pages",
      tagline: "Engineered PPC Match",
      description: "Fast, specialized landing pages aligned directly with Google and Meta ads structures, engineered with crisp forms and sticky CTAs to scale raw leads.",
      icon: <TrendingUp className="w-5 h-5" />,
      bullets: [
        "A/B test optimized structure components",
        "High-contrast hero form layouts",
        "Instant performance click metrics tracking",
        "Seamless webhook connection to CRMs"
      ],
      mockupBg: "bg-red-950/40",
      mockupVisual: (
        <div className="w-full h-full p-4 flex flex-col justify-between text-white text-left">
          <div className="space-y-1">
            <span className="text-[7px] font-mono font-bold text-[#FE7146] tracking-wider uppercase">GOOGLE CAMPAIGN LP</span>
            <h4 className="text-xs font-black leading-tight">Scale Your Noida Leads Today</h4>
          </div>
          <div className="bg-white/5 border border-white/10 p-2.5 rounded-lg space-y-2 my-2">
            <div className="h-1 bg-white/25 rounded w-1/3" />
            <div className="grid grid-cols-2 gap-1.5">
              <div className="h-4 bg-white/5 border border-white/10 rounded" />
              <div className="h-4 bg-white/5 border border-white/10 rounded" />
            </div>
            <div className="h-5 bg-[#FE7146] rounded flex items-center justify-center text-[8px] font-bold text-white shadow-md">
              CLAIM MY DEMO
            </div>
          </div>
          <div className="flex items-center gap-1 justify-center text-[7px] text-gray-400 font-mono">
            <span>⚡ Conversions optimized (+24.8% avg.)</span>
          </div>
        </div>
      )
    },
    {
      title: "Website Revamps & Modernization",
      tagline: "Re-Architecting Slow Assets",
      description: "Convert slow, sluggish legacy websites into ultra-fast, modern React setups that improve search engine scores and keep visitors engaged.",
      icon: <Layers className="w-5 h-5" />,
      bullets: [
        "Migrating legacy WordPress/HTML codebases",
        "Drastic file size and image overhead cuts",
        "Vibrant layout refreshes with rich components",
        "Complete structural sitemap safety matching"
      ],
      mockupBg: "bg-sky-950/40",
      mockupVisual: (
        <div className="w-full h-full p-4 flex flex-col justify-center items-center text-white space-y-3">
          <div className="flex items-center gap-3">
            <div className="text-center">
              <span className="text-[8px] text-gray-400 block font-mono">OLD SITE SPEED</span>
              <span className="text-base font-black text-red-500">42/100</span>
            </div>
            <div className="text-xl text-gray-400">→</div>
            <div className="text-center">
              <span className="text-[8px] text-[#FE7146] block font-mono">NEW NEXT.JS SPEED</span>
              <span className="text-base font-black text-emerald-400">99/100</span>
            </div>
          </div>
          <div className="w-full bg-white/5 border border-white/10 p-2 rounded-lg space-y-1.5 text-left">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="text-[8px] font-mono text-gray-300">Images optimized to WebP format</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="text-[8px] font-mono text-gray-300">Removed 18 unused visual plugins</span>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Uptime Support & Maintenance",
      tagline: "Continuous Secure Supervision",
      description: "Proactive 24/7 uptime monitoring, server performance tune-ups, weekly critical security updates, and automated remote database backups.",
      icon: <LifeBuoy className="w-5 h-5" />,
      bullets: [
        "Consistent daily remote server backups",
        "Proactive plugin & platform secure patching",
        "Instant critical alert team notification",
        "Continuous layout adjustments as requested"
      ],
      mockupBg: "bg-purple-950/40",
      mockupVisual: (
        <div className="w-full h-full p-4 flex flex-col justify-between text-white font-mono text-[9px]">
          <div className="flex justify-between items-center border-b border-white/10 pb-2">
            <span>Uptime_Monitor_Core</span>
            <span className="text-emerald-400">LIVE</span>
          </div>
          <div className="py-2 space-y-1">
            <div className="flex justify-between text-[8px] text-gray-300">
              <span>Main server ping:</span>
              <span className="text-emerald-400">14ms (Optimal)</span>
            </div>
            <div className="flex justify-between text-[8px] text-gray-300">
              <span>Secure SSL expiry:</span>
              <span className="text-emerald-400">Active (344 days remaining)</span>
            </div>
            <div className="flex justify-between text-[8px] text-gray-300">
              <span>Daily backup index:</span>
              <span className="text-emerald-400">Stored at 04:00 AM</span>
            </div>
          </div>
          <div className="h-6 bg-indigo-500/20 border border-indigo-400/30 rounded flex items-center justify-center text-[8px] text-indigo-300">
            ✓ 100% Core systems operational
          </div>
        </div>
      )
    }
  ];

  // Mobile accordion sets activeOfferTab to -1 when fully collapsed; the
  // desktop panel must still render a valid service after a viewport resize.
  const activeService = subServices[activeOfferTab] ?? subServices[0];

  // 3. Before/After Interactive State
  const [activeSliderProject, setActiveSliderProject] = useState<"saas" | "ecomm">("saas");

  const sliderProjects = {
    saas: {
      before: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&h=500&q=80",
      after: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&h=500&q=80",
      beforeLabel: "LEGACY SAAS PORTAL (2023)",
      afterLabel: "ANALYTICS CLOUDS NEXT.JS BUILD"
    },
    ecomm: {
      before: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&h=500&q=80",
      after: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&h=500&q=80",
      beforeLabel: "LEGACY STORE (SLOW COMPILATION)",
      afterLabel: "HIGH-CONVERTING FAST CHECOUT STORE"
    }
  };

  // 4. Featured Work Asymmetric Grid Items
  const portfolioItems = [
    {
      id: 1,
      title: "ScribeFlow SaaS Marketing Platform",
      client: "ScribeFlow Solutions",
      result: "+148% Conversions",
      description: "An elegant dark marketing system built with Framer Motion scroll indicators, interactive chart widgets, and immediate lead routing.",
      category: "SaaS App Development",
      img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
      colSpan: "lg:col-span-8"
    },
    {
      id: 2,
      title: "Velvet Threads Boutique Hub",
      client: "Velvet Threads India",
      result: "42% Checkout Drop",
      description: "A luxury lifestyle e-commerce setup optimized for mobile with instantaneous filters, visual layout blocks, and frictionless multi-payment steps.",
      category: "Luxury E-Commerce",
      img: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80",
      colSpan: "lg:col-span-4"
    },
    {
      id: 3,
      title: "ArchStudio Editorial Portfolio",
      client: "ArchStudio Noida",
      result: "98 PageSpeed Score",
      description: "A visual architectural showreel project focused on micro-interactions, responsive grid shifts, and minimalist display typography.",
      category: "Creative Showcase",
      img: "https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?auto=format&fit=crop&w=800&q=80",
      colSpan: "lg:col-span-4"
    },
    {
      id: 4,
      title: "FinTech Hub API Dashboard",
      client: "Noida Capital Partners",
      result: "99.99% Core Uptime",
      description: "A fast portal engineered on Node.js to track real-time transactional payloads, with schema compliance checks and instant custom reporting.",
      category: "Enterprise Web App",
      img: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
      colSpan: "lg:col-span-8"
    }
  ];

  // 5. FAQ Accordion Items
  const faqItems = [
    {
      question: "How long does a custom website project take to design & develop?",
      answer: "A standard corporate or marketing website (5-10 pages) is built from initial strategy to deployment in 3 to 5 weeks. More complex systems, bespoke React/Next.js platforms, or custom headless e-commerce architectures can take 6 to 10 weeks depending on custom visual parameters and database requirements."
    },
    {
      question: "Are your layouts genuinely mobile-friendly and search-optimized?",
      answer: "Absolutely. Mobile responsiveness and semantic SEO are fundamental elements of our development stack. Every layout aligns to strict viewport metrics, utilizes optimized WebP imagery, loads critical CSS on priority, and features custom schema markup to crawl, index, and rank high on search engines."
    },
    {
      question: "Do you handle custom hosting setup, SSL certificates, and domain routing?",
      answer: "Yes, we handle all the technical details. We assist in deploying your applications on high-speed servers (AWS, Vercel, Netlify, or custom cloud services), configure bulletproof SSL certificates, and route your domain nodes correctly with zero stress to your team."
    },
    {
      question: "Who retains the ultimate ownership of the custom code and Figma files?",
      answer: "You do. Once the final invoice is processed, you hold 100% ownership of all custom Figma files, React design systems, custom code structures, and assets. We can package everything neatly inside a secure git repository or cloud folder for your records."
    }
  ];

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div id="elevated-web-dev-root" className="pt-20 bg-white text-[#333333] selection:bg-[#FE7146] selection:text-white overflow-hidden">
      
      {/* SECTION 1: Interactive Hero - "The Build" */}
      <section id="elevated-hero" className="relative bg-white border-b border-gray-100 py-16 sm:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column Content */}
            <div className="lg:col-span-5 space-y-6 text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-widest text-[#FE7146] bg-[#FFF1EC] uppercase">
                <Terminal size={11} className="text-[#FE7146]" />
                // WEB DESIGN &amp; DEVELOPMENT
              </span>

              <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-[#303360] tracking-tight leading-tight">
                We Design. We Build. <br />
                We Ship Websites That <span className="text-[#FE7146] relative inline-block">
                  Perform
                  <span className="absolute bottom-1.5 left-0 w-full h-1 bg-[#FE7146]/20 rounded-full" />
                </span>
              </h1>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl font-normal">
                At Analytics Clouds, we engineer visually breathtaking, conversion-focused websites from our Noida hub. No template bloat—just fluid, lightweight, custom digital experiences configured to double your search reach.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={onContactClick}
                  className="bg-[#FE7146] hover:bg-[#e0562b] text-white font-black text-xs sm:text-sm px-8 py-4 rounded-xl shadow-lg shadow-[#FE7146]/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer text-center"
                >
                  Consult Our Developers
                </button>
                <a
                  href="#before-after-redesign"
                  className="bg-white hover:bg-slate-50 border border-gray-200 text-[#303360] font-black text-xs sm:text-sm px-8 py-4 rounded-xl shadow-sm hover:border-gray-300 transition-colors text-center inline-flex items-center justify-center gap-1.5"
                >
                  <span>See Redesigns</span>
                  <ArrowRight size={14} className="text-[#303360]" />
                </a>
              </div>
            </div>

            {/* Hero Right: Web Design & Development Image */}
            <div className="lg:col-span-7 flex justify-center w-full">
              <div className="w-full relative">
                <img
                  src="https://res.cloudinary.com/dqjlffxja/image/upload/f_auto,q_auto/v1783790038/web_development_bcn2zq.jpg"
                  alt="Web design and development project dashboard"
                  className="relative w-full h-auto rounded-3xl"
                  loading="eager"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

          </div>
        </div>

        {/* Beneath the fold stack scrolling marquee */}
        <div className="mt-16 border-t border-b border-gray-100 bg-white py-6 relative overflow-hidden select-none">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
          
          <div className="flex gap-16 animate-infinite-scroll w-max whitespace-nowrap">
            {[
              "React / Next.js", "Tailwind CSS", "WordPress Engine", "Shopify Stores", 
              "TypeScript Support", "Figma Design Studio", "Node.js Gateways", "Webflow Custom",
              "React / Next.js", "Tailwind CSS", "WordPress Engine", "Shopify Stores", 
              "TypeScript Support", "Figma Design Studio", "Node.js Gateways", "Webflow Custom"
            ].map((stack, idx) => (
              <span 
                key={idx} 
                className="font-mono text-xs font-bold text-slate-400 tracking-wider uppercase inline-flex items-center gap-2 hover:text-[#FE7146] transition-colors"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#FE7146]/60" />
                {stack}
              </span>
            ))}
          </div>
        </div>

      </section>

      {/* SECTION 2: The Craft Statement (whitespace breather) */}
      <section id="craft-statement" className="py-24 sm:py-32 bg-white relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <p className="text-[#FE7146] font-mono font-bold text-xs uppercase tracking-widest">
            // DESIGN PHILOSOPHY
          </p>
          <blockquote className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#303360] tracking-tight leading-relaxed max-w-4xl mx-auto">
            &quot;Good design gets noticed. <br />
            <span className="text-[#FE7146]">Great design gets results.</span>&quot;
          </blockquote>
          <p className="text-gray-400 text-xs sm:text-sm max-w-lg mx-auto font-normal leading-relaxed pt-2">
            We operate with a simple metric: visual performance. If a layout fails to sustain immediate organic engagement and warm user intent, the styling has failed.
          </p>
        </div>
      </section>

      {/* SECTION 3: What We Offer (Interactive tab mockup showcase) */}
      <section id="what-we-offer-tabs" className="py-20 sm:py-28 bg-slate-50 border-t border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-16">
          
          <div className="space-y-3 max-w-3xl mx-auto">
            <span className="text-xs font-black text-[#FE7146] tracking-widest uppercase font-mono">
              // CORE SERVICES
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[#303360] tracking-tight">
              End-to-End Digital Engineering Capabilities
            </h2>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed font-normal">
              We cover the entire layout roadmap, combining creative pixel-perfect wireframing with high-speed performance code.
            </p>
          </div>

          {/* Desktop/Tablet Tabbed Layout */}
          <div className="hidden md:grid grid-cols-12 gap-8 items-stretch text-left">
            
            {/* Left Column: Vertical tab list */}
            <div className="col-span-5 space-y-3 flex flex-col justify-center">
              {subServices.map((svc, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveOfferTab(idx)}
                  onMouseEnter={() => setActiveOfferTab(idx)}
                  className={`w-full p-4.5 rounded-2xl border text-left transition-all duration-300 flex items-start gap-4 cursor-pointer group ${
                    activeOfferTab === idx
                      ? "bg-white border-[#FE7146]/20 shadow-lg shadow-orange-100/10 scale-[1.01]"
                      : "bg-transparent border-transparent hover:bg-white/50"
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                    activeOfferTab === idx
                      ? "bg-[#FFF1EC] text-[#FE7146]"
                      : "bg-slate-200/50 text-[#303360] group-hover:bg-[#FFF1EC] group-hover:text-[#FE7146]"
                  }`}>
                    {svc.icon}
                  </div>
                  <div className="space-y-1">
                    <h4 className={`font-display font-bold text-sm sm:text-base transition-colors ${
                      activeOfferTab === idx ? "text-[#FE7146]" : "text-[#303360]"
                    }`}>
                      {svc.title}
                    </h4>
                    <p className="text-slate-400 text-xs font-mono font-medium leading-none">
                      {svc.tagline}
                    </p>
                  </div>
                </button>
              ))}
            </div>

            {/* Right Column: Visual Preview Card */}
            <div className="col-span-7 flex flex-col justify-between bg-white border border-gray-100 rounded-3xl p-8 shadow-xl relative overflow-hidden">
              <div className="space-y-4 relative z-10">
                <span className="text-[9px] font-mono font-bold text-[#FE7146] bg-[#FFF1EC] px-2.5 py-1 rounded-md uppercase">
                  CAPABILITIES LIST
                </span>
                
                <h3 className="font-display font-extrabold text-2xl text-[#303360]">
                  {activeService.title}
                </h3>

                <p className="text-slate-600 text-sm leading-relaxed">
                  {activeService.description}
                </p>

                {/* Sub features bullet row */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  {activeService.bullets.map((b, bIdx) => (
                    <div key={bIdx} className="flex gap-2 items-center text-xs text-slate-600 font-medium">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Graphical representation preview slot */}
              <div className="mt-8 relative z-10">
                <div className="bg-[#303360] rounded-2xl border border-white/10 shadow-lg overflow-hidden">
                  <div className="bg-[#24274c] px-3 py-2 flex items-center gap-1.5 border-b border-white/5">
                    <span className="w-2 h-2 rounded-full bg-red-400" />
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  </div>
                  <div className={`p-4 min-h-[160px] ${activeService.mockupBg} flex items-center justify-center`}>
                    {activeService.mockupVisual}
                  </div>
                </div>
              </div>

              {/* Subtle visual glow underlay */}
              <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-orange-100/50 rounded-full filter blur-3xl pointer-events-none -z-10" />
            </div>

          </div>

          {/* Mobile Collapsible Accordion (replaces complex tabs) */}
          <div className="md:hidden space-y-4 text-left">
            {subServices.map((svc, idx) => (
              <div 
                key={idx} 
                className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => setActiveOfferTab(activeOfferTab === idx ? -1 : idx)}
                  className="w-full p-5 flex items-center justify-between gap-4 text-left cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#FFF1EC] text-[#FE7146] flex items-center justify-center shrink-0">
                      {svc.icon}
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-sm text-[#303360]">{svc.title}</h4>
                      <p className="text-[10px] text-slate-400 font-mono">{svc.tagline}</p>
                    </div>
                  </div>
                  <ChevronDown size={16} className={`text-[#303360] transition-transform ${activeOfferTab === idx ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {activeOfferTab === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-gray-50 bg-slate-50/50"
                    >
                      <div className="p-5 space-y-4">
                        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                          {svc.description}
                        </p>
                        
                        <div className="space-y-2">
                          {svc.bullets.map((b, bIdx) => (
                            <div key={bIdx} className="flex gap-2 items-center text-xs text-slate-600 font-medium">
                              <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                              <span>{b}</span>
                            </div>
                          ))}
                        </div>

                        <div className="bg-[#303360] rounded-xl overflow-hidden border border-white/5">
                          <div className={`p-4 min-h-[120px] ${svc.mockupBg} flex items-center justify-center`}>
                            {svc.mockupVisual}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 4: Our Process pipeline */}
      <section id="build-pipeline" className="py-20 sm:py-28 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-16">
          
          <div className="space-y-3 max-w-3xl mx-auto">
            <span className="text-xs font-black text-[#FE7146] tracking-widest uppercase font-mono">
              // BUILD ROADMAP
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[#303360] tracking-tight">
              Our Five-Stage Performance Engineering Pipeline
            </h2>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed font-normal">
              A highly systematic, rigorous process engineered to ensure total structural speed and absolute design fidelity.
            </p>
          </div>

          {/* Sequential Timeline Pipeline wrapper */}
          <div className="relative">
            
            {/* Horizontal timeline track (Large screens) */}
            <div className="absolute top-[40px] left-10 right-10 h-1 bg-slate-100 hidden lg:block z-0">
              <div className="absolute inset-y-0 left-0 w-3/4 bg-gradient-to-r from-[#FE7146] to-indigo-500 rounded-full" />
            </div>

            {/* Steps Row */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative z-10">
              {[
                { step: "stage_01", label: "Strategy & Discovery", desc: "We map Noida visitor demographics, complete comprehensive visual sitemaps, and design user pathways.", icon: <Sliders className="w-5 h-5 text-[#FE7146]" /> },
                { step: "stage_02", label: "Wireframe Mapping", desc: "Our design team structures high-converting sitemaps and content flows inside clean layout frames.", icon: <Palette className="w-5 h-5 text-[#FE7146]" /> },
                { step: "stage_03", label: "Visual Theme Styling", desc: "We style visual systems with premium typographic choices and on-brand colors inside Figma.", icon: <Layers className="w-5 h-5 text-[#FE7146]" /> },
                { step: "stage_04", label: "Clean Code Engineering", desc: "Our front-end engineers write semantic TypeScript templates, achieving rapid Lighthouse metrics.", icon: <Code2 className="w-5 h-5 text-[#FE7146]" /> },
                { step: "stage_05", label: "Speed Launch & Audit", desc: "We optimize media weights, audit technical SEO schema, and configure hosting endpoints.", icon: <Award className="w-5 h-5 text-[#FE7146]" /> }
              ].map((item, idx) => (
                <div key={idx} className="flex flex-row md:flex-col items-start md:items-center text-left md:text-center gap-4 md:gap-5 group">
                  
                  {/* Step bubble */}
                  <div className="shrink-0 w-[72px] h-[72px] rounded-full bg-white border-2 border-slate-200 text-slate-500 group-hover:border-[#FE7146] group-hover:text-[#FE7146] font-mono font-black text-xs flex flex-col items-center justify-center transition-all duration-300 shadow-sm relative z-20">
                    <span className="text-[9px] text-[#FE7146]/80 tracking-widest">{item.step}</span>
                    <div className="mt-0.5">{item.icon}</div>
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-display font-extrabold text-sm sm:text-base text-[#303360]">
                      {item.label}
                    </h3>
                    <p className="text-slate-500 text-xs sm:text-sm font-normal leading-relaxed max-w-xs mx-auto">
                      {item.desc}
                    </p>
                  </div>

                </div>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 5: Before/After Redesign Showcase (draggable slider) */}
      <section id="before-after-redesign" className="py-20 sm:py-28 bg-slate-50 border-t border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-16">
          
          <div className="space-y-3 max-w-3xl mx-auto">
            <span className="text-xs font-black text-[#FE7146] tracking-widest uppercase font-mono">
              // TRANSFORMATIONS
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[#303360] tracking-tight">
              Drag to Compare: Old Cluttered Design vs. High-Velocity Redesign
            </h2>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed font-normal">
              Slide the central handle left and right to inspect how we transform slow, template-heavy layouts into pristine, premium Next.js platforms.
            </p>
          </div>

          {/* Interactive Slider Container */}
          <div className="max-w-4xl mx-auto space-y-6">
            
            {/* Project switch buttons */}
            <div className="flex gap-2 justify-center">
              <button
                onClick={() => setActiveSliderProject("saas")}
                className={`px-4 py-2 rounded-xl text-xs font-bold font-mono transition-colors cursor-pointer ${
                  activeSliderProject === "saas"
                    ? "bg-[#FE7146] text-white"
                    : "bg-white hover:bg-slate-100 border border-gray-200 text-slate-500"
                }`}
              >
                // SAAS PLATFORM REDESIGN
              </button>
              <button
                onClick={() => setActiveSliderProject("ecomm")}
                className={`px-4 py-2 rounded-xl text-xs font-bold font-mono transition-colors cursor-pointer ${
                  activeSliderProject === "ecomm"
                    ? "bg-[#FE7146] text-white"
                    : "bg-white hover:bg-slate-100 border border-gray-200 text-slate-500"
                }`}
              >
                // E-COMMERCE HUB REDESIGN
              </button>
            </div>

            {/* Slider visual element */}
            <BeforeAfterSlider 
              beforeImg={sliderProjects[activeSliderProject].before}
              afterImg={sliderProjects[activeSliderProject].after}
              beforeLabel={sliderProjects[activeSliderProject].beforeLabel}
              afterLabel={sliderProjects[activeSliderProject].afterLabel}
            />

            <p className="text-slate-400 text-[10px] font-mono leading-none">
              💡 Touch and drag the orange handle indicator left or right to explore layout details.
            </p>
          </div>

        </div>
      </section>

      {/* SECTION 6: Cinematic Portfolio Grid */}
      <section id="portfolio-grid" className="py-20 sm:py-28 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-16">
          
          <div className="space-y-3 max-w-3xl mx-auto">
            <span className="text-xs font-black text-[#FE7146] tracking-widest uppercase font-mono">
              // SELECTED WORK
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[#303360] tracking-tight">
              Websites We&apos;re Extremely Proud Of
            </h2>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed font-normal">
              Each portal is a bespoke case-study engineered specifically to achieve conversion excellence and 100% Core Web Vitals targets.
            </p>
          </div>

          {/* Asymmetric Editorial Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
            {portfolioItems.map((project) => (
              <div
                key={project.id}
                className={`${project.colSpan} bg-[#303360] rounded-3xl border border-white/5 overflow-hidden flex flex-col justify-between hover:shadow-2xl hover:border-[#FE7146]/20 transition-all duration-300 relative group h-[380px] sm:h-[420px] shadow-lg`}
              >
                {/* Embedded dynamic screenshot container */}
                <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
                  <img 
                    src={project.img} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80"
                    referrerPolicy="no-referrer"
                  />
                  {/* Overlay background dark shadow vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/50 to-transparent opacity-90" />
                </div>

                {/* Top browser indicator overlay */}
                <div className="relative z-10 px-5 py-3 bg-slate-950/40 backdrop-blur-xs border-b border-white/5 flex justify-between items-center text-[8px] font-mono text-gray-400">
                  <span>SSL_SECURED_ENDPOINT // Noida HQ</span>
                  <span className="text-[#FE7146] font-bold">✓ {project.result}</span>
                </div>

                {/* Bottom details block (slides up on hover) */}
                <div className="relative z-10 p-6 sm:p-8 space-y-3 mt-auto">
                  <span className="inline-block text-[8px] font-mono font-bold text-[#FE7146] bg-[#FFF1EC] px-2 py-0.5 rounded uppercase">
                    {project.category}
                  </span>
                  
                  <h3 className="font-display font-extrabold text-xl text-white leading-tight">
                    {project.title}
                  </h3>

                  <p className="text-gray-300 text-xs sm:text-sm font-normal leading-relaxed max-w-xl">
                    {project.description}
                  </p>

                  <div className="pt-2 flex items-center justify-between border-t border-white/10">
                    <span className="text-[9px] font-mono text-gray-400 font-bold uppercase">
                      CLIENT: {project.client}
                    </span>
                    <button
                      onClick={onContactClick}
                      className="inline-flex items-center gap-1 text-xs font-black text-[#FE7146] hover:gap-1.5 transition-all cursor-pointer"
                    >
                      <span>View Case Study</span>
                      <ArrowUpRight size={13} />
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 7: Tech Stack - "Under the Hood" */}
      <section id="under-the-hood" className="py-20 sm:py-28 bg-[#303360] text-white relative overflow-hidden text-left">
        {/* Abstract dot indicators */}
        <div className="absolute inset-0 z-0 opacity-5 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]" />
          <div className="absolute bottom-0 right-0 w-[40rem] h-[40rem] bg-[#FE7146] rounded-full filter blur-3xl opacity-20" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            
            {/* Left Header info */}
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-black text-[#FE7146] tracking-widest uppercase font-mono">
                // SYSTEM UNDER THE HOOD
              </span>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight leading-tight">
                Our Front-End &amp; Back-End Tech Integration Stacks
              </h2>
              <p className="text-gray-300 text-sm font-normal leading-relaxed">
                We design and engineer bespoke web setups utilizing clean modular coding environments. Zero visual templates, minimal asset bloat, absolute performance index.
              </p>

              {/* Monospace terminal logs */}
              <div className="bg-slate-950 border border-white/10 p-4 rounded-xl space-y-2 font-mono text-[9px] text-gray-300 shadow-inner">
                <div className="flex items-center gap-1.5 border-b border-white/5 pb-1 text-[#FE7146] font-bold">
                  <Terminal size={12} />
                  <span>SPEED_AUDIT_LOGS</span>
                </div>
                <div className="flex justify-between">
                  <span>Avg. Lighthouse Speed Score:</span>
                  <span className="text-emerald-400">98/100</span>
                </div>
                <div className="flex justify-between">
                  <span>Average Layout Load Time:</span>
                  <span className="text-emerald-400">&lt;1.4s</span>
                </div>
                <div className="flex justify-between">
                  <span>Core Web Vitals Index:</span>
                  <span className="text-emerald-400">PASSED ✓</span>
                </div>
              </div>
            </div>

            {/* Right Badge Grid */}
            <div className="lg:col-span-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                  { name: "React / Next.js", code: "NextJS v15", icon: <Code2 className="w-5 h-5 text-[#FE7146]" /> },
                  { name: "Tailwind CSS", code: "Tailwind v4.0", icon: <Palette className="w-5 h-5 text-[#FE7146]" /> },
                  { name: "TypeScript", code: "Strict Types", icon: <Cpu className="w-5 h-5 text-[#FE7146]" /> },
                  { name: "Figma Studio", code: "Vector Frames", icon: <Monitor className="w-5 h-5 text-[#FE7146]" /> },
                  { name: "Shopify Engine", code: "Headless Retail", icon: <ShoppingCart className="w-5 h-5 text-[#FE7146]" /> },
                  { name: "Node.js Server", code: "API Gateways", icon: <Database className="w-5 h-5 text-[#FE7146]" /> }
                ].map((stack, idx) => (
                  <div
                    key={idx}
                    className="p-5 bg-white/5 border border-white/10 rounded-2xl flex flex-col items-start space-y-3 hover:bg-white/10 hover:border-[#FE7146]/30 transition-all duration-300"
                  >
                    <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-white">
                      {stack.icon}
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-black text-white leading-tight">
                        {stack.name}
                      </h4>
                      <p className="text-[9px] text-[#FE7146] font-mono mt-0.5 font-bold uppercase tracking-wider">
                        {stack.code}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 8: Why Choose Us (Stats with custom count up) */}
      <section id="why-choose-web-dev" className="py-20 sm:py-28 bg-white border-b border-gray-100 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Content column */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-black text-[#FE7146] tracking-widest uppercase font-mono">
                // WHY ANALYTICS CLOUDS
              </span>
              
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[#303360] tracking-tight leading-tight">
                Responsive Design Systems Configured Specifically to Scale Revenue
              </h2>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl font-normal">
                We reject slow templates and pre-built code blocks. We custom-engineer layouts to optimize digital pathways, ensuring direct leads integration.
              </p>

              <div className="space-y-4">
                {[
                  { title: "Mobile Viewport Precision", desc: "Rigorous screen width optimization ensuring touch targets remain comfortable on all smartphone devices." },
                  { title: "Pre-Built Search Semantics", desc: "Pragmatic SEO elements, structural schema data, and proper heading trees configured as standard." },
                  { title: "Fast Lazy-Loading Footprint", desc: "Light asset payloads and advanced script routing designed to execute pages within 1.5 seconds." }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 items-start text-left">
                    <div className="w-8 h-8 rounded-lg bg-[#FFF1EC] text-[#FE7146] flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                      <Check className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-sm sm:text-base text-[#303360]">{item.title}</h4>
                      <p className="text-slate-500 text-xs sm:text-sm font-normal leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Stat Grid */}
            <div className="lg:col-span-6">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: 150, suffix: "+", label: "Websites Delivered" },
                  { value: 98, suffix: "%", label: "Avg PageSpeed Metric" },
                  { value: 92, suffix: "%", label: "Partner Retention Rate" },
                  { value: 8, suffix: "+", label: "Years of Craft Experience" }
                ].map((stat, idx) => (
                  <div
                    key={idx}
                    className="p-6 bg-slate-50 border border-gray-100 hover:border-[#FE7146]/20 rounded-2xl hover:bg-white hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 text-left"
                  >
                    <CountUp end={stat.value} suffix={stat.suffix} />
                    <span className="text-[#303360] text-xs font-extrabold block uppercase tracking-wider mt-2">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 9: Pricing / Packages */}
      <section id="pricing-packages" className="py-20 sm:py-28 bg-slate-50 border-t border-b border-gray-100 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-16">
          
          <div className="space-y-3 max-w-3xl mx-auto">
            <span className="text-xs font-black text-[#FE7146] tracking-widest uppercase font-mono">
              // PRICING MATRIX
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[#303360] tracking-tight">
              Flexible Digital Solutions Tailored to Noida Enterprise Budgets
            </h2>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed font-normal">
              No hidden parameters or server setup fees. Straightforward, transparent project steps matching your growth requirements.
            </p>
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left max-w-6xl mx-auto items-stretch">
            
            {/* Starter Plan */}
            <div className="bg-white border border-gray-200 hover:border-gray-300 rounded-3xl p-6 sm:p-8 flex flex-col justify-between h-full transition-all hover:shadow-xl">
              <div className="space-y-6">
                <div>
                  <h3 className="font-display font-extrabold text-lg text-[#303360]">Starter Package</h3>
                  <p className="text-slate-400 text-xs mt-1 font-normal leading-relaxed">
                    Designed for startups &amp; growing regional Noida businesses searching for a strong, clean core digital presence.
                  </p>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="font-display font-extrabold text-3xl sm:text-4xl text-[#303360]">₹34,999</span>
                  <span className="text-slate-400 text-xs font-semibold">/ project</span>
                </div>
                <div className="w-full h-px bg-slate-100" />
                <ul className="space-y-3 text-slate-500 text-xs sm:text-sm font-medium">
                  {["Up to 5 Responsive Site Pages", "Clean Modern Component Layouts", "Integrated Contact Lead Forms", "Basic Search On-Page SEO", "Free SSL Certificate Setup", "30 Days Post-Launch Support"].map((feat, fIdx) => (
                    <li key={fIdx} className="flex gap-2 items-center">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button
                onClick={onContactClick}
                className="w-full bg-slate-100 hover:bg-slate-200 text-[#303360] font-black text-xs sm:text-sm py-4 rounded-xl mt-8 transition-colors text-center cursor-pointer"
              >
                Get Started Now
              </button>
            </div>

            {/* Growth Plan (Elevated) */}
            <div className="bg-white border-2 border-[#FE7146] rounded-3xl p-8 flex flex-col justify-between h-full relative z-10 shadow-2xl scale-[1.03]">
              
              <div className="absolute -top-4 right-6 bg-[#FE7146] text-white text-[9px] font-black uppercase tracking-widest px-3.5 py-1.5 rounded-full shadow-md animate-pulse">
                MOST POPULAR
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-display font-extrabold text-xl text-[#303360]">Growth Retainer</h3>
                  <p className="text-slate-400 text-xs mt-1 font-normal leading-relaxed">
                    Our flagship comprehensive strategy page package. Tailored for mid-market brands seeking maximum digital leads.
                  </p>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="font-display font-extrabold text-3xl sm:text-4xl text-[#303360]">₹69,999</span>
                  <span className="text-slate-400 text-xs font-semibold">/ project</span>
                </div>
                <div className="w-full h-px bg-slate-100" />
                <ul className="space-y-3 text-slate-500 text-xs sm:text-sm font-medium">
                  {["Up to 10 Tailored Site Pages", "Custom CMS Integration", "Rich Layout Scroll Interactions", "Integrated Google Analytics Core", "Comprehensive Keyword Sitemaps", "90 Days Priority Support Retainer"].map((feat, fIdx) => (
                    <li key={fIdx} className="flex gap-2 items-center">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span className="font-semibold text-gray-800">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button
                onClick={onContactClick}
                className="w-full bg-[#FE7146] hover:bg-[#e0562b] text-white font-black text-xs sm:text-sm py-4 rounded-xl mt-8 transition-all hover:scale-[1.02] active:scale-[0.98] text-center cursor-pointer shadow-lg shadow-[#FE7146]/10"
              >
                Choose Growth Plan
              </button>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-white border border-gray-200 hover:border-gray-300 rounded-3xl p-6 sm:p-8 flex flex-col justify-between h-full transition-all hover:shadow-xl">
              <div className="space-y-6">
                <div>
                  <h3 className="font-display font-extrabold text-lg text-[#303360]">Enterprise Custom</h3>
                  <p className="text-slate-400 text-xs mt-1 font-normal leading-relaxed">
                    Bespoke web setups, server configurations, complex payment APIs, and dynamic database layers.
                  </p>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="font-display font-extrabold text-2xl sm:text-3xl text-[#303360]">Custom Quote</span>
                </div>
                <div className="w-full h-px bg-slate-100" />
                <ul className="space-y-3 text-slate-500 text-xs sm:text-sm font-medium">
                  {["Next.js / React Layout Builds", "Bespoke Headless E-Commerce Layout", "Bespoke Payment Gateway Hooks", "Dynamic Cloud Database Integrations", "Optimized Webpack Asset Tuning", "Lifetime Priority System Monitoring"].map((feat, fIdx) => (
                    <li key={fIdx} className="flex gap-2 items-center">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button
                onClick={onContactClick}
                className="w-full bg-slate-100 hover:bg-slate-200 text-[#303360] font-black text-xs sm:text-sm py-4 rounded-xl mt-8 transition-colors text-center cursor-pointer"
              >
                Contact Sales Team
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 10: FAQ (Accordion) */}
      <section id="web-dev-faq" className="py-20 sm:py-28 bg-white border-b border-gray-100 text-left">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-black text-[#FE7146] tracking-widest uppercase font-mono">
              // FAQ REFERENCE
            </span>
            <h2 className="font-display font-extrabold text-3xl text-[#303360] tracking-tight">
              Frequently Answered Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqItems.map((item, idx) => (
              <div 
                key={idx}
                className="border-b border-gray-100 pb-5"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex justify-between items-center text-left py-3 cursor-pointer group"
                >
                  <h4 className="font-display font-extrabold text-sm sm:text-base text-[#303360] group-hover:text-[#FE7146] transition-colors">
                    {item.question}
                  </h4>
                  <ChevronDown 
                    size={18} 
                    className={`text-[#FE7146] transition-transform duration-300 shrink-0 ml-4 ${
                      openFaq === idx ? "rotate-180" : ""
                    }`} 
                  />
                </button>

                <AnimatePresence initial={false}>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="text-slate-600 text-xs sm:text-sm font-normal leading-relaxed pt-2 pr-4">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 11: CTA Banner */}
      <section id="elevated-cta">
        <CtaBanner onContactClick={onContactClick} />
      </section>

    </div>
  );
}
