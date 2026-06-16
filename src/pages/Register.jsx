import React, { useState } from "react";
import { registerUser } from "../services/auth";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Auth.css";
function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await registerUser(formData);

            alert("Registration Successful!");

            navigate("/login");

        } catch (error) {

            console.log(error.response?.data);

            alert("Registration Failed!");
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">

                <h2>Create Account</h2>

                <form onSubmit={handleSubmit}>

                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                    />

                    <button type="submit">
                        Register
                    </button>

                </form>

                <div style={{ marginTop: "20px" }}>

                    <p>
                        Already have an account?{" "}
                        <Link to="/login">
                            Login
                        </Link>
                    </p>

                    <p style={{ marginTop: "10px" }}>
                        <Link to="/">
                            ← Back to Home
                        </Link>
                    </p>

                </div>

            </div>
        </div>
    );
}

export default Register;