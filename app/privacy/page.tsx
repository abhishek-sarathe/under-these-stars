import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | Under These Stars",
  description: "Privacy policy for underthesestars.in — what data we collect, why, and our commitment to protecting your birth data.",
};

export default function PrivacyPage() {
  const sec: React.CSSProperties = {
    maxWidth: "720px", margin: "0 auto", padding: "0 24px",
  };
  const h2: React.CSSProperties = {
    fontFamily: "var(--font-playfair), Georgia, serif",
    fontSize: "20px", fontWeight: 600,
    color: "white", marginBottom: "12px", marginTop: "48px",
  };
  const p: React.CSSProperties = {
    fontSize: "15px", color: "rgba(138,175,212,0.75)",
    lineHeight: 1.8, marginBottom: "14px",
  };
  const highlight: React.CSSProperties = {
    background: "rgba(200,169,110,0.08)",
    border: "1px solid rgba(200,169,110,0.2)",
    borderLeft: "3px solid #C8A96E",
    borderRadius: "0 10px 10px 0",
    padding: "16px 20px", marginBottom: "24px",
    fontSize: "15px", color: "rgba(138,175,212,0.85)", lineHeight: 1.7,
  };
  const trustBox: React.CSSProperties = {
    background: "rgba(29,158,117,0.08)",
    border: "1px solid rgba(29,158,117,0.25)",
    borderLeft: "3px solid #1D9E75",
    borderRadius: "0 10px 10px 0",
    padding: "16px 20px", marginBottom: "24px",
    fontSize: "15px", color: "rgba(138,175,212,0.85)", lineHeight: 1.7,
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "radial-gradient(ellipse at top, #1B2D4F 0%, #080E1A 60%)",
      paddingTop: "96px", paddingBottom: "80px",
    }}>
      <div style={sec}>

        <div style={{ marginBottom: "48px" }}>
          <h1 style={{
            fontFamily: "var(--font-playfair), Georgia, serif",
            fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 700,
            color: "white", marginBottom: "12px",
          }}>Privacy Policy</h1>
          <p style={{ ...p, color: "rgba(138,175,212,0.45)", fontSize: "13px" }}>
            Last updated: March 2026
          </p>
          <p style={p}>
            Under These Stars operates underthesestars.in. This policy explains 
            exactly what personal data we collect, why we need it, and the specific 
            steps we take to protect it. We have written this in plain language — 
            no legal jargon.
          </p>
        </div>

        {/* Birth data sensitivity — address head-on */}
        <div style={{
          padding: "24px", borderRadius: "12px",
          background: "rgba(200,169,110,0.06)",
          border: "1px solid rgba(200,169,110,0.25)",
          marginBottom: "40px",
        }}>
          <p style={{ fontSize: "14px", fontWeight: 700, color: "#C8A96E",
            letterSpacing: "1px", textTransform: "uppercase", margin: "0 0 12px" }}>
            A note on birth date, time and location
          </p>
          <p style={{ fontSize: "15px", color: "rgba(138,175,212,0.85)", lineHeight: 1.7, margin: 0 }}>
            We understand that date of birth, time of birth, and place of birth are 
            deeply sensitive data in India — used in kundali, matrimony, and astrology. 
            We take this seriously. <strong style={{ color: "white" }}>We use this data 
            solely to compute star positions for your poster. We never share it with 
            anyone. We delete all personal identifiers within 3 days of order 
            fulfilment.</strong> Our servers never store your data in plain text — 
            all data at rest is encrypted.
          </p>
        </div>

        <h2 style={h2}>What we collect and why</h2>
        <p style={p}>
          We collect only what is strictly necessary to generate and deliver your poster:
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "28px" }}>
          {[
            ["Email address", "To send your download links after payment. Never used for marketing."],
            ["Name", "Used only to personalise the dedication text on your poster."],
            ["City, latitude, longitude", "Required to compute exact star positions for your location. Cannot be substituted."],
            ["Date and time", "Required to compute the sky at your specific moment. Cannot be substituted."],
            ["Occasion", "Used to generate a personalised poster title via AI. Only the category is sent (e.g. 'Birthday') — not your personal story."],
            ["Payment confirmation ID", "We never store card, UPI, or bank details. Razorpay handles all payment data. We only receive a reference ID confirming the payment."],
          ].map(([field, reason]) => (
            <div key={field} style={{
              padding: "14px 16px", borderRadius: "10px",
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}>
              <p style={{ fontSize: "14px", fontWeight: 600, color: "white", margin: "0 0 4px" }}>{field}</p>
              <p style={{ fontSize: "14px", color: "rgba(138,175,212,0.65)", margin: 0, lineHeight: 1.6 }}>{reason}</p>
            </div>
          ))}
        </div>

        <h2 style={h2}>How we protect your data</h2>
        <div style={trustBox}>
          All data stored in our database is encrypted at rest using AES-256 encryption. 
          Data in transit is protected by TLS 1.3. Our infrastructure (Supabase on AWS) 
          is SOC 2 Type II certified. We do not store your birth data in plain text at any point.
        </div>
        <p style={p}>
          Access to your data is restricted to the automated systems that generate 
          your poster and send your email. No human manually reads your personal data. 
          We do not have a marketing team that can access your records.
        </p>

        <h2 style={h2}>Data deletion — 3 day commitment</h2>
        <div style={highlight}>
          Within 3 days of your order being fulfilled (poster generated and email sent), 
          we permanently delete all personal identifiers from our database: your name, 
          exact latitude and longitude, birth time, and dedication text. Your poster 
          files in storage are also deleted within 3 days.
        </div>
        <p style={p}>
          After deletion, we retain only what is legally required for accounting purposes: 
          your email address, order ID, amount paid, plan purchased, and payment date. 
          These are kept for 7 years as required by Indian tax law (GST records).
        </p>
        <p style={p}>
          If you want your data deleted before the 3-day window, email us and we will 
          delete it immediately.
        </p>

        <h2 style={h2}>Who we share data with</h2>
        <p style={p}>
          <strong style={{ color: "white" }}>We do not sell, rent, or share your 
          personal data with any third party for their own purposes.</strong> We use 
          the following services strictly to operate our product:
        </p>
        <ul style={{ ...p, paddingLeft: "20px" }}>
          {[
            ["Razorpay", "Payment processing. They receive your payment details — we do not."],
            ["Supabase (AWS)", "Encrypted database and file storage. Your data is stored here until deletion."],
            ["Resend", "Email delivery. They receive your email address to send your download link."],
            ["Groq", "AI title generation. Only your occasion category, name, city and date are sent — no payment or contact information."],
            ["Railway", "API server hosting. Processes your request but does not store data independently."],
            ["Vercel", "Frontend hosting. Does not access your personal data."],
          ].map(([name, desc]) => (
            <li key={name} style={{ marginBottom: "10px" }}>
              <strong style={{ color: "white" }}>{name}</strong> — {desc}
            </li>
          ))}
        </ul>

        <h2 style={h2}>Your rights (DPDPA 2023)</h2>
        <p style={p}>
          Under India&apos;s Digital Personal Data Protection Act 2023, you have the right to:
        </p>
        <ul style={{ ...p, paddingLeft: "20px" }}>
          <li style={{ marginBottom: "8px" }}>Access the personal data we hold about you</li>
          <li style={{ marginBottom: "8px" }}>Correct any inaccurate data</li>
          <li style={{ marginBottom: "8px" }}>Request deletion of your data at any time</li>
          <li style={{ marginBottom: "8px" }}>Withdraw consent for data processing</li>
          <li style={{ marginBottom: "8px" }}>Raise a grievance with us or with the Data Protection Board of India</li>
        </ul>
        <p style={p}>
          To exercise any right, email us at the address below. We respond within 
          3 business days.
        </p>

        <h2 style={h2}>Cookies</h2>
        <p style={p}>
          We use only essential cookies required for the site to function — 
          session management and the Razorpay payment flow. We do not use 
          advertising cookies, tracking pixels, or third-party analytics.
        </p>

        <h2 style={h2}>Contact & Grievance Officer</h2>
        <p style={p}>
          For any privacy concerns, data requests, or grievances:
        </p>
        <p style={{ ...p, color: "rgba(200,169,110,0.8)" }}>
          Under These Stars<br />
          underthesestars.in<br />
          official.abhishek.sarathe@gmail.com<br />
          Response time: within 3 business days
        </p>

        <div style={{ marginTop: "64px", paddingTop: "32px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <Link href="/" style={{ fontSize: "14px", color: "rgba(138,175,212,0.5)", textDecoration: "none" }}>
            ← Back to home
          </Link>
        </div>

      </div>
    </div>
  );
}
