import React from "react";
import { Milestone, BarChart3, Coins, BookOpen, ShieldCheck, GraduationCap, HeartPulse } from "lucide-react";

export const servicesData = [
  {
    title: "Mutual Funds",
    shortDesc: "Registered mutual fund distribution, systematic onboarding, and systematic investment plan (SIP) mapping.",
    icon: <Coins size={26} style={{ color: "var(--accent-green)", filter: "drop-shadow(0 0 8px var(--accent-green-glow))", margin: 0 }} />,
    desc: "At Fintelyx Investments, we believe that wealth creation should be simple, transparent, and truly aligned with your financial goals. Mutual Funds are one of the most effective ways to build long-term prosperity—offering diversification, professional fund management, and the potential for superior returns.",
    bullets: ["Diversification", "Expert Management", "Flexible Options", "Highly Affordable", "Liquidity", "Regulated & Transparent"]
  },
  {
    title: "Specialised Investment Funds (SIF)",
    shortDesc: "Curated access to focused equity, debt, and hybrid strategies tailored to your risk profile.",
    icon: <BarChart3 size={26} style={{ color: "var(--accent-green)", filter: "drop-shadow(0 0 8px var(--accent-green-glow))", margin: 0 }} />,
    desc: "We understand that sophisticated investors require more than standard market solutions. Specialised Investment Funds (SIF) (SIFs) offer access to high-potential opportunities that go beyond traditional instruments designed for those who seek strategic diversification, enhanced growth, and long-term value creation.",
    bullets: ["Research-backed recommendations", "Access to best-in-class fund managers", "Transparent, unbiased guidance", "Long-term partnership approach", "Tailored portfolio structuring"]
  },
  {
    title: "Portfolio Management Services (PMS)",
    shortDesc: "Introductions to top PMS managers aligned to your long-term wealth growth goals.",
    icon: <BookOpen size={26} style={{ color: "var(--accent-green)", filter: "drop-shadow(0 0 8px var(--accent-green-glow))", margin: 0 }} />,
    desc: "We recognize that successful wealth creation requires more than standard investment products—it demands precision, strategy, and dedicated expertise. Portfolio Management Services (PMS) are designed for investors who want a highly customized, actively managed investment portfolio.",
    bullets: ["Custom-Built Portfolios", "Active, Strategic Management", "Better Transparency & Control", "Designed for Long-Term Growth", "Ideal for HNIs & Serious Investors"]
  },
  {
    title: "Alternative Investment Funds (AIF)",
    shortDesc: "Access to private equity, venture capital, long-short strategies, and structured credit solutions.",
    icon: <Milestone size={26} style={{ color: "var(--accent-green)", filter: "drop-shadow(0 0 8px var(--accent-green-glow))", margin: 0 }} />,
    desc: "We offer access to Alternative Investment Funds (AIFs)—a powerful gateway for investors seeking high-growth, high-quality opportunities beyond traditional investment products. AIFs are crafted for those who demand deeper diversification, strategic exposure, and institutional-grade practices.",
    bullets: ["High-Conviction Opportunities", "Advanced Portfolio Diversification", "Professional, High-Expertise Management", "Enhanced Return Potential", "Ideal for High-Net-Worth Investors"]
  },
  {
    title: "Retirement Planning",
    shortDesc: "Comprehensive retirement planning, cashflow scheduling, and complementary protection/insurance solutions.",
    icon: <ShieldCheck size={26} style={{ color: "var(--accent-green)", filter: "drop-shadow(0 0 8px var(--accent-green-glow))", margin: 0 }} />,
    desc: "Retirement Planning helps you build a secure and comfortable life after work. We design structured financial plans that ensure regular income, wealth protection, and peace of mind, so you can enjoy your retirement without depending on others.",
    bullets: ["Maintain lifestyle lifestyle independence", "Combat inflation & healthcare costs", "Ensure lifelong income sustainability", "Focus on stable, secure returns"]
  },
  {
    title: "Child Education Funding",
    shortDesc: "Future-ready child education funding plans to cover collegiate and higher academic milestones.",
    icon: <GraduationCap size={26} style={{ color: "var(--accent-green)", filter: "drop-shadow(0 0 8px var(--accent-green-glow))", margin: 0 }} />,
    desc: "Child Education Funding helps you plan and secure your child’s academic future without financial stress. We create smart, long-term investment strategies to cover school, college, and higher education expenses, ensuring your child’s dreams are never limited by money.",
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
