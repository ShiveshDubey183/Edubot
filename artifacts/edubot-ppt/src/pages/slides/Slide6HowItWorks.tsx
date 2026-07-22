export default function Slide6HowItWorks() {
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
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "6vh" }}>
        <div style={{ position: "relative" }}>
          <div style={{ position: "absolute", left: "-1vw", top: "1.5vh", width: "18vw", height: "3vh", backgroundColor: "#0A1628", opacity: 0.08, zIndex: 0 }} />
          <h2 style={{ fontSize: "3.5vw", fontWeight: 900, color: "#0A1628", margin: 0, lineHeight: 1, letterSpacing: "-0.03em", position: "relative", zIndex: 1 }}>
            How EduBot Works
          </h2>
        </div>
        <div style={{ fontSize: "1.2vw", fontWeight: 800, color: "#0A1628", letterSpacing: "-0.02em" }}>EduBot</div>
      </div>

      {/* Steps Row */}
      <div style={{ display: "flex", gap: "0", flex: 1, alignItems: "stretch" }}>
        {/* Step 1 */}
        <div style={{ flex: 1, padding: "3vh 2vw 3vh 0", borderRight: "2px solid #0A1628", display: "flex", flexDirection: "column" }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.85vw", color: "#A0AEC0", marginBottom: "1.5vh", textTransform: "uppercase", letterSpacing: "0.08em" }}>Step 01</div>
          <div style={{ fontSize: "3vw", fontWeight: 900, color: "#0A1628", letterSpacing: "-0.04em", marginBottom: "1.5vh", lineHeight: 1 }}>Ask</div>
          <p style={{ fontSize: "1.05vw", color: "#4A5568", lineHeight: 1.5, margin: 0 }}>
            Student types a question in the chat interface — any topic, any time.
          </p>
        </div>

        {/* Step 2 */}
        <div style={{ flex: 1, padding: "3vh 2vw", borderRight: "2px solid #E2E8F0", display: "flex", flexDirection: "column" }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.85vw", color: "#A0AEC0", marginBottom: "1.5vh", textTransform: "uppercase", letterSpacing: "0.08em" }}>Step 02</div>
          <div style={{ fontSize: "3vw", fontWeight: 900, color: "#0A1628", letterSpacing: "-0.04em", marginBottom: "1.5vh", lineHeight: 1 }}>Send</div>
          <p style={{ fontSize: "1.05vw", color: "#4A5568", lineHeight: 1.5, margin: 0 }}>
            Frontend sends the request to the Express backend API server.
          </p>
        </div>

        {/* Step 3 */}
        <div style={{ flex: 1, padding: "3vh 2vw", borderRight: "2px solid #E2E8F0", backgroundColor: "#0A1628", display: "flex", flexDirection: "column" }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.85vw", color: "#A0AEC0", marginBottom: "1.5vh", textTransform: "uppercase", letterSpacing: "0.08em" }}>Step 03</div>
          <div style={{ fontSize: "3vw", fontWeight: 900, color: "#FFFFFF", letterSpacing: "-0.04em", marginBottom: "1.5vh", lineHeight: 1 }}>Process</div>
          <p style={{ fontSize: "1.05vw", color: "#E2E8F0", lineHeight: 1.5, margin: 0 }}>
            Backend calls Google Gemini AI with a college-specific system prompt.
          </p>
        </div>

        {/* Step 4 */}
        <div style={{ flex: 1, padding: "3vh 2vw", borderRight: "2px solid #E2E8F0", display: "flex", flexDirection: "column" }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.85vw", color: "#A0AEC0", marginBottom: "1.5vh", textTransform: "uppercase", letterSpacing: "0.08em" }}>Step 04</div>
          <div style={{ fontSize: "3vw", fontWeight: 900, color: "#0A1628", letterSpacing: "-0.04em", marginBottom: "1.5vh", lineHeight: 1 }}>Stream</div>
          <p style={{ fontSize: "1.05vw", color: "#4A5568", lineHeight: 1.5, margin: 0 }}>
            AI response streams back to the user in real-time via SSE.
          </p>
        </div>

        {/* Step 5 */}
        <div style={{ flex: 1, padding: "3vh 0 3vh 2vw", display: "flex", flexDirection: "column" }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.85vw", color: "#A0AEC0", marginBottom: "1.5vh", textTransform: "uppercase", letterSpacing: "0.08em" }}>Step 05</div>
          <div style={{ fontSize: "3vw", fontWeight: 900, color: "#0A1628", letterSpacing: "-0.04em", marginBottom: "1.5vh", lineHeight: 1 }}>Save</div>
          <p style={{ fontSize: "1.05vw", color: "#4A5568", lineHeight: 1.5, margin: 0 }}>
            Conversation is saved in the database for future reference.
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ marginTop: "4vh", padding: "2.5vh 2.5vw", backgroundColor: "#F7FAFC", border: "1px solid #E2E8F0" }}>
        <p style={{ fontSize: "1.15vw", color: "#4A5568", margin: 0, fontWeight: 500 }}>
          <span style={{ color: "#0A1628", fontWeight: 700 }}>Result:</span> Student gets an instant, accurate answer — the entire flow takes under 2 seconds.
        </p>
      </div>

      {/* Footer */}
      <div style={{ position: "absolute", bottom: "4vh", left: "5vw", right: "5vw", display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #E2E8F0", paddingTop: "2vh" }}>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.9vw", color: "#A0AEC0" }}>How It Works / EduBot</div>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.9vw", color: "#0A1628", fontWeight: 600 }}>06</div>
      </div>
    </div>
  );
}
