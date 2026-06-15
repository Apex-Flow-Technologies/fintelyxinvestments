import { useState, useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
import { Sparkles, Download } from "lucide-react";
import "../../styles/calculators.css";

// Register all Chart.js structures
Chart.register(...registerables);

export default function SIPCalculator({ theme }) {
  const chartRef = useRef(null);
  const canvasRef = useRef(null);

  // Inputs State
  const [sip, setSip] = useState(10000);
  const [stepup, setStepup] = useState(10);
  const [years, setYears] = useState(20);
  const [activeRate, setActiveRate] = useState(12);

  // Formatter for Indian Currency Lakhs/Crores
  const fmt = (v) => {
    if (v >= 10000000) return "₹" + (v / 10000000).toFixed(2) + " Cr";
    if (v >= 100000) return "₹" + (v / 100000).toFixed(1) + " L";
    return "₹" + Math.round(v).toLocaleString("en-IN");
  };

  // Math formula for monthly SIP with annual Step-Up
  const calcSIP = (monthly, rate, durationYears, annualStepUp) => {
    const r = rate / 100 / 12;
    let fv = 0, inv = 0, cur = monthly;
    for (let y = 0; y < durationYears; y++) {
      for (let m = 0; m < 12; m++) {
        fv = (fv + cur) * (1 + r);
        inv += cur;
      }
      cur *= (1 + annualStepUp / 100);
    }
    return { fv: Math.round(fv), inv: Math.round(inv), gain: Math.round(fv - inv) };
  };

  // Calculation Results
  const results12 = calcSIP(sip, 12, years, stepup);
  const results10 = calcSIP(sip, 10, years, stepup);
  const results15 = calcSIP(sip, 15, years, stepup);
  
  const mainResults = calcSIP(sip, activeRate, years, stepup);
  
  const invPct = mainResults.fv > 0 ? Math.round((mainResults.inv / mainResults.fv) * 100) : 0;
  const gainPct = 100 - invPct;

  // Milestone Calculations
  const milestone10 = calcSIP(sip, 12, 10, stepup);
  const milestone20 = calcSIP(sip, 12, 20, stepup);
  const milestone30 = calcSIP(sip, 12, 30, stepup);

  // Trigger Live Chart Re-draws
  useEffect(() => {
    if (!canvasRef.current) return;

    const labels = [];
    const d10 = [];
    const d12 = [];
    const d15 = [];

    // Calculate details in steps
    const step = Math.max(1, Math.floor(years / 8));
    for (let y = step; y <= years; y += step) {
      labels.push(y + " Yrs");
      d10.push(calcSIP(sip, 10, y, stepup).fv);
      d12.push(calcSIP(sip, 12, y, stepup).fv);
      d15.push(calcSIP(sip, 15, y, stepup).fv);
    }

    // Include the exact final year if not matched
    if (years % step !== 0) {
      labels.push(years + " Yrs");
      d10.push(calcSIP(sip, 10, years, stepup).fv);
      d12.push(calcSIP(sip, 12, years, stepup).fv);
      d15.push(calcSIP(sip, 15, years, stepup).fv);
    }

    const ctx = canvasRef.current.getContext("2d");

    // Clear existing chart
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const gradientMain = ctx.createLinearGradient(0, 0, 0, 300);
    gradientMain.addColorStop(0, "rgba(16, 185, 129, 0.2)");
    gradientMain.addColorStop(1, "rgba(16, 185, 129, 0)");

    chartRef.current = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "10% Returns",
            data: d10,
            borderColor: "rgba(148, 163, 184, 0.4)",
            borderWidth: 1.5,
            borderDash: [5, 5],
            pointRadius: 0,
            fill: false,
            tension: 0.3
          },
          {
            label: "12% Returns",
            data: d12,
            borderColor: "#10b981",
            borderWidth: 3,
            pointRadius: 4,
            pointBackgroundColor: "#10b981",
            fill: "start",
            backgroundColor: gradientMain,
            tension: 0.3
          },
          {
            label: "15% Returns",
            data: d15,
            borderColor: "#06b6d4",
            borderWidth: 1.5,
            borderDash: [3, 3],
            pointRadius: 0,
            fill: false,
            tension: 0.3
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: theme === "light" ? "rgba(255, 255, 255, 0.98)" : "rgba(15, 19, 26, 0.95)",
            titleColor: theme === "light" ? "#0f172a" : "#f8fafc",
            bodyColor: theme === "light" ? "#475569" : "#94a3b8",
            borderColor: theme === "light" ? "rgba(15, 23, 42, 0.1)" : "rgba(255, 255, 255, 0.1)",
            borderWidth: 1,
            padding: 12,
            callbacks: {
              label: (context) => {
                return `${context.dataset.label.split(" ")[0]}: ${fmt(context.parsed.y)}`;
              }
            }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: theme === "light" ? "#475569" : "#64748b", font: { family: "Outfit", size: 10 } }
          },
          y: {
            grid: { color: theme === "light" ? "rgba(15, 23, 42, 0.06)" : "rgba(255, 255, 255, 0.04)" },
            ticks: {
              color: theme === "light" ? "#475569" : "#64748b",
              font: { family: "Outfit", size: 10 },
              callback: (val) => fmt(val)
            }
          }
        }
      }
    });

    return () => {
      if (chartRef.current) chartRef.current.destroy();
    };
  }, [sip, stepup, years, theme]);

  // Mock PDF Wealth report downloads
  const handleDownloadPDF = () => {
    window.print();
  };

  return (
    <div className="calc-container">
      <div className="calc-layout-grid">
        
        {/* Left Hand Card: Customizer Controls */}
        <div className="glass-card calc-card-controls">
          <div className="calc-card-header">
            <h3>Customize Your SIP</h3>
            <span className="badge-glow-green">Step-Up Enabled</span>
          </div>

          <div className="controls-stack">
            {/* Input 1: SIP Amount */}
            <div className="slider-group">
              <div className="slider-header">
                <span className="slider-label">Monthly SIP Amount</span>
                <div className="slider-val-box">
                  <span>₹</span>
                  <input 
                    type="number" 
                    value={sip}
                    onChange={(e) => setSip(Math.min(1000000, Math.max(500, parseInt(e.target.value) || 0)))}
                  />
                </div>
              </div>
              <input 
                type="range" 
                min="500" 
                max="200000" 
                step="500"
                value={sip}
                onChange={(e) => setSip(parseInt(e.target.value))}
              />
              <div className="range-limits">
                <span>₹500</span>
                <span>₹2 Lakhs</span>
              </div>
            </div>

            {/* Input 2: Step-up % */}
            <div className="slider-group">
              <div className="slider-header">
                <span className="slider-label">Annual Step-Up (%)</span>
                <div className="slider-val-box">
                  <input 
                    type="number" 
                    value={stepup}
                    onChange={(e) => setStepup(Math.min(50, Math.max(0, parseInt(e.target.value) || 0)))}
                  />
                  <span>%</span>
                </div>
              </div>
              <input 
                type="range" 
                min="0" 
                max="30" 
                step="1"
                value={stepup}
                onChange={(e) => setStepup(parseInt(e.target.value))}
              />
              <div className="range-limits">
                <span>0%</span>
                <span>30%</span>
              </div>
            </div>

            {/* Input 3: Duration */}
            <div className="slider-group">
              <div className="slider-header">
                <span className="slider-label">Investment Duration</span>
                <div className="slider-val-box">
                  <input 
                    type="number" 
                    value={years}
                    onChange={(e) => {
                      let val = Math.min(40, Math.max(1, parseInt(e.target.value) || 1));
                      setYears(val);
                    }}
                  />
                  <span>yrs</span>
                </div>
              </div>
              <input 
                type="range" 
                min="1" 
                max="40" 
                step="1"
                value={years}
                onChange={(e) => setYears(parseInt(e.target.value))}
              />
              <div className="range-limits">
                <span>1 Year</span>
                <span>40 Years</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Hand Stack: Analytics, Charts, and Growth */}
        <div className="calc-analytics-column">
          
          {/* Rate Selection Cards */}
          <div className="glass-card analytics-card">
            <div className="calc-card-header">
              <h3>Return Rate Comparison</h3>
              <span className="badge-glow-cyan">Compounded Annually</span>
            </div>

            <div className="rates-comparison-grid">
              {/* Card 10% */}
              <div 
                className={`rate-option-card ${activeRate === 10 ? "active" : ""}`}
                onClick={() => setActiveRate(10)}
              >
                <span className="rate-title">Conservative</span>
                <span className="rate-percentage">10% p.a.</span>
                <span className="rate-corpus">{fmt(results10.fv)}</span>
                <span className="rate-details">Invested: {fmt(results10.inv)}</span>
              </div>

              {/* Card 12% */}
              <div 
                className={`rate-option-card ${activeRate === 12 ? "active" : ""}`}
                onClick={() => setActiveRate(12)}
              >
                <div className="main-badge flex-center"><Sparkles size={10} /> Main Example</div>
                <span className="rate-title">Moderate</span>
                <span className="rate-percentage">12% p.a.</span>
                <span className="rate-corpus">{fmt(results12.fv)}</span>
                <span className="rate-details">Invested: {fmt(results12.inv)}</span>
              </div>

              {/* Card 15% - Un-gated */}
              <div 
                className={`rate-option-card ${activeRate === 15 ? "active" : ""}`}
                onClick={() => setActiveRate(15)}
              >
                <span className="rate-title">Aggressive</span>
                <span className="rate-percentage">15% p.a.</span>
                <span className="rate-corpus">{fmt(results15.fv)}</span>
                <span className="rate-details">Invested: {fmt(results15.inv)}</span>
              </div>
            </div>

            {/* Breakdown Visualizer Bar */}
            <div className="breakdown-chart-area">
              <div className="breakdown-labels">
                <span>Wealth Breakdown at <span style={{ color: "#10b981", fontWeight: "700" }}>{activeRate}%</span></span>
                <span className="growth-badge">{(mainResults.fv / mainResults.inv).toFixed(1)}x Growth</span>
              </div>

              <div className="compounding-track-bar">
                <div className="invested-segment" style={{ width: `${invPct}%` }}>
                  {invPct > 15 ? `${invPct}%` : ""}
                </div>
                <div className="gain-segment" style={{ width: `${gainPct}%` }}>
                  {gainPct > 15 ? `${gainPct}%` : ""}
                </div>
              </div>

              <div className="legend-labels flex-center">
                <div className="legend-item flex-center">
                  <span className="dot dot-invested"></span> Amount Invested ({fmt(mainResults.inv)})
                </div>
                <div className="legend-item flex-center">
                  <span className="dot dot-gain"></span> Compound Earnings ({fmt(mainResults.gain)})
                </div>
              </div>
            </div>

            {/* Premium action to download report */}
            <div className="premium-report-download" style={{ borderTop: "1px solid var(--border-light)", paddingTop: "20px", marginTop: "16px", display: "flex", justifyContent: "flex-end" }}>
              <button className="btn-primary" onClick={handleDownloadPDF} style={{ padding: "10px 20px", fontSize: "14px" }}>
                <Download size={16} /> Download PDF Wealth Report
              </button>
            </div>
          </div>

          {/* Chart Card */}
          <div className="glass-card chart-card">
            <div className="calc-card-header">
              <h3>Corpus Growth Over Time</h3>
              <div className="chart-legend-labels flex-center">
                <span className="leg-label flex-center">
                  <span className="line-dashed gray-line"></span> 10% Rate
                </span>
                <span className="leg-label flex-center">
                  <span className="line-solid green-line"></span> 12% (Moderate)
                </span>
                <span className="leg-label flex-center">
                  <span className="line-dashed cyan-line"></span> 15% Rate
                </span>
              </div>
            </div>
            
            <div className="canvas-wrapper">
              <canvas ref={canvasRef}></canvas>
            </div>
          </div>

          {/* Milestone Cards at 12% */}
          <div className="glass-card milestones-card">
            <div className="calc-card-header">
              <h3>Long-Term Wealth Milestones at 12%</h3>
              <span className="badge-glow-green">compounding</span>
            </div>

            <div className="milestone-items-grid">
              <div className="milestone-block">
                <span className="m-year-lbl">10 Years Term</span>
                <span className="m-val-lbl">{fmt(milestone10.fv)}</span>
                <span className="m-inv-lbl">Invested: {fmt(milestone10.inv)}</span>
              </div>
              
              <div className="milestone-block">
                <span className="m-year-lbl">20 Years Term</span>
                <span className="m-val-lbl">{fmt(milestone20.fv)}</span>
                <span className="m-inv-lbl">Invested: {fmt(milestone20.inv)}</span>
              </div>

              <div className="milestone-block highlight-milestone">
                <span className="m-year-lbl">30 Years Term</span>
                <span className="m-val-lbl">{fmt(milestone30.fv)}</span>
                <span className="m-inv-lbl">Invested: {fmt(milestone30.inv)}</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
