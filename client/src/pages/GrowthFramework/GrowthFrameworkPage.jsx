import Footer from "../../components/Footer/Footer";
import Hero from "../../components/Hero/Hero";
import SeoMeta from "../../components/Meta/SeoMeta";
import Navbar from "../../components/Navbar/Navbar";
import GrowthFrameworkSection from "./GrowthFrameworkSection";

const GrowthFrameworkPage = () => {
  return (
    <>
      <SeoMeta pageName="our-growth-framework" />
      <Navbar />
      <Hero src="/banner/GrowthFramework.png" />
      <GrowthFrameworkSection />
      <Footer />
    </>
  );
};

export default GrowthFrameworkPage;