import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  FileText, UploadCloud, Trash2, Edit3, Check, X,
  FileCode, Eye, Download, AlertCircle, Sparkles,
  Clock, BookOpen, Tag, ChevronRight, File, CheckCircle2
} from "lucide-react";

export interface UploadedFile {
  id: string;
  name: string;
  size: string;
  type: "pdf" | "word";
  uploadDate: string;
  abstract: string;
  sections: {
    title: string;
    content: string;
  }[];
  author: string;
  status: "Draft" | "Verified" | "Reviewed";
}

const INITIAL_FILES: UploadedFile[] = [
  {
    id: "pre-1",
    name: "GE_HC_DoseWatch_Integration_Plan_v1.pdf",
    size: "1.4 MB",
    type: "pdf",
    uploadDate: "2026-07-04 08:30",
    author: "Prasanna Kumar Swain",
    status: "Verified",
    abstract: "A structured migration plan designed to synchronize GE HealthCare DoseWatch telemetry logs with localized Splunk and OpenTelemetry collector daemons.",
    sections: [
      {
        title: "1. Executive Summary",
        content: "This project outlines the single-source-of-truth orchestration needed to streamline dose analytics. By automating log synchronization over secure TLS tunnels, physical hospitals minimize latency reporting thresholds and achieve strict regulatory compliance."
      },
      {
        title: "2. Architectural Overview",
        content: "The ingestion architecture routes PACS metadata directly through an optimized Node-based daemon. Downstream Prometheus containers track queue depths, rendering live metrics on localized Grafana dashboards."
      },
      {
        title: "3. Verification Checklist",
        content: "Ensure port 514 is fully open. Run the self-diagnostics pipeline with standard sha256 checksum validation to confirm zero telemetry packet drop across core ledger interfaces."
      }
    ]
  },
  {
    id: "pre-2",
    name: "CBA_Payment_API_Spec_CUJ_v4.docx",
    size: "820 KB",
    type: "word",
    uploadDate: "2026-07-04 08:35",
    author: "Prasanna Kumar Swain",
    status: "Draft",
    abstract: "Critical User Journey API definitions outlining transaction failover triggers and latency thresholds for high-frequency banking portals.",
    sections: [
      {
        title: "1. Gateway Specifications",
        content: "Defines the standard RESTful endpoints for `/api/v1/payments/diagnose` with strict rate limiting rules and distributed tracing correlations."
      },
      {
        title: "2. Error Handling & SRE Recovery",
        content: "In the event of an upstream validator timeout, downstream microservices auto-terminate queries and cascade error payloads with strict audit hashes."
      }
    ]
  }
];

