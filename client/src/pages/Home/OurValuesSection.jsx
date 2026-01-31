import "./Style/Values.css";

const OurValuesSection = () => {
  const values = [
    {
      icon: "/values/clientfirst.png",
      title: "Client-First Partnership",
      description: "We succeed when our clients succeed. We work as trusted partners, deeply understanding each client’s goals and challenges, and committing ourselves to outcomes that matter."
    },
    {
      icon: "/values/Integrity&Trust.png",
      title: "Integrity & Trust",
      description: "We act with honesty, transparency, and ethical responsibility in everything we do. Trust is the foundation of our relationships—with clients, partners, and each other.",
    },
    {
      icon: "/values/ImpactDrivenThinking.png",
      title: "Impact-Driven Thinking",
      description: "We focus on solutions that create real, measurable value. Our advice is practical, actionable, and designed to deliver sustainable results—not just reports.",
    },
    {
      icon: "/values/Insight&Expertise.png",
      title: "Insight & Expertise",
      description: "We bring clarity to complexity through rigorous analysis, industry knowledge, and thoughtful perspectives that enable better decision-making.",
    },
    {
      icon: "/values/Collaboration&Respect.png",
      title: "Collaboration & Respect",
      description: "We believe the best outcomes come from collaboration. We value diverse viewpoints, respect every stakeholder, and work as one team with our clients.",
    },
    {
      icon: "/values/InnovationWithPurpose.png",
      title: "Innovation with Purpose",
      description: "We continuously challenge conventional thinking, embracing innovation and new ideas—always with a clear focus on relevance and results.",
    },
    {
      icon: "/values/Excellence&Accountability.png",
      title: "Excellence & Accountability",
      description: "We hold ourselves to the highest standards of quality and professionalism, taking ownership of our commitments and delivering with consistency.",
    },
  ];

  return (
    <div className="py-5" style={{ background: "#f5f5f5" }}>
      <div className="container">
        <h4 className="text-center fw-semibold mb-4">OUR CORE VALUES</h4>
        <div className="row g-4 justify-content-center">
          {values.map((value, index) => (
            <div className="col-lg-3 col-md-6" key={index}>
              <div className="value-card">
                <div className="value-card-inner">
                  {/* FRONT */}
                  <div className="value-card-front">
                    <div className="value-icon">
                      <img src={value.icon} alt={value.title} />
                    </div>
                    <h5>{value.title}</h5>
                  </div>
                  {/* BACK */}
                  <div className="value-card-back">
                    <p>{value.description}</p>
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

export default OurValuesSection;
