import { useSearchParams } from "react-router-dom";
import LoadMoreButton from "../../components/Button/LoadMoreButton";
import Footer from "../../components/Footer/Footer";
import Hero from "../../components/Hero/Hero";
import MediaCard from "../../components/Media/MediaCard";
import Navbar from "../../components/Navbar/Navbar";
import { formatDate } from "../../helpers/formatDate";
import useFetchData from "../../hooks/useFetchData";
import apis from "../../apis/apis";
import Loading from "../../components/Loading/Loading";

const MediaPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = parseInt(searchParams.get("page")) || 1;
  const limit = parseInt(searchParams.get("limit")) || 9;

  const { data, isLoading } = useFetchData({
    url: apis.media.getAll,
    params: { page, limit },
  });

  const mediaItems = data?.data || [];
  const hasMore = data?.pagination?.hasMore || false;

  const updateQueryParams = (updates = {}) => {
    const newParams = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([key, value]) => newParams.set(key, value));
    setSearchParams(newParams);
  };

  const handleLoadMore = () => {
    if (!hasMore || isLoading) return;
    updateQueryParams({ page: page + 1 });
  };

  return (
    <>
      <Navbar />
      <Hero src="/banner/Media.png" />
      <div className="container my-5">
        {isLoading && page === 1 ? (
          <Loading fullScreen text="Loading media items..." />
        ) : (
          <div className="row g-4">
            {mediaItems.map((item) => (
              <div key={item._id} className="col-12 col-md-6 col-lg-4">
                <MediaCard
                  image={`${import.meta.env.VITE_API_BASE_URL}/${item?.image}`}
                  dateTime={`${formatDate(item?.date)} | ${item?.time}`}
                  source={item?.source}
                  title={item?.title}
                  description={item?.shortDescription}
                  onReadMore={() => window.open(item?.link, "_blank")}
                />
              </div>
            ))}
          </div>
        )}
      </div>
      {hasMore && (
        <LoadMoreButton
          onClick={handleLoadMore}
          className="px-3"
          loading={isLoading && page > 1}
        />
      )}
      <Footer />
    </>
  );
};

export default MediaPage;
