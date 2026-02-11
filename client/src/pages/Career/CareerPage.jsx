import Footer from "../../components/Footer/Footer";
import Hero from "../../components/Hero/Hero";
import Navbar from "../../components/Navbar/Navbar";
import CareerApplySection from "./CareerApplySection";
import WhyWorkWithUsSection from "./WhyWorkWithUsSection";

const CareerPage = () => {

  return (
    <>
      <Navbar />
      <Hero src="/banner/Career.png" />
      <WhyWorkWithUsSection />
      <CareerApplySection />
      <Footer />
    </>
  );
};

export default CareerPage;
