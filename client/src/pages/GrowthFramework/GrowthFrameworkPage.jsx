import Footer from "../../components/Footer/Footer";
import Hero from "../../components/Hero/Hero";
import Navbar from "../../components/Navbar/Navbar";
import GrowthFrameworkSection from "./GrowthFrameworkSection";

const GrowthFrameworkPage = () => {
  return (
    <>
      <Navbar />
      <Hero src="/banner/GrowthFramework.png" />
      <GrowthFrameworkSection />
      <Footer />
    </>
  );
};

export default GrowthFrameworkPage;