import React from "react";

const About = () => {
  return (
    <div className="pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Tentang <span className="text-blue-600">Syzen Hotel</span>
          </h1>
          <p className="text-gray-600 leading-relaxed mb-4">
            Berawal dari keinginan untuk menghadirkan akomodasi berkualitas bagi pelaku UMKM dan wisatawan, Syzen Hotel hadir dengan konsep modern minimalis yang mengutamakan kenyamanan tamu.
          </p>
          <p className="text-gray-600 leading-relaxed">Kami percaya bahwa setiap tamu berhak mendapatkan pengalaman menginap yang hangat seperti di rumah sendiri, namun dengan fasilitas profesional kelas dunia.</p>
          <div className="grid grid-cols-2 gap-6 mt-8">
            <div className="border-l-4 border-blue-600 pl-4">
              <h3 className="text-2xl font-bold text-gray-900">50+</h3>
              <p className="text-gray-500 text-sm">Kamar Tersedia</p>
            </div>
            <div className="border-l-4 border-blue-600 pl-4">
              <h3 className="text-2xl font-bold text-gray-900">10k+</h3>
              <p className="text-gray-500 text-sm">Tamu Puas</p>
            </div>
          </div>
        </div>
        <div className="rounded-3xl overflow-hidden shadow-2xl rotate-2">
          <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1887" alt="Hotel Building" />
        </div>
      </div>
    </div>
  );
};

export default About;
