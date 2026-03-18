"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const posters = [
  {
    id: 1,
    occasion: "Birthday",
    title: "The Night a New Star Emerged",
    location: "Jabalpur, India",
    date: "1st March 2026",
  },
  {
    id: 2,
    occasion: "Anniversary",
    title: "The Night We Promised Forever",
    location: "Mumbai, India",
    date: "14th February 2024",
  },
  {
    id: 3,
    occasion: "Wedding",
    title: "When Two Worlds Became One",
    location: "Bangalore, India",
    date: "12th November 2023",
  },
];

export default function Gallery() {
  return (
    <section
      id="examples"
      style={{ background: "#080E1A", padding: "100px 24px" }}
    >
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
            Real posters
          </p>
          <h2 style={{
            fontFamily: "var(--font-playfair), Georgia, serif",
            fontSize: "clamp(30px, 4vw, 44px)",
            fontWeight: 700, color: "white", marginBottom: "16px",
          }}>
            Every moment deserves a map
          </h2>
          <p style={{
            fontSize: "16px", color: "rgba(138,175,212,0.65)",
            maxWidth: "420px", margin: "0 auto", lineHeight: 1.7,
          }}>
            Each poster is unique to its date, time, and location.
            No two skies are ever the same.
          </p>
        </motion.div>

        {/* Poster grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "28px",
        }}>
          {posters.map((poster, i) => (
            <motion.div
              key={poster.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.12 }}
              whileHover={{ y: -6 }}
              style={{
                borderRadius: "16px",
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.07)",
                background: "#0C1624",
                cursor: "pointer",
                transition: "border-color 0.3s",
              }}
            >
              {/* Poster image */}
              <div style={{
                position: "relative",
                aspectRatio: "3/4",
                width: "100%",
                overflow: "hidden",
              }}>
                <Image
                  src="/poster-sample.png"
                  alt={poster.title}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
  
              </div>

              {/* Card info */}
              <div style={{ padding: "18px 22px 24px" }}>
                {/* Occasion badge — own line above title */}
                <span style={{
                  display: "inline-block",
                  padding: "3px 10px",
                  border: "1px solid rgba(200,169,110,0.35)",
                  borderRadius: "20px",
                  fontSize: "10px", fontWeight: 700,
                  color: "#C8A96E", letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  marginBottom: "8px",
                }}>
                  {poster.occasion}
                </span>
                <p style={{
                  fontFamily: "var(--font-playfair), Georgia, serif",
                  fontSize: "15px", fontWeight: 600,
                  color: "white", lineHeight: 1.35,
                  marginBottom: "8px",
                }}>
                  {poster.title}
                </p>
                <p style={{
                  fontSize: "13px",
                  color: "rgba(138,175,212,0.45)",
                  letterSpacing: "0.2px",
                }}>
                  {poster.location} · {poster.date}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          style={{ textAlign: "center", marginTop: "64px" }}
        >
          <p style={{
            fontSize: "15px", color: "rgba(138,175,212,0.55)",
            marginBottom: "24px",
          }}>
            Every map is unique — computed for your exact date, time, and location.
          </p>
          <Link href="/customize" style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            padding: "16px 40px",
            background: "linear-gradient(135deg, #C8A96E 0%, #E0C080 100%)",
            color: "#080E1A",
            fontWeight: 700,
            fontSize: "16px",
            borderRadius: "12px",
            textDecoration: "none",
            boxShadow: "0 0 40px rgba(200,169,110,0.2)",
          }}>
            Create your star map →
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
