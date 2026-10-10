import { AnimatedThemeToggler } from "@/components/magicui/animated-theme-toggler";

export function ThemeToggle() {
  return (
    <AnimatedThemeToggler className="nav-item-compact w-10 h-10 flex items-center justify-center bg-white/10 dark:bg-gray-700/30 md:bg-transparent md:dark:bg-transparent" />
  );
}
