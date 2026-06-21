import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { ArrowRight, ShieldCheck, TrendingUp, Cpu, Landmark } from "lucide-react";
import ParticleBackground from "../Common/ParticleBackground";
import { SOCIAL_FEED_CONFIG } from "../../config/socialFeeds";
import { servicesData } from "../../data/servicesData";
import "../../styles/landing.css";

// Custom SVG Icons to bypass older lucide-react brand/media missing exports
const YoutubeIcon = ({ size = 20, ...props }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25a29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor"></polygon></svg>
);

const InstagramIcon = ({ size = 20, ...props }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
);

const PlayIcon = ({ size = 24, ...props }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
);

export default function LandingPage({ theme }) {

  // State variables for interactive mockup
  const [sipSlider, setSipSlider] = useState(35000);
  const [cagrSlider, setCagrSlider] = useState(14.2);

  // Autopilot Simulation States
  const [isAutopilotActive, setIsAutopilotActive] = useState(true);
  const [sipTarget, setSipTarget] = useState(35000);
  const [cagrTarget, setCagrTarget] = useState(14.2);

  // Ref to hold the idle interaction timer
  const autopilotTimerRef = useRef(null);

  // Refs to optimize LERP updates and prevent infinite looping depth errors
  const currentSipRef = useRef(sipSlider);
  const currentCagrRef = useRef(cagrSlider);

  // Sync refs with latest state updates
  useEffect(() => {
    currentSipRef.current = sipSlider;
  }, [sipSlider]);

  useEffect(() => {
    currentCagrRef.current = cagrSlider;
  }, [cagrSlider]);

  // Calculate live projections based on actual current values
  const totalYears = 15;
  const r = cagrSlider / 100;
  const monthlyRate = r / 12;
  const totalMonths = totalYears * 12;

  // Calculate final corpus
  const projectedCorpus = sipSlider * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) * (1 + monthlyRate);

  // Calculate path coordinates
  const width = 360;
  const height = 100; // Draw within 10px to 110px vertical range
  const points = [];
  let svgEndCoordinate = 60;

  for (let yr = 0; yr <= totalYears; yr++) {
    const m = yr * 12;
    const val = m === 0 ? 0 : sipSlider * ((Math.pow(1 + monthlyRate, m) - 1) / monthlyRate) * (1 + monthlyRate);

    const x = (yr / totalYears) * width;
    const y = projectedCorpus === 0 ? height : height - (val / projectedCorpus) * (height - 20) + 10;
    points.push(`${x.toFixed(1)},${y.toFixed(1)}`);

    if (yr === totalYears) {
      svgEndCoordinate = y;
    }
  }

  const svgPathData = `M ${points.join(" L ")}`;

  // Autopilot: Cycle random targets every 4.5 seconds
  useEffect(() => {
    if (!isAutopilotActive) return;

    const interval = setInterval(() => {
      // Pick random SIP target between ₹15,000 and ₹1,35,000 in steps of ₹5,000
      const randomSip = Math.floor(Math.random() * 25 + 3) * 5000;
      // Pick random CAGR target between 9% and 19.5% in steps of 0.5%
      const randomCagr = Math.floor(Math.random() * 22 + 18) * 0.5;

      setSipTarget(randomSip);
      setCagrTarget(randomCagr);
    }, 4500);

    return () => clearInterval(interval);
  }, [isAutopilotActive]);

  // Autopilot: Smoothly interpolate (LERP) current sliders towards targets
  useEffect(() => {
    if (!isAutopilotActive) return;

    const interval = setInterval(() => {
      const curSip = currentSipRef.current;
      const curCagr = currentCagrRef.current;

      const needsSipUpdate = Math.abs(sipTarget - curSip) >= 50;
      const needsCagrUpdate = Math.abs(cagrTarget - curCagr) >= 0.05;

      // Skip updating React state if values are already at their target coordinates
      if (!needsSipUpdate && !needsCagrUpdate) return;

      if (needsSipUpdate) {
        setSipSlider((current) => {
          const diff = sipTarget - current;
          if (Math.abs(diff) < 50) return sipTarget;
          return current + diff * 0.08; // smooth LERP interpolation
        });
      }

      if (needsCagrUpdate) {
        setCagrSlider((current) => {
          const diff = cagrTarget - current;
          if (Math.abs(diff) < 0.05) return cagrTarget;
          return current + diff * 0.08;
        });
      }
    }, 20);

    return () => clearInterval(interval);
  }, [isAutopilotActive, sipTarget, cagrTarget]);

  // Interaction Handler: pauses autopilot when user drags, restarts idle timer
  const handleUserInteraction = (rawSip, rawCagr) => {
    // Snap manual inputs to nearest 1000 for SIP and 0.1 for CAGR to keep numbers clean
    const snappedSip = Math.round(rawSip / 1000) * 1000;
    const snappedCagr = Math.round(rawCagr * 10) / 10;

    setIsAutopilotActive(false);
    setSipSlider(snappedSip);
    setCagrSlider(snappedCagr);
    setSipTarget(snappedSip);
    setCagrTarget(snappedCagr);

    if (autopilotTimerRef.current) {
      clearTimeout(autopilotTimerRef.current);
    }

    // Auto-resume autopilot after 5 seconds of complete user idle time
    autopilotTimerRef.current = setTimeout(() => {
      setIsAutopilotActive(true);
    }, 5000);
  };

  // Clean up idle timer on unmount
  useEffect(() => {
    return () => {
      if (autopilotTimerRef.current) {
        clearTimeout(autopilotTimerRef.current);
      }
    };
  }, []);

  // Social media feeds state (initialised with high-fidelity fallbacks if dynamic fetch is blocked)
  const [ytVideo, setYtVideo] = useState({
    title: "Gold Crash = ₹6.5 Lakh Profit | Real MCX Trades, Real Results",
    link: "https://www.youtube.com/shorts/cNg6ictbb-4",
    thumbnail: "https://i4.ytimg.com/vi/cNg6ictbb-4/hqdefault.jpg",
    pubDate: "11 Jun 2026"
  });
  const [igVideo, setIgVideo] = useState({
    title: "Follow @lets_talk_money_with_sadhiq on Instagram for daily personal finance tips, reels, and wealth strategy updates.",
    link: "https://www.instagram.com/lets_talk_money_with_sadhiq/",
    thumbnail: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=800&q=80",
    pubDate: "Daily Updates"
  });
  const [loadingVideos, setLoadingVideos] = useState(true);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const handleEmailClick = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText("wealth@fintelyxinvestments.com");
    setCopiedEmail(true);
    setTimeout(() => {
      setCopiedEmail(false);
    }, 2500);
    window.location.href = "mailto:wealth@fintelyxinvestments.com";
  };

  useEffect(() => {
    let isMounted = true;
    const fetchFeeds = async () => {
      try {
        setLoadingVideos(true);

        // 1. Fetch YouTube Feed
        const ytUrl = `${SOCIAL_FEED_CONFIG.rssParserApi}?rss_url=https://www.youtube.com/feeds/videos.xml?channel_id=${SOCIAL_FEED_CONFIG.youtubeChannelId}`;
        const ytRes = await fetch(ytUrl);
        const ytData = await ytRes.json();

        if (isMounted && ytData.status === "ok" && ytData.items && ytData.items.length > 0) {
          const latestYt = ytData.items[0];
          let videoId = "";

          if (latestYt.guid) {
            const parts = latestYt.guid.split(":");
            videoId = parts[parts.length - 1];
          } else if (latestYt.link) {
            const urlParams = new URLSearchParams(new URL(latestYt.link).search);
            videoId = urlParams.get("v");
          }

          // Use medium quality thumbnail for fast load, standard fallback to high resolution
          const thumbnail = videoId
            ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
            : latestYt.thumbnail;

          setYtVideo({
            title: latestYt.title,
            link: latestYt.link,
            thumbnail: thumbnail,
            pubDate: new Date(latestYt.pubDate).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric"
            })
          });
        }

        // 2. Fetch/Set Instagram Feed
        // Direct scrapers are fragile, so we load our curated, high-fidelity default Instagram reel.
        // If the client has a feed endpoint, we can hook it up here.
        if (isMounted) {
          setIgVideo({
            title: "Follow @lets_talk_money_with_sadhiq on Instagram for daily personal finance tips, reels, and wealth strategy updates.",
            link: SOCIAL_FEED_CONFIG.instagramProfileUrl,
            thumbnail: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=800&q=80",
            pubDate: "Daily Updates"
          });
        }

      } catch (err) {
        console.warn("Video feeds fetch failed, using high-fidelity default data:", err);
      } finally {
        if (isMounted) {
          setLoadingVideos(false);
        }
      }
    };

    fetchFeeds();
    return () => {
      isMounted = false;
    };
  }, []);

  const formatINR = (value) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="landing-viewport animate-fade-in">

      {/* 1. HERO SECTION */}
      <section className="hero-section flex-center" style={{
        position: "relative",
        minHeight: "60vh",
        width: "100%",
        overflow: "hidden"
      }}>

        <ParticleBackground />

        <div className="hero-glowing-blob blob-1"></div>
        <div className="hero-glowing-blob blob-2"></div>

        <div className="hero-content-container">
          <div className="hero-flex-wrapper">

            {/* Left Column: Legacy Typography & Reviews */}
            <div style={{ textAlign: "left" }}>
              {/* Trust Badge */}
              <div className="hero-trust-badge glass-card flex-center" style={{
                background: theme === "light" ? "rgba(15, 23, 42, 0.04)" : "rgba(255, 255, 255, 0.02)",
                border: theme === "light" ? "1px solid rgba(15, 23, 42, 0.08)" : "1px solid rgba(255, 255, 255, 0.05)"
              }}>
                <div className="flex-center" style={{ gap: "2px" }}>
                  {[...Array(5)].map((_, i) => (
                    <span key={i} style={{ color: "#00c853", fontSize: "14px" }}>★</span>
                  ))}
                </div>
                <span style={{ fontSize: "11px", color: "var(--text-secondary)", fontWeight: "600" }}>
                  Rating <strong style={{ color: theme === "light" ? "var(--text-primary)" : "#ffffff" }}>4.8 / 5</strong> (Based on 138 client reviews)
                </span>
              </div>

              <h1 className="hero-title">
                Building Clarity.<br />
                Creating Confidence.<br />
                <span className="highlight-text-gradient">Guiding Enduring Wealth.</span>
              </h1>
              <p className="hero-subtitle">
                Fintelyx Investments partners with clients to bridge knowledge, discipline, and strategy. Our awareness-led approach enables thoughtful investing, intelligent protection, and long-term financial progress.
              </p>

              <div className="hero-actions">
                <button className="btn-primary" onClick={() => {
                  const el = document.getElementById("about-section");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }} style={{ padding: "12px 28px" }}>
                  Discover More <ArrowRight size={18} />
                </button>
              </div>
            </div>

            {/* Right Column: Live Interactive Forecast Card */}
            <div className="animate-float" style={{ width: "100%", display: "flex", justifyContent: "center", zIndex: 10 }}>
              <div className="hero-dashboard-preview-card">

                {/* Header Row with Autopilot indicator */}
                <div className="preview-card-header">
                  <div className="preview-card-header-left">
                    <span className="forecast-pill">Interactive Forecast</span>
                    {isAutopilotActive && (
                      <span className="flex-center" style={{
                        background: "rgba(6, 182, 212, 0.12)",
                        border: "1px solid rgba(6, 182, 212, 0.3)",
                        color: "var(--accent-cyan)",
                        padding: "2px 8px",
                        borderRadius: "4px",
                        fontSize: "8px",
                        fontWeight: "800",
                        letterSpacing: "0.05em",
                        textTransform: "uppercase",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "4px",
                        whiteSpace: "nowrap"
                      }}>
                        <span className="autopilot-pulse-dot"></span>
                        Simulating
                      </span>
                    )}
                  </div>
                  <div className="preview-growth-badge">
                    <TrendingUp size={12} style={{ marginRight: "4px" }} /> +{(cagrSlider * 1.7).toFixed(1)}% CAGR
                  </div>
                </div>

                {/* Big Projected Value Display */}
                <div style={{ margin: "20px 0 16px" }}>
                  <span style={{ fontSize: "10px", color: "var(--text-muted)", letterSpacing: "0.08em", fontWeight: "700", textTransform: "uppercase" }}>
                    Projected Corpus (15 Years)
                  </span>
                  <h3 className="preview-corpus-number">
                    {formatINR(projectedCorpus)}
                  </h3>
                </div>

                {/* SVG Mini Interactive Chart Block */}
                <div style={{
                  position: "relative",
                  width: "100%",
                  height: "115px",
                  background: theme === "light" ? "rgba(15, 23, 42, 0.04)" : "rgba(0, 0, 0, 0.25)",
                  borderRadius: "16px",
                  border: theme === "light" ? "1px solid rgba(15, 23, 42, 0.08)" : "1px solid rgba(255, 255, 255, 0.04)",
                  padding: "12px",
                  overflow: "hidden",
                  marginTop: "16px",
                  transition: "var(--transition-smooth)"
                }}>
                  {/* Subtle Grid guides */}
                  <div style={{ position: "absolute", top: "25%", left: 0, right: 0, height: "1px", background: theme === "light" ? "rgba(15, 23, 42, 0.03)" : "rgba(255, 255, 255, 0.02)" }}></div>
                  <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: "1px", background: theme === "light" ? "rgba(15, 23, 42, 0.03)" : "rgba(255, 255, 255, 0.02)" }}></div>
                  <div style={{ position: "absolute", top: "75%", left: 0, right: 0, height: "1px", background: theme === "light" ? "rgba(15, 23, 42, 0.03)" : "rgba(255, 255, 255, 0.02)" }}></div>

                  {/* Dynamic SVG Compound Growth Vector */}
                  <svg width="100%" height="100%" viewBox="0 0 360 120" style={{ overflow: "visible" }}>
                    <defs>
                      <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--accent-green)" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="var(--accent-green)" stopOpacity="0" />
                      </linearGradient>
                    </defs>

                    {/* Shadow underneath the line */}
                    {svgPathData && (
                      <path
                        d={`${svgPathData} L 360,110 L 0,110 Z`}
                        fill="url(#chartGradient)"
                      />
                    )}

                    {/* High-resolution vector glow lines (multiple paths with decreasing opacity) */}
                    {svgPathData && (
                      <path
                        d={svgPathData}
                        fill="none"
                        stroke="var(--accent-green)"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        opacity="0.12"
                      />
                    )}
                    {svgPathData && (
                      <path
                        d={svgPathData}
                        fill="none"
                        stroke="var(--accent-green)"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        opacity="0.3"
                      />
                    )}
                    {svgPathData && (
                      <path
                        d={svgPathData}
                        fill="none"
                        stroke="var(--accent-green)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    )}

                    {/* End terminal node indicator vector glow layers */}
                    <circle
                      cx="360"
                      cy={svgEndCoordinate}
                      r="8"
                      fill="var(--accent-green)"
                      opacity="0.3"
                    />
                    <circle
                      cx="360"
                      cy={svgEndCoordinate}
                      r="4.5"
                      fill="#ffffff"
                      stroke="var(--accent-green)"
                      strokeWidth="2"
                    />
                  </svg>

                  {/* Custom coordinates tracker tag */}
                  <div style={{
                    position: "absolute",
                    top: `${Math.max(15, svgEndCoordinate - 24)}px`,
                    right: "12px",
                    background: "var(--bg-tertiary)",
                    border: theme === "light" ? "1px solid rgba(15, 23, 42, 0.1)" : "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: "6px",
                    padding: "3px 8px",
                    fontSize: "9px",
                    fontWeight: "700",
                    color: "var(--accent-cyan)",
                    boxShadow: theme === "light" ? "0 4px 10px rgba(0,0,0,0.05)" : "0 4px 10px rgba(0,0,0,0.3)",
                    transition: "var(--transition-smooth)"
                  }}>
                    Year 15
                  </div>
                </div>

                {/* Inline drag-sliders for instant compound simulation */}
                <div className="preview-sliders-panel">
                  <div className="preview-slider-item">
                    <div className="preview-slider-header">
                      <span className="preview-slider-label">Monthly SIP Allocator</span>
                      <span className="preview-slider-val">{formatINR(sipSlider)}</span>
                    </div>
                    <input
                      type="range"
                      min="5000"
                      max="150000"
                      step="1"
                      value={sipSlider}
                      onChange={(e) => handleUserInteraction(Number(e.target.value), cagrSlider)}
                      className="preview-range-input"
                    />
                  </div>

                  <div className="preview-slider-item">
                    <div className="preview-slider-header">
                      <span className="preview-slider-label">Annual Expected Returns</span>
                      <span className="preview-slider-val">{cagrSlider.toFixed(1)}% p.a.</span>
                    </div>
                    <input
                      type="range"
                      min="8"
                      max="20"
                      step="0.01"
                      value={cagrSlider}
                      onChange={(e) => handleUserInteraction(sipSlider, Number(e.target.value))}
                      className="preview-range-input"
                    />
                  </div>
                </div>

                {/* Dashboard micro metrics row */}
                <div className="preview-metrics-footer">
                  <div className="preview-metric-box">
                    <div className="preview-metric-box-label">Total Outlay</div>
                    <div className="preview-metric-box-val">{formatINR(sipSlider * 12 * 15)}</div>
                  </div>
                  <div className="preview-metric-box">
                    <div className="preview-metric-box-label">Compound Interest</div>
                    <div className="preview-metric-box-val">
                      {formatINR(Math.max(0, projectedCorpus - (sipSlider * 12 * 15)))}
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>

      </section>

      {/* 2. CURRENCY / STOCK TICKERS BAR */}
      <section className="market-ticker-banner" style={{ padding: "16px 0 8px" }}>
        <div className="ticker-track">
          {/* Group 1 */}
          <div className="ticker-group">
            <div className="ticker-item flex-center">
              <span>NSE NIFTY 50</span> <strong>23,260.50</strong> <span className="ticker-up">+0.85%</span>
            </div>
            <div className="ticker-item flex-center">
              <span>BSE SENSEX</span> <strong>76,450.10</strong> <span className="ticker-up">+0.78%</span>
            </div>
            <div className="ticker-item flex-center">
              <span>GOLD (24K / 10g)</span> <strong>₹72,450</strong> <span className="ticker-down">-0.25%</span>
            </div>
            <div className="ticker-item flex-center">
              <span>USD / INR</span> <strong>₹83.52</strong> <span className="ticker-up">+0.12%</span>
            </div>
            <div className="ticker-item flex-center">
              <span>NSE NIFTY 50</span> <strong>23,260.50</strong> <span className="ticker-up">+0.85%</span>
            </div>
            <div className="ticker-item flex-center">
              <span>BSE SENSEX</span> <strong>76,450.10</strong> <span className="ticker-up">+0.78%</span>
            </div>
            <div className="ticker-item flex-center">
              <span>GOLD (24K / 10g)</span> <strong>₹72,450</strong> <span className="ticker-down">-0.25%</span>
            </div>
            <div className="ticker-item flex-center">
              <span>USD / INR</span> <strong>₹83.52</strong> <span className="ticker-up">+0.12%</span>
            </div>
          </div>
          {/* Group 2 (Duplicate for infinite seamless loop) */}
          <div className="ticker-group">
            <div className="ticker-item flex-center">
              <span>NSE NIFTY 50</span> <strong>23,260.50</strong> <span className="ticker-up">+0.85%</span>
            </div>
            <div className="ticker-item flex-center">
              <span>BSE SENSEX</span> <strong>76,450.10</strong> <span className="ticker-up">+0.78%</span>
            </div>
            <div className="ticker-item flex-center">
              <span>GOLD (24K / 10g)</span> <strong>₹72,450</strong> <span className="ticker-down">-0.25%</span>
            </div>
            <div className="ticker-item flex-center">
              <span>USD / INR</span> <strong>₹83.52</strong> <span className="ticker-up">+0.12%</span>
            </div>
            <div className="ticker-item flex-center">
              <span>NSE NIFTY 50</span> <strong>23,260.50</strong> <span className="ticker-up">+0.85%</span>
            </div>
            <div className="ticker-item flex-center">
              <span>BSE SENSEX</span> <strong>76,450.10</strong> <span className="ticker-up">+0.78%</span>
            </div>
            <div className="ticker-item flex-center">
              <span>GOLD (24K / 10g)</span> <strong>₹72,450</strong> <span className="ticker-down">-0.25%</span>
            </div>
            <div className="ticker-item flex-center">
              <span>USD / INR</span> <strong>₹83.52</strong> <span className="ticker-up">+0.12%</span>
            </div>
          </div>
        </div>
        <div style={{ fontSize: "9px", color: "var(--text-muted)", textAlign: "center", marginTop: "8px", letterSpacing: "0.02em", opacity: 0.6 }}>
          *Indicative market indices for demonstration purposes only, not real-time feeds.
        </div>
      </section>

      {/* 3. ABOUT US & PHILOSOPHY PILLARS */}
      <section id="about-section" className="features-grid-section">
        <div className="content-container">
          <div className="section-title-wrapper text-center">
            <span className="partner-role-pill" style={{ display: "block", marginBottom: "8px", textTransform: "uppercase", fontSize: "11px", color: "var(--accent-green)", fontWeight: "800", letterSpacing: "0.1em" }}>ABOUT US</span>
            <h2>Trusted Partner Along Your Financial Journey</h2>
            <p style={{ maxWidth: "800px", margin: "16px auto 0", lineHeight: "1.8", color: "var(--text-secondary)" }}>
              Fintelyx Investments partners with clients to bridge knowledge, discipline, and strategy. Our awareness-led approach and curated solutions enable thoughtful investing, intelligent protection, and long-term financial progress.
            </p>
          </div>

          <div className="features-grid" style={{ marginTop: "40px" }}>
            {/* Card 1 */}
            <div className="glass-card feature-card">
              <Cpu className="feature-icon" size={28} />
              <h3>Clarity Above Complexity</h3>
              <p>Thoughtfully designed investment frameworks that align your financial goals with appropriate risk and time horizons.</p>
            </div>

            {/* Card 2 */}
            <div className="glass-card feature-card">
              <TrendingUp className="feature-icon" size={28} />
              <h3>Structure That Evolves</h3>
              <p>Work with experienced partners who bring clarity to market complexity and help you navigate investment choices with confidence.</p>
            </div>

            {/* Card 3 */}
            <div className="glass-card feature-card">
              <Landmark className="feature-icon" size={28} />
              <h3>Partnership Over Transactions</h3>
              <p>A disciplined approach that integrates risk assessment, goal mapping, and product suitability to deliver customised investment outcomes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SMART INVESTMENTS SOLUTIONS GRID */}
      <section className="features-grid-section">
        <div className="content-container">
          <div className="section-title-wrapper text-center">
            <span className="partner-role-pill" style={{ display: "block", marginBottom: "8px", textTransform: "uppercase", fontSize: "11px", color: "var(--accent-green)", fontWeight: "800", letterSpacing: "0.1em" }}>OUR SOLUTIONS</span>
            <h2>Smart Investments. Enduring Value.</h2>
            <p>Curated access and advisory mapping aligned to your individual profile.</p>
          </div>

          <div className="solutions-grid">
            {servicesData.slice(0, 6).map((service, idx) => (
              <div
                key={idx}
                className="glass-card feature-card"
                onClick={() => setSelectedService(service)}
                style={{ cursor: "pointer" }}
              >
                <h4 style={{ fontSize: "18px", color: "var(--text-primary)", marginBottom: "12px", display: "flex", alignItems: "center", gap: "10px", fontWeight: "700" }}>
                  <div style={{ transform: "scale(0.8)", display: "flex" }}>{service.icon}</div>
                  {service.title}
                </h4>
                <p>{service.shortDesc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PROCESS - HOW WE WORK */}
      <section className="features-grid-section">
        <div className="content-container">
          <div className="section-title-wrapper text-center">
            <span className="partner-role-pill" style={{ display: "block", marginBottom: "8px", textTransform: "uppercase", fontSize: "11px", color: "var(--accent-green)", fontWeight: "800", letterSpacing: "0.1em" }}>OUR WORKFLOW</span>
            <h2>How We Work</h2>
            <p>A structured, client-first collaborative model designed for clarity and execution.</p>
          </div>

          <div className="workflow-grid">
            {/* Step 1 */}
            <div className="workflow-card">
              <div className="workflow-number">01</div>
              <div className="workflow-content">
                <h3>Discovery</h3>
                <p>Understanding your priorities, values, and capital constraints.</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="workflow-card">
              <div className="workflow-number">02</div>
              <div className="workflow-content">
                <h3>Evaluation</h3>
                <p>Suitability mapping, asset screening, and provider suitability evaluation.</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="workflow-card">
              <div className="workflow-number">03</div>
              <div className="workflow-content">
                <h3>Facilitation</h3>
                <p>Onboarding, documentation, and coordination.</p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="workflow-card">
              <div className="workflow-number">04</div>
              <div className="workflow-content">
                <h3>Long Term Partnership</h3>
                <p>Reviews, adjustments, and continuous guidance.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5.5 VIDEO INSIGHTS SECTION */}
      <section className="video-insights-section">
        <div className="content-container">
          <div className="section-title-wrapper text-center">
            <span className="partner-role-pill" style={{ display: "block", marginBottom: "8px", textTransform: "uppercase", fontSize: "11px", color: "var(--accent-green)", fontWeight: "800", letterSpacing: "0.1em" }}>WATCH & LEARN</span>
            <h2>Latest Video Insights</h2>
            <p>Explore our recent financial guidance updates directly on YouTube and Instagram.</p>
          </div>

          <div className="video-cards-grid">
            {/* YouTube Card */}
            {loadingVideos ? (
              <div className="video-insight-card">
                <div className="video-thumbnail-container skeleton-pulse"></div>
                <div className="video-info-block">
                  <div className="skeleton-title skeleton-pulse"></div>
                  <div className="skeleton-title skeleton-pulse" style={{ width: "70%" }}></div>
                  <div className="video-info-footer">
                    <div className="skeleton-text skeleton-pulse"></div>
                  </div>
                </div>
              </div>
            ) : (
              <a href={ytVideo.link} target="_blank" rel="noopener noreferrer" className="video-insight-card">
                <div className="video-thumbnail-container">
                  <span className="video-badge video-badge-youtube">
                    <YoutubeIcon size={12} /> YouTube
                  </span>
                  <img src={ytVideo.thumbnail} alt={ytVideo.title} className="video-thumbnail" />
                  <div className="video-play-overlay">
                    <div className="play-btn-circle">
                      <PlayIcon size={24} fill="white" style={{ marginLeft: "4px" }} />
                    </div>
                  </div>
                </div>
                <div className="video-info-block">
                  <h3 className="video-info-title">{ytVideo.title}</h3>
                  <div className="video-info-footer">
                    <span className="video-info-date">{ytVideo.pubDate}</span>
                    <span className="video-info-action">
                      Watch Video <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </a>
            )}

            {/* Instagram Card */}
            {loadingVideos ? (
              <div className="video-insight-card">
                <div className="video-thumbnail-container reel-container skeleton-pulse"></div>
                <div className="video-info-block">
                  <div className="skeleton-title skeleton-pulse"></div>
                  <div className="skeleton-title skeleton-pulse" style={{ width: "70%" }}></div>
                  <div className="video-info-footer">
                    <div className="skeleton-text skeleton-pulse"></div>
                  </div>
                </div>
              </div>
            ) : (
              <a href={igVideo.link} target="_blank" rel="noopener noreferrer" className="video-insight-card">
                <div className="video-thumbnail-container reel-container">
                  <span className="video-badge video-badge-instagram">
                    <InstagramIcon size={12} /> Instagram
                  </span>
                  <img src={igVideo.thumbnail} alt={igVideo.title} className="video-thumbnail" />
                  <div className="video-play-overlay">
                    <div className="play-btn-circle">
                      <PlayIcon size={24} fill="white" style={{ marginLeft: "4px" }} />
                    </div>
                  </div>
                </div>
                <div className="video-info-block">
                  <h3 className="video-info-title">{igVideo.title}</h3>
                  <div className="video-info-footer">
                    <span className="video-info-date">{igVideo.pubDate}</span>
                    <span className="video-info-action">
                      View Reel <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </a>
            )}
          </div>
        </div>
      </section>

      {/* 6. CTA BANNER SECTION */}
      <section className="cta-banner-section">
        <div className="content-container">
          <div className="section-title-wrapper text-center" style={{ marginBottom: "32px" }}>
            <span className="partner-role-pill" style={{ display: "block", marginBottom: "8px", textTransform: "uppercase", fontSize: "11px", color: "var(--accent-green)", fontWeight: "800", letterSpacing: "0.1em" }}>GET IN TOUCH</span>
            <h2>Where Investments Meet Intelligent Strategy.</h2>
            <p>Ready to structure your wealth path? Connect with our designated partners today.</p>
          </div>

          <div className="flex-center" style={{ gap: "24px", flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
            <a href="tel:+919008867475" className="btn-primary" style={{ padding: "14px 28px", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "14px", fontWeight: "700" }}>
              Call Partner: +91 90088 67475
            </a>
            <a
              href="mailto:wealth@fintelyxinvestments.com"
              onClick={handleEmailClick}
              className="btn-secondary"
              style={{ padding: "14px 28px", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "14px", fontWeight: "700" }}
            >
              {copiedEmail ? "Email Copied!" : "Mail us: wealth@fintelyxinvestments.com"}
            </a>
          </div>
        </div>
      </section>

      {/* 7. AMFI REGISTRATION LICENSE & CREDENTIALS SECTION */}
      <section className="landing-regulatory-badge-section flex-center">
        <div className="content-container flex-center">
          <div className="regulatory-glass-badge flex-center">
            <div className="badge-stamp-icon flex-center">
              <ShieldCheck size={32} />
            </div>
            <div className="regulatory-text">
              <h4>Fintelyx Investment Services LLP</h4>
              <p className="reg-badge-desc">
                AMFI Registered Mutual Fund Distributor &nbsp;|&nbsp; <strong>ARN-345579</strong>
              </p>
              <p className="reg-legal-note">
                Mutual Fund investments are subject to market risks. Please read all scheme-related documents carefully before investing. ARN distributor license persists in accordance with AMFI regulations.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* 7. SERVICE DETAILS MODAL */}
      {selectedService && createPortal(
        <div className="modal-overlay" onClick={() => setSelectedService(null)} style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.7)", zIndex: 99999, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
          <div className="glass-card animate-fade-in" onClick={e => e.stopPropagation()} style={{ maxWidth: "600px", width: "100%", padding: "40px", position: "relative", textAlign: "left", background: "var(--bg-secondary)", border: "1px solid var(--border-light)", boxShadow: "0 20px 40px rgba(0,0,0,0.4)" }}>
            <button onClick={() => setSelectedService(null)} style={{ position: "absolute", top: "20px", right: "20px", background: "transparent", border: "none", color: "var(--text-secondary)", cursor: "pointer", fontSize: "28px", display: "flex", alignItems: "center", justifyContent: "center", width: "32px", height: "32px", borderRadius: "50%" }}>&times;</button>
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
              <div className="flex-center" style={{ background: "rgba(16, 185, 129, 0.1)", color: "#10b981", width: "56px", height: "56px", borderRadius: "12px", flexShrink: 0 }}>
                {selectedService.icon}
              </div>
              <h3 style={{ fontSize: "24px", fontWeight: "700", margin: 0, color: "var(--text-primary)" }}>{selectedService.title}</h3>
            </div>
            <p style={{ fontSize: "15px", color: "var(--text-secondary)", lineHeight: "1.7", marginBottom: "24px" }}>
              {selectedService.desc}
            </p>
            <div>
              <span style={{ fontSize: "12px", fontWeight: "700", textTransform: "uppercase", color: "var(--accent-cyan)", letterSpacing: "0.05em", display: "block", marginBottom: "12px" }}>
                Key Highlights
              </span>
              <ul style={{ display: "flex", flexWrap: "wrap", gap: "8px", padding: 0, margin: 0, listStyle: "none" }}>
                {selectedService.bullets.map((bullet, bIdx) => (
                  <li key={bIdx} style={{ fontSize: "12px", background: "var(--bg-tertiary)", border: "1px solid var(--border-light)", borderRadius: "6px", padding: "6px 12px", color: "var(--text-secondary)" }}>
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
