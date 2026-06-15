import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import fs from "fs";
import nodemailer from "nodemailer";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 5000;

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

  // Firebase configuration on Backend for reliable writes without Iframe/WebSocket connectivity issues
  let db: any = null;
  try {
    const configPath = path.join(process.cwd(), 'firebase-applet-config.json');
    if (fs.existsSync(configPath)) {
      const firebaseConfig = JSON.parse(fs.readFileSync(configPath, 'utf8'));
      const firebaseApp = initializeApp(firebaseConfig);
      db = getFirestore(firebaseApp, firebaseConfig.firestoreDatabaseId);
      console.log("Firebase initialized successfully on Express backend with DB ID:", firebaseConfig.firestoreDatabaseId);
    } else {
      console.warn("firebase-applet-config.json not found on backend. Falling back.");
    }
  } catch (err) {
    console.error("Failed to initialize Firebase on backend:", err);
  }

  // Helper to map flat JS types to Firestore REST API parameters
  function toFirestoreValue(val: any): any {
    if (val === null || val === undefined) {
      return { nullValue: null };
    }
    if (typeof val === 'string') {
      return { stringValue: val };
    }
    if (typeof val === 'number') {
      return { doubleValue: val };
    }
    if (typeof val === 'boolean') {
      return { booleanValue: val };
    }
    if (Array.isArray(val)) {
      return {
        arrayValue: {
          values: val.map(toFirestoreValue)
        }
      };
    }
    if (typeof val === 'object') {
      const fields: Record<string, any> = {};
      for (const [k, v] of Object.entries(val)) {
        fields[k] = toFirestoreValue(v);
      }
      return { mapValue: { fields } };
    }
    return { stringValue: String(val) };
  }

  async function writeToFirestoreREST(collectionName: string, data: Record<string, any>) {
    const configPath = path.join(process.cwd(), 'firebase-applet-config.json');
    if (!fs.existsSync(configPath)) {
      throw new Error("firebase-applet-config.json not found on backend");
    }
    
    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    const { projectId, firestoreDatabaseId, apiKey } = config;
    if (!projectId || !firestoreDatabaseId || !apiKey) {
      throw new Error("Incomplete Firebase configuration in firebase-applet-config.json");
    }

    const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/${firestoreDatabaseId}/documents/${collectionName}?key=${apiKey}`;
    
    const fields: Record<string, any> = {};
    for (const [k, v] of Object.entries(data)) {
      fields[k] = toFirestoreValue(v);
    }

    // Explicitly model the timestamp in Firestore REST format
    if (data.submittedAt) {
      fields.submittedAt = { timestampValue: new Date(data.submittedAt).toISOString() };
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ fields })
    });

    if (!response.ok) {
      const errText = await response.text();
      let parsedErr;
      try {
        parsedErr = JSON.parse(errText);
      } catch (e) {
        parsedErr = { error: { message: errText } };
      }
      throw new Error(parsedErr.error?.message || `HTTP error ${response.status}: ${errText}`);
    }

    return await response.json();
  }

  app.post("/api/waitlist", express.json(), async (req, res) => {
    try {
      console.log("Processing waitlist request on Express backend, body:", req.body);
      const payload = {
        name: req.body.name || '',
        email: req.body.email || '',
        phone: req.body.phone || '',
        role: req.body.role || '',
        companyName: req.body.companyName || '',
        companySize: req.body.companySize || '',
        services: req.body.services || [],
        source: req.body.source || 'Direct',
        otherService: req.body.otherService || '',
        workflowContext: req.body.workflowContext || '',
        submittedAt: new Date().toISOString()
      };
      
      // Try writing via REST API first for guaranteed reliable container connectivity
      try {
        await writeToFirestoreREST('waitlist_requests', payload);
        console.log("Waitlist written successfully via REST API");
        return res.status(200).json({ success: true, method: 'REST' });
      } catch (restErr) {
        console.error("REST writing failed, falling back to Web client SDK:", restErr);
        if (db) {
          await addDoc(collection(db, 'waitlist_requests'), {
            ...req.body,
            submittedAt: serverTimestamp()
          });
          console.log("Waitlist written successfully via Fallback Web SDK");
          return res.status(200).json({ success: true, method: 'SDK' });
        } else {
          throw restErr;
        }
      }
    } catch (error) {
      console.error("Waitlist submission overall error on server:", error);
      res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
    }
  });

  app.post("/api/contact", express.json(), async (req, res) => {
    try {
      console.log("Processing contact submission on Express backend, body:", req.body);
      const payload = {
        name: req.body.name || '',
        email: req.body.email || '',
        role: req.body.role || '',
        contactReason: req.body.contactReason || 'general',
        message: req.body.message || '',
        phone: req.body.phone || '',
        companyName: req.body.companyName || '',
        website: req.body.website || '',
        expectedUsers: Number(req.body.expectedUsers) || 0,
        projectScope: req.body.projectScope || '',
        projectSuccess: req.body.projectSuccess || '',
        additionalNote: req.body.additionalNote || '',
        professionalService: req.body.professionalService || '',
        otherService: req.body.otherService || '',
        linkedinUrl: req.body.linkedinUrl || '',
        submittedAt: new Date().toISOString()
      };

      // Try writing via REST API first
      try {
        await writeToFirestoreREST('contact_submissions', payload);
        console.log("Contact submission written successfully via REST API");
        return res.status(200).json({ success: true, method: 'REST' });
      } catch (restErr) {
        console.error("REST writing failed, falling back to Web client SDK:", restErr);
        if (db) {
          await addDoc(collection(db, 'contact_submissions'), {
            ...req.body,
            submittedAt: serverTimestamp()
          });
          console.log("Contact submission written successfully via Fallback Web SDK");
          return res.status(200).json({ success: true, method: 'SDK' });
        } else {
          throw restErr;
        }
      }
    } catch (error) {
      console.error("Contact submission overall error on server:", error);
      res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
    }
  });

  app.post("/api/contact/notify", express.json(), async (req, res) => {
    const { name, email, message } = req.body || {};
    if (!name || !email) {
      return res.status(400).json({ error: "name and email are required" });
    }

    const smtpUser = process.env.ZOHO_SMTP_USER;
    const smtpPass = process.env.ZOHO_SMTP_PASS;

    if (!smtpUser || !smtpPass) {
      console.error("ZOHO_SMTP_USER or ZOHO_SMTP_PASS not set — skipping email");
      return res.status(503).json({ error: "Email service not configured" });
    }

    try {
      const transporter = nodemailer.createTransport({
        host: "smtp.zoho.com",
        port: 465,
        secure: true,
        auth: { user: smtpUser, pass: smtpPass },
      });

      await transporter.sendMail({
        from: `"Alfred Corp" <${smtpUser}>`,
        to: email,
        replyTo: smtpUser,
        subject: "We received your message — Alfred Corp",
        text: [
          `Hi ${name},`,
          "",
          "Thanks for reaching out! We've received your message and will follow up with you shortly.",
          "",
          message ? `Here's a copy of what you sent:\n\n${message}` : "",
          "",
          "— The Alfred Corp Team",
          "info@alfredcorp.com",
        ].join("\n"),
        html: `
          <div style="font-family:monospace;max-width:560px;margin:0 auto;color:#1a1a1a;">
            <div style="background:#0a0a0a;padding:24px 32px;border-bottom:2px solid #d4a843;">
              <span style="color:#d4a843;font-size:18px;font-weight:700;letter-spacing:2px;">ALFRED CORP</span>
            </div>
            <div style="padding:32px;">
              <p style="margin:0 0 16px;">Hi <strong>${name}</strong>,</p>
              <p style="margin:0 0 16px;">Thanks for reaching out. We've received your message and will follow up with you shortly.</p>
              ${message ? `<div style="background:#f5f5f5;border-left:3px solid #d4a843;padding:16px;margin:24px 0;font-size:13px;white-space:pre-wrap;">${message.replace(/</g, "&lt;")}</div>` : ""}
              <p style="margin:24px 0 0;">— The Alfred Corp Team<br/><a href="mailto:info@alfredcorp.com" style="color:#d4a843;">info@alfredcorp.com</a></p>
            </div>
          </div>
        `,
      });

      console.log(`Confirmation email sent to ${email}`);
      return res.status(200).json({ success: true });
    } catch (err) {
      console.error("Failed to send confirmation email:", err);
      return res.status(500).json({ error: err instanceof Error ? err.message : String(err) });
    }
  });

  app.post("/api/waitlist/notify", express.json(), async (req, res) => {
    const { name, email } = req.body || {};
    if (!name || !email) {
      return res.status(400).json({ error: "name and email are required" });
    }
    const smtpUser = process.env.ZOHO_SMTP_USER;
    const smtpPass = process.env.ZOHO_SMTP_PASS;
    if (!smtpUser || !smtpPass) {
      return res.status(503).json({ error: "Email service not configured" });
    }
    try {
      const transporter = nodemailer.createTransport({
        host: "smtp.zoho.com",
        port: 465,
        secure: true,
        auth: { user: smtpUser, pass: smtpPass },
      });
      await transporter.sendMail({
        from: `"Alfred Corp" <${smtpUser}>`,
        to: email,
        replyTo: smtpUser,
        subject: "Your access request was received — Alfred Corp",
        text: [
          `Hi ${name},`,
          "",
          "Thanks for requesting access to the Alfred Corp platform. We've received your request and will be in touch soon. Invites are dispatched on Tuesdays.",
          "",
          "— The Alfred Corp Team",
          "info@alfredcorp.com",
        ].join("\n"),
        html: `
          <div style="font-family:monospace;max-width:560px;margin:0 auto;color:#1a1a1a;">
            <div style="background:#0a0a0a;padding:24px 32px;border-bottom:2px solid #d4a843;">
              <span style="color:#d4a843;font-size:18px;font-weight:700;letter-spacing:2px;">ALFRED CORP</span>
            </div>
            <div style="padding:32px;">
              <p style="margin:0 0 16px;">Hi <strong>${name}</strong>,</p>
              <p style="margin:0 0 16px;">Thanks for requesting access to the Alfred Corp platform. We've received your request and will be in touch soon.</p>
              <p style="margin:0 0 16px;color:#555;">Invites are dispatched on Tuesdays.</p>
              <p style="margin:24px 0 0;">— The Alfred Corp Team<br/><a href="mailto:info@alfredcorp.com" style="color:#d4a843;">info@alfredcorp.com</a></p>
            </div>
          </div>
        `,
      });
      console.log(`Waitlist confirmation email sent to ${email}`);
      return res.status(200).json({ success: true });
    } catch (err) {
      console.error("Failed to send waitlist confirmation email:", err);
      return res.status(500).json({ error: err instanceof Error ? err.message : String(err) });
    }
  });

  app.post("/api/fallback-notify", express.json(), async (req, res) => {
    const { type, payload } = req.body || {};
    const smtpUser = process.env.ZOHO_SMTP_USER;
    const smtpPass = process.env.ZOHO_SMTP_PASS;
    if (!smtpUser || !smtpPass) {
      return res.status(503).json({ error: "Email service not configured" });
    }
    try {
      const transporter = nodemailer.createTransport({
        host: "smtp.zoho.com",
        port: 465,
        secure: true,
        auth: { user: smtpUser, pass: smtpPass },
      });
      await transporter.sendMail({
        from: `"Alfred Corp System" <${smtpUser}>`,
        to: "info@alfredcorp.com",
        subject: `[Fallback] New ${type} Submission`,
        text: `Supabase fallback triggered for ${type}.\n\nPayload:\n${JSON.stringify(payload, null, 2)}`,
      });
      console.log(`Fallback notification email sent to info@alfredcorp.com for ${type}`);
      return res.status(200).json({ success: true });
    } catch (err) {
      console.error("Failed to send fallback email:", err);
      return res.status(500).json({ error: err instanceof Error ? err.message : String(err) });
    }
  });

  app.get("/api/check-db", async (req, res) => {
    const report: Record<string, any> = {
      timestamp: new Date().toISOString()
    };
    try {
      const configPath = path.join(process.cwd(), 'firebase-applet-config.json');
      if (!fs.existsSync(configPath)) {
        report.configExists = false;
        return res.status(200).json(report);
      }
      const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
      report.configExists = true;
      report.projectId = config.projectId;
      report.firestoreDatabaseId = config.firestoreDatabaseId;

      // Function to get and parse documents via REST
      const getDocumentsREST = async (collectionName: string) => {
        try {
          const url = `https://firestore.googleapis.com/v1/projects/${config.projectId}/databases/${config.firestoreDatabaseId}/documents/${collectionName}?key=${config.apiKey}`;
          const response = await fetch(url);
          if (!response.ok) {
            if (response.status === 404) return [];
            throw new Error(`HTTP error ${response.status}`);
          }
          const data = await response.json();
          if (!data.documents) return [];
          
          return data.documents.map((doc: any) => {
            const fields: Record<string, any> = {};
            for (const [key, val] of Object.entries(doc.fields || {})) {
              // Extract string values, numbers, etc.
              const valueObj: any = val;
              if ('stringValue' in valueObj) fields[key] = valueObj.stringValue;
              else if ('integerValue' in valueObj) fields[key] = Number(valueObj.integerValue);
              else if ('doubleValue' in valueObj) fields[key] = Number(valueObj.doubleValue);
              else if ('booleanValue' in valueObj) fields[key] = valueObj.booleanValue;
              else if ('timestampValue' in valueObj) fields[key] = valueObj.timestampValue;
              else fields[key] = JSON.stringify(valueObj);
            }
            return {
              id: doc.name.split('/').pop(),
              ...fields
            };
          });
        } catch (err: any) {
          console.error(`Error reading ${collectionName} via REST:`, err);
          return { error: err.message || String(err) };
        }
      };

      report.contactSubmissions = await getDocumentsREST('contact_submissions');
      report.waitlistRequests = await getDocumentsREST('waitlist_requests');

      const testPayload = {
        name: "Diag Test Run",
        email: "diag@example.com",
        role: "developer",
        contactReason: "general",
        submittedAt: new Date().toISOString()
      };

      // Test REST API write
      try {
        const restResult = await writeToFirestoreREST('contact_submissions', testPayload);
        report.restWriteResult = { success: true, docName: restResult.name };
      } catch (err: any) {
        report.restWriteResult = { success: false, error: err.message || String(err) };
      }

      // Test Web Client SDK write
      if (db) {
        try {
          const docRef = await addDoc(collection(db, 'contact_submissions'), {
            name: "Diag Test SDK",
            email: "diag_sdk@example.com",
            role: "developer",
            contactReason: "general",
            submittedAt: serverTimestamp()
          });
          report.sdkWriteResult = { success: true, docId: docRef.id };
        } catch (err: any) {
          report.sdkWriteResult = { success: false, error: err.message || String(err) };
        }
      } else {
        report.sdkWriteResult = { success: false, error: "Web client SDK `db` is not initialized" };
      }

      res.status(200).json({ status: "success", report });
    } catch (err: any) {
      res.status(500).json({ status: "error", error: err.message || String(err) });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true, allowedHosts: true, host: '0.0.0.0' },
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
