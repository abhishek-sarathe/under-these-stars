"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import type { MapFormData } from "./CustomizeFlow";

type Props = {
  data: MapFormData;
  update: (fields: Partial<MapFormData>) => void;
  onBack: () => void;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const PLAN_DETAILS: Record<string, { label: string; price: number; description: string }> = {
  zenith:  { label: "Your Sky",      price: 99,  description: "Your local sky at that exact moment" },
  fullsky: { label: "All Stars",     price: 99,  description: "The complete celestial sphere" },
  both:    { label: "Both Posters",  price: 149, description: "Both styles — decide which to print after" },
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "13px 16px",
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "10px",
  color: "white",
  fontSize: "15px",
  outline: "none",
  transition: "border-color 0.2s",
  boxSizing: "border-box",
  minHeight: "48px",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "12px",
  fontWeight: 700,
  color: "rgba(138,175,212,0.7)",
  letterSpacing: "1.5px",
  textTransform: "uppercase",
  marginBottom: "12px",
};

export default function Step3({ data, update, onBack }: Props) {
  const plan = data.mapType || "both";
  const [email1, setEmail1]     = useState("");
  const [email2, setEmail2]     = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);
  const [orderId, setOrderId]   = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [polling, setPolling]   = useState(false);
  const [pollMsg, setPollMsg]   = useState("");

  const selectedPlan = PLAN_DETAILS[plan] || PLAN_DETAILS["both"];

  // ── Initiate payment ───────────────────────────────────────
  const handlePay = async () => {
    setError("");

    if (!email1.trim()) { setError("Please enter your email address."); return; }
    if (email1.trim() !== email2.trim()) { setError("Email addresses do not match."); return; }
    if (!email1.includes("@") || !email1.split("@")[1]?.includes(".")) {
      setError("Please enter a valid email address."); return;
    }

    setLoading(true);
    try {
      const resp = await fetch(`${API_URL}/api/v1/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plan:            plan,
          email:           email1.trim(),
          map_type:        plan === "both" ? "Both Posters" : plan === "zenith" ? "Your Sky" : "All Stars",
          occasion:        data.occasion === "Custom" ? data.customOccasion : data.occasion,
          city:            data.city,
          // Location
          lat:             data.lat,
          lon:             data.lon,
          // Date + time
          date:            data.date,
          time:            (() => {
            const h = data.ampm === "PM" ? (data.hour % 12) + 12 : data.hour % 12;
            return `${String(h).padStart(2,"0")}:${String(data.minute).padStart(2,"0")}`;
          })(),
          // Poster content
          name:            data.name,
          title_option:    (data as any)[`titleOption_${plan}`] || data.titleOption || "AI",
          custom_title:    (data as any)[`customTitle_${plan}`] || data.customTitle || "",
          wishing_text:    (data as any)[`wishingText_${plan}`] || data.wishingText || "",
          // Themes
          theme_z:         (data as any)["theme_zenith"]  || data.theme || "Dark Navy",
          theme_f:         (data as any)["theme_fullsky"] || data.theme || "Dark Navy",
          location_format: (data as any)[`locationFormat_${plan}`] || "City, State, Country",
          session_id:      "",
        }),
      });

      if (!resp.ok) throw new Error("Could not create order.");

      const orderData = await resp.json();
      setOrderId(orderData.order_id);

      // Open FastAPI checkout page in new tab
      const callbackUrl = encodeURIComponent(window.location.href);
      const checkoutUrl = `${API_URL}/checkout/${orderData.order_id}?callback_url=${callbackUrl}`;
      window.open(checkoutUrl, "_blank");

    } catch (e: any) {
      setError(e.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ── Poll for payment confirmation ─────────────────────────
  const handleConfirm = async () => {
    if (!orderId) {
      setError("No order found. Please try paying again.");
      return;
    }
    setPolling(true);
    setPollMsg("Checking your payment...");

    for (let i = 0; i < 8; i++) {
      try {
        const resp = await fetch(`${API_URL}/api/v1/orders/${orderId}`);
        const d    = await resp.json();
        if (d.status === "paid") {
          setConfirmed(true);
          setPolling(false);
          return;
        }
      } catch {}
      setPollMsg(i < 3 ? "Checking your payment..." : "Still checking — this can take a moment...");
      await new Promise(r => setTimeout(r, 2000));
    }

    setPolling(false);
    setPollMsg("");
    setError("Payment not confirmed yet. If you completed payment, wait 10 seconds and try again.");
  };

  // ── Confirmed state ────────────────────────────────────────
  if (confirmed) {
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        style={{ textAlign: "center" }}>
        <div style={{ fontSize: "56px", marginBottom: "24px" }}>✨</div>
        <h2 style={{
          fontFamily: "var(--font-playfair), Georgia, serif",
          fontSize: "32px", fontWeight: 700, color: "white", marginBottom: "12px",
        }}>
          Your map is being created
        </h2>
        <p style={{ fontSize: "16px", color: "rgba(138,175,212,0.7)", lineHeight: 1.7, marginBottom: "32px" }}>
          We'll email your download link to <strong style={{ color: "white" }}>{email1}</strong> once it's ready.
          This usually takes under a minute.
        </p>
        <div style={{
          padding: "20px 24px",
          background: "rgba(200,169,110,0.08)",
          border: "1px solid rgba(200,169,110,0.2)",
          borderRadius: "12px",
          fontSize: "14px",
          color: "rgba(138,175,212,0.6)",
          lineHeight: 1.6,
        }}>
          Keep this page open — your download will also appear here automatically.
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}>

      {/* Heading */}
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{
          fontFamily: "var(--font-playfair), Georgia, serif",
          fontSize: "clamp(26px, 4vw, 34px)", fontWeight: 700,
          color: "white", marginBottom: "8px", lineHeight: 1.2,
        }}>
          Preview & get your poster
        </h1>
        <p style={{ fontSize: "15px", color: "rgba(138,175,212,0.6)", lineHeight: 1.6 }}>
          Your map is computed and ready. Purchase to download in full resolution.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>

        {/* Preview */}
        <div>
          <label style={labelStyle}>Your poster preview</label>

          {plan === "both" ? (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              {(["Your Sky", "All Stars"] as const).map(label => (
                <div key={label} style={{
                  position: "relative", borderRadius: "12px", overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.08)", background: "#0C1624",
                  aspectRatio: "3/4",
                }}>
                  <img src="/poster-sample.png" alt={label}
                    style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                  <div style={{
                    position: "absolute", inset: 0, display: "flex",
                    alignItems: "center", justifyContent: "center", pointerEvents: "none",
                  }}>
                    <span style={{
                      transform: "rotate(-30deg)", fontSize: "11px", fontWeight: 700,
                      color: "rgba(255,255,255,0.18)", letterSpacing: "5px",
                      textTransform: "uppercase", whiteSpace: "nowrap",
                    }}>PREVIEW</span>
                  </div>
                  <div style={{
                    position: "absolute", bottom: 0, left: 0, right: 0,
                    padding: "6px", background: "rgba(8,14,26,0.75)",
                    fontSize: "10px", fontWeight: 600, color: "rgba(200,169,110,0.8)",
                    textAlign: "center", letterSpacing: "1px", textTransform: "uppercase",
                  }}>{label}</div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div style={{
                position: "relative", borderRadius: "12px", overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.08)", background: "#0C1624",
                aspectRatio: "3/4",
              }}>
                <img src="/poster-sample.png" alt="preview"
                  style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                <div style={{
                  position: "absolute", inset: 0, display: "flex",
                  alignItems: "center", justifyContent: "center", pointerEvents: "none",
                }}>
                  <span style={{
                    transform: "rotate(-30deg)", fontSize: "11px", fontWeight: 700,
                    color: "rgba(255,255,255,0.18)", letterSpacing: "4px",
                    textTransform: "uppercase", whiteSpace: "nowrap",
                  }}>PREVIEW</span>
                </div>
                <div style={{
                  position: "absolute", bottom: 0, left: 0, right: 0,
                  padding: "6px", background: "rgba(8,14,26,0.75)",
                  fontSize: "10px", fontWeight: 600, color: "rgba(200,169,110,0.8)",
                  textAlign: "center", letterSpacing: "1px", textTransform: "uppercase",
                }}>
                  {plan === "zenith" ? "Your Sky" : "All Stars"}
                </div>
              </div>
              {/* Empty placeholder — keeps grid consistent */}
              <div style={{
                borderRadius: "12px", aspectRatio: "3/4",
                background: "rgba(255,255,255,0.02)",
                border: "1px dashed rgba(255,255,255,0.06)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <p style={{ fontSize: "12px", color: "rgba(138,175,212,0.25)", textAlign: "center", padding: "16px", lineHeight: 1.6 }}>
                  Select Both Posters for a second map
                </p>
              </div>
            </div>
          )}

          <p style={{
            fontSize: "12px", color: "rgba(138,175,212,0.4)",
            textAlign: "center", marginTop: "8px",
          }}>
            Watermark removed after purchase · Full resolution PNG + PDF
          </p>
        </div>

        {/* Plan summary — user already chose in Step 2 */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "16px 18px", borderRadius: "12px",
          background: "rgba(200,169,110,0.06)",
          border: "1px solid rgba(200,169,110,0.25)",
        }}>
          <div>
            <p style={{ fontSize: "15px", fontWeight: 600, color: "#C8A96E", margin: "0 0 3px" }}>
              {selectedPlan.label}
            </p>
            <p style={{ fontSize: "13px", color: "rgba(138,175,212,0.55)", margin: 0 }}>
              {selectedPlan.description}
            </p>
          </div>
          <div style={{ textAlign: "right", flexShrink: 0, marginLeft: "16px" }}>
            <p style={{ fontSize: "26px", fontWeight: 700, color: "white", margin: 0, lineHeight: 1 }}>
              ₹{selectedPlan.price}
            </p>
            <button
              onClick={onBack}
              style={{
                background: "none", border: "none", cursor: "pointer",
                fontSize: "11px", color: "rgba(138,175,212,0.4)",
                padding: 0, marginTop: "4px",
              }}
            >
              change
            </button>
          </div>
        </div>

        {/* Email */}
        <div>
          <label style={labelStyle}>
            Your email
            <span style={{ fontWeight: 400, textTransform: "none", letterSpacing: 0, marginLeft: "8px", fontSize: "11px", color: "rgba(138,175,212,0.4)" }}>
              download link sent here
            </span>
          </label>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <input
              style={inputStyle}
              type="email"
              placeholder="you@example.com"
              value={email1}
              onChange={e => { setEmail1(e.target.value); setError(""); }}
              onFocus={e => (e.target.style.borderColor = "rgba(200,169,110,0.6)")}
              onBlur={e  => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
            />
            <input
              style={inputStyle}
              type="email"
              placeholder="Confirm your email"
              value={email2}
              onChange={e => { setEmail2(e.target.value); setError(""); }}
              onFocus={e => (e.target.style.borderColor = "rgba(200,169,110,0.6)")}
              onBlur={e  => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
            />
          </div>
        </div>

        {/* Error */}
        {error && (
          <p style={{
            fontSize: "13px", color: "#F87171",
            padding: "10px 14px", background: "rgba(248,113,113,0.08)",
            borderRadius: "8px", border: "1px solid rgba(248,113,113,0.2)",
            margin: 0,
          }}>
            {error}
          </p>
        )}

        {/* Pay button */}
        <motion.button
          onClick={handlePay}
          disabled={loading}
          whileHover={!loading ? { scale: 1.02 } : {}}
          whileTap={!loading ? { scale: 0.98 } : {}}
          style={{
            width: "100%", padding: "18px", border: "none",
            borderRadius: "12px",
            background: loading
              ? "rgba(255,255,255,0.08)"
              : "linear-gradient(135deg, #C8A96E 0%, #E0C080 100%)",
            color: loading ? "rgba(255,255,255,0.3)" : "#080E1A",
            fontSize: "17px", fontWeight: 700,
            cursor: loading ? "not-allowed" : "pointer",
            transition: "all 0.3s",
            boxShadow: loading ? "none" : "0 0 32px rgba(200,169,110,0.25)",
          }}
        >
          {loading ? "Creating your order..." : `Pay ₹${selectedPlan.price} & Download`}
        </motion.button>

        {/* Confirm payment button — appears after checkout tab opened */}
        {orderId && !confirmed && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <p style={{
              fontSize: "13px", color: "rgba(138,175,212,0.55)",
              textAlign: "center", marginBottom: "12px",
            }}>
              👆 Complete payment in the tab that opened, then confirm below
            </p>
            <button
              onClick={handleConfirm}
              disabled={polling}
              style={{
                width: "100%", padding: "15px", border: "1px solid rgba(200,169,110,0.35)",
                borderRadius: "12px", background: "transparent",
                color: polling ? "rgba(138,175,212,0.4)" : "#C8A96E",
                fontSize: "15px", fontWeight: 600,
                cursor: polling ? "not-allowed" : "pointer",
                transition: "all 0.2s",
              }}
            >
              {polling ? pollMsg : "✅ I've completed payment — confirm my order"}
            </button>
          </motion.div>
        )}

        {/* Trust strip */}
        <div style={{
          display: "flex", justifyContent: "center", gap: "20px",
          flexWrap: "wrap",
          padding: "14px", borderRadius: "10px",
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.05)",
        }}>
          {["🔒 Secured by Razorpay", "📧 Instant email delivery", "🖨️ Print-ready files"].map(item => (
            <span key={item} style={{ fontSize: "12px", color: "rgba(138,175,212,0.45)" }}>
              {item}
            </span>
          ))}
        </div>

        {/* Back */}
        <button onClick={onBack}
          style={{
            background: "none", border: "none", cursor: "pointer",
            color: "rgba(138,175,212,0.4)", fontSize: "14px",
            textAlign: "center", padding: "4px",
          }}
          onMouseEnter={e => (e.currentTarget.style.color = "rgba(138,175,212,0.8)")}
          onMouseLeave={e => (e.currentTarget.style.color = "rgba(138,175,212,0.4)")}
        >
          ← Back to customization
        </button>

      </div>
    </motion.div>
  );
}
