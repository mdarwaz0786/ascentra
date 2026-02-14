import { FaArrowRight, FaGlobe } from "react-icons/fa";
import { } from "react-icons/fa";
import "./Style/Service.css";

const ServiceSection = () => {
  const services = [
    {
      img: "/service/service1.png",
      title: "Research, Academic & Innovation Partnerships",
      items: [
        "Advance your institution’s global research and innovation ambitions across borders",
        "Identify and connect with aligned academic, industry and research collaborators",
        "Facilitate strategic partnerships, joint research initiatives and innovation-led engagements",
        "Facilitate strategic partnerships, joint research initiatives and innovation-led engagements",
        "Strengthen global academic visibility through meaningful, outcome-driven collaborations, capacity building",
      ],
    },
    {
      img: "/service/service2.png",
      title: "In-Country Representation & Market Growth",
      items: [
        "Establish and manage your dedicated in-country presence with experienced local teams",
        "Design and execute targeted student recruitment and marketing strategies",
        "Manage admissions processes, compliance, and agent engagement with precision",
        "Build strong school, alumni, corporate and institutional networks",
        "Drive brand visibility and sustained market growth through consistent on-ground engagement",
      ],
    },
    {
      img: "/service/service3.png",
      title: "Events, Outreach & Engagement",
      items: [
        "Conceptualise and deliver high-impact institutional and conferences and networking events",
        "Organise alumni meets, partner roundtables, graduation ceremonies, and leadership visits",
        "Support delivery of summer/winter schools and faculty-led programmes",
        "Facilitate participation in key education fairs, counsellor forums, and industry platforms",
        "Create engagement opportunities that strengthen partnerships and institutional visibility",
      ],
    },
    {
      img: "/service/service4.png",
      title: "Operational & Compliance Support",
      items: [
        "Provide end-to-end operational support for seamless market presence",
        "Guide on regulatory, policy and education-sector compliance requirements",
        "Assist with office setup, staffing support, and local logistics coordination",
        "Manage travel, accommodation, printing, and branded merchandise requirements",
        "Offer ongoing support to ensure efficient, compliant, and scalable operations in-region",
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
