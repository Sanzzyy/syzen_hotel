import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, Instagram, Facebook, Twitter } from "lucide-react";

const Contact = () => {
  // --- LOGIC (UNCHANGED) ---
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Room Reservation", // Translated default value
    message: "",
  });

  const [status, setStatus] = useState("idle");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("https://syzen-hotel-api.vercel.app/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "Room Reservation", message: "" });
        setTimeout(() => setStatus("idle"), 3000);
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Error:", error);
      setStatus("error");
    }
  };
  // --- END LOGIC ---

  return (
    <section className="relative py-24 px-6 bg-white overflow-hidden" id="contact">
      {/* 1. Background Decor (White & Pastel) */}
      <div className="absolute inset-0 bg-white"></div>

      {/* Decorative Circles (Soft Pastel) */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100/60 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-100/60 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* --- LEFT COLUMN: CONTACT INFO (Dark Text) --- */}
        <div className="space-y-8">
          <div>
            <span className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-2 block">Get in Touch</span>
            <h2 className="text-4xl md:text-5xl font-serif text-slate-900 leading-tight">
              We Are Ready <br /> <span className="text-blue-600 italic">To Hear From You.</span>
            </h2>
            <p className="text-slate-500 mt-4 text-lg leading-relaxed max-w-md">Have questions about reservations, events, or partnerships? Our team is ready to help 24/7.</p>
          </div>

          <div className="space-y-6 w-fit">
            {/* Contact Item 1 */}
            <div className="flex items-start gap-4 group">
              <div className="w-12 h-12 bg-blue-50 border border-blue-100 rounded-full flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                <MapPin size={22} />
              </div>
              <div>
                <h4 className="text-slate-900 font-bold text-lg">Our Location</h4>
                <p className="text-slate-500 text-sm">Jl. Informatika No. 3, South Jakarta</p>
              </div>
            </div>

            {/* Contact Item 2 */}
            <div className="flex items-start gap-4 group">
              <div className="w-12 h-12 bg-blue-50 border border-blue-100 rounded-full flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                <Mail size={22} />
              </div>
              <div>
                <h4 className="text-slate-900 font-bold text-lg">Email</h4>
                <p className="text-slate-500 text-sm">sajid@syzenhotel.com</p>
              </div>
            </div>

            {/* Contact Item 3 */}
            <div className="flex items-start gap-4 group">
              <div className="w-12 h-12 bg-blue-50 border border-blue-100 rounded-full flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                <Phone size={22} />
              </div>
              <div>
                <h4 className="text-slate-900 font-bold text-lg">Phone</h4>
                <p className="text-slate-500 text-sm">+62 812-3456-7890</p>
              </div>
            </div>
          </div>

          {/* Social Media Icons */}
          <div className="pt-8 border-t border-gray-200 flex gap-4">
            {[<Instagram size={20} />, <Facebook size={20} />, <Twitter size={20} />].map((icon, idx) => (
              <a key={idx} href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-slate-500 hover:bg-blue-600 hover:text-white transition-all border border-gray-200">
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* --- RIGHT COLUMN: FORM (White Card) --- */}
        <div className="relative">
          {/* Soft Shadow Background */}
          <div className="absolute top-10 left-10 right-10 bottom-0 bg-blue-200/50 blur-[50px] -z-10"></div>

          <div className="relative bg-white border border-gray-100 p-8 md:p-10 rounded-[2.5rem] shadow-2xl">
            <h3 className="text-2xl font-serif text-slate-900 mb-8 border-b border-gray-100 pb-4">Send a Message</h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 text-slate-900 placeholder-gray-400 focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                    placeholder="Your Name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 text-slate-900 placeholder-gray-400 focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                    placeholder="email@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Subject</label>
                <div className="relative">
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 text-slate-900 focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all appearance-none cursor-pointer"
                  >
                    <option className="bg-white text-slate-900">Room Reservation</option>
                    <option className="bg-white text-slate-900">Dining / Restaurant</option>
                    <option className="bg-white text-slate-900">Event & Wedding</option>
                    <option className="bg-white text-slate-900">Other</option>
                  </select>
                  {/* Custom Dropdown Arrow */}
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                      <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Your Message</label>
                <textarea
                  rows="4"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 text-slate-900 placeholder-gray-400 focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none"
                  placeholder="Tell us your needs..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={status === "loading" || status === "success"}
                className={`w-full font-bold py-4 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 mt-4 transform active:scale-95 ${
                  status === "success"
                    ? "bg-green-500 text-white ring-2 ring-green-400 ring-offset-2 ring-offset-white"
                    : status === "loading"
                      ? "bg-slate-200 text-slate-500 cursor-wait"
                      : "bg-blue-600 hover:bg-blue-700 text-white hover:shadow-blue-200"
                }`}
              >
                {status === "idle" && (
                  <>
                    <span className="mr-2">Send Message Now</span> <Send size={18} />
                  </>
                )}
                {status === "loading" && <span className="animate-pulse">Sending...</span>}
                {status === "success" && (
                  <>
                    <CheckCircle size={20} /> <span>Message Sent!</span>
                  </>
                )}
                {status === "error" && (
                  <>
                    <AlertCircle size={20} /> <span>Failed, Try Again</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
