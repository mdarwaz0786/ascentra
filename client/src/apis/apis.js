export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const apis = {
  blog: {
    getAll: `${API_BASE_URL}/api/v1/user/blogs`,
    getSingle: `${API_BASE_URL}/api/v1/user/blogs`,
  },
  news: {
    getAll: `${API_BASE_URL}/api/v1/user/news`,
    getSingle: `${API_BASE_URL}/api/v1/user/news`,
  },
  media: {
    getAll: `${API_BASE_URL}/api/v1/user/medias`,
    getSingle: `${API_BASE_URL}/api/v1/user/medias`,
  },
  publication: {
    getAll: `${API_BASE_URL}/api/v1/user/publications`,
    getSingle: `${API_BASE_URL}/api/v1/user/publications`,
  },
  resume: {
    create: `${API_BASE_URL}/api/v1/user/resume`,
  },
  contact: {
    create: `${API_BASE_URL}/api/v1/user/contact`,
  },
};

export default apis;
