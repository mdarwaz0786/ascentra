import Footer from "../../components/Footer/Footer";
import Hero from "../../components/Hero/Hero";
import Navbar from "../../components/Navbar/Navbar";
import ServiceCard from "../../components/Service/ServiceCard";
import ServiceHeader from "../../components/Service/ServiceHeader";

const MarketEntryServicePage = () => {

  const servicesData = [
    {
      icon: "/service/icon1.png",
      title: "Feasibility studies and strategic market entry blueprints",
      description: "Feasibility studies and strategic market entry blueprints assess demand potential, regulatory requirements, financial viability, and competitive landscape before expansion. These structured frameworks minimise risk, optimise investment decisions, define clear implementation pathways, and support sustainable, data-driven entry into new domestic and international markets.",
    },
    {
      icon: "/service/icon2.png",
      title: "Entity formation, compliance guidance, and partner identification",
      description: "Entity formation, compliance guidance, and partner identification support seamless market establishment through legal structuring, regulatory approvals, and governance alignment. This process ensures operational readiness, risk mitigation, and strategic collaborations with credible partners, enabling sustainable growth and long-term success in targeted domestic and international markets.",
    },
    {
      icon: "/service/icon3.png",
      title: "Joint venture, representative office, and channel setup",
      description: "Joint venture, representative office, and channel setup enable structured market presence through strategic alliances, local representation, and distribution networks. These models enhance operational control, market penetration, brand visibility, and regulatory alignment while supporting scalable growth and long-term sustainability in new and emerging markets.",
    },
    {
      icon: "/service/icon4.png",
      title: "End-to-end execution including legal structuring and regulator liaison",
      description: "End-to-end execution including legal structuring and regulator liaison ensures seamless project implementation from planning to operational launch. It covers documentation, approvals, compliance management, and direct coordination with authorities, reducing delays, mitigating risks, and enabling smooth, efficient entry into targeted domestic and international markets.",
    },
  ];

  return (
    <>
      <Navbar />
      <Hero src="/banner/MarketEntry.png" />
      <div className="container py-5">
        <ServiceHeader
          title="In-Country Representation & Market Growth"
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

export default MarketEntryServicePage;
