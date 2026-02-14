import Hero from "../components/Hero";
import ServicesSection from "../components/ServicesSection";
import Footer from "../components/Footer";
import Feature from "../components/FeatureSection";
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
