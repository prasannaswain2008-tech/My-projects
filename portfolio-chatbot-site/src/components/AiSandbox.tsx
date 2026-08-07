import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles, FileText, Code, Layers, Send, RefreshCw,
  Check, Copy, HelpCircle, FileDown, ArrowRight, ListChecks
} from "lucide-react";
import { AssistantMessage } from "../types";

const SAMPLES = [
  {
    id: "sample1",
    label: "Dense Tech Jargon",
    mode: "simplify" as const,
    text: "The execution of parameter configuration was completed by SRE engineers, utilizing a process of nominalization optimization with respect to the metrics logging system, with the end objective of achieving real-time telemetry observation.",
  },
  {
    id: "sample2",
    label: "Raw Step Notes",
    mode: "dita" as const,
    text: "KloudFuse installation task. Prerequisite: You must have admin access to the Kubernetes cluster. Step 1: Execute `kubectl apply -f kloudfuse-agent.yaml`. Step 2: Run `kubectl get pods -n monitoring` to check status. Expected result is the pods should show 'Running'.",
  },
  {
    id: "sample3",
    label: "Raw API JSON",
    mode: "apidoc" as const,
    text: `POST /api/v1/telemetry/register
Request body:
{
  "client_id": "string (UUID representing the server node)",
  "enable_ssl": "boolean (optional, default true)",
  "tags": "array of strings for categorization"
}
Response: 201 Created with JSON structure containing registered status and unique secret key.`,
  },
];

