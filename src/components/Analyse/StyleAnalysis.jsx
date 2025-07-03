import { useState } from "react";
import { analyzeStyle } from "../../openai";
import { useUser } from "../../hooks/useUser";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";

const StyleAnalysis = () => {
  const { user } = useUser();
  const [image, setImage] = useState(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result.split(",")[1]; // base64 kısmını al
      setImage(base64);
      setResult(""); // önceki sonucu temizle
    };
    reader.readAsDataURL(file);
  };

  const handleAnalyze = async () => {
    if (!image) return;
    setLoading(true);
    try {
      const response = await analyzeStyle(image);
      setResult(response);
      await saveAnalysisToHistory(response); // Buraya response parametresi eklendi
    } catch (error) {
      setResult("Analiz sırasında bir hata oluştu: " + error.message);
    }
    setLoading(false);
  };

  const saveAnalysisToHistory = async (analysisResult) => {
    if (!user || !analysisResult) return;

    try {
      await addDoc(collection(db, "userHistories"), {
        uid: user.uid,
        type: "Stil Analizi",
        summary:
          analysisResult.length > 100
            ? analysisResult.slice(0, 97) + "..."
            : analysisResult,
        fullText: analysisResult,
        timestamp: serverTimestamp(),
      });
    } catch (error) {
      console.error("Geçmiş kaydetme hatası:", error);
    }
  };

  // Yeni analiz başlat butonundaki kayıt işlemini kaldırdık
  const handleNewAnalysis = () => {
    setImage(null);
    setResult("");
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#1e0030] to-[#0e0018] text-white px-6 py-12 mt-14">
      <div className="absolute inset-0  opacity-10 bg-cover bg-center z-0 pointer-events-none">
        <video
          src="/videos/3141208-hd_1920_1080_25fps.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      </div>
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
        Stil Analizi
      </h2>

      <p className="text-center text-gray-400 mb-12 max-w-xl mx-auto">
        Yüz fotoğrafını yükle, yapay zekâ senin için en uygun saç, sakal, gözlük
        ve tarz önerilerini analiz etsin!
      </p>

      <div className="flex flex-col items-center gap-6">
        <label className="cursor-pointer bg-[#2f003d] border border-cyan-400 p-6 rounded-xl text-center hover:shadow-cyan-500/30 shadow-md transition">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            hidden
          />
          📸 Yüz Fotoğrafı Yükle
        </label>

        <button
          onClick={handleAnalyze}
          className="bg-cyan-600 text-white px-4 py-2 rounded hover:bg-cyan-700 disabled:opacity-50"
          disabled={!image || loading}
        >
          {loading ? "Analiz Ediliyor..." : "Stil Önerisi Al"}
        </button>

        {result && (
          <>
            <pre
              className="whitespace-pre-wrap bg-[#1d002b] p-6 rounded-xl max-w-4xl w-full mt-10 glow-border"
              style={{ whiteSpace: "pre-wrap" }}
            >
              {result}
            </pre>

            <button
              onClick={handleNewAnalysis}
              className="mt-6 bg-green-600 px-6 py-3 rounded hover:bg-green-700"
            >
              Yeni Analiz Başlat
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default StyleAnalysis;
