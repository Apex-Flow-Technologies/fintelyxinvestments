import React from "react";
import { Landmark } from "lucide-react";
import fintelyxLogo from "../../assets/Fintelyx_Logo_Trimmed.png";

export default function PDFReportTemplate({ 
  sip, 
  stepup, 
  years, 
  activeRate, 
  mainResults, 
  milestone10, 
  milestone20, 
  milestone30,
  chartImg,
  isPreview
}) {
  
  const fmt = (v) => {
    if (v >= 10000000) return "₹" + (v / 10000000).toFixed(2) + " Cr";
    if (v >= 100000) return "₹" + (v / 100000).toFixed(1) + " L";
    return "₹" + Math.round(v).toLocaleString("en-IN");
  };

  const today = new Date().toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  return (
    <div 
      id="pdf-report-template"
      style={{
        position: isPreview ? "relative" : "absolute",
        left: isPreview ? "0" : "-9999px",
        top: 0,
        width: "794px", /* A4 width at 96 PPI */
        height: "1123px", /* A4 height at 96 PPI */
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
      {/* 1. Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "2px solid #10b981", paddingBottom: "20px", marginBottom: "20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <img src={fintelyxLogo} alt="Fintelyx Logo" style={{ height: "40px", objectFit: "contain" }} />
          <div>
            <h1 style={{ margin: 0, fontSize: "24px", fontWeight: "800", color: "#0f172a", letterSpacing: "-0.5px" }}>Fintelyx Investments</h1>
            <p style={{ margin: 0, fontSize: "12px", color: "#64748b", fontWeight: "600", textTransform: "uppercase" }}>Strategic Wealth Projection</p>
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <p style={{ margin: 0, fontSize: "12px", color: "#64748b" }}>Date Generated</p>
          <p style={{ margin: 0, fontSize: "14px", color: "#0f172a", fontWeight: "600" }}>{today}</p>
        </div>
      </div>

      {/* 2. Title & Input Summary */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <h2 style={{ fontSize: "28px", margin: "0 0 16px 0", color: "#0f172a" }}>Systematic Investment Plan (SIP) Projection</h2>
        
        <div style={{ display: "flex", justifyContent: "space-between", background: "#f8fafc", padding: "16px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
          <div>
            <p style={{ margin: 0, fontSize: "12px", color: "#64748b", textTransform: "uppercase", fontWeight: "600" }}>Monthly SIP</p>
            <p style={{ margin: "4px 0 0 0", fontSize: "20px", color: "#10b981", fontWeight: "700" }}>{fmt(sip)}</p>
          </div>
          <div>
            <p style={{ margin: 0, fontSize: "12px", color: "#64748b", textTransform: "uppercase", fontWeight: "600" }}>Annual Step-Up</p>
            <p style={{ margin: "4px 0 0 0", fontSize: "20px", color: "#0f172a", fontWeight: "700" }}>{stepup}%</p>
          </div>
          <div>
            <p style={{ margin: 0, fontSize: "12px", color: "#64748b", textTransform: "uppercase", fontWeight: "600" }}>Duration</p>
            <p style={{ margin: "4px 0 0 0", fontSize: "20px", color: "#0f172a", fontWeight: "700" }}>{years} Years</p>
          </div>
          <div>
            <p style={{ margin: 0, fontSize: "12px", color: "#64748b", textTransform: "uppercase", fontWeight: "600" }}>Expected Return</p>
            <p style={{ margin: "4px 0 0 0", fontSize: "20px", color: "#0f172a", fontWeight: "700" }}>{activeRate}% p.a.</p>
          </div>
        </div>
      </div>

      {/* 3. Primary Result Box */}
      <div style={{ background: "#0f172a", color: "white", padding: "24px", borderRadius: "16px", textAlign: "center", marginBottom: "24px", boxShadow: "0 10px 25px rgba(15, 23, 42, 0.1)" }}>
        <p style={{ margin: 0, fontSize: "14px", color: "#94a3b8", textTransform: "uppercase", fontWeight: "600", letterSpacing: "1px" }}>Projected Wealth Corpus</p>
        <h1 style={{ margin: "10px 0", fontSize: "42px", color: "#10b981", fontWeight: "800" }}>{fmt(mainResults.fv)}</h1>
        <div style={{ display: "flex", justifyContent: "center", gap: "40px", marginTop: "16px", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "16px" }}>
          <div>
            <p style={{ margin: 0, fontSize: "12px", color: "#94a3b8" }}>Total Invested</p>
            <p style={{ margin: 0, fontSize: "18px", fontWeight: "600" }}>{fmt(mainResults.inv)}</p>
          </div>
          <div>
            <p style={{ margin: 0, fontSize: "12px", color: "#94a3b8" }}>Est. Wealth Gain</p>
            <p style={{ margin: 0, fontSize: "18px", fontWeight: "600" }}>{fmt(mainResults.gain)}</p>
          </div>
        </div>
      </div>

      {/* Chart Image Insertion */}
      {chartImg && (
        <div style={{ marginBottom: "24px", textAlign: "center" }}>
          <h3 style={{ fontSize: "16px", color: "#0f172a", marginBottom: "12px", borderBottom: "1px solid #e2e8f0", paddingBottom: "8px", textAlign: "left" }}>Corpus Growth Over Time</h3>
          <img src={chartImg} alt="Growth Chart" style={{ width: "100%", maxHeight: "200px", objectFit: "contain" }} />
        </div>
      )}

      {/* 4. Milestones */}
      <div style={{ marginBottom: "auto" }}>
        <h3 style={{ fontSize: "18px", color: "#0f172a", borderBottom: "1px solid #e2e8f0", paddingBottom: "10px", marginBottom: "20px" }}>Long-Term Milestones (at {activeRate}% p.a.)</h3>
        
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f1f5f9", textAlign: "left" }}>
              <th style={{ padding: "12px", fontSize: "12px", color: "#64748b", textTransform: "uppercase" }}>Timeframe</th>
              <th style={{ padding: "12px", fontSize: "12px", color: "#64748b", textTransform: "uppercase" }}>Total Invested</th>
              <th style={{ padding: "12px", fontSize: "12px", color: "#64748b", textTransform: "uppercase" }}>Projected Value</th>
            </tr>
          </thead>
          <tbody>
            {years >= 10 && (
              <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                <td style={{ padding: "16px 12px", fontWeight: "600", color: "#0f172a" }}>Year 10</td>
                <td style={{ padding: "16px 12px", color: "#475569" }}>{fmt(milestone10.inv)}</td>
                <td style={{ padding: "16px 12px", fontWeight: "700", color: "#10b981" }}>{fmt(milestone10.fv)}</td>
              </tr>
            )}
            {years >= 20 && (
              <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                <td style={{ padding: "16px 12px", fontWeight: "600", color: "#0f172a" }}>Year 20</td>
                <td style={{ padding: "16px 12px", color: "#475569" }}>{fmt(milestone20.inv)}</td>
                <td style={{ padding: "16px 12px", fontWeight: "700", color: "#10b981" }}>{fmt(milestone20.fv)}</td>
              </tr>
            )}
            {years >= 30 && (
              <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                <td style={{ padding: "16px 12px", fontWeight: "600", color: "#0f172a" }}>Year 30</td>
                <td style={{ padding: "16px 12px", color: "#475569" }}>{fmt(milestone30.inv)}</td>
                <td style={{ padding: "16px 12px", fontWeight: "700", color: "#10b981" }}>{fmt(milestone30.fv)}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 5. Footer / Disclaimers */}
      <div style={{ marginTop: "auto", borderTop: "1px solid #e2e8f0", paddingTop: "16px" }}>
        <p style={{ margin: "0 0 8px 0", fontSize: "10px", color: "#94a3b8", lineHeight: "1.5" }}>
          <strong>Statutory Disclaimer:</strong> Fintelyx Investment Services LLP (LLPIN: ACP-0306) operates as an AMFI Registered Mutual Fund Distributor (ARN-345579). Mutual Fund investments are subject to market risks, read all scheme-related documents carefully.
        </p>
        <p style={{ margin: 0, fontSize: "10px", color: "#94a3b8", lineHeight: "1.5" }}>
          This report is for educational and simulation purposes only. The projections provided above are mathematically calculated based on the inputs provided and assume a constant rate of return. Actual returns may vary significantly based on market fluctuations. This document does not constitute formal investment advice.
        </p>
      </div>

    </div>
  );
}
