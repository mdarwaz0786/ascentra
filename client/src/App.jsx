import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import AboutusPage from "./pages/Aboutus/AboutusPage";
import MarketDevelopmentServicePage from "./pages/Services/MarketDevelopmentServicePage";
import MarketEntryServicePage from "./pages/Services/MarketEntryServicePage";
import MarketPresenceServicePage from "./pages/Services/MarketPresenceServicePage";
import MarketExpansionServicePage from "./pages/Services/MarketExpansionServicePage";
import EventPage from "./pages/Event/EventPage";
import PublicationPage from "./pages/Publication/PublicationPage";
import BlogPage from "./pages/Blog/BlogPage";
import MediaPage from "./pages/Media/MediaPage";
import ContactusPage from "./pages/Contactus/ContactusPage";
import CareerPage from "./pages/Career/CareerPage";
import ScrollToTop from "./utils/ScrollToTop";
import TestimonialPage from "./pages/Testimonial/TestimonialPage";
import PublicationDetailPage from "./pages/Publication/PublicationDetailPage";
import MediaDetailPage from "./pages/Media/MediaDetailPage";
import BlogDetailPage from "./pages/Blog/BlogDetailPage";
import NewsDetailPage from "./pages/Blog/NewsDetailPage";
import GrowthFrameworkPage from "./pages/GrowthFramework/GrowthFrameworkPage";

const App = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about-us" element={<AboutusPage />} />
        <Route path="/contact-us" element={<ContactusPage />} />
        <Route path="/market-development" element={<MarketDevelopmentServicePage />} />
        <Route path="/market-entry" element={<MarketEntryServicePage />} />
        <Route path="/market-presence" element={<MarketPresenceServicePage />} />
        <Route path="/market-expansion" element={<MarketExpansionServicePage />} />
        <Route path="/media" element={<MediaPage />} />
        <Route path="/media/:id" element={<MediaDetailPage />} />
        <Route path="/event" element={<EventPage />} />
        <Route path="/publication" element={<PublicationPage />} />
        <Route path="/publication/:slug" element={<PublicationDetailPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogDetailPage />} />
        <Route path="/news/:slug" element={<NewsDetailPage />} />
        <Route path="/career" element={<CareerPage />} />
        <Route path="/our-core-strength" element={<TestimonialPage />} />
        <Route path="/our-growth-framework" element={<GrowthFrameworkPage />} />
      </Routes>
    </>
  );
};

export default App;
