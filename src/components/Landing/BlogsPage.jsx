import React, { useState, useEffect } from "react";
import { BookOpen, HelpCircle, Loader2 } from "lucide-react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../../database/firebase";
import "../../styles/landing.css";

export default function BlogsPage({ activeBlogId, onBlogChange }) {
  const activeArticle = activeBlogId;
  const setActiveArticle = (id) => {
    if (onBlogChange) onBlogChange(id);
  };
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedBlogs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setBlogs(fetchedBlogs);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching blogs:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="knowledge-viewport animate-fade-in" style={{ padding: "40px 0" }}>
      
      {/* 1. Page Header */}
      <div className="hub-header">
        <span className="badge-glow-green flex-center">
          <BookOpen size={12} /> Resource Library
        </span>
        <h2>Fintelyx Blogs</h2>
        <p>Expert articles, investment guides, and strategic briefings compiled by our research desk to advance your financial awareness.</p>
      </div>

      <div className="blogs-layout-grid">
        
        {/* Left Side: Article List */}
        <div className={`blogs-list-container ${activeArticle ? "mobile-hidden" : ""}`}>
          {loading ? (
            <div className="flex-center" style={{ padding: "40px 0", color: "var(--text-muted)" }}>
              <Loader2 className="processing-spinner" size={24} />
            </div>
          ) : blogs.length === 0 ? (
            <div className="glass-card" style={{ padding: "24px", textAlign: "center", color: "var(--text-muted)" }}>
              No blogs published yet. Check back soon!
            </div>
          ) : (
            blogs.map((article) => {
              const isActive = activeArticle === article.id;
              return (
                <div 
                  key={article.id} 
                  className={`glass-card ${isActive ? "btn-active-green" : ""}`}
                  onClick={() => setActiveArticle(isActive ? null : article.id)}
                  style={{ 
                    padding: "24px", 
                    cursor: "pointer", 
                    textAlign: "left",
                    transition: "var(--transition-smooth)",
                    border: isActive ? "1px solid rgba(16, 185, 129, 0.4)" : "1px solid var(--border-light)",
                    background: isActive ? "rgba(16, 185, 129, 0.04)" : "var(--glass-bg)"
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", width: "100%", marginBottom: "10px" }}>
                    <span className="badge-glow-cyan" style={{ margin: 0, fontSize: "10px" }}>{article.category || "General"}</span>
                    <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>{article.readTime || "5 mins read"}</span>
                  </div>
                  
                  <h3 style={{ fontSize: "16px", fontWeight: "700", display: "flex", alignItems: "center", gap: "10px", color: isActive ? "var(--text-primary)" : "var(--text-primary)" }}>
                    <span style={{ color: isActive ? "#10b981" : "var(--text-muted)" }}><BookOpen size={20} /></span>
                    {article.title}
                  </h3>
                  
                  <p style={{ fontSize: "12px", color: "var(--text-secondary)", lineHeight: "1.6", marginTop: "8px", marginBottom: 0 }}>
                    {article.snippet}
                  </p>
                </div>
              );
            })
          )}
        </div>

        {/* Right Side: Article Body glass-card */}
        <div className={`glass-card blogs-detail-container ${!activeArticle ? "mobile-hidden" : ""}`} style={{ padding: "40px", minHeight: "400px", display: "flex", flexDirection: "column", justifyContent: "flex-start", textAlign: "left" }}>
          {activeArticle ? (
            <div className="animate-fade-in">
              <button 
                className="partner-detail-back-btn mobile-only-back"
                onClick={() => setActiveArticle(null)}
                style={{ 
                  display: "inline-flex", 
                  alignItems: "center", 
                  gap: "8px", 
                  background: "transparent", 
                  border: "1px solid var(--border-light)", 
                  color: "var(--text-secondary)", 
                  fontFamily: "var(--font-display)", 
                  fontWeight: "600", 
                  fontSize: "13px", 
                  padding: "10px 20px", 
                  borderRadius: "12px", 
                  cursor: "pointer", 
                  transition: "var(--transition-smooth)",
                  marginBottom: "20px"
                }}
              >
                ← Back to Article List
              </button>
              {(() => {
                const article = blogs.find(a => a.id === activeArticle);
                if (!article) return null;
                return (
                  <>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", marginBottom: "20px" }}>
                      <span className="badge-glow-green">{article.category || "General"}</span>
                      <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>{article.readTime || "5 mins read"}</span>
                    </div>
                    <h2 style={{ fontSize: "28px", color: "var(--text-primary)", marginBottom: "24px", fontFamily: "var(--font-display)", fontWeight: "800" }}>
                      {article.title}
                    </h2>
                    <hr style={{ border: "none", borderTop: "1px solid var(--border-light)", marginBottom: "24px" }} />
                    <div style={{ lineHeight: "1.7", fontSize: "14px", color: "var(--text-secondary)" }}>
                      {article.content.split('\n\n').map((paragraph, idx) => (
                        <p key={idx} style={{ marginBottom: "16px" }}>
                          {paragraph.split('\n').map((line, i) => (
                            <React.Fragment key={i}>
                              {line}
                              {i < paragraph.split('\n').length - 1 && <br />}
                            </React.Fragment>
                          ))}
                        </p>
                      ))}
                    </div>
                  </>
                );
              })()}
            </div>
          ) : (
            <div className="flex-center" style={{ flex: 1, flexDirection: "column", color: "var(--text-muted)", gap: "16px", padding: "40px 0" }}>
              <HelpCircle size={48} style={{ color: "var(--border-light)" }} />
              <div>
                <h3 style={{ color: "var(--text-primary)", fontSize: "16px", marginBottom: "4px" }}>Select an Article</h3>
                <p style={{ fontSize: "12px", maxWidth: "280px", margin: "0 auto", lineHeight: "1.5" }}>
                  Select any blog from the left pane to open the detailed reading view.
                </p>
              </div>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
