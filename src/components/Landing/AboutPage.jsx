import { ShieldCheck, Users, Landmark, Award, HelpCircle, ArrowLeft, Briefcase, Compass, MessageSquare, CheckCircle2 } from "lucide-react";
import "../../styles/landing.css";

const partners = [
  {
    id: "sadhiq",
    initial: "S",
    name: "Sadhiq",
    role: "PRINCIPAL PARTNER",
    department: "INVESTMENT SERVICES",
    desc: "A financial educator at heart, Sadhiq applies deep market understanding and practical investing insight to guide clients in allocating capital wisely, managing risk, and building long-term wealth. His advisory philosophy is rooted in awareness, discipline, and informed decision-making.",
    img: "",
    experience: "8+ Years in Financial Advisory & Compounding Literacy Desk",
    philosophy: "Advising is not just about choosing schemes, but educating investors to ride out market cycles with peace of mind. Compound interest works best when matched with investor discipline.",
    credentials: [
      "AMFI Registered Mutual Fund Advisor (ARN-345579)",
      "Certified Compounding Literacy Educator",
      "Expert in Strategic Asset Allocation & Risk Mitigation"
    ],
    expertise: [
      "Mutual Fund Portfolio Structuring",
      "Retirement & Wealth Goal Planning",
      "SIP Step-Up Modeling & Optimization",
      "Risk Profiling & Volatility Management"
    ],
    whatsapp: "https://wa.me/919008867475"
  },
  {
    id: "antony",
    initial: "A",
    name: "Antony",
    role: "PARTNER",
    department: "OPERATIONS & CLIENT SERVICING",
    desc: "From Institutional trade operations background Antony brings operational governance, risk awareness, and control discipline into the advisory and wealth management space.",
    img: "",
    experience: "Ex-Institutional Trade Operations Lead & Risk Analyst",
    philosophy: "Operational robustness and risk governance are the silent pillars of successful wealth creation. Every transaction deserves institutional-grade oversight and compliance.",
    credentials: [
      "Trade Operations Governance Expert",
      "LLP Designated Partner (LLPIN: ACP-0306)",
      "Regulatory Compliance Audit Specialist"
    ],
    expertise: [
      "Client Onboarding & KYC Governance",
      "Operational Risk Management",
      "Distributor Transaction Reconciliation",
      "Compliance Mandate Auditing"
    ],
    whatsapp: "https://wa.me/919150997478"
  },
  {
    id: "sundhar",
    initial: "S",
    name: "Sundhar",
    role: "PARTNER",
    department: "MEDIA & DIGITAL MARKETING",
    desc: "Sundhar spearheads Fintelyx's digital presence, overseeing all media relations, content strategy, and digital marketing initiatives to ensure clear and engaging communication of our wealth strategies.",
    img: "",
    experience: "Digital Marketing Strategist & Media Communications Lead",
    philosophy: "Financial literacy must be accessible. Effective digital communication and engaging media strategies bridge the gap between complex investment concepts and the everyday investor.",
    credentials: [
      "Digital Marketing Expert",
      "Strategic Communications Lead",
      "Designated Partner of Fintelyx Investments"
    ],
    expertise: [
      "Digital Media Strategy",
      "Brand & Content Marketing",
      "Client Outreach & Engagement",
      "Financial Communications"
    ],
    whatsapp: "https://wa.me/919008867475"
  },
  {
    id: "coming-soon-1",
    initial: "?",
    name: "Partner Details TBA",
    role: "JOINING SOON",
    department: "LEADERSHIP DESK",
    desc: "We are actively expanding our leadership board to bring more specialized expertise to our clients. Stay tuned for an official announcement.",
    img: "",
    experience: "Details will be updated upon official onboarding",
    philosophy: "Fintelyx is committed to assembling a diverse board of industry experts to ensure comprehensive financial advisory.",
    credentials: [
      "Credentials update pending"
    ],
    expertise: [
      "Expertise update pending"
    ],
    whatsapp: "#"
  },
  {
    id: "coming-soon-2",
    initial: "?",
    name: "Partner Details TBA",
    role: "JOINING SOON",
    department: "LEADERSHIP DESK",
    desc: "We are actively expanding our leadership board to bring more specialized expertise to our clients. Stay tuned for an official announcement.",
    img: "",
    experience: "Details will be updated upon official onboarding",
    philosophy: "Fintelyx is committed to assembling a diverse board of industry experts to ensure comprehensive financial advisory.",
    credentials: [
      "Credentials update pending"
    ],
    expertise: [
      "Expertise update pending"
    ],
    whatsapp: "#"
  }
];

