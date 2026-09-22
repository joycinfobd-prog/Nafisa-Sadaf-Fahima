type Props = {
  className?: string;
  color?: string;
  strokeWidth?: number;
  animate?: boolean;
};

/** Animated ECG / heartbeat trace. Scales to its container width. */
export default function EcgLine({ className = "", color = "#ef4444", strokeWidth = 2, animate = true }: Props) {
  const d =
    "M0 40 H80 L95 40 L105 18 L115 62 L125 8 L138 72 L150 40 H230 L245 40 L255 18 L265 62 L275 8 L288 72 L300 40 H380 L395 40 L405 18 L415 62 L425 8 L438 72 L450 40 H530 L545 40 L555 18 L565 62 L575 8 L588 72 L600 40 H680";
  return (
    <svg
      viewBox="0 0 680 80"
      preserveAspectRatio="none"
      aria-hidden
      className={className}
      fill="none"
    >
      <path d={d} stroke={color} strokeOpacity="0.18" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      <path
        d={d}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={animate ? "ecg-path" : ""}
        style={{ filter: `drop-shadow(0 0 6px ${color})` }}
      />
    </svg>
  );
}
