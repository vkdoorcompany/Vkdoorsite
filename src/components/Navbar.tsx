import { ArrowUpRight, MessageCircle, Menu } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showSince, setShowSince] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowSince((prev) => !prev);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const scrollEffect = scrolled
    ? "opacity-0 pointer-events-none transition-none"
    : "opacity-100 scale-100";

  const getIsActive = (href: string) => {
    if (href === "/") return location.pathname === "/" && !location.hash;
    const [path, hash] = href.split("#");
    if (hash) {
      return location.pathname === path && location.hash === "#" + hash;
    }
    return location.pathname === href;
  };

  return (
    <>
      <header
        className={`fixed left-0 top-0 z-[70] flex w-full items-center justify-between gap-3 px-6 sm:px-16 h-16 sm:h-20 pointer-events-none transition-all duration-700 ${isOpen ? "bg-transparent" : scrolled ? "bg-transparent" : "bg-gradient-to-b from-black/50 to-transparent"}`}
      >
        <div
          className={`relative flex items-center h-full w-48 sm:w-56 transition-all duration-700 ease-out origin-left pointer-events-auto ${isOpen ? "" : scrollEffect}`}
        >
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="text-xl sm:text-2xl font-black tracking-tighter uppercase text-white w-full h-full flex items-center relative z-50"
          >
            <AnimatePresence mode="wait">
              {!showSince ? (
                <motion.div
                  key="vkdoor"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                  className="absolute left-0 flex items-center whitespace-nowrap"
                >
                  VK DOOR
                </motion.div>
              ) : (
                <motion.div
                  key="since"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                  className="absolute left-0 flex items-center whitespace-nowrap"
                >
                  Since 1992
                </motion.div>
              )}
            </AnimatePresence>
          </Link>
        </div>

        <div
          className={`flex items-center h-full gap-2 sm:gap-4 transition-all duration-700 ease-out origin-right pointer-events-auto ${isOpen ? "opacity-0 pointer-events-none" : scrollEffect}`}
        >
          <Link
            to="/contact"
            className="hidden sm:inline-flex h-[42px] w-[42px] sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full bg-white text-black shadow-xl ring-1 ring-black/5 hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer"
          >
            <MessageCircle className="h-5 w-5" />
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex h-[42px] w-[42px] sm:h-12 sm:w-12 items-center justify-center text-white hover:text-white/70 transition-colors duration-200 cursor-pointer"
            aria-label="Toggle menu"
          >
            <div className="flex flex-col gap-1.5 w-6">
              <div className="h-[2px] w-full bg-current rounded-full" />
              <div className="h-[2px] w-full bg-current rounded-full" />
            </div>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ type: "spring", bounce: 0, duration: 0.8 }}
            className="fixed inset-0 z-[60] bg-black text-white flex flex-col pt-24 px-8 sm:px-16 pb-8 pointer-events-auto"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 sm:top-8 right-6 sm:right-8 p-4 -m-4 text-white font-bold uppercase tracking-widest text-sm hover:text-white/70 transition-colors z-50 cursor-pointer pointer-events-auto"
            >
              Close
            </button>
            <nav className="flex-1 flex flex-col gap-4 sm:gap-6 justify-center">
              {[
                { name: "Home", href: "/", isLink: true },
                { name: "About Us", href: "/about", isLink: true },
                { name: "Contact Us", href: "/contact", isLink: true },
                { name: "Design Lookbook", href: "/lookbook", isLink: true },
                {
                  name: "Whatsapp",
                  href: "https://wa.me/919050050120?text=Hello%20VK%20DOOR",
                  isLink: false,
                },
              ].map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                >
                  {item.isLink ? (
                    <Link
                      to={item.href}
                      onClick={() => {
                        setIsOpen(false);
                        if (item.name === "Home") window.scrollTo(0, 0);
                      }}
                      className={`text-4xl sm:text-5xl md:text-6xl font-display font-black uppercase tracking-tighter hover:opacity-75 transition-colors inline-block ${getIsActive(item.href) ? "text-zinc-400" : "text-white"}`}
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => {
                        setIsOpen(false);
                      }}
                      className="text-4xl sm:text-5xl md:text-6xl font-display font-black uppercase tracking-tighter text-white hover:opacity-75 transition-colors inline-block"
                    >
                      {item.name}
                    </a>
                  )}
                </motion.div>
              ))}
            </nav>
            <div className="mt-auto">
              <p className="text-xs font-medium uppercase tracking-widest text-white/70 mb-2">
                Email
              </p>
              <a
                href="mailto:info@vkdoor.in"
                className="text-2xl font-black tracking-tight hover:opacity-85 pointer-events-auto relative z-50"
              >
                info@vkdoor.in
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
