import { useSearchParams, useNavigate } from "react-router-dom";
import useFetchData from "../../hooks/useFetchData";
import apis from "../../apis/apis";
import LoadMoreButton from "../../components/Button/LoadMoreButton";
import Footer from "../../components/Footer/Footer";
import Hero from "../../components/Hero/Hero";
import Navbar from "../../components/Navbar/Navbar";
import PublicationCard from "../../components/Publication/PublicationCard";
import { shareContent } from "../../helpers/shareContent";
import { formatDate } from "../../helpers/formatDate";
import Loading from "../../components/Loading/Loading";

const PublicationPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const page = parseInt(searchParams.get("page")) || 1;
  const limit = parseInt(searchParams.get("limit")) || 9;

  const { data, isLoading } = useFetchData({
    url: apis.publication.getAll,
    params: { page, limit },
  });

  const publications = data?.data || [];
  const pagination = data?.pagination || {};
  const hasMore = pagination?.hasMore;

  const updateQueryParams = (updates = {}) => {
    setSearchParams({
      page,
      limit,
      ...updates,
    });
  };

  const handleLoadMore = () => {
    if (hasMore) {
      updateQueryParams({ page: page + 1 });
    }
  };

  return (
    <>
      <Navbar />
      <Hero src="/banner/Publications.png" />
      <div className="container my-5">
        {isLoading && page === 1 ? (
          <Loading fullScreen text="Loading publications..." />
        ) : (
          <div className="row g-4">
            {publications?.map((item) => (
              <div key={item?._id} className="col-12 col-md-6 col-lg-4">
                <PublicationCard
                  image={`${import.meta.env.VITE_API_BASE_URL}/${item?.image}`}
                  title={item.title}
                  dateTime={`${formatDate(item?.date)} | ${item?.time}`}
                  description={item?.shortDescription}
                  tags={item?.tags}
                  onReadMore={() => navigate(`/publication/${item?.slug}`)}
                  onShare={() =>
                    shareContent({
                      title: item?.title,
                      text: item?.shortDescription,
                      url: `${window.location.origin}/publication/${item?.slug}`,
                    })
                  }
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
        />
      )}
      <Footer />
    </>
  );
};

export default PublicationPage;
