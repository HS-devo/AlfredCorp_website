import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus, HelpCircle } from 'lucide-react';

interface FAQItemProps {
  key?: React.Key;
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}

function FAQItem({ question, answer, isOpen, onToggle, index }: FAQItemProps) {
  return (
    <div 
      className={`border border-steel rounded-2xl bg-carbon overflow-hidden transition-all duration-300 ${
        isOpen ? 'shadow-[0_0_20px_rgba(245,158,11,0.05)] border-amber/30' : 'hover:border-slate-700'
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-5 sm:p-6 text-left focus:outline-none group"
        aria-expanded={isOpen}
      >
        <span className="text-sm sm:text-base font-semibold text-slate-200 group-hover:text-amber transition-colors pr-4">
          {question}
        </span>
        <div className={`p-1.5 rounded-lg border transition-all ${
          isOpen ? 'bg-amber/10 border-amber/30 text-amber' : 'bg-obsidian border-steel text-slate-500 group-hover:text-slate-300'
        }`}>
          {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-steel/50 pt-4 bg-obsidian/30">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const keyQuestions = [
    {
      question: "Why should I use Alfred Corp instead of setting up my own AI tools?",
      answer: "AI and agents are an amazing technology that is meant to make lives easier. But setup, deployment, supervision, maintenance, and fixing errors creates friction and adds more work for Founders, Entrepreneurs and Small business. After all, even Batman relies on Alfred to maintain the Batcave, tune the Batmobile, and run the estate so he can focus on saving Gotham. That is exactly why we take care of the operational heavy lifting, setup, and human-in-the-loop validation—giving you a seamless, worry-free chief of staff agent network without the tech overhead."
    },
    {
      question: "Which artificial intelligence models does your platform use?",
      answer: "We work with various base models including Claude, Gemini, and ChatGPT. This multi-model core allows us to dynamically leverage the unique strengths and reasoning capabilities of each model depending on the exact complexity and demands of your business tasks."
    },
    {
      question: "Do I need technical knowledge or complex prompting skills to use Alfred Corp?",
      answer: "No, our goal is to allow you to focus on what matters most, your business. We provide a straightforward, natural language interface so you don't need to learn prompting techniques, changing technology requirements, or complex setups. Simply talk and describe the task as you would to a human assistant."
    },
    {
      question: "Who are the human professionals reviewing my AI agent output?",
      answer: "The professionals that conduct reviews are experts in their field and, if the specific tasks requires it, hold the required professional designation. For example, a certified CPA conducts financial document audits and ledger reviews, ensuring full accuracy before anything is signed off."
    },
    {
      question: "What if my business requires custom deployments or specialized systems?",
      answer: "For custom deployments we work with you to develop a solution that fits your needs. Our dedicated expert integration engineers can design custom workflows, connect proprietary data silos, and tailor human-supervised agent steps to fit your exact business operations."
    },
    {
      question: "How do you handle heavy token usage and optimize fractional AI usage?",
      answer: "We manage, distribute, and optimize all token generation and model computing costs dynamically. By leveraging fractional AI usage models, our platform pools resources over multiple processing networks, ensuring that you only pay for actual completed business tasks rather than fixed massive server costs or expensive premium subscriptions."
    },
    {
      question: "What is the primary advantage of utilizing fractional professionals?",
      answer: "With fractional professionals, you secure seasoned executive-level expertise—such as certified CPAs, operations leaders, and regulatory experts—precisely when your tasks demand it. This approach removes the heavy financial footprint of full-time salaries, payroll taxes, and benefits while guaranteeing that verified, elite professionals are signing off on critical business outcomes."
    },
    {
      question: "Why rely on a dedicated AI agent development team rather than building templates in-house?",
      answer: "Creating robust AI agent work pipelines requires rare expertise in agent nesting, API state verification, structured response parsers, and defense against model hallucination. Our dedicated AI agent development team writes, monitors, and continually patches these pipelines. This shields your enterprise from API breaking changes, version depreciations, and system integration failures."
    },
    {
      question: "I am an accredited professional. How do I join the Alfred Corp network?",
      answer: "We are constantly expanding our vetted collective of verifying specialists. If you are a CPA, legal technician, or specialized editor interested in auditing and signing off on high-speed agentic outputs for Canadian startups, please send your credentials and background to us at network@alfredcorp.ca to begin the vetting process."
    }
  ];

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-carbon relative border-b border-steel bg-grid-pattern">
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-transparent to-obsidian opacity-40 pointer-events-none"></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-amber/30 bg-amber/10 text-xs font-mono text-amber mb-6 tracking-widest uppercase">
            <HelpCircle className="w-3.5 h-3.5" />
            Common Questions
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-slate-100 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-slate-400 text-sm sm:text-base">
            Everything you need to know about our supervised AI agent networks and fractional professional reviews.
          </p>
        </div>

        <div className="space-y-4">
          {keyQuestions.map((item, index) => (
            <FAQItem 
              key={index}
              index={index}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
