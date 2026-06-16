import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Footer from "../components/Footer";

import "../styles/Home.css";

function Home() {
    return (
        <>
            <Navbar />
            <Hero />
            <Features />
            <Footer />
        </>
    );
}

export default Home;