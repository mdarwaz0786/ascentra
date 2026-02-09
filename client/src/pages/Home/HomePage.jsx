import Footer from "../../components/Footer/Footer";
import Hero from "../../components/Hero/Hero";
import Navbar from "../../components/Navbar/Navbar";
import AboutSection from "./AboutSection";
import GrowthFrameworkSection from "./GrowthFrameworkSection";
import OurAdvantageSection from "./OurAdvantageSection";
import OurValuesSection from "./OurValuesSection";
import ServiceSection from "./ServiceSection";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <Hero src="/banner/banner.png" />
      <AboutSection />
      <ServiceSection />
      <GrowthFrameworkSection />
      <OurValuesSection />
      <OurAdvantageSection />
      <Footer />
    </>
  );
};

export default HomePage;