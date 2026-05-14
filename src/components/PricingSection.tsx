import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, User, Bot, ChevronRight, ChevronLeft, ArrowRight, X } from 'lucide-react';

export function PricingSection({ onRequestInvite, onContactUs }: { onRequestInvite?: () => void, onContactUs?: () => void }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const slides = [
    {
      id: 'quote',
      title: "Task 1: Office Supplies Quote",
      content: (
        <div className="space-y-4 text-sm font-medium">
          {/* User Message */}
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0 mt-1">
              <User className="w-4 h-4 text-slate-300" />
            </div>
            <div className="bg-slate-800 rounded-2xl rounded-tl-sm p-3 border border-slate-700 text-slate-200">
              I need 5 quotes for office chairs.
            </div>
          </div>
          {/* Admin Message */}
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-900 flex items-center justify-center flex-shrink-0 mt-1 shadow-lg shadow-blue-900/20">
              <Bot className="w-4 h-4 text-blue-300" />
            </div>
            <div className="bg-slate-800/80 rounded-2xl p-5 border border-slate-700 text-slate-200 w-full shadow-md">
              <div className="mb-4 flex items-center justify-between border-b border-slate-700 pb-3">
                <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider bg-blue-900/30 px-2 py-1 rounded">Alfred Admin Agent</span>
              </div>
              <div className="space-y-3 text-sm text-slate-300">
                <p><strong className="text-slate-100 font-semibold">Plan:</strong> Get 5 quotes for office chairs from various suppliers.</p>
                <div className="flex justify-between items-center bg-slate-900/50 px-3 py-2 rounded-lg">
                  <span className="text-slate-400">Estimated Time</span>
                  <span className="text-slate-100">1 hour</span>
                </div>
                <div className="flex justify-between items-center bg-slate-900/50 px-3 py-2 rounded-lg">
                  <span className="text-slate-400">Estimated Cost</span>
                  <span className="text-slate-100 font-semibold">$25.00</span>
                </div>
              </div>
              <div className="mt-5 pt-4 border-t border-slate-700 flex justify-between items-center">
                <span className="text-xs text-slate-400">Status: <span className="text-amber-400 ml-1">Awaiting Approval</span></span>
                <button className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs px-4 py-2 rounded-lg font-bold transition-colors shadow-sm">Approve Quote</button>
              </div>
            </div>
          </div>
          {/* User Message */}
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0 mt-1">
              <User className="w-4 h-4 text-slate-300" />
            </div>
            <div className="bg-emerald-900/40 rounded-2xl rounded-tl-sm p-3 py-2 border border-emerald-800/50 text-emerald-300 flex items-center">
              <CheckCircle2 className="w-4 h-4 mr-2" /> Approved
            </div>
          </div>
          {/* Agent Reply */}
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-900 flex items-center justify-center flex-shrink-0 mt-1 shadow-lg shadow-blue-900/20">
              <Bot className="w-4 h-4 text-blue-300" />
            </div>
            <div className="bg-slate-800 rounded-2xl p-4 border border-slate-700 text-slate-200">
              I have sent the quotes to your email.
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'order',
      title: "Task 2: Procure & Expense",
      content: (
        <div className="space-y-4 text-sm font-medium">
          {/* User Message */}
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0 mt-1">
              <User className="w-4 h-4 text-slate-300" />
            </div>
            <div className="bg-slate-800 rounded-2xl rounded-tl-sm p-3 border border-slate-700 text-slate-200">
              Order 5 chairs from Staples.
            </div>
          </div>
          {/* Admin Message */}
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-900 flex items-center justify-center flex-shrink-0 mt-1 shadow-lg shadow-blue-900/20">
              <Bot className="w-4 h-4 text-blue-300" />
            </div>
            <div className="bg-slate-800/80 rounded-2xl p-5 border border-slate-700 text-slate-200 w-full shadow-md">
              <div className="mb-4 flex items-center justify-between border-b border-slate-700 pb-3">
                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider bg-indigo-900/30 px-2 py-1 rounded">Multi-Agent Workflow</span>
              </div>
              <div className="space-y-4 text-sm text-slate-300">
                <div>
                  <strong className="text-slate-100 flex items-center gap-2 mb-1.5"><span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span> Admin Agent</strong>
                  <p className="pl-3 text-slate-400 text-xs">Order supplies, use supplied credit card, use supplied address for delivery, file receipt in Dropbox.</p>
                </div>
                <div>
                  <strong className="text-slate-100 flex items-center gap-2 mb-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Accounting Agent</strong>
                  <p className="pl-3 text-slate-400 text-xs">Update Tracker with Staples expense, map cost to office supplies category.</p>
                </div>
                <div className="bg-slate-900/50 p-3 rounded-lg space-y-2 mt-3 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Estimated Time</span>
                    <span className="text-slate-100">30 mins</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Estimated Cost</span>
                    <span className="text-slate-100 font-semibold">$15.00</span>
                  </div>
                </div>
              </div>
              <div className="mt-5 pt-4 border-t border-slate-700 flex justify-between items-center">
                <span className="text-xs text-slate-400">Status: <span className="text-amber-400 ml-1">Awaiting Approval</span></span>
                <button className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs px-4 py-2 rounded-lg font-bold transition-colors shadow-sm">Approve Order</button>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-carbon border-t border-steel relative bg-grid-pattern">
      <div className="absolute inset-0 bg-gradient-to-t from-obsidian to-transparent opacity-90 z-0"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-slate-100 tracking-tight mb-4">
            Flexible Deployment Models
          </h2>
          <p className="text-lg text-slate-400">
            Choose the model that fits your operational needs. From fully hosted and verified, to custom deployments on your own infrastructure.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 items-start">
          {/* Hosted Model Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-carbon rounded-sm p-8 sm:p-10 border border-steel shadow-soft-dark flex flex-col h-full relative overflow-hidden"
          >
            <div className="scanning-edge"></div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <div className="inline-block px-3 py-1 bg-obsidian text-amber border border-steel rounded font-mono text-[10px] font-bold tracking-widest uppercase mb-3 text-shadow-glow">
                  Hosted Agent
                </div>
                <h3 className="text-2xl font-heading font-bold text-slate-100 uppercase tracking-wide">Per-Task Pricing</h3>
              </div>
            </div>
            
            <p className="text-slate-400 mb-8 border-b border-steel pb-8 text-lg">
               We supply the stack, maintain the agent, and provide the professional verification.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-x-6 gap-y-4 mb-8">
              <div className="flex gap-3 items-center">
                <CheckCircle2 className="w-4 h-4 text-amber flex-shrink-0" />
                <span className="font-mono text-xs text-slate-300">Upfront Quotes & Approval</span>
              </div>
              <div className="flex gap-3 items-center">
                <CheckCircle2 className="w-4 h-4 text-amber flex-shrink-0" />
                <span className="font-mono text-xs text-slate-300">Detailed Work Logs</span>
              </div>
              <div className="flex gap-3 items-center">
                <CheckCircle2 className="w-4 h-4 text-amber flex-shrink-0" />
                <span className="font-mono text-xs text-slate-300">Detailed Invoicing & Receipts</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 mt-auto">
              <button 
                onClick={onRequestInvite}
                className="btn-primary w-full sm:w-auto px-6 py-3 rounded font-mono text-xs uppercase tracking-widest transition-all"
              >
                 Request Invite
              </button>
              <button  
                onClick={() => setIsExpanded(true)}
                className="btn-ghost w-full sm:w-auto px-4 py-3 rounded font-mono text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2"
              >
                 View Pricing Example
                 <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <AnimatePresence>
              {isExpanded && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian/80 backdrop-blur-sm">
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-carbon rounded-sm p-6 sm:p-8 border border-steel text-slate-200 shadow-glow-lg font-mono"
                  >
                    <button 
                      onClick={() => setIsExpanded(false)}
                      className="absolute top-6 right-6 z-20 p-2 text-slate-500 hover:text-amber bg-obsidian border border-steel hover:border-amber transition-colors rounded-sm"
                    >
                      <X className="w-5 h-5" />
                    </button>
                    
                    <div className="relative z-10 flex flex-col h-full mt-2">
                      <div className="flex justify-between items-center mb-6">
                        <div className="inline-block px-3 py-1 bg-obsidian border border-steel rounded text-[10px] font-bold tracking-widest uppercase text-amber">
                          Pricing Example Output
                        </div>
                        <div className="flex gap-2 pr-12">
                          <button 
                            onClick={() => setActiveSlide((prev) => (prev > 0 ? prev - 1 : slides.length - 1))}
                            className="w-8 h-8 rounded-sm bg-obsidian hover:bg-carbon flex items-center justify-center transition-colors border border-steel hover:border-amber"
                          >
                            <ChevronLeft className="w-4 h-4 text-amber" />
                          </button>
                          <button 
                            onClick={() => setActiveSlide((prev) => (prev < slides.length - 1 ? prev + 1 : 0))}
                            className="w-8 h-8 rounded-sm bg-obsidian hover:bg-carbon flex items-center justify-center transition-colors border border-steel hover:border-amber"
                          >
                            <ChevronRight className="w-4 h-4 text-amber" />
                          </button>
                        </div>
                      </div>

                      <div className="relative overflow-hidden min-h-[400px]">
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={activeSlide}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="absolute inset-0 w-full"
                          >
                            <h3 className="text-lg font-bold mb-6 text-slate-100">{slides[activeSlide].title}</h3>
                            {slides[activeSlide].content}
                          </motion.div>
                        </AnimatePresence>
                      </div>
                      
                      <div className="flex justify-center gap-2 mt-4 pt-4 border-t border-slate-800/50">
                        {slides.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setActiveSlide(idx)}
                            className={`w-2 h-2 rounded-full transition-colors ${idx === activeSlide ? 'bg-blue-500' : 'bg-slate-700'}`}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Custom Model Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-obsidian border border-steel rounded-sm p-8 sm:p-10 flex flex-col h-full shadow-soft-dark"
          >
            <div className="inline-block self-start px-3 py-1 bg-carbon text-slate-400 border border-steel rounded font-mono text-[10px] font-bold tracking-widest uppercase mb-4">
              Custom Agent
            </div>
            <h3 className="text-2xl font-heading font-bold text-slate-100 uppercase tracking-wide mb-4">Custom Deployment</h3>
            <p className="text-slate-400 mb-8 leading-relaxed font-sans">
               We build the agent to match your custom workflow. Choose between deploying on your infrastructure or ours.
            </p>
            
            <div className="mb-8 mt-auto pt-8 border-t border-steel">
              <span className="flex items-center gap-2 text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-2">
                 Pricing Model
              </span>
              <span className="font-mono text-amber text-sm font-bold bg-carbon border border-steel px-2 py-1 rounded inline-block">Based on scope and complexity.</span>
            </div>

            <div className="mt-auto">
              <button 
                onClick={onContactUs}
                className="w-full btn-ghost px-6 py-3 rounded font-mono text-xs uppercase tracking-widest flex justify-center items-center gap-2 transition-all"
              >
                 Contact Us <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
