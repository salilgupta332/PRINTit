import Hero from "../components/landing/Hero";
import ServicesSection from "../components/landing/ServicesSection";
import Footer from "../components/landing/Footer";
import Feature from "../components/landing/FeatureSection";
function Home() {
  return (
    <>
      <Hero />
      <Feature />
      <ServicesSection />
      <Footer />
      {/* Next sections later */}
    </>
  );
}

export default Home;
