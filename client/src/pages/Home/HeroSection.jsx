import heroImage from "../../assets/banner1.png";

const Hero = () => {
  return (
    <section className="w-100">
      <img
        src={heroImage}
        alt="Hero Banner"
        className="img-fluid w-100"
      />
    </section>
  );
};

export default Hero;
