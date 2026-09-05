import "./About.css";

const About = () => {
  return (
    <div className="about-page">
      <section className="about-hero">
        <h1>About AI Real Estate</h1>
        <p>
          We're on a mission to make finding your dream home simpler, faster,
          and smarter — powered by AI and built for real people.
        </p>
      </section>

      <section className="about-content">
        <div className="about-text">
          <h2>Who We Are</h2>
          <p>
            AI Real Estate connects buyers, sellers, and renters through a
            single platform built on transparency and technology. Whether
            you're searching for your first home or listing a property to
            sell, we make the process straightforward and stress-free.
          </p>
        </div>
        <img
          src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600"
          alt="Modern home"
        />
      </section>

      <section className="about-content reverse">
        <div className="about-text">
          <h2>Our Mission</h2>
          <p>
            We believe finding a home shouldn't be overwhelming. By combining
            verified listings with AI-powered recommendations, we help you
            discover properties that genuinely match your needs — not just
            what fits a generic filter.
          </p>
        </div>
        <img
          src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600"
          alt="Team working"
        />
      </section>

      <section className="about-values">
        <h2>What We Stand For</h2>
        <div className="values-grid">
          <div className="value-card">
            <div className="value-icon">🔍</div>
            <h3>Transparency</h3>
            <p>Clear pricing and accurate listings, always.</p>
          </div>
          <div className="value-card">
            <div className="value-icon">🤖</div>
            <h3>Innovation</h3>
            <p>AI-driven matching that actually understands your needs.</p>
          </div>
          <div className="value-card">
            <div className="value-icon">🤝</div>
            <h3>Trust</h3>
            <p>Genuine support from browsing to closing the deal.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;