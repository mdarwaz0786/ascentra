/* eslint-disable react-hooks/exhaustive-deps */
import SearchBar from '../../components/Table/SearchBar';
import Pagination from '../../components/Table/Pagination';
import TableWrapper from '../../components/Table/TableWrapper';
import useFetchData from '../../hooks/useFetchData';
import { useAuth } from '../../context/auth.context';
import PageSizeSelector from '../../components/Table/PageSizeSelector';
import useDelete from '../../hooks/useDelete';
import { toast } from 'react-toastify';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import apis from '../../apis/apis';
import { formatDate } from '../../helpers/formatDate';
import { Link } from 'react-router-dom';

const ContactListPage = () => {
  const { validToken } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  const page = parseInt(searchParams.get("page")) || 1;
  const limit = parseInt(searchParams.get("limit")) || 10;
  const search = searchParams.get("search") || "";

  const fetchDataUrl = apis.contact.getAll;
  const singleDeleteUrl = apis.contact.deleteSingle;

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

  const contact = data?.data || [];
  const total = data?.pagination?.total || 0;

  return (
    <div className="container mt-1">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5>Contact<span className="badge bg-secondary ms-2">{total}</span></h5>
        <SearchBar value={params.search} onChange={handleSearch} />
      </div>

      <TableWrapper>
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Mobile</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {contact?.length > 0 ? (
            contact?.map((item, index) => (
              <tr key={item?._id}>
                <td>{index + 1 + (params.page - 1) * params.limit}</td>
                <td>{item?.name}</td>
                <td>{item?.mobile}</td>
                <td>{formatDate(item?.createdAt)}</td>
                <td>
                  <div className="d-flex flex-wrap gap-2">
                    <Link to={`/contact/detail/${item?._id}`}>
                      <button className="btn btn-primary">View</button>
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

export default ContactListPage;
