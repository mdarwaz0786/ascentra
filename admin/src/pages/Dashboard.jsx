import {
  FaGlobe,
  FaUsers,
  FaTags,
  FaBoxOpen,
  FaThLarge,
  FaEnvelopeOpenText,
  FaFileAlt,
} from "react-icons/fa";
import DashboardCard from "../components/Card/DashboardCard";
import useFetch from "../hooks/useFetch";
import apis from "../apis/apis";
import { useAuth } from "../context/auth.context";

const Dashboard = () => {
  const { validToken } = useAuth();
  const { data } = useFetch(apis.dashboard.get, validToken);

  const stats = [
    { label: "Blog", value: data?.data?.blogs, icon: <FaBoxOpen size={20} />, color: "text-primary", to: "/blog/list" },
    { label: "News", value: data?.data?.news, icon: <FaGlobe size={20} />, color: "text-success", to: "/news/list" },
    { label: "Media", value: data?.data?.media, icon: <FaThLarge size={20} />, color: "text-warning", to: "/media/list" },
    { label: "Publication", value: data?.data?.publications, icon: <FaTags size={20} />, color: "text-danger", to: "/publication/list" },
    // { label: "User", value: data?.data?.users, icon: <FaUsers size={20} />, color: "text-danger", to: "/user/list" },
    { label: "Contact Enquiry", value: data?.data?.contacts, icon: <FaEnvelopeOpenText size={20} />, color: "text-danger", to: "/contact/list" },
    { label: "Resume", value: data?.data?.contacts, icon: <FaFileAlt size={20} />, color: "text-danger", to: "/resume/list" },
  ];

  return (
    <div className="container">
      <h5 className="mb-4">Dashboard</h5>
      <div className="row g-4">
        {stats?.map((stat, idx) => (
          <div className="col-sm-6 col-md-4 col-lg-3" key={idx}>
            <DashboardCard {...stat} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;


