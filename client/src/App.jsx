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
        <Route path="/event" element={<EventPage />} />
        <Route path="/publication" element={<PublicationPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/career" element={<CareerPage />} />
        <Route path="/our-core-strength" element={<TestimonialPage />} />
      </Routes>
    </>
  );
};

export default App;