export const AiSandbox: React.FC = () => {
  const [inputText, setInputText] = useState("");
  const [selectedMode, setSelectedMode] = useState<"simplify" | "dita" | "apidoc">("simplify");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{ improvedText: string; explanation: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copiedText, setCopiedText] = useState(false);

  const handleSelectSample = (sample: typeof SAMPLES[0]) => {
    setInputText(sample.text);
    setSelectedMode(sample.mode);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/gemini/assist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: inputText,
          mode: selectedMode,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to process text via technical writer assistant.");
      }

      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An unexpected network error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="ai-sandbox" className="py-16 px-4 md:px-8 border-t border-brand-outline-variant bg-brand-surface-low relative">
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-radial-gradient from-brand-primary/5 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-mono mb-4">
            <Sparkles size={14} className="animate-pulse" />
            AI Documentation Sandbox
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold tracking-tight text-brand-on-surface mb-3">
            Virtual Co-Pilot Sandbox
          </h2>
          <p className="text-brand-on-surface-variant max-w-2xl text-sm md:text-base">
            Test Prasanna's documentation philosophies in real-time. Enter unstructured notes, complex developer jargon, or an API schema, and watch our co-pilot process it according to the Microsoft Style Guide and structured technical writing principles.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Controls & Input */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            <div className="bg-brand-surface-medium border border-brand-outline-variant rounded-xl p-5">
              <h3 className="font-mono text-xs uppercase tracking-wider text-brand-primary mb-4 flex items-center gap-2">
                <ListChecks size={14} /> Step 1: Select Operation Mode
              </h3>

              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedMode("simplify")}
                  className={`flex flex-col items-center gap-2 p-3 rounded-lg border text-center transition-all ${
                    selectedMode === "simplify"
                      ? "bg-brand-primary/10 border-brand-primary text-brand-primary"
                      : "bg-brand-surface-low border-brand-outline-variant text-brand-on-surface-variant hover:border-brand-outline/30"
                  }`}
                >
                  <FileText size={18} />
                  <span className="text-xs font-mono font-medium leading-none">Simplify Jargon</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedMode("dita")}
                  className={`flex flex-col items-center gap-2 p-3 rounded-lg border text-center transition-all ${
                    selectedMode === "dita"
                      ? "bg-brand-primary/10 border-brand-primary text-brand-primary"
                      : "bg-brand-surface-low border-brand-outline-variant text-brand-on-surface-variant hover:border-brand-outline/30"
                  }`}
                >
                  <Layers size={18} />
                  <span className="text-xs font-mono font-medium leading-none">DITA Task</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedMode("apidoc")}
                  className={`flex flex-col items-center gap-2 p-3 rounded-lg border text-center transition-all ${
                    selectedMode === "apidoc"
                      ? "bg-brand-primary/10 border-brand-primary text-brand-primary"
                      : "bg-brand-surface-low border-brand-outline-variant text-brand-on-surface-variant hover:border-brand-outline/30"
                  }`}
                >
                  <Code size={18} />
                  <span className="text-xs font-mono font-medium leading-none">API Doc</span>
                </button>
              </div>

              {/* Quick Samples */}
              <div className="mt-5 border-t border-brand-outline-variant/50 pt-4">
                <span className="text-xs font-mono text-brand-on-surface-variant block mb-2">Or load a sample:</span>
                <div className="flex flex-wrap gap-2">
                  {SAMPLES.map((sample) => (
                    <button
                      key={sample.id}
                      type="button"
                      onClick={() => handleSelectSample(sample)}
                      className="text-xs px-2.5 py-1.5 rounded bg-brand-surface-low hover:bg-brand-surface-high border border-brand-outline-variant text-brand-on-surface transition-colors font-mono"
                    >
                      {sample.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="bg-brand-surface-medium border border-brand-outline-variant rounded-xl p-5 flex flex-col gap-4">
              <h3 className="font-mono text-xs uppercase tracking-wider text-brand-primary flex items-center gap-2">
                <FileText size={14} /> Step 2: Content Source
              </h3>

              <div className="relative">
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={
                    selectedMode === "simplify"
                      ? "Paste wordy technical sentences or engineering jargon here..."
                      : selectedMode === "dita"
                      ? "Enter unstructured notes of a technical procedure..."
                      : "Enter raw JSON schema, API methods, parameters, etc..."
                  }
                  rows={8}
                  maxLength={1000}
                  className="w-full bg-brand-surface-lowest text-brand-on-surface font-mono text-sm border border-brand-outline-variant rounded-lg p-3 focus:outline-none focus:border-brand-primary/80 placeholder-brand-outline resize-none transition-colors"
                />
                <span className="absolute bottom-2.5 right-3 text-[10px] font-mono text-brand-outline">
                  {inputText.length}/1000 chars
                </span>
              </div>

              <button
                type="submit"
                disabled={isLoading || !inputText.trim()}
                className={`w-full py-3 px-4 rounded-lg font-mono text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  isLoading || !inputText.trim()
                    ? "bg-brand-surface-high border border-brand-outline-variant text-brand-outline cursor-not-allowed"
                    : "bg-brand-primary text-brand-on-primary hover:bg-brand-primary/90 hover:scale-[1.01]"
                }`}
              >
                {isLoading ? (
                  <>
                    <RefreshCw size={16} className="animate-spin" />
                    Processing with Gemini...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Refine Documentation
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right Column: Dynamic Results terminal */}
          <div className="lg:col-span-7 h-full flex flex-col">
            <div className="bg-brand-surface-medium border border-brand-outline-variant rounded-xl flex-1 flex flex-col overflow-hidden min-h-[465px]">
              {/* Terminal Titlebar */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-brand-outline-variant bg-brand-surface-lowest/70">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-red-500/80" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <span className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <span className="font-mono text-xs text-brand-outline pl-2">co-pilot-output.md</span>
                </div>
                {result && (
                  <button
                    type="button"
                    onClick={() => handleCopy(result.improvedText)}
                    className="p-1 rounded bg-brand-surface-low border border-brand-outline-variant text-brand-on-surface-variant hover:text-brand-primary hover:border-brand-primary transition-colors flex items-center gap-1.5 px-2.5 text-xs font-mono"
                    title="Copy to clipboard"
                  >
                    {copiedText ? <Check size={12} className="text-green-400" /> : <Copy size={12} />}
                    {copiedText ? "Copied" : "Copy"}
                  </button>
                )}
              </div>

              {/* Terminal Content Box */}
              <div className="p-6 flex-1 flex flex-col justify-center bg-brand-surface-lowest/30 overflow-y-auto">
                <AnimatePresence mode="wait">
                  {isLoading ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center justify-center text-center py-10 gap-4"
                    >
                      <div className="relative w-16 h-16 flex items-center justify-center">
                        <div className="absolute inset-0 rounded-full border-2 border-brand-primary/20 border-t-brand-primary animate-spin" />
                        <Sparkles size={24} className="text-brand-primary animate-pulse" />
                      </div>
                      <div>
                        <p className="font-mono text-sm text-brand-on-surface">Applying Style Guide Constraints...</p>
                        <p className="font-mono text-xs text-brand-outline mt-1">Refining voice, organizing syntax, stripping nominalizations</p>
                      </div>
                    </motion.div>
                  ) : error ? (
                    <motion.div
                      key="error"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="p-5 border border-red-500/20 bg-red-500/5 rounded-lg flex flex-col gap-2"
                    >
                      <span className="font-mono text-sm font-semibold text-red-400">Execution Error</span>
                      <p className="font-mono text-xs text-brand-on-surface-variant leading-relaxed">{error}</p>
                      <span className="text-xs text-brand-outline mt-2 font-mono">
                        Note: Ensure you have added your GEMINI_API_KEY inside the Secrets/Settings menu.
                      </span>
                    </motion.div>
                  ) : result ? (
                    <motion.div
                      key="result"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col gap-6"
                    >
                      {/* Refined Content */}
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-brand-primary block mb-2 font-semibold">
                          ✦ Polished Documentation Output
                        </span>
                        <div className="bg-brand-surface-low border border-brand-outline-variant/80 rounded-lg p-4 font-mono text-sm text-brand-on-surface leading-relaxed whitespace-pre-wrap selection:bg-brand-primary/20">
                          {result.improvedText}
                        </div>
                      </div>

                      {/* Editorial Explanation */}
                      <div className="border-t border-brand-outline-variant/40 pt-4">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-brand-primary block mb-2 font-semibold">
                          ✍ Editorial Decisions & Quality Actions
                        </span>
                        <div className="bg-brand-surface-lowest border border-brand-outline-variant/40 rounded-lg p-4 text-xs leading-relaxed text-brand-on-surface-variant">
                          <p className="whitespace-pre-wrap font-sans font-medium text-brand-on-surface-variant">
                            {result.explanation}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="placeholder"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center justify-center text-center py-8 gap-3"
                    >
                      <FileText size={40} className="text-brand-outline/40" />
                      <div>
                        <p className="font-mono text-sm text-brand-on-surface">Terminal Ready</p>
                        <p className="font-sans text-xs text-brand-outline max-w-sm mt-1">
                          Select a mode, enter or paste your content in the input workspace, and press "Refine Documentation" to run the sandbox co-pilot.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
