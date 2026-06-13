import React, { useState, useEffect } from "react";
import Navbar from "./components/Common/Navbar";
import Footer from "./components/Common/Footer";
import LandingPage from "./components/Landing/LandingPage";
import AboutPage from "./components/Landing/AboutPage";
import ServicesPage from "./components/Landing/ServicesPage";
import ContactPage from "./components/Landing/ContactPage";
import BlogsPage from "./components/Landing/BlogsPage";
import BlogAdminPortal from "./components/Admin/BlogAdminPortal";
import PrivacyPolicyPage from "./components/Landing/PrivacyPolicyPage";
import CalculatorHub from "./components/Calculators/CalculatorHub";
import "./index.css";
import "./styles/landing.css";
import "./styles/calculators.css";
import "./styles/auth.css";

function FintelyxApp() {
  // Navigation Tab State
  const [activeTab, setActiveTab] = useState("home");
  const [selectedPartnerId, setSelectedPartnerId] = useState(null);

  // Parse path to get tab and partner
  const parsePath = (path) => {
    const segments = path.split("/").filter(Boolean);
    if (segments.length === 0) return { tab: "home", partner: null };
    
    const firstSegment = segments[0];
    if (firstSegment === "about") {
      const partnerId = segments[1] || null;
      return { tab: "about", partner: partnerId };
    }
    
    // Valid tabs
    const validTabs = ["home", "about", "services", "calculators", "blogs", "contact", "privacy", "admin"];
    if (validTabs.includes(firstSegment)) {
      return { tab: firstSegment, partner: null };
    }
    
    return { tab: "home", partner: null };
  };

  // Sync state with URL on initial load and popstate
  useEffect(() => {
    const handleLocationChange = () => {
      const { tab, partner } = parsePath(window.location.pathname);
      setActiveTab(tab);
      setSelectedPartnerId(partner);
    };

    // Run on mount
    handleLocationChange();

    window.addEventListener("popstate", handleLocationChange);
    return () => window.removeEventListener("popstate", handleLocationChange);
  }, []);

  // Navigation helper
  const navigateTo = (path) => {
    window.history.pushState(null, "", path);
    const { tab, partner } = parsePath(path);
    setActiveTab(tab);
    setSelectedPartnerId(partner);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  // Theme State (Dark Mode default)
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("fintelyx-theme") || "dark";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("fintelyx-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <div className="app-container">
      {/* 1. Navbar */}
      <Navbar 
        activeTab={activeTab} 
        onTabChange={(tab) => navigateTo(tab === "home" ? "/" : `/${tab}`)}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* 2. Content Viewports */}
      <main className="animate-fade-in" style={{ flex: 1, width: "100%", paddingTop: "80px" }}>
        {activeTab === "home" ? (
          <LandingPage 
            onNavToCalculators={() => navigateTo("/calculators")}
            theme={theme}
          />
        ) : (
          <div className="content-container">
            {activeTab === "about" && (
              <AboutPage 
                partnerId={selectedPartnerId}
                onPartnerChange={(id) => navigateTo(id ? `/about/${id}` : "/about")}
              />
            )}
            
            {activeTab === "services" && (
              <ServicesPage 
                onNavToCalculators={() => navigateTo("/calculators")}
              />
            )}
            
            {activeTab === "calculators" && (
              <CalculatorHub theme={theme} />
            )}

            {activeTab === "blogs" && <BlogsPage />}

            {activeTab === "contact" && <ContactPage />}

            {activeTab === "privacy" && <PrivacyPolicyPage />}

            {activeTab === "admin" && (
              <BlogAdminPortal onClose={() => navigateTo("/")} />
            )}
          </div>
        )}
      </main>

      {/* 3. Footer */}
      <Footer onTabChange={(tab) => navigateTo(tab === "home" ? "/" : `/${tab}`)} />
    </div>
  );
}

export default function App() {
  return <FintelyxApp />;
}
