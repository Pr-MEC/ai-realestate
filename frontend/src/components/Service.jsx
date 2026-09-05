import { Link } from "react-router-dom";
import "./Service.css";

const Service = () => {
  const services = [
    {
      id: "buy",
      icon: "🏠",
      title: "Buy Properties",
      description: "Explore verified listings and find the perfect home to purchase.",
    },
    {
      id: "sell",
      icon: "🏢",
      title: "Sell Properties",
      description: "List your property and connect with genuine buyers quickly.",
    },
    {
      id: "rent",
      icon: "🏡",
      title: "Rent Properties",
      description: "Browse rental options that fit your budget and lifestyle.",
    },
    {
      id: "ai-recommendation",
      icon: "🤖",
      title: "AI Property Recommendations",
      description: "Get personalized suggestions powered by AI based on your preferences.",
    },
    {
      id: "location-search",
      icon: "📍",
      title: "Property Search by Location",
      description: "Find properties in your preferred city or neighborhood instantly.",
    },
    {
      id: "price-estimation",
      icon: "💰",
      title: "Property Price Estimation",
      description: "Understand fair market value before you buy, sell, or rent.",
    },
  ];

  return (
    <div className="service-page">
      <h1>Our Services</h1>
      <p className="service-subtitle">
        Everything you need to find, list, or manage your next property.
      </p>

      <div className="service-grid">
        {services.map((service) => (
          <Link
            to={`/service/${service.id}`}
            className="service-card"
            key={service.id}
          >
            <div className="service-icon">{service.icon}</div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Service;