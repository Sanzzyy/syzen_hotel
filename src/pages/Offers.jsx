import React, { useState } from "react";
import { Sparkles, Tag, ArrowRight, Timer, Gift, Copy, Check } from "lucide-react";

const Offers = () => {
  // State for feedback when code is copied
  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = (code, id) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    // Reset check icon after 2 seconds
    setTimeout(() => setCopiedId(null), 2000);
  };

  const offers = [
    {
      id: 1,
      title: "Early Bird Escape",
      subtitle: "Book 14 Days in Advance",
      desc: "Plan your getaway early. Save 20% on all room types by booking at least 14 days in advance.",
      discount: "SAVE 20%",
      code: "EARLY20",
      icon: <Timer className="text-white" size={20} />,
      image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=2070",
      gradient: "from-blue-900/90 to-slate-900/20",
      accent: "bg-blue-500",
    },
    {
      id: 2,
      title: "Weekend Bliss",
      subtitle: "Saturday & Sunday Stay",
      desc: "The perfect weekend. Includes free breakfast for two and VIP access to Spa & Sauna facilities.",
      discount: "FREE SPA & MEAL",
      code: "WKNDJOY",
      icon: <Gift className="text-white" size={20} />,
      image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2070",
      gradient: "from-purple-900/90 to-slate-900/20",
      accent: "bg-purple-500",
    },
  ];

  return (
    <section className="py-24 px-6 bg-slate-50 overflow-hidden" id="offers">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 relative z-10">
          <span className="text-blue-600 font-bold tracking-[0.2em] uppercase text-xs mb-3 block animate-fade-in-up">Exclusive Promo</span>
          <h2 className="text-4xl md:text-6xl font-serif text-slate-900 leading-tight mb-6">
            Limited{" "}
            <span className="italic text-blue-600 relative inline-block">
              Offers
              {/* Decorative underline */}
              <svg className="absolute w-full h-3 -bottom-1 left-0 text-yellow-400 opacity-60" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
              </svg>
            </span>
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">Enjoy the luxury of Syzen Hotel at special rates. These offers are exclusive for bookings via our official website.</p>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {offers.map((offer) => (
            <div key={offer.id} className="group relative h-auto min-h-[550px] md:min-h-[500px] rounded-[2.5rem] overflow-hidden shadow-2xl hover:shadow-blue-900/20 transition-all duration-500 cursor-default">
              {/* --- 1. BACKGROUND IMAGE --- */}
              <div className="absolute inset-0">
                <img src={offer.image} alt={offer.title} className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110" />
                {/* Premium Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t ${offer.gradient} opacity-90 transition-opacity duration-500 group-hover:opacity-80`}></div>

                {/* Noise Texture (Optional) */}
                <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
              </div>

              {/* --- 2. DECORATIVE ELEMENTS --- */}
              {/* Discount Badge (Top Right) */}
              <div className="absolute top-6 right-6 md:top-8 md:right-8 z-20">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-5 py-2 rounded-full font-bold tracking-wider text-sm shadow-lg flex items-center gap-2 group-hover:bg-white group-hover:text-blue-900 transition-all duration-300">
                  <Tag size={14} className="group-hover:rotate-12 transition-transform" />
                  {offer.discount}
                </div>
              </div>

              {/* Icon Background (Large Transparent Decoration) */}
              <div className="absolute -top-10 -left-10 text-white opacity-5 transform -rotate-12 group-hover:rotate-0 group-hover:scale-110 transition-all duration-1000 pointer-events-none">
                {offer.id === 1 ? <Timer size={250} /> : <Gift size={250} />}
              </div>

              {/* --- 3. CONTENT CARD (Bottom) --- */}
              <div className="absolute bottom-0 left-0 w-full p-4 md:p-8 z-30">
                {/* Glass Card Container */}
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2rem] p-6 md:p-8 hover:bg-black/20 transition-colors duration-300 flex flex-col h-full justify-between group/card">
                  <div>
                    {/* Subtitle Badge */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`p-2.5 rounded-xl ${offer.accent} text-white shadow-lg`}>{offer.icon}</div>
                      <span className="text-blue-100 font-bold tracking-widest uppercase text-xs">{offer.subtitle}</span>
                    </div>

                    {/* Title & Desc */}
                    <h3 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4 leading-tight">{offer.title}</h3>
                    <p className="text-blue-50/80 leading-relaxed text-sm md:text-base mb-8 line-clamp-3 md:line-clamp-none">{offer.desc}</p>
                  </div>

                  {/* Action Area (Code & Button) */}
                  <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between pt-6 border-t border-white/10 border-dashed">
                    {/* Code Copy Section */}
                    <div
                      onClick={() => handleCopy(offer.code, offer.id)}
                      className="flex-1 bg-black/30 border border-white/10 rounded-xl px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-black/40 hover:border-white/30 transition-all group/code"
                    >
                      <div className="flex flex-col">
                        <span className="text-[10px] text-white/50 uppercase tracking-wider mb-0.5">Voucher Code</span>
                        <span className="font-mono text-lg font-bold text-white tracking-widest">{offer.code}</span>
                      </div>
                      <div className="text-white/70 group-hover/code:text-white transition-colors">{copiedId === offer.id ? <Check size={20} className="text-green-400" /> : <Copy size={18} />}</div>
                    </div>

                    {/* CTA Button */}
                    <button className="bg-white text-slate-900 px-8 py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-blue-600 hover:text-white transition-all shadow-xl hover:shadow-blue-600/25 active:scale-95">
                      Book Now <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Offers;
