import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import About from "./components/About";
import Innovations from "./components/Innovations";
import WhyChooseUs from "./components/WhyChooseUs";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <About />
      <Innovations />
      <WhyChooseUs />
      <Contact />
      <Footer />
    </main>
  );
}
