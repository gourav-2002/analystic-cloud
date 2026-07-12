/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import {
  Search,
  Target,
  Share2,
  Code2,
  Mail,
  Tv,
  MessageSquare,
  TrendingUp,
  ArrowRight,
  Database,
  Award,
  CheckCircle,
  Users,
  ChevronRight,
  Sparkles,
  Zap,
  BarChart2,
  Star,
  Quote
} from "lucide-react";
import { CtaBanner } from "../components/CtaBanner";

// Intersection Observer Counter for counting up once when scrolled into view
function ScrollCounter({
  endValue,
  suffix = "",
  prefix = "",
  delay = 0,
  duration = 1500
}: {
  endValue: number;
  suffix?: string;
  prefix?: string;
  delay?: number;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          // Wait for custom delay before triggering
          setTimeout(() => {
            setHasStarted(true);
          }, delay);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [hasStarted, delay]);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number | null = null;
    const startValue = 0;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing: easeOutQuad
      const easedProgress = progress * (2 - progress);
      const currentValue = Math.floor(startValue + easedProgress * (endValue - startValue));

      setCount(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(endValue);
      }
    };

    requestAnimationFrame(animate);
  }, [hasStarted, endValue, duration]);

  return (
    <div ref={ref} className="inline-block">
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </div>
  );
}

