export default function MeshBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Medical cross pattern */}
      <div className="absolute inset-0 cross-pattern opacity-70 dark:opacity-45" />

      {/* Mesh orbs — clinical blue / surgical teal / faint vital red */}
      <div
        className="absolute -left-[10%] -top-[10%] h-[55vmax] w-[55vmax] rounded-full opacity-40 blur-[120px] animate-orb-1 dark:opacity-30"
        style={{ background: "radial-gradient(circle at 30% 30%, #0a84d6, transparent 65%)" }}
      />
      <div
        className="absolute -right-[15%] top-[20%] h-[50vmax] w-[50vmax] rounded-full opacity-35 blur-[130px] animate-orb-2 dark:opacity-25"
        style={{ background: "radial-gradient(circle at 60% 40%, #12a58f, transparent 65%)" }}
      />
      <div
        className="absolute bottom-[-20%] left-[25%] h-[45vmax] w-[45vmax] rounded-full opacity-25 blur-[140px] animate-orb-3 dark:opacity-18"
        style={{ background: "radial-gradient(circle at 50% 50%, #62b8f5, #ef4444 70%, transparent 80%)" }}
      />

      {/* Large faint Rx watermark */}
      <span className="rx-mark absolute -right-6 top-[38%] select-none text-[38vmax] leading-none text-medblue/[0.035] dark:text-medblue/[0.05]">
        Rx
      </span>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--bg)]" />
    </div>
  );
}
