import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useUser } from "../../hooks/useUser";
import { format } from "date-fns";
import { tr } from "date-fns/locale";

import {
  orderBy,
  collection,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  query,
  onSnapshot,
  setDoc,
  arrayUnion,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { saveToHistory } from "../../saveToHistory";

const ChatAI = () => {
  const { user } = useUser();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  console.log(BACKEND_URL);
  useEffect(() => {
    if (!user) return;
    const q = query(
      collection(db, "chats", user.uid, "messages"),
      orderBy("createdAt", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedMessages = snapshot.docs.map((doc) => doc.data());

      // createdAt olmayanlar olabilir, onları sona alıp sonra sıralayalım
      const sortedMessages = fetchedMessages.sort((a, b) => {
        if (!a.createdAt) return 1;
        if (!b.createdAt) return -1;
        return a.createdAt.seconds - b.createdAt.seconds;
      });

      setMessages(sortedMessages);
    });

    return () => unsubscribe();
  }, [user]);

  // const speak = (text) => {
  //   const utterance = new SpeechSynthesisUtterance(text);
  //   utterance.lang = "tr-TR";
  //   window.speechSynthesis.speak(utterance);
  // };
  const sendMessage = async () => {
    if (!input.trim() || !user) return;

    const userMsg = {
      role: "user",
      content: input,
      createdAt: new Date(),
    };

    await addDoc(collection(db, "chats", user.uid, "messages"), userMsg);

    setInput("");
    setLoading(true);
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });

    try {
      const aiPrompt = [
        {
          role: "system",
          content:
            "Sen bir destekleyici, empatik bir dijital terapistsin. Kullanıcının duygularını anlayarak nazik ve yapıcı şekilde yanıt ver.",
        },
        ...messages
          .filter((m) => m.role === "user" || m.role === "assistant")
          .map(({ role, content }) => ({ role, content })),
        { role: "user", content: input },
      ];

      const res = await axios.post(
        `${BACKEND_URL}/api/chat`,
        {
          model: "openai/chatgpt-4o-latest",
          messages: aiPrompt,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.data?.choices?.length) {
        throw new Error("API yanıtında choices bulunamadı");
      }

      const aiText = res.data.choices[0].message.content;

      const aiMsg = {
        role: "assistant",
        content: aiText,
        createdAt: new Date(),
      };

      await addDoc(collection(db, "chats", user.uid, "messages"), aiMsg);

      speak(aiText);
    } catch (err) {
      console.error("OpenRouter API Hatası:", err);
    }

    setLoading(false);
  };

  const clearChat = async () => {
    if (!user || messages.length === 0) return;

    // 1. Önceki mesajları geçmişe kaydet
    await saveToHistory(user, messages);

    // 2. Firestore'dan sil
    const messagesRef = collection(db, "chats", user.uid, "messages");
    const querySnapshot = await getDocs(messagesRef);
    const deletePromises = querySnapshot.docs.map((docSnap) =>
      deleteDoc(doc(messagesRef, docSnap.id))
    );
    await Promise.all(deletePromises);

    // 3. Arayüzü temizle
    setMessages([]);
  };
  return (
    <div className=" relative min-h-screen bg-gradient-to-b from-[#1e0030] to-[#0e0018] text-white px-6 py-12 mt-14">
      <div className="absolute inset-0 opacity-10 bg-cover bg-center z-0 pointer-events-none">
        <video
          src="/videos/bg.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      </div>
      <h1 className="text-3xl font-bold text-cyan-400 mb-4">🧠 Dertleş</h1>

      <div className="bg-gray-800/40 p-4 rounded-xl h-[60vh] overflow-y-auto space-y-3 mb-4">
        {messages.map((msg, idx) => {
          const time =
            msg.createdAt?.seconds &&
            format(
              new Date(msg.createdAt.seconds * 1000),
              "d MMMM yyyy • HH:mm",
              { locale: tr }
            );

          return (
            <div
              key={idx}
              ref={scrollRef}
              className={`p-3 rounded-xl max-w-lg transition-all duration-300 ${
                msg.role === "user"
                  ? "bg-cyan-600 ml-auto text-right animate-fade"
                  : "bg-gray-700 mr-auto animate-fade"
              }`}
            >
              <p>{msg.content}</p>
              {time && (
                <p className="text-sm text-gray-400 mt-1">
                  {msg.role === "user" ? "Sen" : "Asistan"} • {time}
                </p>
              )}
            </div>
          );
        })}
        {loading && (
          <p className="text-gray-400 animate-pulse">Yanıt yazılıyor...</p>
        )}
      </div>

      <div className="flex md:flex-row flex-col gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="İçini dök, dertleş..."
          className="flex-1 bg-gray-800 p-3 rounded-lg text-white"
        />
        <div className="flex flex-col md:flex-row gap-4">
          <button
            onClick={sendMessage}
            className="bg-cyan-600 hover:bg-cyan-700 px-5 py-3 rounded-lg"
            disabled={loading}
          >
            Gönder
          </button>
          <button
            onClick={clearChat}
            className="bg-green-600 hover:bg-green-700 px-5 py-3 rounded-lg "
            disabled={loading}
          >
            Yeni Sohbet Başlat
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatAI;
