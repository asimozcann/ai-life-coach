import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./Pages/Home";
import RootLayout from "./Pages/Root";
import ChatPage from "./Pages/Chat";
import FashionPage from "./Pages/Fashion";
import AnalysePage from "./Pages/Analyse";
import Loader from "./components/UI/Loader";
import { useEffect, useState } from "react";
import HistoryDetailPage from "./Pages/HistoryDetail";
import HistoryPage from "./Pages/History";
import ProtectedRouteWithModal from "./components/ProtectedRoute/ProtectedRouteWithModal";

function App() {
  return (
    <BrowserRouter>
      <PageTransitionWrapper />
    </BrowserRouter>
  );
}

function PageTransitionWrapper() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 800); // Sayfa geçişi yükleme süresi
    return () => clearTimeout(timeout);
  }, [location.pathname]);

  if (loading) return <Loader />;

  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route
          path="chat"
          element={
            <ProtectedRouteWithModal>
              <ChatPage />
            </ProtectedRouteWithModal>
          }
        />
        <Route
          path="fashioncoach"
          element={
            <ProtectedRouteWithModal>
              <FashionPage />
            </ProtectedRouteWithModal>
          }
        />
        <Route
          path="analyse"
          element={
            <ProtectedRouteWithModal>
              <AnalysePage />
            </ProtectedRouteWithModal>
          }
        />
        <Route
          path="history"
          element={
            <ProtectedRouteWithModal>
              <HistoryPage />
            </ProtectedRouteWithModal>
          }
        />
        <Route
          path="history/:id"
          element={
            <ProtectedRouteWithModal>
              <HistoryDetailPage />
            </ProtectedRouteWithModal>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
