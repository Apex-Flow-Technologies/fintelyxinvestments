import { useState, useEffect } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { db, auth } from "../../database/firebase";
import { CheckCircle2, Loader2, PenTool, Database, Lock, LogOut } from "lucide-react";

export default function BlogAdminPortal({ onClose }) {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  
  // Login State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    readTime: "",
    snippet: "",
    content: ""
  });
  const [status, setStatus] = useState("idle"); // idle, submitting, success, error
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const email = currentUser.email || "";
        const cleanEmail = email.toLowerCase().trim();
        const isAdmin = cleanEmail === "wealth@fintelyxinvestments.com" || cleanEmail.endsWith("@fintelyxinvestments.com");
        
        if (!isAdmin) {
          setLoginError("Access denied. Your account is not authorized as an administrator.");
          await signOut(auth);
          setUser(null);
        } else {
          setUser(currentUser);
        }
      } else {
        setUser(null);
      }
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Success, onAuthStateChanged will handle the rest
    } catch (error) {
      console.error("Authentication failed:", error);
      setLoginError("Invalid credentials. Access denied.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.content) {
      setErrorMsg("Title and content are required.");
      return;
    }

    setStatus("submitting");
    setErrorMsg("");

    try {
      await addDoc(collection(db, "blogs"), {
        ...formData,
        createdAt: serverTimestamp(),
      });
      setStatus("success");
      setFormData({
        title: "",
        category: "",
        readTime: "",
        snippet: "",
        content: ""
      });
      setTimeout(() => {
        setStatus("idle");
      }, 3000);
    } catch (error) {
      console.error("Error adding blog: ", error);
      setErrorMsg("Permission Denied: Ensure you are logged in and Firestore rules allow writes.");
      setStatus("error");
    }
  };

  if (authLoading) {
    return (
      <div className="flex-center" style={{ minHeight: "400px", padding: "40px 0" }}>
        <Loader2 className="processing-spinner" size={32} color="var(--accent-green)" />
      </div>
    );
  }

  // --- LOGIN SCREEN ---
  if (!user) {
    return (
      <div className="animate-fade-in flex-center" style={{ padding: "80px 24px", flexDirection: "column" }}>
        <div className="glass-card" style={{ maxWidth: "400px", width: "100%", padding: "40px 32px", textAlign: "center" }}>
          <div className="flex-center" style={{ marginBottom: "24px" }}>
            <div style={{ background: "rgba(239, 68, 68, 0.1)", padding: "16px", borderRadius: "50%" }}>
              <Lock size={32} color="#ef4444" />
            </div>
          </div>
          <h2 style={{ fontSize: "24px", fontFamily: "var(--font-display)", color: "var(--text-primary)", marginBottom: "8px" }}>Restricted Access</h2>
          <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginBottom: "32px", lineHeight: "1.6" }}>
            This portal is restricted to authorized Fintelyx administrators only.
          </p>
          
          {loginError && (
            <div style={{ padding: "12px", background: "rgba(239, 68, 68, 0.1)", border: "1px solid rgba(239, 68, 68, 0.3)", borderRadius: "8px", color: "#ef4444", fontSize: "12px", marginBottom: "24px" }}>
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <input 
              type="email" 
              placeholder="Admin Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ background: "rgba(0,0,0,0.3)", border: "1px solid var(--border-light)", color: "white", padding: "12px 16px", borderRadius: "8px" }}
              required 
            />
            <input 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ background: "rgba(0,0,0,0.3)", border: "1px solid var(--border-light)", color: "white", padding: "12px 16px", borderRadius: "8px" }}
              required 
            />
            <button type="submit" className="btn-primary flex-center" style={{ padding: "14px", marginTop: "8px", justifyContent: "center" }} disabled={isLoggingIn}>
              {isLoggingIn ? <Loader2 className="processing-spinner" size={18} /> : "Authenticate"}
            </button>
          </form>
          {onClose && (
            <button onClick={onClose} style={{ background: "transparent", border: "none", color: "var(--text-muted)", fontSize: "12px", marginTop: "24px", cursor: "pointer", textDecoration: "underline" }}>
              Return to Home
            </button>
          )}
        </div>
      </div>
    );
  }

  // --- CMS SCREEN ---
  return (
    <div className="animate-fade-in" style={{ padding: "40px 24px", maxWidth: "800px", margin: "0 auto" }}>
      <div className="hub-header" style={{ marginBottom: "32px", textAlign: "center", position: "relative" }}>
        
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <span className="badge-glow-cyan flex-center">
            <Database size={12} /> Secure Portal
          </span>
          <button onClick={handleLogout} className="btn-secondary flex-center" style={{ padding: "6px 12px", fontSize: "12px", gap: "6px" }}>
            <LogOut size={14} /> Logout
          </button>
        </div>

        <h2>Fintelyx CMS - Blogs</h2>
        <p>Publish new research articles to the public blog feed. Authenticated as: {user.email}</p>
        
        {onClose && (
           <button className="btn-secondary" onClick={onClose} style={{ marginTop: "16px", padding: "6px 12px", fontSize: "12px" }}>
             Close Admin
           </button>
        )}
      </div>

      <div className="glass-card" style={{ padding: "32px" }}>
        {status === "success" && (
          <div style={{ padding: "20px", background: "rgba(16, 185, 129, 0.1)", border: "1px solid rgba(16, 185, 129, 0.3)", borderRadius: "12px", display: "flex", gap: "12px", alignItems: "center", marginBottom: "24px" }}>
            <CheckCircle2 color="#10b981" />
            <span style={{ color: "#10b981", fontWeight: "600" }}>Blog successfully published to Firestore!</span>
          </div>
        )}
        
        {status === "error" && (
          <div style={{ padding: "20px", background: "rgba(239, 68, 68, 0.1)", border: "1px solid rgba(239, 68, 68, 0.3)", borderRadius: "12px", color: "#ef4444", marginBottom: "24px" }}>
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          
          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "8px" }}>
              <label style={{ fontSize: "13px", color: "var(--text-secondary)", fontWeight: "600" }}>Blog Title</label>
              <input 
                type="text" 
                name="title" 
                value={formData.title} 
                onChange={handleChange} 
                placeholder="The Power of Step-Up SIPs"
                style={{ background: "rgba(0,0,0,0.3)", border: "1px solid var(--border-light)", color: "white", padding: "12px", borderRadius: "8px" }}
                required 
              />
            </div>
            
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "8px" }}>
              <label style={{ fontSize: "13px", color: "var(--text-secondary)", fontWeight: "600" }}>Category</label>
              <input 
                type="text" 
                name="category" 
                value={formData.category} 
                onChange={handleChange} 
                placeholder="Compounding Strategy"
                style={{ background: "rgba(0,0,0,0.3)", border: "1px solid var(--border-light)", color: "white", padding: "12px", borderRadius: "8px" }}
              />
            </div>
            
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "8px" }}>
              <label style={{ fontSize: "13px", color: "var(--text-secondary)", fontWeight: "600" }}>Read Time</label>
              <input 
                type="text" 
                name="readTime" 
                value={formData.readTime} 
                onChange={handleChange} 
                placeholder="4 mins read"
                style={{ background: "rgba(0,0,0,0.3)", border: "1px solid var(--border-light)", color: "white", padding: "12px", borderRadius: "8px" }}
              />
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label style={{ fontSize: "13px", color: "var(--text-secondary)", fontWeight: "600" }}>Short Snippet</label>
            <textarea 
              name="snippet" 
              value={formData.snippet} 
              onChange={handleChange} 
              placeholder="A brief summary for the feed..."
              rows={2}
              style={{ background: "rgba(0,0,0,0.3)", border: "1px solid var(--border-light)", color: "white", padding: "12px", borderRadius: "8px", resize: "vertical" }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label style={{ fontSize: "13px", color: "var(--text-secondary)", fontWeight: "600" }}>Content (Use double newlines for paragraphs)</label>
            <textarea 
              name="content" 
              value={formData.content} 
              onChange={handleChange} 
              placeholder="Main blog body..."
              rows={12}
              style={{ background: "rgba(0,0,0,0.3)", border: "1px solid var(--border-light)", color: "white", padding: "12px", borderRadius: "8px", resize: "vertical" }}
              required
            />
          </div>

          <button 
            type="submit" 
            className="btn-primary" 
            style={{ justifyContent: "center", padding: "16px", marginTop: "12px" }}
            disabled={status === "submitting"}
          >
            {status === "submitting" ? (
              <><Loader2 className="processing-spinner" size={18} /> Publishing...</>
            ) : (
              <><PenTool size={18} /> Publish to Live Feed</>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
