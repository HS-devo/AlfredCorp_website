import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, ChevronRight, ArrowRight } from 'lucide-react';

export function PricingSection({ onRequestInvite, onContactUs }: { onRequestInvite?: () => void, onContactUs?: () => void }) {
  return (
    <section id="pricing" className="py-24 bg-carbon border-t border-steel relative bg-grid-pattern">
      <div className="absolute inset-0 bg-gradient-to-t from-obsidian to-transparent opacity-90 z-0"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-slate-100 tracking-tight mb-4">
            Flexible Deployment Models
          </h2>
          <p className="text-lg text-slate-400">
            Choose the model that fits your operational needs. From fully hosted, to custom deployments on your own infrastructure.
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
                  Hosted Agents
                </div>
                <h3 className="text-2xl font-heading font-bold text-slate-100 uppercase tracking-wide">Per-Task Pricing</h3>
              </div>
            </div>
            
            <p className="text-slate-400 mb-8 border-b border-steel pb-8 text-lg">
               We supply the stack, maintain the agents, and provide the professional for verification.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-x-6 gap-y-4 mb-8">
              <div className="flex gap-3 items-center">
                <CheckCircle2 className="w-4 h-4 text-amber flex-shrink-0" />
                <span className="font-mono text-xs text-slate-300">Upfront Task Quotes & Pre-approvals</span>
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
            </div>
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
              Custom Agents
            </div>
            <h3 className="text-2xl font-heading font-bold text-slate-100 uppercase tracking-wide mb-4">Custom Deployment</h3>
            <p className="text-slate-400 mb-8 leading-relaxed font-sans">
               We build the agents to match your custom workflow. Choose between deploying on your infrastructure or ours.
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
