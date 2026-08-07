import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Folder, FileText, Code, Plus, Search, X, Copy, Check,
  ExternalLink, Trash2, ArrowUpRight, Filter, AlertCircle, Sparkles
} from "lucide-react";
import { DocumentDropZone } from "./DocumentDropZone";

interface ShowcaseItem {
  id: string;
  title: string;
  subtitle: string;
  category: "project" | "document" | "code";
  description: string;
  tags: string[];
  details: string;
  isCustom?: boolean;
}

const DEFAULT_ITEMS: ShowcaseItem[] = [
  {
    id: "default-proj-1",
    title: "GE HealthCare KloudFuse Migration Guide",
    subtitle: "Platform Observability System",
    category: "project",
    description: "Designed the end-to-end strategy to migrate internal software guides to standard Docs-as-Code. Enabled internal developer teams to self-onboard onto Prometheus metrics, OpenTelemetry, and Grafana visualizations.",
    tags: ["Kubernetes", "AWS", "Docs-as-Code", "Prometheus", "Grafana"],
    details: "### Project Overview\nThis project established the single-source-of-truth documentation framework for observability onboarding at GE HealthCare.\n\n### Business Impact\n- Decreased onboarding cycles for 12+ internal service SRE teams from 3 weeks to under 48 hours.\n- Standardized modular documentation pipelines and embedded auto-linting checks for compliance. \n- Re-used 70% of core instructions across product variants by modeling topics with clear concepts, tasks, and references."
  },
  {
    id: "default-doc-1",
    title: "Critical User Journey (CUJ) API Spec",
    subtitle: "Commonwealth Bank of Australia",
    category: "document",
    description: "A comprehensive OpenAPI standard documentation defining payment gateways and SRE recovery triggers for high-frequency transactions.",
    tags: ["OpenAPI 3.0", "Swagger", "SRE Guide", "FinTech"],
    details: "## API Endpoint: `/api/v1/payments/diagnose` \n\nThis endpoint retrieves real-time distributed tracing information across downstream core ledger nodes for high-value audit verification.\n\n### Path Parameters\n* `correlation_id` (string, required): Standard UUID.4 identifier mapping to the inbound payment packet.\n\n### Response Payload (200 OK)\n```json\n{\n  \"status\": \"HEALTHY\",\n  \"response_time_ms\": 108,\n  \"payload_checksum\": \"sha256-a94f6f...\",\n  \"nodes_visited\": [\n    { \"node_id\": \"auth_gate_1\", \"status\": \"OK\", \"duration\": 24 },\n    { \"node_id\": \"ledger_validator\", \"status\": \"OK\", \"duration\": 84 }\n  ]\n}\n```"
  },
  {
    id: "default-code-1",
    title: "Automated PR Terminology Linter",
    subtitle: "Docs-as-Code Automation Workflow",
    category: "code",
    description: "A automated continuous integration pipeline written in YAML and Node.js that lints incoming markdown files against the Microsoft Manual of Style rules.",
    tags: ["CI/CD", "GitHub Actions", "Markdown", "Node.js", "Automation"],
    details: "```yaml\n# .github/workflows/docs-linter.yml\nname: Technical Content Linter\n\non:\n  pull_request:\n    paths:\n      - 'docs/**.md'\n\njobs:\n  validate-terminology:\n    runs-on: ubuntu-latest\n    steps:\n      - name: Checkout Code\n        uses: actions/checkout@v4\n\n      - name: Run Microsoft Style Guide Linter\n        run: |\n          node -e \"\n          const fs = require('fs');\n          const forbidden = { 'utilize': 'use', 'execute': 'run', 'terminate': 'stop' };\n          // Custom search script validating style guides...\n          console.log('✅ Terms clean. Linter success.');\n          \"\n```"
  },
  {
    id: "default-doc-2",
    title: "Oxygen XML Modular Task Snippet",
    subtitle: "DITA Topic Architecture",
    category: "document",
    description: "An XML-based modular document snippet showcasing structured topic-based authoring rules with strict task schemas, info blocks, and steps.",
    tags: ["DITA XML", "Oxygen XML", "Single-Sourcing", "DITA Map"],
    details: "```xml\n<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<!DOCTYPE task PUBLIC \"-//OASIS//DTD DITA Task//EN\" \"task.dtd\">\n<task id=\"configure_collector\">\n  <title>Configuring the Log Collector Daemon</title>\n  <shortdesc>Set up the system log forwarding daemon in your local container cluster.</shortdesc>\n  <taskbody>\n    <prereq>Ensure that port 514 is unblocked.</prereq>\n    <steps>\n      <step>\n        <cmd>Open the configuration file <filepath>/etc/collector.conf</filepath>.</cmd>\n      </step>\n      <step>\n        <cmd>Specify the server IP address inside the <codeph>target_host</codeph> attribute.</cmd>\n        <info>Using hostnames is recommended for dynamic cluster routing.</info>\n      </step>\n    </steps>\n    <result>\n      <p>The daemon will automatically reload changes and launch telemetry streaming.</p>\n    </result>\n  </taskbody>\n</task>\n```"
  },
  {
    id: "default-code-2",
    title: "AI-Powered Spec-to-Draft Release Notes Agent",
    subtitle: "Agentic AI Writing Tool",
    category: "code",
    description: "A server-side scripting automation that intercepts technical specifications and generates structured, human-edited release notes using the Gemini SDK.",
    tags: ["Gemini API", "AI Agent", "Workflow", "Node.js"],
    details: "```javascript\n// server/agent.ts\nimport { GoogleGenAI } from \"@google/genai\";\n\nconst ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });\n\nexport async function compileDraftNotes(engineeringSpec) {\n  const response = await ai.models.generateContent({\n    model: \"gemini-2.5-flash\",\n    contents: [\n      {\n        text: `Translate this engineering specification into a professional, consumer-ready release notes draft following the Microsoft Manual of Style guidelines:\\n\\n${engineeringSpec}`\n      }\n    ]\n  });\n  return response.text;\n}\n```"
  },
  {
    id: "default-code-3",
    title: "Multi-Agent Manual Snippet Q&A Bot",
    subtitle: "CrewAI & Claude Code Onboarding Integration",
    category: "code",
    description: "An agentic AI assistant framework that ingests product manuals, shards them into coherent snippets, and utilizes an orchestrated multi-agent CrewAI setup to walk new users through configuration checklists.",
    tags: ["CrewAI", "Claude Code", "Gemini", "NotebookLM", "Retrieval Agents"],
    details: "### Multi-Agent Knowledge Retrieval Architecture\n\nThis CrewAI script coordinates two specialized agents (Manual Researcher & Customer Success Onboarding Agent) to fetch manual snippets and assist the client.\n\n```python\n# agentic_onboarding/crew.py\nfrom crewai import Agent, Crew, Process, Task\nfrom langchain_google_genai import ChatGoogleGenerativeAI\n\nllm = ChatGoogleGenerativeAI(model=\"gemini-2.5-flash\")\n\n# 1. Specialist researcher to read manuals in context-aware snippets\nmanual_researcher = Agent(\n    role=\"Technical Manual Specialist\",\n    goal=\"Retrieve precise, snippet-sized instructions from complex PDF/Markdown manuals.\",\n    backstory=\"You are an expert at parsing structured DITA-XML and dense technical specifications.\",\n    verbose=True,\n    llm=llm\n)\n\n# 2. Onboarding counselor to help user/customer complete the task\ncustomer_onboarding_agent = Agent(\n    role=\"Customer Success Guide\",\n    goal=\"Guide new users through onboarding tasks using precise instructions.\",\n    backstory=\"You translate raw technical details into clear, friendly, progressive steps.\",\n    verbose=True,\n    llm=llm\n)\n\n# Tasks definition\nresearch_task = Task(\n    description=\"Retrieve the exact setup instructions for '{query}' from the provided documentation.\",\n    expected_output=\"A structured snippet detailing commands, credentials, and prerequisites.\",\n    agent=manual_researcher\n)\n\nonboarding_task = Task(\n    description=\"Based on the retrieved snippet, draft a friendly, step-by-step guidance block.\",\n    expected_output=\"An interactive, easy-to-follow onboarding instruction message for the user.\",\n    agent=customer_onboarding_agent\n)\n\nonboarding_crew = Crew(\n    agents=[manual_researcher, customer_onboarding_agent],\n    tasks=[research_task, onboarding_task],\n    process=Process.sequential\n)\n```"
  },
  {
    id: "default-doc-3",
    title: "eClinicalWorks 10i OPD User Guide",
    subtitle: "Outpatient Department (OPD) System",
    category: "document",
    description: "A comprehensive outpatient (OPD) clinical and financial administration guide detailing patient registration, payment collections, refunds, and support workflows.",
    tags: ["eClinicalWorks", "EMR Integration", "Outpatient Billing", "Patient Registration"],
    details: "### Document Overview\nThis User Guide (v10i INT) establishes structured processes for managing patient records and financial billing within the Outpatient Department (OPD) of healthcare networks.\n\n### Core System Context\n- **Interconnected Medical Records**: Details how labs, X-rays, diagnostics, scheduling, and billing are fully linked to maximize administrative efficiency.\n- **Patient Registration & Verification**: Step-by-step procedures for creating/editing patient files, setting 'Handle with Care' warning flags, and printing registration cards.\n- **Billing & Refunds**: Comprehensive instructions for collecting fees, posting payments (Cash, Cards, Cheques, Demand Drafts, EFT), and processing services refunds."
  },
  {
    id: "default-doc-4",
    title: "Philips Pinnacle3 Instructions for Use",
    subtitle: "Radiation Therapy Planning (RTP) System",
    category: "document",
    description: "Highly regulated, safety-critical systems guide outlining hardware prerequisites, dose computations, image fusion algorithms, and auto-segmentation procedures.",
    tags: ["Pinnacle3", "Oncology RTP", "Auto-Segmentation", "Dose Calculations"],
    details: "### Document Overview\nA professional reference manual for clinical medical physicists and radiation technologists operating the Pinnacle3 Radiation Therapy Planning (RTP) system.\n\n### Core System Context\n- **Relative Biological Effect (RBE)**: Guides on calculating and entering absolute dose factors for proton beam therapies vs. standard photon/electron modalities.\n- **Deformable Image Fusion (Syntegra)**: Outlines advanced mutual information and local correlation algorithms to map secondary PET or MRI image sets to primary CT datasets.\n- **Safety-Critical Controls**: Rigorous boundaries for setting outside-patient air thresholds, couch removal planes, and MLC (Multi-Leaf Collimator) jaws."
  },
  {
    id: "default-doc-5",
    title: "Navistar Threat Intelligence API Guide",
    subtitle: "QCoE Threat Intelligence exchange (NTIX)",
    category: "document",
    description: "Developer-focused OpenAPI specifications, request-response schemas, and administrative procedures for configuring threat intelligence reports.",
    tags: ["Navistar NTIX", "OpenAPI Specification", "Cybersecurity", "API Integration"],
    details: "### Document Overview\nThis technical guide maps endpoints, request schemas, rate limiting, and scheduling mechanisms for the Navistar Threat Intelligence eXchange (NTIX) platform.\n\n### Core System Context\n- **Threat Reporting API**: Detailed parameters for `POST /ingestion/reports/?type=basic` to run and schedule threat insights.\n- **Access Control & Credentials**: Admin guidelines for configuring NTIX Integrator keys, rate limiting per tenant, and multi-factor authentication (MFA) steps.\n- **Structured Schema Mapping**: Defines JSON schemas for `saved_search` queries, EPOCH-formatted start times, and internal/external email distribution lists."
  },
  {
    id: "default-doc-6",
    title: "GE HealthCare Imaging Insights Manual",
    subtitle: "Dose Analytics & Modality Dashboard",
    category: "document",
    description: "Comprehensive end-user and administrator reference manual integrating DoseWatch with multi-vendor diagnostic imaging analytics platforms.",
    tags: ["GE HealthCare", "Dose Analytics", "DoseWatch Integration", "Modality Dashboards"],
    details: "### Document Overview\nThis manual (Version 2.2.3) provides Diagnostic Imaging managers and Medical Physicists with instructions to track device utilization and radiation dose thresholds.\n\n### Core System Context\n- **DoseWatch Synchronization**: Real-time non-invasive retrieval of patient dose metrics (DLP, CTDIvol, SSDE) directly from multi-vendor scanners (CT, Mammography, MR, Ultrasound).\n- **Statistical Outlier Detection**: Describes the box plot calculation formulas (using interquartile range (IQR) limits: P25-1.5*IQR to P75+1.5*IQR) to isolate high-dose anomalies.\n- **Granular Cohort Filtering**: Explains how to slice diagnostic volume by patient BMI, age, weight, and positioner primary/secondary angles."
  }
];

