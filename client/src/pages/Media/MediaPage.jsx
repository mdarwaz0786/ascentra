import { useSearchParams } from "react-router-dom";
import LoadMoreButton from "../../components/Button/LoadMoreButton";
import Footer from "../../components/Footer/Footer";
import Hero from "../../components/Hero/Hero";
import MediaCard from "../../components/Media/MediaCard";
import Navbar from "../../components/Navbar/Navbar";
import { formatDate } from "../../helpers/formatDate";
import useFetchData from "../../hooks/useFetchData";
import apis from "../../apis/apis";

const MediaPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = parseInt(searchParams.get("page")) || 1;
  const limit = parseInt(searchParams.get("limit")) || 6;

  const { data, isLoading } = useFetchData(
    apis.media.getAll,
    "",
    { page, limit }
  );

  const mediaItems = data?.data || [];
  const pagination = data?.pagination || {};
  const hasNextPage = pagination?.hasNextPage;

  const updateQueryParams = (updates = {}) => {
    setSearchParams({
      page,
      limit,
      ...updates,
    });
  };

  const handleLoadMore = () => {
    if (hasNextPage) {
      updateQueryParams({ page: page + 1 });
    }
  };

  return (
    <>
      <Navbar />
      <Hero src="/banner/Media.png" />

      <div className="container my-5">
        {isLoading && page === 1 ? (
          <div className="text-center py-5">Loading...</div>
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

      {hasNextPage && (
        <LoadMoreButton
          onClick={handleLoadMore}
          className="px-3"
        />
      )}

      <Footer />
    </>
  );
};

export default MediaPage;
