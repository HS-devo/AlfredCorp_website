import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Loader } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultReason?: string;
}

export function ContactModal({ isOpen, onClose, defaultReason }: ContactModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Controlled states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [contactReason, setContactReason] = useState('');
  const [phone, setPhone] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [website, setWebsite] = useState('');
  const [expectedUsers, setExpectedUsers] = useState<number | ''>('');
  const [projectScope, setProjectScope] = useState('');
  const [projectSuccess, setProjectSuccess] = useState('');
  const [additionalNote, setAdditionalNote] = useState('');
  const [profService, setProfService] = useState('');
  const [otherService, setOtherService] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (isOpen) {
      setSubmitted(false);
      setSubmitting(false);
      setErrorMessage(null);
      setName('');
      setEmail('');
      setRole('');
      setPhone('');
      setCompanyName('');
      setWebsite('');
      setExpectedUsers('');
      setProjectScope('');
      setProjectSuccess('');
      setAdditionalNote('');
      setProfService('');
      setOtherService('');
      setLinkedinUrl('');
      setMessage('');

      if (defaultReason) {
        setContactReason(defaultReason);
      } else {
        setContactReason('');
      }
    }
  }, [isOpen, defaultReason]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMessage(null);

    try {
      const payload: Record<string, any> = {
        name,
        email,
        role,
        contactReason
      };

      // Reason-dependent fields
      if (contactReason === 'custom_dev' || contactReason === 'work') {
        payload.phone = phone;
      }
      if (contactReason === 'custom_dev') {
        payload.companyName = companyName;
        payload.website = website;
        payload.expectedUsers = Number(expectedUsers) || 0;
        payload.projectScope = projectScope;
        payload.projectSuccess = projectSuccess;
        payload.additionalNote = additionalNote;
      }
      if (contactReason === 'work') {
        payload.professionalService = profService;
        if (profService === 'other') {
          payload.otherService = otherService;
        }
        payload.linkedinUrl = linkedinUrl;
      }

      if (contactReason !== 'custom_dev') {
        payload.message = message;
      }

      const messageParts: string[] = [];
      if (payload.contactReason) messageParts.push(`Reason: ${payload.contactReason}`);
      if (payload.role) messageParts.push(`Role: ${payload.role}`);
      if (payload.phone) messageParts.push(`Phone: ${payload.phone}`);
      if (payload.companyName) messageParts.push(`Company: ${payload.companyName}`);
      if (payload.website) messageParts.push(`Website: ${payload.website}`);
      if (payload.expectedUsers) messageParts.push(`Expected users: ${payload.expectedUsers}`);
      if (payload.projectScope) messageParts.push(`Project scope: ${payload.projectScope}`);
      if (payload.projectSuccess) messageParts.push(`Success looks like: ${payload.projectSuccess}`);
      if (payload.additionalNote) messageParts.push(`Additional note: ${payload.additionalNote}`);
      if (payload.professionalService) messageParts.push(`Service type: ${payload.professionalService}`);
      if (payload.otherService) messageParts.push(`Other service: ${payload.otherService}`);
      if (payload.linkedinUrl) messageParts.push(`LinkedIn: ${payload.linkedinUrl}`);
      if (payload.message) messageParts.push(`Message: ${payload.message}`);

      const { error: supabaseError } = await supabase
        .from('contact_submissions')
        .insert({
          name: payload.name,
          email: payload.email,
          role: payload.role || null,
          message: messageParts.join('\n'),
        });

      if (supabaseError) {
        throw new Error(supabaseError.message);
      }

      fetch('/api/contact/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: payload.name,
          email: payload.email,
          message: messageParts.join('\n'),
        }),
      }).catch((err) => console.warn('Confirmation email failed (non-blocking):', err));

      setSubmitted(true);
    } catch (err) {
      console.error("Contact Form submit error:", err);
      const errMsg = err instanceof Error ? err.message : String(err);
      setErrorMessage(`Unable to save message: ${errMsg}`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
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
                <div id="contact-success" className="text-center py-8">
                  <div className="w-16 h-16 bg-obsidian border border-emerald-500/50 shadow-glow rounded-sm flex items-center justify-center mx-auto mb-6">
                    <Send className="w-8 h-8 text-emerald-400" />
                  </div>
                  <h3 className="text-2xl font-heading font-bold text-slate-100 mb-2">Message Sent</h3>
                  <p className="text-slate-400 font-mono text-xs tracking-widest">We will respond shortly.</p>
                  <button
                    onClick={handleResetAndClose}
                    className="mt-8 btn-ghost w-full px-6 py-3 rounded-sm font-mono text-xs uppercase tracking-widest shadow-lg transition-shadow cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-heading font-bold text-slate-100 mb-2 font-sans">Contact Us</h2>
                  <p className="text-slate-400 mb-6 font-mono text-xs">Please fill out the form below.</p>

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

                    <div>
                      <label className="block text-xs font-mono text-slate-300 tracking-widest uppercase mb-1">Role <span className="text-red-500">*</span></label>
                      <select 
                        required 
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full px-3 py-2 border border-steel bg-obsidian text-slate-200 rounded-sm font-mono text-xs focus:ring-1 focus:ring-amber focus:border-amber outline-none appearance-none"
                      >
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
                          <input 
                            required={contactReason === 'custom_dev' || contactReason === 'work'} 
                            type="tel" 
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+1 (555) 000-0000"
                            className="w-full px-3 py-2 border border-steel bg-obsidian text-slate-200 rounded-sm font-mono text-xs focus:ring-1 focus:ring-amber focus:border-amber outline-none" 
                          />
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
                              <input 
                                required={contactReason === 'custom_dev'} 
                                type="text" 
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                                placeholder="Acme Corp"
                                className="w-full px-3 py-2 border border-steel bg-obsidian text-slate-200 rounded-sm font-mono text-xs focus:ring-1 focus:ring-amber focus:border-amber outline-none" 
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-mono text-slate-300 tracking-widest uppercase mb-1">Website <span className="text-red-500">*</span></label>
                              <input 
                                required={contactReason === 'custom_dev'} 
                                type="url" 
                                value={website}
                                onChange={(e) => setWebsite(e.target.value)}
                                placeholder="https://example.com" 
                                className="w-full px-3 py-2 border border-steel bg-obsidian text-slate-200 rounded-sm font-mono text-xs focus:ring-1 focus:ring-amber focus:border-amber outline-none" 
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs font-mono text-slate-300 tracking-widest uppercase mb-1">Expected number of users <span className="text-red-500">*</span></label>
                            <input 
                              required={contactReason === 'custom_dev'} 
                              type="number" 
                              min="1" 
                              value={expectedUsers}
                              onChange={(e) => setExpectedUsers(e.target.value === '' ? '' : Number(e.target.value))}
                              placeholder="10"
                              className="w-full px-3 py-2 border border-steel bg-obsidian text-slate-200 rounded-sm font-mono text-xs focus:ring-1 focus:ring-amber focus:border-amber outline-none" 
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-mono text-slate-300 tracking-widest uppercase mb-1">Describe Project Scope <span className="text-red-500">*</span></label>
                            <textarea 
                              required={contactReason === 'custom_dev'} 
                              rows={3} 
                              value={projectScope}
                              onChange={(e) => setProjectScope(e.target.value)}
                              placeholder="Detail out the processes you need automated..." 
                              className="w-full px-3 py-2 border border-steel bg-obsidian text-slate-200 rounded-sm font-mono text-xs focus:ring-1 focus:ring-amber focus:border-amber outline-none resize-none"
                            ></textarea>
                          </div>

                          <div>
                            <label className="block text-xs font-mono text-slate-300 tracking-widest uppercase mb-1">What project success looks like for you <span className="text-red-500">*</span></label>
                            <textarea 
                              required={contactReason === 'custom_dev'} 
                              rows={2} 
                              value={projectSuccess}
                              onChange={(e) => setProjectSuccess(e.target.value)}
                              placeholder="e.g. 50% time saved on client onboarding"
                              className="w-full px-3 py-2 border border-steel bg-obsidian text-slate-200 rounded-sm font-mono text-xs focus:ring-1 focus:ring-amber focus:border-amber outline-none resize-none"
                            ></textarea>
                          </div>

                          <div>
                            <label className="block text-xs font-mono text-slate-300 tracking-widest uppercase mb-1">Additional note <span className="text-slate-400 font-normal normal-case">(Optional)</span></label>
                            <textarea 
                              rows={2} 
                              value={additionalNote}
                              onChange={(e) => setAdditionalNote(e.target.value)}
                              placeholder="Any other details..."
                              className="w-full px-3 py-2 border border-steel bg-obsidian text-slate-200 rounded-sm font-mono text-xs focus:ring-1 focus:ring-amber focus:border-amber outline-none resize-none"
                            ></textarea>
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
                              required={contactReason === 'work'} 
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
                              <input 
                                required={contactReason === 'work' && profService === 'other'} 
                                type="text"
                                value={otherService}
                                onChange={(e) => setOtherService(e.target.value)}
                                placeholder="Your professional service"
                                className="w-full px-3 py-2 border border-steel bg-obsidian text-slate-200 rounded-sm font-mono text-xs focus:ring-1 focus:ring-amber focus:border-amber outline-none" 
                              />
                            </motion.div>
                          )}

                          <div>
                            <label className="block text-xs font-mono text-slate-300 tracking-widest uppercase mb-1">LinkedIn / Portfolio URL <span className="text-slate-400 font-normal normal-case">(Optional)</span></label>
                            <input 
                              type="url" 
                              value={linkedinUrl}
                              onChange={(e) => setLinkedinUrl(e.target.value)}
                              placeholder="https://linkedin.com/in/..." 
                              className="w-full px-3 py-2 border border-steel bg-obsidian text-slate-200 rounded-sm font-mono text-xs focus:ring-1 focus:ring-amber focus:border-amber outline-none" 
                            />
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
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Tell us what you're looking for..."
                          className="w-full px-3 py-2 border border-steel bg-obsidian text-slate-200 rounded-sm font-mono text-xs focus:ring-1 focus:ring-amber focus:border-amber outline-none resize-none"
                        ></textarea>
                      </div>
                    )}

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
