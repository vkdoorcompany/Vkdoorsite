/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Manifesto from './components/Manifesto';
import Industries from './components/Industries';
import { Workflow, About, Contact, Footer } from './components/Sections';
import ContactPage from './components/ContactPage';

import AboutPage from './components/AboutPage';
import LookbookPage from './components/LookbookPage';
import LookbookSlider from './components/LookbookSlider';
import { AdminProvider } from './context/AdminContext';
import AdminPinModal from './components/AdminPinModal';

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

function Home() {
  return (
    <>
      <Hero />
      <Manifesto />
      <Industries />
      <Workflow />
      <About />
      <Contact />
    </>
  );
}

export default function App() {
  return (
    <AdminProvider>
      <Router>
        <ScrollToTop />
        <main className="font-sans relative selection:bg-brand selection:text-white">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/lookbook" element={<LookbookPage />} />
          </Routes>
          <Footer />
        </main>
        <AdminPinModal />
      </Router>
    </AdminProvider>
  );
}
