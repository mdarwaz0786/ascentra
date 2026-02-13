import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import AboutSection from "./AboutSection";
import GrowthFrameworkSection from "./GrowthFrameworkSection";
import OurAdvantageSection from "./OurAdvantageSection";
import OurValuesSection from "./OurValuesSection";
import ServiceSection from "./ServiceSection";
import SliderSection from "./SliderSection";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <SliderSection />
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