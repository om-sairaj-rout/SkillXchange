import { useNavigate } from "react-router-dom";
import heroImage from "../../assets/hero-image.png";

const HeroSection = () => {
  const primaryOrangeBg = "bg-orange-500 hover:bg-orange-600";
  const primaryOrangeText = "text-orange-500";

  // Reusable Stat Card Component
  const StatCard = ({ value, label, positionClass = "" }) => (
    <div
      className={`bg-gray-100 p-4 rounded-xl shadow-lg flex flex-col items-center justify-center min-w-[120px] ${positionClass}`}
    >
      <span className="text-lg font-bold text-orange-500">{value}</span>
      <span className="text-xs text-gray-500">{label}</span>
    </div>
  );

  const navigate = useNavigate();

  const signUpClickHandler = () => {
    navigate("/register");
  };

  return (
    <>
      {/* HERO SECTION */}
      <section className="pb-10 grid md:grid-cols-2 gap-12 items-center">
        {/* LEFT SIDE: Text Content and CTA */}
        <div className="order-2 md:order-1">
          <h1 className="text-5xl md:text-4xl font-extrabold text-gray-900 leading-tight">
            Teach What you know, <br />
            <span className={primaryOrangeText}>Learn What you love</span>
          </h1>
          <p className="mt-4 text-md text-gray-600 max-w-lg">
            SkillXchange is the perfect platform to share your knowledge and
            find your next learning adventure with thousands of experts.
          </p>

          {/* Search Bar / CTA */}
          <div className="mt-8 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
            <button
              className={`px-6 py-3 text-white font-semibold rounded-lg transition duration-150 ${primaryOrangeBg} whitespace-nowrap`}
              onClick={signUpClickHandler}
            >
              Get Started
            </button>
          </div>
        </div>

        {/* RIGHT SIDE: Image and Stats Cards */}
        <div className="order-1 md:order-2 relative flex justify-center p-8">
          <img
            className="w-full h-full object-cover"
            src={heroImage}
            alt="Hero"
          />

          {/* Floating Stats */}
          <StatCard
            value="Skill Exchange"
            label="Learn & Teach Skills"
            positionClass="absolute top-2/4 left-1/6 -translate-x-1/2"
          />
          <StatCard
            value="Peer Learning"
            label="Connect With Students"
            positionClass="absolute bottom-1/4 right-0 translate-x-1/2"
          />
          <StatCard
            value="Community Driven"
            label="Grow Together"
            positionClass="absolute top-3/4 right-1/4 translate-y-1/4"
          />
        </div>
      </section>
    </>
  );
};

export default HeroSection;
