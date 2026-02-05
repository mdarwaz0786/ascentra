import Footer from "../../components/Footer/Footer";
import Hero from "../../components/Hero/Hero";
import Navbar from "../../components/Navbar/Navbar";
import ServiceCard from "../../components/Service/ServiceCard";
import ServiceHeader from "../../components/Service/ServiceHeader";

const MarketPresenceServicePage = () => {

  const servicesData = [
    {
      icon: "/service/icon.png",
      title: "Market Analysis & Research",
      description:
        "Understanding the intricacies of the South Asian education market requires more than surface-level insights. Our in-depth, data-driven research uncovers critical trends, student preferences, and emerging opportunities, providing a comprehensive view of the market’s potential and challenges. By conducting competitive benchmarking, we highlight your institution’s positioning against key players, equipping you with actionable insights to navigate this dynamic region effectively."
    },
    {
      icon: "/service/icon.png",
      title: "Go-To-Market Strategy",
      description:
        "Strategically establish your institution’s presence in South Asia with a bespoke roadmap. We help you navigate the region’s geographic and cultural diversity, pinpoint high-potential markets, and identify ideal partners. This approach positions your university for long-term success and impactful engagement."
    },
    {
      icon: "/service/icon.png",
      title: "Go-To-Market Strategy",
      description:
        "Strategically establish your institution’s presence in South Asia with a bespoke roadmap. We help you navigate the region’s geographic and cultural diversity, pinpoint high-potential markets, and identify ideal partners. This approach positions your university for long-term success and impactful engagement."
    },
  ];

  return (
    <>
      <Navbar />
      <Hero src="/banner/banner.png" />
      <div className="container py-5">
        <ServiceHeader
          title="Market Presence"
          subtitle="India and South Asia's vast and diverse landscape presents immense opportunities for international universities seeking to expand their footprint. We offer tailored research and assessment solutions designed to ensure your institution’s growth is both impactful and long-term."
        />
        <div className="row g-4">
          {servicesData?.map((service, index) => (
            <div className="col-lg-6 col-md-6" key={index}>
              <ServiceCard
                icon={service.icon}
                title={service.title}
                description={service.description}
              />
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MarketPresenceServicePage;
