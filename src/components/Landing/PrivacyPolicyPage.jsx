import React from "react";
import { ShieldCheck, FileText, Lock, Building } from "lucide-react";
import "../../styles/landing.css";

export default function PrivacyPolicyPage() {
  return (
    <div className="knowledge-viewport animate-fade-in" style={{ padding: "60px 24px", maxWidth: "900px", margin: "0 auto" }}>
      
      <div className="hub-header" style={{ textAlign: "center", marginBottom: "48px" }}>
        <span className="badge-glow-green flex-center" style={{ margin: "0 auto 16px" }}>
          <ShieldCheck size={12} /> Legal & Compliance
        </span>
        <h2 style={{ fontSize: "36px", color: "var(--text-primary)", fontFamily: "var(--font-display)" }}>Privacy Policy & Legal Framework</h2>
        <p style={{ maxWidth: "600px", margin: "0 auto" }}>
          Fintelyx Investment Services LLP is committed to protecting your personal data and ensuring compliance with all regulatory standards.
        </p>
      </div>

      <div className="glass-card" style={{ padding: "40px", display: "flex", flexDirection: "column", gap: "32px", textAlign: "left", lineHeight: "1.7", color: "var(--text-secondary)" }}>
        
        <section>
          <h3 style={{ display: "flex", alignItems: "center", gap: "10px", color: "var(--text-primary)", fontSize: "20px", marginBottom: "16px" }}>
            <Building size={20} color="var(--accent-green)" /> 1. Corporate Identity
          </h3>
          <p>
            This website is owned and operated by <strong>Fintelyx Investment Services LLP</strong>. We are registered with the Association of Mutual Funds in India (AMFI) as a Mutual Fund Distributor (ARN-345579). All information on this portal is provided for educational and administrative purposes in relation to our wealth management services.
          </p>
        </section>

        <section>
          <h3 style={{ display: "flex", alignItems: "center", gap: "10px", color: "var(--text-primary)", fontSize: "20px", marginBottom: "16px" }}>
            <FileText size={20} color="var(--accent-green)" /> 2. Information We Collect
          </h3>
          <p style={{ marginBottom: "12px" }}>
            When you use our portal, contact us, or register for our services, we may collect the following data:
          </p>
          <ul style={{ paddingLeft: "24px", listStyleType: "square", display: "flex", flexDirection: "column", gap: "8px" }}>
            <li><strong>Personal Identification Data:</strong> Name, email address, phone number, and physical address.</li>
            <li><strong>Financial Data:</strong> Risk profiles, portfolio data, and investment objectives (solely for the purpose of executing advisory services with your explicit consent).</li>
            <li><strong>Technical Data:</strong> IP address, browser type, and interaction metrics gathered via standard analytical tools to improve user experience.</li>
          </ul>
        </section>

        <section>
          <h3 style={{ display: "flex", alignItems: "center", gap: "10px", color: "var(--text-primary)", fontSize: "20px", marginBottom: "16px" }}>
            <Lock size={20} color="var(--accent-green)" /> 3. Data Protection & Security
          </h3>
          <p>
            We implement robust, industry-standard security measures (including HTTPS, Content Security Policies, and secure database connections via Google Firebase) to protect your personal information against unauthorized access, alteration, disclosure, or destruction. We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties without your consent, except as required by law (e.g., SEBI/AMFI regulatory audits).
          </p>
        </section>

        <section>
          <h3 style={{ display: "flex", alignItems: "center", gap: "10px", color: "var(--text-primary)", fontSize: "20px", marginBottom: "16px" }}>
            <ShieldCheck size={20} color="var(--accent-green)" /> 4. Regulatory Disclaimers
          </h3>
          <p style={{ marginBottom: "12px" }}>
            <strong>Mutual Fund Investments are subject to market risks; read all scheme-related documents carefully.</strong>
          </p>
          <p>
            Past performance of any investment strategy or mutual fund is not indicative of future returns. The calculators and tools provided on this website are for illustrative and planning purposes only and should not be construed as guaranteed return projections. 
          </p>
        </section>

        <section>
          <h3 style={{ display: "flex", alignItems: "center", gap: "10px", color: "var(--text-primary)", fontSize: "20px", marginBottom: "16px" }}>
            5. Contacting Us
          </h3>
          <p>
            If you have any questions regarding this privacy policy or how we handle your data, you may contact our compliance team at:
          </p>
          <div style={{ marginTop: "12px", padding: "16px", background: "rgba(16, 185, 129, 0.05)", borderLeft: "3px solid var(--accent-green)", borderRadius: "0 8px 8px 0" }}>
            <strong>Email:</strong> wealth@fintelyxinvestments.com<br />
            <strong>Address:</strong> No 1544/1, Kiran Garden, Ground Floor, Ram Nagar, Anna Nagar West Extension, Chennai-600101
          </div>
        </section>

      </div>
    </div>
  );
}
