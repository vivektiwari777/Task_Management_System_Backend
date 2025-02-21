import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav style={{ padding: "10px", background: "#282c34", color: "white" }}>
            <h2>Task Manager</h2>
            <Link to="/dashboard" style={{ margin: "0 10px", color: "white" }}>
                Dashboard
            </Link>
            <Link to="/login" style={{ color: "white" }}>Logout</Link>
        </nav>
    );
};

export default Navbar;
