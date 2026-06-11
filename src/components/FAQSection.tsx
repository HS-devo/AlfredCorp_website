import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus } from 'lucide-react';

interface FAQItemProps {
  key?: React.Key;
  question: string;
  answer: React.ReactNode;
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

interface FAQSectionProps {
  onContactClick?: () => void;
}

export function FAQSection({ onContactClick }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [audience, setAudience] = useState<'business' | 'professional'>('business');

  const businessQuestions = [
    {
      question: "Why should I use Alfred Corp instead of setting up my own AI tools?",
      answer: "AI and agents are an amazing tool that is meant to make business easier. But setup, deployment, supervision, maintenance, errors and changing technology creates friction and adds more work for Founders, Entrepreneurs and Small business. That is exactly why we take care of the setup, operational heavy lifting, and human-in-the-loop validation. Giving you a seamless access to the latest AI capabilities without the technical overhead. Every Batman needs an Alfred!"
    },
    {
      question: "Which artificial intelligence models does your platform use?",
      answer: "We work with various base models including Claude, Gemini, and ChatGPT. This multi-model approach allows us to leverage the unique strengths and reasoning capabilities of each model depending on the exact complexity and demands of your business tasks."
    },
    {
      question: "Do I need technical knowledge or complex prompting skills to work with Alfred Corp?",
      answer: "No, our goal is to allow you to focus on what matters most, your business. We provide a straightforward interface so you don't need to learn complex setups, specific prompts for different providers or keep up with changing technology requirements."
    },
    {
      question: "Who are the human professionals reviewing my AI agent output?",
      answer: "The professionals that conduct reviews are experts in their field and, if the specific task requires it, hold the required professional designation. For example, a certified CPA would conduct reviews of financial documents."
    },
    {
      question: "What if my business requires custom deployments or specialized systems?",
      answer: "For custom deployments we work with you to develop a solution that fits your needs. Our dedicated expert integration engineers can design custom workflows, connect proprietary data silos, and tailor human-supervised agent steps to fit your exact business operations."
    },
    {
      question: "How do you handle heavy token tasks and optimize fractional usage?",
      answer: "We manage, distribute, and optimize tasks by leveraging fractional usage. All foundational model providers set usage limits, even on their highest tiers. We distribute when tasks are completed, maximizing usage of rolling limits and use the right model for the task. This ensures our users get the best output at the lowest cost."
    },
    {
      question: "What is the primary advantage of utilizing fractional professionals?",
      answer: "With fractional professionals, you secure seasoned executive-level expertise—such as certified CPAs, operations leaders, and regulatory experts—precisely when your tasks demand it. This approach removes the heavy financial footprint of full-time salaries, payroll taxes, and benefits while guaranteeing that professionals are available when you need them."
    },
    {
      question: "Why use Alfred Corp to help build Custom Workflows rather than any software developer?",
      answer: "Creating robust AI agent workflows requires specific expertise. Our dedicated development team understands how to work with AI in an effective, efficient, and safe manner. The team will ensure that guardrails, grounding techniques, and other best practices are utilized to maximize workflow success and uptime for your business."
    }
  ];

  const professionalQuestions = [
    {
      question: "Why should I partner with Alfred Corp as a professional services provider?",
      answer: "We eliminate the friction of client onboarding, data collection, and preliminary processing. Our AI agents handle the repetitive task preparation, data structuring, and drafting so you can focus on delivering professional expertise and positive business outcomes."
    },
    {
      question: "Do I need to maintain any AI infrastructure or learn prompt engineering?",
      answer: "Not at all. We handle all backend infrastructure, model updates, and workflow logic. You simply log into our platform to deliver professional expertise and positive business outcomes."
    },
    {
      question: "How do you accommodate my specific professional standards and workflows?",
      answer: "Our integration team works with you to map out your exact compliance and review procedures. We configure our AI agents to structure data according to your specific rubrics, ensuring outputs are formatted precisely the way you need to review them."
    },
    {
      question: "How do I manage my availability and capacity?",
      answer: "As an independent professional in our network, you have full control over your capacity. You can scale the volume of tasks you choose to review up or down at any time based on your current bandwidth."
    },
    {
      question: "Which artificial intelligence models power the workflows?",
      answer: "We employ a fractional approach, utilizing different models like Claude, Gemini, and ChatGPT. This ensures that the workflows are conducted by models best suited for the task."
    },
    {
      question: "I am an accredited professional. How do I join the Alfred Corp network?",
      answer: (
        <span>
          We are constantly expanding our network of professionals. If you are a professional services provider, please <button type="button" onClick={(e) => { e.preventDefault(); onContactClick?.(); }} className="text-amber hover:text-amber/80 underline decoration-amber/30 underline-offset-2 bg-transparent border-none p-0 cursor-pointer text-xs sm:text-sm font-sans inline">use our contact form</button> to get in touch.
        </span>
      )
    }
  ];

  const activeQuestions = audience === 'business' ? businessQuestions : professionalQuestions;

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-carbon relative border-b border-steel bg-grid-pattern">
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-transparent to-obsidian opacity-40 pointer-events-none"></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-slate-100 tracking-tight mb-8">
            Frequently Asked Questions
          </h2>
          
          <div className="inline-flex flex-col sm:flex-row items-center p-1 bg-obsidian border border-steel rounded-lg w-full sm:w-auto">
            <button 
              onClick={() => { setAudience('business'); setOpenIndex(null); }}
              className={`w-full sm:w-auto px-4 sm:px-6 py-2.5 rounded-md text-sm font-medium transition-all cursor-pointer ${audience === 'business' ? 'bg-carbon text-amber shadow-sm border border-steel/50' : 'text-slate-400 hover:text-slate-200 hover:bg-carbon/50'}`}
            >
              I am a small business, founder or entrepreneur
            </button>
            <button 
              onClick={() => { setAudience('professional'); setOpenIndex(null); }}
              className={`w-full sm:w-auto mt-1 sm:mt-0 sm:ml-1 px-4 sm:px-6 py-2.5 rounded-md text-sm font-medium transition-all cursor-pointer ${audience === 'professional' ? 'bg-carbon text-amber shadow-sm border border-steel/50' : 'text-slate-400 hover:text-slate-200 hover:bg-carbon/50'}`}
            >
              I am a Professional Services Provider
            </button>
          </div>
        </div>

        <motion.div 
          key={audience}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          {activeQuestions.map((item, index) => (
            <FAQItem 
              key={index}
              index={index}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
