import React, { useRef, useState } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

const Testimonials = () => {
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const reviews = [
    {
      id: 1,
      name: "Budi Santoso",
      role: "Business Traveler",
      rating: 5,
      text: "Exceptional service! The internet was incredibly fast, and the room was spotless and soundproof.",
      img: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      id: 2,
      name: "Sarah Wijaya",
      role: "Staycation with Family",
      rating: 5,
      text: "The staff was very friendly and helpful in accommodating our baby's needs. The breakfast was delicious with a great variety of local and western options.",
      img: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      id: 3,
      name: "Michael Chen",
      role: "International Tourist",
      rating: 5,
      text: "The interior design is very classy and instagrammable. Will recommend to friends.",
      img: "https://randomuser.me/api/portraits/men/85.jpg",
    },
    {
      id: 4,
      name: "Jessica Mila",
      role: "Lifestyle Blogger",
      rating: 5,
      text: "Every corner of this hotel is aesthetic. I absolutely loved the interior details in the lobby and the room.",
      img: "https://randomuser.me/api/portraits/women/65.jpg",
    },
  ];

  // --- LOGIC: SCROLL BUTTONS ---
  const scroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
      const scrollAmount = direction === "left" ? -632 : 632;
      current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // --- LOGIC: MOUSE DRAG ---
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault(); // Prevent text selection during drag
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <section className="py-24 bg-slate-900 relative overflow-hidden" id="reviews">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-blue-500 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-amber-500 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 px-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <span className="text-blue-400 font-bold tracking-widest uppercase text-xs mb-3 block">Guest Stories</span>
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">
              What They <span className="italic text-slate-400">Say?</span>
            </h2>
            <p className="text-slate-400 max-w-xl text-lg">Honest experiences from our valued guests.</p>
          </div>

          {/* Navigation Buttons */}
          <div className="hidden md:flex gap-4">
            <button onClick={() => scroll("left")} className="p-3 rounded-full border border-white/20 text-white hover:bg-blue-600 hover:border-blue-600 transition-all active:scale-95">
              <ChevronLeft size={24} />
            </button>
            <button onClick={() => scroll("right")} className="p-3 rounded-full border border-white/20 text-white hover:bg-blue-600 hover:border-blue-600 transition-all active:scale-95">
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* CAROUSEL CONTAINER */}
        <div
          ref={scrollRef}
          // Mouse Drag Event Handlers
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className={`flex gap-8 overflow-x-auto -mx-6 px-6 pb-12 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden 
            ${isDragging ? "cursor-grabbing snap-none" : "cursor-grab snap-x snap-mandatory"}`}
        >
          {reviews.map((review) => (
            <div
              key={review.id}
              className="snap-center flex-shrink-0 w-[85vw] md:w-[600px] bg-white/5 backdrop-blur-sm border border-white/10 p-8 md:p-10 rounded-[2.5rem] hover:border-blue-500/30 transition-all duration-300 group flex flex-col justify-between select-none"
            >
              <div>
                <div className="flex justify-between items-start mb-8">
                  <div className="flex gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} size={20} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="text-blue-500 opacity-50 group-hover:opacity-100 transition-opacity" size={48} />
                </div>
                <p className="text-slate-200 leading-relaxed text-lg md:text-xl mb-10 font-serif italic pointer-events-none">"{review.text}"</p>
              </div>

              <div className="flex items-center gap-5 border-t border-white/10 pt-6 pointer-events-none">
                <img src={review.img} alt={review.name} className="w-16 h-16 rounded-full object-cover border-2 border-blue-500/50 p-1" />
                <div>
                  <h4 className="text-white font-bold text-lg group-hover:text-blue-400 transition-colors">{review.name}</h4>
                  <p className="text-sm text-slate-500 uppercase tracking-wider font-bold">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
          <div className="flex-shrink-0 w-6" />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
