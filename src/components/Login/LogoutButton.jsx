// LogoutButton.jsx
import { useUser } from "../../hooks/useUser";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";

const LogoutButton = () => {
  const { setUser } = useUser();

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <button
      onClick={handleLogout}
      className="hover:text-cyan-400  "
    >
      Çıkış Yap
    </button>
  );
};

export default LogoutButton;
