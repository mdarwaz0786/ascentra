import Footer from "../../components/Footer/Footer";
import Hero from "../../components/Hero/Hero";
import Navbar from "../../components/Navbar/Navbar";
import ServiceCard from "../../components/Service/ServiceCard";
import ServiceHeader from "../../components/Service/ServiceHeader";

const MarketPresenceServicePage = () => {

  const servicesData = [
    {
      icon: "/service/icon1.png",
      title: "Dedicated local representation led by senior directors",
      description: "Dedicated local representation led by senior directors ensures strong on-ground leadership, strategic oversight, and relationship management. Senior-level engagement enhances credibility with regulators, partners, and stakeholders while enabling informed decision-making, faster issue resolution, and sustained growth within priority regional and international markets.",
    },
    {
      icon: "/service/icon2.png",
      title: "Student recruitment and admissions support",
      description: "Student recruitment and admissions support provide end-to-end assistance in outreach, application management, screening, and enrolment processes. Strategic campaigns, agent coordination, and data-driven targeting enhance lead conversion, improve student quality, streamline admissions workflows, and strengthen institutional presence across priority domestic and international markets.",
    },
    {
      icon: "/service/icon3.png",
      title: "Institutional partnerships, alumni engagement, PR, and events",
      description: "Institutional partnerships, alumni engagement, PR, and events strengthen brand visibility and long-term relationships. Strategic collaborations, active alumni networks, targeted media outreach, and curated events enhance reputation, foster stakeholder trust, expand market reach, and create sustainable opportunities for institutional growth and global engagement.",
    },
    {
      icon: "/service/icon4.png",
      title: "Ongoing marketing, agent management, and brand building",
      description: "Ongoing marketing, agent management, and brand building ensure sustained visibility and consistent lead generation across target markets. Structured agent networks, performance monitoring, and integrated campaigns strengthen positioning, enhance engagement, and drive measurable growth while maintaining brand integrity and long-term institutional credibility.",
    },
  ];

  return (
    <>
      <Navbar />
      <Hero src="/banner/sb3.png" />
      <div className="container py-5">
        <ServiceHeader
          title="Events, Outreach & Engagement"
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
