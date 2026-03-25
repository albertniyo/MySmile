import React, { useState, useEffect } from "react";
import { Menu, X, UserCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMobileMenuOpen(false);
  }, [currentPath]);

  const navLinks = [
    { label: "Screening", path: "/screening" },
    { label: "Blog", path: "/blog" },
    { label: "Testimonials", path: "/testimonials" },
    { label: "Login", path: "/login" },
  ];

  const isHome = currentPath === "/";
  const shouldBeSolid = isScrolled || !isHome;

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        shouldBeSolid
          ? "bg-white/95 backdrop-blur-xl py-4 shadow-md border-b border-stone-100"
          : "bg-transparent py-8"
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between md:grid md:grid-cols-3">
        {/* Left Links - Desktop */}
        <div className="hidden md:flex items-center gap-12 text-nowrap">
          {navLinks.slice(0, 2).map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "text-[10px] font-bold uppercase tracking-[0.4em] transition-all relative group",
                currentPath === link.path
                  ? "text-stone-900"
                  : shouldBeSolid ? "text-stone-500 hover:text-stone-900" : "text-white/70 hover:text-white"
              )}
            >
              {link.label}
              <span className={cn(
                "absolute -bottom-1 left-0 h-px bg-current transition-all duration-500",
                currentPath === link.path ? "w-full" : "w-0 group-hover:w-full"
              )} />
            </Link>
          ))}
        </div>

        {/* Center Logo */}
        <div className="flex items-center justify-center">
          <Link
            to="/"
            className={cn(
              "text-xl md:text-2xl font-light tracking-[0.4em] uppercase transition-all duration-500",
              shouldBeSolid ? "text-stone-900" : "text-white hover:tracking-[0.5em]"
            )}
          >
            MySmile
          </Link>
        </div>

        {/* Right Links - Desktop */}
        <div className="hidden md:flex items-center justify-end gap-12">
          {navLinks.slice(2).map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "text-[10px] font-bold uppercase tracking-[0.4em] transition-all flex items-center gap-2 relative group",
                currentPath === link.path
                  ? "text-stone-900"
                  : shouldBeSolid ? "text-stone-500 hover:text-stone-900" : "text-white/70 hover:text-white"
              )}
            >
              {link.label === "Login" && <UserCircle size={14} />}
              {link.label}
              <span className={cn(
                "absolute -bottom-1 left-0 h-px bg-current transition-all duration-500",
                currentPath === link.path ? "w-full" : "w-0 group-hover:w-full"
              )} />
            </Link>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button
          className={cn(
            "md:hidden p-2 transition-colors rounded-full border",
            shouldBeSolid ? "text-stone-900 border-stone-100" : "text-white border-white/20 hover:bg-white/10"
          )}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-0 bg-white z-[60] flex flex-col p-8 animate-in fade-in slide-in-from-top duration-500 overflow-y-auto">
          <div className="flex justify-between items-center mb-20 shrink-0">
            <span className="text-xl font-light tracking-[0.3em] uppercase text-stone-900">MySmile</span>
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-stone-900 rounded-full border border-stone-100"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex flex-col gap-10">
            <Link
              to="/"
              className={cn(
                "text-3xl font-light uppercase tracking-[0.2em] transition-all",
                currentPath === "/" ? "text-stone-900 translate-x-4" : "text-stone-400 hover:text-stone-600"
              )}
            >
              Home
            </Link>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "text-3xl font-light uppercase tracking-[0.2em] transition-all",
                  currentPath === link.path ? "text-stone-900 translate-x-4" : "text-stone-400 hover:text-stone-600"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
          
          <div className="mt-auto pb-10 pt-20 text-center text-stone-300 text-[10px] uppercase tracking-[0.4em] shrink-0">
            &copy; 2026 MySmile Studio
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;