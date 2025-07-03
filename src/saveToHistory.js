import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

export const saveToHistory = async (user, messages) => {
  if (!user || !messages?.length) return;

  const formattedMessages = messages.map((msg) => ({
    role: msg.role,
    content: msg.content,
    createdAt: msg.createdAt || new Date(),
  }));

  await addDoc(collection(db, "userHistories"), {
    uid: user.uid,
    type: "Chat",
    summary: "AI ile sohbet edildi",
    timestamp: serverTimestamp(),
    messages: formattedMessages,
  });
};
