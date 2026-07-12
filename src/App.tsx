/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { ContactModal } from "./components/ContactModal";

// Import new modular page assemblies
import { Home } from "./pages/Home";
import { AboutUs } from "./pages/AboutUs";
import { Services } from "./pages/Services";
import { Services as ServicesOverview } from "./pages/Single-service-page";
import { LifeAtAnalyticsClouds } from "./pages/LifeAtAnalyticsClouds";
import { Blog } from "./pages/Blog";
import { Contact } from "./pages/Contact";
import { TermsOfService } from "./pages/TermsOfService";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { WebDesignDevelopment } from "./pages/WebDesignDevelopment";
import { Seo } from "./pages/Seo";
import { GoogleAds } from "./pages/GoogleAds";
import { PerformanceMarketing } from "./pages/PerformanceMarketing";
import { EmailMarketing } from "./pages/EmailMarketing";
import { SmsMarketing } from "./pages/SmsMarketing";
import { DisplayNativeAds } from "./pages/DisplayNativeAds";

export default function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  const handleOpenContact = () => {
    setIsContactOpen(true);
  };

  const handleCloseContact = () => {
    setIsContactOpen(false);
  };

  return (
    <Router>
      <div className="relative min-h-screen bg-white text-gray-800 font-sans antialiased selection:bg-[#FE7146] selection:text-white flex flex-col justify-between">
        <div>
          {/* Global Sticky Navigation bar */}
          <Navbar onContactClick={handleOpenContact} />

          {/* Dynamic page routes */}
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home onContactClick={handleOpenContact} />} />
              <Route path="/about-us" element={<AboutUs onContactClick={handleOpenContact} />} />
              <Route path="/social-media-marketing" element={<Services onContactClick={handleOpenContact} />} />
              {/* Services overview page */}
              <Route path="/services" element={<ServicesOverview onContactClick={handleOpenContact} />} />
              <Route path="/web-design-development" element={<WebDesignDevelopment onContactClick={handleOpenContact} />} />
              <Route path="/seo" element={<Seo onContactClick={handleOpenContact} />} />
              <Route path="/google-ads" element={<GoogleAds onContactClick={handleOpenContact} />} />
              <Route path="/performance-marketing" element={<PerformanceMarketing onContactClick={handleOpenContact} />} />
              <Route path="/email-marketing" element={<EmailMarketing onContactClick={handleOpenContact} />} />
              <Route path="/sms-marketing" element={<SmsMarketing onContactClick={handleOpenContact} />} />
              <Route path="/display-native-ads" element={<DisplayNativeAds onContactClick={handleOpenContact} />} />
              <Route
                path="/life-at-analytics-clouds"
                element={<LifeAtAnalyticsClouds />}
              />
              <Route path="/blog" element={<Blog onContactClick={handleOpenContact} />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            </Routes>
          </main>
        </div>

        {/* Global Footer */}
        <Footer />

        {/* Contact modal popup */}
        <ContactModal isOpen={isContactOpen} onClose={handleCloseContact} />
      </div>
    </Router>
  );
}
