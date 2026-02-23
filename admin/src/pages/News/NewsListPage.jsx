/* eslint-disable react-hooks/exhaustive-deps */
import SearchBar from '../../components/Table/SearchBar';
import Pagination from '../../components/Table/Pagination';
import TableWrapper from '../../components/Table/TableWrapper';
import useFetchData from '../../hooks/useFetchData';
import { useAuth } from '../../context/auth.context';
import PageSizeSelector from '../../components/Table/PageSizeSelector';
import useDelete from '../../hooks/useDelete';
import { toast } from 'react-toastify';
import { Link, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import apis from '../../apis/apis';
import { formatDate } from '../../helpers/formatDate';
import useToggleStatus from '../../hooks/useToggleStatus';
import TableImage from '../../components/Table/TableImage';
import StatusToggle from '../../components/Table/StatusToggle';

const NewsListPage = () => {
  const { validToken } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  const page = parseInt(searchParams.get("page")) || 1;
  const limit = parseInt(searchParams.get("limit")) || 10;
  const search = searchParams.get("search") || "";

  const fetchDataUrl = apis.news.getAll;
  const singleDeleteUrl = apis.news.deleteSingle;
  const updateStatusUrl = apis.news.update;

  const { deleteData, deleteResponse, deleteError } = useDelete();

  const {
    data,
    params,
    setParams,
    refetch,
    isLoading,
  } = useFetchData(fetchDataUrl, validToken, { page, limit, search });

  const { toggling, toggleStatus } = useToggleStatus({ token: validToken, refetch });

  useEffect(() => {
    setParams({ page, limit, search });
  }, [page, limit, search]);

  const updateQueryParams = (updates = {}) => {
    const updatedParams = {
      page,
      limit,
      search,
      ...updates,
    };
    setSearchParams(updatedParams);
  };

  const handleSearch = (value) => {
    updateQueryParams({ search: value, page: 1 });
  };

  const handlePageChange = (newPage) => {
    updateQueryParams({ page: newPage });
  };

  const handlePageSizeChange = (newLimit) => {
    updateQueryParams({ limit: newLimit, page: 1 });
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this");
    if (!confirmed) return;
    await deleteData(`${singleDeleteUrl}/${id}`, validToken);
  };

  useEffect(() => {
    if (deleteResponse?.success) {
      toast.success("Deleted successfully");
      refetch();
    };
  }, [deleteResponse]);

  useEffect(() => {
    if (deleteError) {
      toast.error(deleteError);
    };
  }, [deleteError]);

  const news = data?.data || [];
  const total = data?.pagination?.total || 0;

  return (
    <div className="container mt-1">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5>News<span className="badge bg-secondary ms-2">{total}</span></h5>
        <Link to="/news/add"><button className="btn btn-primary">Add New</button></Link>
        <SearchBar value={params.search} onChange={handleSearch} />
      </div>

      <TableWrapper>
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Image</th>
            <th>Title</th>
            <th>Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {news?.length > 0 ? (
            news?.map((item, index) => (
              <tr key={item?._id}>
                <td>{index + 1 + (params.page - 1) * params.limit}</td>
                <td>
                  <TableImage
                    src={item?.image}
                    alt={item?.name}
                    width={50}
                    height={50}
                  />
                </td>
                <td>{item?.title}</td>
                <td>{formatDate(item?.date)}</td>
                <td>
                  <StatusToggle
                    id={item?._id}
                    status={item?.status}
                    toggling={toggling}
                    onToggle={() => toggleStatus(updateStatusUrl, item?._id, item?.status)}
                  />
                </td>
                <td>
                  <div className="d-flex flex-wrap gap-2">
                    <Link to={`/news/update/${item?._id}`}>
                      <button className="btn btn-primary">Edit</button>
                    </Link>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(item?._id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                {isLoading ? "Loading..." : "No Data"}
              </td>
            </tr>
          )}
        </tbody>
      </TableWrapper>

      <div className="d-flex justify-content-between align-items-center mt-3">
        <PageSizeSelector
          value={params.limit}
          onChange={handlePageSizeChange}
          total={total}
        />
        <Pagination
          page={params.page}
          total={total}
          limit={params.limit}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default NewsListPage;
