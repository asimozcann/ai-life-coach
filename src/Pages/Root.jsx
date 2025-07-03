import { Fragment } from "react";
import MainNavigation from "../components/MainNavigation";
import { Outlet, useLocation } from "react-router";
import Footer from "../components/Footer/Footer";
import { useUser } from "../hooks/useUser";

const RootLayout = () => {
  const { user } = useUser();
  const location = useLocation();

  const isHomePage = location.pathname === "/";

  const shouldShowFooter = user || isHomePage;
  return (
    <Fragment>
      <MainNavigation />
      <Outlet />
      {shouldShowFooter && <Footer />}
    </Fragment>
  );
};

export default RootLayout;
