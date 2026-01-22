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
import apis, { API_BASE_URL } from '../../apis/apis';

const CategoryListPage = () => {
  const { validToken } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  const page = parseInt(searchParams.get("page")) || 1;
  const limit = parseInt(searchParams.get("limit")) || 10;
  const search = searchParams.get("search") || "";

  const fetchDataUrl = apis.category.getAll;
  const singleDeleteUrl = apis.category.deleteSingle;

  const { deleteData, deleteResponse, deleteError } = useDelete();

  const {
    data,
    params,
    setParams,
    refetch,
    isLoading,
  } = useFetchData(fetchDataUrl, validToken, { page, limit, search });

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

  const categories = data?.data || [];
  const total = data?.total || 0;

  return (
    <div className="container mt-1">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5>Category<span className="badge bg-secondary ms-2">{total}</span></h5>
        <Link to="/category/add"><button className="btn btn-primary">Add New</button></Link>
        <SearchBar value={params.search} onChange={handleSearch} />
      </div>

      <TableWrapper>
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Image</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {categories?.length > 0 ? (
            categories?.map((item, index) => (
              <tr key={item?._id}>
                <td>{index + 1 + (params.page - 1) * params.limit}</td>
                <td>
                  {item?.image ? (
                    <img
                      src={`${API_BASE_URL}/${item?.image}`}
                      alt="category"
                      style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "4px" }}
                    />
                  ) : (
                    "-"
                  )}
                </td>
                <td>{item?.name}</td>
                <td>
                  <div className="d-flex flex-wrap gap-2">
                    <Link to={`/category/update/${item?._id}`}>
                      <button className="btn btn-primary btn-sm">Edit</button>
                    </Link>
                    <button
                      className="btn btn-danger btn-sm"
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

export default CategoryListPage;
