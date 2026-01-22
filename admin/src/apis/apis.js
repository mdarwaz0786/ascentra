export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const apis = {
  auth: {
    login: `${API_BASE_URL}/api/v1/admin/auth/login`,
    loggedIn: `${API_BASE_URL}/api/v1/admin/auth/loggedIn`,
  },
  category: {
    create: `${API_BASE_URL}/api/v1/category`,
    update: `${API_BASE_URL}/api/v1/category`,
    getAll: `${API_BASE_URL}/api/v1/category`,
    getSingle: `${API_BASE_URL}/api/v1/category`,
    deleteSingle: `${API_BASE_URL}/api/v1/category`,
  },
  subCategory: {
    create: `${API_BASE_URL}/api/v1/sub-category`,
    update: `${API_BASE_URL}/api/v1/sub-category`,
    getAll: `${API_BASE_URL}/api/v1/sub-category`,
    getSingle: `${API_BASE_URL}/api/v1/sub-category`,
    deleteSingle: `${API_BASE_URL}/api/v1/sub-category`,
  },
  subSubCategory: {
    create: `${API_BASE_URL}/api/v1/sub-sub-category`,
    update: `${API_BASE_URL}/api/v1/sub-sub-category`,
    getAll: `${API_BASE_URL}/api/v1/sub-sub-category`,
    getSingle: `${API_BASE_URL}/api/v1/sub-sub-category`,
    deleteSingle: `${API_BASE_URL}/api/v1/sub-sub-category`,
  },
};

export default apis;
