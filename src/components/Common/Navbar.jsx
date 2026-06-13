import React, { useState } from "react";
import { Sparkles, Menu, X, Sun, Moon } from "lucide-react";

export default function Navbar({ activeTab, onTabChange, theme, toggleTheme }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleTabClick = (tab) => {
    onTabChange(tab);
    setIsMenuOpen(false);
  };

  return (
    <>
      <style>{`
        /* Responsive navbar utilities */
        .nav-desktop-links {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .nav-desktop-actions {
          display: block;
        }
        .nav-mobile-toggle {
          display: none;
          background: transparent;
          border: none;
          color: var(--text-primary);
          cursor: pointer;
          padding: 8px;
          border-radius: 8px;
          transition: var(--transition-smooth);
        }
        .nav-mobile-toggle:hover {
          background: rgba(255, 255, 255, 0.05);
        }
        .nav-mobile-drawer {
          position: fixed;
          top: 80px;
          left: 0;
          right: 0;
          background: var(--bg-secondary);
          backdrop-filter: blur(25px);
          -webkit-backdrop-filter: blur(25px);
          border-bottom: 1px solid var(--border-light);
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          z-index: 999;
          animation: navSlideDown 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          box-shadow: var(--glass-shadow);
        }
        
        .theme-toggle-btn {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-light);
          color: var(--text-primary);
          cursor: pointer;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: var(--transition-smooth);
        }
        .theme-toggle-btn:hover {
          background: rgba(16, 185, 129, 0.08);
          border-color: rgba(16, 185, 129, 0.3);
          color: var(--accent-green);
          box-shadow: 0 0 12px rgba(16, 185, 129, 0.2);
          transform: rotate(15deg) scale(1.05);
        }
        
        @keyframes navSlideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 1100px) {
          .nav-desktop-links {
            display: none !important;
          }
          .nav-desktop-actions {
            display: none !important;
          }
          .nav-mobile-toggle {
            display: flex !important;
            align-items: center;
            justify-content: center;
          }
        }
      `}</style>

      <nav className="glass-navbar flex-center" style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        minHeight: "80px",
        height: "80px",
        background: "var(--glass-bg)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid var(--border-light)",
        padding: "0 24px",
        justifyContent: "space-between",
        zIndex: 1000,
        transition: "var(--transition-smooth)"
      }}>

        {/* 1. BRAND LOGO */}
        <div className="navbar-logo flex-center" onClick={() => handleTabClick("home")} style={{ cursor: "pointer", gap: "14px" }}>
          <img
            src="/assets/Fintelyx_Logo_Trimmed.png"
            alt="Fintelyx Logo"
            style={{
              height: "56px",
              width: "auto",
              display: "block",
              filter: theme === "light"
                ? "brightness(1.1) contrast(1.1) drop-shadow(0 0 8px rgba(16, 185, 129, 0.15))"
                : "brightness(2.8) contrast(1.1) drop-shadow(0 0 12px rgba(16, 185, 129, 0.3))"
            }}
          />
          <span style={{
            fontFamily: "var(--font-display)",
            fontWeight: "800",
            fontSize: "24px",
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

        {/* 2. DYNAMIC LINKS */}
        <div className="nav-desktop-links">
          <button
            className={`nav-btn-tab ${activeTab === "home" ? "active" : ""}`}
            onClick={() => handleTabClick("home")}
            style={tabButtonStyle(activeTab === "home")}
          >
            Overview
          </button>
          <button
            className={`nav-btn-tab ${activeTab === "about" ? "active" : ""}`}
            onClick={() => handleTabClick("about")}
            style={tabButtonStyle(activeTab === "about")}
          >
            About Us
          </button>
          <button
            className={`nav-btn-tab ${activeTab === "services" ? "active" : ""}`}
            onClick={() => handleTabClick("services")}
            style={tabButtonStyle(activeTab === "services")}
          >
            Services
          </button>
          <button
            className={`nav-btn-tab ${activeTab === "calculators" ? "active" : ""}`}
            onClick={() => handleTabClick("calculators")}
            style={tabButtonStyle(activeTab === "calculators")}
          >
            Calculators
          </button>
          <button
            className={`nav-btn-tab ${activeTab === "blogs" ? "active" : ""}`}
            onClick={() => handleTabClick("blogs")}
            style={tabButtonStyle(activeTab === "blogs")}
          >
            Blogs
          </button>
          <button
            className={`nav-btn-tab ${activeTab === "contact" ? "active" : ""}`}
            onClick={() => handleTabClick("contact")}
            style={tabButtonStyle(activeTab === "contact")}
          >
            Contact Us
          </button>
        </div>

        {/* 3. ACTIONS & TOGGLES CONTAINER */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          {/* Theme Toggle Button (Desktop & Mobile) */}
          <button
            className="theme-toggle-btn"
            onClick={toggleTheme}
            aria-label="Toggle Theme"
          >
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          {/* Desktop SaaS Portal CTA */}
          <div className="nav-desktop-actions">
            <a
              href="https://saas.fintelyxinvestments.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary flex-center"
              style={{
                padding: "8px 18px",
                fontSize: "13px",
                borderRadius: "10px",
                textDecoration: "none",
                gap: "8px"
              }}
            >
              <Sparkles size={14} /> Login
            </a>
          </div>

          {/* Mobile hamburger menu */}
          <button
            className="nav-mobile-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

      </nav>

      {/* 5. MOBILE MENU DRAWER */}
      {isMenuOpen && (
        <div className="nav-mobile-drawer">
          <button
            className={`nav-btn-tab ${activeTab === "home" ? "active" : ""}`}
            onClick={() => handleTabClick("home")}
            style={mobileTabButtonStyle(activeTab === "home")}
          >
            Overview
          </button>
          <button
            className={`nav-btn-tab ${activeTab === "about" ? "active" : ""}`}
            onClick={() => handleTabClick("about")}
            style={mobileTabButtonStyle(activeTab === "about")}
          >
            About Us
          </button>
          <button
            className={`nav-btn-tab ${activeTab === "services" ? "active" : ""}`}
            onClick={() => handleTabClick("services")}
            style={mobileTabButtonStyle(activeTab === "services")}
          >
            Services
          </button>
          <button
            className={`nav-btn-tab ${activeTab === "calculators" ? "active" : ""}`}
            onClick={() => handleTabClick("calculators")}
            style={mobileTabButtonStyle(activeTab === "calculators")}
          >
            Calculators
          </button>
          <button
            className={`nav-btn-tab ${activeTab === "blogs" ? "active" : ""}`}
            onClick={() => handleTabClick("blogs")}
            style={mobileTabButtonStyle(activeTab === "blogs")}
          >
            Blogs
          </button>
          <button
            className={`nav-btn-tab ${activeTab === "contact" ? "active" : ""}`}
            onClick={() => handleTabClick("contact")}
            style={mobileTabButtonStyle(activeTab === "contact")}
          >
            Contact Us
          </button>
          <div style={{ height: "1px", background: "var(--border-light)", margin: "8px 0" }} />
          <a
            href="https://saas.fintelyxinvestments.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary flex-center"
            style={{
              padding: "12px 24px",
              fontSize: "14px",
              borderRadius: "12px",
              textDecoration: "none",
              gap: "8px",
              justifyContent: "center"
            }}
          >
            <Sparkles size={16} /> Login
          </a>
        </div>
      )}
    </>
  );
}

// Simple styling hook for nav items
const tabButtonStyle = (isActive) => ({
  background: isActive ? "rgba(255, 255, 255, 0.05)" : "transparent",
  border: "none",
  outline: "none",
  color: isActive ? "var(--text-primary)" : "var(--text-secondary)",
  fontFamily: "var(--font-body)",
  fontWeight: isActive ? "700" : "500",
  fontSize: "13px",
  padding: "8px 16px",
  borderRadius: "8px",
  cursor: "pointer",
  transition: "var(--transition-smooth)"
});

const mobileTabButtonStyle = (isActive) => ({
  background: isActive ? "rgba(255, 255, 255, 0.05)" : "transparent",
  border: "none",
  outline: "none",
  color: isActive ? "var(--text-primary)" : "var(--text-secondary)",
  fontFamily: "var(--font-body)",
  fontWeight: isActive ? "700" : "500",
  fontSize: "15px",
  padding: "12px 20px",
  borderRadius: "8px",
  cursor: "pointer",
  textAlign: "left",
  width: "100%",
  transition: "var(--transition-smooth)"
});
