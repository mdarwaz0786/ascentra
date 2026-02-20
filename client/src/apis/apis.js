export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const apis = {
  blog: {
    getAll: `${API_BASE_URL}/api/v1/admin/blogs`,
    getSingle: `${API_BASE_URL}/api/v1/admin/blogs`,
  },
  news: {
    getAll: `${API_BASE_URL}/api/v1/admin/news`,
    getSingle: `${API_BASE_URL}/api/v1/admin/news`,
  },
  media: {
    getAll: `${API_BASE_URL}/api/v1/admin/medias`,
    getSingle: `${API_BASE_URL}/api/v1/admin/medias`,
  },
  publication: {
    getAll: `${API_BASE_URL}/api/v1/admin/publications`,
    getSingle: `${API_BASE_URL}/api/v1/admin/publications`,
  },
};

export default apis;
