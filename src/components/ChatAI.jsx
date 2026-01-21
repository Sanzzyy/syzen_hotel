import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X, SendHorizonal, Bot, Sparkles, Loader2 } from "lucide-react";

const ChatAI = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // State awal (Sama)
  const [messages, setMessages] = useState([
    { id: 1, text: "Halo! 👋 Saya Syzen Assistant.", sender: "ai" },
    { id: 2, text: "Ada yang bisa saya bantu? Coba tanya 'harga kamar' atau 'fasilitas'.", sender: "ai" },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen, isTyping]);

  const handleSend = async (e) => {
    // ... (Logic sama persis, tidak perlu diubah) ...
    e.preventDefault();
    if (!inputValue.trim()) return;
    const userText = inputValue;
    setMessages((prev) => [...prev, { id: Date.now(), text: userText, sender: "user" }]);
    setInputValue("");
    setIsTyping(true);
    try {
      const response = await fetch("https://syzen-hotel-api.vercel.app/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText }),
      });
      const data = await response.json();
      setMessages((prev) => [...prev, { id: Date.now() + 1, text: data.reply, sender: "ai" }]);
    } catch (error) {
      console.error("Error chat:", error);
      setMessages((prev) => [...prev, { id: Date.now(), text: "Maaf, koneksi ke server terputus.", sender: "ai" }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    // Wrapper Utama: Tetap 'pointer-events-none' biar area kosong tembus pandang
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[9999] flex flex-col items-end pointer-events-none">
      {/* JENDELA CHAT */}
      <div
        className={`transition-all duration-300 transform origin-bottom-right mb-4 
        ${isOpen ? "scale-100 opacity-100 translate-y-0" : "scale-95 opacity-0 translate-y-10"}
      `}
      >
        {/* --- FIX DISINI (PENTING!) --- */}
        {/* Tambahkan logic: Jika isOpen ? 'pointer-events-auto' : 'pointer-events-none' */}
        {/* Ini bikin jendela chat jadi "hantu" (bisa ditembus) kalau lagi ketutup */}
        <div className={`w-[calc(100vw-2rem)] md:w-[350px] h-[450px] md:h-[500px] bg-white rounded-3xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden font-sans ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}>
          {/* HEADER */}
          <div className="bg-blue-600 p-4 text-white flex items-center gap-3 shadow-sm">
            <div className="bg-white/20 p-2 rounded-full relative">
              <Bot size={24} className="text-white" />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-blue-600 rounded-full"></div>
            </div>
            <div>
              <h3 className="font-bold text-lg leading-tight flex items-center gap-1">
                Syzen AI <Sparkles size={14} className="text-yellow-300" />
              </h3>
              <p className="text-blue-200 text-xs">Powered by Google Gemini</p>
            </div>
          </div>

          {/* BODY CHAT */}
          <div className="flex-1 p-4 overflow-y-auto bg-slate-50 flex flex-col gap-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex items-end gap-2 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                {msg.sender === "ai" && (
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                    <Bot size={16} className="text-blue-600" />
                  </div>
                )}
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.sender === "user" ? "bg-blue-600 text-white rounded-br-none" : "bg-white text-gray-800 border border-gray-100 rounded-bl-none"}`}>
                  {msg.text}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-end gap-2 justify-start">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                  <Bot size={16} className="text-blue-600" />
                </div>
                <div className="bg-white border border-gray-100 p-3 rounded-2xl rounded-bl-none shadow-sm flex items-center gap-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* FOOTER INPUT */}
          <div className="p-4 bg-white border-t border-gray-100">
            <form onSubmit={handleSend} className="flex gap-2 bg-gray-100 p-2 rounded-full items-center border border-transparent focus-within:border-blue-300 focus-within:bg-white transition-all">
              <input type="text" placeholder="Tanya sesuatu..." className="flex-1 text-sm bg-transparent px-2 outline-none text-gray-700 placeholder:text-gray-400" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
              <button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                className={`p-3 rounded-full transition-all flex items-center justify-center ${inputValue.trim() ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
              >
                {isTyping ? <Loader2 size={18} className="animate-spin" /> : <SendHorizonal size={18} className={inputValue.trim() ? "-rotate-45 translate-x-0.5" : ""} />}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* TOMBOL FLOATING: Tetap 'pointer-events-auto' supaya SELALU bisa diklik */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`pointer-events-auto group p-4 md:p-5 rounded-full shadow-2xl transition-all duration-300 flex items-center justify-center relative z-[2001] ${isOpen ? "bg-gray-800 rotate-90" : "bg-blue-600 hover:bg-blue-700 hover:scale-110"}`}
      >
        {isOpen ? <X className="text-white" size={24} /> : <MessageCircle className="text-white" size={28} />}
        {!isOpen && <span className="absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-30 animate-ping -z-10"></span>}
      </button>
    </div>
  );
};

export default ChatAI;
