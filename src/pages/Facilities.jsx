import React from "react";
import { Car, Waves, Dumbbell, ShieldCheck, ArrowUpRight, Sparkles, Utensils, Wifi } from "lucide-react";

const Facilities = () => {
  const facilities = [
    {
      id: "01",
      name: "Sky Infinity Pool",
      icon: <Waves size={32} />,
      desc: "Swim above the clouds with breathtaking panoramic city views at sunset.",
    },
    {
      id: "02",
      name: "Elite Fitness Center",
      icon: <Dumbbell size={32} />,
      desc: "State-of-the-art Technogym equipment and personal trainers to maintain your fitness during your stay.",
    },
    {
      id: "03",
      name: "Fine Dining Resto",
      icon: <Utensils size={32} />,
      desc: "A five-star culinary experience with international menus curated by renowned Chefs.",
    },
  ];

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-20 gap-8">
          <div className="max-w-2xl">
            <span className="text-blue-600 font-bold tracking-widest uppercase text-xs mb-3 block">World Class Facilities</span>
            <h2 className="text-4xl md:text-5xl font-serif text-slate-900 leading-tight">
              More Than Just <br /> <span className="italic text-slate-500">A Place to Stay.</span>
            </h2>
          </div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {facilities.map((item, index) => (
            <div key={index} className="group bg-white p-10 rounded-[2.5rem] hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer border border-slate-100 relative overflow-hidden">
              {/* Background Decoration (Hover Effect) */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-[100%] -mr-10 -mt-10 transition-transform group-hover:scale-150 group-hover:bg-blue-600 duration-500"></div>

              {/* Number ID */}
              <span className="text-6xl font-black text-slate-100 absolute bottom-4 right-6 group-hover:text-blue-50 transition-colors duration-500 select-none">{item.id}</span>

              {/* Icon */}
              <div className="relative z-10 w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-sm">{item.icon}</div>

              {/* Text Content */}
              <div className="relative z-10">
                <h3 className="text-2xl font-serif font-bold text-slate-900 mb-3 group-hover:text-blue-900 transition-colors">{item.name}</h3>
                <p className="text-slate-500 text-sm leading-relaxed group-hover:text-slate-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Facilities;
