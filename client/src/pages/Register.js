import React, { useState } from "react";
import { registerUser } from "../services/api";
import { useNavigate } from "react-router-dom";
import "../register.css"  // ✅ Import new CSS

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await registerUser(formData);
            console.log("User registered:", response);
            navigate("/login");
        } catch (error) {
            setError("Registration failed. Try again.");
        }
    };

    return (
        <div className="register-container">
            <div className="register-box">
                <h2 className="register-title">Register</h2>
                {error && <p className="register-error">{error}</p>}
                <form onSubmit={handleSubmit} className="register-form">
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Full Name"
                        className="register-input"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        className="register-input"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        className="register-input"
                        required
                    />
                    <button type="submit" className="register-button">
                        Register
                    </button>
                </form>
                <p className="register-link">
                    Already have an account?{" "}
                    <a href="/login">Login</a>
                </p>
            </div>
        </div>
    );
};

export default Register;
