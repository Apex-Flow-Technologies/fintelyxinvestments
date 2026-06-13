import React from "react";
import { Sparkles, ArrowRight, ShieldCheck, Milestone, BarChart3, Coins, BookOpen, HeartPulse, GraduationCap } from "lucide-react";
import "../../styles/landing.css";

export default function ServicesPage({ onNavToCalculators }) {
  const services = [
    {
      title: "Mutual Funds",
      icon: <Coins size={26} style={{ color: "var(--accent-green)", filter: "drop-shadow(0 0 8px var(--accent-green-glow))", margin: 0 }} />,
      desc: "At Fintelyx Investments, we believe that wealth creation should be simple, transparent, and truly aligned with your financial goals. Mutual Funds are one of the most effective ways to build long-term prosperity—offering diversification, professional fund management, and the potential for superior returns.",
      bullets: ["Diversification", "Expert Management", "Flexible Options", "Highly Affordable", "Liquidity", "Regulated & Transparent"]
    },
    {
      title: "Specialised Investment Funds",
      icon: <BarChart3 size={26} style={{ color: "var(--accent-green)", filter: "drop-shadow(0 0 8px var(--accent-green-glow))", margin: 0 }} />,
      desc: "We understand that sophisticated investors require more than standard market solutions. Specialised Investment Funds (SIFs) offer access to high-potential opportunities that go beyond traditional instruments designed for those who seek strategic diversification, enhanced growth, and long-term value creation.",
      bullets: ["Research-backed recommendations", "Access to best-in-class fund managers", "Transparent, unbiased guidance", "Long-term partnership approach", "Tailored portfolio structuring"]
    },
    {
      title: "Portfolio Management Services (PMS)",
      icon: <BookOpen size={26} style={{ color: "var(--accent-green)", filter: "drop-shadow(0 0 8px var(--accent-green-glow))", margin: 0 }} />,
      desc: "We recognize that successful wealth creation requires more than standard investment products—it demands precision, strategy, and dedicated expertise. Portfolio Management Services (PMS) are designed for investors who want a highly customized, actively managed investment portfolio.",
      bullets: ["Custom-Built Portfolios", "Active, Strategic Management", "Better Transparency & Control", "Designed for Long-Term Growth", "Ideal for HNIs & Serious Investors"]
    },
    {
      title: "Alternative Investment Funds (AIF)",
      icon: <Milestone size={26} style={{ color: "var(--accent-green)", filter: "drop-shadow(0 0 8px var(--accent-green-glow))", margin: 0 }} />,
      desc: "We offer access to Alternative Investment Funds (AIFs)—a powerful gateway for investors seeking high-growth, high-quality opportunities beyond traditional investment products. AIFs are crafted for those who demand deeper diversification, strategic exposure, and institutional-grade practices.",
      bullets: ["High-Conviction Opportunities", "Advanced Portfolio Diversification", "Professional, High-Expertise Management", "Enhanced Return Potential", "Ideal for High-Net-Worth Investors"]
    },
    {
      title: "Retirement Planning",
      icon: <ShieldCheck size={26} style={{ color: "var(--accent-green)", filter: "drop-shadow(0 0 8px var(--accent-green-glow))", margin: 0 }} />,
      desc: "Retirement Planning helps you build a secure and comfortable life after work. We design structured financial plans that ensure regular income, wealth protection, and peace of mind, so you can enjoy your retirement without depending on others.",
      bullets: ["Maintain lifestyle lifestyle independence", "Combat inflation & healthcare costs", "Ensure lifelong income sustainability", "Focus on stable, secure returns"]
    },
    {
      title: "Child Education Funding",
      icon: <GraduationCap size={26} style={{ color: "var(--accent-green)", filter: "drop-shadow(0 0 8px var(--accent-green-glow))", margin: 0 }} />,
      desc: "Child Education Funding helps you plan and secure your child’s academic future without financial stress. We create smart, long-term investment strategies to cover school, college, and higher education expenses, ensuring your child’s dreams are never limited by money.",
      bullets: ["Combat rising education costs", "Multi-stage academic & career planning", "Reduce debt burden & funding uncertainty", "Balanced growth & capital safety"]
    },
    {
      title: "Insurance (Term & Health)",
      icon: <HeartPulse size={26} style={{ color: "var(--accent-green)", filter: "drop-shadow(0 0 8px var(--accent-green-glow))", margin: 0 }} />,
      desc: "Financial success means little without security. At Fintelyx Investments, we help individuals, families, and businesses safeguard their future with comprehensive Term Life and Health Insurance solutions—carefully selected from India’s most trusted insurers.",
      bullets: ["Your family’s financial well-being", "Continuity of life goals", "Protection from rising healthcare costs", "Peace of mind at every stage of life"]
    }
  ];

  return (
    <div className="services-viewport animate-fade-in" style={{ padding: "40px 0" }}>
      
      {/* 1. Page Header */}
      <div className="hub-header">
        <span className="badge-glow-green flex-center">
          <Sparkles size={12} /> Curated Wealth Services
        </span>
        <h2>Our Financial Solutions</h2>
        <p>Comprehensive distribution models, asset allocations, and wealth planning tools designed to scale and safeguard your capital.</p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "48px", marginTop: "32px" }}>
        
        {/* 2. Services Grid */}
        <div className="features-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
          {services.map((service, idx) => (
            <div key={idx} className="glass-card feature-card" style={{ padding: "32px", display: "flex", flexDirection: "column", justifyContent: "space-between", textAlign: "left" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "16px" }}>
                  <div className="flex-center" style={{ background: "rgba(16, 185, 129, 0.1)", color: "#10b981", width: "56px", height: "56px", borderRadius: "12px", flexShrink: 0 }}>
                    {service.icon}
                  </div>
                  <h3 style={{ fontSize: "18px", fontWeight: "700", margin: 0, color: "var(--text-primary)" }}>{service.title}</h3>
                </div>
                <p style={{ fontSize: "13.5px", color: "var(--text-secondary)", lineHeight: "1.6" }}>
                  {service.desc}
                </p>
              </div>
              
              <div style={{ marginTop: "20px" }}>
                <span style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", color: "var(--accent-cyan)", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
                  Key Highlights
                </span>
                <ul style={{ display: "flex", flexWrap: "wrap", gap: "8px", padding: 0, margin: 0, listStyle: "none" }}>
                  {service.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} style={{ fontSize: "11px", background: "rgba(255,255,255,0.03)", border: "1px solid var(--border-light)", borderRadius: "6px", padding: "4px 8px", color: "var(--text-secondary)" }}>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* 3. Action Banner */}
        <div className="glass-card flex-center" style={{ 
          background: "linear-gradient(135deg, rgba(6, 182, 212, 0.04), rgba(16, 185, 129, 0.04))",
          border: "1px solid rgba(6, 182, 212, 0.2)",
          padding: "40px",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "24px"
        }}>
          <div style={{ textAlign: "left", flex: 1, minWidth: "280px" }}>
            <h3 style={{ fontSize: "20px", color: "var(--text-primary)" }}>Ready to Proactively Plan Your Projections?</h3>
            <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginTop: "4px" }}>
              Explore our un-gated wealth tools to simulate monthly investments, expected CAGR growth, and portfolio asset models.
            </p>
          </div>
          <button className="btn-primary" onClick={onNavToCalculators}>
            Open Calculators Hub <ArrowRight size={16} />
          </button>
        </div>

      </div>
    </div>
  );
}
