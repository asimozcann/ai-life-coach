import { motion } from "framer-motion";
import Lottie from "lottie-react";

import chatAnim from "../../assets/animations/chat.json";
import styleAnim from "../../assets/animations/style.json";
import motivationAnim from "../../assets/animations/motivation.json";
import fashionAnim from "../../assets/animations/fashion.json";

const features = [
  {
    title: "Dertleş",
    description:
      "Yapay zekâ ile psikolojik destek al, ruh halini analiz ettir.",
    animation: chatAnim,
  },
  {
    title: "Stil Analizi",
    description: "Yüzüne göre saç, sakal ve gözlük önerileri al.",
    animation: styleAnim,
  },
  {
    title: "Motivasyon",
    description: "Günlük ruh haline göre özel motivasyon önerileri.",
    animation: motivationAnim,
  },
  {
    title: "Moda Koçu",
    description: "Tarzına ve hava durumuna göre giyim önerileri.",
    animation: fashionAnim,
  },
];

const Features = () => {
  return (
    <section className="bg-[#1A0028] py-16 px-6 text-white">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
        Yapay Zekâ Destekli Hizmetlerimiz
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {features.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="bg-[#1d002b] p-6 rounded-2xl text-center glow-border hover:scale-105 transition duration-300"
          >
            <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-cyan-500/20 flex items-center justify-center shadow-inner shadow-cyan-500/30 p-2">
              <Lottie animationData={item.animation} loop autoplay />
            </div>
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-sm opacity-80">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Features;
