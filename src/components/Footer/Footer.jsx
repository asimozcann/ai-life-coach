import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#0e0018] text-gray-400 py-10 px-6 pt-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
        
        {/* Sol - Açıklama */}
        <div className="md:w-1/3 text-center md:text-left">
          <h2 className="text-xl font-bold text-cyan-400 mb-2">Dijital Yaşam Koçu</h2>
          <p className="text-sm">
            Yapay zekâ destekli yaşam asistanınız. Ruh halinizi analiz eder, stil önerileri sunar ve motivasyonunuzu destekler.
          </p>
        </div>

        {/* Orta - Linkler */}
        <div className="md:w-1/3 flex flex-col items-center text-center">
          <h3 className="text-lg font-semibold mb-2 text-white">Hızlı Erişim</h3>
          <ul className="space-y-1 text-sm">
            <li><Link to="/" className="hover:text-cyan-400">Ana Sayfa</Link></li>
            <li><Link to="/chat" className="hover:text-cyan-400">Dertleş</Link></li>
            <li><Link to="/analyse" className="hover:text-cyan-400">Stil Analizi</Link></li>
            <li><Link to="/fashioncoach" className="hover:text-cyan-400">Moda Koçu</Link></li>
            <li><Link to="/history" className="hover:text-cyan-400">Geçmiş</Link></li>
          </ul>
        </div>

        {/* Sağ - İletişim / Sosyal */}
        <div className="md:w-1/3 text-center md:text-right">
          <h3 className="text-lg font-semibold mb-2 text-white">İletişim</h3>
          <p className="text-sm">destek@yasamkocunuz.com</p>
          <div className="flex justify-center md:justify-end gap-4 mt-4">
            <a href="#" className="hover:text-cyan-400">Twitter</a>
            <a href="#" className="hover:text-cyan-400">Instagram</a>
            <a href="#" className="hover:text-cyan-400">LinkedIn</a>
          </div>
        </div>
      </div>

      {/* Alt Bilgi */}
      <div className="text-center mt-10 text-xs text-gray-600">
        © {new Date().getFullYear()} Dijital Yaşam Koçu. Tüm hakları saklıdır.
      </div>
    </footer>
  );
};

export default Footer;
