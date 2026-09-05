
import Hero from "./Hero";
import SearchBar from "./Search";
import AIRecommendation from "./Airecomendation";
import PropertyList from "./Propertylist";
import "./Home.css";

const Home = () => {
  const features = [
    {
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500",
      title: "Verified Listings",
      text: "Every property is checked for accuracy before it goes live.",
    },
    {
      image: "https://images.unsplash.com/photo-1518依-... ",
      title: "placeholder",
      text: "placeholder",
    },
  ];

  return (
    <div className="home-page">
      <Hero />
      <SearchBar />
      <AIRecommendation />

      <section className="why-us">
        <h2>Why Choose Us</h2>
        <div className="why-us-grid">
          <div className="why-us-card">
            <img
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500"
              alt="Verified Listings"
            />
            <h3>Verified Listings</h3>
            <p>Every property is checked for accuracy before it goes live.</p>
          </div>

          <div className="why-us-card">
            <img
              src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=500"
              alt="AI Recommendations"
            />
            <h3>AI-Powered Matching</h3>
            <p>Get personalized property suggestions based on your needs.</p>
          </div>

          <div className="why-us-card">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500"
              alt="Trusted Support"
            />
            <h3>Trusted Support</h3>
            <p>Reach out anytime — our team is here to help you find the right fit.</p>
          </div>
        </div>
      </section>

      <PropertyList />
    </div>
  );
};

export default Home;