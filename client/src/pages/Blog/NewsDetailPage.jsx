import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import useFetchData from "../../hooks/useFetchData";
import apis from "../../apis/apis";
import ContentDetail from "../../components/ContentDetail/ContentDetail";
import Hero from "../../components/Hero/Hero";
import Loading from "../../components/Loading/Loading";
import SeoMeta from "../../components/Meta/SeoMeta";

const NewsDetailPage = () => {
  const { slug } = useParams();

  const { data, isLoading } = useFetchData({
    url: `${apis.news.getSingle}/${slug}`,
  });

  const d = data?.data;

  return (
    <>
      <SeoMeta pageName="news-detail" slug={d?.slug} />
      <Navbar />
      <Hero src={`${import.meta.env.VITE_API_BASE_URL}/${d?.banner}`} />
      {isLoading ? (
        <Loading fullScreen text="Loading news details..." />
      ) : d ? (
        <ContentDetail
          title={d?.title}
          date={d?.date}
          time={d?.time}
          fullDescription={d?.fullDescription}
        />
      ) : (
        <div className="text-center py-5">News not found</div>
      )}
      <Footer />
    </>
  );
};

export default NewsDetailPage;
