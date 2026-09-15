/** Stand-ins for real photography/video/Lottie (see ASSETS.md) — markup
 * and animation hooks are already wired for the real tags. */
export function ImagePlaceholder({ label, className = "", style = {} }) {
  return (
    <div
      className={`${className}`}
      style={{
        background:
          "linear-gradient(135deg, #2a2a2a 0%, #111 60%, #000 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "rgba(255,255,255,0.35)",
        fontSize: "0.9vw",
        letterSpacing: "0.05em",
        textAlign: "center",
        padding: "1vw",
        ...style,
      }}
    >
      {label}
    </div>
  );
}

export function VideoPlaceholder({ label, className = "", style = {} }) {
  return (
    <div
      className={`${className}`}
      style={{
        background: "repeating-linear-gradient(45deg,#1a1a1a,#1a1a1a 10px,#0d0d0d 10px,#0d0d0d 20px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "rgba(255,255,255,0.4)",
        fontSize: "0.9vw",
        ...style,
      }}
    >
      {label}
    </div>
  );
}
