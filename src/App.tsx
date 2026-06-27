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
  useEffect(() => {
    // Disable right-click (context menu) to block saving images and general options
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    // Disable text selection copy and cut actions
    const handleCopy = (e: Event) => {
      e.preventDefault();
    };
    const handleCut = (e: Event) => {
      e.preventDefault();
    };

    // Disable dragging of any image elements
    const handleDragStart = (e: DragEvent) => {
      const target = e.target as HTMLElement;
      if (target && target.tagName === "IMG") {
        e.preventDefault();
      }
    };

    // Disable key shortcuts: Ctrl+C, Ctrl+X, Ctrl+S, Ctrl+U, F12, Ctrl+Shift+I (inspect)
    const handleKeyDown = (e: KeyboardEvent) => {
      const isCtrl = e.ctrlKey || e.metaKey;
      const key = e.key.toLowerCase();
      if (
        (isCtrl && ["c", "x", "s", "u"].includes(key)) ||
        (isCtrl && e.shiftKey && ["i", "j", "c"].includes(key)) ||
        e.key === "F12"
      ) {
        e.preventDefault();
      }
    };

    // Disable pinch-to-zoom gestures (multitouch zoom) on mobile browsers
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };

    // Disable pinch-to-zoom gesture on iOS Safari
    const handleGestureStart = (e: Event) => {
      e.preventDefault();
    };

    // Add listeners
    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("copy", handleCopy);
    document.addEventListener("cut", handleCut);
    document.addEventListener("dragstart", handleDragStart);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("touchstart", handleTouchStart, { passive: false });
    document.addEventListener("gesturestart", handleGestureStart);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("copy", handleCopy);
      document.removeEventListener("cut", handleCut);
      document.removeEventListener("dragstart", handleDragStart);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("gesturestart", handleGestureStart);
    };
  }, []);

  return (
    <AdminProvider>
      <Router>
        <ScrollToTop />
        <main className="font-sans relative selection:bg-brand selection:text-white bg-bg min-h-screen flex flex-col overflow-x-hidden">
          <Navbar />
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/lookbook" element={<LookbookPage />} />
            </Routes>
          </div>
          <Footer />
        </main>
        <AdminPinModal />
      </Router>
    </AdminProvider>
  );
}
