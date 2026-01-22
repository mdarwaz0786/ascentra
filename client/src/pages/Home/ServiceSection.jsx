import service1 from "../../assets/1.png";
import service2 from "../../assets/2.png";
import service3 from "../../assets/3.png";
import { FaArrowRight, FaGlobe } from "react-icons/fa";
import "./Style/Service.css";

const ServiceSection = () => {
  const services = [
    {
      img: service1,
      title: "Market Development",
      items: [
        "Market research and policy mapping aligned to institutional strengths",
        "Qualitative and quantitative insights, stakeholder consultations",
        "Market positioning and regional prioritisation",
        "Engagement with regulators, academic leaders, agents, corporates, and community bodies",
      ],
    },
    {
      img: service2,
      title: "Market Entry",
      items: [
        "Feasibility studies and strategic market entry blueprints",
        "Entity formation, compliance guidance, and partner identification",
        "Joint venture, representative office, and channel setup",
        "End-to-end execution including legal structuring and regulator liaison",
      ],
    },
    {
      img: service3,
      title: "Market Presence",
      items: [
        "Dedicated local representation led by senior directors",
        "Student recruitment and admissions support",
        "Institutional partnerships, alumni engagement, PR, and events",
        "Ongoing marketing, agent management, and brand building",
      ],
    },
  ];

  return (
    <section className="py-5" style={{ background: "#f5f5f5" }}>
      <div className="container">
        <h1 className="text-center fw-bold mb-5">Services</h1>
        <div className="row g-4">
          {services.map((service, index) => (
            <div className="col-lg-4 col-md-6" key={index}>
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
                    <h4>{service.title}</h4>
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
    </section>
  );
};

export default ServiceSection;
