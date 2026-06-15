import { ShieldCheck, Mail, Phone, MapPin } from "lucide-react";

export default function Footer({ onTabChange, theme }) {
  return (
    <footer style={{
      background: "var(--bg-secondary)",
      borderTop: "1px solid var(--border-light)",
      padding: "60px 24px 40px",
      color: "var(--text-secondary)",
      fontFamily: "var(--font-body)",
      fontSize: "13px"
    }}>
      <div className="content-container" style={{ padding: 0 }}>
        
        {/* Top Section */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "40px",
          marginBottom: "40px",
          textAlign: "left"
        }}>
          {/* Col 1: Brand Info */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div 
              className="navbar-logo flex-center" 
              style={{ justifyContent: "flex-start", cursor: "pointer", gap: "12px" }} 
              onClick={() => onTabChange("home")}
              onDoubleClick={() => onTabChange("admin")}
              title="Double click logo for admin access"
            >
              <img 
                src="/assets/Fintelyx_Logo_Trimmed.png" 
                alt="Fintelyx Logo" 
                style={{ 
                  height: "44px", 
                  width: "auto", 
                  display: "block",
                  filter: theme === "light"
                    ? "brightness(1.1) contrast(1.1) drop-shadow(0 0 8px rgba(16, 185, 129, 0.15))"
                    : "brightness(2.8) contrast(1.1) drop-shadow(0 0 10px rgba(16, 185, 129, 0.25))"
                }} 
              />
              <span style={{ 
                fontFamily: "var(--font-display)", 
                fontWeight: "800", 
                fontSize: "20px", 
                letterSpacing: "0.15em", 
                background: "linear-gradient(135deg, var(--accent-green) 0%, var(--accent-cyan) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 0 10px rgba(16, 185, 129, 0.2))",
                textTransform: "uppercase"
              }}>
                fintelyx
              </span>
            </div>
            <p style={{ fontSize: "12px", lineHeight: "1.6", color: "var(--text-muted)" }}>
              Fintelyx Investment Services LLP partners with clients to bridge knowledge, discipline, and strategy. Our awareness-led approach and curated solutions enable thoughtful investing, intelligent protection, and long-term financial progress.
            </p>
          </div>

          {/* Col 2: Services Quick Links */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <h4 style={{ color: "var(--text-primary)", fontSize: "14px", fontFamily: "var(--font-display)" }}>Wealth Suite</h4>
            <span onClick={() => onTabChange("home")} style={linkStyle}>Overview</span>
            <span onClick={() => onTabChange("about")} style={linkStyle}>About Fintelyx</span>
            <span onClick={() => onTabChange("services")} style={linkStyle}>Solutions & Services</span>
            <span onClick={() => onTabChange("calculators")} style={linkStyle}>Calculators Hub</span>
            <span onClick={() => onTabChange("blogs")} style={linkStyle}>Blogs</span>
            <span onClick={() => onTabChange("contact")} style={linkStyle}>Contact Support</span>
            <span onClick={() => onTabChange("privacy")} style={{ ...linkStyle, color: "var(--accent-green)" }}>Privacy & Legal</span>
          </div>

          {/* Col 3: Contact details */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <h4 style={{ color: "var(--text-primary)", fontSize: "14px", fontFamily: "var(--font-display)" }}>Contact Details</h4>
            
            <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
              <MapPin size={16} style={{ color: "var(--accent-green)", flexShrink: 0, marginTop: "2px" }} />
              <span style={{ fontSize: "12px", lineHeight: "1.5" }}>
                No 1544/1, Kiran Garden, Ground Floor, Ram Nagar, Anna Nagar West Extension, Chennai-600101
              </span>
            </div>

            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <Mail size={16} style={{ color: "var(--accent-green)", flexShrink: 0 }} />
              <a href="mailto:wealth@fintelyxinvestments.com" style={{ ...linkStyle, fontSize: "12px" }}>
                wealth@fintelyxinvestments.com
              </a>
            </div>

            <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
              <Phone size={16} style={{ color: "var(--accent-green)", flexShrink: 0, marginTop: "2px" }} />
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <a href="tel:+919008867475" style={{ ...linkStyle, fontSize: "12px" }}>+91 90088 67475</a>
                <a href="tel:+919150997478" style={{ ...linkStyle, fontSize: "12px" }}>+91 91509 97478</a>
              </div>
            </div>
          </div>

          {/* Col 4: Legal ARN Details */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <h4 style={{ color: "var(--text-primary)", fontSize: "14px", fontFamily: "var(--font-display)" }}>Registration Credentials</h4>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "12px" }}>
              <ShieldCheck size={16} style={{ color: "var(--accent-green)", flexShrink: 0, marginTop: "2px" }} />
              <div style={{ lineHeight: "1.6" }}>
                <strong>AMFI Registered Distributor</strong><br />
                ARN-345579<br />
                <span style={{ color: "var(--text-muted)", fontSize: "11px" }}>
                  Registered: 14-NOV-2025<br />
                  Valid through: 13-NOV-2028
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Regulatory Compliance Disclaimer Box */}
        <div style={{
          borderTop: "1px solid var(--border-light)",
          paddingTop: "30px",
          marginTop: "30px",
          textAlign: "left",
          fontSize: "11px",
          lineHeight: "1.75",
          color: "var(--text-muted)",
          display: "flex",
          flexDirection: "column",
          gap: "12px"
        }}>
          <p>
            <strong>MUTUAL FUND INVESTMENT DISCLOSURE:</strong> Mutual Fund investments are subject to market risks, read all scheme related documents carefully before investing. Past performance is not indicative of future performance.
          </p>
          <p>
            <strong>DISCLAIMER:</strong> Content shared through blogs, videos, or market updates is for educational and informational purposes only and should not be considered as investment advice, research, or a solicitation. Investment decisions should be made based on individual risk profile and suitability. Fintelyx Investment Services LLP ARN-345579 registration persists in accordance with Association of Mutual Funds in India (AMFI) regulations.
          </p>
          <p style={{ textAlign: "center", marginTop: "10px" }}>
            © {new Date().getFullYear()} Fintelyx Investment Services LLP. All Rights Reserved. Designed with absolute precision.
          </p>
        </div>

      </div>
    </footer>
  );
}

const linkStyle = {
  cursor: "pointer",
  transition: "var(--transition-smooth)",
  fontSize: "12px",
  color: "var(--text-secondary)",
  textDecoration: "none",
  width: "fit-content"
};
