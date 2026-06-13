import React, { useState } from 'react';
import { X, Loader } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { supabase } from '../lib/supabase';

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
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Controlled form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companySize, setCompanySize] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [otherService, setOtherService] = useState('');
  const [workflowContext, setWorkflowContext] = useState('');
  const [source, setSource] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMessage(null);

    try {
      const { error: supabaseError } = await supabase
        .from('waitlist_requests')
        .insert({
          name:             name,
          email:            email,
          phone:            phone,
          role:             role,
          company_name:     companyName,
          company_size:     companySize,
          services:         selectedServices.join(', '),
          other_service:    selectedServices.includes('Other') ? otherService : '',
          workflow_context: selectedServices.length > 0 ? workflowContext : '',
          source:           source,
        });

      if (supabaseError) {
        throw new Error(supabaseError.message);
      }

      fetch('/api/waitlist/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      }).catch((err) => console.warn('Waitlist confirmation email failed (non-blocking):', err));

      setSubmitted(true);
    } catch (err) {
      console.error("Waitlist submit error:", err);
      const errMsg = err instanceof Error ? err.message : String(err);
      setErrorMessage(`Unable to submit: ${errMsg}`);
    } finally {
      setSubmitting(false);
    }
  };

  const toggleService = (service: string) => {
    setSelectedServices(prev => 
      prev.includes(service) 
        ? prev.filter(s => s !== service)
        : [...prev, service]
    );
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setSubmitting(false);
    setErrorMessage(null);
    setName('');
    setEmail('');
    setPhone('');
    setRole('');
    setCompanyName('');
    setCompanySize('');
    setSelectedServices([]);
    setOtherService('');
    setWorkflowContext('');
    setSource('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-obsidian/85 backdrop-blur-sm z-50"
            onClick={handleResetAndClose}
          />
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-carbon border border-steel rounded-sm shadow-glow-lg z-50 max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 sm:p-8 relative">
              <button
                onClick={handleResetAndClose}
                className="absolute top-4 right-4 p-2 text-slate-500 hover:text-amber bg-obsidian border border-steel hover:border-amber transition-colors rounded-sm cursor-pointer"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>

              {submitted ? (
                <div id="waitlist-success" className="text-center py-12">
                  <div className="w-16 h-16 bg-obsidian border border-emerald-500/50 shadow-glow rounded-sm flex items-center justify-center mx-auto mb-6 animate-bounce">
                    <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-heading font-bold text-slate-100 mb-2">Access Requested</h3>
                  <p className="text-slate-400 font-mono text-xs tracking-widest">Invites are dispatched on Tuesdays.</p>
                  <button
                    onClick={handleResetAndClose}
                    className="mt-8 btn-ghost w-full px-6 py-3 rounded-sm font-mono text-xs uppercase tracking-widest shadow-lg transition-shadow cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-heading font-bold text-slate-100 mb-6 font-sans">Request Access</h2>

                  {errorMessage && (
                    <div className="mb-4 p-3 bg-red-900/20 border border-red-500/30 text-red-400 text-xs font-mono rounded-sm">
                      {errorMessage}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono text-slate-300 tracking-widest uppercase mb-1">Full Name <span className="text-red-500">*</span></label>
                        <input 
                          required 
                          type="text" 
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Your Name"
                          className="w-full px-3 py-2 border border-steel bg-obsidian text-slate-200 rounded-sm font-mono text-xs focus:ring-1 focus:ring-amber focus:border-amber outline-none" 
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-slate-300 tracking-widest uppercase mb-1">Email <span className="text-red-500">*</span></label>
                        <input 
                          required 
                          type="email" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@company.com"
                          className="w-full px-3 py-2 border border-steel bg-obsidian text-slate-200 rounded-sm font-mono text-xs focus:ring-1 focus:ring-amber focus:border-amber outline-none" 
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono text-slate-300 tracking-widest uppercase mb-1">Phone Number <span className="text-red-500">*</span></label>
                        <input 
                          required 
                          type="tel" 
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+1 (555) 000-0000" 
                          className="w-full px-3 py-2 border border-steel bg-obsidian text-slate-200 rounded-sm font-mono text-xs focus:ring-1 focus:ring-amber focus:border-amber outline-none" 
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-slate-300 tracking-widest uppercase mb-1">Role <span className="text-red-500">*</span></label>
                        <select 
                          required 
                          value={role}
                          onChange={(e) => setRole(e.target.value)}
                          className="w-full px-3 py-2 border border-steel bg-obsidian text-slate-200 rounded-sm font-mono text-xs focus:ring-1 focus:ring-amber focus:border-amber outline-none"
                        >
                          <option value="">Select a role...</option>
                          <option value="owner">Founder / Owner</option>
                          <option value="developer">Developer / Engineer</option>
                          <option value="manager">Manager / Director</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono text-slate-300 tracking-widest uppercase mb-1">Company Name <span className="text-red-500">*</span></label>
                        <input 
                          required 
                          type="text" 
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          placeholder="Acme Corp"
                          className="w-full px-3 py-2 border border-steel bg-obsidian text-slate-200 rounded-sm font-mono text-xs focus:ring-1 focus:ring-amber focus:border-amber outline-none" 
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-slate-300 tracking-widest uppercase mb-1">Company Size <span className="text-red-500">*</span></label>
                        <select 
                          required 
                          value={companySize}
                          onChange={(e) => setCompanySize(e.target.value)}
                          className="w-full px-3 py-2 border border-steel bg-obsidian text-slate-200 rounded-sm font-mono text-xs focus:ring-1 focus:ring-amber focus:border-amber outline-none"
                        >
                          <option value="">Select company size...</option>
                          <option value="1-9">1-9 employees</option>
                          <option value="10-49">10-49 employees</option>
                          <option value="50-249">50-249 employees</option>
                          <option value="250+">250+ employees</option>
                        </select>
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
                              required={selectedServices.includes('Other')} 
                              type="text" 
                              value={otherService}
                              onChange={(e) => setOtherService(e.target.value)}
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
                          value={workflowContext}
                          onChange={(e) => setWorkflowContext(e.target.value)}
                          placeholder="Describe your current processes or challenges..."
                          className="w-full px-3 py-2 border border-steel bg-obsidian text-slate-200 rounded-sm font-mono text-xs focus:ring-1 focus:ring-amber focus:border-amber outline-none resize-none"
                        ></textarea>
                      </motion.div>
                    )}

                    <div>
                      <label className="block text-xs font-mono text-slate-300 tracking-widest uppercase mb-1">Source <span className="text-red-500">*</span></label>
                      <select 
                        required 
                        value={source}
                        onChange={(e) => setSource(e.target.value)}
                        className="w-full px-3 py-2 border border-steel bg-obsidian text-slate-200 rounded-sm font-mono text-xs focus:ring-1 focus:ring-amber focus:border-amber outline-none appearance-none"
                      >
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
                      disabled={submitting}
                      className="btn-primary w-full py-4 rounded-sm font-mono text-xs uppercase tracking-widest mt-6 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submitting ? (
                        <>
                          <Loader className="w-4 h-4 animate-spin text-amber" />
                          Submitting...
                        </>
                      ) : (
                        'Submit'
                      )}
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
