import Footer from "../../components/Footer/Footer";
import Hero from "../../components/Hero/Hero";
import Navbar from "../../components/Navbar/Navbar";
import TestimonialCard from "../../components/Testimonial/TestimonialCard";

const TestimonialPage = () => {
  const testimonialsSectionOne = [
    {
      id: 1,
      description: "A senior international higher education professional with over 30 years of experience, including two decades in global education. Formerly with the British Council, he has led India operations for Manchester Metropolitan University, Cardiff University, and Durham University. Somnath advises international institutions on student recruitment, academic partnerships, research collaboration, and industry engagement. He is a co-facilitator of the International Officers Training Programme delivered by the British Council and State Governments. His work has enabled sustainable India–UK partnerships through mobility programmes, global grants, alumni engagement, and industry-academia initiatives.",
      name: "Somnath Nandy",
      image: "/testimonial/AnilKumar.jpeg",
    },
    {
      id: 2,
      description: "Dual-qualified as an Advocate in India and Solicitor in England & Wales, Sonal brings over 18 years of experience in complex litigation and international arbitration. He has handled more than 200 matters before the Supreme Court and tribunals and has led multiple cross-border disputes. Recognised by Legal 500, Benchmark Litigation, and Forbes India, he also led the international expansion of AKS Partners with the establishment of its Dubai office in 2023.",
      name: "Sonal Kumar Singh ",
      designation: "Director & Legal Strategist",
      image: "/testimonial/AnilKumar.jpeg",
    },
    {
      id: 3,
      description: "Guneet is a leading brand strategy and marketing initiatives with a strong focus on student outreach and engagement. She drives brand positioning, campaign planning, and partnership development to build meaningful connections with young audiences. With a sharp eye for consistency and impact, she ensures all initiatives align with the company’s identity and long-term goals. Her approach blends strategic thinking with executional excellence, contributing to sustained brand growth and visibility.",
      name: "Guneet Kaur",
      image: "/testimonial/AnilKumar.jpeg",
    },
  ];

  const testimonialsSectionTwo = [
    {
      id: 4,
      description: "Anil Agarwal is a seasoned professional with 35 years of domestic and international leadership experience across global operations, P& L management, and market expansion.He has successfully led growth initiatives across North America, India, Europe, and emerging markets, delivering sustained revenue and profitability gains.Anil has held senior leadership roles with Xerox Corporation, managing large - scale sales, marketing, and service operations with full P & L accountability.Based out of the USA, he currently serves as Director of Corporate Partnerships and South Asian Affairs at the University of Arizona, where he launched and scaled India operations and global micro - campus initiatives.Anil is also an Adjunct Professor of International Business and Global Marketing at the University of Arizona’s Eller College of Management.His expertise spans market entry strategy, global marketing, corporate partnerships, outsourcing, and supply chain optimisation.He brings a disciplined, execution - focused perspective to advisory engagements, grounded in decades of real - world leadership.His advisory strength lies in market entry strategy, global marketing, corporate partnerships, outsourcing, and offshoring models, having helped organisations significantly reduce operating costs while improving quality and efficiency.He brings a measured, execution - driven, and risk - aware perspective to the ACE ASCENTRA Advisory Council, guiding institutions toward sustainable, long - term growth in complex markets.",
      name: "Anil Agarwal ",
      image: "/testimonial/AnilKumar.jpeg",
    },
  ];

  return (
    <>
      <Navbar />
      <Hero src="/banner/banner.png" />
      <div className="py-5" style={{ background: "#f5f5f5" }}>
        <div className="">
          {/* ================= SECTION ONE ================= */}
          <div className="text-center mb-5">
            <h2 style={{ background: "#fff" }} className="fw-semibold mb-3 py-3">OUR LEADERSHIP</h2>
            <p className=" px-3 px-md-4 px-lg-5">
              Our leadership is field-tested, not theoretical. Decades of hands-on experience, strong institutional networks, and proven delivery ensure every engagement is grounded, effective, and outcome focused.
            </p>
          </div>

          <div className="row px-3 px-md-4 px-lg-5">
            {testimonialsSectionOne.map((item) => (
              <div key={item.id} className="col-lg-4 col-md-6 mb-4">
                <TestimonialCard {...item} />
              </div>
            ))}
          </div>

          {/* ================= SECTION TWO ================= */}
          <div className="text-center mt-5 mb-5">
            <h2 style={{ background: "#fff" }} className="fw-semibold mb-3 py-3">Strategic Advisor (USA)</h2>
          </div>
          <div className="row px-3 px-md-4 px-lg-5">
            {testimonialsSectionTwo.map((item) => (
              <div key={item.id} className="col-lg-4 col-md-6 mb-4">
                <TestimonialCard {...item} />
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
