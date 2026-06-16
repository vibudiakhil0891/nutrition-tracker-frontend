import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar">

            <div className="logo">
                FitAI
            </div>

            <ul className="nav-links">

                <li>
                    <Link to="/">Home</Link>
                </li>

                <li>
                    <Link to="#features">Features</Link>
                </li>

                <li>
                    <Link to="#pricing">Pricing</Link>
                </li>

                <li>
                    <Link to="/login">Login</Link>
                </li>

                <li>
                    <Link to="/register">Register</Link>
                </li>
                <li>
                    <Link to="/foods">Foods</Link>
                </li>
                <li><Link to="/tracker">Food Tracker</Link></li>

            </ul>

        </nav>
    );
}

export default Navbar;