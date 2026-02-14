import Footer from "../../components/Footer/Footer";
import Hero from "../../components/Hero/Hero";
import Navbar from "../../components/Navbar/Navbar";
import ServiceCard from "../../components/Service/ServiceCard";
import ServiceHeader from "../../components/Service/ServiceHeader";

const MarketDevelopmentServicePage = () => {

  const servicesData = [
    {
      icon: "/service/icon1.png",
      title: "Market research and policy mapping aligned to institutional strengths",
      description: "Market research and policy mapping aligned to institutional strengths focuses on identifying emerging trends, regulatory frameworks, and sector demands while evaluating core capabilities. It helps institutions design targeted strategies, optimize resources, ensure compliance, and enhance competitive positioning in both domestic and international markets."
    },
    {
      icon: "/service/icon2.png",
      title: "Qualitative and quantitative insights, stakeholder consultations",
      description: "Qualitative and quantitative insights, stakeholder consultations involve collecting data through surveys, interviews, and analytics to understand trends, expectations, and performance gaps. Engaging key stakeholders ensures informed decision-making, strengthens collaboration, enhances transparency, and supports the development of sustainable, evidence-based institutional strategies.",
    },
    {
      icon: "/service/icon3.png",
      title: "Market positioning and regional prioritisation",
      description: "Market positioning and regional prioritisation focus on identifying competitive advantages, target segments, and high-potential geographies. By analysing demand patterns, economic indicators, and institutional strengths, organisations can allocate resources strategically, enhance brand visibility, and maximise growth opportunities in priority regional and global markets.",
    },
    {
      icon: "/service/icon4.png",
      title: "Engagement with regulators, academic leaders, agents, corporates, and community bodies",
      description: "Engagement with regulators, academic leaders, agents, corporates, and community bodies ensures strong partnerships, policy alignment, and collaborative growth. Strategic communication builds trust, supports compliance, enhances reputation, and creates opportunities for academic expansion, industry integration, and sustainable community impact across diverse regional markets.",
    }
  ];

  return (
    <>
      <Navbar />
      <Hero src="/banner/sb1.png" />
      <div className="container py-5">
        <ServiceHeader
          title="Research, Academic & Innovation Partnerships"
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

export default MarketDevelopmentServicePage;
