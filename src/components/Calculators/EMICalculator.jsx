import { useState, useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
import { Landmark, Download, Home, Car, CreditCard } from "lucide-react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import fintelyxLogo from "../../assets/Fintelyx_Logo_Trimmed.png";
import "../../styles/calculators.css";

Chart.register(...registerables);

// Reusable Print Template internal to EMI
const EMIPDFTemplate = ({ principal, rate, years, emi, totalInterest, totalAmount, chartImg, isPreview }) => {
  const fmt = (v) => "₹" + Math.round(v).toLocaleString("en-IN");
  const today = new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" });

  return (
    <div 
      id="emi-pdf-template"
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
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "2px solid #3b82f6", paddingBottom: "20px", marginBottom: "30px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <img src={fintelyxLogo} alt="Fintelyx Logo" style={{ height: "40px", objectFit: "contain" }} />
          <div>
            <h1 style={{ margin: 0, fontSize: "24px", fontWeight: "800", color: "#0f172a", letterSpacing: "-0.5px" }}>Fintelyx Investments</h1>
            <p style={{ margin: 0, fontSize: "12px", color: "#64748b", fontWeight: "600", textTransform: "uppercase" }}>Loan & Liability Projection</p>
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <p style={{ margin: 0, fontSize: "12px", color: "#64748b" }}>Date Generated</p>
          <p style={{ margin: 0, fontSize: "14px", color: "#0f172a", fontWeight: "600" }}>{today}</p>
        </div>
      </div>

      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h2 style={{ fontSize: "28px", margin: "0 0 20px 0", color: "#0f172a" }}>EMI & Loan Amortization Report</h2>
        <div style={{ display: "flex", justifyContent: "space-between", background: "#f8fafc", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
          <div>
            <p style={{ margin: 0, fontSize: "12px", color: "#64748b", textTransform: "uppercase", fontWeight: "600" }}>Loan Amount</p>
            <p style={{ margin: "4px 0 0 0", fontSize: "20px", color: "#3b82f6", fontWeight: "700" }}>{fmt(principal)}</p>
          </div>
          <div>
            <p style={{ margin: 0, fontSize: "12px", color: "#64748b", textTransform: "uppercase", fontWeight: "600" }}>Interest Rate</p>
            <p style={{ margin: "4px 0 0 0", fontSize: "20px", color: "#0f172a", fontWeight: "700" }}>{rate}% p.a.</p>
          </div>
          <div>
            <p style={{ margin: 0, fontSize: "12px", color: "#64748b", textTransform: "uppercase", fontWeight: "600" }}>Tenure</p>
            <p style={{ margin: "4px 0 0 0", fontSize: "20px", color: "#0f172a", fontWeight: "700" }}>{years} Years</p>
          </div>
        </div>
      </div>

      <div style={{ background: "#0f172a", color: "white", padding: "30px", borderRadius: "16px", textAlign: "center", marginBottom: "40px" }}>
        <p style={{ margin: 0, fontSize: "14px", color: "#94a3b8", textTransform: "uppercase", fontWeight: "600", letterSpacing: "1px" }}>Monthly EMI Payable</p>
        <h1 style={{ margin: "10px 0", fontSize: "48px", color: "#3b82f6", fontWeight: "800" }}>{fmt(emi)}</h1>
        <div style={{ display: "flex", justifyContent: "center", gap: "40px", marginTop: "20px", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "20px" }}>
          <div>
            <p style={{ margin: 0, fontSize: "12px", color: "#94a3b8" }}>Total Principal</p>
            <p style={{ margin: 0, fontSize: "18px", fontWeight: "600" }}>{fmt(principal)}</p>
          </div>
          <div>
            <p style={{ margin: 0, fontSize: "12px", color: "#94a3b8" }}>Total Interest Payable</p>
            <p style={{ margin: 0, fontSize: "18px", fontWeight: "600" }}>{fmt(totalInterest)}</p>
          </div>
        </div>
      </div>

      {chartImg && (
        <div style={{ marginBottom: "auto", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <h3 style={{ fontSize: "16px", color: "#0f172a", marginBottom: "16px", borderBottom: "1px solid #e2e8f0", paddingBottom: "10px", textAlign: "left", width: "100%" }}>Principal vs Interest Breakdown</h3>
          <img src={chartImg} alt="Breakdown Chart" style={{ width: "100%", maxHeight: "250px", objectFit: "contain", display: "block" }} />
          <div style={{ display: "flex", gap: "32px", justifyContent: "center", marginTop: "24px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ width: "14px", height: "14px", borderRadius: "4px", background: "#3b82f6" }}></div>
              <span style={{ fontSize: "14px", color: "#475569", fontWeight: "600" }}>Principal Loan Amount</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ width: "14px", height: "14px", borderRadius: "4px", background: "#ef4444" }}></div>
              <span style={{ fontSize: "14px", color: "#475569", fontWeight: "600" }}>Total Interest Payable</span>
            </div>
          </div>
        </div>
      )}

      <div style={{ marginTop: "40px", borderTop: "1px solid #e2e8f0", paddingTop: "20px" }}>
        <p style={{ margin: "0 0 10px 0", fontSize: "10px", color: "#94a3b8", lineHeight: "1.6" }}>
          <strong>Statutory Disclaimer:</strong> Fintelyx Investment Services LLP (LLPIN: ACP-0306). 
          This EMI calculator is for educational and simulation purposes only. Actual loan terms, EMIs, and interest rates may vary based on your financial institution's policies, processing fees, and prevailing market rates.
        </p>
      </div>
    </div>
  );
};

export default function EMICalculator({ theme }) {
  const chartRef = useRef(null);
  const canvasRef = useRef(null);

  const [principal, setPrincipal] = useState(5000000);
  const [rate, setRate] = useState(8.5);
  const [years, setYears] = useState(20);
  const [loanType, setLoanType] = useState("home");

  const [isDownloading, setIsDownloading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [chartImgStr, setChartImgStr] = useState(null);

  const fmt = (v) => "₹" + Math.round(v).toLocaleString("en-IN");

  const r = rate / 12 / 100;
  const n = years * 12;
  const emi = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const totalAmount = emi * n;
  const totalInterest = totalAmount - principal;

  useEffect(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (chartRef.current) chartRef.current.destroy();

    chartRef.current = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Principal Loan", "Total Interest"],
        datasets: [{
          data: [principal, totalInterest],
          backgroundColor: ["#3b82f6", "#f43f5e"],
          borderWidth: 0,
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        cutout: "75%"
      }
    });

    return () => { if (chartRef.current) chartRef.current.destroy(); };
  }, [principal, rate, years]);

  const handlePreviewPDF = () => {
    if (canvasRef.current) {
      setChartImgStr(canvasRef.current.toDataURL("image/png"));
    }
    setShowPreview(true);
  };

  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    const element = document.getElementById("emi-pdf-template");
    if (!element) return setIsDownloading(false);

    try {
      const canvas = await html2canvas(element, { scale: 2, useCORS: true, logging: false, backgroundColor: "#ffffff", windowWidth: 794, windowHeight: 1123 });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({ orientation: "portrait", unit: "px", format: [794, 1123] });
      pdf.addImage(imgData, "PNG", 0, 0, 794, 1123);
      pdf.save(`Fintelyx_EMI_Report_${new Date().toISOString().split("T")[0]}.pdf`);
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
        <div className="glass-card calc-card-controls">
          <div className="calc-card-header">
            <h3>Loan Details</h3>
            <span className="badge-glow-cyan">Standard EMI</span>
          </div>

          <div style={{ display: "flex", gap: "10px", marginBottom: "24px" }}>
            <button className={`btn-secondary ${loanType === "home" ? "active-border" : ""}`} onClick={() => { setLoanType("home"); setRate(8.5); setYears(20); }} style={{ flex: 1, padding: "8px", fontSize: "12px", border: loanType === "home" ? "1px solid #3b82f6" : "" }}>
              <Home size={14} style={{ display: "block", margin: "0 auto 4px" }} /> Home
            </button>
            <button className={`btn-secondary ${loanType === "car" ? "active-border" : ""}`} onClick={() => { setLoanType("car"); setRate(9.5); setYears(5); }} style={{ flex: 1, padding: "8px", fontSize: "12px", border: loanType === "car" ? "1px solid #3b82f6" : "" }}>
              <Car size={14} style={{ display: "block", margin: "0 auto 4px" }} /> Auto
            </button>
            <button className={`btn-secondary ${loanType === "personal" ? "active-border" : ""}`} onClick={() => { setLoanType("personal"); setRate(12.5); setYears(3); }} style={{ flex: 1, padding: "8px", fontSize: "12px", border: loanType === "personal" ? "1px solid #3b82f6" : "" }}>
              <CreditCard size={14} style={{ display: "block", margin: "0 auto 4px" }} /> Personal
            </button>
          </div>

          <div className="controls-stack">
            <div className="slider-group">
              <div className="slider-header">
                <span className="slider-label">Loan Amount</span>
                <div className="slider-val-box">
                  <span>₹</span>
                  <input type="number" value={principal} onChange={(e) => setPrincipal(Math.max(10000, parseInt(e.target.value) || 0))} />
                </div>
              </div>
              <input type="range" min="50000" max="50000000" step="50000" value={principal} onChange={(e) => setPrincipal(parseInt(e.target.value))} />
            </div>

            <div className="slider-group">
              <div className="slider-header">
                <span className="slider-label">Interest Rate (% p.a.)</span>
                <div className="slider-val-box">
                  <input type="number" step="0.1" value={rate} onChange={(e) => setRate(Math.max(1, parseFloat(e.target.value) || 0))} />
                  <span>%</span>
                </div>
              </div>
              <input type="range" min="1" max="25" step="0.1" value={rate} onChange={(e) => setRate(parseFloat(e.target.value))} />
            </div>

            <div className="slider-group">
              <div className="slider-header">
                <span className="slider-label">Loan Tenure (Years)</span>
                <div className="slider-val-box">
                  <input type="number" value={years} onChange={(e) => setYears(Math.min(30, Math.max(1, parseInt(e.target.value) || 1)))} />
                  <span>yrs</span>
                </div>
              </div>
              <input type="range" min="1" max="30" step="1" value={years} onChange={(e) => setYears(parseInt(e.target.value))} />
            </div>
          </div>
        </div>

        <div className="calc-analytics-column">
          <div className="glass-card analytics-card">
            <div className="calc-card-header">
              <h3>EMI Breakdown</h3>
            </div>
            
            <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", marginBottom: "20px" }}>
              <div style={{ flex: 1, minWidth: "150px" }}>
                <p style={{ margin: 0, fontSize: "12px", color: "var(--text-secondary)" }}>Monthly EMI</p>
                <h2 style={{ margin: "4px 0 0 0", color: "#3b82f6", fontSize: "28px" }}>{fmt(emi)}</h2>
              </div>
              <div style={{ flex: 1, minWidth: "150px" }}>
                <p style={{ margin: 0, fontSize: "12px", color: "var(--text-secondary)" }}>Total Interest Payable</p>
                <h2 style={{ margin: "4px 0 0 0", color: "#f43f5e", fontSize: "24px" }}>{fmt(totalInterest)}</h2>
              </div>
              <div style={{ flex: 1, minWidth: "150px" }}>
                <p style={{ margin: 0, fontSize: "12px", color: "var(--text-secondary)" }}>Total Payment (Prin + Int)</p>
                <h2 style={{ margin: "4px 0 0 0", color: "var(--text-primary)", fontSize: "24px" }}>{fmt(totalAmount)}</h2>
              </div>
            </div>

            <div style={{ position: "relative", height: "220px", width: "100%", maxWidth: "300px", margin: "0 auto", display: "flex", justifyContent: "center", alignItems: "center" }}>
              <canvas ref={canvasRef}></canvas>
              <div style={{ position: "absolute", textAlign: "center" }}>
                <span style={{ fontSize: "12px", color: "var(--text-secondary)" }}>Total Interest</span>
                <br />
                <span style={{ fontSize: "18px", fontWeight: "700", color: "var(--text-primary)" }}>{Math.round((totalInterest/totalAmount)*100)}%</span>
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
        <EMIPDFTemplate principal={principal} rate={rate} years={years} emi={emi} totalInterest={totalInterest} totalAmount={totalAmount} chartImg={chartImgStr} isPreview={false} />
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
                <EMIPDFTemplate principal={principal} rate={rate} years={years} emi={emi} totalInterest={totalInterest} totalAmount={totalAmount} chartImg={chartImgStr} isPreview={true} />
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
