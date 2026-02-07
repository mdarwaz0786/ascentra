import {
  FaLightbulb,
  FaUserGraduate,
  FaBalanceScale,
  FaUsers,
  FaTrophy,
} from "react-icons/fa";
import WorkCard from "../../components/Job/WorkCard";

const WhyWorkWithUsSection = () => {
  return (
    <div className="py-5">
      <div className="container">

        {/* ===== HEADING ===== */}
        <div className="text-center mb-5">
          <h2 className="fw-semibold">Why Work with Us?</h2>
        </div>

        {/* ===== CARDS GRID ===== */}
        <div className="row g-4">

          <WorkCard
            icon={<FaLightbulb color="#00578c" />}
            title="A Culture of Innovation"
            description="We embrace creativity and forward-thinking, empowering our team members to bring their ideas to life."
          />

          <WorkCard
            icon={<FaUserGraduate color="#00578c" />}
            title="Professional Development"
            description="Our learning and development programs are designed to help you acquire new skills, grow professionally, and achieve your career goals."
          />

          <WorkCard
            icon={<FaBalanceScale color="#00578c" />}
            title="Work-Life Balance"
            description="We understand the importance of balance and offer flexible work arrangements to help you thrive both personally and professionally."
          />

          <WorkCard
            icon={<FaUsers color="#00578c" />}
            title="Diversity & Inclusion"
            description="We celebrate diversity and are committed to creating an inclusive environment where everyone can succeed."
          />

          <WorkCard
            icon={<FaTrophy color="#00578c" />}
            title="Rewards & Recognition"
            description="We value hard work and celebrate achievements with competitive compensation, bonuses, and employee recognition programs."
          />

        </div>
      </div>
    </div>
  );
};

export default WhyWorkWithUsSection;
