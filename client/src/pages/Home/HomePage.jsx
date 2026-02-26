import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import AboutSection from "./AboutSection";
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
      <OurAdvantageSection />
      <OurValuesSection />
      <Footer />
    </>
  );
};

export default HomePage;