import { useState } from "react";
import { Target, Download, Landmark } from "lucide-react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import fintelyxLogo from "../../assets/Fintelyx_Logo_Trimmed.png";
import "../../styles/calculators.css";

// Reusable Print Template internal to Goal Planner
const GoalPDFTemplate = ({ initialCapital, monthlySaving, rate, years, adjustInflation, inflationRate, compoundFreq, results, isPreview }) => {
  const fmt = (v) => "₹" + Math.round(v).toLocaleString("en-IN");
  const today = new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" });
  
  const freqMap = { 12: "Monthly", 4: "Quarterly", 1: "Annually" };

  return (
    <div 
      id="goal-pdf-template"
      style={{
        position: isPreview ? "relative" : "absolute",
        left: isPreview ? "0" : "-9999px",
        top: 0,
        width: "794px",
        height: "1123px",
        backgroundColor: "#ffffff",
        color: "#0f172a",
        padding: "40px",
        fontFamily: "'Inter', sans-serif",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        zIndex: isPreview ? 1 : -9999
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "2px solid #10b981", paddingBottom: "20px", marginBottom: "30px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <img src={fintelyxLogo} alt="Fintelyx Logo" style={{ height: "40px", objectFit: "contain" }} />
          <div>
            <h1 style={{ margin: 0, fontSize: "24px", fontWeight: "800", color: "#0f172a", letterSpacing: "-0.5px" }}>Fintelyx Investments</h1>
            <p style={{ margin: 0, fontSize: "12px", color: "#64748b", fontWeight: "600", textTransform: "uppercase" }}>Strategic Wealth Goal Projection</p>
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <p style={{ margin: 0, fontSize: "12px", color: "#64748b" }}>Date Generated</p>
          <p style={{ margin: 0, fontSize: "14px", color: "#0f172a", fontWeight: "600" }}>{today}</p>
        </div>
      </div>

      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h2 style={{ fontSize: "28px", margin: "0 0 20px 0", color: "#0f172a" }}>Wealth Goal Planner Report</h2>
        <div style={{ display: "flex", justifyContent: "space-between", background: "#f8fafc", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0", flexWrap: "wrap", gap: "16px" }}>
          <div style={{ minWidth: "120px" }}>
            <p style={{ margin: 0, fontSize: "12px", color: "#64748b", textTransform: "uppercase", fontWeight: "600" }}>Initial Capital</p>
            <p style={{ margin: "4px 0 0 0", fontSize: "18px", color: "#0f172a", fontWeight: "700" }}>{fmt(initialCapital)}</p>
          </div>
          <div style={{ minWidth: "120px" }}>
            <p style={{ margin: 0, fontSize: "12px", color: "#64748b", textTransform: "uppercase", fontWeight: "600" }}>Monthly Saving</p>
            <p style={{ margin: "4px 0 0 0", fontSize: "18px", color: "#0f172a", fontWeight: "700" }}>{fmt(monthlySaving)}</p>
          </div>
          <div style={{ minWidth: "120px" }}>
            <p style={{ margin: 0, fontSize: "12px", color: "#64748b", textTransform: "uppercase", fontWeight: "600" }}>Expected Return</p>
            <p style={{ margin: "4px 0 0 0", fontSize: "18px", color: "#0f172a", fontWeight: "700" }}>{rate}% p.a.</p>
          </div>
          <div style={{ minWidth: "120px" }}>
            <p style={{ margin: 0, fontSize: "12px", color: "#64748b", textTransform: "uppercase", fontWeight: "600" }}>Duration</p>
            <p style={{ margin: "4px 0 0 0", fontSize: "18px", color: "#0f172a", fontWeight: "700" }}>{years} Years</p>
          </div>
          <div style={{ minWidth: "120px" }}>
            <p style={{ margin: 0, fontSize: "12px", color: "#64748b", textTransform: "uppercase", fontWeight: "600" }}>Compounding</p>
            <p style={{ margin: "4px 0 0 0", fontSize: "18px", color: "#0f172a", fontWeight: "700" }}>{freqMap[compoundFreq]}</p>
          </div>
        </div>
      </div>

      <div style={{ background: "#0f172a", color: "white", padding: "30px", borderRadius: "16px", textAlign: "center", marginBottom: "40px" }}>
        <p style={{ margin: 0, fontSize: "14px", color: "#94a3b8", textTransform: "uppercase", fontWeight: "600", letterSpacing: "1px" }}>Estimated Target Corpus</p>
        <h1 style={{ margin: "10px 0", fontSize: "48px", color: "#10b981", fontWeight: "800" }}>{fmt(results.nominal)}</h1>
        {adjustInflation && (
          <div style={{ marginTop: "12px", display: "inline-block", padding: "8px 16px", background: "rgba(239, 68, 68, 0.1)", borderRadius: "8px" }}>
            <span style={{ fontSize: "12px", color: "#f87171" }}>PURCHASING POWER IN TODAY'S MONEY ({inflationRate}% INFLATION): </span>
            <strong style={{ fontSize: "16px", color: "#f87171", marginLeft: "6px" }}>{fmt(results.real)}</strong>
          </div>
        )}
        <div style={{ display: "flex", justifyContent: "center", gap: "40px", marginTop: "20px", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "20px" }}>
          <div>
            <p style={{ margin: 0, fontSize: "12px", color: "#94a3b8" }}>Total Invested Capital</p>
            <p style={{ margin: 0, fontSize: "18px", fontWeight: "600" }}>{fmt(results.invested)}</p>
          </div>
          <div>
            <p style={{ margin: 0, fontSize: "12px", color: "#94a3b8" }}>Est. Compound Gains</p>
            <p style={{ margin: 0, fontSize: "18px", fontWeight: "600" }}>{fmt(results.earnings)}</p>
          </div>
        </div>
      </div>

      <div style={{ marginTop: "auto", borderTop: "1px solid #e2e8f0", paddingTop: "20px" }}>
        <p style={{ margin: "0 0 10px 0", fontSize: "10px", color: "#94a3b8", lineHeight: "1.6" }}>
          <strong>Statutory Disclaimer:</strong> Fintelyx Investment Services LLP (LLPIN: ACP-0306). 
          Mutual fund investments are subject to market risks, read all scheme-related documents carefully. The projections shown above are based on assumed rates of return and do not guarantee future performance.
        </p>
      </div>
    </div>
  );
};

export default function GoalPlanner() {
  // Input states
  const [initialCapital, setInitialCapital] = useState(100000);
  const [monthlySaving, setMonthlySaving] = useState(15000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(25);
  
  // Advanced options
  const [compoundFreq, setCompoundFreq] = useState(12); // 12 = Monthly, 4 = Quarterly, 1 = Annually
  const [adjustInflation, setAdjustInflation] = useState(false);
  const [inflationRate, setInflationRate] = useState(6);

  const fmt = (v) => {
    if (v >= 10000000) return "₹" + (v / 10000000).toFixed(2) + " Cr";
    if (v >= 100000) return "₹" + (v / 100000).toFixed(1) + " L";
    return "₹" + Math.round(v).toLocaleString("en-IN");
  };

  // General Compounding Compound Interest Math:
  // fv = P(1 + r/n)^(nt) + PMT * [((1 + r/n)^(nt) - 1) / (r/n)] * (1 + r/n)
  const calculateCompound = () => {
    const P = initialCapital;
    const PMT = monthlySaving;
    const r = rate / 100;
    const n = compoundFreq; // compounding cycles per year
    const t = years;

    // Monthly PMT converted to compounding cycle PMT
    const pmtPerCycle = PMT * (12 / n);
    const ratePerCycle = r / n;
    const totalCycles = n * t;

    // Compound initial principal
    const fvPrincipal = P * Math.pow(1 + ratePerCycle, totalCycles);

    // Compound recurring contributions
    let fvContributions;
    if (ratePerCycle > 0) {
      fvContributions = pmtPerCycle * ((Math.pow(1 + ratePerCycle, totalCycles) - 1) / ratePerCycle);
      // If payment is made at the beginning of the period
      fvContributions *= (1 + ratePerCycle);
    } else {
      fvContributions = pmtPerCycle * totalCycles;
    }

    const nominalValue = Math.round(fvPrincipal + fvContributions);
    const totalInvested = Math.round(P + PMT * 12 * t);
    
    // Inflation calculation: fv_real = fv_nominal / (1 + inf)^t
    let realValue = nominalValue;
    if (adjustInflation) {
      realValue = Math.round(nominalValue / Math.pow(1 + inflationRate / 100, t));
    }

    return {
      nominal: nominalValue,
      real: realValue,
      invested: totalInvested,
      earnings: nominalValue - totalInvested
    };
  };

  const results = calculateCompound();

  const [isDownloading, setIsDownloading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const handlePreviewPDF = () => {
    setShowPreview(true);
  };

  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    const element = document.getElementById("goal-pdf-template");
    if (!element) return setIsDownloading(false);

    try {
      const canvas = await html2canvas(element, { scale: 2, useCORS: true, logging: false, backgroundColor: "#ffffff", windowWidth: 794, windowHeight: 1123 });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({ orientation: "portrait", unit: "px", format: [794, 1123] });
      pdf.addImage(imgData, "PNG", 0, 0, 794, 1123);
      pdf.save(`Fintelyx_Goal_Report_${new Date().toISOString().split("T")[0]}.pdf`);
    } catch (err) {
      console.error(err);
      alert("Error generating PDF.");
    } finally {
      setIsDownloading(false);
      setShowPreview(false);
    }
  };

  return (
    <div className="calc-container">
      <div className="calc-layout-grid">
        
        {/* Left Side: Customize Inputs */}
        <div className="glass-card calc-card-controls">
          <div className="calc-card-header">
            <h3>Configure Your Goal</h3>
            <span className="badge-glow-green">Advanced Compounding</span>
          </div>

          <div className="controls-stack">
            {/* Input 1: Initial Capital */}
            <div className="slider-group">
              <div className="slider-header">
                <span className="slider-label">Initial Lump Sum</span>
                <div className="slider-val-box">
                  <span>₹</span>
                  <input 
                    type="number" 
                    value={initialCapital}
                    onChange={(e) => setInitialCapital(Math.max(0, parseInt(e.target.value) || 0))}
                  />
                </div>
              </div>
              <input 
                type="range" 
                min="0" 
                max="5000000" 
                step="5000"
                value={initialCapital}
                onChange={(e) => setInitialCapital(parseInt(e.target.value))}
              />
              <div className="range-limits">
                <span>₹0</span>
                <span>₹50 Lakhs</span>
              </div>
            </div>

            {/* Input 2: Monthly Saving */}
            <div className="slider-group">
              <div className="slider-header">
                <span className="slider-label">Monthly Addition</span>
                <div className="slider-val-box">
                  <span>₹</span>
                  <input 
                    type="number" 
                    value={monthlySaving}
                    onChange={(e) => setMonthlySaving(Math.max(0, parseInt(e.target.value) || 0))}
                  />
                </div>
              </div>
              <input 
                type="range" 
                min="0" 
                max="100000" 
                step="1000"
                value={monthlySaving}
                onChange={(e) => setMonthlySaving(parseInt(e.target.value))}
              />
              <div className="range-limits">
                <span>₹0</span>
                <span>₹1 Lakh</span>
              </div>
            </div>

            {/* Input 3: Rate */}
            <div className="slider-group">
              <div className="slider-header">
                <span className="slider-label">Annual Returns (%)</span>
                <div className="slider-val-box">
                  <input 
                    type="number" 
                    value={rate}
                    onChange={(e) => setRate(Math.min(30, Math.max(1, parseInt(e.target.value) || 1)))}
                  />
                  <span>%</span>
                </div>
              </div>
              <input 
                type="range" 
                min="1" 
                max="30" 
                step="1"
                value={rate}
                onChange={(e) => setRate(parseInt(e.target.value))}
              />
              <div className="range-limits">
                <span>1%</span>
                <span>30%</span>
              </div>
            </div>

            {/* Input 4: Duration */}
            <div className="slider-group">
              <div className="slider-header">
                <span className="slider-label">Duration (Years)</span>
                <div className="slider-val-box">
                  <input 
                    type="number" 
                    value={years}
                    onChange={(e) => {
                      let val = Math.min(50, Math.max(1, parseInt(e.target.value) || 1));
                      setYears(val);
                    }}
                  />
                  <span>yrs</span>
                </div>
              </div>
              <input 
                type="range" 
                min="1" 
                max="50" 
                step="1"
                value={years}
                onChange={(e) => setYears(parseInt(e.target.value))}
              />
              <div className="range-limits">
                <span>1 Year</span>
                <span>50 Years</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Projections and Compounding Frequency Options */}
        <div className="calc-analytics-column">
          
          {/* Big Output Target Card */}
          <div className="glass-card analytics-card flex-center" style={{ flexDirection: "column", padding: "40px", textAlign: "center" }}>
            <div className="flex-center" style={{ background: "rgba(16, 185, 129, 0.1)", width: "64px", height: "64px", borderRadius: "50%", marginBottom: "16px" }}>
              <Target size={32} style={{ color: "#10b981" }} />
            </div>
            <span style={{ fontSize: "13px", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Estimated Target Corpus</span>
            <h1 style={{ fontSize: "48px", color: "var(--text-primary)", textShadow: "0 0 20px rgba(255, 255, 255, 0.15)", margin: "8px 0" }}>
              {fmt(results.nominal)}
            </h1>
            <p style={{ fontSize: "14px", color: "var(--text-secondary)" }}>
              After <span style={{ color: "var(--accent-green)", fontWeight: "700" }}>{years} years</span> at <span style={{ color: "var(--accent-cyan)", fontWeight: "700" }}>{rate}% annual returns</span>.
            </p>

            {/* Inflation-adjusted visualizer if toggled */}
            {adjustInflation && (
              <div className="inflation-real-val animate-fade-in" style={{ marginTop: "16px", padding: "12px 24px", background: "rgba(239, 68, 68, 0.08)", border: "1px solid rgba(239, 68, 68, 0.2)", borderRadius: "12px" }}>
                <span style={{ fontSize: "12px", color: "#f87171" }}>PURCHASING POWER IN TODAY'S MONEY: </span>
                <strong style={{ fontSize: "18px", color: "#f87171", marginLeft: "6px" }}>{fmt(results.real)}</strong>
              </div>
            )}
          </div>

          {/* Advanced Configurations Tab: Compounding Frequency & Inflation */}
          <div className="glass-card analytics-card">
            <div className="calc-card-header">
              <h3>Advanced Wealth Variables</h3>
              <span className="badge-glow-cyan">Compounding & Inflation</span>
            </div>

            <div className="advanced-inputs-grid" style={{ display: "flex", flexDirection: "column", gap: "24px", marginTop: "10px" }}>
              
              {/* Compounding Frequency Options */}
              <div className="adv-parameter-row">
                <div className="adv-lbl-col">
                  <span className="slider-label" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    Compounding Cycles
                  </span>
                  <p style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "2px" }}>Controls compounding frequency calculation logic.</p>
                </div>

                <div className="custom-segmented-control flex-center">
                  <button 
                    className={`segmented-tab ${compoundFreq === 12 ? "active" : ""}`}
                    onClick={() => setCompoundFreq(12)}
                  >
                    Monthly
                  </button>
                  <button 
                    className={`segmented-tab ${compoundFreq === 4 ? "active" : ""}`}
                    onClick={() => setCompoundFreq(4)}
                  >
                    Quarterly
                  </button>
                  <button 
                    className={`segmented-tab ${compoundFreq === 1 ? "active" : ""}`}
                    onClick={() => setCompoundFreq(1)}
                  >
                    Annually
                  </button>
                </div>
              </div>

              {/* Inflation Adjustment Toggle */}
              <div className="adv-parameter-row" style={{ borderTop: "1px solid var(--border-light)", paddingTop: "20px" }}>
                <div className="adv-lbl-col">
                  <span className="slider-label" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    Inflation Adjuster
                  </span>
                  <p style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "2px" }}>Calculates real returns using a customized inflation index.</p>
                </div>

                <div className="flex-center" style={{ gap: "16px" }}>
                  {adjustInflation && (
                    <div className="slider-val-box" style={{ padding: "4px 8px" }}>
                      <input 
                        type="number" 
                        value={inflationRate} 
                        onChange={(e) => setInflationRate(Math.max(0, parseInt(e.target.value) || 0))}
                        style={{ width: "40px", fontSize: "14px" }}
                      />
                      <span style={{ fontSize: "12px" }}>%</span>
                    </div>
                  )}
                  
                  <button 
                    className={`btn-secondary ${adjustInflation ? "btn-active-green" : ""}`}
                    onClick={() => setAdjustInflation(!adjustInflation)}
                    style={{ padding: "8px 16px", fontSize: "13px" }}
                  >
                    {adjustInflation ? "Enabled" : "Disabled"}
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Simple Wealth Projections comparison grid */}
          <div className="glass-card milestones-card">
            <div className="calc-card-header">
              <h3>Wealth Contributions Breakdown</h3>
              <span className="badge-glow-green">Summary</span>
            </div>

            <div className="milestone-items-grid">
              <div className="milestone-block">
                <span className="m-year-lbl">Invested Capital</span>
                <span className="m-val-lbl" style={{ color: "var(--text-secondary)" }}>{fmt(results.invested)}</span>
                <span className="m-inv-lbl">Lump sum + monthly inputs</span>
              </div>
              <div className="milestone-block highlight-milestone">
                <span className="m-year-lbl">Compound Gains</span>
                <span className="m-val-lbl" style={{ color: "#10b981" }}>{fmt(results.earnings)}</span>
                <span className="m-inv-lbl">Pure compound growth</span>
              </div>
            </div>
            
            <div className="premium-report-download" style={{ borderTop: "1px solid var(--border-light)", paddingTop: "20px", marginTop: "16px", display: "flex", justifyContent: "flex-end" }}>
              <button className="btn-primary" onClick={handlePreviewPDF} style={{ padding: "10px 20px", fontSize: "14px", opacity: isDownloading ? 0.7 : 1 }} disabled={isDownloading}>
                <Download size={16} /> Preview & Download PDF Report
              </button>
            </div>
          </div>

        </div>

      </div>

      <div style={{ position: "absolute", top: 0, left: 0, zIndex: -9999, pointerEvents: "none" }}>
        <GoalPDFTemplate initialCapital={initialCapital} monthlySaving={monthlySaving} rate={rate} years={years} adjustInflation={adjustInflation} inflationRate={inflationRate} compoundFreq={compoundFreq} results={results} isPreview={false} />
      </div>

      {showPreview && (
        <div className="modal-overlay" style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.8)", zIndex: 99999, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div className="glass-card animate-fade-in" style={{ padding: "20px", display: "flex", flexDirection: "column", alignItems: "center", maxHeight: "95vh", overflow: "hidden", background: "var(--bg-secondary)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", width: "100%", marginBottom: "16px", alignItems: "center" }}>
              <h2 style={{ margin: 0, fontSize: "20px", color: "var(--text-primary)" }}>PDF Preview</h2>
              <button onClick={() => setShowPreview(false)} style={{ background: "transparent", border: "none", color: "var(--text-secondary)", cursor: "pointer", fontSize: "24px" }}>&times;</button>
            </div>
            
            <div style={{ width: "357px", height: "505px", overflow: "hidden", position: "relative", border: "1px solid var(--border-light)", borderRadius: "8px", background: "#fff" }}>
              <div style={{ transform: "scale(0.45)", transformOrigin: "top left", width: "794px", height: "1123px" }}>
                <GoalPDFTemplate initialCapital={initialCapital} monthlySaving={monthlySaving} rate={rate} years={years} adjustInflation={adjustInflation} inflationRate={inflationRate} compoundFreq={compoundFreq} results={results} isPreview={true} />
              </div>
            </div>

            <div style={{ display: "flex", gap: "12px", marginTop: "20px", width: "100%", justifyContent: "flex-end" }}>
              <button className="btn-secondary" onClick={() => setShowPreview(false)}>Cancel</button>
              <button className="btn-primary" onClick={handleDownloadPDF} disabled={isDownloading}>
                {isDownloading ? "Generating..." : "Confirm & Download"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
