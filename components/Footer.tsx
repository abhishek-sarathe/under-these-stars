import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{
      background: "#050B14",
      borderTop: "1px solid rgba(255,255,255,0.05)",
      padding: "48px 24px",
    }}>
      <div style={{
        maxWidth: "1080px", margin: "0 auto",
        display: "flex", flexDirection: "column",
        alignItems: "center", gap: "24px",
      }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          
          <span style={{
            fontFamily: "var(--font-playfair), Georgia, serif",
            fontSize: "16px", fontWeight: 600, color: "#C8A96E",
          }}>
            Under These Stars
          </span>
        </div>

        {/* Links */}
        <div style={{ display: "flex", gap: "32px" }}>
          {[
            { label: "About Star Maps", href: "/about" },
            { label: "Privacy Policy", href: "/privacy" },
            { label: "Contact", href: "mailto:hello@underthesestars.in" },
          ].map(l => (
            <Link key={l.href} href={l.href} style={{
              fontSize: "13px", color: "rgba(138,175,212,0.4)",
              textDecoration: "none",
            }}>
              {l.label}
            </Link>
          ))}
        </div>

        {/* Copyright */}
        <p style={{ fontSize: "12px", color: "rgba(138,175,212,0.25)" }}>
          © {new Date().getFullYear()} Under These Stars. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
