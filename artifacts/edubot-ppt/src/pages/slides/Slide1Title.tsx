export default function Slide1Title() {
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
      }}
    >
      {/* Top Row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ fontSize: "1.5vw", fontWeight: 800, color: "#0A1628", letterSpacing: "-0.02em" }}>
          EduBot
        </div>
        <div style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: "0.9vw",
          color: "#4A5568",
          display: "flex",
          flexDirection: "column",
          gap: "1vh",
          textAlign: "right"
        }}>
          <div><span style={{ color: "#A0AEC0", marginRight: "1vw" }}>Project:</span>AI Student Support Chatbot</div>
          <div><span style={{ color: "#A0AEC0", marginRight: "1vw" }}>Year:</span>2026</div>
          <div><span style={{ color: "#A0AEC0", marginRight: "1vw" }}>Presented by:</span>Shivesh Dubey</div>
          <div><span style={{ color: "#A0AEC0", marginRight: "1vw" }}>Type:</span>College Project</div>
        </div>
      </div>

      {/* Hero Title Area */}
      <div style={{ position: "absolute", bottom: "15vh", left: "5vw", width: "90vw" }}>
        <div style={{ position: "relative" }}>
          <div
            style={{
              position: "absolute",
              left: "-2vw",
              top: "2vh",
              width: "28vw",
              height: "5vh",
              backgroundColor: "#0A1628",
              opacity: 0.08,
              zIndex: 0
            }}
          />
          <h1
            style={{
              fontSize: "9vw",
              fontWeight: 900,
              color: "#0A1628",
              margin: 0,
              lineHeight: 1,
              letterSpacing: "-0.04em",
              position: "relative",
              zIndex: 1
            }}
          >
            EduBot
          </h1>
        </div>

        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginTop: "5vh"
        }}>
          <p
            style={{
              fontSize: "1.8vw",
              fontWeight: 500,
              color: "#4A5568",
              margin: 0,
              maxWidth: "52vw",
              lineHeight: 1.4,
              textWrap: "pretty",
            }}
          >
            An AI-powered chatbot built to support college students — available 24/7 for fees, admissions, exams, and more.
          </p>
          <div style={{ width: "28vw", height: "1px", backgroundColor: "#E2E8F0" }} />
        </div>
      </div>
    </div>
  );
}
