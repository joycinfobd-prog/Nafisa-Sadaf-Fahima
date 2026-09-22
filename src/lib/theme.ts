type Listener = () => void;

const listeners = new Set<Listener>();

export function isDark(): boolean {
  if (typeof document === "undefined") return true;
  return document.documentElement.classList.contains("dark");
}

export function setDark(dark: boolean) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.classList.toggle("dark", dark);
  root.style.colorScheme = dark ? "dark" : "light";
  try {
    localStorage.setItem("theme", dark ? "dark" : "light");
  } catch {
    // localStorage may be unavailable (private mode / sandboxed iframe)
  }
  listeners.forEach((listener) => listener());
}

export function toggleDark() {
  setDark(!isDark());
}

export function subscribeTheme(listener: Listener) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
