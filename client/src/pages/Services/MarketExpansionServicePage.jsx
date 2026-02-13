import Footer from "../../components/Footer/Footer";
import Hero from "../../components/Hero/Hero";
import Navbar from "../../components/Navbar/Navbar";
import ServiceCard from "../../components/Service/ServiceCard";
import ServiceHeader from "../../components/Service/ServiceHeader";

const MarketExpansionServicePage = () => {

  const servicesData = [
    {
      icon: "/service/icon1.png",
      title: "Performance optimisation and ROI enhancement",
      description: "Performance optimisation and ROI enhancement focus on analysing outcomes, refining strategies, and improving operational efficiency to maximise returns. Through data-driven evaluation, cost management, and continuous improvement frameworks, organisations can strengthen impact, increase revenue potential, and ensure sustainable, measurable growth across priority markets.",
    },
    {
      icon: "/service/icon2.png",
      title: "Introduction of new programmes and delivery models",
      description: "Introduction of new programmes and delivery models supports innovation through curriculum diversification and flexible learning formats. By aligning offerings with market demand, industry trends, and learner expectations, institutions can expand reach, enhance competitiveness, and create scalable, future-ready education pathways across domestic and international markets.",
    },
    {
      icon: "/service/icon3.png",
      title: "Multi-city expansion, digital learning, and partnership scaling",
      description: "Multi-city expansion, digital learning, and partnership scaling enable broader market penetration through diversified locations, technology-driven delivery, and strengthened collaborative networks. By leveraging scalable infrastructure and strategic alliances, institutions can enhance accessibility, increase enrolment potential, and achieve sustainable growth across regional and international markets.",
    },
    {
      icon: "/service/icon4.png",
      title: "Support for mergers, acquisitions, and joint ventures",
      description: "Support for mergers, acquisitions, and joint ventures provides strategic advisory across due diligence, valuation, negotiation, and integration planning. This structured approach minimises risk, safeguards stakeholder interests, and unlocks synergies, enabling organisations to accelerate growth, expand capabilities, and strengthen competitive positioning in evolving markets.",
    },
  ];

  return (
    <>
      <Navbar />
      <Hero src="/banner/MarketExpansion.png" />
      <div className="container py-5">
        <ServiceHeader
          title="Operational & Compliance Support"
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

export default MarketExpansionServicePage;
