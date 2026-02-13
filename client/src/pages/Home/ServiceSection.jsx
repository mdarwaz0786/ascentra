import { FaArrowRight, FaGlobe } from "react-icons/fa";
import { } from "react-icons/fa";
import "./Style/Service.css";

const ServiceSection = () => {
  const services = [
    {
      img: "/service/NewMarketDevelopment.png",
      title: "Market Development",
      items: [
        "Market research and policy mapping aligned to institutional strengths",
        "Qualitative and quantitative insights, stakeholder consultations",
        "Market positioning and regional prioritisation",
        "Engagement with regulators, academic leaders, agents, corporates, and community bodies",
      ],
    },
    {
      img: "/service/NewMarketEntry.png",
      title: "Market Entry",
      items: [
        "Feasibility studies and strategic market entry blueprints",
        "Entity formation, compliance guidance, and partner identification",
        "Joint venture, representative office, and channel setup",
        "End-to-end execution including legal structuring and regulator liaison",
      ],
    },
    {
      img: "/service/NewMarketPresence.png",
      title: "Market Presence",
      items: [
        "Dedicated local representation led by senior directors",
        "Student recruitment and admissions support",
        "Institutional partnerships, alumni engagement, PR, and events",
        "Ongoing marketing, agent management, and brand building",
      ],
    },
    {
      img: "/service/NewMarketExpansion.png",
      title: "Market Expansion",
      items: [
        "Performance optimisation and ROI enhancement",
        "Introduction of new programmes and delivery models",
        "Multi-city expansion, digital learning, and partnership scaling",
        "Support for mergers, acquisitions, and joint ventures",
      ],
    },
  ];

  return (
    <div className="py-5" style={{ background: "#f5f5f5" }}>
      <div className="container">
        <h4 className="text-center fw-semibold mb-4">SERVICES</h4>
        <div className="row g-4">
          {services.map((service, index) => (
            <div className="col-lg-6 col-md-6" key={index}>
              <div className="service-card">
                <div className="service-card-inner">
                  {/* FRONT SIDE */}
                  <div className="service-card-front">
                    <img src={service.img} alt={service.title} />
                    <div className="service-footer">
                      <span>{service.title}</span>
                      <div className="service-icon">
                        <FaArrowRight />
                      </div>
                    </div>
                  </div>

                  {/* BACK SIDE */}
                  <div className="service-card-back">
                    <h5>{service.title}</h5>
                    <ul className="custom-list">
                      {service.items.map((item, i) => (
                        <li key={i}>
                          <FaGlobe className="list-icon" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceSection;
