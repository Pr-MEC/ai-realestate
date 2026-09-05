import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getProperties } from "./Api";
import Propertycard from "./Propertycard";
import "./Propertylist.css";

const PropertyList = () => {
  const [searchParams] = useSearchParams();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const filters = {
          location: searchParams.get("location") || undefined,
          type: searchParams.get("type") || undefined,
          maxPrice: searchParams.get("maxPrice") || undefined,
        };
        const response = await getProperties(filters);
        setProperties(response.data.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load properties. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [searchParams]);

  if (loading) return <p className="loading-text">Loading properties...</p>;
  if (error) return <p className="error-text">{error}</p>;
  if (properties.length === 0) return <p className="empty-text">No properties found.</p>;

  return (
    <div className="property-list">
      {properties.map((property) => (
        <Propertycard key={property._id} property={property} />
      ))}
    </div>
  );
};

export default PropertyList;