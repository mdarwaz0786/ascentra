import { useSearchParams, useNavigate } from "react-router-dom";
import BlogCard from "../../components/Blog/BlogCard";
import LoadMoreButton from "../../components/Button/LoadMoreButton";
import Footer from "../../components/Footer/Footer";
import Hero from "../../components/Hero/Hero";
import Navbar from "../../components/Navbar/Navbar";
import { formatDate } from "../../helpers/formatDate";
import { shareContent } from "../../helpers/shareContent";
import useFetchData from "../../hooks/useFetchData";
import apis from "../../apis/apis";
import Loading from "../../components/Loading/Loading";

const BlogPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const page = parseInt(searchParams.get("page")) || 1;
  const limit = parseInt(searchParams.get("limit")) || 9;
  const type = searchParams.get("type") || "blog";

  const fetchUrl = type === "news" ? apis.news.getAll : apis.blog.getAll;

  const { data, isLoading } = useFetchData({
    url: fetchUrl,
    params: { page, limit },
  });

  const items = data?.data || [];
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

  const handleToggle = (selectedType) => {
    if (selectedType === type) return;

    updateQueryParams({
      type: selectedType,
      page: 1,
    });
  };

  return (
    <>
      <Navbar />
      <Hero src="/banner/NewsAndBlog.png" />
      <div className="container my-5">
        <div className="d-flex justify-content-center mb-5">
          <div className="btn-group">
            <button
              className={`btn ${type === "blog"
                ? "btn-dark"
                : "btn-outline-dark"
                }`}
              onClick={() => handleToggle("blog")}
            >
              Blog
            </button>
            <button
              className={`btn ${type === "news"
                ? "btn-dark"
                : "btn-outline-dark"
                }`}
              onClick={() => handleToggle("news")}
            >
              News
            </button>
          </div>
        </div>

        {isLoading && page == 1 ? (
          <Loading fullScreen text={`Loading ${type === "blog" ? "blogs" : "news"}...`} />
        ) : (
          <div className="row g-4">
            {items?.map((item) => (
              <div key={item?._id} className="col-12 col-md-6 col-lg-4">
                <BlogCard
                  image={`${import.meta.env.VITE_API_BASE_URL}/${item?.image}`}
                  dateTime={`${formatDate(item?.date)} | ${item?.time}`}
                  title={item?.title}
                  description={item?.shortDescription}
                  onReadMore={() => navigate(`/${type}/${item?.slug}`)}
                  onShare={() =>
                    shareContent({
                      title: item?.title,
                      text: item?.shortDescription,
                      url: `${window.location.origin}/${type}/${item?.slug}`,
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
          loading={isLoading && page > 1}
          className="px-3"
        />
      )}
      <Footer />
    </>
  );
};

export default BlogPage;
