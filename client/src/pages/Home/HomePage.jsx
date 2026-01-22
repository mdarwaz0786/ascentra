import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import AboutSection from "./AboutSection";
import Hero from "./HeroSection";
import ServiceSection from "./ServiceSection";
// import WhyChoose from "./WhyChoose";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <AboutSection />
      <ServiceSection />
      {/* <WhyChoose /> */}
      <Footer />
    </>
  );
};

export default HomePage;