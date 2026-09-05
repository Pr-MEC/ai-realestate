import { useState } from "react";
import { submitInquiry } from "./Api";

const InquiryForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSubmitting(true);

    try {
      await submitInquiry(formData);
      setSuccess("Your inquiry has been submitted. We'll get back to you soon!");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      const message =
        err.response?.data?.message || "Failed to submit inquiry. Please try again.";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="inquiry-section">
      <h2>Send an Inquiry</h2>

      <p>Interested in a property? Fill out the form below.</p>

      {success && <p className="success-text">{success}</p>}
      {error && <p className="error-text">{error}</p>}

      <form className="inquiry-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <textarea
          name="message"
          rows="5"
          placeholder="Write your message..."
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>

        <button type="submit" disabled={submitting}>
          {submitting ? "Submitting..." : "Submit Inquiry"}
        </button>
      </form>
    </section>
  );
};

export default InquiryForm;