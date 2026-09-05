import { useNavigate } from "react-router-dom";
import hero from "../assets/hero.png";
import "./Hero.css";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="hero">
      <div className="hero-left">
        <span className="hero-badge">✨ AI-Powered Real Estate</span>
        <h1>Find Your Dream Home with AI</h1>
        <p>
          Discover the best properties, compare prices, and get AI-powered
          recommendations based on your needs.
        </p>
        <button onClick={() => navigate("/properties")}>
          Explore Properties
        </button>
      </div>

      <div className="hero-right">
        <img src={hero} alt="Hero" />
      </div>
    </section>
  );
};

export default Hero;