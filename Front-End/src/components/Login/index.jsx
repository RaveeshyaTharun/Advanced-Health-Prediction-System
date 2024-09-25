// import React, { useState } from "react";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";
// import styles from "./styles.module.css";

// function Login() {
//     const [formData, setFormData] = useState({
//         email: '',
//         password: ''
//     });

//     const [error, setError] = useState('');
//     const navigate = useNavigate();

//     const handleChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             if (formData.email === 'admin@gmail.com' && formData.password === 'admin') {
//                 navigate('/admin');
//             } else {
//                 const response = await axios.post('http://localhost:5000/api/auth', formData);
            
//                 localStorage.setItem('email', response.data.email);
//                 alert('Login successful');
//                 navigate('/userAcc');
//             }
//         } catch (error) {
//             setError('Invalid credentials');
//         }
//     }
//     return (
//         <>
//             <nav>
//                 <a href="#">
//                     <svg id="logo-15"
//                         width="49"
//                         height="48"
//                         viewBox="0 0 49 48"
//                         fill="none"
//                         xmlns="http://www.w3.org/2000/svg">
//                         <path d="M24.5 12.75C24.5 18.9632 19.4632 24 13.25 24H2V12.75C2 6.53679 7.03679 1.5 13.25 1.5C19.4632 1.5 24.5 6.53679 24.5 12.75Z" fill="#17CF97"></path>
//                         <path d="M24.5 35.25C24.5 29.0368 29.5368 24 35.75 24H47V35.25C47 41.4632 41.9632 46.5 35.75 46.5C29.5368 46.5 24.5 41.4632 24.5 35.25Z" fill="#17CF97"></path>
//                         <path d="M2 35.25C2 41.4632 7.03679 46.5 13.25 46.5H24.5V35.25C24.5 29.0368 19.4632 24 13.25 24C7.03679 24 2 29.0368 2 35.25Z" fill="#17CF97"></path>
//                         <path d="M47 12.75C47 6.53679 41.9632 1.5 35.75 1.5H24.5V12.75C24.5 18.9632 29.5368 24 35.75 24C41.9632 24 47 18.9632 47 12.75Z" fill="#17CF97"></path>
//                     </svg>
//                 </a>
//                 <div>
//                     <ul id="navbar">
//                         <li><a className="active" href="/home">Home</a></li>
//                         <li><a href="/service">Service</a></li>
//                         <li><a href="/aboutUs#">About Us</a></li>
//                         <li><a href="/signup">Sign Up</a></li>
//                     </ul>
//                 </div>
//             </nav>

//             <div className={styles.login_container}>
//                 <div className={styles.login_form_container}>
//                     <div className={styles.left}>
//                         <form className={styles.form_container} onSubmit={handleSubmit}>
//                             <h1>Login to Your Account</h1>
//                             <input
//                                 type="email"
//                                 placeholder="Email"
//                                 name="email"
//                                 onChange={handleChange}
//                                 value={data.email}
//                                 required
//                                 className={styles.input}
//                             />
//                             <input
//                                 type="password"
//                                 placeholder="Password"
//                                 name="password"
//                                 onChange={handleChange}
//                                 value={data.password}
//                                 required
//                                 className={styles.input}
//                             />
//                             {error && <div className={styles.error_msg}>{error}</div>}
//                             <button type="submit" className={styles.green_btn}>
//                                 Sign In
//                             </button>
//                         </form>
//                     </div>
//                     <div className={styles.right}>
//                         <h1>New Here?</h1>
//                         <Link to="/signup">
//                             <button type="button" className={styles.white_btn}>
//                                 Sign Up
//                             </button>
//                         </Link>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default Login;
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (formData.email === 'admin@gmail.com' && formData.password === 'admin') {
                navigate('/admin');
            } else {
                const response = await axios.post('http://localhost:5000/api/auth', formData);
            
                localStorage.setItem('email', response.data.email);
                navigate('/userAcc');
                // alert('Login successful');
               
            }
        } catch (error) {
            setError('Invalid credentials');
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
                        <li><a href="/aboutUs#">About Us</a></li>
                        <li><a href="/signup">Sign Up</a></li>
                    </ul>
                </div>
            </nav>

            <div className={styles.login_container}>
                <div className={styles.login_form_container}>
                    <div className={styles.left}>
                        <form className={styles.form_container} onSubmit={handleSubmit}>
                            <h1>Login to Your Account</h1>
                            <input
                                type="email"
                                placeholder="Email"
                                name="email"
                                onChange={handleChange}
                                value={formData.email}
                                required
                                className={styles.input}
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                name="password"
                                onChange={handleChange}
                                value={formData.password}
                                required
                                className={styles.input}
                            />
                            {error && <div className={styles.error_msg}>{error}</div>}
                            <button type="submit" className={styles.green_btn}>
                                Sign In
                            </button>
                        </form>
                    </div>
                    <div className={styles.right}>
                        <h1>New Here?</h1>
                        <Link to="/signup">
                            <button type="button" className={styles.white_btn}>
                                Sign Up
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;


