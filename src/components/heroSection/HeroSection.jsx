import HeroImage from "../../img/hero1.png";
const HeroSection = () => {
  return (
    <div>
      <img
        className=" h-40 lg:h-full md:h-full sm:h-full"
        src={HeroImage}
        alt="Hero Banner"
      />
    </div>
  );
};

export default HeroSection;
