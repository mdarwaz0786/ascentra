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
import StatusToggle from '../../components/Table/StatusToggle';
import useToggleStatus from '../../hooks/useToggleStatus';

const MetaListPage = () => {
  const { validToken } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  const page = parseInt(searchParams.get("page")) || 1;
  const limit = parseInt(searchParams.get("limit")) || 15;
  const search = searchParams.get("search") || "";

  const fetchDataUrl = apis.meta.getAll;
  const singleDeleteUrl = apis.meta.deleteSingle;
  const updateStatusUrl = apis.meta.update;

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

  const meta = data?.data || [];
  const total = data?.pagination?.total || 0;

  const pageOptions = [
    { key: "home", value: "Home" },
    { key: "about-us", value: "About Us" },
    { key: "contact-us", value: "Contact Us" },
    { key: "our-team", value: "Our Team" },
    { key: "our-growth-framework", value: "Our Growth Framework" },
    { key: "publication", value: "Publication" },
    { key: "media", value: "Media" },
    { key: "news-and-blog", value: "News & Blog" },
    { key: "career", value: "Career" },
    {
      key: "research-academic-and-innovation-partnerships",
      value: "Research Academic & Innovation Partnerships",
    },
    {
      key: "in-country-representation-and-market-growth",
      value: "In Country Representation & Market Growth",
    },
    {
      key: "events-outreach-and-engagement",
      value: "Events Outreach & Engagement",
    },
    {
      key: "operational-and-compliance-support",
      value: "Operational & Compliance Support",
    },
  ];
  const pageNameMap = Object.fromEntries(
    pageOptions.map(({ key, value }) => [key, value])
  );

  return (
    <div className="container mt-1">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5>Meta<span className="badge bg-secondary ms-2">{total}</span></h5>
        <Link to="/meta/add"><button className="btn btn-primary">Add New</button></Link>
        <SearchBar value={params.search} onChange={handleSearch} />
      </div>

      <TableWrapper>
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Page Name</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {meta?.length > 0 ? (
            meta?.map((item, index) => (
              <tr key={item?._id}>
                <td>{index + 1 + (params.page - 1) * params.limit}</td>
                <td>{pageNameMap[item?.pageName] || item?.pageName}</td>
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
                    <Link to={`/meta/update/${item?._id}`}>
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

export default MetaListPage;
