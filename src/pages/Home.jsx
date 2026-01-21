import React from "react";
import { Star, ArrowRight, Calendar, Users, MapPin } from "lucide-react";

const Home = () => {
  return (
    <div className="bg-slate-50">
      {/* 1. HERO SECTION WITH BOOKING WIDGET */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center">
        {/* Background Image with Parallax Effect */}
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=2070" alt="Luxury Hotel" className="w-full h-full object-cover brightness-75" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/60"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto -mt-20">
          <div className="flex justify-center items-center gap-2 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} size={16} className="text-yellow-400 fill-yellow-400" />
            ))}
            <span className="text-sm font-medium tracking-widest uppercase ml-2 text-slate-200">5 Star Luxury Hotel</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-medium mb-6 leading-tight">
            A New Perspective <br /> on <span className="italic text-blue-200">Luxury</span>
          </h1>
          <p className="text-lg md:text-xl mb-10 text-slate-200 font-light max-w-2xl mx-auto">Experience timeless tranquility in the heart of the city. Syzen Hotel offers a stay that redefines comfort.</p>
        </div>

        {/* Floating Booking Widget (The "Expensive" Touch) */}
        <div className="absolute -bottom-20 md:-bottom-16 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl bg-white shadow-2xl rounded-3xl p-6 md:p-8 z-20 flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-1 w-full space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Check In</label>
            <div className="flex items-center gap-3 border-b border-gray-200 pb-2">
              <Calendar size={18} className="text-blue-600" />
              <input type="date" className="w-full outline-none text-gray-800 font-medium bg-transparent" />
            </div>
          </div>
          <div className="flex-1 w-full space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Check Out</label>
            <div className="flex items-center gap-3 border-b border-gray-200 pb-2">
              <Calendar size={18} className="text-blue-600" />
              <input type="date" className="w-full outline-none text-gray-800 font-medium bg-transparent" />
            </div>
          </div>
          <div className="flex-1 w-full space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Guests</label>
            <div className="flex items-center gap-3 border-b border-gray-200 pb-2">
              <Users size={18} className="text-blue-600" />
              <select className="w-full outline-none text-gray-800 font-medium bg-transparent">
                <option>1 Guest</option>
                <option>2 Guests</option>
                <option>Family (3+)</option>
              </select>
            </div>
          </div>
          <button className="w-full md:w-auto bg-blue-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-800 transition-all shadow-lg shadow-blue-900/30">Check Availability</button>
        </div>
      </section>

      {/* 2. WELCOME / STORY SECTION (Asymmetric Layout) */}
      <section className="pt-40 pb-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-blue-600 font-bold tracking-widest uppercase text-xs mb-2 block">Our Story</span>
            <h2 className="text-4xl md:text-5xl font-serif text-slate-900 mb-6 leading-tight">
              Unforgettable <br /> Comfort.
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              Syzen Hotel is more than just a place to stay; it is a destination. With modern architectural design blended with natural touches, we create a soothing atmosphere for your soul.
            </p>
            <button className="group flex items-center gap-2 text-blue-900 font-bold hover:gap-4 transition-all">
              Discover More <ArrowRight size={18} />
            </button>
          </div>
          <div className="relative">
            <img src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2070" className="rounded-[2rem] shadow-2xl w-full object-cover z-10 relative" alt="Interior" />
            {/* Decorative Element */}
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-100 rounded-full z-0 opacity-50 blur-2xl"></div>
          </div>
        </div>
      </section>

      {/* 4. IMMERSIVE VIDEO/IMAGE SECTION */}
      <section className="relative h-[60vh] bg-fixed bg-center bg-cover flex items-center justify-center text-center px-4" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2070')" }}>
        <div className="absolute inset-0 bg-blue-950/70"></div>
        <div className="relative z-10 max-w-3xl">
          <Star size={40} className="text-white mx-auto mb-6 opacity-80" />
          <h2 className="text-3xl md:text-5xl font-serif text-white mb-8 leading-snug">"The best service I have ever experienced. Syzen Hotel truly defines luxury."</h2>
          <div className="flex items-center justify-center gap-4">
            <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="User" className="w-12 h-12 rounded-full border-2 border-white" loading="lazy" />
            <div className="text-left">
              <p className="text-white font-bold text-sm">Sarah Jenkins</p>
              <p className="text-blue-200 text-xs">Travel Blogger</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
