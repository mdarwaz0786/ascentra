import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import AboutusSection from "./AboutusSection";
import GrowthFrameworkSection from "./GrowthFrameWorkSection";
import HeroSection from "./HeroSection";
import OurAdvantageSection from "./OurAdvantageSection";

const AboutusPage = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <AboutusSection />
      <GrowthFrameworkSection />
      <OurAdvantageSection />
      <Footer />
    </>
  );
};

export default AboutusPage;