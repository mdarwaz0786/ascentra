/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SliderSection = () => {
  const [active, setActive] = useState(0);

  const slides = [
    { id: 1, image: "/banner/Home1.png", link: "/" },
    { id: 2, image: "/banner/Home2.png", link: "/" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="position-relative overflow-hidden">
      {/* Responsive Aspect Ratio Wrapper */}
      <div className="ratio ratio-21x9 ratio-md-16x9 ratio-sm-4x3">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`position-absolute top-0 start-0 w-100 h-100
              ${index === active ? "opacity-100" : "opacity-0"}
              transition-opacity`}
          >
            <Link to={slide.link} className="d-block w-100 h-100">
              <img
                src={slide.image}
                alt="slide"
                className="w-100 h-100 img-fluid object-fit-cover"
              />
            </Link>
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="position-absolute bottom-0 start-50 translate-middle-x mb-3 d-flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActive(i)}
            className={`rounded-circle border-0 p-2 
              ${i === active ? "bg-primary" : "bg-white opacity-75"}`}
          />
        ))}
      </div>
    </div>
  );
};

export default SliderSection;
