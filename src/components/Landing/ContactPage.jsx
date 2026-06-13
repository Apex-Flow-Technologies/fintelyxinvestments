import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2, Loader2 } from "lucide-react";
import "../../styles/auth.css";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [interest, setInterest] = useState("mutual-funds");
  const [message, setMessage] = useState("");
  
  const [status, setStatus] = useState(1); // 1 = form, 2 = sending, 3 = success
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !message) {
      setError("Please complete all required fields.");
      return;
    }

    setStatus(2);
    
    // Simulate transaction delay
    setTimeout(() => {
      setStatus(3);
      // Reset inputs
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    }, 1500);
  };

  return (
    <div className="contact-viewport animate-fade-in" style={{ padding: "40px 0" }}>
      
      {/* 1. Page Header */}
      <div className="hub-header">
        <span className="badge-glow-green flex-center">
          <Mail size={12} /> Contact Desk
        </span>
        <h2>Get in Touch with Fintelyx</h2>
        <p>Inquire about mutual fund distributions, request PMS consultations, or submit feedback on our wealth platform.</p>
      </div>

      <div className="calc-layout-grid" style={{ gridTemplateColumns: "1fr 440px", marginTop: "32px" }}>
        
        {/* Left Column: Interactive Inquiry Form */}
        <div className="glass-card">
          {status === 1 && (
            <>
              <h3 style={{ fontSize: "20px", color: "var(--text-primary)", marginBottom: "20px", textAlign: "left" }}>
                Submit Investment Inquiry
              </h3>
              
              {error && <div className="auth-error-badge">⚠️ {error}</div>}

              <form onSubmit={handleSubmit} className="checkout-form">
                <div className="checkout-row">
                  <div className="auth-input-group" style={{ flex: 1 }}>
                    <label>Full Name *</label>
                    <input 
                      type="text" 
                      placeholder="Jane Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="auth-input-group" style={{ flex: 1 }}>
                    <label>Email Address *</label>
                    <input 
                      type="email" 
                      placeholder="jane@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="checkout-row">
                  <div className="auth-input-group" style={{ flex: 1 }}>
                    <label>Phone Number</label>
                    <input 
                      type="text" 
                      placeholder="+91 XXXXX XXXXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>

                  <div className="auth-input-group" style={{ flex: 1 }}>
                    <label>Area of Interest</label>
                    <select 
                      value={interest}
                      onChange={(e) => setInterest(e.target.value)}
                      style={{
                        background: "rgba(0, 0, 0, 0.3)",
                        border: "1px solid var(--border-light)",
                        borderRadius: "12px",
                        padding: "12px",
                        color: "var(--text-primary)",
                        outline: "none",
                        width: "100%",
                        cursor: "pointer"
                      }}
                    >
                      <option value="mutual-funds">Mutual Fund Distribution</option>
                      <option value="sip">SIP Step-Up Calculator</option>
                      <option value="pms">PMS Referral & Solutions</option>
                      <option value="backtester">Portfolio Backtesting</option>
                      <option value="general">General Support</option>
                    </select>
                  </div>
                </div>

                <div className="auth-input-group">
                  <label>Your Inquiry Message *</label>
                  <textarea 
                    placeholder="Describe your investment targets or questions..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows="5"
                    required
                    style={{
                      background: "rgba(0, 0, 0, 0.3)",
                      border: "1px solid var(--border-light)",
                      borderRadius: "12px",
                      padding: "16px",
                      color: "var(--text-primary)",
                      outline: "none",
                      width: "100%",
                      fontFamily: "var(--font-body)",
                      fontSize: "14px",
                      resize: "none"
                    }}
                  />
                </div>

                <button type="submit" className="btn-primary flex-center" style={{ justifyContent: "center", marginTop: "12px", padding: "14px" }}>
                  <Send size={16} /> Send Secure Message
                </button>
              </form>
            </>
          )}

          {status === 2 && (
            <div className="checkout-loading-screen flex-center" style={{ padding: "80px 0" }}>
              <Loader2 className="processing-spinner" size={56} />
              <h3>Transmitting Secure Message...</h3>
              <p>Routing to Fintelyx investor relations desk...</p>
            </div>
          )}

          {status === 3 && (
            <div className="checkout-success-screen flex-center animate-fade-in" style={{ padding: "40px 0" }}>
              <CheckCircle2 size={64} className="success-checkmark" style={{ marginBottom: "16px" }} />
              <h2>Message Received!</h2>
              <p className="success-desc" style={{ maxWidth: "420px" }}>
                Thank you for contacting Fintelyx. Your investment inquiry has been recorded successfully. 
                Our designated partners, **Sadhiq** or **Sundhar**, will review your details and get in touch with you shortly.
              </p>
              <button className="btn-secondary" onClick={() => setStatus(1)} style={{ marginTop: "24px" }}>
                Submit Another Message
              </button>
            </div>
          )}
        </div>

        {/* Right Column: Office Location details */}
        <div className="glass-card flex-center" style={{ flexDirection: "column", gap: "24px", height: "fit-content", textAlign: "left", alignItems: "flex-start" }}>
          
          <h3 style={{ fontSize: "20px", color: "var(--text-primary)", borderBottom: "1px solid var(--border-light)", paddingBottom: "16px", width: "100%" }}>
            Registered Office
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "20px", fontSize: "13px" }}>
            {/* Address */}
            <a 
              href="https://maps.app.goo.gl/dyeMvEXRhg57WT4E9?g_st=iw" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ display: "flex", gap: "12px", alignItems: "flex-start", textDecoration: "none", color: "inherit" }}
              className="contact-interactive-link"
            >
              <MapPin size={20} style={{ color: "var(--accent-green)", flexShrink: 0, marginTop: "2px" }} />
              <div>
                <strong>Fintelyx Investment Services LLP</strong><br />
                No 1544/1, Kiran Garden, Ground Floor,<br />
                Ram Nagar, Anna Nagar West Extension,<br />
                Chennai, Tamil Nadu, 600101, India
                <div style={{ fontSize: "11.5px", color: "var(--accent-green)", marginTop: "6px", fontWeight: "600", display: "flex", alignItems: "center", gap: "4px" }}>
                  View on Google Maps →
                </div>
              </div>
            </a>

            {/* Email */}
            <a 
              href="mailto:wealth@fintelyxinvestments.com" 
              style={{ display: "flex", gap: "12px", alignItems: "center", textDecoration: "none", color: "inherit" }}
              className="contact-interactive-link"
            >
              <Mail size={16} style={{ color: "var(--accent-cyan)", flexShrink: 0 }} />
              <div>
                <strong>Inquiries:</strong> <span style={{ color: "var(--accent-cyan)", textDecoration: "underline" }}>wealth@fintelyxinvestments.com</span>
              </div>
            </a>

            {/* Phone */}
            <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
              <Phone size={16} style={{ color: "var(--accent-cyan)", flexShrink: 0, marginTop: "2px" }} />
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <strong>Office Lines (WhatsApp Chat):</strong>
                <a 
                  href="https://wa.me/919008867475" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  style={{ color: "var(--text-secondary)", textDecoration: "none", display: "flex", alignItems: "center", gap: "8px" }}
                  className="contact-interactive-link"
                >
                  <span style={{ textDecoration: "underline" }}>+91 90088 67475</span>
                  <span className="badge-glow-green" style={{ fontSize: "9px", padding: "2px 8px", borderRadius: "4px" }}>Chat</span>
                </a>
                <a 
                  href="https://wa.me/919150997478" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  style={{ color: "var(--text-secondary)", textDecoration: "none", display: "flex", alignItems: "center", gap: "8px" }}
                  className="contact-interactive-link"
                >
                  <span style={{ textDecoration: "underline" }}>+91 91509 97478</span>
                  <span className="badge-glow-green" style={{ fontSize: "9px", padding: "2px 8px", borderRadius: "4px" }}>Chat</span>
                </a>
              </div>
            </div>
          </div>

          {/* AMFI badge */}
          <div style={{ 
            borderTop: "1px solid var(--border-light)", 
            paddingTop: "24px", 
            marginTop: "8px", 
            width: "100%",
            fontSize: "11px",
            color: "var(--text-muted)"
          }}>
            <p>
              <strong>Fintelyx</strong> is registered with the Association of Mutual Funds in India (AMFI) under distributor license code <strong>ARN-345579</strong>. All operations are conducted in accordance with mutual fund compliance mandates.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
