"use client";

import { useRef, type ReactNode, type CSSProperties } from "react";

type Props = {
  children: ReactNode;
  strength?: number;
  className?: string;
  style?: CSSProperties;
};

/** Wraps any element and makes it gently follow the pointer (magnetic effect). */
export default function Magnetic({ children, strength = 0.35, className, style }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    el.style.transform = `translate3d(${dx * strength}px, ${dy * strength}px, 0)`;
  };
  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate3d(0,0,0)";
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={className}
      style={{ display: "inline-block", transition: "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)", ...style }}
    >
      {children}
    </div>
  );
}
