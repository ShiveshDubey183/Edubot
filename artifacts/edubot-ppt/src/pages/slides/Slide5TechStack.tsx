export default function Slide5TechStack() {
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
          <div style={{ position: "absolute", left: "-1vw", top: "1.5vh", width: "11vw", height: "3vh", backgroundColor: "#0A1628", opacity: 0.08, zIndex: 0 }} />
          <h2 style={{ fontSize: "3.5vw", fontWeight: 900, color: "#0A1628", margin: 0, lineHeight: 1, letterSpacing: "-0.03em", position: "relative", zIndex: 1 }}>
            Tech Stack
          </h2>
        </div>
        <div style={{ fontSize: "1.2vw", fontWeight: 800, color: "#0A1628", letterSpacing: "-0.02em" }}>EduBot</div>
      </div>

      {/* Content Body */}
      <div style={{ display: "flex", gap: "3vw", flex: 1 }}>
        {/* Left — stack items */}
        <div style={{ flex: 1.2, display: "flex", flexDirection: "column", gap: "0" }}>
          {/* Row 1 */}
          <div style={{ display: "flex", gap: "0", borderBottom: "1px solid #E2E8F0" }}>
            <div style={{ flex: 1, padding: "3vh 0", paddingRight: "2vw", borderRight: "1px solid #E2E8F0" }}>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.9vw", color: "#A0AEC0", marginBottom: "1vh", textTransform: "uppercase", letterSpacing: "0.08em" }}>Frontend</div>
              <div style={{ fontSize: "1.5vw", fontWeight: 700, color: "#0A1628", marginBottom: "0.5vh" }}>React + Vite</div>
              <div style={{ fontSize: "1.05vw", color: "#4A5568" }}>Tailwind CSS for styling</div>
            </div>
            <div style={{ flex: 1, padding: "3vh 0", paddingLeft: "2vw" }}>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.9vw", color: "#A0AEC0", marginBottom: "1vh", textTransform: "uppercase", letterSpacing: "0.08em" }}>Backend</div>
              <div style={{ fontSize: "1.5vw", fontWeight: 700, color: "#0A1628", marginBottom: "0.5vh" }}>Node.js + Express</div>
              <div style={{ fontSize: "1.05vw", color: "#4A5568" }}>REST API Server</div>
            </div>
          </div>
          {/* Row 2 */}
          <div style={{ display: "flex", gap: "0", borderBottom: "1px solid #E2E8F0" }}>
            <div style={{ flex: 1, padding: "3vh 0", paddingRight: "2vw", borderRight: "1px solid #E2E8F0" }}>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.9vw", color: "#A0AEC0", marginBottom: "1vh", textTransform: "uppercase", letterSpacing: "0.08em" }}>AI Engine</div>
              <div style={{ fontSize: "1.5vw", fontWeight: 700, color: "#0A1628", marginBottom: "0.5vh" }}>Google Gemini API</div>
              <div style={{ fontSize: "1.05vw", color: "#4A5568" }}>gemini-flash-lite-latest model</div>
            </div>
            <div style={{ flex: 1, padding: "3vh 0", paddingLeft: "2vw" }}>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.9vw", color: "#A0AEC0", marginBottom: "1vh", textTransform: "uppercase", letterSpacing: "0.08em" }}>Database</div>
              <div style={{ fontSize: "1.5vw", fontWeight: 700, color: "#0A1628", marginBottom: "0.5vh" }}>PostgreSQL</div>
              <div style={{ fontSize: "1.05vw", color: "#4A5568" }}>Drizzle ORM for queries</div>
            </div>
          </div>
          {/* Row 3 */}
          <div style={{ display: "flex", gap: "0" }}>
            <div style={{ flex: 1, padding: "3vh 0", paddingRight: "2vw", borderRight: "1px solid #E2E8F0" }}>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.9vw", color: "#A0AEC0", marginBottom: "1vh", textTransform: "uppercase", letterSpacing: "0.08em" }}>Streaming</div>
              <div style={{ fontSize: "1.5vw", fontWeight: 700, color: "#0A1628", marginBottom: "0.5vh" }}>Server-Sent Events</div>
              <div style={{ fontSize: "1.05vw", color: "#4A5568" }}>Real-time response delivery</div>
            </div>
            <div style={{ flex: 1, padding: "3vh 0", paddingLeft: "2vw" }}>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.9vw", color: "#A0AEC0", marginBottom: "1vh", textTransform: "uppercase", letterSpacing: "0.08em" }}>Platform</div>
              <div style={{ fontSize: "1.5vw", fontWeight: 700, color: "#0A1628", marginBottom: "0.5vh" }}>Replit Cloud</div>
              <div style={{ fontSize: "1.05vw", color: "#4A5568" }}>Hosted and deployed online</div>
            </div>
          </div>
        </div>

        {/* Right — highlight box */}
        <div style={{ flex: 0.7, backgroundColor: "#0A1628", padding: "4vh 3vw", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <h4 style={{ fontSize: "0.9vw", fontFamily: "'DM Mono', monospace", color: "#A0AEC0", textTransform: "uppercase", letterSpacing: "0.12em", margin: "0 0 3vh 0" }}>
            Architecture
          </h4>
          <p style={{ fontSize: "1.8vw", fontWeight: 800, color: "#FFFFFF", lineHeight: 1.3, margin: "0 0 4vh 0", letterSpacing: "-0.02em", textWrap: "pretty" }}>
            Full-stack web app with real AI integration and persistent storage.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5vh", marginTop: "auto" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1vw" }}>
              <div style={{ width: "0.5vw", height: "0.5vw", backgroundColor: "#A0AEC0", borderRadius: "50%" }} />
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.95vw", color: "#E2E8F0" }}>Frontend talks to backend via REST</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "1vw" }}>
              <div style={{ width: "0.5vw", height: "0.5vw", backgroundColor: "#A0AEC0", borderRadius: "50%" }} />
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.95vw", color: "#E2E8F0" }}>Backend calls Gemini AI directly</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "1vw" }}>
              <div style={{ width: "0.5vw", height: "0.5vw", backgroundColor: "#A0AEC0", borderRadius: "50%" }} />
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.95vw", color: "#E2E8F0" }}>Chats saved to PostgreSQL DB</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ position: "absolute", bottom: "4vh", left: "5vw", right: "5vw", display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #E2E8F0", paddingTop: "2vh" }}>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.9vw", color: "#A0AEC0" }}>Tech Stack / EduBot</div>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.9vw", color: "#0A1628", fontWeight: 600 }}>05</div>
      </div>
    </div>
  );
}
