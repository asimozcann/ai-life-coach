import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  return (
    <section className="relative h-screen flex flex-col justify-center items-center text-center bg-gradient-to-br from-[#1e0030] to-[#0e0018] text-white px-4 mt-14">
      <div className="absolute inset-0  opacity-10 bg-cover bg-center z-0">
        <video
         src="/videos/6153453-hd_2048_1080_25fps.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      </div>

      <h1 className="text-4xl md:text-6xl font-bold z-10 drop-shadow-xl">
        Dijital Koçunla Hayatını Dönüştür
      </h1>
      <p className="text-lg md:text-xl mt-4 max-w-2xl z-10">
        Yapay zekâ destekli yaşam koçunla alışkanlıklarını geliştir, stilini
        keşfet, motivasyonunu artır.
      </p>
      <div className="mt-6 flex md:flex-row flex-col gap-4  z-10">
        <button
          onClick={() => navigate("/chat")}
          className="bg-cyan-400 hover:bg-cyan-300 text-black px-6 py-2 rounded-xl shadow-lg transition"
        >
          Hemen Başla
        </button>
        <button
          onClick={() => setShowModal(true)}
          className="border border-white px-6 py-2 rounded-xl hover:bg-white hover:text-black transition"
        >
          Daha Fazla Öğren
        </button>
      </div>

      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-[#1e0030] text-white p-6 rounded-lg max-w-lg mx-4 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-bold mb-4">
              Dijital Koçunuz Hakkında
            </h3>
            <p className="mb-4">
              Yapay zekâ destekli yaşam koçunuz, alışkanlıklarınızı takip eder,
              kişisel stilinize göre önerilerde bulunur ve motivasyonunuzu
              artırmak için size özel tavsiyeler sunar.
            </p>
            <p>
              Sadece birkaç dakika ayırarak hayatınızda pozitif değişiklikler
              başlatabilirsiniz.
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="mt-6 bg-cyan-600 px-4 py-2 rounded hover:bg-cyan-700"
            >
              Kapat
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
