import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import LogoutButton from "./Login/LogoutButton";
import LoginButton from "./Login/LoginButton";
import { Menu, X } from "lucide-react";
const LiteLottie = React.lazy(() => import("./LottieLite/LiteLottie"));
const MainNavigation = () => {
  const { user } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoAnimation, setLogoAnimation] = useState(null);

  useEffect(() => {
    fetch("/animations/logo.json")
      .then((res) => res.json())
      .then(setLogoAnimation);
  }, []);

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex fixed w-full top-0 left-0 h-[72px] items-center justify-between shadow-lg z-50">
      <Link
        to="/"
        className="flex items-center gap-2 font-bold text-cyan-400 text-xl"
      >
        <div className="w-10 h-10">
          {logoAnimation && (
            <LiteLottie
              alt="Ana Sayfa"
              animationData={logoAnimation}
              loop
              autoplay
            />
          )}
        </div>
        <h1 className="hidden md:block">Yaşam Koçum</h1>
      </Link>

      {/* Normal Menü (Sadece büyük ekranlar için) */}
      <ul className="lg:flex hidden gap-8 text-lg">
        <li>
          <Link to="/" className="hover:text-cyan-400">
            Ana Sayfa
          </Link>
        </li>
        <li>
          <Link to="/chat" className="hover:text-cyan-400">
            Dertleş
          </Link>
        </li>
        <li>
          <Link to="/analyse" className="hover:text-cyan-400">
            Stil Analizi
          </Link>
        </li>
        <li>
          <Link to="/fashioncoach" className="hover:text-cyan-400">
            Moda Koçu
          </Link>
        </li>
        <li>
          <Link to="/history" className="hover:text-cyan-400">
            Geçmiş
          </Link>
        </li>
      </ul>

      {/* Sağ üst köşe: Profil + Menü butonu */}
      <div className="lg:flex hidden items-center gap-3">
        {user ? (
          <>
            <div className="hidden lg:flex items-center gap-2">
              <img
                src={user.photo}
                alt="profil"
                className="w-8 h-8 rounded-full border border-cyan-400"
              />
              <span className="text-sm lg:block hidden">{user.name}</span>
            </div>
            <LogoutButton />
          </>
        ) : (
          <LoginButton />
        )}
      </div>

      {/* Hamburger butonu */}
      <button className="lg:hidden" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobil Menü */}
      {menuOpen && (
        <div className="lg:hidden absolute top-[72px] left-0 w-full bg-gray-900 text-white px-6 py-2 flex flex-col gap-2 shadow-md z-40">
          <div className="flex flex-col items-center gap-3">
            <Link
              className="hover:text-cyan-400"
              to="/"
              onClick={() => setMenuOpen(false)}
            >
              Ana Sayfa
            </Link>
            <Link
              className="hover:text-cyan-400"
              to="/chat"
              onClick={() => setMenuOpen(false)}
            >
              Dertleş
            </Link>
            <Link
              className="hover:text-cyan-400"
              to="/analyse"
              onClick={() => setMenuOpen(false)}
            >
              Stil Analizi
            </Link>
            <Link
              className="hover:text-cyan-400"
              to="/fashioncoach"
              onClick={() => setMenuOpen(false)}
            >
              Moda Koçu
            </Link>
            <Link
              className="hover:text-cyan-400"
              to="/history"
              onClick={() => setMenuOpen(false)}
            >
              Geçmiş
            </Link>
          </div>

          {user ? (
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-2">
                <img
                  src={user.photo}
                  alt="profil"
                  className="w-8 h-8 rounded-full border border-cyan-400"
                />
                <span className="text-sm">{user.name}</span>
              </div>
              <LogoutButton />
            </div>
          ) : (
            <LoginButton />
          )}
        </div>
      )}
    </nav>
  );
};

export default MainNavigation;
