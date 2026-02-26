const Hero = ({
  src,
  alt = "banner",
  height = "auto",
  className = "",
}) => {
  return (
    <section className={`w-100 ${className}`}>
      <img
        src={src}
        alt={alt}
        className="img-fluid w-100"
        style={{ height, objectFit: "cover" }}
        fetchpriority="high"
        decoding="sync"
      />
    </section>
  );
};

export default Hero;
