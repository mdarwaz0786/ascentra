import Footer from "../../components/Footer/Footer";
import SeoMeta from "../../components/Meta/SeoMeta";
import Navbar from "../../components/Navbar/Navbar";
import AboutSection from "./AboutSection";
import OurAdvantageSection from "./OurAdvantageSection";
import OurValuesSection from "./OurValuesSection";
import ServiceSection from "./ServiceSection";
import SliderSection from "./SliderSection";

const HomePage = () => {
  return (
    <>
      <SeoMeta pageName="home" />
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