export function DocumentDropZone() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [selectedId, setSelectedId] = useState<string>("");
  const [dragActive, setDragActive] = useState(false);
  const [isParsing, setIsParsing] = useState(false);
  const [parsingName, setParsingName] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load files from localStorage or initial defaults
  useEffect(() => {
    const stored = localStorage.getItem("prasanna_uploaded_files_v1");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.length > 0) {
          setFiles(parsed);
          setSelectedId(parsed[0].id);
        } else {
          setFiles(INITIAL_FILES);
          setSelectedId(INITIAL_FILES[0].id);
        }
      } catch (e) {
        setFiles(INITIAL_FILES);
        setSelectedId(INITIAL_FILES[0].id);
      }
    } else {
      setFiles(INITIAL_FILES);
      setSelectedId(INITIAL_FILES[0].id);
      localStorage.setItem("prasanna_uploaded_files_v1", JSON.stringify(INITIAL_FILES));
    }
  }, []);

  const saveFiles = (newFiles: UploadedFile[]) => {
    setFiles(newFiles);
    localStorage.setItem("prasanna_uploaded_files_v1", JSON.stringify(newFiles));
  };

  // Helper to generate realistic sections based on filename
  const generateMockContent = (fileName: string, fileSize: string, fileType: "pdf" | "word"): UploadedFile => {
    const cleanName = fileName.replace(/\.[^/.]+$/, "");
    const lower = fileName.toLowerCase();

    let abstract = "Successfully ingested project deliverable artifact. Our parsing system has mapped metadata attributes and established mock XML outline components.";
    let sections = [
      {
        title: "1. Purpose of Document",
        content: "This technical document delivers structured reference materials supporting operational excellence and team onboarding."
      },
      {
        title: "2. Operational Specifications",
        content: "Provides sequential checklists, API routing maps, or DITA tasks required for robust deployment validation."
      },
      {
        title: "3. Quality Verification",
        content: "All parameters are vetted against strict regulatory validation standards, ensuring optimal compliance benchmarks."
      }
    ];

    if (lower.includes("kubernetes") || lower.includes("k8s") || lower.includes("cloud") || lower.includes("aws")) {
      abstract = `Automated cloud deployment guide for ${cleanName} leveraging scalable orchestrations and continuous observability loops.`;
      sections = [
        {
          title: "1. Cluster Deployment Parameters",
          content: "Configures horizontal pod autoscaling and persistent volume claims on elastic environments. Employs node affinity boundaries to isolate safety-critical processes."
        },
        {
          title: "2. Observability & Log Forwarding",
          content: "Spawns FluentBit log daemons to aggregate and forward JSON payloads to centralized analytics pipelines, keeping error queues below strict SLA thresholds."
        },
        {
          title: "3. Cluster Integrity Testing",
          content: "Conduct regular chaos injection scripts and pod death simulations to test recovery latency. Ensures maximum state restoration within 12 seconds."
        }
      ];
    } else if (lower.includes("api") || lower.includes("swagger") || lower.includes("spec") || lower.includes("endpoint")) {
      abstract = `RESTful API interface mapping and telemetry endpoints defined inside ${cleanName} for seamless service integrations.`;
      sections = [
        {
          title: "1. Authentication Protocol",
          content: "All inbound requests must supply a Bearer JWT header carrying a valid signature. Requests expire after 300 seconds to minimize spoofing vulnerabilities."
        },
        {
          title: "2. Endpoints & Schema Models",
          content: "Maps GET and POST payloads with precise JSON schemas, explicit validation regexes, and deterministic rate-limiting variables."
        },
        {
          title: "3. Response Diagnostics",
          content: "Provides telemetry payloads tracking service latencies, system errors, and audit verification hashes."
        }
      ];
    } else if (lower.includes("dita") || lower.includes("xml") || lower.includes("oxygen") || lower.includes("topic")) {
      abstract = `Structured topic-based single-sourced compilation validating XML schema maps, task descriptions, and concept models.`;
      sections = [
        {
          title: "1. DITA Map Architecture",
          content: "Defines the keymap and hierarchical references to modular XML files. Implements conditional filtering rules based on audience profiles."
        },
        {
          title: "2. Task Topic Schemas",
          content: "Presents highly structured task scripts with strict command guidelines, prerequisites, context boxes, and explicit expected result sets."
        },
        {
          title: "3. CMS Compilation Output",
          content: "Successfully builds PDF user manuals, HTML5 online help libraries, and embedded localized instruction screens."
        }
      ];
    }

    const pad = (num: number) => num.toString().padStart(2, "0");
    const d = new Date();
    const formattedDate = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;

    return {
      id: "doc-" + Date.now(),
      name: fileName,
      size: fileSize,
      type: fileType,
      uploadDate: formattedDate,
      author: "Local Contributor",
      status: "Draft",
      abstract,
      sections
    };
  };

  // Drag and drop events
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // Handle actual dropped files
  const processFiles = (fileList: FileList) => {
    if (fileList.length === 0) return;
    const file = fileList[0];
    const name = file.name;
    const sizeInKB = Math.round(file.size / 1024);
    const sizeStr = sizeInKB > 1024
      ? (sizeInKB / 1024).toFixed(1) + " MB"
      : sizeInKB + " KB";

    // Check file extension
    const ext = name.split(".").pop()?.toLowerCase() || "";
    if (ext !== "pdf" && ext !== "doc" && ext !== "docx") {
      alert("Invalid file format. Please drop PDF or Word files (.pdf, .doc, .docx).");
      return;
    }

    const type = ext === "pdf" ? "pdf" : "word";

    // Simulate technical parsing loader
    setIsParsing(true);
    setParsingName(name);

    setTimeout(() => {
      const parsedDoc = generateMockContent(name, sizeStr, type);
      const updated = [parsedDoc, ...files];
      saveFiles(updated);
      setSelectedId(parsedDoc.id);
      setIsParsing(false);
      setParsingName("");
    }, 1200);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleFileSelectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFiles(e.target.files);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Manage uploaded files
  const handleDeleteFile = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this uploaded file? This will remove it from the session workspace.")) {
      const filtered = files.filter(f => f.id !== id);
      saveFiles(filtered);
      if (selectedId === id && filtered.length > 0) {
        setSelectedId(filtered[0].id);
      } else if (filtered.length === 0) {
        setSelectedId("");
      }
    }
  };

  const startRename = (f: UploadedFile, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingId(f.id);
    setRenameValue(f.name);
  };

  const finishRename = (id: string, e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!renameValue.trim()) return;

    // Ensure it retains an appropriate file extension if edited out
    let finalName = renameValue.trim();
    const originalFile = files.find(f => f.id === id);
    if (originalFile) {
      const originalExt = originalFile.name.split(".").pop()?.toLowerCase();
      const currentExt = finalName.split(".").pop()?.toLowerCase();
      if (currentExt !== originalExt) {
        finalName += `.${originalExt}`;
      }
    }

    const updated = files.map(f => {
      if (f.id === id) {
        return { ...f, name: finalName };
      }
      return f;
    });

    saveFiles(updated);
    setEditingId(null);
  };

  const cancelRename = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingId(null);
  };

  // Download Simulated Payload File
  const triggerDownload = (file: UploadedFile) => {
    const textData = `DOCUMENT METADATA INGESTION REPORT
==================================
Filename: ${file.name}
Size: ${file.size}
Author: ${file.author}
Status: ${file.status}
Upload Timestamp: ${file.uploadDate}

ABSTRACT:
${file.abstract}

DOCUMENT STRUCTURE OUTLINE:
----------------------------------
${file.sections.map(s => `${s.title}\n${s.content}\n`).join("\n")}
==================================
Generated via Prasanna Kumar Swain Portfolio Technical Sandbox Engine.
`;

    const blob = new Blob([textData], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = file.name.replace(/\.[^/.]+$/, "") + "_parsed_report.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const activeFile = files.find(f => f.id === selectedId);

  return (
    <div id="document-ingestion-workspace" className="bg-brand-surface-low border border-brand-outline-variant rounded-3xl p-6 md:p-8 mt-12 shadow-inner">
      <div className="flex flex-col lg:flex-row gap-8 items-start">

        {/* Left Side: Upload & Manage files list */}
        <div className="w-full lg:w-5/12 flex flex-col gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="p-1 rounded bg-emerald-500/10 text-emerald-400">
                <UploadCloud size={16} />
              </span>
              <h3 className="font-serif text-lg font-bold text-brand-on-surface">Document Ingestion Zone</h3>
            </div>
            <p className="text-xs text-brand-on-surface-variant leading-relaxed font-sans">
              Drag and drop drafts or design specifications to generate dynamic content mockups. Files persist locally in your secure browser session.
            </p>
          </div>

          {/* Drag & Drop Area */}
          <div
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            onClick={triggerFileInput}
            className={`relative border-2 border-dashed rounded-2xl p-6 text-center flex flex-col items-center justify-center cursor-pointer transition-all ${
              dragActive
                ? "border-brand-primary bg-brand-primary/10 scale-[0.99]"
                : "border-brand-outline-variant hover:border-brand-outline hover:bg-brand-surface-medium/40"
            }`}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelectChange}
              accept=".pdf,.doc,.docx"
              className="hidden"
            />

            <UploadCloud
              size={36}
              className={`mb-3 transition-colors ${
                dragActive ? "text-brand-primary" : "text-brand-outline"
              }`}
            />

            <span className="font-mono text-xs text-brand-on-surface font-semibold mb-1">
              {dragActive ? "Drop file now" : "Select or drag file here"}
            </span>
            <span className="font-sans text-[10px] text-brand-outline">
              Supports .pdf, .doc, .docx formats
            </span>
          </div>

          {/* Loader Simulator */}
          <AnimatePresence>
            {isParsing && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-brand-surface-medium border border-indigo-500/30 rounded-xl p-4 flex items-center gap-3"
              >
                <div className="w-4 h-4 rounded-full border-2 border-brand-primary border-t-transparent animate-spin flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-mono text-[10px] text-brand-primary uppercase tracking-widest leading-none mb-1.5 animate-pulse">Ingesting Document</p>
                  <p className="font-mono text-xs text-brand-on-surface truncate leading-none">{parsingName}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Uploaded Files Manager */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <span className="font-mono text-[10px] text-brand-outline uppercase tracking-wider">
                Uploaded Project Files ({files.length})
              </span>
              {files.length > 0 && (
                <button
                  onClick={() => {
                    if (confirm("Delete all uploaded documents from your workspace?")) {
                      saveFiles([]);
                      setSelectedId("");
                    }
                  }}
                  className="text-[9px] font-mono text-red-400 hover:underline cursor-pointer"
                >
                  Clear All
                </button>
              )}
            </div>

            {files.length === 0 ? (
              <div className="border border-brand-outline-variant/60 rounded-xl p-6 text-center text-brand-outline text-xs font-sans">
                No active document files in register. Upload a draft specification to initiate insights.
              </div>
            ) : (
              <div className="flex flex-col gap-2 max-h-60 overflow-y-auto pr-1">
                {files.map(file => {
                  const isSelected = file.id === selectedId;
                  const isPdf = file.type === "pdf";

                  return (
                    <div
                      key={file.id}
                      onClick={() => !editingId && setSelectedId(file.id)}
                      className={`group relative p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                        isSelected
                          ? "bg-brand-surface-medium border-brand-primary shadow-sm"
                          : "bg-brand-surface border-brand-outline-variant/60 hover:bg-brand-surface-medium/30"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0 flex-1">
                        <span className={`p-1.5 rounded-lg ${
                          isPdf ? "bg-red-500/10 text-red-400" : "bg-blue-500/10 text-blue-400"
                        }`}>
                          <FileText size={15} />
                        </span>

                        <div className="flex-1 min-w-0">
                          {editingId === file.id ? (
                            <form
                              onSubmit={(e) => finishRename(file.id, e)}
                              className="flex items-center gap-1"
                              onClick={e => e.stopPropagation()}
                            >
                              <input
                                type="text"
                                value={renameValue}
                                onChange={e => setRenameValue(e.target.value)}
                                className="bg-brand-surface border border-brand-primary rounded px-1.5 py-0.5 text-xs text-brand-on-surface font-mono w-full focus:outline-none"
                                autoFocus
                              />
                              <button
                                type="submit"
                                className="p-1 rounded text-green-400 hover:bg-green-500/10 cursor-pointer"
                                title="Confirm rename"
                              >
                                <Check size={12} />
                              </button>
                              <button
                                type="button"
                                onClick={cancelRename}
                                className="p-1 rounded text-red-400 hover:bg-red-500/10 cursor-pointer"
                                title="Cancel rename"
                              >
                                <X size={12} />
                              </button>
                            </form>
                          ) : (
                            <>
                              <p className="font-mono text-xs text-brand-on-surface truncate font-semibold">
                                {file.name}
                              </p>
                              <p className="font-mono text-[9px] text-brand-outline flex items-center gap-1.5 mt-0.5">
                                <span>{file.size}</span>
                                <span>•</span>
                                <span>{file.uploadDate}</span>
                              </p>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      {!editingId && (
                        <div className="flex items-center gap-1.5 ml-2">
                          <button
                            onClick={(e) => startRename(file, e)}
                            className="p-1 rounded text-brand-outline hover:text-brand-on-surface hover:bg-brand-surface-high/50 transition-colors cursor-pointer"
                            title="Rename document file"
                          >
                            <Edit3 size={11} />
                          </button>
                          <button
                            onClick={(e) => handleDeleteFile(file.id, e)}
                            className="p-1 rounded text-brand-outline hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                            title="Remove document file"
                          >
                            <Trash2 size={11} />
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Visual Document Preview Area */}
        <div className="w-full lg:w-7/12 border border-brand-outline-variant/60 bg-brand-surface-medium/35 rounded-2xl p-5 md:p-6 flex flex-col min-h-[460px]">
          <div className="flex items-center justify-between pb-4 border-b border-brand-outline-variant/50 mb-4">
            <span className="font-mono text-[10px] text-brand-outline uppercase tracking-wider flex items-center gap-1.5">
              <Eye size={12} className="text-brand-primary" /> Visual Document Preview
            </span>
            {activeFile && (
              <button
                onClick={() => triggerDownload(activeFile)}
                className="px-2.5 py-1 rounded bg-brand-surface hover:bg-brand-surface-high text-brand-on-surface font-mono text-[10px] border border-brand-outline-variant flex items-center gap-1 transition-colors cursor-pointer"
                title="Download full parsed markdown summary report"
              >
                <Download size={11} /> Export Report
              </button>
            )}
          </div>

          <AnimatePresence mode="wait">
            {!activeFile ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 flex flex-col items-center justify-center text-center p-6 text-brand-outline font-sans text-xs"
              >
                <File size={32} className="mb-2 text-brand-outline/60 animate-bounce" />
                No document selected. Click an ingested file on the left to review its parsed content hierarchy.
              </motion.div>
            ) : (
              <motion.div
                key={activeFile.id}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="flex flex-col flex-1"
              >
                {/* Meta details header card */}
                <div className="bg-brand-surface p-4 rounded-xl border border-brand-outline-variant/65 mb-5 flex flex-col sm:flex-row justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <span className={`text-[8px] font-mono font-bold px-1.5 py-0.5 rounded uppercase ${
                        activeFile.type === "pdf" ? "bg-red-500/15 text-red-400" : "bg-blue-500/15 text-blue-400"
                      }`}>
                        {activeFile.type.toUpperCase()} DOCUMENT
                      </span>
                      <span className="text-[9px] font-mono text-brand-outline">Uploaded by {activeFile.author}</span>
                    </div>
                    <h4 className="font-serif text-base font-bold text-brand-on-surface truncate">
                      {activeFile.name}
                    </h4>
                  </div>

                  <div className="flex flex-col sm:items-end justify-center">
                    <span className="text-[9px] font-mono text-brand-outline">Status Code</span>
                    <span className={`text-xs font-mono font-bold mt-0.5 flex items-center gap-1 justify-start sm:justify-end ${
                      activeFile.status === "Verified" ? "text-emerald-400" : "text-amber-400"
                    }`}>
                      <CheckCircle2 size={11} /> {activeFile.status}
                    </span>
                  </div>
                </div>

                {/* Abstract box */}
                <div className="bg-brand-surface-lowest/50 border border-brand-outline-variant/40 rounded-xl p-4 mb-5">
                  <div className="flex items-center gap-1.5 mb-1 text-brand-primary">
                    <Sparkles size={11} />
                    <span className="font-mono text-[9px] uppercase tracking-widest">Metadata Ingestion Insight</span>
                  </div>
                  <p className="font-sans text-xs text-brand-on-surface leading-relaxed">
                    {activeFile.abstract}
                  </p>
                </div>

                {/* Simulated Parsed Structure Sections */}
                <div className="flex-1 flex flex-col gap-4">
                  <span className="font-mono text-[9px] text-brand-outline uppercase tracking-wider block">
                    Rendered Content Outline ({activeFile.sections.length} Sections)
                  </span>

                  <div className="flex flex-col gap-3.5 max-h-72 overflow-y-auto pr-1">
                    {activeFile.sections.map((section, idx) => (
                      <div key={idx} className="border-l-2 border-brand-primary/45 pl-3.5 py-1">
                        <h5 className="font-serif text-xs font-bold text-brand-on-surface mb-1">
                          {section.title}
                        </h5>
                        <p className="font-sans text-xs text-brand-on-surface-variant leading-relaxed">
                          {section.content}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Simulated Document Stats Footer */}
                <div className="pt-4 border-t border-brand-outline-variant/50 mt-5 flex items-center justify-between flex-wrap gap-3 font-mono text-[9px] text-brand-outline">
                  <span className="flex items-center gap-1">
                    <Clock size={11} /> Parse Time: ~0.4s
                  </span>
                  <span className="flex items-center gap-1">
                    <BookOpen size={11} /> ~{activeFile.sections.length * 90} Words
                  </span>
                  <span className="flex items-center gap-1">
                    <Tag size={11} /> XML Structure: Valid Schema
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
