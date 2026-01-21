// src/App.jsx
import Navbar from "./components/Navbar";
import ChatAI from "./components/ChatAI";
import Home from "./pages/Home";
import Rooms from "./pages/Rooms";
import Facilities from "./pages/Facilities";
import Testimonials from "./pages/Testimonials";
import Offers from "./pages/Offers";
import Contact from "./pages/Contact";
import Gallery from "./pages/Gallery";

const App = () => {
  return (
    <div className="font-sans antialiased bg-white min-h-screen">
      <Navbar />

      <main>
        <section id="home">
          <Home />
        </section>
        <section id="rooms">
          <Rooms />
        </section>
        <section id="offers">
          <Offers />
        </section>
        <section id="facilities" className="bg-slate-50">
          <Facilities />
        </section>
        <section id="gallery" className="py-20 px-6 max-w-7xl mx-auto">
          <Gallery />
        </section>
        <section id="testimonials">
          <Testimonials />
        </section>
        <section id="contact">
          <Contact />
        </section>

        {/* Section Booking sebagai penutup */}
        <section id="booking" className="relative py-32 px-6 flex items-center justify-center overflow-hidden">
          {/* Background Image Parallax */}
          <div className="absolute inset-0 z-0">
            <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070" alt="Luxury Pool" className="w-full h-full object-cover brightness-50" />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-slate-900/50 to-slate-900/30"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 text-center max-w-4xl mx-auto">
            <span className="text-blue-400 font-bold tracking-[0.3em] uppercase text-xs mb-4 block animate-pulse">Book Your Stay</span>
            <h2 className="text-5xl md:text-7xl font-serif text-white mb-8 leading-tight">
              Ready for Your <br /> <span className="italic text-blue-200">Dream Vacation?</span>
            </h2>
            <p className="text-slate-300 text-lg md:text-xl mb-12 max-w-2xl mx-auto font-light">Join thousands of guests who have experienced the magic of Syzen Hotel. Luxury awaits your arrival.</p>

            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
              <button className="bg-white text-blue-900 px-10 py-5 rounded-full font-bold text-lg hover:bg-blue-50 transition-all shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:scale-105 active:scale-95">Book Now</button>
              <button className="px-10 py-5 rounded-full font-bold text-lg text-white border border-white/30 hover:bg-white/10 transition-all backdrop-blur-sm">Contact Us</button>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-10 text-center text-gray-400 text-sm border-t">
        &copy; 2026 Syzen Hotel. Built with React & Node.js <br /> by Muhammad Sajid.
      </footer>
      <ChatAI />
    </div>
  );
};

export default App;
