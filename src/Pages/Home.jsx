import Hero from "../components/Home/Hero";
import HowItWorks from "../components/Home/HowItsWork";
import Features from "../components/Home/Features";
import { Fragment, Suspense } from "react";

const HomePage = () => {
  return (
    <Fragment>
      <Suspense fallback={<div>Yükleniyor...</div>}>
        <Hero />
        <Features />
        <HowItWorks />
      </Suspense>
    </Fragment>
  );
};

export default HomePage;
