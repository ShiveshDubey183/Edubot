export default function Slide7ThankYou() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        backgroundColor: "#0A1628",
        fontFamily: "'Inter', sans-serif",
        position: "relative",
        boxSizing: "border-box",
        padding: "5vh 5vw",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Top bar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10vh" }}>
        <div style={{ fontSize: "1.5vw", fontWeight: 800, color: "#FFFFFF", letterSpacing: "-0.02em" }}>
          EduBot
        </div>
        <div style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: "0.9vw",
          color: "#A0AEC0",
          display: "flex",
          gap: "3vw"
        }}>
          <div>AI Student Support Chatbot</div>
          <div>College Project — 2026</div>
        </div>
      </div>

      {/* Centre Content */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flex: 1, textAlign: "center" }}>
        <div style={{ position: "relative" }}>
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: "38vw",
              height: "10vh",
              backgroundColor: "#FFFFFF",
              opacity: 0.04,
              zIndex: 0
            }}
          />
          <h2
            style={{
              fontSize: "7vw",
              fontWeight: 900,
              color: "#FFFFFF",
              margin: "0 0 3vh 0",
              lineHeight: 1,
              letterSpacing: "-0.04em",
              position: "relative",
              zIndex: 1
            }}
          >
            Thank You
          </h2>
        </div>

        <p style={{ fontSize: "1.8vw", color: "#E2E8F0", maxWidth: "50vw", lineHeight: 1.5, margin: "0 0 6vh 0", fontWeight: 400, textWrap: "pretty" }}>
          EduBot — Making Student Life Easier with AI
        </p>

        <div style={{ width: "20vw", height: "1px", backgroundColor: "rgba(255,255,255,0.2)", marginBottom: "4vh" }} />

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.8vh" }}>
          <div style={{ fontSize: "1.5vw", fontWeight: 700, color: "#FFFFFF" }}>Shivesh Dubey</div>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "1vw", color: "#A0AEC0" }}>Presented by</div>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        position: "absolute",
        bottom: "5vh",
        left: "5vw",
        right: "5vw",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderTop: "1px solid rgba(255,255,255,0.15)",
        paddingTop: "2vh"
      }}>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.9vw", color: "#A0AEC0" }}>
          Thank You / EduBot
        </div>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.9vw", color: "#FFFFFF", fontWeight: 600 }}>
          07
        </div>
      </div>
    </div>
  );
}
