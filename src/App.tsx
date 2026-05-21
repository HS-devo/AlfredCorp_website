import React, { useState, useEffect } from 'react';
import { WaitlistModal } from './components/WaitlistModal';
import { ContactModal } from './components/ContactModal';
import { ServicesSection } from './components/ServicesSection';
import { PricingSection } from './components/PricingSection';
import { ShieldCheck, Zap, History, ChevronRight, LockKeyhole, FileCheck2, ArrowRight, Twitter, Linkedin, Instagram } from 'lucide-react';
import { motion, useScroll, useMotionValueEvent } from 'motion/react';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [showFloatingBtn, setShowFloatingBtn] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 600) {
      setShowFloatingBtn(true);
    } else {
      setShowFloatingBtn(false);
    }
  });

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-obsidian font-sans text-slate-300 selection:bg-amber/30 selection:text-white">
      {/* Navigation */}
      <nav className="fixed w-full z-40 bg-obsidian/90 backdrop-blur-md border-b border-steel transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            <div className="flex items-center gap-2">
              {/* Generated logo element */}
              <div className="w-8 h-8 rounded flex items-center justify-center overflow-hidden bg-carbon border border-steel">
                <img src="/logo.png" alt="Alfred Corporate Services Logo" className="w-full h-full object-cover opacity-80" />
              </div>
              <span className="font-heading font-bold text-xl tracking-tight text-slate-100">Alfred <span className="text-slate-500 font-normal">Corp</span></span>
            </div>
            <div className="hidden md:flex items-center gap-8 font-mono text-xs uppercase tracking-widest text-slate-400">
              <button onClick={() => scrollToSection('how-it-works')} className="hover:text-amber transition-colors">How it works</button>
              <button onClick={() => scrollToSection('services')} className="hover:text-amber transition-colors">Services</button>
              <button onClick={() => scrollToSection('pricing')} className="hover:text-amber transition-colors">Pricing</button>
              <button onClick={() => scrollToSection('trust')} className="hover:text-amber transition-colors">Traceability</button>
            </div>
            <button 
              onClick={() => setIsContactModalOpen(true)}
              className="btn-primary px-5 py-2 rounded font-mono text-xs uppercase tracking-widest transition-all"
            >
              Contact us
            </button>
          </div>
        </div>
      </nav>

      {/* Floating CTA */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: showFloatingBtn ? 1 : 0, y: showFloatingBtn ? 0 : 50 }}
        className="fixed bottom-6 right-6 z-40 pointer-events-none"
      >
        <button 
          onClick={() => setIsModalOpen(true)}
          className="pointer-events-auto shadow-glow btn-primary bg-obsidian px-6 py-3 rounded text-amber font-mono text-xs uppercase tracking-widest flex items-center gap-2 transition-all hover:shadow-glow-lg active:scale-95"
        >
          Request Invite
          <ArrowRight className="w-4 h-4" />
        </button>
      </motion.div>

      {/* Hero Section */}
      <main className="relative pt-32 pb-20 sm:pt-44 sm:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        <div className="scanning-edge"></div>
        <div className="text-center max-w-4xl mx-auto relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl font-heading font-bold text-slate-100 mb-6 leading-tight tracking-tight"
          >
            Enterprise AI Agents <br /> <span className="text-amber"> supervised by professionals</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-400 mb-12 max-w-2xl mx-auto"
          >
            Alfred Corp is a agentic fractional corprate services platform. Founders, Entrepreneurs and Small Businesses use our platform to eliminates the heavy cost and overhead of traditional hiring. By partnering with us, you unlock professional expertise while maintaining lean, highly scalable operations.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
            <div>
              <div className="w-14 h-14 bg-obsidian border border-steel rounded flex items-center justify-center mx-auto md:mx-0 mb-6 shadow-glow">
                <Zap className="h-6 w-6 text-amber" />
              </div>
              <h3 className="text-xl font-heading font-bold mb-3 text-slate-100 uppercase tracking-wide text-sm">AI-Powered Speed</h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                Routine tasks—from document parsing to code scaffolding—are handled in seconds by our specialized, secure LLM agent network.
              </p>
            </div>
            <div>
              <div className="w-14 h-14 bg-obsidian border border-steel rounded flex items-center justify-center mx-auto md:mx-0 mb-6 shadow-glow">
                <ShieldCheck className="h-6 w-6 text-amber" />
              </div>
              <h3 className="text-xl font-heading font-bold mb-3 text-slate-100 uppercase tracking-wide text-sm">Human-In-The-Loop</h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                We never ship AI output blind. Every task is reviewed, corrected, and verified by a domain-specific professional.
              </p>
            </div>
            <div>
              <div className="w-14 h-14 bg-obsidian border border-steel rounded flex items-center justify-center mx-auto md:mx-0 mb-6 shadow-glow">
                <History className="h-6 w-6 text-amber" />
              </div>
              <h3 className="text-xl font-heading font-bold mb-3 text-slate-100 uppercase tracking-wide text-sm">Traceable by Design</h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                Total transparency. See the exact audit trail for every task, mapping what the AI did and who signed off on the final result.
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
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2">
              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-slate-100 tracking-tight mb-8">
                Delegation without the anxiety.
              </h2>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded border border-amber/50 bg-amber/10 flex items-center justify-center font-mono text-amber text-sm font-bold shadow-glow">01</div>
                  <div>
                    <h4 className="text-sm font-heading font-bold text-slate-200 mb-1 tracking-wide uppercase">Request an invite</h4>
                    <p className="text-sm text-slate-400">Join our structured waitlist. We onboard in cohorts to ensure high-quality service for all Canadian clients.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded border border-steel bg-carbon flex items-center justify-center font-mono text-slate-400 text-sm">02</div>
                  <div>
                    <h4 className="text-sm font-heading font-bold text-slate-200 mb-1 tracking-wide uppercase">Submit your tasks</h4>
                    <p className="text-sm text-slate-400">Dump your chaos into our dashboard via chat or ticket. The AI instantly starts triaging and drafting.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded border border-steel bg-carbon flex items-center justify-center font-mono text-slate-400 text-sm">03</div>
                  <div>
                    <h4 className="text-sm font-heading font-bold text-slate-200 mb-1 tracking-wide uppercase">Supervision in background</h4>
                    <p className="text-sm text-slate-400">Our human professionals step in. They review the AI's drafts, fix edge cases, and add strategic context.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded border border-steel bg-carbon flex items-center justify-center font-mono text-slate-400 text-sm">04</div>
                  <div>
                    <h4 className="text-sm font-heading font-bold text-slate-200 mb-1 tracking-wide uppercase">Trace & approve</h4>
                    <p className="text-sm text-slate-400">You receive a polished deliverable alongside a strict audit log of who touched it. You approve with confidence.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/2 w-full">
              <div className="bg-carbon border border-steel rounded p-6 sm:p-8 relative shadow-soft-dark flex items-center justify-center">
                <div className="absolute top-0 right-0 p-4 opacity-5">
                  <LockKeyhole className="w-48 h-48 text-slate-500" />
                </div>
                
                {/* Audit Log representation (theme matched) */}
                <div className="bg-obsidian border border-steel rounded p-5 text-slate-300 w-full relative z-10 shadow-2xl font-mono">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold border-b border-slate-700 pb-1">Traceability.Log</span>
                    <span className="text-[10px] text-amber flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-amber animate-pulse"></span> SYSTEM: ONLINE</span>
                  </div>
                  <div className="space-y-6">
                    <div className="audit-line">
                      <div className="audit-dot"></div>
                      <div className="text-[11px] text-amber mb-0.5">10:02_AM [USER] <span className="text-slate-200 bg-carbon px-1">NEW_TASK</span></div>
                      <div className="text-[10px] text-slate-500">Subject: Independent Contractor Agreement</div>
                    </div>
                    <div className="audit-line">
                      <div className="audit-dot border-amber bg-amber/20 shadow-glow"></div>
                      <div className="text-[11px] text-slate-300 mb-0.5">10:04_AM [AGENT] <span className="text-emerald-400 bg-carbon px-1 border border-steel">DRAFTED</span></div>
                      <div className="text-[10px] text-slate-500">&gt; Executing: /templates/ontario_contract.md<br/>&gt; Flag: Termination clause requires review.</div>
                    </div>
                    <div className="audit-line">
                      <div className="audit-dot"></div>
                      <div className="text-[11px] text-slate-300 mb-0.5">10:45_AM [HUMAN] <span className="text-blue-400 bg-carbon px-1 border border-steel">VERIFIED</span></div>
                      <div className="text-[10px] text-slate-500">&gt; Expert: HR_Specialist_Jane_D<br/>&gt; Note: Amended termination clause to align with 2026 ESA precedent.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <PricingSection onRequestInvite={() => setIsModalOpen(true)} onContactUs={() => setIsContactModalOpen(true)} />

      {/* Trust & Traceability */}
      <section id="trust" className="py-24 bg-carbon border-y border-steel bg-grid-pattern overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-transparent to-obsidian opacity-80 z-0"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <ShieldCheck className="h-12 w-12 text-slate-500 mx-auto mb-6" />
            <h2 className="text-3xl sm:text-4xl font-heading font-bold tracking-tight mb-4 text-slate-100">
              Enterprise-grade accountability
            </h2>
            <p className="text-lg text-slate-400">
              When it's your business on the line, "black box" AI isn't enough.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            <div className="bg-obsidian border border-steel rounded p-8 shadow-soft-dark">
              <FileCheck2 className="w-8 h-8 text-amber mb-6" />
              <h3 className="text-xl font-heading font-bold mb-3 text-slate-200">The Audit Log</h3>
              <p className="text-sm font-mono text-slate-400 leading-relaxed">
                Before you approve any work, you see exactly what the AI generated, what the human changed, and why. 
                Complete transparency built directly into your delivery timeline.
              </p>
            </div>
            <div className="bg-obsidian border border-steel rounded p-8 shadow-soft-dark">
              <ShieldCheck className="w-8 h-8 text-amber mb-6" />
              <h3 className="text-xl font-heading font-bold mb-3 text-slate-200">Canadian Data Residency</h3>
              <p className="text-sm font-mono text-slate-400 leading-relaxed">
                We understand PIPEDA. Operational documents and sensitive payroll/HR artifacts remain secure, 
                and professional oversight ensures compliance with local Canadian business law.
              </p>
            </div>
          </div>
        </div>
      </section>

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
            <a href="#" className="hover:text-slate-300 transition-colors">Contact Support</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Terms of Service</a>
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
