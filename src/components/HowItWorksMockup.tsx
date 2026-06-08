import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, CheckCircle2, CircleDot, CircleDashed, ArrowRight, Check, Code2, Server, LineChart, Users, HeartPulse, Megaphone, Calculator, CalendarClock, RotateCcw, Building2, User, X, LayoutDashboard, Activity, Zap, Rocket, Plus, Link2, AppWindow, FileText, Database, ShoppingBag } from 'lucide-react';

type WorkflowStep = {
  stepNumber: number;
  agentId: 'software' | 'it' | 'data' | 'hr' | 'hs' | 'marketing' | 'accounting' | 'admin';
  taskName: string;
  statusDetail: string;
};

type Artifact = {
  title: string;
  format: 'text' | 'markdown_table' | 'bullet_list';
  content: string;
};

type MatrixScenario = {
  workflow: WorkflowStep[];
  artifacts: Artifact[];
};

const AGENT_MAP = {
  software: { icon: <Code2 className="w-4 h-4 text-blue-400" />, color: 'text-blue-400', border: 'border-blue-400', bg: 'bg-blue-400/10' },
  it: { icon: <Server className="w-4 h-4 text-cyan-400" />, color: 'text-cyan-400', border: 'border-cyan-400', bg: 'bg-cyan-400/10' },
  data: { icon: <LineChart className="w-4 h-4 text-purple-400" />, color: 'text-purple-400', border: 'border-purple-400', bg: 'bg-purple-400/10' },
  hr: { icon: <Users className="w-4 h-4 text-rose-400" />, color: 'text-rose-400', border: 'border-rose-400', bg: 'bg-rose-400/10' },
  hs: { icon: <HeartPulse className="w-4 h-4 text-emerald-400" />, color: 'text-emerald-400', border: 'border-emerald-400', bg: 'bg-emerald-400/10' },
  marketing: { icon: <Megaphone className="w-4 h-4 text-pink-400" />, color: 'text-pink-400', border: 'border-pink-400', bg: 'bg-pink-400/10' },
  accounting: { icon: <Calculator className="w-4 h-4 text-orange-400" />, color: 'text-orange-400', border: 'border-orange-400', bg: 'bg-orange-400/10' },
  admin: { icon: <CalendarClock className="w-4 h-4 text-amber-500" />, color: 'text-amber-500', border: 'border-amber-500', bg: 'bg-amber-500/10' }
};

const FALLBACK_MATRIX = {
  scenarios: {
    "tech_launch": {
      workflow: [
        { stepNumber: 1, agentId: 'software' as const, taskName: 'Repository Initialization', statusDetail: 'GitHub repo created with standard templates.' },
        { stepNumber: 2, agentId: 'it' as const, taskName: 'Cloud Provisioning', statusDetail: 'AWS environments and SSO roles configured.' },
        { stepNumber: 3, agentId: 'marketing' as const, taskName: 'Announcements', statusDetail: 'Internal and external release notes drafted.' },
        { stepNumber: 4, agentId: 'admin' as const, taskName: 'Sync Synchronization', statusDetail: 'Launch meetings scheduled with stakeholders.' }
      ],
      artifacts: [
        { title: 'Deployment Plan', format: 'bullet_list' as const, content: '- Repository Initialized\n- Environments provisioned\n- Launch meeting scheduled' },
        { title: 'System Specs', format: 'markdown_table' as const, content: 'Component | Specification\n---|---\nFrontend | React / vite\nBackend | Node / Express\nDatabase | Postgres' }
      ]
    },
    "industrial_onboarding": {
      workflow: [
        { stepNumber: 1, agentId: 'hr' as const, taskName: 'Contract Generation', statusDetail: 'Standard union contract generated and sent.' },
        { stepNumber: 2, agentId: 'hs' as const, taskName: 'Safety Gear Allocation', statusDetail: 'PPE requisition form submitted for size L.' },
        { stepNumber: 3, agentId: 'it' as const, taskName: 'Site Access Card', statusDetail: 'NFC credentials programmed for Gate 3.' },
        { stepNumber: 4, agentId: 'admin' as const, taskName: 'Orientation Schedule', statusDetail: 'Site orientation calendar invite sent.' }
      ],
      artifacts: [
        { title: 'Safety Brief', format: 'bullet_list' as const, content: '- Hardhat required at all times\n- Steel-toe boots mandatory\n- High-vis vest checked' },
        { title: 'Equipment Provisioning', format: 'markdown_table' as const, content: 'Item | Status | Location\n---|---|---\nHardhat | Sized | Storage A\nBoots | Pending | Supplier' }
      ]
    },
    "retail_operations": {
      workflow: [
        { stepNumber: 1, agentId: 'data' as const, taskName: 'Inventory Pipeline', statusDetail: 'POS data synchronized with main warehouse.' },
        { stepNumber: 2, agentId: 'accounting' as const, taskName: 'Sales Reconciliation', statusDetail: 'End of day till balances reconciled.' },
        { stepNumber: 3, agentId: 'marketing' as const, taskName: 'Promotion Automation', statusDetail: 'Weekend discount codes activated in POS.' },
        { stepNumber: 4, agentId: 'admin' as const, taskName: 'Staff Roster Update', statusDetail: 'Shift coverage confirmed for next week.' }
      ],
      artifacts: [
        { title: 'Operations Summary', format: 'text' as const, content: 'Inventory sync completed successfully. End of day reconciliation shows a 2% variance, within acceptable margins. Weekend promotions have been pushed to all terminal endpoints.' },
        { title: 'Shift Coverage', format: 'markdown_table' as const, content: 'Role | Assigned | Coverage\n---|---|---\nManager | Jane D. | 100%\nCashier | John S. | 100%' }
      ]
    },
    "services_compliance": {
      workflow: [
        { stepNumber: 1, agentId: 'hs' as const, taskName: 'Audit Trigger', statusDetail: 'Quarterly OH&S compliance checklist initiated.' },
        { stepNumber: 2, agentId: 'data' as const, taskName: 'Incident Review', statusDetail: 'Aggregating incident reports from past 90 days.' },
        { stepNumber: 3, agentId: 'accounting' as const, taskName: 'Financial Reporting', statusDetail: 'Compliance budgeting updated for Q3.' },
        { stepNumber: 4, agentId: 'admin' as const, taskName: 'Board Package', statusDetail: 'Compilation of audit documents prepared.' }
      ],
      artifacts: [
        { title: 'Audit Summary', format: 'bullet_list' as const, content: '- 14 safety checkpoints passed\n- 2 minor infractions resolved\n- Q3 budget approved' },
        { title: 'Incident Metrics', format: 'markdown_table' as const, content: 'Severity | Count | Trend\n---|---|---\nHigh | 0 | Flat\nMedium | 2 | Down 10%\nLow | 5 | Down 5%' }
      ]
    },
    "default_onboarding": {
      workflow: [
        { stepNumber: 1, agentId: 'hr' as const, taskName: 'Offer Management', statusDetail: 'Offer letter signed and securely filed.' },
        { stepNumber: 2, agentId: 'it' as const, taskName: 'Hardware Setup', statusDetail: 'Laptop configured with standard image.' },
        { stepNumber: 3, agentId: 'admin' as const, taskName: 'System Access', statusDetail: 'Email and Slack accounts activated.' },
        { stepNumber: 4, agentId: 'data' as const, taskName: 'Welcome Dashboard', statusDetail: 'Personalized metrics portal initialized.' }
      ],
      artifacts: [
        { title: 'Welcome Package', format: 'text' as const, content: 'Welcome to the team! Your IT equipment has been dispatched and should arrive in 2 business days. Your company email address and communication channels have been provisioned.' },
        { title: 'Checklist', format: 'markdown_table' as const, content: 'Task | Status\n---|---\nIT Setup | Complete\nHR Docs | Complete\nOrientation | Scheduled' }
      ]
    },
    "default_launch": {
      workflow: [
        { stepNumber: 1, agentId: 'marketing' as const, taskName: 'Campaign Generation', statusDetail: 'Social media assets generated and scheduled.' },
        { stepNumber: 2, agentId: 'data' as const, taskName: 'Tracking Pixels', statusDetail: 'Analytics tags verified on target endpoints.' },
        { stepNumber: 3, agentId: 'accounting' as const, taskName: 'Ad Budget Allocation', statusDetail: 'Spend limits set on major platforms.' },
        { stepNumber: 4, agentId: 'admin' as const, taskName: 'Approval Workflow', statusDetail: 'Final sign-off requested from Directors.' }
      ],
      artifacts: [
        { title: 'Campaign Brief', format: 'text' as const, content: 'The upcoming product launch campaign is fully locked and loaded. Spend allocations are constrained to the approved Q2 budget and tracking telemetry is reporting green.' },
        { title: 'Ad Spend Limits', format: 'markdown_table' as const, content: 'Platform | Daily Limit | Total Budget\n---|---|---\nSearch | $500 | $15,000\nSocial | $300 | $9,000' }
      ]
    }
  }
};

