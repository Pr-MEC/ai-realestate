import { Link } from "react-router-dom";
import "./Propertycard.css";

const Propertycard = ({ property }) => {
  const {
    _id,
    title,
    type,
    price,
    location,
    bedrooms,
    bathrooms,
    area,
    images,
    status,
  } = property;

  const imageUrl =
    images && images.length > 0
      ? images[0]
      : "https://www.classichomes.in/villas-for-sale-in-kochi";

  return (
    <div className="property-card">
      <img
        src={imageUrl}
        alt={title}
        className="property-image"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "https://www.classichomes.in/villas-for-sale-in-kochi";
        }}
      />

      <div className="property-info">
        <h3>{title}</h3>
        <p className="property-location">{location}</p>
        <p className="property-price">₹{price.toLocaleString()}</p>

        <div className="property-details">
          <span>{type}</span>
          {bedrooms > 0 && <span>{bedrooms} Bed</span>}
          {bathrooms > 0 && <span>{bathrooms} Bath</span>}
          {area && <span>{area} sqft</span>}
        </div>

        <span className={`property-status status-${status?.toLowerCase()}`}>
          {status}
        </span>

        <Link to={`/property-details/${_id}`} className="view-details-btn">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default Propertycard;