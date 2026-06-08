import React, { useState, useEffect } from 'react';
import { WaitlistModal } from './components/WaitlistModal';
import { ContactModal } from './components/ContactModal';
import { ServicesSection } from './components/ServicesSection';
import { PricingSection } from './components/PricingSection';
import { HowItWorksMockup } from './components/HowItWorksMockup';
import { FAQSection } from './components/FAQSection';
import { ShieldCheck, Zap, History, ChevronRight, LockKeyhole, FileCheck2, ArrowRight, Twitter, Linkedin, Instagram, Menu, X } from 'lucide-react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'motion/react';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    
    // Slight delay ensures the DOM menu update doesn't interrupt smooth scrolling
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        const headerOffset = 80; // approximate header height to prevent covering content
        const elementPosition = el.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 50);
  };

  return (
    <div className="min-h-screen bg-obsidian font-sans text-slate-300 selection:bg-amber/30 selection:text-white">
      {/* Navigation */}
      <nav className="fixed w-full z-40 bg-obsidian/95 backdrop-blur-md border-b border-steel transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            <div className="flex items-center gap-2">
              {/* Generated logo element */}
              <div className="w-10 h-10 flex items-center justify-center overflow-hidden rounded bg-white">
                <img src="/logo.png" alt="Alfred Corporate Services Logo" className="w-full h-full object-contain" />
              </div>
              <span className="font-heading font-bold text-xl tracking-tight text-slate-100">Alfred <span className="text-slate-500 font-normal">Corp</span></span>
            </div>
            <div className="hidden md:flex items-center gap-8 font-mono text-xs uppercase tracking-widest text-slate-400">
              <button onClick={() => scrollToSection('services')} className="hover:text-amber transition-colors cursor-pointer">Services</button>
              <button onClick={() => scrollToSection('how-it-works')} className="hover:text-amber transition-colors cursor-pointer">How it works</button>
              <button onClick={() => scrollToSection('pricing')} className="hover:text-amber transition-colors cursor-pointer">Pricing</button>
              <button onClick={() => scrollToSection('about-us')} className="hover:text-amber transition-colors cursor-pointer">About Us</button>
              <button onClick={() => scrollToSection('faq')} className="hover:text-amber transition-colors cursor-pointer">FAQ</button>
              <button onClick={() => setIsContactModalOpen(true)} className="hover:text-amber transition-colors cursor-pointer">Contact us</button>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-slate-200 hover:text-amber p-2 transition-colors"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden bg-obsidian/95"
            >
              <div className="px-6 py-6 flex flex-col gap-6 font-mono text-xs uppercase tracking-widest text-slate-400 border-t border-steel">
                <button onClick={() => scrollToSection('services')} className="w-full text-left hover:text-amber transition-colors">Services</button>
                <button onClick={() => scrollToSection('how-it-works')} className="w-full text-left hover:text-amber transition-colors">How it works</button>
                <button onClick={() => scrollToSection('pricing')} className="w-full text-left hover:text-amber transition-colors">Pricing</button>
                <button onClick={() => scrollToSection('about-us')} className="w-full text-left hover:text-amber transition-colors">About Us</button>
                <button onClick={() => scrollToSection('faq')} className="w-full text-left hover:text-amber transition-colors">FAQ</button>
                <button 
                  onClick={() => { setIsContactModalOpen(true); setIsMobileMenuOpen(false); }}
                  className="w-full text-left hover:text-amber transition-colors text-amber"
                >
                  Contact us
                </button>
                <button 
                  onClick={() => { setIsModalOpen(true); setIsMobileMenuOpen(false); }}
                  className="w-full text-left hover:text-amber transition-colors flex items-center gap-2"
                >
                  Request Invite
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <main className="relative pt-32 pb-20 sm:pt-44 sm:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        <div className="scanning-edge"></div>
        <div className="text-center max-w-4xl mx-auto relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl font-heading font-bold text-slate-100 mb-12 leading-tight tracking-tight"
          >
            Enterprise AI Agents <br /> <span className="text-amber"> supervised by professionals</span>
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button 
              onClick={() => setIsModalOpen(true)}
              className="w-full sm:w-auto btn-primary px-8 py-4 rounded font-mono text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2"
            >
              Request Invite
              <ChevronRight className="h-4 w-4" />
            </button>
            <button 
              onClick={() => scrollToSection('how-it-works')}
              className="w-full sm:w-auto btn-ghost px-8 py-4 rounded font-mono text-xs uppercase tracking-widest transition-all"
            >
              See How It Works
            </button>
          </motion.div>
        </div>
      </main>

      {/* Value Proposition */}
      <section className="py-20 bg-carbon border-y border-steel bg-pinstripe relative">
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-transparent to-obsidian opacity-50 z-0"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 bg-obsidian border border-steel rounded flex items-center justify-center mx-auto mb-6 shadow-glow">
                <Zap className="h-6 w-6 text-amber" />
              </div>
              <h3 className="text-xl font-heading font-bold mb-3 text-slate-100 uppercase tracking-wide text-sm">AI-Powered Speed</h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                Task agents with one time or routine business tasks. 
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 bg-obsidian border border-steel rounded flex items-center justify-center mx-auto mb-6 shadow-glow">
                <ShieldCheck className="h-6 w-6 text-amber" />
              </div>
              <h3 className="text-xl font-heading font-bold mb-3 text-slate-100 uppercase tracking-wide text-sm">Human-In-The-Loop</h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                Professionals review, correct, and verify tasks.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 bg-obsidian border border-steel rounded flex items-center justify-center mx-auto mb-6 shadow-glow">
                <History className="h-6 w-6 text-amber" />
              </div>
              <h3 className="text-xl font-heading font-bold mb-3 text-slate-100 uppercase tracking-wide text-sm">Traceable by Design</h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                Every task is logged, documenting what the AI did and the final sign-off on the verified result.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <ServicesSection />

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-obsidian bg-grid-pattern relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-slate-100 tracking-tight mb-4">
              Preview
            </h2>
          </div>
          <div className="flex flex-col lg:flex-row gap-16 items-center justify-center">
            
            <div className="lg:w-1/2 w-full">
              <div className="relative flex items-center justify-center p-4">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-amber/5 rounded-full blur-3xl opacity-50 z-0 pointer-events-none"></div>
                <div className="relative z-10 w-full max-w-sm">
                  <HowItWorksMockup />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <PricingSection onRequestInvite={() => setIsModalOpen(true)} onContactUs={() => setIsContactModalOpen(true)} />



      {/* About Us */}
      <section id="about-us" className="py-20 sm:py-24 bg-obsidian relative border-b border-steel">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="text-sm font-mono text-amber tracking-widest uppercase mb-6 border border-amber/30 bg-amber/10 inline-block px-4 py-1.5 rounded">
            About Us
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-slate-100 tracking-tight mb-10">
            Frictionless Business Operations
          </h2>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-sans text-base sm:text-lg text-slate-400 leading-relaxed space-y-6"
          >
            <p>
              <span className="text-amber font-medium font-sans">Alfred Corp</span> is an agentic fractional corporate services platform. 
            </p>
            <p>
              <span className="text-amber font-medium font-sans">Founders, Entrepreneurs</span> and <span className="text-amber font-medium font-sans">Small Businesses</span> use our platform to obtain business support services that operate at AI speed with the <span className="text-amber font-medium font-sans">reliability</span> of <span className="text-amber font-medium font-sans">trusted</span> professionals.
            </p>
            <p>
              Professionals partner with us to reduce friction for their customers and take advantage of AI agents without the overhead of setting up and maintaining IT infrastructure or the sharp learning curve of rapidly changing AI technology. 
            </p>
            <p>
              <span className="text-amber font-medium font-sans">Alfred Corp</span> delivers highly scalable support services and expertise that make running a business and providing professional services frictionless and fast. 
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />

      {/* Footer */}
      <footer className="bg-obsidian border-t border-steel py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded flex items-center justify-center overflow-hidden bg-carbon border border-steel">
                <img src="/logo.png" alt="Alfred Corporate Services Logo" className="w-full h-full object-cover opacity-80" />
              </div>
              <span className="font-heading font-bold text-lg text-slate-200 tracking-wider uppercase text-xs">Alfred Corp.</span>
            </div>
            <div className="flex items-center gap-4 text-slate-500">
              <a href="#" className="hover:text-amber transition-colors" aria-label="Twitter">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-amber transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-amber transition-colors" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div className="text-slate-500 font-mono text-[10px] uppercase tracking-widest flex gap-6">
            <button onClick={() => setIsContactModalOpen(true)} className="hover:text-slate-300 transition-colors cursor-pointer bg-transparent border-0 p-0 font-mono text-[10px] uppercase tracking-widest">Contact Support</button>
            <a href="/privacy.html" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="/terms.html" className="hover:text-slate-300 transition-colors">Terms of Service</a>
          </div>
          
          <div className="text-slate-600 font-mono text-[10px] uppercase tracking-widest">
            © {new Date().getFullYear()} Alfred Corp. // Built for Canada
          </div>
        </div>
      </footer>

      {/* Modals */}
      <WaitlistModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
    </div>
  );
}

export default App;
