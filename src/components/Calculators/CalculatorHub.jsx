import React, { useState } from "react";
import SIPCalculator from "./SIPCalculator";
import GoalPlanner from "./GoalPlanner";
import PortfolioBacktester from "./PortfolioBacktester";
import { IndianRupee, Percent, PieChart, Sparkles } from "lucide-react";
import "../../styles/calculators.css";

export default function CalculatorHub({ theme }) {
  const [activeTab, setActiveTab] = useState("sip");

  return (
    <div className="hub-container animate-fade-in">
      {/* Dynamic Header */}
      <div className="hub-header">
        <span className="badge-glow-green flex-center">
          <Sparkles size={12} /> Fintelyx Wealth Engine
        </span>
        <h2>Interactive Wealth Tools</h2>
        <p>Project long-term compound growth, configure salary increases, and simulate historical asset weights.</p>
      </div>

      {/* Segmented Tab Switcher */}
      <div className="hub-nav-wrapper">
        <select 
          className="hub-mobile-select"
          value={activeTab}
          onChange={(e) => setActiveTab(e.target.value)}
        >
          <option value="sip">SIP Step-Up Calculator</option>
          <option value="goal">Wealth Goal Planner</option>
          <option value="backtest">Portfolio Backtester</option>
        </select>

        <div className="hub-glass-tabs">
          <button 
            className={`hub-tab ${activeTab === "sip" ? "active" : ""}`}
            onClick={() => setActiveTab("sip")}
          >
            <Percent size={16} /> SIP Step-Up
          </button>
          <button 
            className={`hub-tab ${activeTab === "goal" ? "active" : ""}`}
            onClick={() => setActiveTab("goal")}
          >
            <IndianRupee size={16} /> Wealth Goal Planner
          </button>
          <button 
            className={`hub-tab ${activeTab === "backtest" ? "active" : ""}`}
            onClick={() => setActiveTab("backtest")}
          >
            <PieChart size={16} /> Portfolio Backtester
          </button>
        </div>
      </div>

      {/* Dynamic Active Calculator Screen */}
      <div className="hub-active-workspace">
        {activeTab === "sip" && (
          <div className="animate-fade-in">
            <SIPCalculator theme={theme} />
          </div>
        )}
        {activeTab === "goal" && (
          <div className="animate-fade-in">
            <GoalPlanner theme={theme} />
          </div>
        )}
        {activeTab === "backtest" && (
          <div className="animate-fade-in">
            <PortfolioBacktester theme={theme} />
          </div>
        )}
      </div>
    </div>
  );
}
