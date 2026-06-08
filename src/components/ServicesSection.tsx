import { useState } from 'react';
import { Code2, Server, LineChart, Users, HeartPulse, Calculator, CalendarClock, ChevronDown, Megaphone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const services = [
  {
    id: 'software',
    title: 'Software Development',
    icon: <Code2 className="h-5 w-5 text-blue-400" />,
    skills: ['Build a website', 'Build a Dashboard', 'Convert to a mobile app', 'Create data pipeline'],
    colorClass: 'border-blue-400 hover:bg-blue-400/5',
    colorStyle: { boxShadow: '0 0 15px rgba(96,165,250,0.4)' },
    iconBgClass: 'bg-obsidian border border-blue-400',
    iconBgStyle: { boxShadow: '0 0 10px rgba(96,165,250,0.3)' },
    colorKey: 'text-blue-400',
  },
  {
    id: 'it',
    title: 'IT Management',
    icon: <Server className="h-5 w-5 text-cyan-400" />,
    skills: ['Draft Documents (Welcome package, Guides)', 'Onboard Employee and provision IT Resources', 'Offboard and deprovision', 'Update database backup'],
    colorClass: 'border-cyan-400 hover:bg-cyan-400/5',
    colorStyle: { boxShadow: '0 0 15px rgba(34,211,238,0.4)' },
    iconBgClass: 'bg-obsidian border border-cyan-400',
    iconBgStyle: { boxShadow: '0 0 10px rgba(34,211,238,0.3)' },
    colorKey: 'text-cyan-400',
  },
  {
    id: 'data',
    title: 'Data Science',
    icon: <LineChart className="h-5 w-5 text-purple-400" />,
    skills: ['Conduct Analysis (Customer Segmentation, Sales & Inventory Forecasting, Churn Analysis)', 'Visualize (Sales Data, Health and Safety Metrics, Website traffic)'],
    colorClass: 'border-purple-400 hover:bg-purple-400/5',
    colorStyle: { boxShadow: '0 0 15px rgba(192,132,252,0.4)' },
    iconBgClass: 'bg-obsidian border border-purple-400',
    iconBgStyle: { boxShadow: '0 0 10px rgba(192,132,252,0.3)' },
    colorKey: 'text-purple-400',
  },
  {
    id: 'hr',
    title: 'Human Resources',
    icon: <Users className="h-5 w-5 text-rose-400" />,
    skills: ['Draft Documents (Job Description, Offer letter, interview questions)', 'Update policies', 'Onboard Employee and provision HR Resources'],
    colorClass: 'border-rose-400 hover:bg-rose-400/5',
    colorStyle: { boxShadow: '0 0 15px rgba(251,113,133,0.4)' },
    iconBgClass: 'bg-obsidian border border-rose-400',
    iconBgStyle: { boxShadow: '0 0 10px rgba(251,113,133,0.3)' },
    colorKey: 'text-rose-400',
  },
  {
    id: 'hs',
    title: 'Health and Safety',
    icon: <HeartPulse className="h-5 w-5 text-emerald-400" />,
    skills: ['Draft documents (Job Hazard Analyses, inspection checklists, Toolbox talks)', 'Update policies', 'Onboard Employee and provision OHS Resources'],
    colorClass: 'border-emerald-400 hover:bg-emerald-400/5',
    colorStyle: { boxShadow: '0 0 15px rgba(52,211,153,0.4)' },
    iconBgClass: 'bg-obsidian border border-emerald-400',
    iconBgStyle: { boxShadow: '0 0 10px rgba(52,211,153,0.3)' },
    colorKey: 'text-emerald-400',
  },
  {
    id: 'marketing',
    title: 'Marketing',
    icon: <Megaphone className="h-5 w-5 text-pink-400" />,
    skills: ['Social media content creation', 'Ad campaign management', 'SEO optimizations'],
    colorClass: 'border-pink-400 hover:bg-pink-400/5',
    colorStyle: { boxShadow: '0 0 15px rgba(244,114,182,0.4)' },
    iconBgClass: 'bg-obsidian border border-pink-400',
    iconBgStyle: { boxShadow: '0 0 10px rgba(244,114,182,0.3)' },
    colorKey: 'text-pink-400',
  },
  {
    id: 'accounting',
    title: 'Accounting',
    icon: <Calculator className="h-5 w-5 text-orange-400" />,
    skills: ['Month-End Close', 'List overdue customer accounts', 'Compile standard financial statements'],
    colorClass: 'border-orange-400 hover:bg-orange-400/5',
    colorStyle: { boxShadow: '0 0 15px rgba(251,146,60,0.4)' },
    iconBgClass: 'bg-obsidian border border-orange-400',
    iconBgStyle: { boxShadow: '0 0 10px rgba(251,146,60,0.3)' },
    colorKey: 'text-orange-400',
  },
  {
    id: 'admin',
    title: 'Admin Support',
    icon: <CalendarClock className="h-5 w-5 text-amber-500" />,
    skills: ['Draft documents (Emails, To do list, Thank you letters)', 'Document parsing', 'Scheduling meetings'],
    colorClass: 'border-amber-500 hover:bg-amber-500/5',
    colorStyle: { boxShadow: '0 0 15px rgba(245,158,11,0.4)' },
    iconBgClass: 'bg-obsidian border border-amber-500',
    iconBgStyle: { boxShadow: '0 0 10px rgba(245,158,11,0.3)' },
    colorKey: 'text-amber-500',
  },
];

export function ServicesSection() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="services" className="py-24 bg-obsidian bg-grid-pattern border-b border-steel relative">
      <div className="absolute inset-0 bg-gradient-to-t from-carbon to-transparent opacity-80 z-0 pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-slate-100 tracking-tight mb-4">
            Agent Abilities
          </h2>
          <p className="text-lg text-slate-400">
            A powerful suite of agents offering corprate services grounded by professional oversight.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
          {[
            services[0], services[4], services[6], services[5],
            services[1], services[3], services[2], services[7]
          ].map((service) => {
            const isExpanded = expandedId === service.id;
            const isHovered = hoveredId === service.id;
            return (
              <motion.div 
                layout
                key={service.id} 
                onClick={() => toggleExpand(service.id)}
                onMouseEnter={() => setHoveredId(service.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`p-5 border rounded-sm shadow-soft-dark flex flex-col cursor-pointer transition-all bg-carbon ${service.colorClass}`}
                style={isHovered ? service.colorStyle : {}}
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div 
                      className={`w-8 h-8 rounded-sm flex items-center justify-center shrink-0 transition-all ${service.iconBgClass}`}
                      style={isHovered ? service.iconBgStyle : {}}
                    >
                      {service.icon}
                    </div>
                    <h3 className="text-sm font-heading font-bold text-slate-200 tracking-wide leading-tight">{service.title}</h3>
                  </div>
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className={`shrink-0 ${service.colorKey} mt-1`}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </motion.div>
                </div>
                
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 space-y-2 mb-3 max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-steel pr-2 mx-[-4px] px-[4px]">
                        <ul className="space-y-1.5 flex-1">
                          {service.skills.map((skill, index) => (
                            <li key={index} className="flex text-xs text-slate-300 items-start gap-2">
                              <span className={`${service.colorKey} mt-0.5 shrink-0`}>•</span> 
                              <span>{skill}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
