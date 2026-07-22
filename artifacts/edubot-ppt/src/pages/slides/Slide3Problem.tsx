export default function Slide3Problem() {
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
              width: "21vw",
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
            Problem Statement
          </h2>
        </div>
        <div style={{ fontSize: "1.2vw", fontWeight: 800, color: "#0A1628", letterSpacing: "-0.02em" }}>
          EduBot
        </div>
      </div>

      {/* Content */}
      <div style={{ display: "flex", gap: "5vw", flex: 1 }}>
        {/* Left — numbered problems */}
        <div style={{ flex: 1.2, display: "flex", flexDirection: "column", gap: "3vh" }}>
          <div style={{ display: "flex", gap: "2vw", alignItems: "flex-start" }}>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "1.2vw", color: "#A0AEC0", fontWeight: 600, minWidth: "2vw", paddingTop: "0.3vh" }}>01</div>
            <div>
              <h3 style={{ fontSize: "1.5vw", fontWeight: 700, color: "#0A1628", margin: "0 0 0.6vh 0" }}>Multiple Office Visits</h3>
              <p style={{ fontSize: "1.15vw", color: "#4A5568", lineHeight: 1.5, margin: 0 }}>
                Students had to visit multiple offices just to get basic information about fees, exams, or admissions.
              </p>
            </div>
          </div>

          <div style={{ width: "100%", height: "1px", backgroundColor: "#E2E8F0" }} />

          <div style={{ display: "flex", gap: "2vw", alignItems: "flex-start" }}>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "1.2vw", color: "#A0AEC0", fontWeight: 600, minWidth: "2vw", paddingTop: "0.3vh" }}>02</div>
            <div>
              <h3 style={{ fontSize: "1.5vw", fontWeight: 700, color: "#0A1628", margin: "0 0 0.6vh 0" }}>Limited Office Hours</h3>
              <p style={{ fontSize: "1.15vw", color: "#4A5568", lineHeight: 1.5, margin: 0 }}>
                Information was only available during office hours — weekends and nights left students helpless.
              </p>
            </div>
          </div>

          <div style={{ width: "100%", height: "1px", backgroundColor: "#E2E8F0" }} />

          <div style={{ display: "flex", gap: "2vw", alignItems: "flex-start" }}>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "1.2vw", color: "#A0AEC0", fontWeight: 600, minWidth: "2vw", paddingTop: "0.3vh" }}>03</div>
            <div>
              <h3 style={{ fontSize: "1.5vw", fontWeight: 700, color: "#0A1628", margin: "0 0 0.6vh 0" }}>Time-Consuming Process</h3>
              <p style={{ fontSize: "1.15vw", color: "#4A5568", lineHeight: 1.5, margin: 0 }}>
                Finding answers to simple questions was frustrating and wasted valuable student time.
              </p>
            </div>
          </div>

          <div style={{ width: "100%", height: "1px", backgroundColor: "#E2E8F0" }} />

          <div style={{ display: "flex", gap: "2vw", alignItems: "flex-start" }}>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "1.2vw", color: "#A0AEC0", fontWeight: 600, minWidth: "2vw", paddingTop: "0.3vh" }}>04</div>
            <div>
              <h3 style={{ fontSize: "1.5vw", fontWeight: 700, color: "#0A1628", margin: "0 0 0.6vh 0" }}>EduBot Solves This</h3>
              <p style={{ fontSize: "1.15vw", color: "#4A5568", lineHeight: 1.5, margin: 0 }}>
                A smart AI assistant available anytime — instant, accurate answers with no waiting.
              </p>
            </div>
          </div>
        </div>

        {/* Right — callout box */}
        <div style={{ flex: 0.8, backgroundColor: "#F7FAFC", border: "1px solid #E2E8F0", padding: "4vh 3vw", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <h4 style={{ fontSize: "0.9vw", fontFamily: "'DM Mono', monospace", color: "#A0AEC0", textTransform: "uppercase", letterSpacing: "0.12em", margin: "0 0 3vh 0" }}>
            The Core Gap
          </h4>
          <p style={{ fontSize: "2vw", fontWeight: 800, color: "#0A1628", lineHeight: 1.3, margin: "0 0 4vh 0", letterSpacing: "-0.02em", textWrap: "pretty" }}>
            "Students needed help exactly when no one was available to give it."
          </p>
          <div style={{ marginTop: "auto" }}>
            <div style={{ width: "100%", height: "1px", backgroundColor: "#E2E8F0", marginBottom: "2vh" }} />
            <div style={{ fontSize: "1.1vw", fontWeight: 600, color: "#0A1628" }}>EduBot bridges this gap</div>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.9vw", color: "#718096", marginTop: "0.5vh" }}>AI-powered, always online</div>
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
          Problem Statement / EduBot
        </div>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.9vw", color: "#0A1628", fontWeight: 600 }}>
          03
        </div>
      </div>
    </div>
  );
}
