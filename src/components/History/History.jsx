import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  doc,
  setDoc,
  deleteDoc,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useUser } from "../../hooks/useUser";
import { useNavigate } from "react-router-dom";

const History = () => {
  const { user } = useUser();
  const [history, setHistory] = useState([]);
  const [filterType, setFilterType] = useState("Tümü");
  const [timeRange, setTimeRange] = useState("Tümü");
  const [showModal, setShowModal] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [deleteMode, setDeleteMode] = useState(null); // "single" | "all" | null

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "userHistories"),
      where("uid", "==", user.uid),
      orderBy("timestamp", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setHistory(docs);
    });

    return () => unsubscribe();
  }, [user]);

  const filteredHistory = history.filter((item) => {
    const matchType = filterType === "Tümü" || item.type === filterType;

    const matchDate = (() => {
      if (timeRange === "Tümü") return true;
      const now = Timestamp.now().toMillis();
      const itemTime = item.timestamp?.seconds * 1000 || 0;

      if (timeRange === "7 Gün")
        return now - itemTime <= 7 * 24 * 60 * 60 * 1000;
      if (timeRange === "30 Gün")
        return now - itemTime <= 30 * 24 * 60 * 60 * 1000;
      return true;
    })();

    return matchType && matchDate;
  });

  // const handleAddTestData = async () => {
  //   const newRef = doc(collection(db, "userHistories"));
  //   await setDoc(newRef, {
  //     uid: user.uid,
  //     type: "Stil Analizi",
  //     summary: "Yüz şekline göre kısa saç önerildi",
  //     timestamp: serverTimestamp(),
  //   });
  // };

  // Modal açma fonksiyonu - tek öğe için
  const startDeleteSingle = (id) => {
    setSelectedItemId(id);
    setDeleteMode("single");
    setShowModal(true);
  };

  // Modal açma fonksiyonu - tümünü silmek için
  const startDeleteAll = () => {
    setSelectedItemId(null);
    setDeleteMode("all");
    setShowModal(true);
  };

  // Modal onay butonuna basınca gerçek silme işlemi burada
  const confirmDelete = async () => {
    if (deleteMode === "single" && selectedItemId) {
      const docRef = doc(db, "userHistories", selectedItemId);
      await deleteDoc(docRef);
    } else if (deleteMode === "all") {
      for (const item of history) {
        const docRef = doc(db, "userHistories", item.id);
        await deleteDoc(docRef);
      }
    }

    // Modalı kapat, seçimleri temizle
    setShowModal(false);
    setSelectedItemId(null);
    setDeleteMode(null);
  };

  return (
    <div className="relative  min-h-screen bg-gradient-to-b from-[#1e0030] to-[#0e0018] text-white px-6 py-12 mt-14">
      <div className="absolute inset-0 opacity-10 bg-cover bg-center z-0 pointer-events-none">
        <video
          src="/videos/3141208-hd_1920_1080_25fps.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">📁 Geçmiş</h1>
        {/* <button
          onClick={handleAddTestData}
          className="bg-green-600 px-4 py-2 rounded"
        >
          Örnek Veri
        </button> */}
      </div>

      <div className="flex gap-4 mb-6 flex-wrap">
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="bg-gray-800 p-2 rounded"
        >
          <option value="Tümü">Tüm Türler</option>
          <option value="Stil Analizi">Stil Analizi</option>
          <option value="Moda Koçu">Moda Koçu</option>
          <option value="Chat">Chat</option>
        </select>

        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="bg-gray-800 p-2 rounded"
        >
          <option value="Tümü">Tüm Zamanlar</option>
          <option value="7 Gün">Son 7 Gün</option>
          <option value="30 Gün">Son 30 Gün</option>
        </select>

        <button
          onClick={startDeleteAll}
          className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
        >
          Tümünü Sil
        </button>
      </div>

      {filteredHistory.length === 0 ? (
        <p>Filtreye uyan veri yok.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredHistory.map((item) => (
            <div
              key={item.id}
              className="bg-gray-800/60 p-4 rounded-xl border border-gray-700 flex justify-between items-center gap-4"
            >
              <div>
                <h2 className="text-xl text-cyan-400 font-semibold">
                  {item.type}
                </h2>
                <p className="text-sm">{item.summary}</p>
                <p className="text-xs mt-2 text-gray-400">
                  {new Date(item.timestamp?.seconds * 1000).toLocaleString()}
                </p>
                <button
                  onClick={() => navigate(`/history/${item.id}`)}
                  className="mt-2 bg-cyan-600 px-3 py-1 rounded text-sm"
                >
                  Detayları Gör
                </button>
              </div>

              <button
                onClick={() => startDeleteSingle(item.id)}
                className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
              >
                Sil
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Silme Onay Modalı */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-[#1e0030] text-white p-6 rounded-lg max-w-lg mx-4 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="mb-4 text-center text-lg font-semibold">
              {deleteMode === "all"
                ? "Tüm geçmişi silmek istediğine emin misin?"
                : "Bu öğeyi silmek istediğine emin misin?"}
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={confirmDelete}
                className="bg-green-600 px-6 py-2 rounded hover:bg-green-700"
              >
                Evet
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-red-600 px-6 py-2 rounded hover:bg-red-700"
              >
                Hayır
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default History;
