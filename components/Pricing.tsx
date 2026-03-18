"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const plans = [
  {
    id: "zenith",
    name: "Your Sky",
    price: 99,
    description: "The sky from your exact location at that moment — stars, planets, Sun and Moon as they were.",
    features: [
      "Your local night sky, as seen looking up",
      "4,995 real stars from Hipparcos",
      "57 constellations with labels",
      "Sun, Moon & planet positions",
      "Custom title + dedication",
      "PNG + PDF, print-ready 300 DPI",
    ],
    highlight: false,
    cta: "Get Your Sky",
  },
  {
    id: "both",
    name: "Both Posters",
    price: 149,
    badge: "Decide later",
    description: "Get both styles now. Decide which one to print, frame, or gift after you see them.",
    features: [
      "Everything in Your Sky",
      "Full Sky map included",
      "Two poster styles, one price",
      "Perfect for framing as a pair",
      "PNG + PDF for each map",
      "Not sure which style to pick? This solves that.",
    ],
    highlight: true,
    cta: "Get Both Maps",
  },
  {
    id: "fullsky",
    name: "All Stars",
    price: 99,
    description: "The entire celestial sphere — every star, every constellation, the full night sky.",
    features: [
      "Complete star sphere, all constellations",
      "All stars + constellations",
      "Rising and setting labels",
      "Sun, Moon & planet positions",
      "Custom title + dedication",
      "PNG + PDF, print-ready 300 DPI",
    ],
    highlight: false,
    cta: "Get All Stars",
  },
];

export default function Pricing() {
  return (
    <section id="pricing" style={{ background: "#080E1A", padding: "100px 24px" }}>
      <div style={{ maxWidth: "1080px", margin: "0 auto" }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "64px" }}
        >
          <p style={{
            color: "#C8A96E", fontSize: "11px", fontWeight: 700,
            letterSpacing: "5px", textTransform: "uppercase", marginBottom: "14px",
          }}>
            Simple pricing
          </p>
          <h2 style={{
            fontFamily: "var(--font-playfair), Georgia, serif",
            fontSize: "clamp(30px, 4vw, 44px)",
            fontWeight: 700, color: "white", marginBottom: "16px",
          }}>
            One payment. Yours forever.
          </h2>
          <p style={{
            fontSize: "16px", color: "rgba(138,175,212,0.65)",
            maxWidth: "400px", margin: "0 auto", lineHeight: 1.7,
          }}>
            No subscriptions. No watermarks after payment. Just your poster.
          </p>
        </motion.div>

        {/* Plans */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "20px",
          alignItems: "start",
        }}>
          {plans.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{
                position: "relative",
                padding: plan.highlight ? "36px 32px" : "32px 28px",
                borderRadius: "20px",
                border: plan.highlight
                  ? "1px solid rgba(200,169,110,0.5)"
                  : "1px solid rgba(255,255,255,0.07)",
                background: plan.highlight
                  ? "linear-gradient(145deg, rgba(27,45,79,0.9) 0%, rgba(20,34,60,0.9) 100%)"
                  : "rgba(27,45,79,0.2)",
                boxShadow: plan.highlight
                  ? "0 0 60px rgba(200,169,110,0.08)"
                  : "none",
                marginTop: plan.highlight ? "-8px" : "0",
              }}
            >
              {/* Badge */}
              {plan.badge && (
                <div style={{
                  position: "absolute", top: "-12px", left: "50%",
                  transform: "translateX(-50%)",
                  padding: "4px 16px",
                  background: "linear-gradient(135deg, #C8A96E, #E0C080)",
                  color: "#080E1A",
                  fontSize: "11px", fontWeight: 700,
                  borderRadius: "20px", letterSpacing: "1px",
                  whiteSpace: "nowrap",
                }}>
                  {plan.badge}
                </div>
              )}

              {/* Plan name */}
              <p style={{
                fontSize: "12px", fontWeight: 700,
                color: plan.highlight ? "#C8A96E" : "rgba(138,175,212,0.6)",
                letterSpacing: "3px", textTransform: "uppercase",
                marginBottom: "12px",
              }}>
                {plan.name}
              </p>

              {/* Price */}
              <div style={{ marginBottom: "12px" }}>
                <span style={{
                  fontFamily: "var(--font-playfair), Georgia, serif",
                  fontSize: "52px", fontWeight: 700,
                  color: "white", lineHeight: 1,
                }}>
                  ₹{plan.price}
                </span>
              </div>

              {/* Description */}
              <p style={{
                fontSize: "14px", color: "rgba(138,175,212,0.65)",
                lineHeight: 1.65, marginBottom: "28px",
                minHeight: "44px",
              }}>
                {plan.description}
              </p>

              {/* Divider */}
              <div style={{
                height: "1px",
                background: plan.highlight
                  ? "rgba(200,169,110,0.2)"
                  : "rgba(255,255,255,0.06)",
                marginBottom: "24px",
              }} />

              {/* Features */}
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 32px", display: "flex", flexDirection: "column", gap: "10px" }}>
                {plan.features.map(f => (
                  <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                    <span style={{ color: "#C8A96E", fontSize: "14px", marginTop: "1px", flexShrink: 0 }}>✓</span>
                    <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.75)", lineHeight: 1.5 }}>{f}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href={`/customize?plan=${plan.id}`}
                style={{
                  display: "block",
                  textAlign: "center",
                  padding: "14px",
                  borderRadius: "10px",
                  textDecoration: "none",
                  fontWeight: 700,
                  fontSize: "15px",
                  letterSpacing: "0.2px",
                  background: plan.highlight
                    ? "linear-gradient(135deg, #C8A96E 0%, #E0C080 100%)"
                    : "transparent",
                  color: plan.highlight ? "#080E1A" : "#C8A96E",
                  border: plan.highlight ? "none" : "1px solid rgba(200,169,110,0.35)",
                  transition: "opacity 0.2s",
                }}
              >
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom trust line */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{
            textAlign: "center", marginTop: "48px",
            fontSize: "13px", color: "rgba(138,175,212,0.4)",
            letterSpacing: "0.3px",
          }}
        >
          Secure payment via Razorpay &nbsp;·&nbsp; Instant download &nbsp;·&nbsp; No subscription ever
        </motion.p>

      </div>
    </section>
  );
}
