import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Search.css";

const SearchBar = () => {
  const navigate = useNavigate();

  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [budget, setBudget] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (location) params.append("location", location);
    if (type) params.append("type", type);
    if (budget) params.append("maxPrice", budget);

    navigate(`/properties?${params.toString()}`);
  };

  return (
    <div className="search-container">
      <h2>Search Properties</h2>

      <div className="search-box">
        <input
          type="text"
          placeholder="Enter Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="">Property Type</option>
          <option value="Apartment">Apartment</option>
          <option value="Villa">Villa</option>
          <option value="House">House</option>
          <option value="Commercial">Commercial</option>
        </select>

        <input
          type="number"
          placeholder="Budget (₹)"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
        />

        <button onClick={handleSearch}>Search</button>
      </div>
    </div>
  );
};

export default SearchBar;