const FALLBACK_COMPANY_DATA = {
  metrics: { revenue: 245000, customers: 1240 },
  integrations: {
    google: ['Brand_Guidelines.pdf', 'Q3_Financials.xlsx', 'Meeting_Notes.gdoc'],
    salesforce: ['Q3_Pipeline_Report.pdf', 'Top_Accounts_List.csv', 'Lead_Conversion_Metrics.xlsx'],
    quickbooks: ['Profit_and_Loss_YTD.pdf', 'Aged_Receivables.csv', 'Tax_Summary_2026.pdf'],
    shopify: ['Weekly_Orders_Export.csv', 'Inventory_Levels.xlsx', 'Customer_Segment_VIP.csv']
  },
  tasks: [
    "Onboard a new team member",
    "Deploy a new web application platform",
    "Audit health & safety compliance"
  ],
  launchDocs: [
    "Articles_of_Incorporation.pdf",
    "Brand_Identity_v1.zip",
    "Initial_Operating_Agreement.docx"
  ]
};

async function fetchWithTimeout(resource: string, options: RequestInit = {}, timeout = 2500) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(resource, {
      ...options,
      signal: controller.signal
    });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    throw error;
  }
}

export function HowItWorksMockup() {
  const [isInitializing, setIsInitializing] = useState(false);
  const [cachedData, setCachedData] = useState<any>(FALLBACK_MATRIX);
  const [currentStep, setCurrentStep] = useState<'onboard' | 'prompt' | 'workflow' | 'artifacts'>('onboard');
  
  // Onboard state
  const [companyStatus, setCompanyStatus] = useState<'existing' | 'new' | null>(null);
  const [businessData, setBusinessData] = useState({
    businessName: '',
    industry: '',
    description: '',
    employees: '',
    revenue: '',
    role: ''
  });

  const [inputValue, setInputValue] = useState('');
  const [activeScenario, setActiveScenario] = useState<MatrixScenario | null>(null);
  
  // Workflow State
  const [activeTaskIndex, setActiveTaskIndex] = useState(-1);
  const [completedTasks, setCompletedTasks] = useState<number[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Artifact State
  const [activeTab, setActiveTab] = useState(0);
  
  // Dashboard State
  const [dashboardTab, setDashboardTab] = useState<'metrics' | 'logs' | 'task' | 'launch' | 'connections'>('metrics');
  const [metrics, setMetrics] = useState({ revenue: 14500, customers: 124 });
  const [localLogs, setLocalLogs] = useState<any[]>([]);
  const [connections, setConnections] = useState<{id: string, platform: string, files: string[]}[]>([]);
  const [isConnectingPlatform, setIsConnectingPlatform] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [expandedConnection, setExpandedConnection] = useState<string | null>(null);

  const [companyData, setCompanyData] = useState<any>(null);
  const [dynamicTasks, setDynamicTasks] = useState<string[]>([
    "Onboard an industrial team member", 
    "Deploy a new web application platform", 
    "Audit health & safety compliance"
  ]);
  const [integrationFiles, setIntegrationFiles] = useState<any>({});


  const logAction = (action: string, detail: string) => {
    try {
      const key = `alfred_logs_local`;
      const logs = JSON.parse(localStorage.getItem(key) || '[]');
      logs.unshift({ id: Date.now().toString(), timestamp: new Date().toLocaleTimeString(), action, detail });
      localStorage.setItem(key, JSON.stringify(logs));
      setLocalLogs(logs);
    } catch(e) {
      console.warn("Storage restricted", e);
    }
  };

  useEffect(() => {
    try {
      const key = `alfred_logs_local`;
      setLocalLogs(JSON.parse(localStorage.getItem(key) || '[]'));
    } catch(e) { /* ignore */ }
  }, [currentStep]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (currentStep === 'prompt' && dashboardTab === 'metrics') {
      interval = setInterval(() => {
        setMetrics(prev => ({
          revenue: prev.revenue + Math.floor(Math.random() * 100),
          customers: prev.customers + (Math.random() > 0.7 ? 1 : 0)
        }));
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [currentStep, dashboardTab]);

  const completeOnboarding = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    if (companyStatus === 'existing') {
        logAction('System', 'Synchronizing comprehensive firm metadata...');
        try {
            const res = await fetchWithTimeout('/api/generateCompanyData', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ businessData, type: 'existing' })
            }, 2500);
            const data = await res.json();
            setCompanyData(data);
            if (data.metrics) setMetrics(data.metrics);
            if (data.tasks) setDynamicTasks(data.tasks);
            if (data.integrations) setIntegrationFiles(data.integrations);
            logAction('Setup', 'Firm metadata synchronized.');
        } catch (err) {
            console.warn("Metadata sync failed/timed out, using frontend fallback:", err);
            const data = FALLBACK_COMPANY_DATA;
            setCompanyData(data);
            if (data.metrics) setMetrics(data.metrics);
            if (data.tasks) setDynamicTasks(data.tasks);
            if (data.integrations) setIntegrationFiles(data.integrations);
            logAction('Setup', 'Firm metadata loaded from fallback template.');
        }
    }

    logAction('Account Creation', 'Completed onboarding.');
    
    setIsProcessing(false);
    if (companyStatus === 'new') {
        setDashboardTab('launch');
    } else {
        setDashboardTab('metrics');
    }
    setCurrentStep('prompt');
  };

  useEffect(() => {
    let cachedMatrix = null;
    try { cachedMatrix = localStorage.getItem('alfred_preview_matrix'); } catch(e){}
    
    // Set initial cachedData from localStorage if valid
    if (cachedMatrix) {
      try { 
        const parsed = JSON.parse(cachedMatrix);
        if (parsed && parsed.scenarios) {
          setCachedData(parsed);
          setIsInitializing(false);
          return;
        }
      } catch(e){}
    }

    // Try to load fresh matrix with standard fetchWithTimeout
    setIsInitializing(true);
    fetchWithTimeout('/api/matrix', { method: 'POST' }, 2500)
      .then(res => res.json())
      .then(data => {
        if (data && data.scenarios) {
          try { localStorage.setItem('alfred_preview_matrix', JSON.stringify(data)); } catch(e){}
          setCachedData(data);
        }
        setIsInitializing(false);
      })
      .catch(err => {
        console.warn("Could not load fresh matrix, using default:", err);
        setCachedData(FALLBACK_MATRIX);
        setIsInitializing(false);
      });
  }, []);

  const getMatchedScenario = (userInput: string, matrixData: any) => {
    const input = userInput.toLowerCase();
    
    let industry = 'default';
    if (input.includes('tech') || input.includes('software') || input.includes('app') || input.includes('platform')) industry = 'tech';
    else if (input.includes('construction') || input.includes('industrial') || input.includes('safety') || input.includes('field') || input.includes('plant')) industry = 'industrial';
    else if (input.includes('retail') || input.includes('store') || input.includes('shop') || input.includes('sales')) industry = 'retail';
    else if (input.includes('consulting') || input.includes('service') || input.includes('office') || input.includes('brand')) industry = 'services';
  
    let intent = 'launch';
    if (input.includes('hire') || input.includes('onboard') || input.includes('employee') || input.includes('tech')) intent = 'onboarding';
    else if (input.includes('audit') || input.includes('comply') || input.includes('report') || input.includes('check')) intent = 'compliance';
    else if (input.includes('run') || input.includes('manage') || input.includes('inventory')) intent = 'operations';
  
    const targetKey = `${industry}_${intent}`;
    if (matrixData?.scenarios?.[targetKey]) {
      return matrixData.scenarios[targetKey];
    }
    
    return matrixData?.scenarios?.[`default_${intent}`] || matrixData?.scenarios?.['tech_launch'];
  };

  const handleLaunchComplete = async () => {
    setIsProcessing(true);
    logAction('Launch', 'Generating artifacts and initializing systems...');
    try {
        const res = await fetchWithTimeout('/api/generateCompanyData', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ businessData, type: 'new' })
        }, 2500);
        const data = await res.json();
        setCompanyData(data);
        if (data.metrics) setMetrics(data.metrics);
        if (data.tasks) setDynamicTasks(data.tasks);
        if (data.integrations) setIntegrationFiles(data.integrations);
        logAction('Launch Complete', 'Company is now live.');
        setCompanyStatus('existing'); // Transition out of 'new' launch state
        setDashboardTab('metrics');
    } catch (err) {
        console.warn("Launch metadata generation failed/timed out, using frontend fallback:", err);
        const data = FALLBACK_COMPANY_DATA;
        setCompanyData(data);
        if (data.metrics) setMetrics(data.metrics);
        if (data.tasks) setDynamicTasks(data.tasks);
        if (data.integrations) setIntegrationFiles(data.integrations);
        logAction('Launch Complete', 'Company is live via local setup.');
        setCompanyStatus('existing'); // Transition out of 'new' launch state
        setDashboardTab('metrics');
    }
    setIsProcessing(false);
  };

  const handleStart = (query: string = inputValue) => {
    if (!query.trim() || !cachedData) return;
    const scenario = getMatchedScenario(query, cachedData);
    if (!scenario) return;

    logAction('Workflow Started', `Initiated task: "${query}"`);

    setActiveScenario(scenario);
    setCurrentStep('workflow');
    setIsProcessing(true);
    setActiveTaskIndex(0);
    setCompletedTasks([]);
  };

  const handleConnect = async () => {
    if (!selectedPlatform) return;
    setIsConnectingPlatform(true);
    logAction('Integration', `Connecting ${selectedPlatform}...`);
    try {
        await new Promise(r => setTimeout(r, 1500));
        const filesForPlatform = integrationFiles[selectedPlatform] || [
          `${selectedPlatform}_Export.csv`,
          `Config_Backup.json`,
          `Recent_Activity.pdf`
        ];
        setConnections(prev => [...prev, { id: Date.now().toString(), platform: selectedPlatform, files: filesForPlatform }]);
        logAction('Integration', `Successfully connected ${selectedPlatform}.`);
    } catch(err) {
        logAction('Integration Error', `Failed to connect ${selectedPlatform}.`);
    }
    setIsConnectingPlatform(false);
    setSelectedPlatform('');
  };

  useEffect(() => {
    if (currentStep === 'workflow' && isProcessing && activeScenario) {
      if (activeTaskIndex < activeScenario.workflow.length) {
        const timer = setTimeout(() => {
          setCompletedTasks(prev => [...prev, activeTaskIndex]);
          
          if (activeTaskIndex === activeScenario.workflow.length - 1) {
            setTimeout(() => {
              setIsProcessing(false);
              logAction('Workflow Completed', 'Successfully generated task artifacts.');
              setCurrentStep('artifacts');
            }, 800);
          } else {
            setActiveTaskIndex(prev => prev + 1);
          }
        }, 1800);
        
        return () => clearTimeout(timer);
      }
    }
  }, [currentStep, isProcessing, activeTaskIndex, activeScenario]);

  const resetMockup = () => {
    logAction('Logout', 'User signed out of Dashboard.');
    setInputValue('');
    setActiveScenario(null);
    setCurrentStep('onboard');
    setActiveTab(0);
    setCompanyStatus(null);
    setDashboardTab('metrics');
    setBusinessData({
      businessName: '',
      industry: '',
      description: '',
      employees: '',
      revenue: '',
      role: ''
    });
  };

  const renderArtifact = (artifact: Artifact, activeAgentId: string) => {
    const config = AGENT_MAP[activeAgentId as keyof typeof AGENT_MAP] || AGENT_MAP.admin;
    
    if (artifact.format === 'markdown_table') {
      const rows = artifact.content.split('\n').filter(r => r.trim()).map(r => r.split('|').map(c => c.trim()).filter(Boolean));
      // Remove divider row like ---|---
      const filteredRows = rows.filter(r => !r.every(c => c.match(/^[-\s]+$/)));
      
      return (
        <div className="w-full overflow-x-auto text-[10px] text-slate-300">
          <table className="w-full border-collapse">
            <thead>
              {filteredRows[0] && (
                <tr className="border-b border-steel bg-carbon/50">
                  {filteredRows[0].map((h, i) => <th key={i} className="p-2 text-left font-bold text-slate-400">{h}</th>)}
                </tr>
              )}
            </thead>
            <tbody>
              {filteredRows.slice(1).map((r, i) => (
                <tr key={i} className="border-b border-steel/50 last:border-0 hover:bg-carbon/30">
                  {r.map((c, j) => <td key={j} className="p-2 whitespace-nowrap">{c}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    if (artifact.format === 'bullet_list') {
      const items = artifact.content.split('\n').filter(i => i.trim());
      return (
        <ul className="space-y-3">
          {items.map((item, i) => {
            const cleanItem = item.replace(/^[-*]\s*/, '');
            return (
              <li key={i} className="flex gap-3 text-xs leading-relaxed text-slate-300">
                <div className={`mt-0.5 shrink-0 w-4 h-4 rounded flex items-center justify-center ${config.bg} ${config.color}`}>
                  {config.icon}
                </div>
                <span>{cleanItem}</span>
              </li>
            );
          })}
        </ul>
      );
    }

    return <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-wrap">{artifact.content}</p>;
  };

  return (
    <div className="w-full max-w-sm mx-auto bg-carbon border border-steel rounded-[2rem] overflow-hidden shadow-2xl relative">
      {/* Mobile Frame Header */}
      <div className="bg-obsidian border-b border-steel px-6 py-4 flex items-center justify-between z-10 relative">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 flex items-center justify-center">
            <img src="/logo.png" className="w-6 h-6 object-contain" alt="Alfred Corp" />
          </div>
          <span className="font-heading font-bold text-sm text-slate-100">Alfred<span className="text-slate-500 font-normal">Corp</span></span>
        </div>
        <div className="relative">
          <button 
            onClick={() => setIsProfileOpen(!isProfileOpen)} 
            className="flex items-center gap-1.5 p-2 hover:bg-carbon rounded-full transition-colors focus:outline-none"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-slate-600"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-slate-600"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-slate-600"></div>
          </button>
          
          <AnimatePresence>
            {isProfileOpen && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 top-[calc(100%+0.5rem)] w-64 bg-obsidian border border-steel rounded-xl shadow-2xl overflow-hidden z-50 text-left p-4"
              >
                <div className="mb-4 pb-4 border-b border-steel/50 relative">
                   <button 
                     onClick={() => setIsProfileOpen(false)}
                     className="absolute -top-1 -right-1 p-1 text-slate-500 hover:text-slate-300 hover:bg-carbon rounded-full transition-colors focus:outline-none"
                   >
                     <X className="w-4 h-4" />
                   </button>
                   <h4 className="text-sm font-bold text-slate-200 pr-6">Workspace Profile</h4>
                   <p className="text-xs text-slate-500">Business details</p>
                </div>
                {businessData.businessName ? (
                  <div className="space-y-3">
                    <div>
                      <p className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-0.5">Business</p>
                      <p className="text-xs text-slate-300 font-medium">{businessData.businessName}</p>
                      {businessData.description && (
                         <p className="text-[10px] text-slate-400 mt-1 line-clamp-2">{businessData.description}</p>
                      )}
                    </div>
                    <div>
                      <p className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-0.5">Role & Industry</p>
                      <p className="text-xs text-slate-300 capitalize">{businessData.role} • {businessData.industry}</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-xs text-slate-500 text-center py-2">
                    Complete setup to view profile details.
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="h-[550px] overflow-y-auto bg-obsidian relative scrollbar-hide p-5 flex flex-col">
        {isInitializing ? (
           <div className="flex-1 flex flex-col items-center justify-center mb-10">
              <div className="w-12 h-12 rounded-full border-2 border-slate-600 border-t-emerald-400 animate-spin mb-4"></div>
              <h3 className="text-sm font-heading font-bold text-slate-200">Optimizing preview engine...</h3>
              <p className="text-[11px] text-slate-500 font-mono mt-2">Connecting to Knowledge Graph</p>
           </div>
        ) : (
          <AnimatePresence mode="wait">
            
            {/* STEP 0.5: Onboard Business */}
            {currentStep === 'onboard' && (
              <motion.div 
                key="step-onboard"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col h-full bg-obsidian"
              >
                <div className="text-center mb-6 mt-2 shrink-0">
                  <h3 className="text-lg font-heading font-bold text-slate-100">Business Profile</h3>
                  <p className="text-xs font-mono text-slate-400 mt-1">Let's set up your workspace</p>
                </div>
                
                {companyStatus === null ? (
                  <div className="flex flex-col h-full space-y-4 px-2 mt-4">
                    <button 
                      onClick={() => setCompanyStatus('existing')} 
                      className="w-full bg-carbon border border-steel hover:border-amber/50 rounded-xl p-5 text-left transition-colors group flex items-center justify-between"
                    >
                      <div>
                        <h4 className="text-sm font-bold text-slate-200 group-hover:text-amber transition-colors">I have a company</h4>
                        <p className="text-xs text-slate-500 mt-1">Configure Alfred for your existing business</p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-slate-600 group-hover:text-amber transition-colors" />
                    </button>
                    <button 
                      onClick={() => setCompanyStatus('new')} 
                      className="w-full bg-carbon border border-steel hover:border-amber/50 rounded-xl p-5 text-left transition-colors group flex items-center justify-between"
                    >
                      <div>
                        <h4 className="text-sm font-bold text-slate-200 group-hover:text-amber transition-colors">I want to create a company</h4>
                        <p className="text-xs text-slate-500 mt-1">Let Alfred help you set up an entirely new business</p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-slate-600 group-hover:text-amber transition-colors" />
                    </button>
                  </div>
                ) : (
                  <form onSubmit={completeOnboarding} className="space-y-3 flex-1 overflow-y-auto scrollbar-hide pb-4">
                    <div>
                      <label className="text-[10px] font-mono text-slate-500 uppercase tracking-wider pl-1 mb-1 block">
                        {companyStatus === 'new' ? 'Proposed Company Name' : 'Company Name'}
                      </label>
                      <input 
                        type="text" 
                        required
                        placeholder="Acme Corp"
                        value={businessData.businessName}
                        onChange={(e) => setBusinessData({...businessData, businessName: e.target.value})}
                        className="w-full bg-carbon border border-steel rounded-xl px-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-amber/50 placeholder-slate-600" 
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-mono text-slate-500 uppercase tracking-wider pl-1 mb-1 block">
                        {companyStatus === 'new' ? 'Target Industry' : 'Industry'}
                      </label>
                      <select
                        required
                        value={businessData.industry}
                        onChange={(e) => setBusinessData({...businessData, industry: e.target.value})}
                        className="w-full bg-carbon border border-steel rounded-xl px-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-amber/50 appearance-none"
                      >
                        <option value="" disabled>Select Industry</option>
                        <option value="technology">Technology & Software</option>
                        <option value="retail">Retail & E-commerce</option>
                        <option value="industrial">Industrial & Construction</option>
                        <option value="services">Professional Services</option>
                        <option value="healthcare">Healthcare</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] font-mono text-slate-500 uppercase tracking-wider pl-1 mb-1 block">Description</label>
                      <textarea 
                        required
                        placeholder={companyStatus === 'new' ? "What will your company do?" : "What does your company do?"}
                        rows={2}
                        value={businessData.description}
                        onChange={(e) => setBusinessData({...businessData, description: e.target.value})}
                        className="w-full bg-carbon border border-steel rounded-xl px-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-amber/50 placeholder-slate-600 resize-none" 
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] font-mono text-slate-500 uppercase tracking-wider pl-1 mb-1 block">
                          {companyStatus === 'new' ? 'Expected Team Size' : 'Employees'}
                        </label>
                        <select
                          required
                          value={businessData.employees}
                          onChange={(e) => setBusinessData({...businessData, employees: e.target.value})}
                          className="w-full bg-carbon border border-steel rounded-xl px-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-amber/50 appearance-none"
                        >
                          <option value="" disabled>Size</option>
                          <option value="1-10">1-10</option>
                          <option value="11-50">11-50</option>
                          <option value="51-200">51-200</option>
                          <option value="201+">201+</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[10px] font-mono text-slate-500 uppercase tracking-wider pl-1 mb-1 block">
                          {companyStatus === 'new' ? 'Expected Revenue' : 'Revenue'}
                        </label>
                        <select
                          value={businessData.revenue}
                          onChange={(e) => setBusinessData({...businessData, revenue: e.target.value})}
                          className="w-full bg-carbon border border-steel rounded-xl px-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-amber/50 appearance-none"
                        >
                           <option value="" disabled>Optional</option>
                           <option value="<1M">&lt; $1M</option>
                           <option value="1M-5M">$1M - $5M</option>
                           <option value="5M+">$5M+</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] font-mono text-slate-500 uppercase tracking-wider pl-1 mb-1 block">
                        {companyStatus === 'new' ? 'Your Role (e.g. Founder)' : 'Your Role'}
                      </label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. Founder, Ops Manager"
                        value={businessData.role}
                        onChange={(e) => setBusinessData({...businessData, role: e.target.value})}
                        className="w-full bg-carbon border border-steel rounded-xl px-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-amber/50 placeholder-slate-600" 
                      />
                    </div>
                    
                    <div className="pt-3">
                      <div className="flex gap-2 mb-2">
                         <button type="button" onClick={() => setCompanyStatus(null)} className="flex-1 btn-ghost py-3.5 rounded-full text-xs tracking-widest uppercase font-mono shadow-glow text-slate-400">Back</button>
                         <button type="submit" disabled={isProcessing} className="flex-[2] btn-primary py-3.5 rounded-full text-xs tracking-widest uppercase font-mono flex items-center justify-center gap-2 shadow-glow disabled:opacity-50">
                           {isProcessing ? <CircleDashed className="w-4 h-4 animate-spin" /> : 'Complete Setup'}
                           {!isProcessing && <ArrowRight className="w-4 h-4" />}
                         </button>
                      </div>
                    </div>
                  </form>
                )}
              </motion.div>
            )}

            {/* STEP 1: Dashboard interface */}
            {currentStep === 'prompt' && (
              <motion.div 
                key="step-prompt"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col h-full bg-obsidian"
              >
                <div className="flex-1 overflow-y-auto scrollbar-hide">
                  {dashboardTab === 'metrics' && (
                     <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-3 shrink-0 mt-2">
                          <div className="bg-carbon border border-steel rounded-xl p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
                              <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">System</span>
                            </div>
                            <p className="text-sm font-bold text-slate-200">Online</p>
                          </div>
                          <div className="bg-carbon border border-steel rounded-xl p-4">
                             <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest mb-2 block">Active Agents</span>
                             <p className="text-sm font-bold text-slate-200">8 / 8</p>
                          </div>
                        </div>

                        <div className="bg-carbon border border-steel rounded-xl p-4">
                          <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest mb-3 block">Company Profile</span>
                          <div className="space-y-2">
                             <p className="text-sm font-bold text-amber">{businessData.businessName || 'Your Company'}</p>
                             <p className="text-xs text-slate-400 capitalize">{businessData.industry || 'Industry Profile'}</p>
                             <p className="text-xs text-slate-400 border-l-2 border-steel pl-2">{businessData.description || 'Welcome to your workspace.'}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-carbon border border-steel rounded-xl p-4">
                            <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest mb-2 block">Revenue (YTD)</span>
                            <motion.p className="text-lg font-bold text-slate-200" key={metrics.revenue}>${metrics.revenue.toLocaleString()}</motion.p>
                          </div>
                          <div className="bg-carbon border border-steel rounded-xl p-4">
                            <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest mb-2 block">Active Users</span>
                            <motion.p className="text-lg font-bold text-slate-200" key={metrics.customers}>{metrics.customers}</motion.p>
                          </div>
                        </div>
                     </div>
                  )}

                  {dashboardTab === 'logs' && (
                     <div className="space-y-3 mt-2">
                       {localLogs.length === 0 ? (
                         <p className="text-xs text-slate-500 text-center mt-10">No logs available.</p>
                       ) : (
                         localLogs.map(log => (
                           <div key={log.id} className="bg-carbon border border-steel rounded-lg p-3">
                             <div className="flex justify-between items-start mb-1">
                               <p className="text-xs font-bold text-emerald-400">{log.action}</p>
                               <span className="text-[9px] font-mono text-slate-500">{log.timestamp}</span>
                             </div>
                             <p className="text-xs text-slate-400">{log.detail}</p>
                           </div>
                         ))
                       )}
                     </div>
                  )}

                  {dashboardTab === 'task' && (
                     <div className="h-[360px] flex flex-col pt-2">
                        <div className="flex-1 flex flex-col justify-end min-h-0">
                          <div className="bg-carbon border border-steel px-4 py-3 rounded-2xl rounded-bl-sm shadow-sm mb-4 max-w-[90%] shrink-0">
                            <p className="text-sm text-slate-300">Hi there, what business system would you like to build or automate today?</p>
                          </div>
                          
                          <div className="space-y-2 mb-4 overflow-y-auto scrollbar-hide">
                            {dynamicTasks.map((task, idx) => {
                              const hoverBorders = [
                                'hover:border-emerald-400/50', 
                                'hover:border-blue-400/50', 
                                'hover:border-purple-400/50', 
                                'hover:border-amber-400/50', 
                                'hover:border-rose-400/50'
                              ];
                              const borderClass = hoverBorders[idx % hoverBorders.length];
                              return (
                                <button key={idx} onClick={() => handleStart(task)} className={`w-full text-left px-4 py-2.5 rounded-xl border border-steel bg-carbon/50 hover:bg-carbon ${borderClass} transition-all text-xs text-slate-300`}>
                                  "{task}"
                                </button>
                              );
                            })}
                          </div>
                        </div>
                        <div className="mt-auto pt-3 border-t border-steel/50 shrink-0">
                          <div className="flex gap-2">
                            <input 
                              value={inputValue} 
                              onChange={e => setInputValue(e.target.value)} 
                              onKeyDown={e => e.key === 'Enter' && handleStart()} 
                              className="flex-1 bg-carbon border border-steel rounded-full px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-amber/50 placeholder-slate-500" 
                              placeholder="Type your objective..." 
                            />
                            <button onClick={() => handleStart()} className="btn-primary w-11 h-11 rounded-full flex items-center justify-center shrink-0 disabled:opacity-50" disabled={!inputValue.trim()}>
                              <ArrowRight className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                     </div>
                  )}

                  {dashboardTab === 'launch' && (
                     <div className="space-y-4 mt-2 h-full flex flex-col justify-center min-h-[300px]">
                       <div className="text-center">
                         <Rocket className="w-8 h-8 text-amber mx-auto mb-3" />
                         <h3 className="text-sm font-bold text-slate-200 mb-1">Launch {businessData.businessName}</h3>
                         <p className="text-xs text-slate-500 max-w-[200px] mx-auto">Generate incorporation docs, brand identity, and legal filings instantly.</p>
                       </div>
                       <button onClick={handleLaunchComplete} disabled={isProcessing} className="btn-primary py-3 px-6 rounded-full text-xs mx-auto shadow-glow font-mono uppercase tracking-widest flex items-center gap-2">
                         {isProcessing ? <CircleDashed className="w-4 h-4 animate-spin"/> : <><Rocket className="w-4 h-4"/> Start Launch</>}
                       </button>
                     </div>
                  )}

                  {dashboardTab === 'connections' && (
                     <div className="space-y-4 mt-2">
                        {connections.length > 0 && (
                          <div className="space-y-3">
                            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">Connected Systems</span>
                            {connections.map((c) => {
                               const platformConfig: Record<string, any> = {
                                 google: { Icon: FileText, color: 'text-blue-400', bg: 'bg-blue-500/10', label: 'Google Workspace' },
                                 salesforce: { Icon: Database, color: 'text-blue-300', bg: 'bg-blue-400/10', label: 'Salesforce CRM' },
                                 quickbooks: { Icon: LineChart, color: 'text-green-400', bg: 'bg-green-500/10', label: 'QuickBooks' },
                                 shopify: { Icon: ShoppingBag, color: 'text-emerald-400', bg: 'bg-emerald-500/10', label: 'Shopify' },
                               };
                               const pf = platformConfig[c.platform] || { Icon: AppWindow, color: 'text-amber', bg: 'bg-amber/10', label: c.platform };
                               const IconComp = pf.Icon;
                               return (
                               <div key={c.id} className="bg-carbon border border-steel rounded-xl overflow-hidden">
                                  <button 
                                    onClick={() => setExpandedConnection(expandedConnection === c.id ? null : c.id)}
                                    className="w-full p-4 flex items-center justify-between hover:bg-obsidian transition-colors"
                                  >
                                    <div className="flex items-center gap-3">
                                       <div className={`p-2 ${pf.bg} ${pf.color} rounded-lg`}>
                                          <IconComp className="w-5 h-5"/>
                                       </div>
                                       <span className="text-sm font-bold text-slate-200 capitalize">{pf.label}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                                      <span className="text-xs text-slate-400 uppercase tracking-wider font-mono">Syncing</span>
                                    </div>
                                  </button>
                                  <AnimatePresence>
                                    {expandedConnection === c.id && (
                                     <motion.div
                                       initial={{ height: 0, opacity: 0 }}
                                       animate={{ height: 'auto', opacity: 1 }}
                                       exit={{ height: 0, opacity: 0 }}
                                       className="border-t border-steel/50 bg-obsidian"
                                     >
                                       <div className="p-4 space-y-2">
                                          <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-2 border-b border-steel/30 pb-2">Indexed Resources</p>
                                          {c.files.map((file, idx) => (
                                            <div key={idx} className="flex flex-col gap-1 py-1">
                                              <div className="flex items-center gap-2 text-slate-300">
                                                <FileText className="w-3 h-3 text-slate-500 shrink-0" />
                                                <span className="text-xs font-mono truncate">{file}</span>
                                              </div>
                                            </div>
                                          ))}
                                          {c.files.length === 0 && (
                                            <p className="text-xs text-slate-500 italic">No files accessible.</p>
                                          )}
                                       </div>
                                     </motion.div>
                                   )}
                                 </AnimatePresence>
                              </div>
                            )})}
                          </div>
                        )}

                        <div className="bg-carbon border border-steel rounded-xl p-4">
                           <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-3 block">Add Integration</span>
                           <select 
                             value={selectedPlatform}
                             onChange={e => setSelectedPlatform(e.target.value)}
                             className="w-full bg-obsidian border border-steel rounded-xl px-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-amber/50 mb-3"
                           >
                             <option value="">Select Platform...</option>
                             <option value="google">Google Workspace</option>
                             <option value="salesforce">Salesforce CRM</option>
                             <option value="quickbooks">QuickBooks</option>
                             <option value="shopify">Shopify</option>
                           </select>
                           <button 
                             onClick={handleConnect}
                             disabled={!selectedPlatform || isConnectingPlatform}
                             className="w-full btn-ghost py-2.5 rounded-lg border border-steel text-xs font-mono uppercase text-slate-300 hover:border-amber/50 disabled:opacity-50 flex items-center justify-center gap-2"
                           >
                             {isConnectingPlatform ? <CircleDashed className="w-4 h-4 animate-spin" /> : 'Connect'}
                           </button>
                        </div>
                     </div>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-steel/50 shrink-0">
                  <div className="flex justify-between items-center px-1">
                     <button onClick={() => setDashboardTab('metrics')} className={`flex flex-col items-center gap-1 p-2 ${dashboardTab === 'metrics' ? 'text-amber' : 'text-slate-500 hover:text-slate-300'}`}>
                       <LayoutDashboard className="w-5 h-5"/>
                     </button>
                     <button onClick={() => setDashboardTab('logs')} className={`flex flex-col items-center gap-1 p-2 ${dashboardTab === 'logs' ? 'text-amber' : 'text-slate-500 hover:text-slate-300'}`}>
                       <Activity className="w-5 h-5"/>
                     </button>
                     <button onClick={() => setDashboardTab('task')} className={`flex flex-col items-center gap-1 p-2 ${dashboardTab === 'task' ? 'text-amber' : 'text-slate-500 hover:text-slate-300'}`}>
                       <Zap className="w-5 h-5"/>
                     </button>
                     {(companyStatus === 'new') && (
                       <button onClick={() => setDashboardTab('launch')} className={`flex flex-col items-center gap-1 p-2 ${dashboardTab === 'launch' ? 'text-amber' : 'text-slate-500 hover:text-slate-300'}`}>
                         <Rocket className="w-5 h-5"/>
                       </button>
                     )}
                     <button onClick={() => setDashboardTab('connections')} className={`flex flex-col items-center gap-1 p-2 ${dashboardTab === 'connections' ? 'text-amber' : 'text-slate-500 hover:text-slate-300'}`}>
                       <AppWindow className="w-5 h-5"/>
                     </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 2: Agent Workflow */}
            {currentStep === 'workflow' && activeScenario && (
              <motion.div 
                key="step-workflow"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col h-full"
              >
                <div className="mb-6 flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full border-2 border-steel border-t-amber animate-spin mb-4"></div>
                  <h3 className="text-sm font-heading font-bold text-slate-200">Executing Workflow</h3>
                  <p className="text-[11px] text-slate-400 font-mono text-center px-4 mt-1">Autonomous agents are processing objective.</p>
                </div>

                <div className="space-y-3">
                  {activeScenario.workflow.map((task, index) => {
                    const isCompleted = completedTasks.includes(index);
                    const isRunning = index === activeTaskIndex;
                    const isPending = !isCompleted && !isRunning;
                    
                    const config = AGENT_MAP[task.agentId] || AGENT_MAP.admin;

                    return (
                      <div key={index} className={`flex items-start gap-3 p-3 rounded-xl border transition-colors ${isRunning ? `bg-carbon ${config.border} shadow-[0_0_15px_rgba(0,0,0,0.5)]` : isCompleted ? 'bg-carbon/50 border-steel' : 'bg-transparent border-transparent'}`}>
                        <div className="mt-0.5 relative shrink-0">
                          {isCompleted ? (
                            <CheckCircle2 className={`w-4 h-4 ${config.color}`} />
                          ) : isRunning ? (
                            <div className="relative w-4 h-4">
                              <CircleDashed className={`w-4 h-4 animate-spin ${config.color}`} />
                              <div className="absolute inset-0 m-auto w-1.5 h-1.5 bg-current rounded-full" />
                            </div>
                          ) : (
                            <CircleDot className="w-4 h-4 text-slate-600/50" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className={`text-xs font-bold font-heading ${isCompleted ? 'text-slate-400' : isRunning ? 'text-slate-100' : 'text-slate-600'}`}>
                            {task.taskName}
                          </div>
                          {isRunning && (
                            <div className={`text-[10px] mt-1.5 font-mono ${config.color}`}>
                              Executing via {task.agentId.toUpperCase()} module...
                            </div>
                          )}
                          {isCompleted && (
                            <div className="text-[10px] mt-1.5 font-mono text-slate-500">
                              {task.statusDetail}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* STEP 3: Artifacts */}
            {currentStep === 'artifacts' && activeScenario && (
              <motion.div 
                 key="step-artifacts"
                 initial={{ opacity: 0, scale: 0.95 }}
                 animate={{ opacity: 1, scale: 1 }}
                 exit={{ opacity: 0, scale: 0.95 }}
                 className="flex flex-col h-full"
              >
                <div className="text-center mb-5">
                  <div className="inline-flex items-center justify-center p-2 bg-emerald-500/10 rounded-full mb-3 shadow-glow mt-2">
                    <Check className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-heading font-bold text-slate-100">Workflow Complete</h3>
                  <p className="text-xs font-mono text-emerald-400 mt-1 uppercase tracking-widest">Artifacts Generated</p>
                </div>

                <div className="flex-1 flex flex-col min-h-0 bg-carbon border border-steel rounded-xl overflow-hidden shadow-lg mb-5">
                  <div className="flex overflow-x-auto border-b border-steel bg-obsidian scrollbar-hide">
                    {activeScenario.artifacts.map((art, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveTab(idx)}
                        className={`px-4 py-3 text-xs font-mono tracking-wide whitespace-nowrap border-b-2 transition-all ${activeTab === idx ? 'border-amber text-amber bg-amber/5' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
                      >
                        {art.title}
                      </button>
                    ))}
                  </div>
                  
                  <div className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-steel">
                    {activeScenario.artifacts[activeTab] && renderArtifact(activeScenario.artifacts[activeTab], activeScenario.workflow[activeScenario.workflow.length - 1]?.agentId || 'admin')}
                  </div>
                </div>

                <div className="mt-auto pointer-events-auto pb-2 shrink-0">
                  <button 
                    onClick={resetMockup}
                    className="w-full btn-outline py-3 rounded-full text-xs tracking-widest uppercase font-mono flex items-center justify-center gap-2 text-slate-400 hover:text-slate-100 hover:bg-carbon transition-colors border border-steel"
                  >
                    <RotateCcw className="w-4 h-4" />
                    New Request
                  </button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        )}
      </div>
      
      {/* Home Indicator line (iOS style mock) */}
      <div className="absolute bottom-1.5 left-1/2 transform -translate-x-1/2 w-1/3 h-1 bg-slate-600 rounded-full z-20"></div>
    </div>
  );
}

