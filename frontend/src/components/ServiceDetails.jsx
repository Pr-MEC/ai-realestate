import { useParams, Link } from "react-router-dom";
import "./ServiceDetails.css";

const serviceData = {
  buy: {
    icon: "🏠",
    title: "Buy Properties",
    details:
      "Browse a wide range of verified residential and commercial properties. Filter by location, budget, and property type to find exactly what you're looking for. Every listing includes accurate pricing, images, and key details so you can make an informed decision before scheduling a visit.",
  },
  sell: {
    icon: "🏢",
    title: "Sell Properties",
    details:
      "List your property with detailed descriptions and photos to attract serious buyers. Our platform connects you directly with interested parties through the inquiry system, so you can manage offers and communicate efficiently without middlemen.",
  },
  rent: {
    icon: "🏡",
    title: "Rent Properties",
    details:
      "Find rental homes, apartments, and commercial spaces that match your budget and preferred location. Rental listings are updated regularly, with clear pricing and property status so you always know what's currently available.",
  },
  "ai-recommendation": {
    icon: "🤖",
    title: "AI Property Recommendations",
    details:
      "Tell our AI your preferred location, property type, and budget, and get instant personalized suggestions. The recommendation engine analyzes available listings to highlight the best matches for your specific needs, saving you time searching manually.",
  },
  "location-search": {
    icon: "📍",
    title: "Property Search by Location",
    details:
      "Search properties by city, town, or neighborhood to quickly narrow down your options. Whether you're relocating or investing in a specific area, our location-based search helps you find relevant listings without sifting through irrelevant results.",
  },
  "price-estimation": {
    icon: "💰",
    title: "Property Price Estimation",
    details:
      "Get a clearer sense of fair market value based on listed prices for similar properties in the same area and category. This helps buyers avoid overpaying and helps sellers price their property competitively.",
  },
};

const ServiceDetails = () => {
  const { id } = useParams();
  const service = serviceData[id];

  if (!service) {
    return (
      <div className="service-details-page">
        <p>Service not found.</p>
        <Link to="/service" className="back-link">← Back to Services</Link>
      </div>
    );
  }

  return (
    <div className="service-details-page">
      <div className="service-details-card">
        <div className="service-icon large">{service.icon}</div>
        <h1>{service.title}</h1>
        <p>{service.details}</p>
        <Link to="/service" className="back-link">← Back to Services</Link>
      </div>
    </div>
  );
};

export default ServiceDetails;