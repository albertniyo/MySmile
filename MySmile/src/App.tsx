import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import HomePage from "@/pages/HomePage";
import BlogPage from "@/pages/BlogPage";
import ScreeningPage from "@/pages/ScreeningPage";
import TestimonialsPage from "@/pages/TestimonialsPage";
import AdminLoginPage from "@/pages/AdminLoginPage";
import SecurityPrivacyPage from "@/pages/SecurityPrivacyPage";
import TermsPage from "@/pages/TermsPage";
import { Toaster } from "sonner";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white font-sans text-stone-900 selection:bg-stone-100 selection:text-stone-900 flex flex-col">
        <Toaster position="top-right" richColors />
        <Navbar />
        
        <main className="overflow-x-hidden flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/screening" element={<ScreeningPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/testimonials" element={<TestimonialsPage />} />
            <Route path="/login" element={<AdminLoginPage />} />
            <Route path="/security-privacy" element={<SecurityPrivacyPage />} />
            <Route path="/terms-conditions" element={<TermsPage />} />
          </Routes>
        </main>
        
        <footer className="bg-stone-900 text-white py-32">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-16 mb-24">
              <div className="col-span-1">
                <div className="flex items-center gap-2 mb-10">
                  <span className="text-xl font-light tracking-[0.3em] uppercase">MySmile</span>
                </div>
                <p className="text-stone-400 text-sm font-light leading-relaxed max-w-xs">
                  Elite clinical care delivered with a commitment to minimalist design and patient comfort. 
                </p>
              </div>
              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-10 text-white">Navigation</h4>
                <ul className="space-y-4">
                  <li><Link to="/" className="text-stone-500 hover:text-white transition-colors text-sm font-light">Home</Link></li>
                  <li><Link to="/screening" className="text-stone-500 hover:text-white transition-colors text-sm font-light">Screening</Link></li>
                  <li><Link to="/blog" className="text-stone-500 hover:text-white transition-colors text-sm font-light">Blog</Link></li>
                  <li><Link to="/testimonials" className="text-stone-500 hover:text-white transition-colors text-sm font-light">Testimonials</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-10 text-white">Connect</h4>
                <p className="text-stone-500 text-sm font-light mb-4">100 Minimalist Ave, Suite 400<br />New York, NY 10001</p>\
                <p className="text-white font-bold text-sm mb-2 uppercase tracking-[0.2em]">+1 212 555 SMILE</p>\
                <p className="text-stone-500 text-sm font-light">care@mysmile.studio</p>
              </div>
            </div>
            
            <div className="border-t border-stone-800 pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
              <p className="text-stone-600 text-[9px] uppercase tracking-[0.4em] font-bold">© 2024 MySmile Studio.</p>
              <div className="flex items-center gap-10">
                <Link to="/security-privacy" className="text-stone-700 hover:text-stone-400 transition-colors text-[9px] uppercase tracking-[0.3em] font-bold">Security & Privacy</Link>
                <Link to="/terms-conditions" className="text-stone-700 hover:text-stone-400 transition-colors text-[9px] uppercase tracking-[0.3em] font-bold">Terms & Conditions</Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;