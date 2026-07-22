export default function Slide4Features() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        backgroundColor: "#FAFAFA",
        fontFamily: "'Inter', sans-serif",
        position: "relative",
        boxSizing: "border-box",
        padding: "5vh 5vw",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "5vh" }}>
        <div style={{ position: "relative" }}>
          <div style={{ position: "absolute", left: "-1vw", top: "1.5vh", width: "13vw", height: "3vh", backgroundColor: "#0A1628", opacity: 0.08, zIndex: 0 }} />
          <h2 style={{ fontSize: "3.5vw", fontWeight: 900, color: "#0A1628", margin: 0, lineHeight: 1, letterSpacing: "-0.03em", position: "relative", zIndex: 1 }}>
            Key Features
          </h2>
        </div>
        <div style={{ fontSize: "1.2vw", fontWeight: 800, color: "#0A1628", letterSpacing: "-0.02em" }}>EduBot</div>
      </div>

      {/* Features Grid */}
      <div style={{ display: "flex", gap: "2vw", flex: 1 }}>
        {/* Feature 1 */}
        <div style={{ flex: 1, backgroundColor: "#0A1628", padding: "3.5vh 2.5vw", display: "flex", flexDirection: "column" }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "1vw", color: "#A0AEC0", marginBottom: "2vh" }}>01</div>
          <h3 style={{ fontSize: "1.4vw", fontWeight: 700, color: "#FFFFFF", margin: "0 0 1.5vh 0", lineHeight: 1.2 }}>Real AI — Google Gemini</h3>
          <p style={{ fontSize: "1.05vw", color: "#E2E8F0", lineHeight: 1.5, margin: 0 }}>
            Powered by Google Gemini — actual Gen AI, not scripted or fake responses.
          </p>
        </div>

        {/* Feature 2 */}
        <div style={{ flex: 1, border: "1px solid #E2E8F0", backgroundColor: "#FFFFFF", padding: "3.5vh 2.5vw", display: "flex", flexDirection: "column" }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "1vw", color: "#A0AEC0", marginBottom: "2vh" }}>02</div>
          <h3 style={{ fontSize: "1.4vw", fontWeight: 700, color: "#0A1628", margin: "0 0 1.5vh 0", lineHeight: 1.2 }}>Multi-Topic Support</h3>
          <p style={{ fontSize: "1.05vw", color: "#4A5568", lineHeight: 1.5, margin: 0 }}>
            Fees, Admissions, Exams, Placements, Campus Life — all in one chat.
          </p>
        </div>

        {/* Feature 3 */}
        <div style={{ flex: 1, border: "1px solid #E2E8F0", backgroundColor: "#FFFFFF", padding: "3.5vh 2.5vw", display: "flex", flexDirection: "column" }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "1vw", color: "#A0AEC0", marginBottom: "2vh" }}>03</div>
          <h3 style={{ fontSize: "1.4vw", fontWeight: 700, color: "#0A1628", margin: "0 0 1.5vh 0", lineHeight: 1.2 }}>Chat History Saved</h3>
          <p style={{ fontSize: "1.05vw", color: "#4A5568", lineHeight: 1.5, margin: 0 }}>
            Previous conversations are saved automatically for easy reference.
          </p>
        </div>

        {/* Feature 4 */}
        <div style={{ flex: 1, border: "1px solid #E2E8F0", backgroundColor: "#FFFFFF", padding: "3.5vh 2.5vw", display: "flex", flexDirection: "column" }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "1vw", color: "#A0AEC0", marginBottom: "2vh" }}>04</div>
          <h3 style={{ fontSize: "1.4vw", fontWeight: 700, color: "#0A1628", margin: "0 0 1.5vh 0", lineHeight: 1.2 }}>Real-Time Streaming</h3>
          <p style={{ fontSize: "1.05vw", color: "#4A5568", lineHeight: 1.5, margin: 0 }}>
            Responses stream live with a typing effect — fast and responsive.
          </p>
        </div>

        {/* Feature 5 */}
        <div style={{ flex: 1, border: "1px solid #E2E8F0", backgroundColor: "#FFFFFF", padding: "3.5vh 2.5vw", display: "flex", flexDirection: "column" }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "1vw", color: "#A0AEC0", marginBottom: "2vh" }}>05</div>
          <h3 style={{ fontSize: "1.4vw", fontWeight: 700, color: "#0A1628", margin: "0 0 1.5vh 0", lineHeight: 1.2 }}>Clean Web Interface</h3>
          <p style={{ fontSize: "1.05vw", color: "#4A5568", lineHeight: 1.5, margin: 0 }}>
            Modern, mobile-friendly design — works on any device, any browser.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div style={{ position: "absolute", bottom: "4vh", left: "5vw", right: "5vw", display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #E2E8F0", paddingTop: "2vh" }}>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.9vw", color: "#A0AEC0" }}>Key Features / EduBot</div>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.9vw", color: "#0A1628", fontWeight: 600 }}>04</div>
      </div>
    </div>
  );
}