export default function AboutPage({ partnerId, onPartnerChange }) {
  const selectedPartner = partners.find(p => p.id === partnerId) || null;
  const setSelectedPartner = (partner) => {
    if (onPartnerChange) {
      onPartnerChange(partner ? partner.id : null);
    }
  };

  if (selectedPartner) {
    return (
      <div className="about-viewport animate-fade-in" style={{ padding: "40px 0" }}>
        <div className="partner-detail-view">
          <button
            className="partner-detail-back-btn"
            onClick={() => setSelectedPartner(null)}
          >
            <ArrowLeft size={16} /> Back to LLP Board
          </button>

          <div className="partner-detail-grid">
            {/* Left Column: Portrait */}
            <div className="partner-detail-portrait-box">
              <div className="partner-detail-fallback flex-center">
                {selectedPartner.initial}
              </div>
              {selectedPartner.img && (
                <img
                  src={selectedPartner.img}
                  alt={selectedPartner.name}
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              )}
            </div>

            {/* Right Column: Bio Content */}
            <div className="partner-detail-content">
              <div className="partner-detail-header">
                <div className="partner-detail-pills">
                  <span className="badge-glow-green">{selectedPartner.role}</span>
                  {selectedPartner.department && (
                    <span className="badge-glow-cyan">{selectedPartner.department}</span>
                  )}
                </div>
                <h1 className="partner-detail-name">{selectedPartner.name}</h1>
              </div>

              <p className="partner-detail-bio">
                {selectedPartner.desc}
              </p>

              <div className="partner-detail-sections">
                {/* Experience Card */}
                <div className="detail-section-card">
                  <h3 className="detail-section-title">
                    <Briefcase size={16} /> Professional Experience
                  </h3>
                  <p style={{ fontSize: "13.5px", color: "var(--text-secondary)", lineHeight: "1.6" }}>
                    {selectedPartner.experience}
                  </p>
                </div>

                {/* Philosophy Card */}
                <div className="detail-section-card">
                  <h3 className="detail-section-title">
                    <Compass size={16} /> Advisory Philosophy
                  </h3>
                  <p style={{ fontSize: "13.5px", color: "var(--text-secondary)", lineHeight: "1.6" }}>
                    {selectedPartner.philosophy}
                  </p>
                </div>

                {/* Credentials Card */}
                <div className="detail-section-card">
                  <h3 className="detail-section-title">
                    <Award size={16} /> Credentials & Certifications
                  </h3>
                  <ul className="detail-section-list">
                    {selectedPartner.credentials.map((cred, idx) => (
                      <li key={idx}>
                        <CheckCircle2 size={14} style={{ marginTop: '3px' }} />
                        <span>{cred}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Areas of Focus Card */}
                <div className="detail-section-card">
                  <h3 className="detail-section-title">
                    <Users size={16} /> Core Areas of Expertise
                  </h3>
                  <ul className="detail-section-list">
                    {selectedPartner.expertise.map((exp, idx) => (
                      <li key={idx}>
                        <CheckCircle2 size={14} style={{ marginTop: '3px' }} />
                        <span>{exp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Row */}
              <div className="partner-detail-actions">
                <a
                  href={selectedPartner.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  <MessageSquare size={16} /> Chat on WhatsApp
                </a>
                <button
                  className="btn-secondary"
                  onClick={() => setSelectedPartner(null)}
                >
                  Back to Board
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="about-viewport animate-fade-in" style={{ padding: "40px 0" }}>

      {/* 1. Page Header & Introduction */}
      <div className="hub-header">
        <span className="badge-glow-green flex-center">
          <Landmark size={12} /> ESTABLISHED JUNE 2025
        </span>
        <h2>About Fintelyx Investments</h2>
        <p>
          Fintelyx Investment Services LLP is a premier, technology-enabled mutual fund distribution partnership
          dedicated to advancing compounding literacy and secure wealth optimization strategies.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "56px", marginTop: "40px" }}>

        {/* 2. Main Corporate Profile Glass Card */}
        <div className="glass-card" style={{ padding: "40px", textAlign: "left" }}>
          <div className="about-corporate-grid">

            {/* Left Col: Mission Statement */}
            <div>
              <span className="badge-glow-green" style={{ marginBottom: "20px", display: "inline-block", textTransform: "uppercase", fontSize: "14px", fontWeight: "800", padding: "6px 16px" }}>WHO WE ARE</span>
              <p style={{ fontSize: "16px", color: "var(--text-secondary)", lineHeight: "1.8" }}>
                At Fintelyx Investments, we go beyond traditional financial advisory—we build long-term partnerships that evolve with your life, your business, and your aspirations. Our mission is simple yet powerful: to empower individuals, families, and enterprises with intelligent, curated investment and protection solutions that deliver meaningful financial outcomes. We combine deep listening with data-led insights to understand what truly matters to you.
              </p>
            </div>

            {/* Right Col: Stat metrics box */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {/* Stat 1 */}
              <div style={{ padding: "20px", background: "var(--bg-tertiary)", border: "1px solid var(--border-light)", borderRadius: "16px", display: "flex", gap: "16px", alignItems: "center" }}>
                <div className="flex-center" style={{ background: "rgba(16, 185, 129, 0.1)", border: "1px solid rgba(16, 185, 129, 0.2)", width: "48px", height: "48px", borderRadius: "50%", color: "#10b981", flexShrink: 0 }}>
                  <Award size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: "14px", color: "var(--text-primary)" }}>AMFI Registered License</h4>
                  <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>ARN-345579 distributor credentials</span>
                </div>
              </div>

              {/* Stat 2 */}
              <div style={{ padding: "20px", background: "var(--bg-tertiary)", border: "1px solid var(--border-light)", borderRadius: "16px", display: "flex", gap: "16px", alignItems: "center" }}>
                <div className="flex-center" style={{ background: "rgba(6, 182, 212, 0.1)", border: "1px solid rgba(6, 182, 212, 0.2)", width: "48px", height: "48px", borderRadius: "50%", color: "var(--accent-cyan)", flexShrink: 0 }}>
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: "14px", color: "var(--text-primary)" }}>Corporate Registration</h4>
                  <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>LLPIN ACP-0306 incorporated in India</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* 3. LLP Designated Partners Team Grid (Matching screenshot formatting) */}
        <div className="section-title-wrapper text-center">
          <span className="badge-glow-green"><Users size={12} /> LLP Board</span>
          <h3 style={{ fontSize: "28px", color: "var(--text-primary)", marginTop: "8px" }}>Our Team</h3>
        </div>

        <div className="team-cards-grid flex-center" style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "24px",
          width: "100%",
          alignItems: "stretch"
        }}>
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="team-partner-card"
              onClick={() => setSelectedPartner(partner)}
              style={{ cursor: "pointer" }}
            >

              {/* Partner Portrait Image Frame with initials fallback */}
              <div className="partner-portrait-frame flex-center">
                <div className="portrait-image-fallback flex-center">
                  {partner.initial}
                </div>
                {partner.img && (
                  <img
                    src={partner.img}
                    alt={partner.name}
                    onError={(e) => {
                      // Hide broken image link to reveal high-fidelity fallback behind it
                      e.target.style.display = "none";
                    }}
                  />
                )}
              </div>

              {/* Text metadata */}
              <div className="partner-text-block">
                <div className="partner-role-pill">{partner.role}</div>
                {partner.department && <div className="partner-dept-pill">{partner.department}</div>}

                <h3 className="partner-display-name">{partner.name}</h3>

                <hr className="partner-card-divider" />

                <p className="partner-bio-desc">{partner.desc}</p>

                <div style={{ fontSize: "12px", color: "var(--accent-green)", fontWeight: "600", marginBottom: "20px" }}>
                  View Profile →
                </div>

                {/* Neon green circular social links */}
                <div className="partner-social-row flex-center" onClick={(e) => e.stopPropagation()}>
                  <a href="#" className="partner-social-btn flex-center" aria-label="Facebook">
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="#ffffff"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" /></svg>
                  </a>
                  <a href="#" className="partner-social-btn flex-center" aria-label="Instagram">
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                  </a>
                  <a href="#" className="partner-social-btn flex-center" aria-label="Twitter">
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="#ffffff"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" /></svg>
                  </a>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* 4. Statutory Regulatory Panel */}
        <div className="glass-card flex-center" style={{
          background: "rgba(245, 158, 11, 0.03)",
          border: "1px dashed rgba(245, 158, 11, 0.3)",
          padding: "clamp(20px, 4vw, 40px)",
          gap: "24px",
          marginTop: "20px",
          flexWrap: "wrap"
        }}>
          <div className="badge-stamp-icon flex-center" style={{
            background: "rgba(245, 158, 11, 0.08)",
            border: "1px solid rgba(245, 158, 11, 0.2)",
            color: "#fbbf24",
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            flexShrink: 0
          }}>
            <HelpCircle size={32} />
          </div>
          <div style={{ textDecoration: "none", textAlign: "left" }}>
            <h4 style={{ color: "#fbbf24", fontSize: "16px", fontWeight: "700" }}>Statutory Disclosure & Disclaimer</h4>
            <p style={{ fontSize: "12px", color: "var(--text-secondary)", lineHeight: "1.6", marginTop: "6px" }}>
              Fintelyx Investment Services LLP operates strictly as a mutual fund distributor. In accordance with the
              guidelines laid down by the Securities and Exchange Board of India (SEBI) and the Association of Mutual Funds in India (AMFI):
            </p>
            <ul style={{ fontSize: "11px", color: "var(--text-muted)", listStyle: "circle", paddingLeft: "16px", marginTop: "10px", display: "flex", flexDirection: "column", gap: "6px" }}>
              <li>
                We are <strong>not SEBI-registered research analysts</strong> or registered investment advisers. The tools, graphs,
                CAGRs, and portfolio allocations (e.g. SIP calculations or backtest curves) displayed on this platform are
                purely for educational projection and simulation purposes.
              </li>
              <li>
                Mutual fund investments are subject to market risks. We distribute schemes from various AMCs but do not
                guarantee any specific financial outcomes or compound interest growth yields.
              </li>
              <li>
                All calculation profiles are hypothetical. Clients are requested to verify mutual fund prospectus files
                and consult certified financial planners before executing real financial investments.
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}
