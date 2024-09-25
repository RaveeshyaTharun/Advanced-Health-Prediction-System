import React, { useState } from 'react';
import './ServicePage.css'; // Import your CSS file

const ServicePage = () => {
    const [clicked, setClicked] = useState(false);

    const handleClick = () => {
        setClicked(!clicked);
    };

    return (
        <>
            <nav>
                <a href="#">
                    <svg xmlns="#" 
	                    width="40"
	                     height="40" fill="none" 
	                    viewBox="0 0 40 40">
	                    <path fill="#F06225" d="M20 0c11.046 0 20 8.954 20 20v14a6 6 0 0 1-6 6H21v-8.774c0-2.002.122-4.076 1.172-5.78a10 10 0 0 1 6.904-4.627l.383-.062a.8.8 0 0 0 0-1.514l-.383-.062a10 10 0 0 1-8.257-8.257l-.062-.383a.8.8 0 0 0-1.514 0l-.062.383a9.999 9.999 0 0 1-4.627 6.904C12.85 18.878 10.776 19 8.774 19H.024C.547 8.419 9.29 0 20 0Z"></path>
	                    <path fill="#F06225" d="M0 21h8.774c2.002 0 4.076.122 5.78 1.172a10.02 10.02 0 0 1 3.274 3.274C18.878 27.15 19 29.224 19 31.226V40H6a6 6 0 0 1-6-6V21ZM40 2a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"></path>
                    </svg>
                </a>
                <div>
                    <ul id="navbar" className={clicked ? "active" : ""}>
                        <li><a href="/home">Home</a></li>
                        <li><a className="active" href="#r">Services</a></li>
                        <li><a href="/aboutUs">About Us</a></li>
                        <li><a href="/login">Login</a></li>
                    </ul>
                </div>
                <div id="mobile" onClick={handleClick}>
                    <i id="bar" className={clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
                </div>
            </nav>
            <div className="service-page">
                <header className="service-header">
                    <h1>Health Prediction Services</h1>
                </header>

                <section className="service-overview">
                    <h2>Overview</h2>
                    <p>
                        Our advanced health prediction services provide insights into the risk of heart disease and diabetes. Using state-of-the-art machine learning algorithms, our system evaluates key health metrics to help you take proactive steps towards managing your health.
                    </p>
                </section>

                <section className="service-technology">
                    <h2>Technology Used</h2>
                    <p>
                        We utilize cutting-edge technologies including LightGBM, TensorFlow, and advanced data analytics to deliver precise and personalized health predictions. Our models are designed to adapt to a wide range of health data, ensuring robust and reliable predictions.
                    </p>
                </section>

                <section className="service-features">
                    <h2>Features</h2>
                    <div className="feature-list">
                        <div className="feature-item">
                            <i className="fas fa-heartbeat"></i>
                            <h3>Heart Disease Prediction</h3>
                            <p>Assess your risk of heart disease with accurate predictions based on critical health indicators like blood pressure and cholesterol levels.</p>
                        </div>
                        <div className="feature-item">
                            <i className="fas fa-tint"></i>
                            <h3>Diabetes Prediction</h3>
                            <p>Identify your risk of developing diabetes through comprehensive analysis of key factors such as glucose levels and family history.</p>
                        </div>
                        <div className="feature-item">
                            <i className="fas fa-chart-line"></i>
                            <h3>Personalized Health Insights</h3>
                            <p>Receive customized recommendations based on your unique health profile, empowering you to make informed decisions.</p>
                        </div>
                        <div className="feature-item">
                            <i className="fas fa-sync-alt"></i>
                            <h3>Real-Time Analysis</h3>
                            <p>Get immediate results from your health data, allowing for prompt action and consultation with healthcare professionals.</p>
                        </div>
                        <div className="feature-item">
                            <i className="fas fa-cogs"></i>
                            <h3>Adaptive Learning Models</h3>
                            <p>Our models continuously learn and improve from new data, ensuring the most current and accurate predictions.</p>
                        </div>
                        <div className="feature-item">
                            <i className="fas fa-user-cog"></i>
                            <h3>User-friendly Interface</h3>
                            <p>Navigate our system effortlessly with an intuitive interface designed for users of all backgrounds and tech-savviness.</p>
                        </div>
                        <div className="feature-item">
                            <i className="fas fa-wrench"></i>
                            <h3>Customizable Settings</h3>
                            <p>Adjust the system settings to suit your specific needs, including preferred notification methods and data input formats.</p>
                        </div>
                        <div className="feature-item">
                            <i className="fas fa-shield-alt"></i>
                            <h3>Data Privacy and Security</h3>
                            <p>Your health data is securely processed and stored, with strict measures in place to protect your privacy.</p>
                        </div>
                    </div>
                </section>

                <section className="service-use-cases">
                    <h2>Use Cases</h2>
                    <p>
                        Our prediction services are ideal for individuals seeking proactive health management, healthcare providers looking for advanced diagnostic tools, and wellness programs aiming to offer personalized health insights. Whether for personal use or professional application, our services can enhance decision-making and promote better health outcomes.
                    </p>
                </section>

                <section className="service-customization">
                    <h2>Customization</h2>
                    <p>
                        We offer customizable solutions to fit specific requirements, whether you're integrating with electronic health records, developing a mobile health app, or need tailored predictive models for a particular demographic.
                    </p>
                </section>

                <section className="service-support">
                    <h2>Support and Maintenance</h2>
                    <p>
                        Our dedicated support team provides ongoing maintenance and updates to keep the system running smoothly and accurately. We are committed to continuously enhancing our models to reflect the latest medical research and technological advancements.
                    </p>
                </section>
            </div>
        </>
    );
}

export default ServicePage;