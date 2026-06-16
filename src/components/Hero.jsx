import { Link } from "react-router-dom";

function Hero() {
    return (
        <section className="hero">

            <div className="hero-left">

                <h1>
                    AI Powered
                    Calorie Tracker
                </h1>

                <p>
                    Calculate calories,
                    generate diet plans,
                    and get AI nutrition advice.
                </p>

                <Link to="/register">
                    <button className="hero-btn">
                        Get Started
                    </button>
                </Link>

            </div>

            <div className="hero-right">
                <img
                    src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438"
                    alt="fitness"
                />
            </div>

        </section>
    );
}

export default Hero;