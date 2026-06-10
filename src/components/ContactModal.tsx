import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultReason?: string;
}

export function ContactModal({ isOpen, onClose, defaultReason }: ContactModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [contactReason, setContactReason] = useState("");
  const [profService, setProfService] = useState("");

  useEffect(() => {
    if (isOpen) {
      setSubmitted(false);
      if (defaultReason) {
        setContactReason(defaultReason);
      } else {
        setContactReason("");
      }
      setProfService("");
    }
  }, [isOpen, defaultReason]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
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
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-obsidian border border-emerald-500/50 shadow-glow rounded-sm flex items-center justify-center mx-auto mb-6">
                    <Send className="w-8 h-8 text-emerald-400" />
                  </div>
                  <h3 className="text-2xl font-heading font-bold text-slate-100 mb-2">Message Sent</h3>
                  <p className="text-slate-400 font-mono text-xs tracking-widest">We will respond shortly.</p>
                  <button
                    onClick={onClose}
                    className="mt-8 btn-ghost w-full px-6 py-3 rounded-sm font-mono text-xs uppercase tracking-widest shadow-lg transition-shadow"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-heading font-bold text-slate-100 mb-2">Contact Us</h2>
                  <p className="text-slate-400 mb-6 font-mono text-xs">Please fill out the form below.</p>

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

                    <div>
                      <label className="block text-xs font-mono text-slate-300 tracking-widest uppercase mb-1">Role <span className="text-red-500">*</span></label>
                      <select required className="w-full px-3 py-2 border border-steel bg-obsidian text-slate-200 rounded-sm font-mono text-xs focus:ring-1 focus:ring-amber focus:border-amber outline-none appearance-none">
                        <option value="">Select a role...</option>
                        <option value="professional">Professional Services Provider</option>
                        <option value="owner">Founder / Owner</option>
                        <option value="developer">Developer / Engineer</option>
                        <option value="manager">Manager / Director</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-300 tracking-widest uppercase mb-1">Contact Reason <span className="text-red-500">*</span></label>
                      <select 
                        required 
                        value={contactReason}
                        onChange={(e) => setContactReason(e.target.value)}
                        className="w-full px-3 py-2 border border-steel bg-obsidian text-slate-200 rounded-sm font-mono text-xs focus:ring-1 focus:ring-amber focus:border-amber outline-none appearance-none"
                      >
                        <option value="">Select a reason...</option>
                        <option value="general">General Question</option>
                        <option value="custom_dev">Request Custom Agent Dev</option>
                        <option value="work">Work with us</option>
                      </select>
                    </div>

                    <AnimatePresence mode="popLayout">
                      {(contactReason === 'custom_dev' || contactReason === 'work') && (
                        <motion.div
                          key="phone"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <label className="block text-xs font-mono text-slate-300 tracking-widest uppercase mb-1 mt-4">Phone Number <span className="text-red-500">*</span></label>
                          <input required type="tel" className="w-full px-3 py-2 border border-steel bg-obsidian text-slate-200 rounded-sm font-mono text-xs focus:ring-1 focus:ring-amber focus:border-amber outline-none" />
                        </motion.div>
                      )}

                      {contactReason === 'custom_dev' && (
                        <motion.div
                          key="custom_dev"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden space-y-4 pt-4"
                        >
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs font-mono text-slate-300 tracking-widest uppercase mb-1">Company Name <span className="text-red-500">*</span></label>
                              <input required type="text" className="w-full px-3 py-2 border border-steel bg-obsidian text-slate-200 rounded-sm font-mono text-xs focus:ring-1 focus:ring-amber focus:border-amber outline-none" />
                            </div>
                            <div>
                              <label className="block text-xs font-mono text-slate-300 tracking-widest uppercase mb-1">Website <span className="text-red-500">*</span></label>
                              <input required type="url" placeholder="https://" className="w-full px-3 py-2 border border-steel bg-obsidian text-slate-200 rounded-sm font-mono text-xs focus:ring-1 focus:ring-amber focus:border-amber outline-none" />
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs font-mono text-slate-300 tracking-widest uppercase mb-1">Expected number of users <span className="text-red-500">*</span></label>
                            <input required type="number" min="1" className="w-full px-3 py-2 border border-steel bg-obsidian text-slate-200 rounded-sm font-mono text-xs focus:ring-1 focus:ring-amber focus:border-amber outline-none" />
                          </div>

                          <div>
                            <label className="block text-xs font-mono text-slate-300 tracking-widest uppercase mb-1">Describe Project Scope <span className="text-red-500">*</span></label>
                            <textarea required rows={3} placeholder="Elaborate on the requirements..." className="w-full px-3 py-2 border border-steel bg-obsidian text-slate-200 rounded-sm font-mono text-xs focus:ring-1 focus:ring-amber focus:border-amber outline-none resize-none"></textarea>
                          </div>

                          <div>
                            <label className="block text-xs font-mono text-slate-300 tracking-widest uppercase mb-1">What project success looks like for you <span className="text-red-500">*</span></label>
                            <textarea required rows={2} className="w-full px-3 py-2 border border-steel bg-obsidian text-slate-200 rounded-sm font-mono text-xs focus:ring-1 focus:ring-amber focus:border-amber outline-none resize-none"></textarea>
                          </div>

                          <div>
                            <label className="block text-xs font-mono text-slate-300 tracking-widest uppercase mb-1">Additional note <span className="text-slate-400 font-normal normal-case">(Optional)</span></label>
                            <textarea rows={2} className="w-full px-3 py-2 border border-steel bg-obsidian text-slate-200 rounded-sm font-mono text-xs focus:ring-1 focus:ring-amber focus:border-amber outline-none resize-none"></textarea>
                          </div>
                        </motion.div>
                      )}

                      {contactReason === 'work' && (
                        <motion.div
                          key="work"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden space-y-4 pt-4"
                        >
                          <div>
                            <label className="block text-xs font-mono text-slate-300 tracking-widest uppercase mb-1">Type of Professional Service <span className="text-red-500">*</span></label>
                            <select 
                              required 
                              value={profService}
                              onChange={(e) => setProfService(e.target.value)}
                              className="w-full px-3 py-2 border border-steel bg-obsidian text-slate-200 rounded-sm font-mono text-xs focus:ring-1 focus:ring-amber focus:border-amber outline-none appearance-none"
                            >
                              <option value="">Select service type...</option>
                              <option value="cpa">CPA / Accounting</option>
                              <option value="legal">Legal / Paralegal</option>
                              <option value="hr">HR Professional</option>
                              <option value="dev">Software Engineering</option>
                              <option value="other">Other</option>
                            </select>
                          </div>
                          
                          {profService === 'other' && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                            >
                              <label className="block text-xs font-mono text-slate-300 tracking-widest uppercase mb-1">Specify Service <span className="text-red-500">*</span></label>
                              <input required type="text" className="w-full px-3 py-2 border border-steel bg-obsidian text-slate-200 rounded-sm font-mono text-xs focus:ring-1 focus:ring-amber focus:border-amber outline-none" />
                            </motion.div>
                          )}

                          <div>
                            <label className="block text-xs font-mono text-slate-300 tracking-widest uppercase mb-1">LinkedIn / Portfolio URL <span className="text-slate-400 font-normal normal-case">(Optional)</span></label>
                            <input type="url" placeholder="https://" className="w-full px-3 py-2 border border-steel bg-obsidian text-slate-200 rounded-sm font-mono text-xs focus:ring-1 focus:ring-amber focus:border-amber outline-none" />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {contactReason !== 'custom_dev' && (
                      <div className="mt-4">
                        <label className="block text-xs font-mono text-slate-300 tracking-widest uppercase mb-1">
                          Message {contactReason === 'work' ? <span className="text-slate-400 font-normal normal-case">(Optional)</span> : <span className="text-red-500">*</span>}
                        </label>
                        <textarea 
                          required={contactReason !== 'work'}
                          rows={4} 
                          className="w-full px-3 py-2 border border-steel bg-obsidian text-slate-200 rounded-sm font-mono text-xs focus:ring-1 focus:ring-amber focus:border-amber outline-none resize-none"
                        ></textarea>
                      </div>
                    )}

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
