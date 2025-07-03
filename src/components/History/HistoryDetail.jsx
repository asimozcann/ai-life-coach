import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

const HistoryDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      const ref = doc(db, "userHistories", id);
      const snapshot = await getDoc(ref);
      if (snapshot.exists()) {
        setData(snapshot.data());
      }
    };

    fetchHistory();
  }, [id]);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#1e0030] to-[#0e0018] text-white p-6 mt-16">
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

      {data && (
        <>
          <h1 className="text-2xl font-bold mb-4 text-cyan-400">
            {data.type} Detayı
          </h1>

          <p className="mb-4 text-gray-400 italic">{data.summary}</p>

          {data.fullText && (
            <div className="bg-[#1d002b] p-6 rounded-xl whitespace-pre-wrap text-gray-100">
              {data.fullText}
            </div>
          )}

          {data.messages?.length > 0 && (
            <div className="space-y-3 mt-6">
              {data.messages.map((msg, index) => (
                <div
                  key={index}
                  className={`p-4 rounded ${
                    msg.role === "user"
                      ? "bg-cyan-700 text-right"
                      : "bg-gray-800 text-left"
                  }`}
                >
                  <p>{msg.content}</p>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default HistoryDetail;
