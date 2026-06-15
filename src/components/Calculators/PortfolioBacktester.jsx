import { useState, useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
import { AlertCircle } from "lucide-react";
import "../../styles/calculators.css";

// Register Chart.js structures
Chart.register(...registerables);

export default function PortfolioBacktester({ theme }) {
  const chartRef = useRef(null);
  const canvasRef = useRef(null);

  // General Inputs
  const [initialCapital, setInitialCapital] = useState(100000);
  const [years, setYears] = useState(10);

  // Asset Weights (%)
  const [weightLargeCap, setWeightLargeCap] = useState(40);
  const [weightFixedIncome, setWeightFixedIncome] = useState(20);
  const [weightMidCap, setWeightMidCap] = useState(30);
  const [weightGold, setWeightGold] = useState(10);

  // Handle auto-balancing total to 100%
  const totalWeight = weightLargeCap + weightFixedIncome + weightMidCap + weightGold;

  const fmt = (v) => {
    if (v >= 10000000) return "₹" + (v / 10000000).toFixed(2) + " Cr";
    if (v >= 100000) return "₹" + (v / 100000).toFixed(1) + " L";
    return "₹" + Math.round(v).toLocaleString("en-IN");
  };

  // Asset Historical Annual Yields & Volatility Mock Parameters:
  // Nifty 50 (Large Cap): ~12.2% return, 15% volatility
  // Fixed Income (Debt / FDs): ~6.8% return, 3% volatility
  // Nifty Midcap 100 (Mid Cap): ~15.5% return, 20% volatility
  // Sovereign Gold: ~8.2% return, 11% volatility
  const assetRates = {
    largeCap: 12.2,
    fixedIncome: 6.8,
    midCap: 15.5,
    gold: 8.2
  };

  const assetVols = {
    largeCap: 15,
    fixedIncome: 3,
    midCap: 20,
    gold: 11
  };

  // Calculate backtested portfolio metrics
  const calculateBacktest = (durationYears) => {
    // Normalise weights to 100% just in case
    const factor = totalWeight > 0 ? 100 / totalWeight : 1;
    const wLargeCap = (weightLargeCap * factor) / 100;
    const wFixedIncome = (weightFixedIncome * factor) / 100;
    const wMidCap = (weightMidCap * factor) / 100;
    const wGold = (weightGold * factor) / 100;

    // Portfolio return is weighted sum
    const pReturn = (wLargeCap * assetRates.largeCap + wFixedIncome * assetRates.fixedIncome + wMidCap * assetRates.midCap + wGold * assetRates.gold);
    
    // Simple portfolio volatility math (assuming standard correlations)
    const pVol = Math.sqrt(
      Math.pow(wLargeCap * assetVols.largeCap, 2) +
      Math.pow(wFixedIncome * assetVols.fixedIncome, 2) +
      Math.pow(wMidCap * assetVols.midCap, 2) +
      Math.pow(wGold * assetVols.gold, 2)
    );

    // Compute compound returns yearly
    let portfolioFv = initialCapital;
    let benchmarkFv = initialCapital; // Benchmark is 100% Nifty 50

    const portfolioCurve = [initialCapital];
    const benchmarkCurve = [initialCapital];

    for (let y = 1; y <= durationYears; y++) {
      portfolioFv *= (1 + pReturn / 100);
      benchmarkFv *= (1 + assetRates.largeCap / 100);

      portfolioCurve.push(Math.round(portfolioFv));
      benchmarkCurve.push(Math.round(benchmarkFv));
    }

    return {
      finalValue: Math.round(portfolioFv),
      benchmarkValue: Math.round(benchmarkFv),
      annualisedReturn: pReturn.toFixed(1),
      estimatedVolatility: pVol.toFixed(1),
      portfolioCurve,
      benchmarkCurve
    };
  };

  const results = calculateBacktest(years);

  // Update backtester growth chart
  useEffect(() => {
    if (!canvasRef.current) return;

    const labels = Array.from({ length: years + 1 }, (_, i) => i === 0 ? "Start" : `Yr ${i}`);
    const dataPortfolio = results.portfolioCurve;
    const dataBenchmark = results.benchmarkCurve;

    const ctx = canvasRef.current.getContext("2d");

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const gradientPort = ctx.createLinearGradient(0, 0, 0, 300);
    gradientPort.addColorStop(0, "rgba(6, 182, 212, 0.2)");
    gradientPort.addColorStop(1, "rgba(6, 182, 212, 0)");

    chartRef.current = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Your Custom Portfolio",
            data: dataPortfolio,
            borderColor: "#06b6d4",
            borderWidth: 3,
            pointRadius: 4,
            pointBackgroundColor: "#06b6d4",
            fill: "start",
            backgroundColor: gradientPort,
            tension: 0.25
          },
          {
            label: "Benchmark (NIFTY 50)",
            data: dataBenchmark,
            borderColor: "rgba(255, 255, 255, 0.2)",
            borderWidth: 1.5,
            borderDash: [4, 4],
            pointRadius: 0,
            fill: false,
            tension: 0.25
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
              label: (context) => `${context.dataset.label}: ${fmt(context.parsed.y)}`
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
  }, [weightLargeCap, weightFixedIncome, weightMidCap, weightGold, years, results.portfolioCurve, results.benchmarkCurve, theme]);

  return (
    <div className="calc-container">
      <div className="calc-layout-grid">
        
        {/* Left Side: Customize Allocations */}
        <div className="glass-card calc-card-controls">
          <div className="calc-card-header">
            <h3>Configure Assets</h3>
            <span className="badge-glow-cyan">Weight Settings</span>
          </div>

          <div className="controls-stack">
            {/* Input 1: Capital */}
            <div className="slider-group">
              <div className="slider-header">
                <span className="slider-label">Initial Backtest Capital</span>
                <div className="slider-val-box">
                  <span>₹</span>
                  <input 
                    type="number" 
                    value={initialCapital}
                    onChange={(e) => setInitialCapital(Math.max(1000, parseInt(e.target.value) || 0))}
                  />
                </div>
              </div>
              <input 
                type="range" 
                min="1000" 
                max="1000000" 
                step="5000"
                value={initialCapital}
                onChange={(e) => setInitialCapital(parseInt(e.target.value))}
              />
              <div className="range-limits">
                <span>₹1,000</span>
                <span>₹10 Lakhs</span>
              </div>
            </div>

            {/* Input 2: Years Slider */}
            <div className="slider-group">
              <div className="slider-header">
                <span className="slider-label">Simulation Duration</span>
                <div className="slider-val-box">
                  <input 
                    type="number" 
                    value={years}
                    onChange={(e) => {
                      let val = Math.min(15, Math.max(1, parseInt(e.target.value) || 1));
                      setYears(val);
                    }}
                  />
                  <span>yrs</span>
                </div>
              </div>
              <input 
                type="range" 
                min="1" 
                max="15" 
                step="1"
                value={years}
                onChange={(e) => setYears(parseInt(e.target.value))}
              />
              <div className="range-limits">
                <span>1 Year</span>
                <span>15 Years</span>
              </div>
            </div>

            {/* Total Balance Indicator */}
            <div className="allocation-sum-bar flex-center" style={{ 
              justifyContent: "space-between", 
              padding: "12px 16px", 
              background: totalWeight === 100 ? "rgba(16, 185, 129, 0.08)" : "rgba(245, 158, 11, 0.08)",
              border: totalWeight === 100 ? "1px dashed rgba(16, 185, 129, 0.3)" : "1px dashed rgba(245, 158, 11, 0.3)",
              borderRadius: "12px",
              marginBottom: "16px"
            }}>
              <span style={{ fontSize: "12px", color: totalWeight === 100 ? "var(--accent-green)" : "#fbbf24" }}>
                Total Allocated Weight:
              </span>
              <strong style={{ fontSize: "15px", color: totalWeight === 100 ? "var(--accent-green)" : "#fbbf24" }}>
                {totalWeight}% {totalWeight !== 100 && "(Must sum to 100%)"}
              </strong>
            </div>

            {/* Asset Allocation Sliders */}
            <div className="allocation-weights-sliders" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {/* Asset 1: Nifty 50 */}
              <div className="slider-group">
                <div className="slider-header">
                  <span className="slider-label">Indian Large Caps (Nifty 50)</span>
                  <span style={{ color: "var(--accent-cyan)", fontWeight: "700" }}>{weightLargeCap}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={weightLargeCap}
                  onChange={(e) => setWeightLargeCap(parseInt(e.target.value))}
                />
              </div>

              {/* Asset 2: Fixed Income */}
              <div className="slider-group">
                <div className="slider-header">
                  <span className="slider-label">Fixed Income (Debt / FDs)</span>
                  <span style={{ color: "var(--accent-cyan)", fontWeight: "700" }}>{weightFixedIncome}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={weightFixedIncome}
                  onChange={(e) => setWeightFixedIncome(parseInt(e.target.value))}
                />
              </div>

              {/* Asset 3: Mid-Caps */}
              <div className="slider-group">
                <div className="slider-header">
                  <span className="slider-label">Indian Mid Caps (Nifty Midcap 100)</span>
                  <span style={{ color: "var(--accent-cyan)", fontWeight: "700" }}>{weightMidCap}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={weightMidCap}
                  onChange={(e) => setWeightMidCap(parseInt(e.target.value))}
                />
              </div>

              {/* Asset 4: Gold */}
              <div className="slider-group">
                <div className="slider-header">
                  <span className="slider-label">Sovereign Gold / 24K Gold</span>
                  <span style={{ color: "var(--accent-cyan)", fontWeight: "700" }}>{weightGold}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={weightGold}
                  onChange={(e) => setWeightGold(parseInt(e.target.value))}
                />
              </div>
            </div>

          </div>
        </div>

        {/* Right Side: Backtester Projections and Charts */}
        <div className="calc-analytics-column">
          
          {/* Estimated Portfolio Backtest value card */}
          <div className="glass-card analytics-card flex-center" style={{ flexDirection: "column", padding: "32px", textAlign: "center" }}>
            <span style={{ fontSize: "11px", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Simulator Outcome</span>
            <h1 style={{ fontSize: "40px", color: "var(--accent-cyan)", textShadow: "0 0 20px rgba(6, 182, 212, 0.15)", margin: "4px 0" }}>
              {fmt(results.finalValue)}
            </h1>
            <p style={{ fontSize: "13px", color: "var(--text-secondary)" }}>
              Custom Allocations compounded over <strong style={{ color: "var(--text-primary)" }}>{years} Years</strong> backtest.
            </p>

            <div className="backtest-metrics-sub-row flex-center" style={{ gap: "24px", marginTop: "16px", width: "100%", borderTop: "1px solid var(--border-light)", paddingTop: "16px" }}>
              <div className="metric-box flex-center" style={{ flexDirection: "column" }}>
                <span style={{ fontSize: "9px", color: "var(--text-muted)", textTransform: "uppercase" }}>Est. Annual Return</span>
                <strong style={{ fontSize: "16px", color: "#10b981" }}>{results.annualisedReturn}% p.a.</strong>
              </div>
              <div className="metric-box flex-center" style={{ flexDirection: "column" }}>
                <span style={{ fontSize: "9px", color: "var(--text-muted)", textTransform: "uppercase" }}>Est. Volatility</span>
                <strong style={{ fontSize: "16px", color: "#f87171" }}>{results.estimatedVolatility}% Vol</strong>
              </div>
              <div className="metric-box flex-center" style={{ flexDirection: "column" }}>
                <span style={{ fontSize: "9px", color: "var(--text-muted)", textTransform: "uppercase" }}>Nifty 50 Benchmark</span>
                <strong style={{ fontSize: "16px", color: "var(--text-primary)" }}>{fmt(results.benchmarkValue)}</strong>
              </div>
            </div>
          </div>

          {/* Allocation Warning if weights are unbalanced */}
          {totalWeight !== 100 && (
            <div className="glass-card analytics-card flex-center" style={{ background: "rgba(245, 158, 11, 0.08)", border: "1px solid rgba(245, 158, 11, 0.2)", gap: "12px", padding: "16px" }}>
              <AlertCircle size={24} style={{ color: "#fbbf24", flexShrink: 0 }} />
              <p style={{ fontSize: "12px", color: "#fbbf24", margin: 0, textAlign: "left" }}>
                <strong>Weights unbalanced!</strong> Your asset configurations equal {totalWeight}%. The calculator automatically normalizes your weights to 100% to run standard projections. Adjust sliders to sum exactly to 100% for precise values.
              </p>
            </div>
          )}

          {/* Dynamic Growth Chart Card */}
          <div className="glass-card chart-card">
            <div className="calc-card-header">
              <h3>Portfolio Value Growth Chart</h3>
              <div className="chart-legend-labels flex-center">
                <span className="leg-label flex-center">
                  <span className="line-solid cyan-line"></span> Your Portfolio
                </span>
                <span className="leg-label flex-center">
                  <span className="line-dashed gray-line"></span> Nifty 50 Benchmark
                </span>
              </div>
            </div>
            
            <div className="canvas-wrapper">
              <canvas ref={canvasRef}></canvas>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
