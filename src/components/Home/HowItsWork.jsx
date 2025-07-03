import { motion } from "framer-motion";
import Lottie from "lottie-react";

// Animasyonlar
import uploadAnim from "../../assets/animations/upload.json";
import aiAnim from "../../assets/animations/ai.json";
import suggestionAnim from "../../assets/animations/suggestion.json";
import supportAnim from "../../assets/animations/support.json";

const steps = [
  {
    title: "1. Veri Gönder",
    description: "Yüz fotoğrafı veya ruh halini belirten verileri gir.",
    animation: uploadAnim,
  },
  {
    title: "2. AI Analiz",
    description:
      "Yapay zekâ verilerini analiz eder, karakteristik bilgileri çıkarır.",
    animation: aiAnim,
  },
  {
    title: "3. Öneri Oluştur",
    description:
      "AI, sana özel stil, ruh hali veya motivasyon önerileri sunar.",
    animation: suggestionAnim,
  },
  {
    title: "4. Takip & Destek",
    description: "Gelişimini takip et, düzenli destek ve yeni öneriler al.",
    animation: supportAnim,
  },
];

const HowItWorks = () => {
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
              <Lottie animationData={step.animation} loop autoplay />
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
