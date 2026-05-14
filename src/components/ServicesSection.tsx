import { useState } from 'react';
import { Code2, Server, LineChart, Users, HeartPulse, Calculator, CalendarClock, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const services = [
  {
    id: 'software',
    title: 'Software Development',
    icon: <Code2 className="h-5 w-5 text-blue-400" />,
    aiTask: 'AI scaffolds boilerplate routing and component skeleton.',
    humanTask: 'Sr. Developer reviews PR for security and architecture.',
    useCase: 'Accelerating MVP launch for a Canadian startup.',
    colorClass: 'border-blue-400 hover:bg-blue-400/5',
    colorStyle: { boxShadow: '0 0 15px rgba(96,165,250,0.4)' },
    iconBgClass: 'bg-obsidian border border-blue-400',
    iconBgStyle: { boxShadow: '0 0 10px rgba(96,165,250,0.3)' },
    colorKey: 'text-blue-400',
    colSpan: 'md:col-span-2 lg:col-span-2',
  },
  {
    id: 'it',
    title: 'IT Infrastructure',
    icon: <Server className="h-5 w-5 text-cyan-400" />,
    aiTask: 'AI routes tickets and pre-diagnoses connection issues.',
    humanTask: 'Sysadmin handles complex network outages and backups.',
    useCase: 'Secure PIPEDA-compliant cloud server setup.',
    colorClass: 'border-cyan-400 hover:bg-cyan-400/5',
    colorStyle: { boxShadow: '0 0 15px rgba(34,211,238,0.4)' },
    iconBgClass: 'bg-obsidian border border-cyan-400',
    iconBgStyle: { boxShadow: '0 0 10px rgba(34,211,238,0.3)' },
    colorKey: 'text-cyan-400',
    colSpan: 'md:col-span-1 lg:col-span-1',
  },
  {
    id: 'data',
    title: 'Data Science',
    icon: <LineChart className="h-5 w-5 text-purple-400" />,
    aiTask: 'AI cleans raw datasets and maps anomalies quickly.',
    humanTask: 'Data Scientist builds and validates predictive models.',
    useCase: 'Market analysis for Canadian provincial expansion.',
    colorClass: 'border-purple-400 hover:bg-purple-400/5',
    colorStyle: { boxShadow: '0 0 15px rgba(192,132,252,0.4)' },
    iconBgClass: 'bg-obsidian border border-purple-400',
    iconBgStyle: { boxShadow: '0 0 10px rgba(192,132,252,0.3)' },
    colorKey: 'text-purple-400',
    colSpan: 'md:col-span-1 lg:col-span-1',
  },
  {
    id: 'hr',
    title: 'Human Resources',
    icon: <Users className="h-5 w-5 text-rose-400" />,
    aiTask: 'AI drafts standard employment contracts and policies.',
    humanTask: 'HR Pro ensures provincial labor code compliance.',
    useCase: 'Managing hiring across different Canadian provinces.',
    colorClass: 'border-rose-400 hover:bg-rose-400/5',
    colorStyle: { boxShadow: '0 0 15px rgba(251,113,133,0.4)' },
    iconBgClass: 'bg-obsidian border border-rose-400',
    iconBgStyle: { boxShadow: '0 0 10px rgba(251,113,133,0.3)' },
    colorKey: 'text-rose-400',
    colSpan: 'md:col-span-1 lg:col-span-2',
  },
  {
    id: 'hs',
    title: 'Health and Safety',
    icon: <HeartPulse className="h-5 w-5 text-emerald-400" />,
    aiTask: 'AI flags common workplace risks based on industry data.',
    humanTask: 'H&S Officer audits safety policies and signs off.',
    useCase: 'Ensuring strict WSIB / WorkSafeBC compliance.',
    colorClass: 'border-emerald-400 hover:bg-emerald-400/5',
    colorStyle: { boxShadow: '0 0 15px rgba(52,211,153,0.4)' },
    iconBgClass: 'bg-obsidian border border-emerald-400',
    iconBgStyle: { boxShadow: '0 0 10px rgba(52,211,153,0.3)' },
    colorKey: 'text-emerald-400',
    colSpan: 'md:col-span-1 lg:col-span-2',
  },
  {
    id: 'accounting',
    title: 'Accounting',
    icon: <Calculator className="h-5 w-5 text-orange-400" />,
    aiTask: 'AI categorizes hundreds of monthly receipts in seconds.',
    humanTask: 'Certified Accountant reviews final ledger and taxes.',
    useCase: 'GST/HST/PST tax filing and audit support.',
    colorClass: 'border-orange-400 hover:bg-orange-400/5',
    colorStyle: { boxShadow: '0 0 15px rgba(251,146,60,0.4)' },
    iconBgClass: 'bg-obsidian border border-orange-400',
    iconBgStyle: { boxShadow: '0 0 10px rgba(251,146,60,0.3)' },
    colorKey: 'text-orange-400',
    colSpan: 'md:col-span-1 lg:col-span-3',
  },
  {
    id: 'admin',
    title: 'Admin Support',
    icon: <CalendarClock className="h-5 w-5 text-amber-500" />,
    aiTask: 'AI drafts schedule proposals and email replies.',
    humanTask: 'Executive Admin finalizes, prioritizes, and sends.',
    useCase: 'Managing complex scheduling across Canadian time zones.',
    colorClass: 'border-amber-500 hover:bg-amber-500/5',
    colorStyle: { boxShadow: '0 0 15px rgba(245,158,11,0.4)' },
    iconBgClass: 'bg-obsidian border border-amber-500',
    iconBgStyle: { boxShadow: '0 0 10px rgba(245,158,11,0.3)' },
    colorKey: 'text-amber-500',
    colSpan: 'md:col-span-1 lg:col-span-1',
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
            Everything your business needs
          </h2>
          <p className="text-lg text-slate-400">
            A complete suite of back-office services powered by AI speed and grounded by Canadian professional oversight.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
          {[
            [services[0], services[1], services[2]],
            [services[4], services[3]],
            [services[6], services[5]]
          ].map((column, colIdx) => (
            <div key={colIdx} className="flex flex-col gap-4">
              {column.map((service) => {
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
                          className={`w-8 h-8 rounded-sm flex items-center justify-center transition-all ${service.iconBgClass}`}
                          style={isHovered ? service.iconBgStyle : {}}
                        >
                          {service.icon}
                        </div>
                        <h3 className="text-sm font-heading font-bold text-slate-200 tracking-wide">{service.title}</h3>
                      </div>
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className={`${service.colorKey} mt-1`}
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
                          <div className="pt-4 space-y-2 mb-3 font-mono">
                            <div className="text-xs text-slate-400">
                              <span className={`font-semibold ${service.colorKey} bg-obsidian border border-steel px-1`}>SYS:</span> {service.aiTask}
                            </div>
                            <div className="text-xs text-slate-400">
                              <span className="font-semibold text-slate-300 bg-obsidian border border-steel px-1">HUM:</span> {service.humanTask}
                            </div>
                          </div>
                            
                          <div className="mt-auto pt-3 border-t border-steel font-mono">
                            <p className="text-xs text-slate-500"><span className={`font-semibold ${service.colorKey}`}>Use Case:</span> {service.useCase}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
