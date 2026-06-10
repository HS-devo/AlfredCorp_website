import React, { useState } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const servicesList = [
  'Software Development',
  'IT Infrastructure',
  'Data Science',
  'Health and Safety',
  'Human Resources',
  'Admin Support',
  'Accounting',
  'Other'
];

export function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const toggleService = (service: string) => {
    setSelectedServices(prev => 
      prev.includes(service) 
        ? prev.filter(s => s !== service)
        : [...prev, service]
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-obsidian/80 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-carbon border border-steel rounded-sm shadow-glow-lg z-50 max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 sm:p-8">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 text-slate-500 hover:text-amber bg-obsidian border border-steel hover:border-amber transition-colors rounded-sm"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>

              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-obsidian border border-emerald-500/50 shadow-glow rounded-sm flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-heading font-bold text-slate-100 mb-2">Waitlist confirmed</h3>
                  <p className="text-slate-400 font-mono text-xs tracking-widest">Invites dispatched Tuesdays.</p>
                  <button
                    onClick={onClose}
                    className="mt-8 btn-ghost w-full px-6 py-3 rounded-sm font-mono text-xs uppercase tracking-widest shadow-lg transition-shadow"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-heading font-bold text-slate-100 mb-6">Request Access</h2>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono text-slate-300 tracking-widest uppercase mb-1">Full Name <span className="text-red-500">*</span></label>
                        <input required type="text" className="w-full px-3 py-2 border border-steel bg-obsidian text-slate-200 rounded-sm font-mono text-xs focus:ring-1 focus:ring-amber focus:border-amber outline-none" />
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-slate-300 tracking-widest uppercase mb-1">Email <span className="text-red-500">*</span></label>
                        <input required type="email" className="w-full px-3 py-2 border border-steel bg-obsidian text-slate-200 rounded-sm font-mono text-xs focus:ring-1 focus:ring-amber focus:border-amber outline-none" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono text-slate-300 tracking-widest uppercase mb-1">Role <span className="text-red-500">*</span></label>
                        <select required className="w-full px-3 py-2 border border-steel bg-obsidian text-slate-200 rounded-sm font-mono text-xs focus:ring-1 focus:ring-amber focus:border-amber outline-none">
                          <option value="">Select a role...</option>
                          <option value="owner">Founder / Owner</option>
                          <option value="developer">Developer / Engineer</option>
                          <option value="manager">Manager / Director</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-slate-300 tracking-widest uppercase mb-1">Company Name <span className="text-slate-400 font-normal normal-case">(Optional)</span></label>
                        <input type="text" className="w-full px-3 py-2 border border-steel bg-obsidian text-slate-200 rounded-sm font-mono text-xs focus:ring-1 focus:ring-amber focus:border-amber outline-none" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-300 tracking-widest uppercase mb-1">Services interested in <span className="text-red-500">*</span></label>
                      <div className="max-h-40 overflow-y-auto p-2 border border-steel bg-obsidian rounded-sm space-y-2 font-mono text-xs">
                        {servicesList.map((service) => (
                          <label key={service} className="flex items-center space-x-3 cursor-pointer p-1 hover:bg-carbon rounded transition-colors">
                            <input 
                              type="checkbox" 
                              checked={selectedServices.includes(service)}
                              onChange={() => toggleService(service)}
                              className="rounded-sm bg-obsidian border-steel text-amber focus:ring-amber focus:ring-offset-obsidian" 
                            />
                            <span className="text-slate-300">{service}</span>
                          </label>
                        ))}
                      </div>
                      <AnimatePresence>
                        {selectedServices.includes('Other') && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden mt-3"
                          >
                            <label className="block text-xs font-mono text-slate-300 tracking-widest uppercase mb-1">Specify Other Service <span className="text-red-500">*</span></label>
                            <input 
                              required 
                              type="text" 
                              placeholder="Please specify..."
                              className="w-full px-3 py-2 border border-steel bg-obsidian text-slate-200 rounded-sm font-mono text-xs focus:ring-1 focus:ring-amber focus:border-amber outline-none" 
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {selectedServices.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="overflow-hidden"
                      >
                        <label className="block text-xs font-mono text-slate-300 tracking-widest uppercase mb-1">
                          Current workflow context <span className="text-slate-400 font-normal normal-case">(Optional)</span>
                        </label>
                        <textarea 
                          rows={2} 
                          placeholder="Describe your issue here..."
                          className="w-full px-3 py-2 border border-steel bg-obsidian text-slate-200 rounded-sm font-mono text-xs focus:ring-1 focus:ring-amber focus:border-amber outline-none resize-none"
                        ></textarea>
                      </motion.div>
                    )}

                    <div>
                      <label className="block text-xs font-mono text-slate-300 tracking-widest uppercase mb-1">Source <span className="text-red-500">*</span></label>
                      <select required className="w-full px-3 py-2 border border-steel bg-obsidian text-slate-200 rounded-sm font-mono text-xs focus:ring-1 focus:ring-amber focus:border-amber outline-none appearance-none">
                        <option value="">Select...</option>
                        <option value="search">Search Engine</option>
                        <option value="social">Social Media</option>
                        <option value="referral">Word of Mouth / Referral</option>
                        <option value="advertisement">Advertisement</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="btn-primary w-full py-4 rounded-sm font-mono text-xs uppercase tracking-widest mt-6"
                    >
                      Submit
                    </button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
