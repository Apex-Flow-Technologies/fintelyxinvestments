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

function FintelyxApp() {
  // Navigation Tab State
  const [activeTab, setActiveTab] = useState("home");

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
        onTabChange={(tab) => setActiveTab(tab)}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* 2. Content Viewports */}
      <main className="animate-fade-in" style={{ flex: 1, width: "100%", paddingTop: "80px" }}>
        {activeTab === "home" ? (
          <LandingPage 
            onNavToCalculators={() => setActiveTab("calculators")}
            theme={theme}
          />
        ) : (
          <div className="content-container">
            {activeTab === "about" && <AboutPage />}
            
            {activeTab === "services" && (
              <ServicesPage 
                onNavToCalculators={() => setActiveTab("calculators")}
              />
            )}
            
            {activeTab === "calculators" && (
              <CalculatorHub />
            )}

            {activeTab === "blogs" && <BlogsPage />}

            {activeTab === "contact" && <ContactPage />}

            {activeTab === "privacy" && <PrivacyPolicyPage />}

            {activeTab === "admin" && (
              <BlogAdminPortal onClose={() => setActiveTab("home")} />
            )}
          </div>
        )}
      </main>

      {/* 3. Footer */}
      <Footer onTabChange={(tab) => setActiveTab(tab)} />
    </div>
  );
}

export default function App() {
  return <FintelyxApp />;
}
