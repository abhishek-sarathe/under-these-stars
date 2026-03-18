"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const steps = [
  {
    number: "01",
    icon: "📅",
    title: "Enter your moment",
    description: "Any date from 1900 to today. Any city on Earth. Any time — day or night.",
  },
  {
    number: "02",
    icon: "🔭",
    title: "We map the sky",
    description: "4,995 real stars. 57 constellations. Exact positions from the Hipparcos catalog.",
  },
  {
    number: "03",
    icon: "🎨",
    title: "Make it yours",
    description: "Pick your color theme, write your dedication, choose your title.",
  },
  {
    number: "04",
    icon: "🖼️",
    title: "Print and frame",
    description: "Download a 300 DPI PNG and PDF. Ready for any print shop or home printer.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" style={{ background: "#0C1624", padding: "100px 24px" }}>
      <div style={{ maxWidth: "1080px", margin: "0 auto" }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "72px" }}
        >
          <p style={{
            color: "#C8A96E", fontSize: "11px", fontWeight: 700,
            letterSpacing: "5px", textTransform: "uppercase", marginBottom: "14px",
          }}>
            Simple process
          </p>
          <h2 style={{
            fontFamily: "var(--font-playfair), Georgia, serif",
            fontSize: "clamp(30px, 4vw, 44px)",
            fontWeight: 700, color: "white", marginBottom: "16px",
          }}>
            From a moment to a framed memory
          </h2>
          <p style={{
            fontSize: "16px", color: "rgba(138,175,212,0.65)",
            maxWidth: "440px", margin: "0 auto", lineHeight: 1.7,
          }}>
            Four steps. Takes about two minutes.
          </p>
        </motion.div>

        {/* Steps */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
          gap: "20px",
        }}>
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{
                padding: "36px 28px",
                borderRadius: "16px",
                border: "1px solid rgba(255,255,255,0.06)",
                background: "rgba(27,45,79,0.2)",
                textAlign: "center",
                cursor: "default",
                transition: "border-color 0.3s, transform 0.3s",
              }}
              whileHover={{ y: -4, borderColor: "rgba(200,169,110,0.25)" }}
            >
              <div style={{
                fontSize: "11px", fontWeight: 700,
                color: "rgba(200,169,110,0.4)", letterSpacing: "3px",
                marginBottom: "16px",
              }}>
                {step.number}
              </div>
              <div style={{ fontSize: "36px", marginBottom: "16px" }}>{step.icon}</div>
              <h3 style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
                fontSize: "17px", fontWeight: 600,
                color: "white", marginBottom: "10px",
              }}>
                {step.title}
              </h3>
              <p style={{ fontSize: "14px", color: "rgba(138,175,212,0.65)", lineHeight: 1.65 }}>
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          style={{ textAlign: "center", marginTop: "56px" }}
        >
          <Link href="/customize" style={{
            display: "inline-block",
            padding: "15px 36px",
            background: "transparent",
            color: "#C8A96E",
            fontWeight: 600,
            fontSize: "15px",
            borderRadius: "10px",
            textDecoration: "none",
            border: "1px solid rgba(200,169,110,0.4)",
            letterSpacing: "0.3px",
          }}>
            Start creating →
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
