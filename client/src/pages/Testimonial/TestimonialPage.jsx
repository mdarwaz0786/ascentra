import Footer from "../../components/Footer/Footer";
import SeoMeta from "../../components/Meta/SeoMeta";
import Navbar from "../../components/Navbar/Navbar";
import TestimonialCard from "../../components/Testimonial/TestimonialCard";

const TestimonialPage = () => {
  const testimonialsSectionOne = [
    {
      id: 1,
      description: "A senior international higher education professional with over 30 years of experience, including two decades in global education. Formerly with the British Council, he has led India operations for Manchester Metropolitan University, Cardiff University, and Durham University. Somnath advises international institutions on student recruitment, academic partnerships, research collaboration, and industry engagement. He is a co-facilitator of the International Officers Training Programme delivered by the British Council and State Governments. His work has enabled sustainable India–UK partnerships through mobility programmes, global grants, alumni engagement, and industry-academia initiatives.",
      name: "Somnath Nandy",
      email: "somnathnandy@aceascentra.com",
      designation: "Founding Partner",
      image: "/testimonial/Somnath.png",
    },
    {
      id: 2,
      description: "Dual-qualified as an Advocate in India and Solicitor in England & Wales, Sonal brings over 18 years of experience in complex litigation and international arbitration. He has handled more than 200 matters before the Supreme Court and tribunals and has led multiple cross-border disputes. Recognised by Legal 500, Benchmark Litigation, and Forbes India, he also led the international expansion of AKS Partners with the establishment of its Dubai office in 2023.",
      name: "Sonal Kumar Singh",
      email: "",
      designation: "Founding Partner",
      image: "/testimonial/Sonal.png",
    },
    {
      id: 3,
      description: "Guneet has extensive experience in brand strategy and marketing, leading initiatives with a strong focus on student outreach and engagement. She has deep expertise in brand positioning, campaign planning, and partnership development, enabling the creation of meaningful connections with young audiences. With a keen eye for consistency and impact, she ensures that all initiatives align seamlessly with the company’s identity and long-term vision.Her approach combines strategic insight with executional excellence, driving sustained brand growth and enhanced visibility.",
      name: "Guneet",
      email: "",
      designation: "Founding Partner",
      image: "/testimonial/Guneet.png",
    },
  ];

  const testimonialsSectionTwo = [
    {
      id: 4,
      description: "Anil Agarwal is a global leader with 35+ years of experience in international operations, P&L management, and market expansion. He held senior leadership roles at world's some of the top companies, driving growth across North America, Europe, India, and emerging markets. He currently serves as Director of Corporate Partnerships and South Asian Affairs at University of Arizona, leading India and global micro-campus initiatives. Anil is also an Adjunct Professor at Eller College of Management. His expertise spans global market entry, corporate partnerships, outsourcing, and supply chain optimisation.",
      name: "Anil Agarwal",
      email: "",
      designation: "Consultant",
      image: "/testimonial/Anil.png",
    },
  ];

  return (
    <>
      <SeoMeta pageName="our-team" />
      <Navbar />
      <div className="py-5" style={{ background: "#f5f5f5" }}>
        <div className="">
          {/* ================= SECTION ONE ================= */}
          <div className="text-center mb-5">
            <h2 style={{ background: "#fff" }} className="fw-semibold mb-3 py-3">OUR FOUNDERS</h2>
          </div>

          <div className="row">
            {testimonialsSectionOne.map((item, index) => (
              <div key={item.id} className="col-lg-12 col-md-12 mb-4">
                <TestimonialCard key={index} index={index} {...item} />
              </div>
            ))}
          </div>

          {/* ================= SECTION TWO ================= */}
          <div className="text-center mt-5 mb-5">
            <h2 style={{ background: "#fff" }} className="fw-semibold mb-3 py-3">Strategic Advisor (USA)</h2>
          </div>
          <div className="row">
            {testimonialsSectionTwo.map((item, index) => (
              <div key={item.id} className="col-lg-12 col-md-12 mb-4">
                <TestimonialCard key={index} index={index} {...item} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TestimonialPage;
