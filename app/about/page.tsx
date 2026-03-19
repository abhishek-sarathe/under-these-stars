import Link from "next/link";

export const metadata = {
  title: "What is a Star Map? | Under These Stars",
  description: "Learn what a star map is, how we compute it, what Your Sky and All Stars maps show, and the science behind constellations and named stars.",
};

export default function AboutPage() {
  const section: React.CSSProperties = {
    maxWidth: "720px", margin: "0 auto", padding: "0 24px",
  };
  const h2: React.CSSProperties = {
    fontFamily: "var(--font-playfair), Georgia, serif",
    fontSize: "clamp(22px, 3vw, 30px)", fontWeight: 700,
    color: "white", marginBottom: "16px", marginTop: "64px", lineHeight: 1.2,
  };
  const h3: React.CSSProperties = {
    fontFamily: "var(--font-playfair), Georgia, serif",
    fontSize: "clamp(18px, 2.5vw, 22px)", fontWeight: 600,
    color: "#C8A96E", marginBottom: "12px", marginTop: "40px",
  };
  const p: React.CSSProperties = {
    fontSize: "16px", color: "rgba(138,175,212,0.8)",
    lineHeight: 1.8, marginBottom: "16px",
  };
  const highlight: React.CSSProperties = {
    background: "rgba(200,169,110,0.08)",
    border: "1px solid rgba(200,169,110,0.2)",
    borderLeft: "3px solid #C8A96E",
    borderRadius: "0 10px 10px 0",
    padding: "16px 20px", marginBottom: "24px",
    fontSize: "15px", color: "rgba(138,175,212,0.8)", lineHeight: 1.7,
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "radial-gradient(ellipse at top, #1B2D4F 0%, #080E1A 60%)",
      paddingTop: "96px", paddingBottom: "80px",
    }}>
      <div style={section}>

        {/* Hero */}
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <p style={{ color: "#C8A96E", fontSize: "12px", fontWeight: 700,
            letterSpacing: "5px", textTransform: "uppercase", marginBottom: "16px" }}>
            Learn
          </p>
          <h1 style={{
            fontFamily: "var(--font-playfair), Georgia, serif",
            fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 700,
            color: "white", lineHeight: 1.15, marginBottom: "20px",
          }}>
            What is a Star Map?
          </h1>
          <p style={{ fontSize: "17px", color: "rgba(138,175,212,0.7)", lineHeight: 1.7, maxWidth: "560px", margin: "0 auto" }}>
            A star map is an astronomical record of exactly where every star, planet, 
            Sun and Moon were positioned at a specific moment in time — printed as a 
            beautiful, frameable poster.
          </p>
        </div>

        {/* What is it */}
        <h2 style={h2}>Not an illustration. An astronomical calculation.</h2>
        <p style={p}>
          Most people assume star maps are artistic representations — decorative prints 
          with stars scattered randomly across a dark background. Ours are not. Every single 
          dot on your poster represents a real star, and its position is mathematically 
          computed from its actual coordinates in the sky.
        </p>
        <p style={p}>
          We use NASA&apos;s DE440 planetary ephemeris and the Hipparcos star catalog — 
          the same datasets used by professional astronomers — to compute the exact position 
          of over 100,000 stars for any moment between 1900 and today. If you were standing 
          outside at your location on your date and looked up, the sky on your poster is 
          exactly what you would have seen.
        </p>
        <div style={highlight}>
          The Sun, Moon, and every visible planet are also included — so if it was daytime 
          when your child was born, the Sun appears exactly where it was. The universe does 
          not care what time it is.
        </div>

        {/* Your Sky */}
        <h2 style={h2}>Your Sky Map</h2>
        <p style={p}>
          Your Sky uses an <strong style={{ color: "white" }}>azimuthal projection</strong> — 
          imagine lying on your back at your location, looking straight up. The centre of 
          the circular map is the zenith (the point directly above your head), and the edge 
          is the horizon all around you.
        </p>
        <p style={p}>
          Only stars that were above the horizon at your location are shown — 
          meaning this map is completely unique to your city and moment. The same date 
          in Mumbai and Delhi will produce noticeably different maps because the sky 
          shifts as you move across the Earth.
        </p>
        <div style={highlight}>
          Your Sky is the most personal map. It shows your specific sky — the stars 
          visible from the exact ground you were standing on.
        </div>

        {/* All Stars */}
        <h2 style={h2}>All Stars Map</h2>
        <p style={p}>
          All Stars uses a <strong style={{ color: "white" }}>polar projection</strong> centred 
          on the north celestial pole — the point in the sky around which all stars appear 
          to rotate. This is the full celestial sphere flattened into a circle.
        </p>
        <p style={p}>
          Unlike Your Sky, All Stars shows every constellation in the sky — not just those 
          above your horizon. Stars below the horizon appear in the outer ring with slightly 
          reduced opacity. This gives you the grand, complete picture of the universe at 
          your moment.
        </p>
        <div style={highlight}>
          All Stars is the cosmic map. It shows the full universe at your moment — 
          everything above and below the horizon, the complete celestial sphere.
        </div>

        {/* Constellations */}
        <h2 style={h2}>What are constellations?</h2>
        <p style={p}>
          Constellations are named patterns of stars — 88 officially recognised by the 
          International Astronomical Union. They are a human invention, not a physical 
          reality. Stars within a constellation are often thousands of light-years apart; 
          they only appear grouped together from our vantage point on Earth.
        </p>
        <p style={p}>
          The 88 modern constellations come from ancient Greek, Roman, and Middle Eastern 
          astronomy, later codified by the astronomer Ptolemy in the 2nd century AD. 
          Orion, Ursa Major (the Great Bear), Scorpius — these patterns have guided 
          navigators, farmers, and poets for thousands of years.
        </p>
        <p style={p}>
          On your poster, constellation lines connect the major stars within each pattern, 
          and the constellation name appears as a label. You can toggle these on or off 
          during customization.
        </p>

        {/* Named Stars */}
        <h2 style={h2}>Named stars and planets</h2>
        <p style={p}>
          Of the 100,000+ stars in our catalog, about 300 have proper names — given by 
          ancient Arabic, Greek, and Latin astronomers. Sirius (the brightest star in 
          the sky), Polaris (the North Star), Vega, Arcturus, Betelgeuse — these named 
          stars are highlighted on your poster with a subtle glow and label.
        </p>
        <p style={p}>
          The Sun, Moon, Mercury, Venus, Mars, Jupiter, and Saturn are also rendered — 
          each with their own visual style. The Sun appears as a glowing disc, the Moon 
          shows its phase for that exact date, and the planets are colour-coded by their 
          characteristic hues (Mars in red, Saturn in purple, Venus in warm gold).
        </p>

        {/* What you receive */}
        <h2 style={h2}>What you receive</h2>
        <p style={p}>
          After payment, your poster is rendered at 300 DPI — print-ready resolution for 
          A4 (210 × 297mm) or larger. You receive both a PNG and a PDF version, delivered 
          instantly to your email.
        </p>
        <p style={p}>
          The PNG is ideal for digital photo frames, sharing on social media, or 
          home printing. The PDF is optimised for professional print shops — take it 
          to any print shop and ask for A4 on matte or satin photo paper for the 
          best result.
        </p>
        <div style={highlight}>
          Download links never expire. You can re-download your poster anytime from 
          the links in your email.
        </div>

        {/* CTA */}
        <div style={{ textAlign: "center", marginTop: "64px" }}>
          <p style={{ fontSize: "18px", color: "rgba(138,175,212,0.7)", marginBottom: "28px", lineHeight: 1.6 }}>
            Ready to create yours?
          </p>
          <Link href="/customize" style={{
            display: "inline-flex", alignItems: "center", gap: "10px",
            padding: "16px 40px",
            background: "linear-gradient(135deg, #C8A96E 0%, #E0C080 100%)",
            color: "#080E1A", fontWeight: 700, fontSize: "16px",
            borderRadius: "12px", textDecoration: "none",
            boxShadow: "0 0 32px rgba(200,169,110,0.2)",
          }}>
            Get my star map →
          </Link>
        </div>

      </div>
    </div>
  );
}
