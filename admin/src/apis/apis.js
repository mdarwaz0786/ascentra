export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const apis = {
  dashboard: {
    get: `${API_BASE_URL}/api/v1/admin/dashboard`,
  },
  auth: {
    login: `${API_BASE_URL}/api/v1/admin/auth/login`,
    signup: `${API_BASE_URL}/api/v1/admin/auth/signup`,
    loggedIn: `${API_BASE_URL}/api/v1/admin/auth/loggedIn`,
  },
  blog: {
    create: `${API_BASE_URL}/api/v1/admin/blogs`,
    update: `${API_BASE_URL}/api/v1/admin/blogs`,
    getAll: `${API_BASE_URL}/api/v1/admin/blogs`,
    getSingle: `${API_BASE_URL}/api/v1/admin/blogs`,
    deleteSingle: `${API_BASE_URL}/api/v1/admin/blogs`,
  },
  news: {
    create: `${API_BASE_URL}/api/v1/admin/news`,
    update: `${API_BASE_URL}/api/v1/admin/news`,
    getAll: `${API_BASE_URL}/api/v1/admin/news`,
    getSingle: `${API_BASE_URL}/api/v1/admin/news`,
    deleteSingle: `${API_BASE_URL}/api/v1/admin/news`,
  },
  media: {
    create: `${API_BASE_URL}/api/v1/admin/medias`,
    update: `${API_BASE_URL}/api/v1/admin/medias`,
    getAll: `${API_BASE_URL}/api/v1/admin/medias`,
    getSingle: `${API_BASE_URL}/api/v1/admin/medias`,
    deleteSingle: `${API_BASE_URL}/api/v1/admin/medias`,
  },
  publication: {
    create: `${API_BASE_URL}/api/v1/admin/publications`,
    update: `${API_BASE_URL}/api/v1/admin/publications`,
    getAll: `${API_BASE_URL}/api/v1/admin/publications`,
    getSingle: `${API_BASE_URL}/api/v1/admin/publications`,
    deleteSingle: `${API_BASE_URL}/api/v1/admin/publications`,
  },
  contact: {
    create: `${API_BASE_URL}/api/v1/admin/contact`,
    update: `${API_BASE_URL}/api/v1/admin/contact`,
    getAll: `${API_BASE_URL}/api/v1/admin/contact`,
    getSingle: `${API_BASE_URL}/api/v1/admin/contact`,
    deleteSingle: `${API_BASE_URL}/api/v1/admin/contact`,
  },
  resume: {
    create: `${API_BASE_URL}/api/v1/admin/resume`,
    update: `${API_BASE_URL}/api/v1/admin/resume`,
    getAll: `${API_BASE_URL}/api/v1/admin/resume`,
    getSingle: `${API_BASE_URL}/api/v1/admin/resume`,
    deleteSingle: `${API_BASE_URL}/api/v1/admin/resume`,
  },
};

export default apis;
