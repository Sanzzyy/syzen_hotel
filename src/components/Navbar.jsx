import React, { useState, useEffect } from "react";
import { Home, Bed, Utensils, Image, Tag, Phone, Sparkles, Menu, X, ArrowRight, MessageSquare } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Efek 1: Deteksi Scroll untuk Style Navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Efek 2: Lock Scroll body saat menu terbuka
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
  }, [isOpen]);

  // Efek 3: IMPROVED Active Section Detection
  useEffect(() => {
    // Fungsi observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: null, // viewport
        rootMargin: "-40% 0px -60% 0px", // PENTING: Mendeteksi section saat berada di tengah layar (bukan baru muncul di bawah)
        threshold: 0,
      },
    );

    // Ambil semua section berdasarkan ID yang ada di navItems
    const sectionIds = ["home", "rooms", "facilities", "reviews", "gallery", "offers", "contact"];
    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const navItems = [
    { name: "Home", icon: <Home size={20} />, href: "#home" },
    { name: "Rooms", icon: <Bed size={20} />, href: "#rooms" },
    { name: "Offers", icon: <Sparkles size={20} />, href: "#offers" },
    { name: "Facilities", icon: <MessageSquare size={20} />, href: "#facilities" }, // Ganti Testimonials jadi Reviews sesuai ID
    { name: "Gallery", icon: <Image size={20} />, href: "#gallery" },
    { name: "Reviews", icon: <Tag size={20} />, href: "#reviews" },
    { name: "Contact", icon: <Phone size={20} />, href: "#contact" },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-500 border-b ${scrolled || isOpen ? "bg-white/90 backdrop-blur-md border-white/20 shadow-sm py-4" : "bg-transparent border-transparent py-6"}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          {/* LOGO */}
          <div className="relative z-[1002]">
            <a href="#" className={`text-2xl font-black tracking-tighter flex items-center gap-1 transition-colors duration-500 ${scrolled || isOpen ? "text-blue-900" : "text-white"}`}>
              <span className="font-serif italic text-3xl">S</span>YZEN
            </a>
          </div>

          {/* DESKTOP MENU */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.substring(1);

              return (
                <a key={item.name} href={item.href} className="group relative px-1 py-2">
                  <span
                    className={`text-xs font-bold uppercase tracking-widest transition-colors duration-300 ${
                      isActive
                        ? "text-blue-600" // Warna teks saat aktif
                        : scrolled
                          ? "text-slate-600 group-hover:text-blue-900"
                          : "text-white/80 group-hover:text-white"
                    }`}
                  >
                    {item.name}
                  </span>

                  {/* Garis Bawah Animasi */}
                  <span className={`absolute bottom-0 left-0 h-[2px] bg-blue-600 transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"}`}></span>
                </a>
              );
            })}

            <a
              href="#booking"
              className={`px-8 py-3 rounded-full text-xs font-bold tracking-wider transition-all duration-300 shadow-lg ${scrolled ? "bg-blue-900 text-white hover:bg-blue-800" : "bg-white text-blue-900 hover:bg-gray-100"}`}
            >
              BOOK NOW
            </a>
          </div>

          {/* MOBILE TOGGLE BUTTON */}
          <button className={`lg:hidden p-2 rounded-full transition-all z-[1002] ${scrolled || isOpen ? "text-blue-900 bg-blue-50" : "text-white bg-white/10 backdrop-blur-sm"}`} onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU OVERLAY (Tetap sama, hanya pastikan href sesuai) */}
      <div className={`fixed inset-0 z-[1001] bg-white lg:hidden transition-transform duration-500 ease-[cubic-bezier(0.77,0,0.175,1)] ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="h-[100dvh] overflow-y-auto pt-28 pb-10 px-6 flex flex-col">
          <div className="flex flex-col space-y-2">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 px-2">Menu</p>
            {navItems.map((item, index) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`group flex items-center justify-between p-4 rounded-2xl transition-all duration-300 border ${isActive ? "bg-blue-50 border-blue-100" : "hover:bg-blue-50 border-transparent hover:border-blue-100"}`}
                  style={{
                    opacity: isOpen ? 1 : 0,
                    transform: isOpen ? "translateY(0)" : "translateY(20px)",
                    transitionDelay: `${100 + index * 50}ms`,
                  }}
                >
                  <div className="flex items-center gap-4">
                    <span className={`p-3 rounded-full transition-colors ${isActive ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-500 group-hover:text-blue-600"}`}>{item.icon}</span>
                    <span className={`text-lg font-serif font-medium ${isActive ? "text-blue-900" : "text-slate-800 group-hover:text-blue-900"}`}>{item.name}</span>
                  </div>
                  <ArrowRight size={18} className={`transition-transform ${isActive ? "text-blue-600 translate-x-1" : "text-gray-300 group-hover:text-blue-600 group-hover:translate-x-1"}`} />
                </a>
              );
            })}
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100" style={{ opacity: isOpen ? 1 : 0, transitionDelay: "500ms", transitionDuration: "500ms" }}>
            <a href="#booking" onClick={() => setIsOpen(false)} className="flex items-center justify-center gap-2 w-full bg-blue-900 text-white py-4 rounded-xl text-lg font-bold shadow-xl active:scale-95 transition-transform">
              Check Availability
            </a>
            <p className="text-center text-gray-400 text-xs mt-4">© 2026 Syzen Hotel Luxury Experience</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
