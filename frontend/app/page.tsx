"use client";

import { useState, useEffect } from "react";
import { Sun, Moon, Copy, Check, Sparkles, Code2 } from "lucide-react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [dark, setDark] = useState(true);

  const theme = dark ? darkTheme : lightTheme;

  const generateCode = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setCode("");

    try {
      const res = await fetch("http://127.0.0.1:8000/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      setCode(data.code);
    } catch {
      setCode("// ❌ Backend not reachable");
    } finally {
      setLoading(false);
    }
  };

  const copyCode = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div style={{ ...styles.page, background: theme.bg, color: theme.text }}>
      
      {/* Navbar */}
      <nav style={styles.nav}>
        <div style={styles.brand}>
          <div style={{ ...styles.logo, background: theme.accent }}>
            <Sparkles size={18} color="#fff" />
          </div>
          <span>
            YafAI <b style={{ color: theme.accent }}>Studio</b>
          </span>
        </div>

        <button onClick={() => setDark(!dark)} style={styles.iconBtn}>
          {dark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </nav>

      {/* Main */}
      <main style={styles.main}>
        <h1 style={styles.title}>
          Code at the speed of <span style={{ color: theme.accent }}>thought</span>.
        </h1>
        <p style={{ ...styles.subtitle, color: theme.muted }}>
          Describe what you want. Get real code.
        </p>

        {/* Prompt */}
        <div style={styles.promptBox}>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Build a REST API using FastAPI..."
            style={{ ...styles.textarea, background: theme.panel, color: theme.text }}
          />

          <button
            onClick={generateCode}
            disabled={loading}
            style={{ ...styles.generateBtn, background: theme.accent }}
          >
            {loading ? "Generating..." : <><Code2 size={16} /> Generate</>}
          </button>
        </div>

        {/* Output */}
        {code && (
          <div style={{ ...styles.outputBox, background: theme.panel }}>
            <div style={styles.outputHeader}>
              <span style={styles.outputLabel}>Generated Code</span>
              <button onClick={copyCode} style={styles.copyBtn}>
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>

            <pre style={{ ...styles.code, color: theme.code }}>
              {code}
            </pre>
          </div>
        )}
      </main>
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const styles: any = {
  page: {
    minHeight: "100vh",
    fontFamily: "system-ui, sans-serif",
    transition: "0.3s",
  },
  nav: {
    maxWidth: 1100,
    margin: "0 auto",
    padding: "20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    fontSize: 20,
    fontWeight: 700,
  },
  logo: {
    padding: 6,
    borderRadius: 8,
  },
  iconBtn: {
    background: "transparent",
    border: "none",
    cursor: "pointer",
  },
  main: {
    maxWidth: 900,
    margin: "40px auto",
    padding: "0 20px",
  },
  title: {
    fontSize: 44,
    marginBottom: 10,
  },
  subtitle: {
    marginBottom: 30,
    fontSize: 18,
  },
  promptBox: {
    position: "relative",
  },
  textarea: {
    width: "100%",
    minHeight: 140,
    padding: 16,
    borderRadius: 12,
    border: "1px solid #333",
    fontSize: 16,
    resize: "none",
    outline: "none",
  },
  generateBtn: {
    marginTop: 16,
    padding: "10px 18px",
    borderRadius: 10,
    border: "none",
    color: "#fff",
    fontSize: 15,
    fontWeight: 600,
    cursor: "pointer",
    display: "flex",
    gap: 8,
    alignItems: "center",
  },
  outputBox: {
    marginTop: 40,
    borderRadius: 14,
    overflow: "hidden",
    border: "1px solid #333",
  },
  outputHeader: {
    display: "flex",
    justifyContent: "space-between",
    padding: "12px 16px",
    borderBottom: "1px solid #333",
    fontSize: 13,
  },
  outputLabel: {
    letterSpacing: 1,
    opacity: 0.6,
  },
  copyBtn: {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    display: "flex",
    gap: 6,
    alignItems: "center",
  },
  code: {
    padding: 16,
    fontFamily: "monospace",
    fontSize: 14,
    overflowX: "auto",
    whiteSpace: "pre-wrap",
  },
};

/* ---------------- THEMES ---------------- */

const darkTheme = {
  bg: "#0b0b0b",
  panel: "#111",
  text: "#f5f5f5",
  muted: "#aaa",
  accent: "#6366f1",
  code: "#7CFF7C",
};

const lightTheme = {
  bg: "#f9f9f9",
  panel: "#ffffff",
  text: "#111",
  muted: "#555",
  accent: "#4f46e5",
  code: "#065f46",
};
