import Footer from "../../components/Footer/Footer";
import Hero from "../../components/Hero/Hero";
import Navbar from "../../components/Navbar/Navbar";
import AboutusSection from "./AboutusSection";
import GrowthFrameworkSection from "./GrowthFrameWorkSection";
import OurAdvantageSection from "./OurAdvantageSection";

const AboutusPage = () => {
  return (
    <>
      <Navbar />
      <Hero src="/banner/About.png" />
      <OurAdvantageSection />
      <GrowthFrameworkSection />
      <AboutusSection />
      <Footer />
    </>
  );
};

export default AboutusPage;