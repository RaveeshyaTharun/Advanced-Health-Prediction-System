import { Component } from "react";
import "./NavbarStyles.css";
import heroImage from '../../Assets/hero-health.jpg'; // Adjust the path to your image
import heartIcon from '../../Assets/heartIco.png'; // Replace with actual path for heart disease
import diabetesIcon from '../../Assets/diabetesIco.png'; // Replace with actual path for diabetes
import consultationIcon from '../../Assets/consultationIco.jpg'; // General consultation icon

class Home extends Component {
  state = { clicked: false };

  handleClick = () => {
    this.setState({ clicked: !this.state.clicked });
  };

  render() {
    return (
      <>
        <header>
          <nav className="navbar">
            <a href="#" className="logo">HealthPredict</a>
            <div className="menu-icon" onClick={this.handleClick}>
              <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
            </div>
            <ul id="navbar" className={this.state.clicked ? "navbar active" : "navbar"}>
              <li><a className="active" href="/home">Home</a></li>
              <li><a href="/service">Service</a></li>
              <li><a href="/AboutUs">About Us</a></li>
              
            </ul>
          </nav>
        </header>

        <section className="hero">
          <div className="hero-content">
            <h1>Predict Your Health Risks Today</h1>
            <p>Advanced tools for heart disease and diabetes prediction.</p>
            <a href="/login" className="btn-primary">Login</a>
          </div>
        </section>

        <section className="services">
          <div className="service-card">
            <img src={heartIcon} alt="Heart Disease Prediction" />
            <h3>Heart Disease Prediction</h3>
            <p>Evaluate your risk of heart disease with our state-of-the-art prediction models.</p>
          </div>
          <div className="service-card">
            <img src={diabetesIcon} alt="Diabetes Prediction" />
            <h3>Diabetes Prediction</h3>
            <p>Identify your risk of developing diabetes and get personalized health recommendations.</p>
          </div>
          <div className="service-card">
            <img src={consultationIcon} alt="Consultation" />
            <h3>Consultation and Support</h3>
            <p>Access expert advice and resources to manage your health effectively.</p>
          </div>
        </section>
      </>
    );
  }
}

export default Home;