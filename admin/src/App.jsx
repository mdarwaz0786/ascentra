
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Dashboard from './pages/Dashboard';
import AddCategoryPage from './pages/Category/AddCategoryPage';
import AddSubCategoryPage from './pages/SubCategory/AddSubCategoryPage';
import AddSubSubCategoryPage from './pages/SubSubCategory/AddSubSubCategoryPage';
import CategoryListPage from './pages/Category/CategoryListPage';
import NotFound from './pages/NotFound';
import LoginPage from './pages/Auth/LoginPage';
import { useAuth } from './context/auth.context';

const App = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isLoggedIn } = useAuth();

  const handleToggleSidebar = () => {
    setMobileOpen((prev) => !prev);
  };

  return (
    <Routes>
      {!isLoggedIn ? (
        <>
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </>
      ) : (
        <>
          <Route path="/" element={<Layout mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} handleToggleSidebar={handleToggleSidebar} />}>
            <Route index element={<Dashboard />} />
            <Route path="/category/list" element={<CategoryListPage />} />
            <Route path="/category/add" element={<AddCategoryPage />} />
            <Route path="/sub-category/add" element={<AddSubCategoryPage />} />
            <Route path="/sub-sub-category/add" element={<AddSubSubCategoryPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </>
      )}
    </Routes>
  );
};

export default App;
