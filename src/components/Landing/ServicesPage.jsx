import { Sparkles, ArrowRight, ShieldCheck, Milestone, BarChart3, Coins, BookOpen, HeartPulse, GraduationCap } from "lucide-react";
import "../../styles/landing.css";
import { servicesData as services } from "../../data/servicesData";

export default function ServicesPage({ onNavToCalculators }) {
  return (
    <div className="services-viewport animate-fade-in" style={{ padding: "40px 0" }}>

      {/* 1. Page Header */}
      <div className="hub-header">
        <span className="badge-glow-green flex-center">
          <Sparkles size={12} /> Curated Wealth Services
        </span>
        <h2>Our Financial Solutions</h2>
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
                    <li key={bIdx} style={{ fontSize: "11px", background: "var(--bg-tertiary)", border: "1px solid var(--border-light)", borderRadius: "6px", padding: "4px 8px", color: "var(--text-secondary)" }}>
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
