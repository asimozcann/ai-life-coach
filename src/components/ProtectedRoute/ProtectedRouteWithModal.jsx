import { useUser } from "../../hooks/useUser";
import { useEffect, useState } from "react";
import LoginButton from "../Login/LoginButton";

const ProtectedRouteWithModal = ({ children }) => {
  const { user } = useUser();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!user) {
      setShowModal(true);
    }
  }, [user]);

  if (!user && showModal) {
    return (
      <div className=" fixed inset-0 bg-[#0e0018]  bg-opacity-70 z-50 flex items-center justify-center">
        <div className="absolute inset-0  opacity-10 bg-cover bg-center z-0 pointer-events-none">
          <video
            src="videos/3141208-hd_1920_1080_25fps.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        </div>
        <div
          className="bg-[#1e0030] p-6 rounded-xl text-white w-full max-w-md mx-4 text-center shadow-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-2xl font-bold mb-4 text-red-400">
            Giriş Yapmalısınız
          </h2>
          <p className="mb-6 text-sm opacity-80">
            Bu sayfayı görüntülemek için Google hesabınızla giriş yapmalısınız.
          </p>
          <div className="flex flex-col gap-3 items-center">
            <LoginButton />
            <a href="/" className="text-sm text-cyan-400 hover:underline mt-2">
              Ana Sayfaya Dön
            </a>
          </div>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRouteWithModal;
