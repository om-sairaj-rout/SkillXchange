import AboutSection from "../components/Home/AboutSection";
import ContactSection from "../components/Home/ContactSection";
import HeroSection from "../components/Home/HeroSection";
import PreviewSection from "../components/Home/PreviewSection";

const Home = () => {
  return (
    <>
      <main className="container mx-auto px-4 sm:px-6 lg:px-8">
        <HeroSection />
        <PreviewSection />
        <AboutSection />
        <ContactSection />
      </main>
    </>
  );
};

export default Home;
