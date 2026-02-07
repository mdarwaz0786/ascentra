import Footer from "../../components/Footer/Footer";
import Hero from "../../components/Hero/Hero";
import Navbar from "../../components/Navbar/Navbar";
import CurrentOpeningSection from "./OurOpeningSection";
import OurValuesSection from "./OurValuesSection";
import WhyWorkWithUsSection from "./WhyWorkWithUsSection";

const CareerPage = () => {

  return (
    <>
      <Navbar />
      <Hero src="/banner/banner.png" />
      <WhyWorkWithUsSection />
      <OurValuesSection />
      <CurrentOpeningSection />
      <Footer />
    </>
  );
};

export default CareerPage;
