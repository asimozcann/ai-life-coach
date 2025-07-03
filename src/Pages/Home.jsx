import Hero from "../components/Home/Hero";
import HowItWorks from "../components/Home/HowItsWork";
import Features from "../components/Home/Features";

const HomePage = () => {
  return (
    <div className="relative">
      <Hero />
      <Features />
      <HowItWorks />
    </div>
  );
};

export default HomePage;
