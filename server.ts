import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.post("/api/matrix", async (req, res) => {
    const FALLBACK_MATRIX = {
      scenarios: {
        "tech_launch": {
          workflow: [
            { stepNumber: 1, agentId: 'software', taskName: 'Repository Initialization', statusDetail: 'GitHub repo created with standard templates.' },
            { stepNumber: 2, agentId: 'it', taskName: 'Cloud Provisioning', statusDetail: 'AWS environments and SSO roles configured.' },
            { stepNumber: 3, agentId: 'marketing', taskName: 'Announcements', statusDetail: 'Internal and external release notes drafted.' },
            { stepNumber: 4, agentId: 'admin', taskName: 'Sync Synchronization', statusDetail: 'Launch meetings scheduled with stakeholders.' }
          ],
          artifacts: [
            { title: 'Deployment Plan', format: 'bullet_list', content: '- Repository Initialized\n- Environments provisioned\n- Launch meeting scheduled' },
            { title: 'System Specs', format: 'markdown_table', content: 'Component | Specification\n---|---\nFrontend | React / vite\nBackend | Node / Express\nDatabase | Postgres' }
          ]
        },
        "industrial_onboarding": {
          workflow: [
            { stepNumber: 1, agentId: 'hr', taskName: 'Contract Generation', statusDetail: 'Standard union contract generated and sent.' },
            { stepNumber: 2, agentId: 'hs', taskName: 'Safety Gear Allocation', statusDetail: 'PPE requisition form submitted for size L.' },
            { stepNumber: 3, agentId: 'it', taskName: 'Site Access Card', statusDetail: 'NFC credentials programmed for Gate 3.' },
            { stepNumber: 4, agentId: 'admin', taskName: 'Orientation Schedule', statusDetail: 'Site orientation calendar invite sent.' }
          ],
          artifacts: [
            { title: 'Safety Brief', format: 'bullet_list', content: '- Hardhat required at all times\n- Steel-toe boots mandatory\n- High-vis vest checked' },
            { title: 'Equipment Provisioning', format: 'markdown_table', content: 'Item | Status | Location\n---|---|---\nHardhat | Sized | Storage A\nBoots | Pending | Supplier' }
          ]
        },
        "retail_operations": {
          workflow: [
            { stepNumber: 1, agentId: 'data', taskName: 'Inventory Pipeline', statusDetail: 'POS data synchronized with main warehouse.' },
            { stepNumber: 2, agentId: 'accounting', taskName: 'Sales Reconciliation', statusDetail: 'End of day till balances reconciled.' },
            { stepNumber: 3, agentId: 'marketing', taskName: 'Promotion Automation', statusDetail: 'Weekend discount codes activated in POS.' },
            { stepNumber: 4, agentId: 'admin', taskName: 'Staff Roster Update', statusDetail: 'Shift coverage confirmed for next week.' }
          ],
          artifacts: [
            { title: 'Operations Summary', format: 'text', content: 'Inventory sync completed successfully. End of day reconciliation shows a 2% variance, within acceptable margins. Weekend promotions have been pushed to all terminal endpoints.' },
            { title: 'Shift Coverage', format: 'markdown_table', content: 'Role | Assigned | Coverage\n---|---|---\nManager | Jane D. | 100%\nCashier | John S. | 100%' }
          ]
        },
        "services_compliance": {
          workflow: [
            { stepNumber: 1, agentId: 'hs', taskName: 'Audit Trigger', statusDetail: 'Quarterly OH&S compliance checklist initiated.' },
            { stepNumber: 2, agentId: 'data', taskName: 'Incident Review', statusDetail: 'Aggregating incident reports from past 90 days.' },
            { stepNumber: 3, agentId: 'accounting', taskName: 'Financial Reporting', statusDetail: 'Compliance budgeting updated for Q3.' },
            { stepNumber: 4, agentId: 'admin', taskName: 'Board Package', statusDetail: 'Compilation of audit documents prepared.' }
          ],
          artifacts: [
            { title: 'Audit Summary', format: 'bullet_list', content: '- 14 safety checkpoints passed\n- 2 minor infractions resolved\n- Q3 budget approved' },
            { title: 'Incident Metrics', format: 'markdown_table', content: 'Severity | Count | Trend\n---|---|---\nHigh | 0 | Flat\nMedium | 2 | Down 10%\nLow | 5 | Down 5%' }
          ]
        },
        "default_onboarding": {
          workflow: [
            { stepNumber: 1, agentId: 'hr', taskName: 'Offer Management', statusDetail: 'Offer letter signed and securely filed.' },
            { stepNumber: 2, agentId: 'it', taskName: 'Hardware Setup', statusDetail: 'Laptop configured with standard image.' },
            { stepNumber: 3, agentId: 'admin', taskName: 'System Access', statusDetail: 'Email and Slack accounts activated.' },
            { stepNumber: 4, agentId: 'data', taskName: 'Welcome Dashboard', statusDetail: 'Personalized metrics portal initialized.' }
          ],
          artifacts: [
            { title: 'Welcome Package', format: 'text', content: 'Welcome to the team! Your IT equipment has been dispatched and should arrive in 2 business days. Your company email address and communication channels have been provisioned.' },
            { title: 'Checklist', format: 'markdown_table', content: 'Task | Status\n---|---\nIT Setup | Complete\nHR Docs | Complete\nOrientation | Scheduled' }
          ]
        },
        "default_launch": {
          workflow: [
            { stepNumber: 1, agentId: 'marketing', taskName: 'Campaign Generation', statusDetail: 'Social media assets generated and scheduled.' },
            { stepNumber: 2, agentId: 'data', taskName: 'Tracking Pixels', statusDetail: 'Analytics tags verified on target endpoints.' },
            { stepNumber: 3, agentId: 'accounting', taskName: 'Ad Budget Allocation', statusDetail: 'Spend limits set on major platforms.' },
            { stepNumber: 4, agentId: 'admin', taskName: 'Approval Workflow', statusDetail: 'Final sign-off requested from Directors.' }
          ],
          artifacts: [
            { title: 'Campaign Brief', format: 'text', content: 'The upcoming product launch campaign is fully locked and loaded. Spend allocations are constrained to the approved Q2 budget and tracking telemetry is reporting green.' },
            { title: 'Ad Spend Limits', format: 'markdown_table', content: 'Platform | Daily Limit | Total Budget\n---|---|---\nSearch | $500 | $15,000\nSocial | $300 | $9,000' }
          ]
        }
      }
    };

    try {
      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey || apiKey === "undefined" || apiKey.trim() === "") {
        console.warn("GEMINI_API_KEY is missing or invalid. Returning fallback matrix.");
        return res.status(200).json(FALLBACK_MATRIX);
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });
      
      const prompt = `You are the core knowledge graph generator for Alfred Corp, an Agent-as-a-Service (AaaS) platform. 
Generate a comprehensive capability matrix mapping corporate operations across diverse business scenarios. 

Return an un-wrapped, raw JSON object matching the exact typescript schema defined below. Do not include markdown codeblocks or triple backticks.

TYPESCRIPT SCHEMA:
type WorkflowStep = {
  stepNumber: number;
  agentId: 'software' | 'it' | 'data' | 'hr' | 'hs' | 'marketing' | 'accounting' | 'admin';
  taskName: string; // Max 40 chars
  statusDetail: string; // Max 70 chars, realistic, micro-copy logging technical work completed
};

type Artifact = {
  title: string;
  format: 'text' | 'markdown_table' | 'bullet_list';
  content: string; // High-fidelity, highly realistic text/document snippet (Max 120 words)
};

type MatrixScenario = {
  workflow: WorkflowStep[];
  artifacts: Artifact[];
};

interface CapabilityMatrix {
  scenarios: {
    [key: string]: MatrixScenario; // Keys must strictly follow the format: "industry_intent"
  };
}

GENERATION REQUIREMENTS:
Provide complete, localized, and ultra-realistic data entries for the following matrix keys. Avoid placeholder text like "Lorem Ipsum" or "insert here". Use high-fidelity simulated corporate records.

REQUIRED KEYS TO GENERATE:
1. "tech_launch" (Software product launch / infrastructure deployment)
2. "industrial_onboarding" (Hiring field/plant workers, emphasizing safety regulations & gear provisioning)
3. "retail_operations" (Inventory data pipelines, forecasting sales, close operations)
4. "services_compliance" (Corporate health, safety auditing, policy generation, financial reporting)
5. "default_onboarding" (Standard corporate hiring workflow fallback)
6. "default_launch" (Standard marketing/operational launch fallback)

AGENT DIRECTORY REFERENCE FOR MATRIX DESIGN:
- software: Web, dashboards, mobile translation, data pipelines.
- it: Welcome packs/guides, access provisioning/deprovisioning, backups.
- data: Customer segmentation, forecasting, metric visualization (Sales, OHS, Traffic).
- hr: Job descriptions, offer letters, interview scripting, HR onboarding.
- hs: Job Hazard Analyses (JHA), inspection checklists, toolbox talks, OHS compliance.
- marketing: Content pipelines, ad campaign tracking, SEO optimization.
- accounting: Month-End close sequences, collection listings, standard statements.
- admin: Draft emails, task parsing, calendar management, meeting synchronization.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json"
        }
      });
      res.status(200).json(JSON.parse(response.text || '{}'));
    } catch (error) {
      console.error('Matrix generation failed (invalid API key or other error), falling back:', error);
      res.status(200).json(FALLBACK_MATRIX);
    }
  });

  app.post("/api/generateCompanyData", express.json(), async (req, res) => {
    const fallbackData = {
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

    try {
      const { businessData, type } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey || apiKey === "undefined" || apiKey.trim() === "") {
        console.warn("GEMINI_API_KEY is missing or invalid. Returning fallback company data.");
        return res.status(200).json(fallbackData);
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });
      
      const prompt = `You are generating comprehensive mock data for a virtual business system dashboard. 
The user is ${type === 'new' ? 'launching a new' : 'connecting an existing'} company.
Company Name: ${businessData?.businessName || 'Unknown'}
Industry: ${businessData?.industry || 'Unknown'}
Description: ${businessData?.description || 'Unknown'}
Employees: ${businessData?.employees || 'Unknown'}
Revenue/Size: ${businessData?.revenue || 'Unknown'}

Return an un-wrapped raw JSON object (no markdown) with this strict format:
{
  "metrics": {
    "revenue": number (believable total based on size/revenue tier),
    "customers": number (believable quantity based on industry)
  },
  "integrations": {
    "google": [3 highly specific realistic file names related to the company profile (e.g. .gdoc, .pdf)],
    "salesforce": [3 realistic sales/crm file names],
    "quickbooks": [3 realistic finance/accounting file names],
    "shopify": [3 realistic e-commerce/retail file names]
  },
  "tasks": [3 specific workflow phrases the user might want to automate, tailored to their industry (e.g., "Draft Q3 engineering roadmap", "Audit factory floor safety")],
  "launchDocs": [3 specific formation or initial planning document names (e.g., "Incorporation_Filing.pdf")]
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json"
        }
      });
      
      let resultData = fallbackData;
      try {
        const parsed = JSON.parse(response.text || '{}');
        if (parsed.metrics && parsed.integrations && parsed.tasks) {
          resultData = parsed;
        }
      } catch(e) {
        // fallback
      }
      res.status(200).json(resultData);
    } catch (error) {
      console.error('Company data generation failed, falling back:', error);
      res.status(200).json(fallbackData);
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
