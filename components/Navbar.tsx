"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 16px",
        height: "56px",
        flexWrap: "nowrap",
        background: scrolled ? "rgba(8,14,26,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : "none",
        transition: "background 0.4s, border 0.4s",
      }}
    >
      {/* Logo — UTS on mobile, full name on desktop */}
      <Link href="/" style={{ textDecoration: "none", flexShrink: 0 }}>
        <span className="nav-logo-full" style={{
          fontFamily: "var(--font-playfair), Georgia, serif",
          fontSize: "17px", fontWeight: 600,
          color: "#C8A96E", letterSpacing: "0.3px",
        }}>
          Under These Stars
        </span>
        <span className="nav-logo-short" style={{
          fontFamily: "var(--font-playfair), Georgia, serif",
          fontSize: "17px", fontWeight: 600,
          color: "#C8A96E", letterSpacing: "1px",
        }}>
          UTS
        </span>
      </Link>

      {/* Links */}
      <div style={{ display: "flex", alignItems: "center", gap: "clamp(10px, 2vw, 28px)", flexShrink: 0 }}>
        <button onClick={() => scrollTo("how-it-works")} className="nav-link-hide"
          style={{ background: "none", border: "none", cursor: "pointer",
            fontSize: "14px", color: "rgba(138,175,212,0.8)", padding: 0, whiteSpace: "nowrap" }}
          onMouseEnter={e => (e.currentTarget.style.color = "white")}
          onMouseLeave={e => (e.currentTarget.style.color = "rgba(138,175,212,0.8)")}
        >How it works</button>
        <Link href="/about" className="nav-link-hide"
          style={{ fontSize: "14px", color: "rgba(138,175,212,0.8)",
            textDecoration: "none", whiteSpace: "nowrap" }}
        >About</Link>
        <button onClick={() => scrollTo("pricing")} className="nav-link-hide"
          style={{ background: "none", border: "none", cursor: "pointer",
            fontSize: "14px", color: "rgba(138,175,212,0.8)", padding: 0, whiteSpace: "nowrap" }}
          onMouseEnter={e => (e.currentTarget.style.color = "white")}
          onMouseLeave={e => (e.currentTarget.style.color = "rgba(138,175,212,0.8)")}
        >Pricing</button>
        <Link href="/customize" style={{
          fontSize: "14px", fontWeight: 600,
          padding: "9px 16px",
          background: "#C8A96E", color: "#080E1A",
          borderRadius: "8px", textDecoration: "none",
          letterSpacing: "0.2px", whiteSpace: "nowrap",
        }}>
          Create yours →
        </Link>
      </div>

      <style>{`
        .nav-logo-short { display: none; }
        @media (max-width: 480px) {
          .nav-logo-full  { display: none; }
          .nav-logo-short { display: inline; }
          .nav-link-hide  { display: none; }
        }
      `}</style>
    </motion.nav>
  );
}
