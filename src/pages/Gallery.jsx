import React, { useState, useEffect } from "react";
import { ZoomIn, X, ChevronLeft, ChevronRight, Image as ImageIcon, Loader2 } from "lucide-react";

// --- NEW COMPONENT: IMAGE LOADER ---
// This component automatically handles loading state
const ImageWithLoader = ({ src, alt, className, onClick }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={`relative overflow-hidden bg-gray-200 ${className}`} onClick={onClick}>
      {/* 1. Loading View (Skeleton / Spinner) */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 animate-pulse z-10">
          <ImageIcon className="text-gray-400 opacity-50" size={32} />
        </div>
      )}

      {/* 2. Real Image */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        // When image finishes downloading, turn off loading
        onLoad={() => setIsLoading(false)}
        // CSS Trick: If loading, opacity 0 (hidden), if done, opacity 100 (smooth fade in)
        className={`w-full h-full object-cover transition-all duration-700 ease-in-out ${isLoading ? "opacity-0 scale-105" : "opacity-100 scale-100"}`}
      />
    </div>
  );
};

const Gallery = () => {
  const [filter, setFilter] = useState("All");
  const [selectedImage, setSelectedImage] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await fetch("https://syzen-api.vercel.app/api/gallery");

        if (!response.ok) throw new Error("Gagal fetch gallery");

        const data = await response.json();

        // Pengaman
        if (Array.isArray(data)) {
          setImages(data);
        } else {
          console.error("Data Gallery bukan array:", data);
          setImages([]);
        }
      } catch (error) {
        console.error("Gagal ambil gambar:", error);
        setImages([]);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  const categories = ["All", "Rooms", "Dining", "Facilities"];
  const filteredImages = filter === "All" ? images : images.filter((img) => img.category === filter);

  const handleNext = (e) => {
    e.stopPropagation();
    const currentIndex = filteredImages.findIndex((img) => img._id === selectedImage._id);
    const nextIndex = (currentIndex + 1) % filteredImages.length;
    setSelectedImage(filteredImages[nextIndex]);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    const currentIndex = filteredImages.findIndex((img) => img._id === selectedImage._id);
    const prevIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    setSelectedImage(filteredImages[prevIndex]);
  };

  // Unsplash Optimization Helper
  const optimizeImage = (url, width = 800) => {
    if (!url) return "";
    if (url.includes("unsplash.com")) {
      return `${url.split("?")[0]}?auto=format&fit=crop&q=80&w=${width}`;
    }
    return url;
  };

  return (
    <section className="py-24 px-6 bg-white" id="gallery">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-blue-600 font-bold tracking-widest uppercase text-xs mb-2 block">Our Visuals</span>
          <h2 className="text-4xl md:text-5xl font-serif text-slate-900 mb-4">Captured Moments</h2>
          <p className="text-slate-500 max-w-xl mx-auto">Explore every corner of Syzen Hotel.</p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-8 py-3 rounded-full text-sm font-bold tracking-wide transition-all duration-300 border ${
                filter === cat ? "bg-slate-900 text-white border-slate-900 shadow-lg" : "bg-white text-slate-500 border-slate-200 hover:border-slate-400 hover:text-slate-900"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid Layout */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="animate-spin text-blue-600" size={40} />
          </div>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {filteredImages.map((img) => (
              <div key={img._id} className="group relative rounded-3xl overflow-hidden cursor-pointer break-inside-avoid shadow-sm hover:shadow-2xl transition-all duration-500">
                {/* --- IMAGE LOADER IMPLEMENTATION HERE --- */}
                <ImageWithLoader
                  src={optimizeImage(img.src, 800)}
                  alt={img.title}
                  className="w-full h-auto" // Extra Class
                  onClick={() => setSelectedImage(img)}
                />

                {/* Overlay Hover Effect */}
                <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-center p-6 pointer-events-none">
                  <div className="bg-white/20 backdrop-blur-md p-4 rounded-full mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                    <ZoomIn className="text-white" size={32} />
                  </div>
                  <h3 className="text-white text-xl font-serif font-bold translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-200">{img.title}</h3>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* LIGHTBOX MODAL */}
      {selectedImage && (
        <div className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300" onClick={() => setSelectedImage(null)}>
          <button className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors p-2 bg-white/10 rounded-full z-50">
            <X size={32} />
          </button>

          <div className="relative max-w-5xl w-full max-h-[85vh] flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            {/* Use ImageWithLoader in Lightbox too to avoid blank space */}
            <ImageWithLoader src={optimizeImage(selectedImage.src, 1200)} alt={selectedImage.title} className="max-w-full max-h-[70vh] rounded-lg shadow-2xl" />

            <div className="text-center mt-6">
              <span className="text-blue-400 text-xs font-bold uppercase tracking-widest block mb-2">{selectedImage.category}</span>
              <h3 className="text-2xl font-serif text-white mb-2">{selectedImage.title}</h3>
              <p className="text-gray-400">{selectedImage.desc}</p>
            </div>

            <button onClick={handlePrev} className="absolute -left-10 top-1/2 -translate-y-1/2 -ml-12 text-white/50 hover:text-white p-2 hover:bg-white/10 rounded-full transition-all hidden md:block hover:cursor-pointer">
              <ChevronLeft size={48} />
            </button>
            <button onClick={handleNext} className="absolute -right-10 top-1/2 -translate-y-1/2 -mr-12 text-white/50 hover:text-white p-2 hover:bg-white/10 rounded-full transition-all hidden md:block hover:cursor-pointer">
              <ChevronRight size={48} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
