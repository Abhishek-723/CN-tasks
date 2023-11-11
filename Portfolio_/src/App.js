import "./App.css";
import Navbar from "./Components/Navbar";
import Intro from "./Components/Intro";
import ServicesSection from "./Components/ServicesSection";
import Experience from "./Components/Experience";
import Portfolio from "./Components/Portfolio";
import ContactSection from "./Components/Contact";
import Footer from "./Components/Footer";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Intro />
      <ServicesSection />
      <Experience />
      <Portfolio />
      <ContactSection />
      <Footer />
    </div>
  );
}

export default App;
