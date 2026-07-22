export default function Slide2Overview() {
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
          <div
            style={{
              position: "absolute",
              left: "-1vw",
              top: "1.5vh",
              width: "18vw",
              height: "3vh",
              backgroundColor: "#0A1628",
              opacity: 0.08,
              zIndex: 0
            }}
          />
          <h2
            style={{
              fontSize: "3.5vw",
              fontWeight: 900,
              color: "#0A1628",
              margin: 0,
              lineHeight: 1,
              letterSpacing: "-0.03em",
              position: "relative",
              zIndex: 1
            }}
          >
            Project Overview
          </h2>
        </div>
        <div style={{ fontSize: "1.2vw", fontWeight: 800, color: "#0A1628", letterSpacing: "-0.02em" }}>
          EduBot
        </div>
      </div>

      {/* Content */}
      <div style={{ display: "flex", gap: "5vw", flex: 1 }}>
        {/* Left Column */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "3vh" }}>
          <p style={{ fontSize: "1.6vw", fontWeight: 500, color: "#4A5568", lineHeight: 1.5, margin: 0, textWrap: "pretty" }}>
            EduBot is an AI-powered chatbot that gives college students instant answers — no office visits, no waiting.
          </p>
          <div style={{ width: "100%", height: "1px", backgroundColor: "#E2E8F0" }} />
          <div style={{ display: "flex", flexDirection: "column", gap: "2.5vh" }}>
            <div style={{ display: "flex", gap: "2vw" }}>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "1.2vw", color: "#A0AEC0", fontWeight: 600, minWidth: "2vw" }}>01</div>
              <div>
                <h3 style={{ fontSize: "1.4vw", fontWeight: 700, color: "#0A1628", margin: "0 0 0.5vh 0" }}>Built for College Students</h3>
                <p style={{ fontSize: "1.1vw", color: "#4A5568", lineHeight: 1.5, margin: 0 }}>
                  EduBot is an AI chatbot built to help college students get quick, accurate answers.
                </p>
              </div>
            </div>
            <div style={{ display: "flex", gap: "2vw" }}>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "1.2vw", color: "#A0AEC0", fontWeight: 600, minWidth: "2vw" }}>02</div>
              <div>
                <h3 style={{ fontSize: "1.4vw", fontWeight: 700, color: "#0A1628", margin: "0 0 0.5vh 0" }}>Available 24/7</h3>
                <p style={{ fontSize: "1.1vw", color: "#4A5568", lineHeight: 1.5, margin: 0 }}>
                  Students can ask questions anytime — no waiting for office hours.
                </p>
              </div>
            </div>
            <div style={{ display: "flex", gap: "2vw" }}>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "1.2vw", color: "#A0AEC0", fontWeight: 600, minWidth: "2vw" }}>03</div>
              <div>
                <h3 style={{ fontSize: "1.4vw", fontWeight: 700, color: "#0A1628", margin: "0 0 0.5vh 0" }}>One Stop for All Queries</h3>
                <p style={{ fontSize: "1.1vw", color: "#4A5568", lineHeight: 1.5, margin: 0 }}>
                  Instant answers — no waiting, no office visits needed.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div style={{ flex: 1, backgroundColor: "#0A1628", color: "#FFFFFF", padding: "4vh 3vw", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <h4 style={{ fontSize: "0.9vw", fontFamily: "'DM Mono', monospace", color: "#A0AEC0", textTransform: "uppercase", letterSpacing: "0.12em", margin: "0 0 3vh 0" }}>
            Topics Covered
          </h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "2vh" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1.5vw" }}>
              <div style={{ width: "0.3vw", height: "2.5vh", backgroundColor: "#E2E8F0", opacity: 0.4 }} />
              <span style={{ fontSize: "1.4vw", fontWeight: 600, color: "#FFFFFF" }}>Fees &amp; Payments</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "1.5vw" }}>
              <div style={{ width: "0.3vw", height: "2.5vh", backgroundColor: "#E2E8F0", opacity: 0.4 }} />
              <span style={{ fontSize: "1.4vw", fontWeight: 600, color: "#FFFFFF" }}>Admissions</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "1.5vw" }}>
              <div style={{ width: "0.3vw", height: "2.5vh", backgroundColor: "#E2E8F0", opacity: 0.4 }} />
              <span style={{ fontSize: "1.4vw", fontWeight: 600, color: "#FFFFFF" }}>Exams &amp; Results</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "1.5vw" }}>
              <div style={{ width: "0.3vw", height: "2.5vh", backgroundColor: "#E2E8F0", opacity: 0.4 }} />
              <span style={{ fontSize: "1.4vw", fontWeight: 600, color: "#FFFFFF" }}>Faculty &amp; Departments</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "1.5vw" }}>
              <div style={{ width: "0.3vw", height: "2.5vh", backgroundColor: "#E2E8F0", opacity: 0.4 }} />
              <span style={{ fontSize: "1.4vw", fontWeight: 600, color: "#FFFFFF" }}>Placements</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "1.5vw" }}>
              <div style={{ width: "0.3vw", height: "2.5vh", backgroundColor: "#E2E8F0", opacity: 0.4 }} />
              <span style={{ fontSize: "1.4vw", fontWeight: 600, color: "#FFFFFF" }}>Campus Life</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        position: "absolute",
        bottom: "4vh",
        left: "5vw",
        right: "5vw",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderTop: "1px solid #E2E8F0",
        paddingTop: "2vh"
      }}>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.9vw", color: "#A0AEC0" }}>
          Project Overview / EduBot
        </div>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.9vw", color: "#0A1628", fontWeight: 600 }}>
          02
        </div>
      </div>
    </div>
  );
}
