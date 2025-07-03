import { auth, provider } from "../../firebase";
import { signInWithPopup } from "firebase/auth";
import { useUser } from "../../hooks/useUser";

const LoginButton = () => {
  const { setUser } = useUser();

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setUser({
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
        uid: user.uid,
      });
      localStorage.setItem("user", JSON.stringify(user)); // 🧠 Oturumu kaydet
    } catch (err) {
      console.error("Giriş hatası:", err);
    }
  };

  return (
    <button
      onClick={handleLogin}
      className="bg-white p-2 rounded-2xl glow-border text-center hover:scale-105 transition duration-300  flex items-center justify-center"
    >
      <img className="w-6 h-6" src="/images/google.png" alt="" />
    </button>
  );
};

export default LoginButton;
