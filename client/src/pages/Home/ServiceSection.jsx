import service1 from "../../assets/1.png";
import service2 from "../../assets/2.png";
import service3 from "../../assets/3.png";
import service4 from "../../assets/4.png";
import { FaArrowRight, FaGlobe } from "react-icons/fa";
import "./Style/Service.css";

const ServiceSection = () => {
  const services = [
    {
      img: service1,
      title: "Research & Assessment",
      items: [
        "Market research & analysis",
        "Feasibility studies",
        "Competitor benchmarking",
      ],
    },
    {
      img: service2,
      title: "In-Country Representation",
      items: ["Local market presence", "University partnerships", "Student engagement"],
    },
    {
      img: service3,
      title: "Operational Support",
      items: ["Admissions processing", "On-ground coordination", "Compliance & reporting"],
    },

    {
      img: service4,
      title: "Research & Assessment",
      items: [
        "Market research & analysis",
        "Feasibility studies",
        "Competitor benchmarking",
      ],
    },
    {
      img: service2,
      title: "In-Country Representation",
      items: ["Local market presence", "University partnerships", "Student engagement"],
    },
    {
      img: service3,
      title: "Operational Support",
      items: ["Admissions processing", "On-ground coordination", "Compliance & reporting"],
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
