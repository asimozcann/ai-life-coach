import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";

const animationFiles = ["upload", "ai", "suggestion", "support"];

const HowItWorks = () => {
  const [animations, setAnimations] = useState({});

  useEffect(() => {
    animationFiles.forEach((name) => {
      fetch(`/animations/${name}.json`)
        .then((res) => res.json())
        .then((data) =>
          setAnimations((prev) => ({
            ...prev,
            [name]: data,
          }))
        );
    });
  }, []);

  const steps = [
    {
      title: "1. Veri Gönder",
      description: "Yüz fotoğrafı veya ruh halini belirten verileri gir.",
      animation: animations.upload,
    },
    {
      title: "2. AI Analiz",
      description:
        "Yapay zekâ verilerini analiz eder, karakteristik bilgileri çıkarır.",
      animation: animations.ai,
    },
    {
      title: "3. Öneri Oluştur",
      description:
        "AI, sana özel stil, ruh hali veya motivasyon önerileri sunar.",
      animation: animations.suggestion,
    },
    {
      title: "4. Takip & Destek",
      description: "Gelişimini takip et, düzenli destek ve yeni öneriler al.",
      animation: animations.support,
    },
  ];

  return (
    <section className="bg-[#1f022f] py-20 px-6 text-white">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
        Nasıl Çalışır?
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xl mx-auto">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="bg-[#1d002b] p-6 rounded-2xl glow-border text-center hover:scale-105 transition duration-300"
          >
            <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-cyan-500/20 flex items-center justify-center shadow-inner shadow-cyan-500/30 p-2">
              {step.animation && (
                <Lottie animationData={step.animation} loop autoplay />
              )}
            </div>
            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
            <p className="text-sm opacity-80">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
