import React, { useState } from "react";
import { Target } from "lucide-react";
import "../../styles/calculators.css";

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
    let fvContributions = 0;
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
                <span className="m-val-lbl" style={{ color: "#94a3b8" }}>{fmt(results.invested)}</span>
                <span className="m-inv-lbl">Lump sum + monthly inputs</span>
              </div>
              <div className="milestone-block highlight-milestone">
                <span className="m-year-lbl">Compound Gains</span>
                <span className="m-val-lbl" style={{ color: "#10b981" }}>{fmt(results.earnings)}</span>
                <span className="m-inv-lbl">Pure compound growth</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
