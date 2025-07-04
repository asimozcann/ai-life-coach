import { useState } from "react";
import { generateFashionSuggestions } from "../../fashionCoach";
import SelectBox from "./SelectBox";
import { doc, setDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase"; // Firebase config dosyanın yolu
import { useUser } from "../../hooks/useUser"; // Kullanıcı bilgisini almak için
const FashionCoach = () => {
  const [form, setForm] = useState({
    gender: "",
    bodyType: "",
    colorStyle: "",
    style: "",
    season: "",
  });
  const { user } = useUser();
  const [aiResult, setAiResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSelect = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleGenerate = async () => {
    setLoading(true);
    setAiResult(null);

    try {
      const result = await generateFashionSuggestions(form);
      setAiResult(result);

      // Eğer kullanıcı giriş yapmışsa, sonucu Firestore'a kaydet
      if (user) {
        const newDocRef = doc(collection(db, "userHistories"));
        await setDoc(newDocRef, {
          uid: user.uid,
          type: "Moda Koçu",
          summary: result.slice(0, 100), // Özet olarak ilk 100 karakter
          fullText: result, // Tüm öneriyi de istersen kaydet
          form, // Kullanıcının seçimleri (bodyType, gender vs)
          timestamp: serverTimestamp(),
        });
      }
    } catch (err) {
      setAiResult("❌ Öneriler alınamadı: " + err.message);
    }

    setLoading(false);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#1e0030] to-[#0e0018] text-white px-6 py-12 mt-14">
      <div className="absolute inset-0  opacity-10 bg-cover bg-center z-0 pointer-events-none">
        <video
          src="/videos/bg.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      </div>
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
        Moda Koçunla Tanış
      </h2>
      <p className="text-center text-gray-400 mb-10 max-w-xl mx-auto">
        Stilini oluşturmak için birkaç basit tercihte bulun. Moda koçumuz sana
        özel öneriler sunsun.
      </p>

      {/* Seçim Alanları */}
      <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-10 max-w-5xl mx-auto">
        <SelectBox
          label="Cinsiyet"
          options={["Erkek", "Kadın", "Diğer"]}
          selected={form.gender}
          onSelect={(val) => handleSelect("gender", val)}
        />
        <SelectBox
          label="Vücut Tipi"
          options={["Atletik", "Kum Saati", "Dikdörtgen", "Armut"]}
          selected={form.bodyType}
          onSelect={(val) => handleSelect("bodyType", val)}
        />
        <SelectBox
          label="Renk Stili"
          options={["Soft", "Canlı", "Nötr", "Koyu"]}
          selected={form.colorStyle}
          onSelect={(val) => handleSelect("colorStyle", val)}
        />
        <SelectBox
          label="Stil"
          options={["Casual", "Spor", "Resmi", "Sokak Modası"]}
          selected={form.style}
          onSelect={(val) => handleSelect("style", val)}
        />
        <SelectBox
          label="Mevsim"
          options={["İlkbahar", "Yaz", "Sonbahar", "Kış"]}
          selected={form.season}
          onSelect={(val) => handleSelect("season", val)}
        />
      </div>

      <div className="text-center">
        <button
          onClick={handleGenerate}
          className="bg-cyan-500 hover:bg-cyan-400 text-black px-5 md:px-6 py-3 rounded-full text-lg font-semibold shadow-lg transition"
          disabled={loading}
        >
          {loading ? "Hazırlanıyor..." : "Moda Önerilerini Göster"}
        </button>
      </div>

      {/* AI'den Gelen Öneriler */}
      {aiResult && (
        <div className="bg-[#1d002b] mt-12 p-6 rounded-xl max-w-4xl mx-auto whitespace-pre-wrap glow-border">
          {aiResult}
        </div>
      )}
    </div>
  );
};

export default FashionCoach;
