
      import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPropertyById, submitInquiry } from "./Api";
import "./PropertyDetails.css";

const PropertyDetails = () => {
  const { id } = useParams();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [inquiryData, setInquiryData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [inquirySuccess, setInquirySuccess] = useState("");
  const [inquiryError, setInquiryError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await getPropertyById(id);
        setProperty(response.data.data);
      } catch (err) {
        console.error(err);
        setError("Property not found.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  const handleChange = (e) => {
    setInquiryData({ ...inquiryData, [e.target.name]: e.target.value });
  };

  const handleInquirySubmit = async (e) => {
    e.preventDefault();
    setInquiryError("");
    setInquirySuccess("");
    setSubmitting(true);

    try {
      await submitInquiry({ ...inquiryData, propertyId: id });
      setInquirySuccess("Your inquiry has been submitted!");
      setInquiryData({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      const message =
        err.response?.data?.message || "Failed to submit inquiry. Please try again.";
      setInquiryError(message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p className="loading-text">Loading property...</p>;
  if (error) return <p className="error-text">{error}</p>;
  if (!property) return null;

  const {
    title,
    type,
    price,
    location,
    bedrooms,
    bathrooms,
    area,
    description,
    images,
    status,
  } = property;

  const imageUrl =
    images && images.length > 0
      ? images[0]
      : "https://www.classichomes.in/villas-for-sale-in-kochi";

  return (
    <div className="property-details-container">
      <div className="property-details-main">
        <img
          src={imageUrl}
          alt={title}
          className="property-details-image"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://www.classichomes.in/villas-for-sale-in-kochi";
          }}
        />

        <div className="property-details-header">
          <h2>{title}</h2>
          <span className={`property-status status-${status?.toLowerCase()}`}>
            {status}
          </span>
        </div>

        <p className="property-location">📍 {location}</p>
        <p className="property-price">₹{price.toLocaleString()}</p>

        <div className="property-meta">
          <span>{type}</span>
          {bedrooms > 0 && <span>{bedrooms} Bed</span>}
          {bathrooms > 0 && <span>{bathrooms} Bath</span>}
          {area && <span>{area} sqft</span>}
        </div>

        {description && <p className="property-description">{description}</p>}
      </div>

      <div className="inquiry-box">
        <h3>Interested in this property?</h3>

        {inquirySuccess && <p className="success-text">{inquirySuccess}</p>}
        {inquiryError && <p className="error-text">{inquiryError}</p>}

        <form onSubmit={handleInquirySubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={inquiryData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={inquiryData.email}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Your Phone"
            value={inquiryData.phone}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={inquiryData.message}
            onChange={handleChange}
            required
          />
          <button type="submit" disabled={submitting}>
            {submitting ? "Sending..." : "Send Inquiry"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PropertyDetails;