import React, { useState, useEffect } from "react";
import { loginUser } from "../services/auth";
import { useNavigate, Link } from "react-router-dom";

function Login() {
    const navigate = useNavigate();


    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    useEffect(() => {
        const token = localStorage.getItem("access_token");

        if (token) {
            navigate("/dashboard");
        }
    }, [navigate]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,

        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await loginUser(formData);
            console.log(response.data);

            localStorage.setItem(
                "access_token",
                response.data.access
            );

            localStorage.setItem(
                "refresh_token",
                response.data.refresh
            );

            alert("Login Successful!");
            navigate("/dashboard");

        } catch (error) {
            console.error(error);
            alert("Invalid Credentials");
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">


                <h2>Login</h2>

                <form onSubmit={handleSubmit}>

                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
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
                        Login
                    </button>

                </form>

                <div style={{ marginTop: "20px" }}>

                    <p>
                        New User?{" "}
                        <Link to="/register">
                            Create Account
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

export default Login;