import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

const Signup = () => {
    const [data, setData] = useState({
        firstName: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const url = "http://localhost:5000/api/users";  // Ensure this is the correct URL
        const response = await axios.post(url, data);
        navigate("/userAcc");
        console.log(response.data.message);
    } catch (error) {
        if (error.response && error.response.status >= 400 && error.response.status <= 500) {
            setError(error.response.data.message);
        }
    }
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
                    <ul id="navbar">
                        <li><a className="active" href="/home">Home</a></li>
                        <li><a href="/service">Service</a></li>
                        <li><a href="/aboutUs">About Us</a></li>
                        <li><a href="/login">Login</a></li>
                    </ul>
                </div>
            </nav>
            <div className={styles.signup_container}>
                <div className={styles.signup_form_container}>
                    <div className={styles.left}>
                        <h1>Welcome Back</h1>
                        <Link to="/login">
                            <button type="button" className={styles.white_btn}>
                                Sign in
                            </button>
                        </Link>
                    </div>
                    <div className={styles.right}>
                        <form className={styles.form_container} onSubmit={handleSubmit}>
                            <h1>Create Account</h1>
                            <input
                                type="text"
                                placeholder="First Name"
                                name="firstName"
                                onChange={handleChange}
                                value={data.firstName}
                                required
                                className={styles.input}
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                name="email"
                                onChange={handleChange}
                                value={data.email}
                                required
                                className={styles.input}
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                name="password"
                                onChange={handleChange}
                                value={data.password}
                                required
                                className={styles.input}
                            />
                            {error && <div className={styles.error_msg}>{error}</div>}
                            <button type="submit" className={styles.green_btn}>
                                Sign Up
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Signup;
