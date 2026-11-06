import { Menu, X, Moon, Sun } from "lucide-react";
import { useState, useCallback, useEffect } from "react";
import { useTheme } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Certificates", href: "#certificates" },
  { label: "Contact", href: "#contact" },
];

const calendlyUrl = "https://calendly.com/junrielpajal8/30min";

/** Scroll distance (px) after which the bar gets its translucent background. */
const SCROLL_THRESHOLD = 8;

/** Tracks which section is under the middle of the viewport. Returns its id, or null (e.g. in the hero). */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const elements = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        // Pick the first section in page order that crosses the middle band.
        setActive(ids.find((id) => visible.has(id)) ?? null);
      },
      // A thin band around the vertical middle of the viewport.
      { rootMargin: "-45% 0px -50% 0px" },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

const sectionIds = navLinks.map((link) => link.href.slice(1));

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const activeSection = useActiveSection(sectionIds);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu with Escape.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setOpen(false);
    const target = document.querySelector(href);
    if (target) {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    }
  }, []);

  const handleBookCallClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setOpen(false);

    const calendly = (window as Window & {
      Calendly?: { initPopupWidget: (options: { url: string }) => void };
    }).Calendly;

    if (calendly) {
      calendly.initPopupWidget({ url: calendlyUrl });
    } else {
      window.open(calendlyUrl, "_blank", "noopener,noreferrer");
    }
  }, []);

  const solid = scrolled || open;

  const themeButton = (
    <button
      type="button"
      onClick={toggleTheme}
      className="rounded-lg p-2 text-text-secondary hover:bg-surface hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
    >
      {theme === "dark" ? <Sun className="h-5 w-5" aria-hidden="true" /> : <Moon className="h-5 w-5" aria-hidden="true" />}
    </button>
  );

  const bookCallClass =
    "rounded-lg bg-primary font-semibold text-primary-foreground hover:bg-primary/90 active:scale-[0.97] transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

  return (
    <nav aria-label="Main" className="fixed left-0 right-0 top-0 z-50">
      {/* Background layer: only its opacity animates, so the bar fades in without animating colors. */}
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 border-b border-border/60 bg-background/75 shadow-[0_8px_24px_-16px_hsl(var(--foreground)/0.25)] backdrop-blur-xl transition-opacity duration-300 motion-reduce:transition-none",
          solid ? "opacity-100" : "opacity-0",
        )}
      />

      <div className="container relative flex h-16 items-center justify-between px-6">
        <div className="hidden md:block" />

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                aria-current={isActive ? "location" : undefined}
                className={cn(
                  "group relative py-1 text-sm font-medium focus:outline-none focus-visible:rounded focus-visible:ring-2 focus-visible:ring-ring",
                  isActive ? "text-primary" : "text-text-secondary hover:text-foreground",
                )}
              >
                {link.label}
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute -bottom-0.5 left-0 h-0.5 w-full origin-left rounded-full bg-primary transition-transform duration-300 motion-reduce:transition-none",
                    isActive ? "scale-x-100" : "scale-x-0",
                  )}
                />
              </a>
            );
          })}
          {themeButton}
          <a href={calendlyUrl} onClick={handleBookCallClick} className={cn(bookCallClass, "px-4 py-2 text-sm")}>
            Book a Call
          </a>
        </div>

        <div className="ml-auto flex items-center gap-1.5 md:hidden">
          {themeButton}
          <a href={calendlyUrl} onClick={handleBookCallClick} className={cn(bookCallClass, "whitespace-nowrap px-3 py-2 text-sm")}>
            Book a Call
          </a>
          <button
            type="button"
            className="rounded-lg p-2 text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-menu" className="relative border-t border-border bg-background md:hidden">
          <div className="container flex flex-col gap-1 px-6 py-4">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  aria-current={isActive ? "location" : undefined}
                  className={cn(
                    "rounded-lg px-3 py-3 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    isActive ? "bg-primary/10 text-primary" : "text-text-secondary hover:text-foreground",
                  )}
                >
                  {link.label}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
