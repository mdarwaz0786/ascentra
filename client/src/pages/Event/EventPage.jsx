import LoadMoreButton from "../../components/Button/LoadMoreButton";
import EventCard from "../../components/Event/EventCard";
import Footer from "../../components/Footer/Footer";
import Hero from "../../components/Hero/Hero";
import Navbar from "../../components/Navbar/Navbar";
import PublicationCard from "../../components/Publication/PublicationCard";

const EventPage = () => {
  const data = [
    {
      image: "/blog/blog.png",
      dateTime: "12 Nov 2024 | 12:05 PM IST",
      title: "Studying abroad – disease or an opportunity?",
      description: "The honourable Vice President of India, Jagdeep Dhankar, recently described the growing trend of students choosing to study abroad, raising important questions about whether this movement represents a challenge or an opportunity for India’s higher education system, talent development, and global engagement.",
    },
    {
      image: "/blog/blog.png",
      dateTime: "15 Nov 2024 | 11:00 AM IST",
      title: "Why Global Education Matters",
      description: "Global education continues to play a crucial role in shaping future-ready graduates by exposing students to diverse cultures, innovative teaching approaches, and international career opportunities across multiple disciplines.",
    },
    {
      image: "/blog/blog.png",
      dateTime: "18 Nov 2024 | 10:30 AM IST",
      title: "Future of International Students",
      description: "Experts discuss how evolving immigration policies, digital learning models, and emerging destinations are reshaping the future journey of international students worldwide.",
    },
    {
      image: "/blog/blog.png",
      dateTime: "22 Nov 2024 | 09:45 AM IST",
      title: "Choosing the Right Country for Higher Studies",
      description: "Selecting the right study destination involves evaluating academic quality, post-study work options, living costs, and long-term career prospects.",
    },
    {
      image: "/blog/blog.png",
      dateTime: "25 Nov 2024 | 02:15 PM IST",
      title: "Scholarships and Financial Aid for Students",
      description: "A comprehensive look at various scholarships, grants, and financial aid opportunities that help make international education more accessible.",
    },
    {
      image: "/blog/blog.png",
      dateTime: "28 Nov 2024 | 04:30 PM IST",
      title: "Career Opportunities After Studying Abroad",
      description: "Understanding global job markets, employer expectations, and skill requirements after completing an international degree.",
    },
  ];

  return (
    <>
      <Navbar />
      <Hero src="/banner/banner.png" />
      <div className="container my-5">
        <div className="row g-4">
          {data.map((item, index) => (
            <div key={index} className="col-12 col-md-6 col-lg-4">
              <EventCard
                image={item.image}
                dateTime={item.dateTime}
                title={item.title}
                description={item.description}
                onReadMore={() => console.log(item.title)}
                onShare={() => console.log("share")}
              />
            </div>
          ))}
        </div>
      </div>
      <LoadMoreButton
        onClick={() => console.log("clicked")}
        className="px-3"
      />
      <Footer />
    </>
  );
};

export default EventPage;
