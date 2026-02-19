import Footer from "../../components/Footer/Footer";
import Hero from "../../components/Hero/Hero";
import Navbar from "../../components/Navbar/Navbar";
import GrowthFrameworkSection from "./GrowthFrameWorkSection";
import OurAdvantageSection from "./OurAdvantageSection";

const AboutusPage = () => {
  return (
    <>
      <Navbar />
      <Hero src="/banner/About.png" />
      <OurAdvantageSection />
      <GrowthFrameworkSection />
      <Footer />
    </>
  );
};

export default AboutusPage;