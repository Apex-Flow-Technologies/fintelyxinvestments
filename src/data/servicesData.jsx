import React from "react";
import { Milestone, BarChart3, Coins, BookOpen, ShieldCheck, GraduationCap, HeartPulse } from "lucide-react";

export const servicesData = [
  {
    title: "Mutual Funds",
    shortDesc: "Professionally managed and diversified investment solutions designed to help investors achieve their long-term financial goals.",
    icon: <Coins size={26} style={{ color: "var(--accent-green)", filter: "drop-shadow(0 0 8px var(--accent-green-glow))", margin: 0 }} />,
    desc: "Mutual Funds provide professionally managed and diversified investment solutions designed to help investors achieve their long-term financial goals. By pooling assets from various participants, they offer access to structured equities, fixed income, and specialized growth sectors.",
    bullets: ["Diversification", "Expert Management", "Flexible Options", "Highly Affordable", "Liquidity", "Regulated & Transparent"]
  },
  {
    title: "Specialized Investment Funds (SIF)",
    shortDesc: "Advanced investment strategies that bridge the gap between traditional mutual funds and bespoke portfolio solutions for sophisticated investors.",
    icon: <BarChart3 size={26} style={{ color: "var(--accent-green)", filter: "drop-shadow(0 0 8px var(--accent-green-glow))", margin: 0 }} />,
    desc: "Specialized Investment Funds (SIF) offer advanced investment strategies that bridge the gap between traditional mutual funds and bespoke portfolio solutions for sophisticated investors. They focus on targeted market themes, high-conviction portfolios, and tailored exposure parameters.",
    bullets: ["Research-backed recommendations", "Access to best-in-class fund managers", "Transparent, unbiased guidance", "Long-term partnership approach", "Tailored portfolio structuring"]
  },
  {
    title: "Portfolio Management Services (PMS)",
    shortDesc: "Customized portfolio management tailored to your financial objectives, with dedicated oversight from experienced investment professionals.",
    icon: <BookOpen size={26} style={{ color: "var(--accent-green)", filter: "drop-shadow(0 0 8px var(--accent-green-glow))", margin: 0 }} />,
    desc: "Portfolio Management Services (PMS) deliver customized portfolio management tailored to your financial objectives, with dedicated oversight from experienced investment professionals. This specialized service provides enhanced control, active management, and strategic asset allocation for substantial portfolios.",
    bullets: ["Custom-Built Portfolios", "Active, Strategic Management", "Better Transparency & Control", "Designed for Long-Term Growth", "Ideal for HNIs & Serious Investors"]
  },
  {
    title: "Alternative Investment Funds (AIF)",
    shortDesc: "Access exclusive investment opportunities beyond traditional asset classes through professionally managed alternative investment strategies.",
    icon: <Milestone size={26} style={{ color: "var(--accent-green)", filter: "drop-shadow(0 0 8px var(--accent-green-glow))", margin: 0 }} />,
    desc: "Alternative Investment Funds (AIF) unlock access to exclusive investment opportunities beyond traditional asset classes through professionally managed alternative investment strategies. AIFs target specialized vehicles like venture capital, private equity, structured credit, and long-short strategies.",
    bullets: ["High-Conviction Opportunities", "Advanced Portfolio Diversification", "Professional, High-Expertise Management", "Enhanced Return Potential", "Ideal for High-Net-Worth Investors"]
  },
  {
    title: "Retirement Planning",
    shortDesc: "A personalized retirement strategy designed to help you enjoy financial freedom in your golden years.",
    icon: <ShieldCheck size={26} style={{ color: "var(--accent-green)", filter: "drop-shadow(0 0 8px var(--accent-green-glow))", margin: 0 }} />,
    desc: "Retirement Planning offers a personalized retirement strategy designed to help you enjoy financial freedom in your golden years. We establish secure distribution strategies, inflation-hedging models, and cash flow structures to preserve your lifestyle independence.",
    bullets: ["Maintain lifestyle independence", "Combat inflation & healthcare costs", "Ensure lifelong income sustainability", "Focus on stable, secure returns"]
  },
  {
    title: "Child Education Funding",
    shortDesc: "Build a dedicated corpus to support your child's educational aspirations and future opportunities with confidence.",
    icon: <GraduationCap size={26} style={{ color: "var(--accent-green)", filter: "drop-shadow(0 0 8px var(--accent-green-glow))", margin: 0 }} />,
    desc: "Child Education Funding helps you build a dedicated corpus to support your child's educational aspirations and future opportunities with confidence. We map out balanced, multi-stage wealth strategies to address rising academic costs without compromising stability.",
    bullets: ["Combat rising education costs", "Multi-stage academic & career planning", "Reduce debt burden & funding uncertainty", "Balanced growth & capital safety"]
  },
  {
    title: "Insurance (Term & Health)",
    shortDesc: "Comprehensive Term Life and Health Insurance solutions carefully selected from India’s trusted insurers.",
    icon: <HeartPulse size={26} style={{ color: "var(--accent-green)", filter: "drop-shadow(0 0 8px var(--accent-green-glow))", margin: 0 }} />,
    desc: "Financial success means little without security. At Fintelyx Investments, we help individuals, families, and businesses safeguard their future with comprehensive Term Life and Health Insurance solutions—carefully selected from India’s most trusted insurers.",
    bullets: ["Your family’s financial well-being", "Continuity of life goals", "Protection from rising healthcare costs", "Peace of mind at every stage of life"]
  }
];