// Counter that triggers on load with a delay
function DelayedCounter({
  endValue,
  suffix = "",
  prefix = "",
  delay = 500,
  duration = 1500
}: {
  endValue: number;
  suffix?: string;
  prefix?: string;
  delay?: number;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const [shouldStart, setShouldStart] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldStart(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!shouldStart) return;

    let startTime: number | null = null;
    const startValue = 0;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      const easedProgress = progress * (2 - progress);
      const currentValue = Math.floor(startValue + easedProgress * (endValue - startValue));

      setCount(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(endValue);
      }
    };

    requestAnimationFrame(animate);
  }, [shouldStart, endValue, duration]);

  return (
    <span className="font-mono">
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

interface HomeProps {
  onContactClick: () => void;
}

export function Home({ onContactClick }: HomeProps) {
  const navigate = useNavigate();
  const [hoveredService, setHoveredService] = useState<number | null>(null);

  // 8 services with descriptive icons, details, metrics, and matching routes
  const services = [
    {
      title: "Search Engine Optimization (SEO)",
      icon: <Search className="w-5 h-5 text-[#FE7146]" />,
      bg: "bg-[#FFF1EC]",
      desc: "Rank higher on Google and secure high-value organic traffic that actively converts.",
      metric: "+230% Organic Traffic",
      path: "/seo"
    },
    {
      title: "Performance Marketing (Google Ads)",
      icon: <Target className="w-5 h-5 text-indigo-600" />,
      bg: "bg-indigo-50",
      desc: "Drive targeted high-intent leads with search, shopping, and optimized campaigns.",
      metric: "4.8x Average ROAS",
      path: "/google-ads"
    },
    {
      title: "Social Media Marketing",
      icon: <Share2 className="w-5 h-5 text-sky-500" />,
      bg: "bg-sky-50",
      desc: "Build community and scale social sales across Instagram, Facebook, and LinkedIn.",
      metric: "+180% Engagement",
      path: "/performance-marketing" // links to related performance marketing
    },
    {
      title: "Web Design & Development",
      icon: <Code2 className="w-5 h-5 text-emerald-600" />,
      bg: "bg-emerald-50",
      desc: "Speed-optimized, conversion-focused websites engineered for seamless UX.",
      metric: "98+ PageSpeed Score",
      path: "/web-design-development"
    },
    {
      title: "Email Marketing Automation",
      icon: <Mail className="w-5 h-5 text-purple-600" />,
      bg: "bg-purple-50",
      desc: "Nurture cold leads and drive high customer lifetime value with tailored flows.",
      metric: "32% Avg. Open Rate",
      path: "/email-marketing"
    },
    {
      title: "SMS Marketing Solutions",
      icon: <MessageSquare className="w-5 h-5 text-teal-600" />,
      bg: "bg-teal-50",
      desc: "Reach customers instantly with personalized, direct sms promotions.",
      metric: "98% Open Rate",
      path: "/sms-marketing"
    },
    {
      title: "Display & Native Ads",
      icon: <Tv className="w-5 h-5 text-amber-600" />,
      bg: "bg-amber-50",
      desc: "Build highly contextual visual awareness across top online publications.",
      metric: "0.8% Average CTR",
      path: "/display-native-ads"
    },
    {
      title: "Performance Marketing (Full-Suite)",
      icon: <TrendingUp className="w-5 h-5 text-rose-600" />,
      bg: "bg-rose-50",
      desc: "Holistic marketing strategy integrating multi-channel attribution and scaling.",
      metric: "40% Lower CPA",
      path: "/performance-marketing"
    }
  ];

  // Client industry badges marquee
  const industries = [
    "Healthcare",
    "EdTech",
    "E-commerce",
    "SaaS",
    "Real Estate",
    "B2B Services",
    "FinTech",
    "Logistics"
  ];

  // Why Choose Us differentiators
  const differentiators = [
    {
      icon: <Database className="w-5 h-5 text-[#FE7146]" />,
      title: "Data-Driven Strategy",
      desc: "We analyze cold, hard market data instead of relying on emotional guesses to align your marketing budget."
    },
    {
      icon: <TrendingUp className="w-5 h-5 text-[#FE7146]" />,
      title: "ROI-Focused Approach",
      desc: "Every creative asset and media buy is aggressively optimized to maximize customer acquisition value."
    },
    {
      icon: <Award className="w-5 h-5 text-[#FE7146]" />,
      title: "Experienced, Certified Team",
      desc: "A handpicked roster of senior campaign managers, data analysts, and design craft specialists."
    },
    {
      icon: <CheckCircle className="w-5 h-5 text-[#FE7146]" />,
      title: "Transparent Reporting",
      desc: "Live performance dashboards and weekly review calls keep you updated on actual conversion stats."
    }
  ];

  // Why Choose Us stats
  const stats = [
    { value: 200, suffix: "+", label: "Happy Clients", desc: "Across India" },
    { value: 500, suffix: "+", label: "Campaigns Delivered", desc: "High-yield funnels" },
    { value: 98, suffix: "%", label: "Client Retention Rate", desc: "Long-term partnerships" },
    { value: 7, suffix: "+", label: "Years of Experience", desc: "Proven track record" }
  ];

  // Photography-forward Case Studies
  const caseStudies = [
    {
      category: "SEO",
      categoryBg: "bg-indigo-50 text-indigo-700",
      title: "How We Increased Organic Traffic by 230% for a Healthcare Brand",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80",
      headlineResult: "+230% Organic Traffic",
      metrics: ["2.1k Keywords Ranked", "45% Lower CPA"],
      path: "/seo"
    },
    {
      category: "Google Ads",
      categoryBg: "bg-orange-50 text-[#FE7146]",
      title: "Generated 4X More Lead Conversions for an EduTech Platform",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
      headlineResult: "4X Leads Delivered",
      metrics: ["42% CTR Lift", "3.2x Campaign ROI"],
      path: "/google-ads"
    },
    {
      category: "Social Media",
      categoryBg: "bg-pink-50 text-pink-700",
      title: "Boosted Social Engagement by 180% for an E-commerce Brand",
      image: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=800&q=80",
      headlineResult: "+180% Engagement",
      metrics: ["2.5x Revenue Growth", "30k+ New Followers"],
      path: "/performance-marketing"
    }
  ];

  // Testimonials with outcome-specific quotes
  const testimonials = [
    {
      quote: "Analytics Clouds helped us scale our digital footprint like never before. Their SEO and Google Ads strategies delivered highly qualified clinic bookings, resulting in a 2.5x growth in revenue in just 3 months!",
      author: "Rahul Sharma",
      role: "Marketing Head",
      company: "Redcliffe Labs",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80"
    },
    {
      quote: "A genuinely elite performance marketing team. Their deep understanding of user journeys and ad conversion optimization helped us achieve a 4X increase in student registrations while dropping CPA by 35%.",
      author: "Neha Verma",
      role: "Founder",
      company: "Study Smart",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80"
    },
    {
      quote: "Their performance campaigns yielded an exceptional ROI from week one. We appreciate their strict data integrity and transparency—having access to live custom dashboards instead of generic end-of-month PDFs is a game changer.",
      author: "Amit Malhotra",
      role: "CEO",
      company: "Home Decor India",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80"
    }
  ];

  // Blog Insights
  const blogPosts = [
    {
      category: "SEO",
      date: "July 10, 2026",
      title: "10 Proven SEO Strategies to Rank Higher on Google in 2026",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&h=400&q=80"
    },
    {
      category: "Google Ads",
      date: "July 8, 2026",
      title: "Google Ads vs Facebook Ads: Which is Better for Your Business?",
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&h=400&q=80"
    },
    {
      category: "Content Marketing",
      date: "July 5, 2026",
      title: "How to Create SEO-Friendly Content That Ranks & Converts",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&h=400&q=80"
    }
  ];

  return (
    <div className="bg-white overflow-hidden">
      {/* 1. Hero — Real, Full-Width Photography */}
      <section className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center justify-center pt-16 overflow-hidden bg-[#303360]">
        {/* Full-bleed background photograph */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://res.cloudinary.com/dqjlffxja/image/upload/v1783866909/firsrt-try_lpqjzv.jpg"
            
            alt="Analytics Clouds Campaign Strategy Team"
            className="w-full h-full object-cover object-center scale-105 filter brightness-95"
            referrerPolicy="no-referrer"
          />
          {/* Subtle navy gradient scrim ensuring deep contrast and complete legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#303360] via-[#303360]/85 to-[#303360]/30 sm:from-[#303360]/95 sm:via-[#303360]/80 sm:to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#303360] via-[#303360]/40 to-transparent lg:hidden" />
        </div>

        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left side content overlaid on scrim */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-left">
              {/* Eyebrow tag */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-block font-mono text-xs font-semibold text-[#FE7146] tracking-wider uppercase bg-[#FFF1EC]/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#FE7146]/30"
              >
                // PERFORMANCE MARKETING AGENCY · NOIDA
              </motion.div>

              {/* Clamp-based headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight font-display"
              >
                We Turn Clicks Into Customers, and Data Into{" "}
                <span className="text-[#FE7146] inline-block relative">
                  Growth.
                  <span className="absolute left-0 bottom-1 w-full h-1 bg-[#FE7146]/20 rounded" />
                </span>
              </motion.h1>

              {/* Subcopy */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-gray-200 text-base sm:text-lg font-normal leading-relaxed max-w-xl"
              >
                Analytics Clouds is a leading performance-driven digital marketing agency helping brands in Noida and across India scale with data intelligence and flawless multi-channel execution.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
              >
                <button
                  onClick={onContactClick}
                  className="bg-[#FE7146] hover:bg-[#e0562b] text-white font-extrabold px-8 py-4 rounded-xl shadow-lg shadow-[#FE7146]/25 hover:shadow-[#FE7146]/35 transition-all text-center flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                >
                  <span>Get a Free Growth Audit</span>
                  <TrendingUp size={18} />
                </button>

                <button
                  onClick={() => navigate("/services")}
                  className="border-2 border-white/60 hover:border-white text-white font-bold px-8 py-4 rounded-xl transition-all text-center flex items-center justify-center gap-2 hover:bg-white/10 active:scale-[0.98] cursor-pointer"
                >
                  <span>Explore Our Work</span>
                  <ArrowRight size={18} className="text-[#FE7146]" />
                </button>
              </motion.div>
            </div>

          </div>
        </div>

        {/* Slow horizontal drifting marquee at the bottom fold */}
        <div className="absolute bottom-0 left-0 right-0 bg-[#303360]/90 backdrop-blur-sm border-t border-white/5 py-4 overflow-hidden z-20">
          <style>{`
            @keyframes marquee {
              0% { transform: translateX(0%); }
              100% { transform: translateX(-50%); }
            }
            .animate-marquee {
              animation: marquee 35s linear infinite;
            }
          `}</style>
          
          <div className="flex w-[200%] animate-marquee whitespace-nowrap hover:[animation-play-state:paused] cursor-pointer">
            <div className="flex gap-16 justify-around items-center w-1/2">
              {industries.map((ind, i) => (
                <div key={i} className="flex items-center gap-3 text-white/70 font-display font-medium text-sm">
                  <span className="text-[#FE7146] font-bold">//</span>
                  <span>{ind} Solutions</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                </div>
              ))}
            </div>
            <div className="flex gap-16 justify-around items-center w-1/2">
              {industries.map((ind, i) => (
                <div key={`dup-${i}`} className="flex items-center gap-3 text-white/70 font-display font-medium text-sm">
                  <span className="text-[#FE7146] font-bold">//</span>
                  <span>{ind} Solutions</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. The Craft Statement (editorial breather section) */}
      <section className="bg-white py-20 sm:py-28 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <Quote size={40} className="mx-auto text-orange-200" />
            <h2 className="font-display font-bold text-2xl sm:text-4xl text-[#303360] leading-snug tracking-tight max-w-3xl mx-auto">
              "Marketing isn't about being loud. It's about being{" "}
              <span className="text-[#FE7146]">found by the right people, at the right time.</span>"
            </h2>
            <div className="h-0.5 w-16 bg-gradient-to-r from-[#FE7146] to-indigo-500 mx-auto mt-6" />
          </motion.div>
        </div>
      </section>

      {/* 3. Services — Expand-on-Interaction Preview */}
      <section className="py-24 bg-[#F5F5FA] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold text-[#FE7146] tracking-widest uppercase font-mono block">
              // WHAT WE DO
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-[#303360] leading-tight tracking-tight">
              Every Channel. One Team.
            </h2>
            <p className="text-[#333333]/70 text-base max-w-xl mx-auto font-normal">
              A condensed snapshot of our multi-channel execution engines. Hover or tap to expand real stats.
            </p>
          </div>

          {/* Interactive expand-on-hover service tiles */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((svc, i) => {
              const isAnyHovered = hoveredService !== null;
              const isThisHovered = hoveredService === i;

              return (
                <div
                  key={i}
                  onMouseEnter={() => setHoveredService(i)}
                  onMouseLeave={() => setHoveredService(null)}
                  onClick={() => setHoveredService(hoveredService === i ? null : i)}
                  className={`relative overflow-hidden cursor-pointer bg-white p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between h-[270px] ${
                    isThisHovered
                      ? "border-[#FE7146]/30 shadow-2xl scale-[1.03] z-10"
                      : isAnyHovered
                      ? "border-gray-100 opacity-60 scale-[0.98] blur-[0.5px]"
                      : "border-gray-100 shadow-md"
                  }`}
                >
                  <div className="space-y-4 text-left">
                    {/* Icon container */}
                    <div className={`w-10 h-10 rounded-xl ${svc.bg} flex items-center justify-center transition-transform duration-300 ${isThisHovered ? "scale-110" : ""}`}>
                      {svc.icon}
                    </div>

                    {/* Title */}
                    <h3 className="font-display font-bold text-[#303360] text-base leading-snug group-hover:text-[#FE7146] transition-colors">
                      {svc.title}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-600 text-xs sm:text-sm font-normal leading-relaxed line-clamp-3">
                      {svc.desc}
                    </p>
                  </div>

                  {/* Expandable Section with short metric and link */}
                  <div className="pt-4 border-t border-gray-50 flex flex-col space-y-2 text-left">
                    {/* Smooth height and opacity expand */}
                    <div className={`transition-all duration-300 overflow-hidden ${isThisHovered ? "max-h-16 opacity-100" : "max-h-0 opacity-0"}`}>
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 font-mono bg-emerald-50 px-2.5 py-1 rounded-md w-fit mb-2">
                        <Zap size={12} className="fill-emerald-600" />
                        <span>{svc.metric}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <Link
                        to={svc.path}
                        className="inline-flex items-center gap-1 text-xs font-extrabold text-[#FE7146] hover:gap-2 transition-all"
                      >
                        <span>Learn More</span>
                        <ArrowRight size={14} />
                      </Link>
                      <ChevronRight size={14} className={`text-slate-300 transition-transform ${isThisHovered ? "rotate-90 text-[#FE7146]" : ""}`} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Suffix hub link */}
          <div className="text-center mt-12">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-sm font-extrabold text-[#303360] hover:text-[#FE7146] transition-colors"
            >
              <span>View All Services</span>
              <ArrowRight size={16} className="text-[#FE7146]" />
            </Link>
          </div>

        </div>
      </section>

      {/* 4. Why Choose Us — photography + stats */}
      <section className="relative bg-[#303360] text-white overflow-hidden min-h-[600px] flex items-stretch">
        <div className="grid grid-cols-1 lg:grid-cols-12 w-full">
          
          {/* Left Column: Second Real Photograph with scrim */}
          <div className="lg:col-span-5 relative min-h-[350px] lg:min-h-full overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=85"
              alt="Analytics Clouds client and campaign team meeting"
              className="absolute inset-0 w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {/* Scrim overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#303360] hidden lg:block" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#303360] to-transparent lg:hidden" />
          </div>

          {/* Right Column: Navy Background & Stats + Differentiators */}
          <div className="lg:col-span-7 py-20 px-6 sm:px-12 lg:px-16 flex flex-col justify-center space-y-12 text-left relative z-10">
            <div className="space-y-4">
              <span className="text-xs font-bold text-[#FE7146] tracking-widest uppercase font-mono block">
                // WHY CHOOSE US
              </span>
              <h2 className="font-display font-black text-3xl sm:text-4xl text-white leading-tight tracking-tight">
                We Build Highly Efficient Growth Engines
              </h2>
              <p className="text-gray-300 text-sm sm:text-base font-normal max-w-xl">
                We bridge the gap between creative execution and scientific campaign scaling to produce measurable returns on your ad spends.
              </p>
            </div>

            {/* Differentiators */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {differentiators.map((diff, i) => (
                <div key={i} className="flex gap-4 items-start group">
                  <div className="p-3 bg-white/10 rounded-xl group-hover:bg-[#FE7146]/20 transition-colors shrink-0">
                    {diff.icon}
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-display font-bold text-white text-sm sm:text-base">
                      {diff.title}
                    </h3>
                    <p className="text-gray-300 text-xs sm:text-sm font-normal leading-relaxed">
                      {diff.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* 2x2 Stat Cards Grid */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/10">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="bg-white/5 backdrop-blur-sm p-5 rounded-2xl border border-white/10 hover:border-[#FE7146]/40 transition-all duration-300 text-left hover:bg-gradient-to-br hover:from-white/10 hover:to-[#FE7146]/5 hover:shadow-lg"
                >
                  <div className="space-y-1">
                    <div className="text-2xl sm:text-3xl font-mono font-black text-[#FE7146] tracking-tight">
                      <ScrollCounter endValue={stat.value} suffix={stat.suffix} delay={100 * i} />
                    </div>
                    <div className="font-display font-bold text-sm text-white">
                      {stat.label}
                    </div>
                    <div className="text-[11px] text-gray-400 font-medium">
                      {stat.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 5. Real Results — Case Studies */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold text-[#FE7146] tracking-widest uppercase font-mono block">
              // CASE STUDIES
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-[#303360] leading-tight tracking-tight">
              Real Results. Real Impact.
            </h2>
            <p className="text-[#333333]/70 text-base max-w-xl mx-auto font-normal">
              Explore concrete examples of how our performance strategies drive massive revenue and customer pipeline growths.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {caseStudies.map((cs, i) => (
              <div
                key={i}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-[#FE7146]/20 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between text-left"
              >
                <div>
                  {/* Photo container with zoom on hover */}
                  <div className="h-52 overflow-hidden relative">
                    <img
                      src={cs.image}
                      alt={cs.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <span className={`absolute top-4 left-4 text-[11px] font-bold font-mono uppercase tracking-wider px-3 py-1 rounded-md ${cs.categoryBg}`}>
                      {cs.category}
                    </span>
                  </div>

                  <div className="p-6 space-y-4">
                    {/* Headline Result Stat */}
                    <div className="flex items-center gap-2 text-emerald-600 font-mono font-black text-lg">
                      <Zap size={16} className="fill-emerald-600" />
                      <span>{cs.headlineResult}</span>
                    </div>

                    {/* Title */}
                    <h3 className="font-display font-bold text-lg text-[#303360] leading-snug group-hover:text-[#FE7146] transition-colors line-clamp-2">
                      {cs.title}
                    </h3>

                    {/* Supporting metrics list */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {cs.metrics.map((metric, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] font-semibold text-slate-500 bg-[#F5F5FA] px-2.5 py-1 rounded-full border border-gray-100"
                        >
                          {metric}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Link */}
                <div className="px-6 pb-6 pt-2">
                  <Link
                    to={cs.path}
                    className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#FE7146] hover:gap-2.5 transition-all"
                  >
                    <span>View Case Study</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. What Our Clients Say (Testimonials) */}
      <section className="py-24 bg-[#FFF1EC]/20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold text-[#FE7146] tracking-widest uppercase font-mono block">
              // TESTIMONIALS
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-[#303360] leading-tight tracking-tight">
              What Our Clients Say
            </h2>
            <p className="text-[#333333]/70 text-base max-w-xl mx-auto font-normal">
              Specific, concrete growth outcomes shared by verified business leaders who scaled with us.
            </p>
          </div>

          {/* Testimonial Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {testimonials.map((test, i) => (
              <div
                key={i}
                className="bg-white p-8 rounded-2xl border border-gray-100 shadow-md flex flex-col justify-between hover:shadow-xl hover:border-[#FE7146]/10 transition-all duration-300 text-left"
              >
                <div className="space-y-6">
                  {/* Quotes Icon */}
                  <Quote size={28} className="text-[#FE7146] opacity-35" />
                  
                  {/* Quote Body */}
                  <p className="text-slate-600 text-sm leading-relaxed italic">
                    "{test.quote}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-4 pt-6 mt-6 border-t border-gray-50">
                  <img
                    src={test.avatar}
                    alt={test.author}
                    className="w-11 h-11 rounded-full object-cover ring-2 ring-[#FE7146]/20"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="font-display font-bold text-sm text-[#303360] leading-snug">
                      {test.author}
                    </h4>
                    <p className="text-[11px] text-slate-500 font-medium">
                      {test.role}, <strong className="text-[#FE7146] font-semibold">{test.company}</strong>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. Latest Insights (Blog Preview) */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold text-[#FE7146] tracking-widest uppercase font-mono block">
              // LATEST INSIGHTS
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-[#303360] leading-tight tracking-tight">
              Marketing Strategy Decoded
            </h2>
            <p className="text-[#333333]/70 text-base max-w-xl mx-auto font-normal">
              Practical guides and actionable insights from our senior performance strategists.
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, i) => (
              <div
                key={i}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between text-left"
              >
                <div>
                  <div className="h-48 overflow-hidden relative">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-[10px] font-bold font-mono text-[#303360] uppercase px-2.5 py-1 rounded-md shadow-sm border border-gray-100">
                      {post.category}
                    </span>
                  </div>

                  <div className="p-6 space-y-2">
                    <span className="text-[10px] text-slate-400 font-mono font-medium block">
                      {post.date}
                    </span>
                    <h3 className="font-display font-bold text-base text-[#303360] leading-snug group-hover:text-[#FE7146] transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2">
                  <Link
                    to="/blog"
                    className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#FE7146] hover:gap-2.5 transition-all"
                  >
                    <span>Read More</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Suffix link */}
          <div className="text-center mt-12">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm font-extrabold text-[#303360] hover:text-[#FE7146] transition-colors"
            >
              <span>View All Articles</span>
              <ArrowRight size={16} className="text-[#FE7146]" />
            </Link>
          </div>

        </div>
      </section>

      {/* 8. CTA Banner (Shared global style component) */}
      <CtaBanner onContactClick={onContactClick} />
    </div>
  );
}
