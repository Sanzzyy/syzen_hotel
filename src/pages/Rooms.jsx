import React, { useState, useEffect } from "react";
import { Coffee, Wifi, Users, ArrowRight, Star, Image as ImageIcon } from "lucide-react";

// --- 1. IMAGE LOADER COMPONENT ---
const ImageWithLoader = ({ src, alt, className }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    // Wrapper must be w-full h-full to fill card container
    <div className="relative w-full h-full bg-slate-200 overflow-hidden">
      {/* Loading View (Blinking Skeleton) */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-200 animate-pulse z-10">
          <ImageIcon className="text-slate-400 opacity-50" size={32} />
        </div>
      )}

      {/* Real Image */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setIsLoading(false)}
        // Combine default className (hover effect) with opacity logic
        className={`${className} transition-all duration-700 ease-in-out ${isLoading ? "opacity-0 scale-105" : "opacity-100"}`}
      />
    </div>
  );
};

// --- 2. IMAGE OPTIMIZATION HELPER ---
const optimizeImage = (url, width = 600) => {
  if (!url) return "";
  if (url.includes("unsplash.com")) {
    // Get clean url, then ask Unsplash to resize to width 600px
    return `${url.split("?")[0]}?auto=format&fit=crop&q=80&w=${width}`;
  }
  return url;
};

const Rooms = () => {
  const [activeRoom, setActiveRoom] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        // Pastikan URL backend Vercel kamu benar di sini
        const response = await fetch("https://syzen-api.vercel.app/api/rooms");

        // Cek apakah response sukses (status 200-299)
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // --- PENGAMAN ANTI LAYAR PUTIH ---
        // Cek: Apakah data yang datang bentuknya Array (Daftar)?
        if (Array.isArray(data)) {
          setRooms(data);
        } else {
          console.error("Format data salah, bukan array:", data);
          setRooms([]); // Set array kosong biar gak crash
        }
      } catch (error) {
        console.error("Gagal mengambil data:", error);
        setRooms([]); // Set array kosong kalau error network
      } finally {
        setLoading(false); // Matikan loading apapun yang terjadi
      }
    };

    fetchRooms();
  }, []);

  return (
    <div className="py-24 px-6 max-w-7xl mx-auto bg-white" id="rooms">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-6 ">
        <div>
          <span className="text-blue-600 font-bold tracking-widest uppercase text-xs mb-2 block">Accommodation</span>
          <h2 className="text-4xl md:text-5xl font-serif text-slate-900 leading-tight">
            The Sanctuary <br /> <span className="italic text-blue-900">You Deserve.</span>
          </h2>
        </div>
        <p className="text-slate-500 max-w-md text-sm leading-relaxed border-l-2 border-blue-100 pl-4">Room data is now fetched directly from the MongoDB Database in Real-time.</p>
      </div>

      {/* Main Loading State */}
      {loading ? (
        <div className="text-center py-20 text-slate-400 animate-pulse">Loading room data...</div>
      ) : (
        /* Rooms Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {rooms.map((room) => (
            <div
              key={room._id}
              onMouseEnter={() => setActiveRoom(room._id)}
              onMouseLeave={() => setActiveRoom(null)}
              className="group relative rounded-[2.5rem] overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500 bg-white border border-gray-100"
            >
              {/* Image Container */}
              <div className="h-[400px] overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none"></div>

                {/* Badge Room Type */}
                <div className="absolute top-6 left-6 z-20 flex gap-2 pointer-events-none">
                  <span className="bg-white/20 backdrop-blur-md border border-white/30 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">{room.type}</span>
                </div>

                {/* Rating */}
                <div className="absolute top-6 right-6 z-20 bg-white text-slate-900 px-3 py-1 rounded-full flex items-center gap-1 shadow-lg text-sm font-bold pointer-events-none">
                  <Star size={14} className="fill-yellow-400 text-yellow-400" /> {room.rating || 4.5}
                </div>

                {/* --- 3. IMPLEMENTATION HERE --- */}
                {/* Replaced <img> with ImageWithLoader + optimizeImage */}
                <ImageWithLoader
                  src={optimizeImage(room.img)}
                  alt={room.name}
                  // Zoom animation class on hover placed here
                  className="w-full h-full object-cover transform group-hover:scale-110"
                />
              </div>

              {/* Content Card */}
              <div className="absolute bottom-0 left-0 w-full p-8 z-20 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-3xl font-serif text-white mb-2">{room.name}</h3>

                {/* Facilities */}
                <div className={`flex items-center gap-4 text-white/90 mb-4 transition-all duration-500 ${activeRoom === room._id ? "opacity-100 max-h-20" : "opacity-0 max-h-0 md:opacity-100 md:max-h-20"}`}>
                  <div className="flex items-center gap-2 text-sm">
                    <Maximizze size={16} /> 30m²
                  </div>
                  <div className="w-1 h-1 bg-white rounded-full"></div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users size={16} /> 2 Guest
                  </div>
                  <div className="w-1 h-1 bg-white rounded-full"></div>
                  <div className="flex items-center gap-2 text-sm">
                    <Wifi size={16} /> Free Wifi
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-white/20 pt-6 mt-2">
                  <div>
                    <p className="text-white/60 text-xs uppercase tracking-wider mb-1">Start From</p>
                    <p className="text-2xl font-bold text-white">{room.price}</p>
                  </div>

                  <button className="bg-white text-blue-900 w-12 h-12 rounded-full flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-lg hover:scale-110">
                    <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Custom Icon
const Maximizze = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
  </svg>
);

export default Rooms;
