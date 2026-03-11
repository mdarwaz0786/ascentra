
import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './Layout';
import Dashboard from './pages/Dashboard';
import AddCategoryPage from './pages/Category/AddCategoryPage';
import CategoryListPage from './pages/Category/CategoryListPage';
import NotFound from './pages/NotFound';
import LoginPage from './pages/Auth/LoginPage';
import { useAuth } from './context/auth.context';
import AddBlogPage from './pages/Blog/AddBlogPage';
import BlogListPage from './pages/Blog/BlogListPage';
import UpdateBlogPage from './pages/Blog/UpdateBlogPage';
import AddNewsPage from './pages/News/AddNewsPage';
import UpdateNewsPage from './pages/News/UpdateNewsPage';
import NewsListPage from './pages/News/NewsListPage';
import AddMediaPage from './pages/Media/AddMediaPage';
import UpdateMediaPage from './pages/Media/UpdateMediaPage';
import MediaListPage from './pages/Media/MediaListPage';
import AddPublicationPage from './pages/Publication/AddPublicationPage';
import UpdatePublicationPage from './pages/Publication/UpdatePublicationPage';
import PublicationListPage from './pages/Publication/PublicationListPage';
import ResumeListPage from './pages/Resume/ResumeListPage';
import ContactListPage from './pages/Contact/ContactListPage';
import ContactDetailPage from './pages/Contact/ContactDetailPage';
import ResumeDetailPage from './pages/Resume/ResumeDetailPage';
import MetaListPage from './pages/Meta/MetaListPage';
import MetaFormPage from './pages/Meta/MetaFormPage';

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

            <Route path="/blog/add" element={<AddBlogPage />} />
            <Route path="/blog/update/:id" element={<UpdateBlogPage />} />
            <Route path="/blog/list" element={<BlogListPage />} />

            <Route path="/news/add" element={<AddNewsPage />} />
            <Route path="/news/update/:id" element={<UpdateNewsPage />} />
            <Route path="/news/list" element={<NewsListPage />} />

            <Route path="/media/add" element={<AddMediaPage />} />
            <Route path="/media/update/:id" element={<UpdateMediaPage />} />
            <Route path="/media/list" element={<MediaListPage />} />

            <Route path="/publication/add" element={<AddPublicationPage />} />
            <Route path="/publication/update/:id" element={<UpdatePublicationPage />} />
            <Route path="/publication/list" element={<PublicationListPage />} />

            <Route path="/resume/list" element={<ResumeListPage />} />
            <Route path="/resume/detail/:id" element={<ResumeDetailPage />} />

            <Route path="/contact/list" element={<ContactListPage />} />
            <Route path="/contact/detail/:id" element={<ContactDetailPage />} />

            <Route path="/meta/list" element={<MetaListPage />} />
            <Route path="/meta/add" element={<MetaFormPage />} />
            <Route path="/meta/update/:id" element={<MetaFormPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </>
      )}
    </Routes>
  );
};

export default App;