export function ShowcaseSection() {
  const [items, setItems] = useState<ShowcaseItem[]>([]);
  const [activeTab, setActiveTab] = useState<"all" | "project" | "document" | "code">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState<ShowcaseItem | null>(null);

  // Add modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newSubtitle, setNewSubtitle] = useState("");
  const [newCategory, setNewCategory] = useState<"project" | "document" | "code">("project");
  const [newDescription, setNewDescription] = useState("");
  const [newTags, setNewTags] = useState("");
  const [newDetails, setNewDetails] = useState("");
  const [copySuccessId, setCopySuccessId] = useState<string | null>(null);

  // Initialize
  useEffect(() => {
    const stored = localStorage.getItem("prasanna_showcase_items_v5");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // If the user hasn't got the new default items yet, let's merge or reset to ensure they're visible
        const hasNewItem = parsed.some((item: any) => item.id === "default-doc-6");
        if (!hasNewItem) {
          const customItems = parsed.filter((item: any) => item.isCustom);
          const updated = [...DEFAULT_ITEMS, ...customItems];
          setItems(updated);
          localStorage.setItem("prasanna_showcase_items_v5", JSON.stringify(updated));
        } else {
          setItems(parsed);
        }
      } catch (e) {
        setItems(DEFAULT_ITEMS);
      }
    } else {
      setItems(DEFAULT_ITEMS);
      localStorage.setItem("prasanna_showcase_items_v5", JSON.stringify(DEFAULT_ITEMS));
    }
  }, []);

  // Sync to localStorage
  const saveItems = (newItems: ShowcaseItem[]) => {
    setItems(newItems);
    localStorage.setItem("prasanna_showcase_items_v5", JSON.stringify(newItems));
  };

  // Reset to defaults
  const handleReset = () => {
    if (confirm("Are you sure you want to restore the pristine default portfolio showcase? All custom added items will be removed.")) {
      saveItems(DEFAULT_ITEMS);
    }
  };

  // Add Item
  const handleAddItemSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newDescription) return;

    const newItem: ShowcaseItem = {
      id: "custom-" + Date.now(),
      title: newTitle,
      subtitle: newSubtitle || "Self-Authored Asset",
      category: newCategory,
      description: newDescription,
      tags: newTags ? newTags.split(",").map(t => t.trim()).filter(Boolean) : ["Portfolio"],
      details: newDetails || "No additional content files provided. Modify this item to include markdown or raw specifications.",
      isCustom: true
    };

    const updated = [newItem, ...items];
    saveItems(updated);

    // Reset inputs
    setNewTitle("");
    setNewSubtitle("");
    setNewCategory("project");
    setNewDescription("");
    setNewTags("");
    setNewDetails("");
    setIsModalOpen(false);
  };

  // Delete Item
  const handleDeleteItem = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Remove this item from your dashboard?")) {
      const updated = items.filter(item => item.id !== id);
      saveItems(updated);
      if (selectedItem?.id === id) {
        setSelectedItem(null);
      }
    }
  };

  // Copy details action
  const handleCopyDetails = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopySuccessId(id);
    setTimeout(() => setCopySuccessId(null), 2000);
  };

  // Filter items
  const filteredItems = items.filter(item => {
    const matchesCategory = activeTab === "all" || item.category === activeTab;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = !query ||
      item.title.toLowerCase().includes(query) ||
      item.subtitle.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.tags.some(tag => tag.toLowerCase().includes(query));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="portfolio" className="py-24 px-4 md:px-8 bg-brand-surface border-t border-brand-outline-variant">
      <div className="max-w-6xl mx-auto">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-mono text-brand-primary uppercase tracking-widest mb-2.5 flex items-center gap-1.5 justify-start">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
              Technical Workspace Showcase
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold tracking-tight text-brand-on-surface mb-3">
              Projects, Documents & Code
            </h2>
            <p className="text-brand-on-surface-variant max-w-2xl text-sm leading-relaxed">
              Explore custom deliverables, structured DITA-XML schema scripts, and automated linter code. Use the interactive panel to append new assets to the register below.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs font-medium flex items-center gap-1.5 shadow-md shadow-indigo-600/15 cursor-pointer transition-colors"
            >
              <Plus size={14} /> Add Showcase Item
            </button>
            <button
              onClick={handleReset}
              className="p-2.5 rounded-lg border border-brand-outline-variant hover:border-brand-outline hover:bg-brand-surface-low text-brand-outline hover:text-brand-on-surface transition-colors cursor-pointer"
              title="Restore Default Showcase"
            >
              <span className="text-xs font-mono">Reset Defaults</span>
            </button>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8 bg-brand-surface-low border border-brand-outline-variant p-3.5 rounded-2xl">
          {/* Tab buttons */}
          <div className="flex flex-wrap items-center gap-1">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-3 py-1.5 rounded-lg font-mono text-xs cursor-pointer transition-all ${
                activeTab === "all"
                  ? "bg-brand-primary text-brand-on-primary font-semibold"
                  : "text-brand-on-surface-variant hover:text-brand-on-surface hover:bg-brand-surface-high/55"
              }`}
            >
              All Assets ({items.length})
            </button>
            <button
              onClick={() => setActiveTab("project")}
              className={`px-3 py-1.5 rounded-lg font-mono text-xs cursor-pointer transition-all flex items-center gap-1 ${
                activeTab === "project"
                  ? "bg-indigo-500/15 text-indigo-400 border border-indigo-500/30 font-semibold"
                  : "text-brand-on-surface-variant hover:text-brand-on-surface hover:bg-brand-surface-high/55"
              }`}
            >
              <Folder size={12} /> Projects ({items.filter(i => i.category === "project").length})
            </button>
            <button
              onClick={() => setActiveTab("document")}
              className={`px-3 py-1.5 rounded-lg font-mono text-xs cursor-pointer transition-all flex items-center gap-1 ${
                activeTab === "document"
                  ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-semibold"
                  : "text-brand-on-surface-variant hover:text-brand-on-surface hover:bg-brand-surface-high/55"
              }`}
            >
              <FileText size={12} /> Documents ({items.filter(i => i.category === "document").length})
            </button>
            <button
              onClick={() => setActiveTab("code")}
              className={`px-3 py-1.5 rounded-lg font-mono text-xs cursor-pointer transition-all flex items-center gap-1 ${
                activeTab === "code"
                  ? "bg-amber-500/15 text-amber-400 border border-amber-500/30 font-semibold"
                  : "text-brand-on-surface-variant hover:text-brand-on-surface hover:bg-brand-surface-high/55"
              }`}
            >
              <Code size={12} /> Code Snippets ({items.filter(i => i.category === "code").length})
            </button>
          </div>

          {/* Search box */}
          <div className="relative flex-1 max-w-sm">
            <span className="absolute left-3 top-2.5 text-brand-outline">
              <Search size={14} />
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search title, tech, or description..."
              className="w-full bg-brand-surface-medium border border-brand-outline-variant rounded-lg py-1.5 pl-9 pr-4 text-xs font-mono text-brand-on-surface placeholder-brand-outline/85 focus:outline-none focus:border-brand-primary"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-2.5 text-brand-outline hover:text-brand-on-surface"
              >
                <X size={12} />
              </button>
            )}
          </div>
        </div>

        {/* Empty state */}
        {filteredItems.length === 0 && (
          <div className="border border-brand-outline-variant bg-brand-surface-low rounded-3xl p-12 text-center flex flex-col items-center justify-center">
            <AlertCircle size={32} className="text-brand-outline mb-3.5 animate-pulse" />
            <p className="font-serif text-lg text-brand-on-surface mb-1">No portfolio items found</p>
            <p className="font-sans text-xs text-brand-on-surface-variant max-w-sm leading-relaxed">
              No assets matched your search terms "{searchQuery}". Try adding a custom one above or reset to original values.
            </p>
          </div>
        )}

        {/* Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const isProject = item.category === "project";
            const isDocument = item.category === "document";
            const isCode = item.category === "code";

            return (
              <motion.div
                layout
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className="group relative bg-brand-surface-medium border border-brand-outline-variant/80 hover:border-brand-primary/45 rounded-2xl p-5 flex flex-col justify-between cursor-pointer transition-all hover:scale-[1.01] hover:bg-brand-surface-high/30 shadow-sm"
              >
                <div>
                  <div className="flex items-start justify-between mb-4">
                    {/* Visual type tag badge */}
                    <span className={`p-2 rounded-lg border ${
                      isProject
                        ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/20"
                        : isDocument
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                        : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                    }`}>
                      {isProject && <Folder size={16} />}
                      {isDocument && <FileText size={16} />}
                      {isCode && <Code size={16} />}
                    </span>

                    <div className="flex items-center gap-1.5">
                      {item.isCustom && (
                        <span className="text-[8px] font-mono uppercase bg-brand-primary/10 text-brand-primary border border-brand-primary/20 px-1.5 py-0.5 rounded">
                          Self Added
                        </span>
                      )}

                      {/* Delete option for custom ones */}
                      {item.isCustom && (
                        <button
                          onClick={(e) => handleDeleteItem(item.id, e)}
                          className="p-1 rounded text-brand-outline hover:text-red-400 hover:bg-red-500/10 transition-colors"
                          title="Delete Custom Item"
                        >
                          <Trash2 size={13} />
                        </button>
                      )}

                      <span className="text-brand-outline group-hover:text-brand-primary transition-colors">
                        <ArrowUpRight size={14} />
                      </span>
                    </div>
                  </div>

                  {/* Text titles */}
                  <div className="mb-3">
                    <span className="text-[9px] font-mono text-brand-outline uppercase tracking-wider block mb-0.5">
                      {item.subtitle}
                    </span>
                    <h3 className="font-serif text-base font-semibold text-brand-on-surface group-hover:text-brand-primary transition-colors leading-snug line-clamp-1">
                      {item.title}
                    </h3>
                  </div>

                  <p className="font-sans text-xs text-brand-on-surface-variant leading-relaxed line-clamp-3 mb-4">
                    {item.description}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-3.5 border-t border-brand-outline-variant/35">
                  {item.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="text-[9px] font-mono px-2 py-0.5 rounded bg-brand-surface-low border border-brand-outline-variant text-brand-outline">
                      {tag}
                    </span>
                  ))}
                  {item.tags.length > 3 && (
                    <span className="text-[9px] font-mono px-1.5 py-0.5 text-brand-outline">
                      +{item.tags.length - 3} more
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Dynamic File Upload Drop Zone and Document preview workspace */}
        <DocumentDropZone />

        {/* Detailed Item Modal/Overlay */}
        <AnimatePresence>
          {selectedItem && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Overlay background */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedItem(null)}
                className="absolute inset-0 bg-brand-surface-lowest/80 backdrop-blur-md"
              />

              {/* Modal Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                className="relative w-full max-w-3xl bg-brand-surface-low border border-brand-outline-variant rounded-3xl overflow-hidden shadow-2xl z-10 max-h-[85vh] flex flex-col"
              >
                {/* Header block with solid title */}
                <div className="p-6 md:p-8 border-b border-brand-outline-variant bg-brand-surface-medium flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className={`p-1.5 rounded text-xs ${
                        selectedItem.category === "project"
                          ? "bg-indigo-500/10 text-indigo-400"
                          : selectedItem.category === "document"
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-amber-500/10 text-amber-400"
                      }`}>
                        {selectedItem.category === "project" && "PROJECT"}
                        {selectedItem.category === "document" && "DOCUMENTATION"}
                        {selectedItem.category === "code" && "CODE SCRIPT"}
                      </span>
                      <span className="font-mono text-xs text-brand-outline">• {selectedItem.subtitle}</span>
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-brand-on-surface">
                      {selectedItem.title}
                    </h3>
                  </div>

                  <button
                    onClick={() => setSelectedItem(null)}
                    className="p-1.5 rounded-lg border border-brand-outline-variant hover:border-brand-outline hover:bg-brand-surface-high text-brand-outline hover:text-brand-on-surface transition-colors cursor-pointer"
                  >
                    <X size={16} />
                  </button>
                </div>

                {/* Content scroll area */}
                <div className="p-6 md:p-8 overflow-y-auto flex-1 font-sans text-sm text-brand-on-surface-variant leading-relaxed">
                  <div className="mb-6 bg-brand-surface p-4 rounded-xl border border-brand-outline-variant/60">
                    <span className="font-mono text-[10px] text-brand-outline uppercase tracking-wider block mb-1">Core Description</span>
                    <p className="text-brand-on-surface leading-relaxed text-xs sm:text-sm font-sans">{selectedItem.description}</p>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-[10px] text-brand-outline uppercase tracking-wider block">
                        {selectedItem.category === "code" || selectedItem.category === "document" && selectedItem.details.includes("<?xml") ? "Raw Source Script" : "Implementation Details"}
                      </span>
                      <button
                        onClick={() => handleCopyDetails(selectedItem.details, selectedItem.id)}
                        className="px-2 py-1 rounded border border-brand-outline-variant hover:border-brand-outline bg-brand-surface hover:bg-brand-surface-high text-[10px] font-mono text-brand-on-surface flex items-center gap-1 transition-all cursor-pointer"
                      >
                        {copySuccessId === selectedItem.id ? (
                          <>
                            <Check size={11} className="text-green-400" /> Copied
                          </>
                        ) : (
                          <>
                            <Copy size={11} /> Copy Code/Details
                          </>
                        )}
                      </button>
                    </div>

                    {/* Preformatted text with coding design blocks */}
                    <pre className="bg-brand-surface-lowest border border-brand-outline-variant rounded-xl p-4 overflow-x-auto text-xs font-mono text-brand-primary leading-normal max-h-96">
                      <code>{selectedItem.details}</code>
                    </pre>
                  </div>

                  <div>
                    <span className="font-mono text-[10px] text-brand-outline uppercase tracking-wider block mb-2">Workspace Tags</span>
                    <div className="flex flex-wrap gap-2">
                      {selectedItem.tags.map(tag => (
                        <span key={tag} className="text-xs font-mono px-2.5 py-1 rounded-full bg-brand-surface-medium border border-brand-outline-variant text-brand-on-surface-variant">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer buttons */}
                <div className="p-6 bg-brand-surface-medium border-t border-brand-outline-variant flex items-center justify-end gap-3">
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="px-4 py-2 rounded-lg font-mono text-xs border border-brand-outline-variant hover:border-brand-outline text-brand-on-surface cursor-pointer"
                  >
                    Dismiss Viewer
                  </button>
                  <button
                    onClick={() => {
                      handleCopyDetails(selectedItem.details, selectedItem.id);
                      alert("Asset payload copied to your clipboard!");
                    }}
                    className="px-4 py-2 rounded-lg font-mono text-xs bg-brand-primary text-brand-on-primary hover:bg-brand-primary/90 flex items-center gap-1.5 cursor-pointer"
                  >
                    Copy Asset Payload
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Form Modal to ADD a Showcase Item */}
        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsModalOpen(false)}
                className="absolute inset-0 bg-brand-surface-lowest/80 backdrop-blur-md"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                className="relative w-full max-w-lg bg-brand-surface-low border border-brand-outline-variant rounded-3xl overflow-hidden shadow-2xl z-10 max-h-[90vh] flex flex-col"
              >
                <div className="p-6 border-b border-brand-outline-variant bg-brand-surface-medium flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles size={16} className="text-brand-primary" />
                    <h3 className="font-serif text-lg font-bold text-brand-on-surface">Add Portfolio Showcase Item</h3>
                  </div>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="p-1 rounded-lg border border-brand-outline-variant hover:bg-brand-surface-high text-brand-outline hover:text-brand-on-surface cursor-pointer"
                  >
                    <X size={14} />
                  </button>
                </div>

                <form onSubmit={handleAddItemSubmit} className="p-6 overflow-y-auto flex-1 flex flex-col gap-4">
                  {/* Title */}
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-mono text-brand-outline uppercase tracking-wider">Asset Title *</label>
                    <input
                      type="text"
                      required
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      placeholder="e.g. Swagger API Auth Reference"
                      className="bg-brand-surface-medium border border-brand-outline-variant rounded-lg p-2.5 text-xs text-brand-on-surface font-mono focus:outline-none focus:border-brand-primary"
                    />
                  </div>

                  {/* Subtitle */}
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-mono text-brand-outline uppercase tracking-wider">Subtitle / Company</label>
                    <input
                      type="text"
                      value={newSubtitle}
                      onChange={(e) => setNewSubtitle(e.target.value)}
                      placeholder="e.g. GE HealthCare System"
                      className="bg-brand-surface-medium border border-brand-outline-variant rounded-lg p-2.5 text-xs text-brand-on-surface font-mono focus:outline-none focus:border-brand-primary"
                    />
                  </div>

                  {/* Category selector */}
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-mono text-brand-outline uppercase tracking-wider">Category *</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value as any)}
                      className="bg-brand-surface-medium border border-brand-outline-variant rounded-lg p-2.5 text-xs text-brand-on-surface font-mono focus:outline-none focus:border-brand-primary"
                    >
                      <option value="project">Project Work Overview</option>
                      <option value="document">Document / XML / Markdown</option>
                      <option value="code">Code / Workflow Script</option>
                    </select>
                  </div>

                  {/* Description */}
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-mono text-brand-outline uppercase tracking-wider">Short Description *</label>
                    <textarea
                      required
                      rows={2}
                      value={newDescription}
                      onChange={(e) => setNewDescription(e.target.value)}
                      placeholder="Enter a brief high-level summary of the accomplishments or features."
                      className="bg-brand-surface-medium border border-brand-outline-variant rounded-lg p-2.5 text-xs text-brand-on-surface font-sans resize-none focus:outline-none focus:border-brand-primary"
                    />
                  </div>

                  {/* Tags */}
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-mono text-brand-outline uppercase tracking-wider">Tags (comma-separated)</label>
                    <input
                      type="text"
                      value={newTags}
                      onChange={(e) => setNewTags(e.target.value)}
                      placeholder="e.g. XML, DITA, Swagger, CI/CD"
                      className="bg-brand-surface-medium border border-brand-outline-variant rounded-lg p-2.5 text-xs text-brand-on-surface font-mono focus:outline-none focus:border-brand-primary"
                    />
                  </div>

                  {/* Detail Code / Content Payload */}
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-mono text-brand-outline uppercase tracking-wider">Detailed Content / Raw Code Snippet</label>
                    <textarea
                      rows={5}
                      value={newDetails}
                      onChange={(e) => setNewDetails(e.target.value)}
                      placeholder="Enter the full XML code, YAML steps, or Markdown text detail that expands on click."
                      className="bg-brand-surface-medium border border-brand-outline-variant rounded-lg p-2.5 text-xs text-brand-on-surface font-mono resize-none focus:outline-none focus:border-brand-primary"
                    />
                  </div>

                  <div className="mt-2 flex items-center justify-end gap-2.5">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-4 py-2 rounded-lg font-mono text-xs border border-brand-outline-variant hover:bg-brand-surface-high text-brand-on-surface cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-lg font-mono text-xs bg-brand-primary text-brand-on-primary hover:bg-brand-primary/95 cursor-pointer"
                    >
                      Save to Portfolio
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
