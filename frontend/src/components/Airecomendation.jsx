import { useState } from "react";
import { createAiRequest } from "./Api";
import "./Airecomendation.css";

const AIRecommendation = () => {
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [budget, setBudget] = useState("");

  const [result, setResult] = useState(null);
  const [properties, setProperties] = useState([]);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setResult(null);
    setProperties([]);
    setLoading(true);

    /*
    -----------------------------------------
    Create user prompt
    -----------------------------------------
    */

    const prompt = `Find me a ${
      type || "property"
    } in ${
      location || "any location"
    } within a budget of ₹${
      budget || "any amount"
    }`;

    try {
      const response = await createAiRequest({
        prompt,
        location,
        type,
        budget,
      });

      console.log(
        "AI API RESPONSE:",
        response.data
      );

      /*
      -----------------------------------------
      AI response
      -----------------------------------------
      */

      setResult(response.data.data);

      /*
      -----------------------------------------
      Matching properties
      -----------------------------------------
      */

      setProperties(
        response.data.properties || []
      );

    } catch (err) {
      console.error(
        "AI recommendation error:",
        err
      );

      const message =
        err.response?.data?.message ||
        "Failed to get AI recommendation. Please try again.";

      setError(message);

    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="ai-section">

      <h2>AI Property Recommendation</h2>

      <p>
        Enter your preferences and let AI
        recommend the perfect property for you.
      </p>


      {/* ======================================
          SEARCH FORM
      ====================================== */}

      <form
        className="ai-form"
        onSubmit={handleSubmit}
      >

        {/* LOCATION */}

        <input
          type="text"
          placeholder="Preferred Location"
          value={location}
          onChange={(e) =>
            setLocation(e.target.value)
          }
        />


        {/* PROPERTY TYPE */}

        <select
          value={type}
          onChange={(e) =>
            setType(e.target.value)
          }
        >
          <option value="">
            Select Property Type
          </option>

          <option value="Apartment">
            Apartment
          </option>

          <option value="Villa">
            Villa
          </option>

          <option value="House">
            House
          </option>

          <option value="Commercial">
            Commercial
          </option>
        </select>


        {/* BUDGET */}

        <input
          type="number"
          placeholder="Budget (₹)"
          value={budget}
          onChange={(e) =>
            setBudget(e.target.value)
          }
          min="0"
        />


        {/* SUBMIT */}

        <button
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Thinking..."
            : "Get AI Recommendation"}
        </button>

      </form>


      {/* ======================================
          ERROR
      ====================================== */}

      {error && (
        <p className="error-text">
          {error}
        </p>
      )}


      {/* ======================================
          AI SUGGESTION
      ====================================== */}

      {result && (
        <div className="ai-result">

          <h3>AI Suggestion</h3>

          <p>
            {result.response}
          </p>

        </div>
      )}


      {/* ======================================
          RECOMMENDED PROPERTIES
      ====================================== */}

      {properties.length > 0 && (
        <div className="ai-properties">

          <h3>
            Recommended Properties
          </h3>

          <div className="property-grid">

            {properties.map((property) => (

              <div
                className="property-card"
                key={property._id}
              >

                {/* IMAGE */}

                {property.images &&
                  property.images.length > 0 && (

                    <img
                      src={property.images[0]}
                      alt={property.title}
                      className="property-image"
                    />

                  )}


                {/* PROPERTY INFORMATION */}

                <div className="property-info">

                  <h4>
                    {property.title}
                  </h4>


                  <p>
                    <strong>
                      Type:
                    </strong>{" "}
                    {property.type}
                  </p>


                  <p>
                    <strong>
                      Location:
                    </strong>{" "}
                    {property.location}
                  </p>


                  <p>
                    <strong>
                      Price:
                    </strong>{" "}
                    ₹
                    {Number(
                      property.price
                    ).toLocaleString("en-IN")}
                  </p>


                  <p>
                    <strong>
                      Bedrooms:
                    </strong>{" "}
                    {property.bedrooms || 0}
                  </p>


                  <p>
                    <strong>
                      Bathrooms:
                    </strong>{" "}
                    {property.bathrooms || 0}
                  </p>


                  {property.area && (
                    <p>
                      <strong>
                        Area:
                      </strong>{" "}
                      {property.area} sqft
                    </p>
                  )}


                  <p>
                    <strong>
                      Status:
                    </strong>{" "}
                    {property.status}
                  </p>


                  {property.description && (
                    <p className="property-description">
                      {property.description}
                    </p>
                  )}

                </div>

              </div>

            ))}

          </div>

        </div>
      )}


      {/* ======================================
          NO RESULTS
      ====================================== */}

      {result &&
        properties.length === 0 && (
          <div className="no-properties">

            <h3>
              No Matching Properties
            </h3>

            <p>
              We couldn't find a property
              matching your location, type,
              and budget.
            </p>

          </div>
        )}

    </section>
  );
};

export default AIRecommendation;
