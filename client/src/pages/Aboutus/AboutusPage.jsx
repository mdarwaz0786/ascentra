import Footer from "../../components/Footer/Footer";
import Hero from "../../components/Hero/Hero";
import SeoMeta from "../../components/Meta/SeoMeta";
import Navbar from "../../components/Navbar/Navbar";
import GrowthFrameworkSection from "./GrowthFrameWorkSection";
import OurAdvantageSection from "./OurAdvantageSection";

const AboutusPage = () => {
  return (
    <>
      <SeoMeta pageName="about-us" />
      <Navbar />
      <Hero src="/banner/About.png" />
      <OurAdvantageSection />
      <GrowthFrameworkSection />
      <Footer />
    </>
  );
};

export default AboutusPage;