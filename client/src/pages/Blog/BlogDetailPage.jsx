import { useParams } from "react-router-dom";
import useFetchData from "../../hooks/useFetchData";
import apis from "../../apis/apis";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import ContentDetail from "../../components/ContentDetail/ContentDetail";
import Hero from "../../components/Hero/Hero";
import Loading from "../../components/Loading/Loading";

const BlogDetailPage = () => {
  const { slug } = useParams();

  const { data, isLoading } = useFetchData({
    url: `${apis.blog.getSingle}/${slug}`,
  });

  const d = data?.data;

  return (
    <>
      <Navbar />
      <Hero src={`${import.meta.env.VITE_API_BASE_URL}/${d?.banner}`} />
      {isLoading ? (
        <Loading fullScreen text="Loading blog details..." />
      ) : d ? (
        <ContentDetail
          title={d?.title}
          date={d?.date}
          time={d?.time}
          fullDescription={d?.fullDescription}
        />
      ) : (
        <div className="text-center py-5">Blog not found</div>
      )}
      <Footer />
    </>
  );
};

export default BlogDetailPage;
