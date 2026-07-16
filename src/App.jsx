import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "../context/ThemeProvider";
import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { About } from "../components/About";
import { Services } from "../components/Services";
import { Industries } from "../components/Industries";
import { Methodology } from "../components/Methodology";
import { Resources } from "../components/Resources";
import { Events } from "../components/Events";
import { Equibudx } from "../components/Equibudx";
import { Team } from "../components/Team";
import { Advisors } from "../components/Advisors";
import { Contact } from "../components/Contact";
import { Footer } from "../components/Footer";
import { Toaster } from "../components/ui/sonner";
import { BlogPage } from "../components/BlogPage";
import { CaseStudyPage } from "../components/CaseStudyPage";
import { ServicePage } from "../components/ServicePage";

import { useEffect } from "react";

const HomePage = ({ scrollTarget }) => {
  useEffect(() => {
    if (scrollTarget) {
      const element = document.getElementById(scrollTarget);
      if (element) {
        const timer = setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 150);
        return () => clearTimeout(timer);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [scrollTarget]);

  return (
    <>
      <Hero />
      <About />
      <Services />
      <Industries />
      <Methodology />
      <Resources />
      <Events />
      <Equibudx />
      <Team />
      {/* <Advisors /> */}
      <Contact />
    </>
  );
};

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="App min-h-screen bg-background text-foreground">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<HomePage scrollTarget="about" />} />
              <Route path="/services" element={<HomePage scrollTarget="services" />} />
              <Route path="/services/:id" element={<ServicePage />} />
              <Route path="/industries" element={<HomePage scrollTarget="industries" />} />
              <Route path="/methodology" element={<HomePage scrollTarget="methodology" />} />
              <Route path="/resources" element={<HomePage scrollTarget="resources" />} />
              <Route path="/events" element={<HomePage scrollTarget="events" />} />
              <Route path="/equibudx" element={<HomePage scrollTarget="equibudx" />} />
              <Route path="/team" element={<HomePage scrollTarget="team" />} />
              <Route path="/advisors" element={<HomePage scrollTarget="advisors" />} />
              <Route path="/contact" element={<HomePage scrollTarget="contact" />} />
              <Route path="/blog/:id" element={<BlogPage />} />
              <Route path="/case-study/:id" element={<CaseStudyPage />} />
            </Routes>
          </main>
          <Footer />
          <Toaster />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;

