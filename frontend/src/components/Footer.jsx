import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-section">
          <h2>AI Real Estate</h2>
          <p>
            Helping you find your dream home with AI-powered recommendations.
          </p>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <p><Link to="/">Home</Link></p>
          <p><Link to="/properties">Properties</Link></p>
          <p><Link to="/service">Services</Link></p>
          <p><Link to="/contact">Contact</Link></p>
        </div>

        <div className="footer-section">
          <h3>Contact</h3>
          <p>📍 Kerala, India</p>
          <p>📞 +91 9497861798</p>
          <p>✉ aiestate@gmail.com</p>
        </div>

      </div>

      <hr />

      <p className="copyright">
        © 2026 AI Real Estate. All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;